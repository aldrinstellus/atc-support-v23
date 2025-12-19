/**
 * Knowledge Base Articles API
 * PRD 1.1.2: KB Article Management
 *
 * GET /api/kb/articles - List all articles
 * GET /api/kb/articles?category=CATEGORY - Filter by category
 * POST /api/kb/articles - Create new article
 */

import { NextRequest, NextResponse } from 'next/server';
import type {
  KBArticle,
  KBCategory,
  GetArticleResponse,
  CreateArticleRequest,
  CreateArticleResponse,
} from '@/types/knowledge-base';
import { getKBArticles, addKBArticle, getKBArticleById } from '@/lib/kb-search';

interface ArticlesListResponse {
  success: boolean;
  articles: KBArticle[];
  totalCount: number;
  error?: string;
}

/**
 * GET: List all articles or filter by category
 */
export async function GET(request: NextRequest): Promise<NextResponse<ArticlesListResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as KBCategory | null;
    const status = searchParams.get('status') as KBArticle['status'] | null;
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    let articles = getKBArticles();

    // Filter by category
    if (category) {
      articles = articles.filter((a) => a.category === category);
    }

    // Filter by status
    if (status) {
      articles = articles.filter((a) => a.status === status);
    } else {
      // Default to published articles only
      articles = articles.filter((a) => a.status === 'published');
    }

    // Sort by views (most popular first)
    articles.sort((a, b) => b.views - a.views);

    // Apply pagination
    const totalCount = articles.length;
    const paginatedArticles = articles.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      articles: paginatedArticles,
      totalCount,
    });
  } catch (error) {
    console.error('KB Articles API Error (GET):', error);
    return NextResponse.json(
      {
        success: false,
        articles: [],
        totalCount: 0,
        error: error instanceof Error ? error.message : 'Failed to fetch articles',
      },
      { status: 500 }
    );
  }
}

/**
 * POST: Create a new article
 */
export async function POST(request: NextRequest): Promise<NextResponse<CreateArticleResponse>> {
  try {
    const body = (await request.json()) as CreateArticleRequest;

    // Validate required fields
    if (!body.title?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Article title is required',
        },
        { status: 400 }
      );
    }

    if (!body.content?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Article content is required',
        },
        { status: 400 }
      );
    }

    if (!body.category) {
      return NextResponse.json(
        {
          success: false,
          error: 'Article category is required',
        },
        { status: 400 }
      );
    }

    // Generate article ID
    const existingArticles = getKBArticles();
    const nextId = `KB-${String(existingArticles.length + 1).padStart(3, '0')}`;

    // Create excerpt from content
    const excerpt =
      body.content.replace(/[#*_`]/g, '').slice(0, 200) +
      (body.content.length > 200 ? '...' : '');

    // Create new article
    const newArticle: KBArticle = {
      id: nextId,
      title: body.title.trim(),
      content: body.content.trim(),
      category: body.category,
      tags: body.tags || [],
      author: 'Support Team', // Would come from auth context in production
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
      rating: 0,
      ratingCount: 0,
      status: 'draft',
      version: 1,
      relatedArticleIds: [],
      excerpt,
      keywords: body.keywords || [],
      patterns:
        body.patterns?.map((p, i) => ({
          ...p,
          id: `${nextId}-p${i + 1}`,
        })) || [],
    };

    addKBArticle(newArticle);

    return NextResponse.json({
      success: true,
      article: newArticle,
    });
  } catch (error) {
    console.error('KB Articles API Error (POST):', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create article',
      },
      { status: 500 }
    );
  }
}
