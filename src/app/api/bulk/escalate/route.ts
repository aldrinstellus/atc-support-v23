import { NextRequest, NextResponse } from 'next/server';

const VALID_PRIORITIES = ['low', 'medium', 'high', 'critical'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ticketIds, reason, priority } = body;

    if (!ticketIds || !Array.isArray(ticketIds) || ticketIds.length === 0) {
      return NextResponse.json({ error: 'Invalid ticketIds array' }, { status: 400 });
    }
    if (!reason || typeof reason !== 'string') {
      return NextResponse.json({ error: 'Escalation reason is required' }, { status: 400 });
    }
    if (!priority || !VALID_PRIORITIES.includes(priority)) {
      return NextResponse.json({ error: `Invalid priority. Must be one of: ${VALID_PRIORITIES.join(', ')}` }, { status: 400 });
    }

    // Demo mode: simulate successful escalation
    return NextResponse.json({
      success: true,
      successCount: ticketIds.length,
      totalRequested: ticketIds.length,
      message: `Successfully escalated ${ticketIds.length} ticket(s) to ${priority} priority`,
    });
  } catch (error) {
    console.error('Bulk escalate error:', error);
    return NextResponse.json({ error: 'Failed to escalate tickets' }, { status: 500 });
  }
}
