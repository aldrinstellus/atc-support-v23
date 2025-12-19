/**
 * Knowledge Base Single Article API
 * PRD 1.1.2: Individual Article Management
 *
 * GET /api/kb/articles/[id] - Get article by ID
 * PATCH /api/kb/articles/[id] - Update article
 * DELETE /api/kb/articles/[id] - Archive/delete article
 */

import { NextRequest, NextResponse } from 'next/server';
import type {
  GetArticleResponse,
  UpdateArticleRequest,
  UpdateArticleResponse,
} from '@/types/knowledge-base';
import { getKBArticleById, updateKBArticle, getKBArticles } from '@/lib/kb-search';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET: Get a single article by ID
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<GetArticleResponse>> {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Article ID is required',
        },
        { status: 400 }
      );
    }

    const article = getKBArticleById(id);

    if (!article) {
      return NextResponse.json(
        {
          success: false,
          error: `Article not found: ${id}`,
        },
        { status: 404 }
      );
    }

    // Get related articles
    const allArticles = getKBArticles();
    const relatedArticles = article.relatedArticleIds
      .map((relId) => allArticles.find((a) => a.id === relId))
      .filter((a): a is NonNullable<typeof a> => a !== undefined);

    // Increment view count (in production, this would update the database)
    updateKBArticle(id, { views: article.views + 1 });

    return NextResponse.json({
      success: true,
      article,
      relatedArticles,
    });
  } catch (error) {
    console.error('KB Article API Error (GET):', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch article',
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH: Update an existing article
 */
export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<UpdateArticleResponse>> {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Article ID is required',
        },
        { status: 400 }
      );
    }

    const existingArticle = getKBArticleById(id);

    if (!existingArticle) {
      return NextResponse.json(
        {
          success: false,
          error: `Article not found: ${id}`,
        },
        { status: 404 }
      );
    }

    const body = (await request.json()) as UpdateArticleRequest['updates'];

    // Validate fields if provided
    if (body.title !== undefined && !body.title.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Article title cannot be empty',
        },
        { status: 400 }
      );
    }

    if (body.content !== undefined && !body.content.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Article content cannot be empty',
        },
        { status: 400 }
      );
    }

    // Update the article
    const updatedArticle = updateKBArticle(id, {
      ...body,
      updatedAt: new Date(),
      version: existingArticle.version + 1,
    });

    if (!updatedArticle) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to update article',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      article: updatedArticle,
    });
  } catch (error) {
    console.error('KB Article API Error (PATCH):', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update article',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE: Archive an article (soft delete)
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<UpdateArticleResponse>> {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Article ID is required',
        },
        { status: 400 }
      );
    }

    const existingArticle = getKBArticleById(id);

    if (!existingArticle) {
      return NextResponse.json(
        {
          success: false,
          error: `Article not found: ${id}`,
        },
        { status: 404 }
      );
    }

    // Soft delete by setting status to archived
    const archivedArticle = updateKBArticle(id, {
      status: 'archived',
      updatedAt: new Date(),
    });

    if (!archivedArticle) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to archive article',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      article: archivedArticle,
    });
  } catch (error) {
    console.error('KB Article API Error (DELETE):', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to archive article',
      },
      { status: 500 }
    );
  }
}
