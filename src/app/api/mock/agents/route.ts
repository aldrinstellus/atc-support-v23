// GET /api/mock/agents - List agents

import { NextRequest, NextResponse } from 'next/server';
import { getMockDatabase } from '@/data/mock/database';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const db = getMockDatabase();

  let agents = [...db.agents];

  // Filter by team
  const teamId = searchParams.get('teamId');
  if (teamId) {
    agents = agents.filter(a => a.teamId === teamId);
  }

  // Filter by role
  const role = searchParams.get('role');
  if (role) {
    agents = agents.filter(a => a.role === role);
  }

  // Filter by status
  const status = searchParams.get('status');
  if (status) {
    agents = agents.filter(a => a.status === status);
  }

  // Search
  const search = searchParams.get('search');
  if (search) {
    const searchLower = search.toLowerCase();
    agents = agents.filter(a =>
      a.name.toLowerCase().includes(searchLower) ||
      a.email.toLowerCase().includes(searchLower)
    );
  }

  // Include teams data
  const includeTeams = searchParams.get('includeTeams') === 'true';

  return NextResponse.json({
    success: true,
    data: agents,
    teams: includeTeams ? db.teams : undefined,
    total: agents.length,
  });
}
