/**
 * Draft Retry API
 * PRD 1.5.3: Retry Failed Email Sends
 *
 * POST /api/drafts/[id]/retry - Retry sending a failed draft
 * GET /api/drafts/[id]/retry - Get retry status and attempts history
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { SendEmailResponse } from '@/types/email';
import { sendEmail, getDraftAttachments } from '@/lib/email-service';
import {
  withRetry,
  DEFAULT_RETRY_CONFIG,
  checkDuplicateSend,
  createIdempotencyRecord,
  updateIdempotencyRecord,
  generateIdempotencyKey,
  hashContent,
  recordSendAttempt,
  getSendAttempts,
  hasSuccessfulSend,
  isCircuitBreakerOpen,
  recordCircuitBreakerSuccess,
  recordCircuitBreakerFailure,
  getCircuitBreakerStatus,
  type RetryConfig,
  type SendAttempt,
} from '@/lib/retry-service';

type RouteParams = { params: Promise<{ id: string }> };

interface RetryRequest {
  force?: boolean; // Force retry even if duplicate detected
  customRetryConfig?: Partial<RetryConfig>;
}

interface RetryResponse {
  success: boolean;
  messageId?: string;
  error?: string;
  errorCode?: string;
  attempts?: number;
  totalTimeMs?: number;
  retriedErrors?: string[];
  duplicateDetected?: boolean;
  originalMessageId?: string;
  circuitBreakerOpen?: boolean;
}

interface RetryStatusResponse {
  success: boolean;
  draftId: string;
  hasSuccessfulSend: boolean;
  attempts: SendAttempt[];
  lastAttempt?: SendAttempt;
  totalAttempts: number;
  failedAttempts: number;
  successfulAttempts: number;
  circuitBreaker: {
    state: string;
    failures: number;
    nextAttempt?: Date | null;
  };
  error?: string;
}

/**
 * POST: Retry sending a failed draft
 */
export async function POST(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<RetryResponse>> {
  try {
    const { id } = await params;
    const body: RetryRequest = await request.json().catch(() => ({}));

    // Check circuit breaker
    if (isCircuitBreakerOpen()) {
      const cbStatus = getCircuitBreakerStatus();
      return NextResponse.json(
        {
          success: false,
          error: 'Service temporarily unavailable due to repeated failures',
          errorCode: 'CIRCUIT_BREAKER_OPEN',
          circuitBreakerOpen: true,
        },
        { status: 503 }
      );
    }

    // Find draft
    const existingDraft = await prisma.draft.findFirst({
      where: {
        OR: [{ id }, { draftId: id }],
      },
    });

    if (!existingDraft) {
      return NextResponse.json({ success: false, error: 'Draft not found' }, { status: 404 });
    }

    // Only FAILED or APPROVED drafts can be retried
    if (existingDraft.status !== 'FAILED' && existingDraft.status !== 'APPROVED') {
      return NextResponse.json(
        {
          success: false,
          error: `Cannot retry draft in ${existingDraft.status} status. Only FAILED or APPROVED drafts can be retried.`,
        },
        { status: 400 }
      );
    }

    // Check if already sent successfully
    if (hasSuccessfulSend(id)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Draft has already been sent successfully',
          duplicateDetected: true,
        },
        { status: 409 }
      );
    }

    // Generate idempotency key for duplicate detection
    const contentToSend = existingDraft.finalContent || existingDraft.draftContent;
    const contentHash = hashContent(contentToSend);
    const idempotencyKey = generateIdempotencyKey(
      id,
      existingDraft.customerEmail || 'unknown',
      contentHash
    );

    // Check for duplicate send
    const duplicate = checkDuplicateSend(idempotencyKey);
    if (duplicate && !body.force) {
      if (duplicate.status === 'success') {
        return NextResponse.json(
          {
            success: false,
            error: 'This email was already sent successfully',
            duplicateDetected: true,
            originalMessageId: duplicate.messageId,
          },
          { status: 409 }
        );
      }
      if (duplicate.status === 'pending') {
        return NextResponse.json(
          {
            success: false,
            error: 'A send operation is already in progress for this draft',
            duplicateDetected: true,
          },
          { status: 409 }
        );
      }
    }

    // Create idempotency record
    createIdempotencyRecord(id, idempotencyKey);

    // Build recipient list
    const toRecipients = existingDraft.customerEmail
      ? [
          {
            email: existingDraft.customerEmail,
            name: existingDraft.customerName || undefined,
            type: 'to' as const,
          },
        ]
      : [];

    if (toRecipients.length === 0) {
      updateIdempotencyRecord(idempotencyKey, 'failed');
      return NextResponse.json(
        { success: false, error: 'No customer email address available' },
        { status: 400 }
      );
    }

    // Get attachments
    const attachments = getDraftAttachments(id);

    // Configure retry settings
    const retryConfig: RetryConfig = {
      ...DEFAULT_RETRY_CONFIG,
      ...(body.customRetryConfig || {}),
    };

    // Attempt send with retry
    const startTime = Date.now();
    const result = await withRetry(async () => {
      const sendResult = await sendEmail(
        {
          draftId: id,
          to: toRecipients,
          cc: [],
          bcc: [],
          attachmentIds: attachments.map((a) => a.id),
          body: contentToSend,
        },
        existingDraft.ticketId,
        contentToSend
      );

      if (!sendResult.success) {
        throw new Error(sendResult.error || 'Send failed');
      }

      return sendResult;
    }, retryConfig);

    // Record send attempt
    const attempt: SendAttempt = {
      draftId: id,
      attemptNumber: result.attempts,
      timestamp: new Date(),
      success: result.success,
      errorCode: result.errorCode,
      errorMessage: result.error,
      responseTimeMs: result.totalTimeMs,
    };
    recordSendAttempt(attempt);

    if (!result.success) {
      // Update idempotency record as failed
      updateIdempotencyRecord(idempotencyKey, 'failed');
      recordCircuitBreakerFailure();

      // Update draft status to FAILED
      await prisma.draft.update({
        where: { id: existingDraft.id },
        data: {
          status: 'FAILED',
          sourcesUsed: {
            ...((existingDraft.sourcesUsed as object) || {}),
            lastRetryError: result.error,
            retryAttempts: result.attempts,
            lastRetryAt: new Date().toISOString(),
          },
        },
      });

      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to send after retries',
          errorCode: result.errorCode,
          attempts: result.attempts,
          totalTimeMs: result.totalTimeMs,
          retriedErrors: result.retriedErrors,
        },
        { status: 500 }
      );
    }

    // Success - update records
    const sendResult = result.data as SendEmailResponse;
    updateIdempotencyRecord(idempotencyKey, 'success', sendResult.messageId);
    recordCircuitBreakerSuccess();

    // Update draft status to SENT
    await prisma.draft.update({
      where: { id: existingDraft.id },
      data: {
        status: 'SENT',
        sentAt: new Date(),
        sourcesUsed: {
          ...((existingDraft.sourcesUsed as object) || {}),
          zohoMessageId: sendResult.messageId,
          sentViaRetry: true,
          retryAttempts: result.attempts,
          attachmentCount: sendResult.attachmentCount || 0,
        },
      },
    });

    return NextResponse.json({
      success: true,
      messageId: sendResult.messageId,
      attempts: result.attempts,
      totalTimeMs: result.totalTimeMs,
      retriedErrors: result.retriedErrors,
    });
  } catch (error) {
    console.error('[Draft Retry] Error:', error);
    recordCircuitBreakerFailure();
    return NextResponse.json(
      { success: false, error: 'Failed to retry send' },
      { status: 500 }
    );
  }
}

/**
 * GET: Get retry status and attempts history
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<RetryStatusResponse>> {
  try {
    const { id } = await params;

    // Find draft
    const existingDraft = await prisma.draft.findFirst({
      where: {
        OR: [{ id }, { draftId: id }],
      },
    });

    if (!existingDraft) {
      return NextResponse.json(
        { success: false, error: 'Draft not found' } as RetryStatusResponse,
        { status: 404 }
      );
    }

    // Get send attempts
    const attempts = getSendAttempts(id);
    const successfulAttempts = attempts.filter((a) => a.success).length;
    const failedAttempts = attempts.filter((a) => !a.success).length;
    const lastAttempt = attempts.length > 0 ? attempts[attempts.length - 1] : undefined;

    // Get circuit breaker status
    const cbStatus = getCircuitBreakerStatus();

    return NextResponse.json({
      success: true,
      draftId: id,
      hasSuccessfulSend: hasSuccessfulSend(id),
      attempts,
      lastAttempt,
      totalAttempts: attempts.length,
      successfulAttempts,
      failedAttempts,
      circuitBreaker: {
        state: cbStatus.state,
        failures: cbStatus.failures,
        nextAttempt: cbStatus.nextAttempt,
      },
    });
  } catch (error) {
    console.error('[Draft Retry Status] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get retry status',
      } as RetryStatusResponse,
      { status: 500 }
    );
  }
}
