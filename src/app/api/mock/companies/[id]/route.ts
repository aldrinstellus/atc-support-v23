// GET /api/mock/companies/[id] - Get single company with relations

import { NextRequest, NextResponse } from 'next/server';
import { getCompanyWithRelations } from '@/data/mock/database';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const result = getCompanyWithRelations(id);

  if (!result) {
    return NextResponse.json(
      { success: false, error: 'Company not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: result,
  });
}
