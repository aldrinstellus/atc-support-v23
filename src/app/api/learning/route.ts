/**
 * Learning Loop API
 * PRD 1.4.3: Edit tracking and pattern analysis
 *
 * POST /api/learning - Record an edit
 * GET /api/learning - Get analytics and insights
 */

import { NextRequest, NextResponse } from 'next/server';
import type { RecordEditRequest, RecordEditResponse, GetAnalyticsResponse } from '@/types/learning';
import {
  createEditRecord,
  storeEditRecord,
  getEditRecords,
  generateAnalytics,
  generateInsights,
} from '@/lib/learning-loop';

/**
 * POST: Record an edit to the learning loop
 */
export async function POST(request: NextRequest): Promise<NextResponse<RecordEditResponse>> {
  try {
    const body = (await request.json()) as RecordEditRequest;

    // Validate required fields
    if (!body.draftId || !body.originalContent || !body.editedContent) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: draftId, originalContent, editedContent',
        },
        { status: 400 }
      );
    }

    // Get confidence score from draft if available (would normally fetch from DB)
    const confidenceScore = 75; // Default for demo

    // Create and store the edit record
    const editRecord = createEditRecord(body, confidenceScore);
    storeEditRecord(editRecord);

    return NextResponse.json({
      success: true,
      editRecord,
      patterns: editRecord.patternCategories,
    });
  } catch (error) {
    console.error('Learning Loop API Error (POST):', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to record edit',
      },
      { status: 500 }
    );
  }
}

/**
 * GET: Get learning analytics and insights
 */
export async function GET(request: NextRequest): Promise<NextResponse<GetAnalyticsResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const fromDateStr = searchParams.get('fromDate');
    const toDateStr = searchParams.get('toDate');
    const agentId = searchParams.get('agentId');

    // Parse dates
    const fromDate = fromDateStr ? new Date(fromDateStr) : undefined;
    const toDate = toDateStr ? new Date(toDateStr) : undefined;

    // Get edit records (filter by agent if specified)
    let records = getEditRecords();
    if (agentId) {
      records = records.filter((r) => r.agentId === agentId);
    }

    // Generate analytics and insights
    const analytics = generateAnalytics(records, fromDate, toDate);
    const insights = generateInsights(records);

    return NextResponse.json({
      success: true,
      analytics,
      insights,
    });
  } catch (error) {
    console.error('Learning Loop API Error (GET):', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get analytics',
      },
      { status: 500 }
    );
  }
}
