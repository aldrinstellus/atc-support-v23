/**
 * Knowledge Base Pattern Matching API
 * PRD 1.1.2: Ticket-to-Article Pattern Matching
 *
 * POST /api/kb/match - Match ticket content against KB articles
 */

import { NextRequest, NextResponse } from 'next/server';
import type { PatternMatchRequest, PatternMatchResponse } from '@/types/knowledge-base';
import { matchTicketToArticles, getKBArticles } from '@/lib/kb-search';

/**
 * POST: Match ticket content to KB articles
 */
export async function POST(request: NextRequest): Promise<NextResponse<PatternMatchResponse>> {
  try {
    const body = (await request.json()) as PatternMatchRequest;

    // Validate required fields
    if (!body.ticketSubject && !body.ticketDescription) {
      return NextResponse.json(
        {
          success: false,
          matches: [],
          processingTime: 0,
          error: 'Either ticketSubject or ticketDescription is required',
        },
        { status: 400 }
      );
    }

    const articles = getKBArticles();
    const response = matchTicketToArticles(articles, body);

    return NextResponse.json(response);
  } catch (error) {
    console.error('KB Pattern Match API Error:', error);
    return NextResponse.json(
      {
        success: false,
        matches: [],
        processingTime: 0,
        error: error instanceof Error ? error.message : 'Pattern matching failed',
      },
      { status: 500 }
    );
  }
}
