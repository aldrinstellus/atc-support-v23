// ============================================================================
// V23 ITSS - Training Data API
// GET /api/learning-loop/training - List training data
// POST /api/learning-loop/training - Create training data from learning candidate
// ============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateTrainingDataId } from '@/types/learning-loop'

export const dynamic = 'force-dynamic'

// GET /api/learning-loop/training - List training data
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const usedInTraining = searchParams.get('usedInTraining')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where: Record<string, unknown> = {}
    if (category) where.category = category
    if (usedInTraining !== null) where.usedInTraining = usedInTraining === 'true'

    try {
      const total = await prisma.trainingData.count({ where })

      const trainingData = await prisma.trainingData.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          learningCandidates: {
            select: {
              id: true,
              candidateId: true,
              changePercent: true,
              errorType: true,
            },
          },
        },
      })

      // Get stats
      const stats = await prisma.trainingData.aggregate({
        _count: true,
        _avg: { qualityScore: true },
      })

      const usedCount = await prisma.trainingData.count({
        where: { usedInTraining: true },
      })

      return NextResponse.json({
        success: true,
        trainingData,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
        stats: {
          total: stats._count || 0,
          usedInTraining: usedCount,
          avgQualityScore: stats._avg?.qualityScore || 0,
        },
      })
    } catch {
      // Demo data
      const demoData = generateDemoTrainingData()
      return NextResponse.json({
        success: true,
        trainingData: demoData.slice(0, limit),
        pagination: {
          total: demoData.length,
          page: 1,
          limit,
          totalPages: Math.ceil(demoData.length / limit),
        },
        stats: {
          total: 12,
          usedInTraining: 5,
          avgQualityScore: 85.2,
        },
      })
    }
  } catch (error) {
    console.error('[Training Data] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch training data' },
      { status: 500 }
    )
  }
}

// POST /api/learning-loop/training - Create training data from learning candidate
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      learningCandidateId,
      inputContent,
      expectedOutput,
      category,
      errorTypes,
      qualityScore,
      validatedBy,
    } = body

    if (!learningCandidateId) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: learningCandidateId' },
        { status: 400 }
      )
    }

    try {
      // Find the learning candidate
      const candidate = await prisma.learningCandidate.findFirst({
        where: {
          OR: [
            { id: learningCandidateId },
            { candidateId: learningCandidateId },
          ],
        },
      })

      if (!candidate) {
        return NextResponse.json(
          { success: false, error: 'Learning candidate not found' },
          { status: 404 }
        )
      }

      // Create training data
      const trainingData = await prisma.trainingData.create({
        data: {
          trainingId: generateTrainingDataId(),
          inputContent: inputContent || candidate.originalContent,
          expectedOutput: expectedOutput || candidate.finalContent,
          category: category || candidate.category,
          errorTypes: errorTypes || (candidate.errorType ? [candidate.errorType] : []),
          originalDraftId: candidate.draftId,
          agentId: candidate.agentId,
          qualityScore: qualityScore || null,
          validatedBy: validatedBy || null,
          validatedAt: validatedBy ? new Date() : null,
        },
      })

      // Update learning candidate to reference training data
      await prisma.learningCandidate.update({
        where: { id: candidate.id },
        data: {
          isTrainingData: true,
          trainingDataId: trainingData.id,
          status: 'TRAINING_CREATED',
        },
      })

      return NextResponse.json({
        success: true,
        trainingData,
        message: 'Training data created successfully',
      })
    } catch {
      // Demo mode
      const trainingId = generateTrainingDataId()
      return NextResponse.json({
        success: true,
        trainingData: {
          id: 'demo-td-' + Date.now(),
          trainingId,
          inputContent: inputContent || 'Demo input content',
          expectedOutput: expectedOutput || 'Demo expected output',
          category: category || 'general',
          errorTypes: errorTypes || [],
          qualityScore: qualityScore || null,
          validatedBy: validatedBy || null,
          usedInTraining: false,
          createdAt: new Date(),
        },
        message: 'Training data created successfully (demo)',
      })
    }
  } catch (error) {
    console.error('[Training Data] Error creating:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create training data' },
      { status: 500 }
    )
  }
}

// Demo data generator
function generateDemoTrainingData() {
  const categories = ['password_reset', 'access_request', 'bug_report', 'technical_issue', 'billing']
  const errorTypes = ['TONE_MISMATCH', 'TECHNICAL_ERROR', 'MISSING_CONTEXT', 'CLARITY', 'COMPLETENESS']

  return Array.from({ length: 12 }, (_, i) => ({
    id: `demo-td-${i + 1}`,
    trainingId: `TD-2025-${String(i + 1).padStart(3, '0')}`,
    inputContent: `Sample customer ticket ${i + 1}: "I'm having trouble with my account. The system keeps logging me out and I can't access my dashboard. Please help urgently."`,
    expectedOutput: `Thank you for reaching out about your account access issue. I understand how frustrating this must be. Let me help you resolve this right away.\n\nHere are the steps to fix this:\n1. Clear your browser cache and cookies\n2. Try logging in again using the direct link\n3. If the issue persists, I'll reset your session from our end\n\nI've also noted this in your account for future reference. Is there anything else I can help with?`,
    category: categories[i % categories.length],
    errorTypes: [errorTypes[i % errorTypes.length]],
    ticketId: `TICK-${1000 + i}`,
    originalDraftId: `draft-${i + 1}`,
    agentId: `agent-${(i % 5) + 1}`,
    qualityScore: 70 + Math.random() * 25,
    validatedBy: i % 2 === 0 ? 'supervisor-1' : null,
    validatedAt: i % 2 === 0 ? new Date(Date.now() - i * 3600000) : null,
    usedInTraining: i < 5,
    trainingBatchId: i < 5 ? 'batch-2025-01' : null,
    createdAt: new Date(Date.now() - i * 86400000),
    updatedAt: new Date(Date.now() - i * 43200000),
  }))
}
