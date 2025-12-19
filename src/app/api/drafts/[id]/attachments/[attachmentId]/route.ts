/**
 * Single Attachment API
 * PRD 1.5.1: Individual Attachment Management
 *
 * GET /api/drafts/[id]/attachments/[attachmentId] - Get attachment details
 * DELETE /api/drafts/[id]/attachments/[attachmentId] - Remove specific attachment
 */

import { NextRequest, NextResponse } from 'next/server';
import type { EmailAttachment } from '@/types/email';
import { getAttachment, removeAttachment } from '@/lib/email-service';

type RouteParams = { params: Promise<{ id: string; attachmentId: string }> };

interface GetAttachmentResponse {
  success: boolean;
  attachment?: EmailAttachment;
  error?: string;
}

interface DeleteAttachmentResponse {
  success: boolean;
  error?: string;
}

/**
 * GET: Get single attachment details
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<GetAttachmentResponse>> {
  try {
    const { attachmentId } = await params;

    const attachment = getAttachment(attachmentId);

    if (!attachment) {
      return NextResponse.json(
        {
          success: false,
          error: 'Attachment not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      attachment,
    });
  } catch (error) {
    console.error('[Single Attachment API] GET error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch attachment',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE: Remove specific attachment from draft
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<DeleteAttachmentResponse>> {
  try {
    const { id: draftId, attachmentId } = await params;

    // Check if attachment exists
    const attachment = getAttachment(attachmentId);
    if (!attachment) {
      return NextResponse.json(
        {
          success: false,
          error: 'Attachment not found',
        },
        { status: 404 }
      );
    }

    // Remove attachment
    const removed = removeAttachment(draftId, attachmentId);

    if (!removed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to remove attachment',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('[Single Attachment API] DELETE error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete attachment',
      },
      { status: 500 }
    );
  }
}
