import { NextRequest, NextResponse } from 'next/server';
import { getMockDatabase, queryTickets } from '@/data/mock/database';
import type { EnhancedTicket, Agent } from '@/types/mock';

interface AgentPerformance {
  agentId: string;
  name: string;
  email: string;
  status: string;
  role: string;
  metrics: {
    ticketsHandled: number;
    resolvedTickets: number;
    avgResponseTime: number;
    satisfactionScore: number;
    slaComplianceRate: number;
  };
  performance: {
    tier: string;
    isTopPerformer: boolean;
    needsAttention: boolean;
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sortBy = searchParams.get('sortBy') || 'tickets';
    const order = searchParams.get('order') || 'desc';

    const db = getMockDatabase();
    const agents = db.agents;
    const { tickets } = queryTickets({});

    const agentPerformance: AgentPerformance[] = agents.map((agent: Agent) => {
      const agentTickets = tickets.filter((t: EnhancedTicket) => t.agentId === agent.id);
      const resolvedTickets = agentTickets.filter((t: EnhancedTicket) => t.status === 'resolved' || t.status === 'closed');

      const ticketsWithResponse = agentTickets.filter((t: EnhancedTicket) => t.firstResponseAt);
      const totalResponseTime = ticketsWithResponse.reduce((sum: number, t: EnhancedTicket) => {
        const created = new Date(t.createdAt).getTime();
        const responded = new Date(t.firstResponseAt!).getTime();
        return sum + (responded - created) / (1000 * 60);
      }, 0);
      const avgResponseTime = ticketsWithResponse.length > 0
        ? Math.round(totalResponseTime / ticketsWithResponse.length)
        : 0;

      // Use agent's CSAT score (1-5 rating from agent data)
      const satisfactionScore = agent.csat;

      const ticketsWithSLA = agentTickets.filter((t: EnhancedTicket) => t.resolutionDue);
      const slaCompliant = ticketsWithSLA.filter((t: EnhancedTicket) => {
        if (!t.resolvedAt) return true;
        return new Date(t.resolvedAt) <= new Date(t.resolutionDue);
      }).length;
      const slaComplianceRate = ticketsWithSLA.length > 0
        ? Math.round((slaCompliant / ticketsWithSLA.length) * 100)
        : 100;

      const isTopPerformer = agentTickets.length > 25 && avgResponseTime < 30 && satisfactionScore >= 4.5;
      const needsAttention = agentTickets.length > 0 && (avgResponseTime > 60 || satisfactionScore < 4.2);

      return {
        agentId: agent.id,
        name: agent.name,
        email: agent.email,
        status: agent.status,
        role: agent.role,
        metrics: { ticketsHandled: agentTickets.length, resolvedTickets: resolvedTickets.length, avgResponseTime, satisfactionScore, slaComplianceRate },
        performance: { tier: isTopPerformer ? 'top' : needsAttention ? 'attention' : 'normal', isTopPerformer, needsAttention },
      };
    });

    const sortedPerformance = agentPerformance.sort((a: AgentPerformance, b: AgentPerformance) => {
      let aVal: number, bVal: number;
      switch (sortBy) {
        case 'tickets': aVal = a.metrics.ticketsHandled; bVal = b.metrics.ticketsHandled; break;
        case 'responseTime': aVal = a.metrics.avgResponseTime; bVal = b.metrics.avgResponseTime; break;
        case 'satisfaction': aVal = a.metrics.satisfactionScore; bVal = b.metrics.satisfactionScore; break;
        case 'sla': aVal = a.metrics.slaComplianceRate; bVal = b.metrics.slaComplianceRate; break;
        default: aVal = a.metrics.ticketsHandled; bVal = b.metrics.ticketsHandled;
      }
      return order === 'desc' ? bVal - aVal : aVal - bVal;
    });

    return NextResponse.json({
      success: true,
      data: {
        agents: sortedPerformance,
        summary: {
          totalAgents: agents.length,
          activeAgents: agents.filter((a: Agent) => a.status === 'online').length,
          topPerformers: sortedPerformance.filter((a: AgentPerformance) => a.performance.isTopPerformer).length,
          needsAttention: sortedPerformance.filter((a: AgentPerformance) => a.performance.needsAttention).length,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching team performance:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch team performance' }, { status: 500 });
  }
}
