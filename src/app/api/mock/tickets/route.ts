// GET /api/mock/tickets - List tickets with filters

import { NextRequest, NextResponse } from 'next/server';
import { queryTickets, type TicketQueryOptions } from '@/data/mock/database';
import type { CompanyTier, RiskLevel } from '@/types/mock';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Parse array parameters
  const parseArray = (param: string | null): string[] | undefined => {
    if (!param) return undefined;
    return param.split(',').filter(Boolean);
  };

  const options: TicketQueryOptions = {
    tier: searchParams.get('tier') as CompanyTier | undefined,
    risk: searchParams.get('risk') as RiskLevel | undefined,
    status: parseArray(searchParams.get('status')),
    priority: parseArray(searchParams.get('priority')),
    channel: parseArray(searchParams.get('channel')),
    sentiment: parseArray(searchParams.get('sentiment')),
    category: parseArray(searchParams.get('category')),
    agentId: searchParams.get('agentId') || undefined,
    companyId: searchParams.get('companyId') || undefined,
    search: searchParams.get('search') || undefined,
    slaBreached: searchParams.get('slaBreached') === 'true' ? true :
                 searchParams.get('slaBreached') === 'false' ? false : undefined,
    aiSuggested: searchParams.get('aiSuggested') === 'true' ? true :
                 searchParams.get('aiSuggested') === 'false' ? false : undefined,
    page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
    pageSize: searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize')!) : 20,
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortDir: (searchParams.get('sortDir') as 'asc' | 'desc') || 'desc',
  };

  // Clean undefined values
  Object.keys(options).forEach(key => {
    if (options[key as keyof TicketQueryOptions] === undefined) {
      delete options[key as keyof TicketQueryOptions];
    }
  });

  const result = queryTickets(options);

  return NextResponse.json({
    success: true,
    data: result.tickets,
    pagination: {
      page: result.page,
      pageSize: result.pageSize,
      total: result.total,
      totalPages: result.totalPages,
    },
  });
}
