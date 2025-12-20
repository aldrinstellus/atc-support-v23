import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ticketIds, assignedAgentId } = body;

    if (!ticketIds || !Array.isArray(ticketIds) || ticketIds.length === 0) {
      return NextResponse.json({ error: 'Invalid ticketIds array' }, { status: 400 });
    }
    if (!assignedAgentId || typeof assignedAgentId !== 'string') {
      return NextResponse.json({ error: 'Invalid assignedAgentId' }, { status: 400 });
    }

    // Demo mode: simulate successful reassignment
    return NextResponse.json({
      success: true,
      successCount: ticketIds.length,
      totalRequested: ticketIds.length,
      message: `Successfully reassigned ${ticketIds.length} ticket(s)`,
    });
  } catch (error) {
    console.error('Bulk reassign error:', error);
    return NextResponse.json({ error: 'Failed to reassign tickets' }, { status: 500 });
  }
}
