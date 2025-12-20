// GET /api/mock/sla - Get SLA configurations and breach stats

import { NextRequest, NextResponse } from 'next/server';
import { getMockDatabase, getSLABreachStats } from '@/data/mock/database';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const db = getMockDatabase();

  // Get SLA configs
  let slaConfigs = [...db.slaConfigs];

  // Filter by tier
  const tier = searchParams.get('tier');
  if (tier) {
    slaConfigs = slaConfigs.filter(s => s.tier === tier);
  }

  // Filter by priority
  const priority = searchParams.get('priority');
  if (priority) {
    slaConfigs = slaConfigs.filter(s => s.priority === priority);
  }

  // Include breach stats
  const includeStats = searchParams.get('includeStats') !== 'false';
  const breachStats = includeStats ? getSLABreachStats() : undefined;

  return NextResponse.json({
    success: true,
    data: {
      configs: slaConfigs,
      breachStats,
    },
  });
}
