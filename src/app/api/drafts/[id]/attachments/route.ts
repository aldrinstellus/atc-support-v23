/**
 * Draft Attachments API
 * PRD 1.5.1: Attachment Management for Email Drafts
 *
 * GET /api/drafts/[id]/attachments - List attachments for a draft
 * POST /api/drafts/[id]/attachments - Upload attachment to draft
 * DELETE /api/drafts/[id]/attachments - Clear all attachments
 */

import { NextRequest, NextResponse } from 'next/server';
import type { AttachmentListResponse, AttachmentUploadResponse } from '@/types/email';
import { EMAIL_CONFIG, isAllowedExtension, formatFileSize } from '@/types/email';
import {
  getDraftAttachments,
  storeAttachment,
  clearDraftAttachments,
  canAddAttachment,
  getDraftAttachmentSize,
} from '@/lib/email-service';

type RouteParams = { params: Promise<{ id: string }> };

/**
 * GET: List all attachments for a draft
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<AttachmentListResponse>> {
  try {
    const { id: draftId } = await params;

    const attachments = getDraftAttachments(draftId);
    const totalSize = getDraftAttachmentSize(draftId);

    return NextResponse.json({
      success: true,
      attachments,
      totalSize,
    });
  } catch (error) {
    console.error('[Attachments API] GET error:', error);
    return NextResponse.json(
      {
        success: false,
        attachments: [],
        totalSize: 0,
        error: error instanceof Error ? error.message : 'Failed to fetch attachments',
      },
      { status: 500 }
    );
  }
}

/**
 * POST: Upload new attachment to draft
 */
export async function POST(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<AttachmentUploadResponse>> {
  try {
    const { id: draftId } = await params;

    // Get form data with file upload
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: 'No file provided',
        },
        { status: 400 }
      );
    }

    // Validate file extension
    if (!isAllowedExtension(file.name)) {
      return NextResponse.json(
        {
          success: false,
          error: `File type not allowed. Allowed types: ${EMAIL_CONFIG.ALLOWED_EXTENSIONS.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Check file size
    if (file.size > EMAIL_CONFIG.MAX_ATTACHMENT_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `File too large. Maximum size: ${formatFileSize(EMAIL_CONFIG.MAX_ATTACHMENT_SIZE)}`,
        },
        { status: 400 }
      );
    }

    // Check if draft can accept more attachments
    if (!canAddAttachment(draftId, file.size)) {
      const currentAttachments = getDraftAttachments(draftId);
      if (currentAttachments.length >= EMAIL_CONFIG.MAX_ATTACHMENTS) {
        return NextResponse.json(
          {
            success: false,
            error: `Maximum ${EMAIL_CONFIG.MAX_ATTACHMENTS} attachments allowed`,
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: `Total attachment size would exceed ${formatFileSize(EMAIL_CONFIG.MAX_TOTAL_SIZE)} limit`,
        },
        { status: 400 }
      );
    }

    // In demo mode, we store metadata only (no actual file storage)
    // In production, you would upload to S3, Azure Blob, or similar
    const DEMO_MODE = process.env.DEMO_MODE === 'true';
    let fileUrl: string | undefined;

    if (!DEMO_MODE) {
      // TODO: Implement actual file storage
      // const bytes = await file.arrayBuffer();
      // const buffer = Buffer.from(bytes);
      // fileUrl = await uploadToStorage(buffer, file.name, file.type);
      fileUrl = `/uploads/${draftId}/${file.name}`;
    } else {
      fileUrl = `/demo/uploads/${draftId}/${file.name}`;
    }

    // Store attachment metadata
    const attachment = storeAttachment(draftId, file.name, file.type, file.size, fileUrl);

    return NextResponse.json({
      success: true,
      attachment,
    });
  } catch (error) {
    console.error('[Attachments API] POST error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to upload attachment',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE: Clear all attachments for a draft
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<{ success: boolean; deletedCount?: number; error?: string }>> {
  try {
    const { id: draftId } = await params;

    const deletedCount = clearDraftAttachments(draftId);

    return NextResponse.json({
      success: true,
      deletedCount,
    });
  } catch (error) {
    console.error('[Attachments API] DELETE error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to clear attachments',
      },
      { status: 500 }
    );
  }
}
