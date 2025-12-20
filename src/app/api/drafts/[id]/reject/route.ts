// ============================================================================
// V23 ITSS - Reject Draft API
// POST /api/drafts/[id]/reject - Reject draft with reason
// PRD 1.5.2: Add internal note documenting action
// ============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { addInternalNote } from '@/lib/email-service'

type RouteParams = { params: Promise<{ id: string }> }

export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params
    const body = await request.json()

    const {
      rejectionReason,   // Required: why the draft was rejected
      reviewedById,      // Required: who rejected
      reviewedByName,    // Optional: display name
    } = body

    if (!rejectionReason) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: rejectionReason' },
        { status: 400 }
      )
    }

    if (!reviewedById) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: reviewedById' },
        { status: 400 }
      )
    }

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

    // Check if draft is in a state that can be rejected
    if (!['PENDING_REVIEW', 'IN_REVIEW'].includes(existingDraft.status)) {
      return NextResponse.json(
        { success: false, error: `Cannot reject draft in ${existingDraft.status} status` },
        { status: 400 }
      )
    }

    // Update draft status
    const _updatedDraft = await prisma.draft.update({
      where: { id: existingDraft.id },
      data: {
        status: 'REJECTED',
        rejectedAt: new Date(),
        rejectionReason,
        reviewedById,
        reviewedAt: new Date(),
      },
    })

    // Fetch complete draft
    const completeDraft = await prisma.draft.findUnique({
      where: { id: existingDraft.id },
      include: { versions: { orderBy: { version: 'desc' } } },
    })

    // PRD 1.5.2: Add internal note documenting the rejection
    try {
      await addInternalNote({
        ticketId: existingDraft.ticketId,
        agentId: reviewedById,
        agentName: reviewedByName || 'Agent',
        action: 'DRAFT_REJECTED',
        details: {
          draftId: existingDraft.draftId,
          rejectionReason,
        },
      })
    } catch (noteError) {
      console.error('[Draft Reject] Failed to add internal note:', noteError)
    }

    return NextResponse.json({
      success: true,
      message: 'Draft rejected',
      draft: completeDraft,
    })
  } catch (error) {
    console.error('[Draft Reject] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to reject draft' },
      { status: 500 }
    )
  }
}
