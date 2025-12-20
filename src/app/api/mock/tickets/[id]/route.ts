// GET /api/mock/tickets/[id] - Get single ticket with full history

import { NextRequest, NextResponse } from 'next/server';
import { getTicketWithHistory } from '@/data/mock/database';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const result = getTicketWithHistory(id);

  if (!result) {
    return NextResponse.json(
      { success: false, error: 'Ticket not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: result,
  });
}
