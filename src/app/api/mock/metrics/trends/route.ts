// GET /api/mock/metrics/trends - Get metrics trend data

import { NextRequest, NextResponse } from 'next/server';
import { getMetricsTrend, getMockDatabase } from '@/data/mock/database';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const period = (searchParams.get('period') as 'week' | 'month' | 'quarter') || 'month';

  // Validate period
  if (!['week', 'month', 'quarter'].includes(period)) {
    return NextResponse.json(
      { success: false, error: 'Invalid period. Use: week, month, or quarter' },
      { status: 400 }
    );
  }

  const trendData = getMetricsTrend(period);

  // Also include raw daily metrics if requested
  const includeRaw = searchParams.get('includeRaw') === 'true';
  const db = getMockDatabase();

  return NextResponse.json({
    success: true,
    data: {
      period,
      trend: trendData,
      rawMetrics: includeRaw ? db.dailyMetrics : undefined,
    },
  });
}
