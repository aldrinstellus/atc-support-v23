// GET /api/mock/agents/workload - Get agent workload distribution

import { NextResponse } from 'next/server';
import { getAgentWorkload } from '@/data/mock/database';

export async function GET() {
  const workload = getAgentWorkload();

  return NextResponse.json({
    success: true,
    data: workload,
  });
}
