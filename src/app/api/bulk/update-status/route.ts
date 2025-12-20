import { NextRequest, NextResponse } from 'next/server';

const VALID_STATUSES = ['new', 'open', 'in_progress', 'pending', 'resolved', 'closed', 'escalated'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ticketIds, status } = body;

    if (!ticketIds || !Array.isArray(ticketIds) || ticketIds.length === 0) {
      return NextResponse.json({ error: 'Invalid ticketIds array' }, { status: 400 });
    }
    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` }, { status: 400 });
    }

    // Demo mode: simulate successful status update
    return NextResponse.json({
      success: true,
      successCount: ticketIds.length,
      totalRequested: ticketIds.length,
      message: `Successfully updated ${ticketIds.length} ticket(s) to ${status}`,
    });
  } catch (error) {
    console.error('Bulk status update error:', error);
    return NextResponse.json({ error: 'Failed to update ticket status' }, { status: 500 });
  }
}
