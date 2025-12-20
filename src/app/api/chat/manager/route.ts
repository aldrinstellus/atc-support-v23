import { NextRequest, NextResponse } from 'next/server';
import { getMockDatabase, queryTickets } from '@/data/mock/database';
import type { EnhancedTicket, Agent } from '@/types/mock';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ManagerChatRequest {
  messages: ChatMessage[];
  context?: {
    ticketId?: string;
    agentId?: string;
    customerId?: string;
  };
}

interface SuggestedAction {
  id: string;
  type: 'escalate' | 'reassign' | 'close' | 'follow_up' | 'coaching';
  label: string;
  description: string;
  confidence: number;
  params?: Record<string, string>;
}

function analyzeManagerQuery(query: string): { intent: string; entities: Record<string, string> } {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes('underperform') || lowerQuery.includes('struggling')) {
    return { intent: 'agent_coaching', entities: {} };
  }
  if (lowerQuery.includes('escalat') || lowerQuery.includes('urgent')) {
    return { intent: 'escalation_review', entities: {} };
  }
  if (lowerQuery.includes('workload') || lowerQuery.includes('redistribute')) {
    return { intent: 'workload_balance', entities: {} };
  }
  if (lowerQuery.includes('sla') || lowerQuery.includes('breach')) {
    return { intent: 'sla_analysis', entities: {} };
  }
  if (lowerQuery.includes('customer') && (lowerQuery.includes('risk') || lowerQuery.includes('churn'))) {
    return { intent: 'customer_risk', entities: {} };
  }
  if (lowerQuery.includes('team') && lowerQuery.includes('perform')) {
    return { intent: 'team_performance', entities: {} };
  }

  return { intent: 'general', entities: {} };
}

function generateManagerResponse(intent: string): { response: string; actions: SuggestedAction[] } {
  const db = getMockDatabase();
  const agents = db.agents.slice(0, 10);
  const { tickets } = queryTickets({});
  const openTickets = tickets.filter((t: EnhancedTicket) => t.status === 'open').slice(0, 5);

  switch (intent) {
    case 'agent_coaching':
      // Use csat (1-5 rating), convert to percentage for display (csat < 4.0 = below average)
      const lowPerformer = agents.find((a: Agent) => a.csat < 4.0);
      const csatPercent = lowPerformer ? Math.round(lowPerformer.csat * 20) : 72;
      return {
        response: `Based on my analysis, I've identified some agents who may benefit from coaching:\n\n**${lowPerformer?.name || 'Sarah Chen'}** - CSAT score of ${csatPercent}% is below team average. Key areas for improvement:\n- Response time consistency\n- First contact resolution\n- Customer empathy in communications\n\nI recommend scheduling a 1:1 coaching session and pairing them with a high performer for shadowing.`,
        actions: [
          { id: 'act-1', type: 'coaching', label: 'Schedule Coaching', description: 'Set up 1:1 coaching session', confidence: 0.92, params: { agentId: lowPerformer?.id || 'agent-1' } },
          { id: 'act-2', type: 'reassign', label: 'Reduce Workload', description: 'Temporarily reduce ticket assignment', confidence: 0.78 },
        ],
      };

    case 'escalation_review':
      const escalatedCount = openTickets.filter((t: EnhancedTicket) => t.priority === 'high' || t.priority === 'critical').length;
      return {
        response: `**Escalation Queue Status**\n\nYou have **${escalatedCount}** tickets requiring attention:\n\n1. **TICK-${Math.floor(Math.random() * 1000)}** - Critical: System outage for Enterprise client (2h old)\n2. **TICK-${Math.floor(Math.random() * 1000)}** - High: SLA breach imminent in 30 mins\n3. **TICK-${Math.floor(Math.random() * 1000)}** - High: VIP customer complaint\n\nRecommendation: Prioritize the system outage immediately and assign your most experienced agent.`,
        actions: [
          { id: 'act-1', type: 'escalate', label: 'Assign Top Agent', description: 'Assign to highest-rated available agent', confidence: 0.95 },
          { id: 'act-2', type: 'follow_up', label: 'Notify Stakeholders', description: 'Send status update to affected parties', confidence: 0.88 },
        ],
      };

    case 'workload_balance':
      // Use currentWorkload/capacity to calculate utilization
      const overloaded = agents.filter((a: Agent) => (a.currentWorkload / a.capacity) * 100 > 90);
      const available = agents.filter((a: Agent) => (a.currentWorkload / a.capacity) * 100 < 60);
      return {
        response: `**Workload Analysis**\n\n**Overloaded Agents (>90% utilization):**\n${overloaded.slice(0, 3).map((a: Agent) => `- ${a.name}: ${Math.round((a.currentWorkload / a.capacity) * 100)}%`).join('\n') || '- None currently'}\n\n**Available Capacity (<60% utilization):**\n${available.slice(0, 3).map((a: Agent) => `- ${a.name}: ${Math.round((a.currentWorkload / a.capacity) * 100)}%`).join('\n') || '- None currently'}\n\nRecommendation: Redistribute ${overloaded.length * 3} tickets from overloaded agents to those with available capacity.`,
        actions: [
          { id: 'act-1', type: 'reassign', label: 'Auto-Balance', description: 'Automatically redistribute tickets', confidence: 0.85 },
        ],
      };

    case 'sla_analysis':
      return {
        response: `**SLA Performance Summary**\n\n- **Current Compliance Rate**: 94.2%\n- **Breaches Today**: 3\n- **At Risk (next 2 hours)**: 7 tickets\n\n**Breach Breakdown by Priority:**\n- Critical: 1 (avg response: 45 mins vs 30 min target)\n- High: 2 (avg resolution: 5.2h vs 4h target)\n\n**Root Causes:**\n1. Understaffing during 2-4 PM shift\n2. Complex technical issues requiring escalation\n\nRecommendation: Add coverage during peak hours and create quick-reference guides for common issues.`,
        actions: [
          { id: 'act-1', type: 'escalate', label: 'Address At-Risk', description: 'Escalate tickets at risk of breach', confidence: 0.90 },
        ],
      };

    case 'customer_risk':
      return {
        response: `**Customer Risk Analysis**\n\n**High Churn Risk Customers:**\n1. **Acme Corp** - 3 unresolved escalations, CSAT dropped 20%\n2. **TechStart Inc** - Response times consistently above SLA\n3. **Global Services** - Multiple complaints this month\n\n**Recommended Actions:**\n- Schedule executive review calls\n- Assign dedicated account managers\n- Offer service credits where appropriate\n\nPotential revenue at risk: **$45,000 ARR**`,
        actions: [
          { id: 'act-1', type: 'follow_up', label: 'Schedule Reviews', description: 'Set up account review meetings', confidence: 0.88 },
        ],
      };

    case 'team_performance':
      // Use csat (1-5) and convert to percentage for display
      const avgCSAT = agents.reduce((sum: number, a: Agent) => sum + (a.csat || 0), 0) / agents.length;
      const avgCSATPercent = (avgCSAT * 20).toFixed(1);
      return {
        response: `**Team Performance Overview**\n\n**Key Metrics (This Week):**\n- Tickets Resolved: 847\n- Avg CSAT: ${avgCSATPercent}%\n- Avg Response Time: 12 mins\n- First Contact Resolution: 78%\n\n**Top Performers:**\n${agents.slice(0, 3).map((a: Agent, i: number) => `${i + 1}. ${a.name} - ${a.ticketsResolvedThisWeek} tickets, ${Math.round(a.csat * 20)}% CSAT`).join('\n')}\n\nOverall team is performing 8% above benchmark.`,
        actions: [
          { id: 'act-1', type: 'coaching', label: 'Recognize Top Performers', description: 'Send recognition to top performers', confidence: 0.75 },
        ],
      };

    default:
      return {
        response: `I can help you with:\n\n- **Team Performance** - View metrics and identify trends\n- **Agent Coaching** - Find agents who need support\n- **Escalation Review** - Manage urgent tickets\n- **Workload Balance** - Redistribute work efficiently\n- **SLA Analysis** - Monitor compliance and breaches\n- **Customer Risk** - Identify at-risk accounts\n\nWhat would you like to explore?`,
        actions: [],
      };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ManagerChatRequest = await request.json();
    const { messages, context } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== 'user') {
      return NextResponse.json({ error: 'Last message must be from user' }, { status: 400 });
    }

    const { intent } = analyzeManagerQuery(lastMessage.content);
    const { response, actions } = generateManagerResponse(intent);

    return NextResponse.json({
      success: true,
      message: {
        role: 'assistant',
        content: response,
      },
      suggestedActions: actions,
      context: {
        intent,
        ...context,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
  }
}
