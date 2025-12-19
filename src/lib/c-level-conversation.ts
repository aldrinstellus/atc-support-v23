// C-Level Executive Interactive Q&A Data
// Pattern matching for user input to trigger appropriate responses

import type { WidgetData } from '@/types/widget';
import { slaPerformanceChartDemo } from '@/data/demo-widget-data';

// =============================================================================
// DATE HELPER FUNCTIONS - Dynamic dates that update to current time
// =============================================================================

// Get current date in "Month DD, YYYY" format
const getCurrentDate = (): string => {
  return new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

// Get date N days ago in "Month DD, YYYY" format
const getDaysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

// Get ISO date N days ago (YYYY-MM-DD format)
const getISODaysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
};

// Get ISO date for tomorrow
const getTomorrow = (): string => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().split('T')[0];
};

// Get short date format (e.g., "Dec 20") for last N days
const getShortDates = (count: number): Array<{ date: string; tickets: number }> => {
  const dates: Array<{ date: string; tickets: number }> = [];
  for (let i = count - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const shortDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const tickets = Math.floor(Math.random() * 30) + 35; // Random 35-65
    dates.push({ date: shortDate, tickets });
  }
  return dates;
};

// Get timestamp with relative format (e.g., "Dec 20, 9:00 AM")
const getRelativeTimestamp = (daysAgo: number, time: string): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return `${dateStr}, ${time}`;
};

export interface ConversationEntry {
  id: string;
  triggers: string[]; // Keywords/phrases that trigger this response
  userQuery: string; // Default question text
  aiResponse: string;
  widgetType?: string;
  widgetData?: WidgetData;
}

export const cLevelPersona = {
  name: 'Sarah Chen',
  role: 'Chief Executive Officer',
  avatar: 'SC',
  company: 'TechCorp',
};

export const conversationEntries: ConversationEntry[] = [
  // Q1: Executive Summary
  {
    id: 'q1-exec-summary',
    triggers: ['executive summary', 'summary', 'overview', 'good morning', 'dashboard'],
    userQuery: 'Good morning. Give me the executive summary for today.',
    aiResponse: "Good morning. Here's your executive summary for today:",
    widgetType: 'executive-summary',
    widgetData: {
      title: 'Executive Summary',
      date: getCurrentDate(),
      sections: [
        {
          title: 'SLA Performance',
          status: 'warning',
          value: '87%',
          change: '-3%',
          description: 'Below target of 90%. 8 tickets breached SLA in last 24 hours.',
        },
        {
          title: 'Customer Health',
          status: 'critical',
          value: '3 at-risk',
          change: '+1',
          description: 'Acme Corp escalated to high risk. Requires immediate attention.',
        },
        {
          title: 'Ticket Volume',
          status: 'success',
          value: '142',
          change: '-12%',
          description: '24% decrease from last week. Trending positively.',
        },
        {
          title: 'Team Performance',
          status: 'success',
          value: '4.2h',
          change: '-0.5h',
          description: 'Average resolution time improved by 10%.',
        },
      ],
      keyInsights: [
        "Acme Corp's risk score increased to 82 due to 3 critical unresolved tickets and declining sentiment.",
        'Engineering escalations up 15% - may indicate product quality issues.',
        'Sarah Chen is top performer with 95% customer satisfaction.',
      ],
      recommendedActions: [
        {
          priority: 'high',
          action: 'Schedule executive call with Acme Corp',
          reason: 'Customer at risk of churn (78% probability)',
        },
        {
          priority: 'medium',
          action: 'Review engineering escalation trends with Product team',
          reason: '15% increase suggests systemic issues',
        },
      ],
    },
  },

  // Q2: Detailed Analytics
  {
    id: 'q2-analytics',
    triggers: ['analytics', 'detailed analytics', 'ticket volume', 'response time'],
    userQuery: 'Show me the detailed analytics.',
    aiResponse: "Here's the detailed analytics breakdown for the past week:",
    widgetType: 'analytics-dashboard',
    widgetData: {
      ticketVolume: getShortDates(7),
      responseTime: [
        { hour: '9am', avgMinutes: 12 },
        { hour: '11am', avgMinutes: 18 },
        { hour: '1pm', avgMinutes: 25 },
        { hour: '3pm', avgMinutes: 22 },
        { hour: '5pm', avgMinutes: 15 },
      ],
      resolution: {
        resolved: 142,
        pending: 38,
        escalated: 12,
      },
    },
  },

  // Q3: Comprehensive Dashboard - removed invalid widget type

  // Q4: Acme Corp Risk Profile
  {
    id: 'q4-acme-risk',
    triggers: ['acme corp', 'acme', 'risk score', 'why risk', 'customer risk'],
    userQuery: 'Tell me more about Acme Corp. Why did their risk score increase?',
    aiResponse: "Let me pull up Acme Corp's detailed risk profile:",
    widgetType: 'customer-risk-profile',
    widgetData: {
      customerId: 'CUST-001',
      customerName: 'Acme Corporation',
      riskScore: 82,
      riskLevel: 'high',
      previousScore: 58,
      trend: 'increasing',
      accountValue: '$450,000 ARR',
      contractRenewal: '45 days',
      riskFactors: [
        {
          factor: 'Critical Open Tickets',
          severity: 'high',
          count: 3,
          description: 'Authentication failures, data export issues, API rate limiting',
          impact: '+15 points',
        },
        {
          factor: 'Sentiment Declining',
          severity: 'high',
          trend: 'down',
          currentValue: '45%',
          previousValue: '78%',
          description: 'Negative sentiment in last 5 communications',
          impact: '+12 points',
        },
        {
          factor: 'Escalations',
          severity: 'medium',
          count: 2,
          description: 'CEO contacted support directly twice',
          impact: '+8 points',
        },
      ],
      recentActivity: [
        {
          date: getDaysAgo(1),
          event: 'CEO escalation',
          description: 'CEO emailed support@ directly about authentication issues',
        },
        {
          date: getDaysAgo(2),
          event: 'Critical ticket opened',
          description: 'Data export failing for 200+ users',
        },
      ],
      aiAnalysis:
        "Acme Corp is experiencing a critical period. The combination of recurring technical issues, executive-level escalations, and declining sentiment indicates significant dissatisfaction. Their contract renewal is in 45 days, making this a high-priority retention risk.",
      recommendations: [
        {
          priority: 'critical',
          action: 'Executive Call',
          description: 'Schedule call between your team and Acme CEO within 24 hours',
          estimatedImpact: 'High - Direct executive engagement shows commitment',
        },
        {
          priority: 'critical',
          action: 'Dedicated Task Force',
          description: 'Assign senior engineering team to resolve authentication issue immediately',
          estimatedImpact: 'High - Resolves primary pain point',
        },
      ],
    },
  },

  // Q5: Sentiment Analysis
  {
    id: 'q5-sentiment',
    triggers: ['sentiment', 'customer sentiment', 'feedback', 'sentiment breakdown'],
    userQuery: 'Show me the sentiment breakdown for Acme Corp.',
    aiResponse: "Here's the customer sentiment analysis for Acme Corp:",
    widgetType: 'sentiment-analysis',
    widgetData: {
      overall: 'negative',
      score: 45,
      breakdown: {
        positive: 18,
        neutral: 37,
        negative: 45,
      },
      recentComments: [
        {
          text: 'The authentication issue is blocking our entire team. This has been going on for over a week.',
          sentiment: 'negative',
          timestamp: '2 hours ago',
        },
        {
          text: 'We appreciate the quick response, but we need a permanent solution.',
          sentiment: 'neutral',
          timestamp: '1 day ago',
        },
        {
          text: 'Support team is responsive but the product issues keep recurring.',
          sentiment: 'negative',
          timestamp: '2 days ago',
        },
      ],
    },
  },

  // Q6: Escalation Path
  {
    id: 'q6-escalation',
    triggers: ['escalation', 'escalation path', 'ticket escalation', 'escalation stages'],
    userQuery: "What's the escalation path for this ticket?",
    aiResponse: "Here's the escalation timeline for the Acme Corp authentication issue:",
    widgetType: 'escalation-path',
    widgetData: {
      ticketId: 'TICK-001',
      currentStage: 2,
      stages: [
        {
          level: 'L1 Support Agent',
          assignee: 'Sarah Chen',
          status: 'completed',
          timestamp: getRelativeTimestamp(8, '9:00 AM'),
          duration: '4 hours',
          notes: 'Initial troubleshooting attempted. Issue requires engineering involvement.',
        },
        {
          level: 'L2 Engineering',
          assignee: 'David Kumar',
          status: 'completed',
          timestamp: getRelativeTimestamp(7, '2:00 PM'),
          duration: '2 days',
          notes: 'Identified authentication service bug. Requires architecture review.',
        },
        {
          level: 'Senior Engineering',
          assignee: 'Engineering Team',
          status: 'current',
          timestamp: getRelativeTimestamp(5, '10:00 AM'),
          duration: '5 days (ongoing)',
          notes: 'Working on fix. Complexity higher than initially estimated.',
        },
        {
          level: 'Executive Escalation',
          assignee: 'To be assigned',
          status: 'pending',
        },
      ],
      recommendedAction:
        'Given the duration (8 days) and customer impact, recommend executive intervention and dedicated task force.',
    },
  },

  // Q7: Schedule Call (AI Response Only)
  {
    id: 'q7-schedule-call',
    triggers: ['schedule call', 'executive call', 'meeting', 'who should attend'],
    userQuery: 'Schedule that executive call. Who should attend from our side?',
    aiResponse:
      "I recommend the following attendees:\n\n**From TechCorp:**\n- You (CEO) - Executive leadership\n- Jennifer Walsh (CSM) - Account context and history\n- David Kumar (VP Engineering) - Technical authority\n- Optional: CTO if technical deep-dive required\n\n**From Acme Corp:**\n- Their CEO (who escalated)\n- CTO (technical stakeholder)\n- Their technical team lead\n\nWould you like me to check everyone's availability and send calendar invites?",
  },

  // Q8: Find Meeting Time
  {
    id: 'q8-find-time',
    triggers: [
      // Affirmative responses (for Q7 "Would you like me to check availability?" follow-up)
      'yes', 'yeah', 'yep', 'sure', 'ok', 'okay', 'please', 'go ahead', 'proceed',
      // Original explicit triggers
      'find time', 'availability', 'check calendar', 'schedule meeting', 'calendar'
    ],
    userQuery: 'Yes, find a time today or tomorrow. Make it 1 hour.',
    aiResponse: "I've checked everyone's calendars. Here are the available time slots:",
    widgetType: 'meeting-scheduler',
    widgetData: {
      title: 'Executive Call: Acme Corp Escalation',
      duration: '60 minutes',
      availableSlots: [
        {
          date: getISODaysAgo(0), // Today
          time: '14:00 - 15:00',
          timezone: 'PST',
          status: 'available',
          conflicts: [],
        },
        {
          date: getISODaysAgo(0), // Today
          time: '16:00 - 17:00',
          timezone: 'PST',
          status: 'available',
          conflicts: [],
        },
        {
          date: getTomorrow(),
          time: '10:00 - 11:00',
          timezone: 'PST',
          status: 'available',
          conflicts: [],
        },
        {
          date: getTomorrow(),
          time: '13:00 - 14:00',
          timezone: 'PST',
          status: 'preferred',
          conflicts: [],
          note: 'All key attendees available',
        },
      ],
      attendees: [
        { name: 'Sarah Chen (You)', status: 'organizer', required: true },
        { name: 'Jennifer Walsh', status: 'available', required: true },
        { name: 'David Kumar', status: 'available', required: true },
        { name: 'Acme Corp CEO', status: 'external', required: true },
        { name: 'Acme Corp CTO', status: 'external', required: true },
      ],
      agenda: [
        'Acknowledge current service issues and apologize',
        'Review authentication problem - timeline and resolution plan',
        'Discuss data export issue and workarounds',
        'Outline immediate action items with owners and dates',
        'Address any additional concerns',
        'Commit to daily update cadence until resolved',
      ],
    },
  },

  // Q9: Book Meeting
  {
    id: 'q9-book-meeting',
    triggers: ['book', 'confirm', 'schedule', 'tomorrow', '1pm', '13:00'],
    userQuery: 'Book the tomorrow at 1pm slot.',
    aiResponse: 'Perfect! Meeting confirmed and calendar invites sent to all attendees.',
    widgetType: 'meeting-confirmation',
    widgetData: {
      meetingDate: getTomorrow(),
      meetingTime: '1:00 PM',
      timezone: 'PST',
      duration: '1 hour',
      location: 'Video Conference',
      invitesSent: [
        { name: 'Jennifer Walsh', email: 'jennifer.walsh@techcorp.com', role: 'CSM' },
        { name: 'David Kumar', email: 'david.kumar@techcorp.com', role: 'VP Engineering' },
        { name: 'John Smith', email: 'john.smith@acmecorp.com', role: 'CEO' },
        { name: 'Sarah Jones', email: 'sarah.jones@acmecorp.com', role: 'CTO' },
      ],
      briefingCreated: true,
      briefingItems: [
        'Full account history',
        'All open tickets with technical details',
        'Sentiment analysis from recent interactions',
        'Recommended talking points',
      ],
      nextAction: 'Would you like to review the briefing now?',
    },
  },

  // Q10: SLA Performance
  {
    id: 'q10-sla-performance',
    triggers: ['sla', 'sla performance', 'sla breakdown', 'failing', 'performance'],
    userQuery: 'Show me the SLA performance breakdown. Which categories are we failing?',
    aiResponse: "Here's the detailed SLA performance breakdown:",
    widgetType: 'sla-performance-chart',
    widgetData: slaPerformanceChartDemo,
  },

  // NEW Q&A #1: Performance Trends (UNIQUE - Keep)
  {
    id: 'q11-performance-trends',
    triggers: ['performance trends', 'team performance', 'performance over time', 'metrics trends', 'response time trends'],
    userQuery: 'Show me our performance trends over the last week',
    aiResponse: "Here's a comprehensive view of your team's performance trends over the last 7 days, including response time, resolution time, and customer satisfaction metrics:",
    widgetType: 'performance-trends',
    widgetData: {
      period: 'Last 7 Days',
      metrics: [
        { date: 'Dec 13', responseTime: 3.2, resolutionTime: 18.5, satisfaction: 87 },
        { date: 'Dec 14', responseTime: 3.8, resolutionTime: 20.1, satisfaction: 85 },
        { date: 'Dec 15', responseTime: 2.9, resolutionTime: 16.8, satisfaction: 89 },
        { date: 'Dec 16', responseTime: 4.5, resolutionTime: 22.3, satisfaction: 82 },
        { date: 'Dec 17', responseTime: 3.5, resolutionTime: 19.2, satisfaction: 86 },
        { date: 'Dec 18', responseTime: 3.1, resolutionTime: 17.9, satisfaction: 88 },
        { date: 'Dec 19', responseTime: 4.2, resolutionTime: 21.5, satisfaction: 84 },
      ],
    },
  },
];

// Pattern matching function to find the best match with scoring
export function findBestMatch(userInput: string): ConversationEntry | null {
  const normalizedInput = userInput.toLowerCase().trim();

  // Score each entry based on trigger matches
  const scoredMatches = conversationEntries
    .map((entry) => {
      const matchedTriggers = entry.triggers.filter((trigger) =>
        normalizedInput.includes(trigger.toLowerCase())
      );

      if (matchedTriggers.length === 0) return null;

      // Calculate score: number of matches + total length of matched triggers
      const score = matchedTriggers.reduce((sum, trigger) => sum + trigger.length, 0) + (matchedTriggers.length * 10);

      return { entry, score, matchCount: matchedTriggers.length };
    })
    .filter((match) => match !== null) as Array<{ entry: ConversationEntry; score: number; matchCount: number }>;

  // Return entry with highest score (most specific match)
  if (scoredMatches.length === 0) return null;

  scoredMatches.sort((a, b) => b.score - a.score);
  return scoredMatches[0].entry;
}
