// ATC Executive (Jennifer Anderson - CEO) Interactive Q&A Data
// Pattern matching for user input to trigger appropriate responses

import type { WidgetData } from '@/types/widget';
import {
  slaPerformanceChartDemo,
  customerRiskListDemo,
  analyticsDashboardDemo,
  sentimentAnalysisDemo,
} from '@/data/demo-widget-data';

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
// Reserved for future use - dynamic date generation for conversations
const _getDaysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
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

export interface ConversationEntry {
  id: string;
  triggers: string[]; // Keywords/phrases that trigger this response
  userQuery: string; // Default question text
  aiResponse: string;
  widgetType?: string;
  widgetData?: WidgetData;
}

export const atcExecutivePersona = {
  name: 'Jennifer Anderson',
  role: 'Chief Executive Officer',
  avatar: 'JA',
  company: 'ATC',
};

export const conversationEntries: ConversationEntry[] = [
  // Q1: Executive Summary
  {
    id: 'q1-exec-summary',
    triggers: ['executive summary', 'summary', 'overview', 'good morning', 'dashboard', 'board metrics'],
    userQuery: 'Good morning. Show me the executive summary.',
    aiResponse: "Good morning. Here's your executive summary for ATC:",
    widgetType: 'executive-summary',
    widgetData: {
      title: 'ATC Executive Summary',
      date: getCurrentDate(),
      sections: [
        {
          title: 'Client Satisfaction',
          status: 'success',
          value: '92%',
          change: '+5%',
          description: 'Customer satisfaction improved. NPS score at 67 (industry leading).',
        },
        {
          title: 'Revenue Growth',
          status: 'success',
          value: '$2.4M',
          change: '+18%',
          description: 'Q4 revenue exceeds forecast. Expansion revenue up 24%.',
        },
        {
          title: 'SLA Performance',
          status: 'warning',
          value: '89%',
          change: '-2%',
          description: 'Below target of 92%. 12 enterprise SLA breaches this month.',
        },
        {
          title: 'Team Efficiency',
          status: 'success',
          value: '3.8h',
          change: '-0.7h',
          description: 'Average resolution time decreased 15% from automation.',
        },
      ],
      keyInsights: [
        'Enterprise clients driving 67% of revenue growth - prioritize white-glove service.',
        'AI automation reduced support costs by $180K this quarter (22% efficiency gain).',
        'Two Fortune 500 prospects in final negotiation - potential $800K ARR.',
      ],
      recommendedActions: [
        {
          priority: 'high',
          action: 'Address enterprise SLA compliance gap',
          reason: 'Risk to $1.2M in enterprise contracts - immediate resource allocation needed',
        },
        {
          priority: 'medium',
          action: 'Review expansion sales pipeline with CSM team',
          reason: '12 accounts showing strong upsell signals based on product usage',
        },
      ],
    },
  },

  // Q2: Analytics Dashboard
  {
    id: 'q2-analytics',
    triggers: ['analytics', 'detailed analytics', 'show analytics', 'metrics'],
    userQuery: 'Show me the detailed analytics dashboard.',
    aiResponse: "Here's the comprehensive analytics dashboard for ATC operations:",
    widgetType: 'analytics-dashboard',
    widgetData: {
      ticketVolume: getShortDates(7),
      responseTime: [
        { hour: '9am', avgMinutes: 10 },
        { hour: '11am', avgMinutes: 14 },
        { hour: '1pm', avgMinutes: 22 },
        { hour: '3pm', avgMinutes: 18 },
        { hour: '5pm', avgMinutes: 12 },
      ],
      resolution: {
        resolved: 167,
        pending: 28,
        escalated: 8,
      },
    },
  },

  // Q3: Churn Risk / Customer Risk
  {
    id: 'q3-churn-risk',
    triggers: ['churn risk', 'churning', 'churn', 'at-risk customers', 'customer risk', 'risk score', 'customers at risk', 'highest risk', 'risk of churning'],
    userQuery: 'Show me customers at churn risk.',
    aiResponse: "Here are the high-risk customers requiring executive attention:",
    widgetType: 'customer-risk-list',
    widgetData: customerRiskListDemo,
  },

  // Q4: Sentiment Analysis
  {
    id: 'q4-sentiment',
    triggers: ['sentiment analysis', 'sentiment', 'customer sentiment', 'feedback', 'nps'],
    userQuery: 'Show me customer sentiment analysis.',
    aiResponse: "Here's the customer sentiment breakdown across your client base:",
    widgetType: 'sentiment-analysis',
    widgetData: sentimentAnalysisDemo,
  },

  // Q5: SLA Performance
  {
    id: 'q5-sla-performance',
    triggers: ['sla performance', 'sla', 'sla breakdown', 'service level'],
    userQuery: 'Show me SLA performance breakdown.',
    aiResponse: "Here's the detailed SLA performance across all service tiers:",
    widgetType: 'sla-performance-chart',
    widgetData: slaPerformanceChartDemo,
  },

  // Q6: Strategic Initiatives
  {
    id: 'q6-strategic-initiatives',
    triggers: ['strategic initiatives', 'initiatives', 'strategic projects', 'company initiatives'],
    userQuery: 'Show me current strategic initiatives.',
    aiResponse: "Here are ATC's active strategic initiatives with progress tracking:\n\n1. Enterprise Expansion (Q1 2026) - 67% complete\n2. AI Automation Scale-up - 82% complete\n3. Customer Health Score v2.0 - 45% complete\n4. Multi-channel Support Platform - 34% complete\n\nAll initiatives are on track or ahead of schedule.",
  },

  // Q7: Board Metrics
  {
    id: 'q7-board-metrics',
    triggers: ['board metrics', 'board report', 'board dashboard', 'board meeting', 'prepare metrics', 'board-level'],
    userQuery: 'Show me board-level metrics.',
    aiResponse: "Here are the board-level KPIs for this quarter:",
    widgetType: 'executive-summary',
    widgetData: {
      title: 'Board Metrics Dashboard',
      date: getCurrentDate(),
      sections: [
        {
          title: 'ARR Growth',
          status: 'success',
          value: '$18.2M',
          change: '+22%',
          description: 'Annual Recurring Revenue growing ahead of plan.',
        },
        {
          title: 'Customer Retention',
          status: 'success',
          value: '96%',
          change: '+3%',
          description: 'Net revenue retention at 118% (best-in-class).',
        },
        {
          title: 'CAC Payback',
          status: 'success',
          value: '11 months',
          change: '-2 months',
          description: 'Customer Acquisition Cost payback improving.',
        },
        {
          title: 'Gross Margin',
          status: 'success',
          value: '78%',
          change: '+4%',
          description: 'Automation driving margin expansion.',
        },
      ],
      keyInsights: [
        'On track to exceed $20M ARR by year-end (original target: $18.5M).',
        'Enterprise segment growing 3x faster than SMB segment.',
        'Support automation ROI: $720K annual savings with 92% accuracy.',
      ],
      recommendedActions: [
        {
          priority: 'high',
          action: 'Accelerate enterprise sales hiring',
          reason: 'Pipeline supports 40% growth - team capacity at 85%',
        },
        {
          priority: 'medium',
          action: 'Expand AI automation to customer onboarding',
          reason: 'Projected 30% reduction in time-to-value for new customers',
        },
      ],
    },
  },

  // Q8: Revenue Impact Analysis
  {
    id: 'q8-revenue-impact',
    triggers: ['revenue impact', 'revenue analysis', 'revenue metrics'],
    userQuery: 'Analyze revenue impact of support operations.',
    aiResponse: "Here's the revenue correlation analysis for support performance:",
    widgetType: 'analytics-dashboard',
    widgetData: analyticsDashboardDemo,
  },

  // Q9: Customer Retention Metrics
  {
    id: 'q9-retention-metrics',
    triggers: ['retention metrics', 'customer retention', 'churn rate'],
    userQuery: 'Show me customer retention metrics.',
    aiResponse: "Here are the customer retention and churn forecasts:",
    widgetType: 'customer-risk-list',
    widgetData: customerRiskListDemo,
  },

  // Q10: Performance Trends
  {
    id: 'q10-performance-trends',
    triggers: ['performance trends', 'trends', 'performance over time'],
    userQuery: 'Show me performance trends over the last quarter.',
    aiResponse: "Here's a comprehensive view of performance trends across all operations:",
    widgetType: 'performance-trends',
    widgetData: {
      period: 'Last 90 Days',
      metrics: [
        { date: 'Oct 1', responseTime: 3.1, resolutionTime: 17.2, satisfaction: 89 },
        { date: 'Oct 15', responseTime: 2.9, resolutionTime: 16.5, satisfaction: 90 },
        { date: 'Nov 1', responseTime: 2.7, resolutionTime: 15.8, satisfaction: 91 },
        { date: 'Nov 15', responseTime: 2.5, resolutionTime: 15.2, satisfaction: 92 },
        { date: 'Dec 1', responseTime: 2.4, resolutionTime: 14.9, satisfaction: 92 },
        { date: 'Dec 15', responseTime: 2.3, resolutionTime: 14.5, satisfaction: 93 },
        { date: 'Dec 20', responseTime: 2.2, resolutionTime: 14.1, satisfaction: 93 },
      ],
    },
  },

  // Q11: High-Value Accounts (matches Quick Action query)
  {
    id: 'q11-high-value-accounts',
    triggers: ['high-value', 'high value', 'top customer', 'top accounts', 'key accounts', 'enterprise accounts', 'status of top'],
    userQuery: 'Show me status of top 20 high-value customer accounts',
    aiResponse: "Here's the status overview of your top high-value customer accounts:",
    widgetType: 'customer-risk-list',
    widgetData: customerRiskListDemo,
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
