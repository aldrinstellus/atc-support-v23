/**
 * Knowledge Base Search API
 * PRD 1.1.2: KB Search with Pattern Matching
 *
 * GET /api/kb/search?q=query&category=CATEGORY&tags=tag1,tag2&limit=10&offset=0
 * POST /api/kb/search - For complex search with ticket context
 */

import { NextRequest, NextResponse } from 'next/server';
import type { KBSearchRequest, KBSearchResponse, KBCategory } from '@/types/knowledge-base';
import { searchKnowledgeBase, getKBArticles } from '@/lib/kb-search';

/**
 * GET: Simple search with query parameters
 */
export async function GET(request: NextRequest): Promise<NextResponse<KBSearchResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || searchParams.get('query') || '';
    const category = searchParams.get('category') as KBCategory | null;
    const tagsParam = searchParams.get('tags');
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    if (!query.trim()) {
      return NextResponse.json(
        {
          success: false,
          query: '',
          totalResults: 0,
          results: [],
          suggestedArticles: [],
          relatedSearches: [],
          searchTime: 0,
          error: 'Search query is required',
        },
        { status: 400 }
      );
    }

    const searchRequest: KBSearchRequest = {
      query: query.trim(),
      category: category || undefined,
      tags: tagsParam ? tagsParam.split(',').map((t) => t.trim()) : undefined,
      limit,
      offset,
    };

    const articles = getKBArticles();
    const response = searchKnowledgeBase(articles, searchRequest);

    return NextResponse.json(response);
  } catch (error) {
    console.error('KB Search API Error (GET):', error);
    return NextResponse.json(
      {
        success: false,
        query: '',
        totalResults: 0,
        results: [],
        suggestedArticles: [],
        relatedSearches: [],
        searchTime: 0,
        error: error instanceof Error ? error.message : 'Search failed',
      },
      { status: 500 }
    );
  }
}

/**
 * POST: Advanced search with ticket context
 */
export async function POST(request: NextRequest): Promise<NextResponse<KBSearchResponse>> {
  try {
    const body = (await request.json()) as KBSearchRequest;

    if (!body.query?.trim()) {
      return NextResponse.json(
        {
          success: false,
          query: '',
          totalResults: 0,
          results: [],
          suggestedArticles: [],
          relatedSearches: [],
          searchTime: 0,
          error: 'Search query is required',
        },
        { status: 400 }
      );
    }

    const searchRequest: KBSearchRequest = {
      query: body.query.trim(),
      category: body.category,
      tags: body.tags,
      limit: body.limit || 10,
      offset: body.offset || 0,
      ticketContext: body.ticketContext,
    };

    const articles = getKBArticles();
    const response = searchKnowledgeBase(articles, searchRequest);

    return NextResponse.json(response);
  } catch (error) {
    console.error('KB Search API Error (POST):', error);
    return NextResponse.json(
      {
        success: false,
        query: '',
        totalResults: 0,
        results: [],
        suggestedArticles: [],
        relatedSearches: [],
        searchTime: 0,
        error: error instanceof Error ? error.message : 'Search failed',
      },
      { status: 500 }
    );
  }
}
