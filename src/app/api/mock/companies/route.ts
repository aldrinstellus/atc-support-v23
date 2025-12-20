// GET /api/mock/companies - List companies with filters

import { NextRequest, NextResponse } from 'next/server';
import { queryCompanies, type CompanyQueryOptions } from '@/data/mock/database';
import type { CompanyTier, RiskLevel } from '@/types/mock';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const options: CompanyQueryOptions = {
    tier: searchParams.get('tier') as CompanyTier | undefined,
    risk: searchParams.get('risk') as RiskLevel | undefined,
    search: searchParams.get('search') || undefined,
    page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
    pageSize: searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize')!) : 20,
    sortBy: searchParams.get('sortBy') || 'name',
    sortDir: (searchParams.get('sortDir') as 'asc' | 'desc') || 'asc',
  };

  // Clean undefined values
  Object.keys(options).forEach(key => {
    if (options[key as keyof CompanyQueryOptions] === undefined) {
      delete options[key as keyof CompanyQueryOptions];
    }
  });

  const result = queryCompanies(options);

  return NextResponse.json({
    success: true,
    data: result.companies,
    pagination: {
      page: result.page,
      pageSize: result.pageSize,
      total: result.total,
      totalPages: result.totalPages,
    },
  });
}
