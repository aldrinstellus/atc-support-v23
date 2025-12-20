// ============================================================================
// V23 ITSS - Send Draft API
// PRD 1.5.1: Send approved draft with CC/BCC and Attachments support
// PRD 1.5.2: Add internal note documenting action
// POST /api/drafts/[id]/send - Send approved draft to customer via Zoho Desk
// ============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { EmailRecipient, SendEmailResponse } from '@/types/email'
import { isValidEmail, EMAIL_CONFIG } from '@/types/email'
import { sendEmail, getDraftAttachments, addInternalNote } from '@/lib/email-service'

type RouteParams = { params: Promise<{ id: string }> }

/**
 * Convert string array to EmailRecipient array
 */
function parseRecipients(
  recipients: string[] | EmailRecipient[] | undefined,
  type: 'to' | 'cc' | 'bcc'
): EmailRecipient[] {
  if (!recipients || recipients.length === 0) return []

  return recipients.map((r) => {
    if (typeof r === 'string') {
      return { email: r, type }
    }
    return { ...r, type }
  })
}

/**
 * Validate recipient limits
 */
function validateRecipientLimits(
  cc: EmailRecipient[],
  bcc: EmailRecipient[]
): string | null {
  if (cc.length > EMAIL_CONFIG.MAX_RECIPIENTS.cc) {
    return `Maximum ${EMAIL_CONFIG.MAX_RECIPIENTS.cc} CC recipients allowed`
  }
  if (bcc.length > EMAIL_CONFIG.MAX_RECIPIENTS.bcc) {
    return `Maximum ${EMAIL_CONFIG.MAX_RECIPIENTS.bcc} BCC recipients allowed`
  }
  return null
}

export async function POST(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<SendEmailResponse & { draft?: unknown }>> {
  try {
    const { id } = await params
    const body = await request.json()

    const {
      ccRecipients,
      bccRecipients,
      attachmentIds,
      sentById,        // PRD 1.5.2: Who is sending
      sentByName,      // PRD 1.5.2: Display name
    } = body

    // Find draft
    const existingDraft = await prisma.draft.findFirst({
      where: {
        OR: [
          { id },
          { draftId: id },
        ],
      },
    })

    if (!existingDraft) {
      return NextResponse.json(
        { success: false, error: 'Draft not found' },
        { status: 404 }
      )
    }

    // Only approved drafts can be sent
    if (existingDraft.status !== 'APPROVED') {
      return NextResponse.json(
        { success: false, error: `Cannot send draft in ${existingDraft.status} status. Draft must be approved first.` },
        { status: 400 }
      )
    }

    // Parse and validate recipients
    const ccParsed = parseRecipients(ccRecipients, 'cc')
    const bccParsed = parseRecipients(bccRecipients, 'bcc')

    // Validate recipient limits
    const limitError = validateRecipientLimits(ccParsed, bccParsed)
    if (limitError) {
      return NextResponse.json(
        { success: false, error: limitError },
        { status: 400 }
      )
    }

    // Validate email formats
    const invalidEmails: string[] = []
    ;[...ccParsed, ...bccParsed].forEach((r) => {
      if (!isValidEmail(r.email)) {
        invalidEmails.push(r.email)
      }
    })

    if (invalidEmails.length > 0) {
      return NextResponse.json(
        { success: false, error: `Invalid email addresses: ${invalidEmails.join(', ')}` },
        { status: 400 }
      )
    }

    // Get content to send (finalContent if edited, otherwise draftContent)
    const contentToSend = existingDraft.finalContent || existingDraft.draftContent

    // Get attachments
    const attachments = getDraftAttachments(id)
    const requestedAttachmentIds = attachmentIds || attachments.map((a) => a.id)

    // Build primary recipient from customer email
    const toRecipients: EmailRecipient[] = existingDraft.customerEmail
      ? [{ email: existingDraft.customerEmail, name: existingDraft.customerName || undefined, type: 'to' }]
      : []

    if (toRecipients.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No customer email address available' },
        { status: 400 }
      )
    }

    // Send email with full CC/BCC/attachment support
    const sendResult = await sendEmail(
      {
        draftId: id,
        to: toRecipients,
        cc: ccParsed,
        bcc: bccParsed,
        attachmentIds: requestedAttachmentIds,
        body: contentToSend,
      },
      existingDraft.ticketId,
      contentToSend
    )

    if (!sendResult.success) {
      // Mark as failed
      await prisma.draft.update({
        where: { id: existingDraft.id },
        data: {
          status: 'FAILED',
        },
      })

      return NextResponse.json(
        {
          success: false,
          error: sendResult.error || 'Failed to send draft',
          validationErrors: sendResult.validationErrors,
        },
        { status: 500 }
      )
    }

    // Update draft status to SENT
    const updatedDraft = await prisma.draft.update({
      where: { id: existingDraft.id },
      data: {
        status: 'SENT',
        sentAt: new Date(),
        sourcesUsed: {
          ...(existingDraft.sourcesUsed as object || {}),
          zohoMessageId: sendResult.messageId,
          ccCount: ccParsed.length,
          bccCount: bccParsed.length,
          attachmentCount: sendResult.attachmentCount || 0,
        },
      },
    })

    // PRD 1.5.2: Add internal note documenting the send action
    try {
      await addInternalNote({
        ticketId: existingDraft.ticketId,
        agentId: sentById || existingDraft.approvedById || 'system',
        agentName: sentByName || 'Agent',
        action: 'DRAFT_SENT',
        details: {
          draftId: existingDraft.draftId,
          sentAt: new Date(),
          recipientCount: toRecipients.length,
          ccCount: ccParsed.length,
          bccCount: bccParsed.length,
          attachmentCount: sendResult.attachmentCount || 0,
        },
      })
    } catch (noteError) {
      // Log but don't fail the send if internal note fails
      console.error('[Draft Send] Failed to add internal note:', noteError)
    }

    return NextResponse.json({
      success: true,
      messageId: sendResult.messageId,
      sentAt: sendResult.sentAt,
      recipients: sendResult.recipients,
      attachmentCount: sendResult.attachmentCount,
      draft: updatedDraft,
    })
  } catch (error) {
    console.error('[Draft Send] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send draft' },
      { status: 500 }
    )
  }
}
