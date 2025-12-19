/**
 * Simplified Zoho Webhook Endpoint (shorter URL)
 * Redirects to main webhook handler
 */

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/webhook
 * Simple validation endpoint for Zoho
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Webhook ready',
    timestamp: new Date().toISOString(),
  });
}

/**
 * POST /api/webhook
 * Forward to main Zoho webhook handler
 */
export async function POST(req: NextRequest) {
  try {
    // Forward to main webhook handler
    const body = await req.json();

    const webhookUrl = new URL('/api/zoho/webhook', req.url);
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    return NextResponse.json(result, { status: response.status });

  } catch (error) {
    console.error('[Webhook Proxy] Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
