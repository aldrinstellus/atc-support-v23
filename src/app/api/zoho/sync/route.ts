/**
 * Zoho to Supabase Sync Endpoint
 * NOTE: This route is currently disabled as the app uses mock data.
 * The Prisma schema doesn't match the expected models (Task vs Ticket, CustomerRisk vs Customer).
 */

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * POST /api/zoho/sync
 * Returns mock data message - actual sync disabled
 */
export async function POST(_req: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'This sync endpoint is currently disabled. The app uses mock data for demo purposes.',
    synced: 0,
    errors: []
  });
}
