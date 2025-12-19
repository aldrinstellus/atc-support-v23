// ATC Support (Christopher Hayes - Support Engineer) Conversation Patterns
// Query patterns and responses for ATC Support Agent persona

import type { WidgetData } from '@/types/widget';
import {
  ticketListDemo,
  ticketDetailDemo,
  agentDashboardDemo,
  agentPerformanceStatsDemo,
  similarTicketsAnalysisDemo,
  knowledgeBaseSearchDemo,
  responseComposerDemo,
} from '@/data/demo-widget-data';

export interface ConversationEntry {
  id: string;
  triggers: string[];
  userQuery: string;
  aiResponse: string;
  widgetType?: string;
  widgetData?: WidgetData;
}

const conversationEntries: ConversationEntry[] = [
  // Q1: My Tickets / Open Tickets
  {
    id: 'q1-my-tickets',
    triggers: [
      'my tickets',
      'open tickets',
      'my open tickets',
      'show my tickets',
      'assigned to me',
      'currently open',
      'all my',
      'support tickets',
      'my currently open',
      'open support tickets',
    ],
    userQuery: 'Show me my open tickets.',
    aiResponse: "Here are all tickets currently assigned to you:",
    widgetType: 'ticket-list',
    widgetData: {
      ...ticketListDemo,
      title: "My Tickets",
    },
  },

  // Q2: High-Priority Tickets
  {
    id: 'q2-priority-tickets',
    triggers: ['high-priority tickets', 'priority alerts', 'urgent tickets', 'high priority', 'critical tickets'],
    userQuery: 'Show me high-priority tickets.',
    aiResponse: "Here are your high-priority and critical tickets requiring immediate attention:",
    widgetType: 'ticket-list',
    widgetData: {
      ...ticketListDemo,
      title: 'High-Priority Tickets',
    },
  },

  // Q3: Escalated Tickets
  {
    id: 'q3-escalated',
    triggers: ['escalated to me', 'escalated tickets', 'escalations', 'my escalations'],
    userQuery: 'Show me tickets escalated to me.',
    aiResponse: "Here are tickets that have been escalated to you for advanced support:",
    widgetType: 'ticket-list',
    widgetData: {
      ...ticketListDemo,
      title: 'Escalated Tickets',
    },
  },

  // Q4: AI-Resolved Tickets
  {
    id: 'q4-ai-resolved',
    triggers: ['ai-resolved', 'ai resolved', 'ai automation', 'automated tickets', 'ai handled'],
    userQuery: 'Show me AI-resolved tickets.',
    aiResponse: "Here are tickets that were automatically resolved by AI automation:",
    widgetType: 'ticket-list',
    widgetData: {
      ...ticketListDemo,
      title: 'AI-Resolved Tickets',
    },
  },

  // Q5: Jira Sync Status
  {
    id: 'q5-jira-sync',
    triggers: ['jira sync', 'jira status', 'jira integration', 'jira connection'],
    userQuery: 'Check Jira sync status.',
    aiResponse: "Jira integration is active and syncing. Last sync: 2 minutes ago. All tickets are up to date with linked Jira issues.",
  },

  // Q6: Ticket Detail (Specific Ticket)
  {
    id: 'q6-ticket-detail',
    triggers: ['ticket #', 'ticket number', 'show ticket', 'ticket details'],
    userQuery: 'Show me details for ticket #TICK-001.',
    aiResponse: "Here are the complete details for this ticket:",
    widgetType: 'ticket-detail',
    widgetData: ticketDetailDemo,
  },

  // Q7: Agent Dashboard (Daily Overview)
  {
    id: 'q7-dashboard',
    triggers: ['my dashboard', 'daily overview', 'good morning', 'what\'s on my plate', 'today\'s work'],
    userQuery: 'Good morning. Show me my dashboard.',
    aiResponse: "Good morning! Here's what's on your plate today:",
    widgetType: 'agent-dashboard',
    widgetData: agentDashboardDemo,
  },

  // Q8: Knowledge Base Search
  {
    id: 'q8-kb-search',
    triggers: ['search kb', 'knowledge base', 'how do i', 'how to', 'find article'],
    userQuery: 'Search knowledge base for troubleshooting steps.',
    aiResponse: "I've searched the knowledge base for you:",
    widgetType: 'knowledge-base-search',
    widgetData: knowledgeBaseSearchDemo,
  },

  // Q9: Draft Response
  {
    id: 'q9-draft-response',
    triggers: ['draft response', 'help me respond', 'compose response', 'reply to customer'],
    userQuery: 'Draft a response for this ticket.',
    aiResponse: "I've drafted a response for you to review:",
    widgetType: 'response-composer',
    widgetData: responseComposerDemo,
  },

  // Q10: Performance Stats
  {
    id: 'q10-performance',
    triggers: ['my performance', 'my stats', 'performance stats', 'how am i doing'],
    userQuery: 'Show me my performance stats.',
    aiResponse: "Here's your comprehensive performance summary for this week:",
    widgetType: 'agent-performance-stats',
    widgetData: {
      ...agentPerformanceStatsDemo,
      title: 'Your Performance - This Week',
    },
  },

  // Q11: Password Reset Flow
  {
    id: 'q11-password-reset',
    triggers: ['password reset', 'reset password', 'locked out', 'password issue'],
    userQuery: 'Help customer with password reset.',
    aiResponse: "I can help you with password reset!\n\n**Step-by-Step Guide:**\n1. Navigate to login page\n2. Click 'Forgot Password?'\n3. Enter registered email\n4. Check email for reset link (valid 24 hours)\n5. Create new password (min 8 chars, 1 uppercase, 1 number)\n\n**Common Issues:**\n- Email not received? Check spam folder\n- Link expired? Request new reset link\n- Still having trouble? Escalate to IT support",
  },

  // Q12: Similar Tickets Analysis
  {
    id: 'q12-similar-tickets',
    triggers: ['similar tickets', 'ticket patterns', 'learn patterns', 'related tickets'],
    userQuery: 'Show me similar tickets I\'ve resolved.',
    aiResponse: "Here are patterns from similar tickets you've successfully resolved:",
    widgetType: 'similar-tickets-analysis',
    widgetData: {
      ...similarTicketsAnalysisDemo,
      title: 'Your Resolution Patterns - Integrations',
    },
  },

  // Q13: Call Preparation
  {
    id: 'q13-call-prep',
    triggers: ['prepare for call', 'call prep', 'customer call', 'prep notes'],
    userQuery: 'Prepare notes for customer call.',
    aiResponse: "**Call Prep Notes**\n\n**Customer:** Acme Corporation\n**Contact:** John Smith (CTO)\n**Purpose:** Technical escalation follow-up\n\n**Recent History:**\n- 3 tickets in last 30 days (2 resolved, 1 in progress)\n- Authentication issue resolved yesterday\n- Customer requested follow-up on prevention measures\n\n**Key Points:**\n- High-value enterprise account ($450K ARR)\n- Recent NPS score: 8/10 (Promoter)\n- Customer appreciates technical depth in responses\n\n**Talking Points:**\n1. Confirm authentication issue fully resolved\n2. Explain root cause and prevention steps taken\n3. Offer additional security audit if needed\n4. Thank them for patience during resolution",
  },
];

/**
 * Find best matching conversation entry for ATC Support Agent queries using scoring algorithm
 */
export function findBestMatch(userInput: string): ConversationEntry | null {
  const normalizedInput = userInput.toLowerCase().trim();

  const scoredMatches = conversationEntries
    .map((entry) => {
      const matchedTriggers = entry.triggers.filter((trigger) =>
        normalizedInput.includes(trigger.toLowerCase())
      );

      if (matchedTriggers.length === 0) return null;

      // Score calculation:
      // - Longer trigger phrases score higher (more specific)
      // - Multiple matches boost score by 10 per match
      const score =
        matchedTriggers.reduce((sum, trigger) => sum + trigger.length, 0) +
        matchedTriggers.length * 10;

      return { entry, score, matchCount: matchedTriggers.length };
    })
    .filter((match) => match !== null);

  if (scoredMatches.length === 0) return null;

  // Sort by score descending and return highest match
  scoredMatches.sort((a, b) => b!.score - a!.score);
  return scoredMatches[0]!.entry;
}
