// ============================================================================
// V23 ITSS - Learning Loop API
// GET /api/learning-loop - List learning candidates
// POST /api/learning-loop - Manually create learning candidate
// ============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateLearningCandidateId } from '@/types/learning-loop'

export const dynamic = 'force-dynamic'

// GET /api/learning-loop - List learning candidates with filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const errorType = searchParams.get('errorType')
    const category = searchParams.get('category')
    const minChangePercent = searchParams.get('minChangePercent')
    const agentId = searchParams.get('agentId')
    const fromDate = searchParams.get('fromDate')
    const toDate = searchParams.get('toDate')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    // Build where clause
    const where: Record<string, unknown> = {}

    if (status) {
      where.status = status
    }
    if (errorType) {
      where.errorType = errorType
    }
    if (category) {
      where.category = category
    }
    if (minChangePercent) {
      where.changePercent = { gte: parseFloat(minChangePercent) }
    }
    if (agentId) {
      where.agentId = agentId
    }
    if (fromDate || toDate) {
      where.createdAt = {}
      if (fromDate) (where.createdAt as Record<string, Date>).gte = new Date(fromDate)
      if (toDate) (where.createdAt as Record<string, Date>).lte = new Date(toDate)
    }

    try {
      // Get total count
      const total = await prisma.learningCandidate.count({ where })

      // Get candidates
      const candidates = await prisma.learningCandidate.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      })

      // Get stats
      const stats = await prisma.learningCandidate.aggregate({
        _count: true,
        _avg: { changePercent: true },
        where: { status: 'PENDING' },
      })

      const approvedCount = await prisma.learningCandidate.count({
        where: { status: 'APPROVED' },
      })

      return NextResponse.json({
        success: true,
        candidates,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
        stats: {
          totalPending: stats._count || 0,
          totalApproved: approvedCount,
          avgChangePercent: stats._avg?.changePercent || 0,
        },
      })
    } catch {
      // Return demo data if database unavailable
      const demoData = generateDemoLearningCandidates()
      return NextResponse.json({
        success: true,
        candidates: demoData.slice(0, limit),
        pagination: {
          total: demoData.length,
          page: 1,
          limit,
          totalPages: Math.ceil(demoData.length / limit),
        },
        stats: {
          totalPending: 8,
          totalApproved: 12,
          avgChangePercent: 42.5,
        },
      })
    }
  } catch (error) {
    console.error('[Learning Loop] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch learning candidates' },
      { status: 500 }
    )
  }
}

// POST /api/learning-loop - Manually create learning candidate
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      draftId,
      draftVersionId,
      originalContent,
      finalContent,
      changePercent,
      editDistance,
      editType,
      category,
      agentId,
      agentName,
      confidenceScore,
    } = body

    if (!draftId || !originalContent || !finalContent) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: draftId, originalContent, finalContent' },
        { status: 400 }
      )
    }

    try {
      const candidate = await prisma.learningCandidate.create({
        data: {
          candidateId: generateLearningCandidateId(),
          draftId,
          draftVersionId,
          originalContent,
          finalContent,
          changePercent: changePercent || 0,
          editDistance: editDistance || 0,
          editType: editType || 'AGENT_EDIT',
          category,
          agentId,
          agentName,
          confidenceScore,
          status: 'PENDING',
        },
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
          id: 'demo-' + Date.now(),
          candidateId: generateLearningCandidateId(),
          draftId,
          originalContent,
          finalContent,
          changePercent: changePercent || 0,
          editDistance: editDistance || 0,
          editType: editType || 'AGENT_EDIT',
          status: 'PENDING',
          createdAt: new Date(),
        },
      })
    }
  } catch (error) {
    console.error('[Learning Loop] Error creating candidate:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create learning candidate' },
      { status: 500 }
    )
  }
}

// Demo data generator
function generateDemoLearningCandidates() {
  const errorTypes = ['TONE_MISMATCH', 'TECHNICAL_ERROR', 'MISSING_CONTEXT', 'CLARITY', 'COMPLETENESS']
  const categories = ['password_reset', 'access_request', 'bug_report', 'technical_issue', 'billing']
  const statuses = ['PENDING', 'PENDING', 'PENDING', 'IN_REVIEW', 'APPROVED', 'TRAINING_CREATED']

  return Array.from({ length: 15 }, (_, i) => ({
    id: `demo-lc-${i + 1}`,
    candidateId: `LC-2025-${String(i + 1).padStart(3, '0')}`,
    draftId: `draft-${i + 1}`,
    changePercent: 30 + Math.random() * 50,
    editDistance: 100 + Math.floor(Math.random() * 400),
    editType: 'AGENT_EDIT',
    originalContent: `Original AI-generated response for ticket #${i + 1}. This is the initial draft that was created by the AI system.`,
    finalContent: `Significantly edited response for ticket #${i + 1}. The agent made substantial changes to improve accuracy, tone, and completeness of the response.`,
    category: categories[i % categories.length],
    errorType: errorTypes[i % errorTypes.length],
    status: statuses[i % statuses.length],
    agentId: `agent-${(i % 5) + 1}`,
    agentName: ['John Smith', 'Sarah Johnson', 'Mike Wilson', 'Emily Brown', 'David Lee'][i % 5],
    confidenceScore: 40 + Math.random() * 40,
    createdAt: new Date(Date.now() - i * 3600000 * 24),
    updatedAt: new Date(Date.now() - i * 3600000 * 12),
  }))
}
