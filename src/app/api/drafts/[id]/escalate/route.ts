// ============================================================================
// V23 ITSS - Escalate Draft API
// POST /api/drafts/[id]/escalate - Escalate draft to supervisor
// PRD Reference: 1.3.4 - Draft Approval Actions - Escalate
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
      escalationReason,   // Required: why the draft needs escalation
      escalatedById,      // Required: who escalated
      escalatedByName,    // Optional: display name
      escalatedTo,        // Optional: supervisor ID to escalate to
      escalationPriority, // Optional: 'low' | 'medium' | 'high' | 'critical'
      escalationNotes,    // Optional: additional notes for supervisor
    } = body

    if (!escalationReason) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: escalationReason' },
        { status: 400 }
      )
    }

    if (!escalatedById) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: escalatedById' },
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

    // Check if draft is in a state that can be escalated
    const escalatableStatuses = ['PENDING_REVIEW', 'IN_REVIEW', 'REJECTED']
    if (!escalatableStatuses.includes(existingDraft.status)) {
      return NextResponse.json(
        { success: false, error: `Cannot escalate draft in ${existingDraft.status} status` },
        { status: 400 }
      )
    }

    // Update draft status to ESCALATED
    const updatedDraft = await prisma.draft.update({
      where: { id: existingDraft.id },
      data: {
        status: 'ESCALATED',
        escalatedAt: new Date(),
        escalationReason,
        escalatedById,
        escalatedTo: escalatedTo || null,
        escalationPriority: escalationPriority || 'high',
        escalationNotes: escalationNotes || null,
        reviewedAt: new Date(),
        reviewedById: escalatedById,
      },
    })

    // Create version entry for escalation
    const latestVersion = await prisma.draftVersion.findFirst({
      where: { draftId: existingDraft.id },
      orderBy: { version: 'desc' },
    })

    await prisma.draftVersion.create({
      data: {
        draftId: existingDraft.id,
        version: (latestVersion?.version || 0) + 1,
        content: existingDraft.draftContent,
        editedBy: escalatedById,
        editedByName: 'Agent',
        editType: 'AGENT_EDIT',
        editSummary: `Escalated: ${escalationReason}`,
        confidenceScore: existingDraft.confidenceScore,
        tone: existingDraft.tone,
      },
    })

    // Fetch complete draft with versions
    const completeDraft = await prisma.draft.findUnique({
      where: { id: existingDraft.id },
      include: { versions: { orderBy: { version: 'desc' } } },
    })

    // PRD 1.5.2: Add internal note documenting the escalation
    try {
      await addInternalNote({
        ticketId: existingDraft.ticketId,
        agentId: escalatedById,
        agentName: escalatedByName || 'Agent',
        action: 'DRAFT_ESCALATED',
        details: {
          draftId: existingDraft.draftId,
          escalationReason,
          escalationPriority: escalationPriority || 'high',
        },
      })
    } catch (noteError) {
      console.error('[Draft Escalate] Failed to add internal note:', noteError)
    }

    return NextResponse.json({
      success: true,
      message: 'Draft escalated to supervisor',
      draft: completeDraft,
      escalation: {
        reason: escalationReason,
        escalatedBy: escalatedById,
        escalatedTo: escalatedTo || 'Supervisor Queue',
        priority: escalationPriority || 'high',
        escalatedAt: updatedDraft.escalatedAt,
      },
    })
  } catch (error) {
    console.error('[Draft Escalate] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to escalate draft' },
      { status: 500 }
    )
  }
}
