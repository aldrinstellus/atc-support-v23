import { NextResponse } from 'next/server';
import { getMockDatabase, queryTickets } from '@/data/mock/database';
import type { EnhancedTicket, Agent } from '@/types/mock';

export async function GET() {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const db = getMockDatabase();
    const { tickets } = queryTickets({});
    const agents = db.agents;

    // Calculate stats
    const ticketsToday = tickets.filter((t: EnhancedTicket) => new Date(t.createdAt) >= today).length;
    const ticketsThisWeek = tickets.filter((t: EnhancedTicket) => new Date(t.createdAt) >= weekAgo).length;
    const ticketsThisMonth = tickets.filter((t: EnhancedTicket) => new Date(t.createdAt) >= monthAgo).length;

    const openTickets = tickets.filter((t: EnhancedTicket) => t.status === 'open' || t.status === 'in-progress').length;
    const resolvedTickets = tickets.filter((t: EnhancedTicket) => t.status === 'resolved' || t.status === 'closed').length;

    // Calculate average response time (in minutes)
    const ticketsWithResponse = tickets.filter((t: EnhancedTicket) => t.firstResponseAt);
    const totalResponseTime = ticketsWithResponse.reduce((sum: number, t: EnhancedTicket) => {
      const created = new Date(t.createdAt).getTime();
      const responded = new Date(t.firstResponseAt!).getTime();
      return sum + (responded - created) / (1000 * 60);
    }, 0);
    const avgResponseTime = ticketsWithResponse.length > 0
      ? Math.round(totalResponseTime / ticketsWithResponse.length)
      : 0;

    // Calculate SLA compliance using resolutionDue
    const ticketsWithSLA = tickets.filter((t: EnhancedTicket) => t.resolutionDue);
    const slaCompliant = ticketsWithSLA.filter((t: EnhancedTicket) => {
      if (!t.resolvedAt) return true;
      return new Date(t.resolvedAt) <= new Date(t.resolutionDue);
    }).length;
    const slaComplianceRate = ticketsWithSLA.length > 0
      ? Math.round((slaCompliant / ticketsWithSLA.length) * 100)
      : 100;

    // Team utilization (online agents)
    const activeAgents = agents.filter((a: Agent) => a.status === 'online').length;
    const utilizationRate = agents.length > 0
      ? Math.round((activeAgents / agents.length) * 100)
      : 0;

    return NextResponse.json({
      success: true,
      data: {
        overview: { ticketsToday, ticketsThisWeek, ticketsThisMonth },
        status: { open: openTickets, resolved: resolvedTickets, total: tickets.length },
        performance: { avgResponseTime, slaComplianceRate, utilizationRate },
        timestamp: now.toISOString(),
      },
    });
  } catch (error) {
    console.error('Error fetching manager overview:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch overview' }, { status: 500 });
  }
}
