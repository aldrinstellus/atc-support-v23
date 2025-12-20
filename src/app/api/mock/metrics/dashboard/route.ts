// GET /api/mock/metrics/dashboard - Get dashboard statistics

import { NextResponse } from 'next/server';
import { getMockDatabase } from '@/data/mock/database';

export async function GET() {
  const db = getMockDatabase();

  return NextResponse.json({
    success: true,
    data: db.dashboardStats,
  });
}
