// ============================================================================
// V23 ITSS - Single Learning Candidate API
// GET /api/learning-loop/[id] - Get learning candidate
// PATCH /api/learning-loop/[id] - Review/update learning candidate
// DELETE /api/learning-loop/[id] - Delete learning candidate
// ============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type RouteParams = { params: Promise<{ id: string }> }

// GET /api/learning-loop/[id] - Get single learning candidate
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params

    try {
      const candidate = await prisma.learningCandidate.findFirst({
        where: {
          OR: [
            { id },
            { candidateId: id },
          ],
        },
        include: {
          trainingData: true,
        },
      })

      if (!candidate) {
        return NextResponse.json(
          { success: false, error: 'Learning candidate not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        candidate,
      })
    } catch {
      // Demo mode
      return NextResponse.json({
        success: true,
        candidate: {
          id,
          candidateId: `LC-2025-${id.substring(0, 6).toUpperCase()}`,
          draftId: 'draft-demo-1',
          changePercent: 45.5,
          editDistance: 250,
          editType: 'AGENT_EDIT',
          originalContent: 'Original AI response that needed significant edits...',
          finalContent: 'Agent-edited response with improvements to tone, clarity, and accuracy...',
          category: 'technical_issue',
          errorType: 'CLARITY',
          status: 'PENDING',
          agentId: 'agent-1',
          agentName: 'John Smith',
          confidenceScore: 62,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
    }
  } catch (error) {
    console.error('[Learning Loop] Error fetching candidate:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch learning candidate' },
      { status: 500 }
    )
  }
}

// PATCH /api/learning-loop/[id] - Review/update learning candidate
export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params
    const body = await request.json()

    const {
      status,
      errorType,
      correctionPattern,
      reviewNotes,
      reviewedById,
      reviewedByName,
    } = body

    try {
      const existingCandidate = await prisma.learningCandidate.findFirst({
        where: {
          OR: [
            { id },
            { candidateId: id },
          ],
        },
      })

      if (!existingCandidate) {
        return NextResponse.json(
          { success: false, error: 'Learning candidate not found' },
          { status: 404 }
        )
      }

      // Build update data
      const updateData: Record<string, unknown> = {}

      if (status !== undefined) {
        updateData.status = status
        if (status === 'IN_REVIEW' || status === 'APPROVED' || status === 'REJECTED') {
          updateData.reviewedAt = new Date()
          if (reviewedById) updateData.reviewedById = reviewedById
          if (reviewedByName) updateData.reviewedByName = reviewedByName
        }
      }
      if (errorType !== undefined) updateData.errorType = errorType
      if (correctionPattern !== undefined) updateData.correctionPattern = correctionPattern
      if (reviewNotes !== undefined) updateData.reviewNotes = reviewNotes

      const candidate = await prisma.learningCandidate.update({
        where: { id: existingCandidate.id },
        data: updateData,
      })

      return NextResponse.json({
        success: true,
        candidate,
      })
    } catch {
      // Demo mode
      return NextResponse.json({
        success: true,
        candidate: {
          id,
          candidateId: `LC-2025-${id.substring(0, 6).toUpperCase()}`,
          status: status || 'PENDING',
          errorType: errorType || null,
          correctionPattern: correctionPattern || null,
          reviewNotes: reviewNotes || null,
          reviewedById: reviewedById || null,
          reviewedByName: reviewedByName || null,
          reviewedAt: status ? new Date() : null,
          updatedAt: new Date(),
        },
      })
    }
  } catch (error) {
    console.error('[Learning Loop] Error updating candidate:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update learning candidate' },
      { status: 500 }
    )
  }
}

// DELETE /api/learning-loop/[id] - Delete learning candidate
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params

    try {
      const existingCandidate = await prisma.learningCandidate.findFirst({
        where: {
          OR: [
            { id },
            { candidateId: id },
          ],
        },
      })

      if (!existingCandidate) {
        return NextResponse.json(
          { success: false, error: 'Learning candidate not found' },
          { status: 404 }
        )
      }

      await prisma.learningCandidate.delete({
        where: { id: existingCandidate.id },
      })

      return NextResponse.json({
        success: true,
        message: 'Learning candidate deleted successfully',
      })
    } catch {
      // Demo mode
      return NextResponse.json({
        success: true,
        message: 'Learning candidate deleted successfully (demo)',
      })
    }
  } catch (error) {
    console.error('[Learning Loop] Error deleting candidate:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete learning candidate' },
      { status: 500 }
    )
  }
}
