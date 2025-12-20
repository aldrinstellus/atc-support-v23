import { NextResponse } from 'next/server';
import { getMockDatabase, queryTickets } from '@/data/mock/database';
import type { EnhancedTicket, Agent } from '@/types/mock';

interface EscalatedTicket {
  ticketId: string;
  title: string;
  description: string;
  priority: string;
  category: string;
  status: string;
  createdAt: string;
  escalatedAt: string;
  hoursSinceEscalation: number;
  isUrgent: boolean;
  escalationReason: string;
  assignedTo: { id: string; name: string; email: string } | null;
  company: string;
  slaDeadline?: string;
}

export async function GET() {
  try {
    const db = getMockDatabase();
    const { tickets } = queryTickets({});
    const agents = db.agents;

    // For demo, treat high-priority tickets with 'escalated' tag as escalated
    const escalatedTickets: EscalatedTicket[] = tickets
      .filter((t: EnhancedTicket) => t.priority === 'critical' || (t.priority === 'high' && t.tags?.includes('escalated')))
      .map((ticket: EnhancedTicket) => {
        const assignedAgent = agents.find((a: Agent) => a.id === ticket.agentId);
        const escalatedAt = new Date(ticket.updatedAt);
        const now = new Date();
        const hoursSinceEscalation = Math.floor((now.getTime() - escalatedAt.getTime()) / (1000 * 60 * 60));

        const isUrgent = ticket.priority === 'critical' ||
                        (ticket.priority === 'high' && hoursSinceEscalation > 4) ||
                        hoursSinceEscalation > 24;

        return {
          ticketId: ticket.id,
          title: ticket.subject,
          description: ticket.description,
          priority: ticket.priority,
          category: ticket.category,
          status: ticket.status,
          createdAt: ticket.createdAt,
          escalatedAt: escalatedAt.toISOString(),
          hoursSinceEscalation,
          isUrgent,
          escalationReason: 'Requires senior assistance',
          assignedTo: assignedAgent ? { id: assignedAgent.id, name: assignedAgent.name, email: assignedAgent.email } : null,
          company: ticket.company?.name || 'Unknown',
          slaDeadline: ticket.resolutionDue,
        };
      })
      .sort((a: EscalatedTicket, b: EscalatedTicket) => {
        if (a.isUrgent !== b.isUrgent) return a.isUrgent ? -1 : 1;
        const priorityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };
        const priorityDiff = (priorityOrder[a.priority] ?? 4) - (priorityOrder[b.priority] ?? 4);
        if (priorityDiff !== 0) return priorityDiff;
        return b.hoursSinceEscalation - a.hoursSinceEscalation;
      });

    return NextResponse.json({
      success: true,
      data: {
        escalations: escalatedTickets,
        summary: {
          total: escalatedTickets.length,
          urgent: escalatedTickets.filter((t: EscalatedTicket) => t.isUrgent).length,
          critical: escalatedTickets.filter((t: EscalatedTicket) => t.priority === 'critical').length,
          high: escalatedTickets.filter((t: EscalatedTicket) => t.priority === 'high').length,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching escalations:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch escalations' }, { status: 500 });
  }
}
