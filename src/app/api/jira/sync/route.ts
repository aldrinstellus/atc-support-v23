import { NextRequest, NextResponse } from 'next/server';

interface SyncRequest {
  ticketId: string;
  action: 'link' | 'unlink' | 'sync';
  jiraIssueKey?: string;
}

interface SyncResult {
  success: boolean;
  ticketId: string;
  jiraIssueKey: string;
  syncedAt: string;
  changes?: {
    field: string;
    from: string;
    to: string;
  }[];
}

export async function POST(request: NextRequest) {
  try {
    const body: SyncRequest = await request.json();
    const { ticketId, action, jiraIssueKey } = body;

    if (!ticketId || !action) {
      return NextResponse.json(
        { error: 'Ticket ID and action are required' },
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    switch (action) {
      case 'link':
        if (!jiraIssueKey) {
          return NextResponse.json(
            { error: 'Jira issue key required for linking' },
            { status: 400 }
          );
        }
        return NextResponse.json({
          success: true,
          result: {
            ticketId,
            jiraIssueKey,
            action: 'linked',
            syncedAt: new Date().toISOString(),
            message: `Ticket ${ticketId} successfully linked to ${jiraIssueKey}`,
          },
        });

      case 'unlink':
        return NextResponse.json({
          success: true,
          result: {
            ticketId,
            jiraIssueKey: jiraIssueKey || 'NONE',
            action: 'unlinked',
            syncedAt: new Date().toISOString(),
            message: `Ticket ${ticketId} unlinked from Jira`,
          },
        });

      case 'sync':
        const result: SyncResult = {
          success: true,
          ticketId,
          jiraIssueKey: jiraIssueKey || `SUP-${Math.floor(Math.random() * 1000)}`,
          syncedAt: new Date().toISOString(),
          changes: [
            { field: 'status', from: 'open', to: 'in_progress' },
            { field: 'priority', from: 'medium', to: 'high' },
            { field: 'assignee', from: 'Unassigned', to: 'Sarah Chen' },
          ],
        };
        return NextResponse.json({
          success: true,
          result,
          message: `Successfully synced ${result.changes?.length || 0} changes`,
        });

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process sync request' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ticketId = searchParams.get('ticketId');

  if (!ticketId) {
    return NextResponse.json(
      { error: 'Ticket ID is required' },
      { status: 400 }
    );
  }

  // Simulate checking sync status
  const isLinked = Math.random() > 0.5;

  return NextResponse.json({
    ticketId,
    isLinked,
    jiraIssueKey: isLinked ? `SUP-${Math.floor(Math.random() * 1000)}` : null,
    lastSyncedAt: isLinked ? new Date(Date.now() - Math.random() * 86400000).toISOString() : null,
    syncStatus: isLinked ? 'synced' : 'not_linked',
  });
}
