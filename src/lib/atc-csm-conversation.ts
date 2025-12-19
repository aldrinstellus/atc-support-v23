// ATC CSM (Jordan Taylor - Customer Success Manager) Conversation Patterns
// Query patterns and responses for ATC CSM persona

import type { WidgetData } from '@/types/widget';
import {
  sentimentAnalysisDemo,
  customerRiskListDemo,
  analyticsDashboardDemo,
} from '@/data/demo-widget-data';
import {
  clientHealthDashboardDemo,
  renewalPipelineDemo,
  upsellOpportunitiesDemo,
  productAdoptionMetricsDemo,
  csmInsightsDashboardDemo,
  csmTrainingDashboardDemo,
} from '@/data/csm-widget-data';

export interface ConversationEntry {
  id: string;
  triggers: string[];
  userQuery: string;
  aiResponse: string;
  widgetType?: string;
  widgetData?: WidgetData;
}

const conversationEntries: ConversationEntry[] = [
  // Q1: Client Health Scores
  {
    id: 'q1-health-scores',
    triggers: ['client health scores', 'health scores', 'customer health', 'account health'],
    userQuery: 'Show me client health scores.',
    aiResponse: "Here are the health scores for your assigned client portfolio:",
    widgetType: 'client-health-dashboard',
    widgetData: clientHealthDashboardDemo,
  },

  // Q2: Product Adoption Metrics
  {
    id: 'q2-product-adoption',
    triggers: ['product adoption', 'adoption metrics', 'feature usage', 'usage analytics'],
    userQuery: 'Show me product adoption metrics.',
    aiResponse: "Here's the product adoption analysis showing feature usage across your client base:",
    widgetType: 'product-adoption-metrics',
    widgetData: productAdoptionMetricsDemo,
  },

  // Q3: Renewal Pipeline
  {
    id: 'q3-renewal-pipeline',
    triggers: ['renewal pipeline', 'upcoming renewals', 'renewals', 'contract renewals'],
    userQuery: 'Show me the renewal pipeline.',
    aiResponse: "Here are your upcoming renewals for the next 90 days:",
    widgetType: 'renewal-pipeline',
    widgetData: renewalPipelineDemo,
  },

  // Q4: Client Feedback / NPS
  {
    id: 'q4-client-feedback',
    triggers: ['client feedback', 'nps', 'customer feedback', 'satisfaction scores', 'feedback analysis'],
    userQuery: 'Show me client feedback and NPS data.',
    aiResponse: "Here's the client feedback analysis with Net Promoter Scores:",
    widgetType: 'sentiment-analysis',
    widgetData: sentimentAnalysisDemo,
  },

  // Q5: Upsell Opportunities
  {
    id: 'q5-upsell',
    triggers: ['upsell opportunities', 'upsell', 'expansion opportunities', 'growth opportunities'],
    userQuery: 'Show me upsell opportunities.',
    aiResponse: "Here are accounts with strong upsell potential based on product usage:",
    widgetType: 'upsell-opportunities',
    widgetData: upsellOpportunitiesDemo,
  },

  // Q6: Product Roadmap
  {
    id: 'q6-product-roadmap',
    triggers: ['product roadmap', 'roadmap', 'upcoming features', 'feature releases'],
    userQuery: 'Show me the product roadmap.',
    aiResponse: "Here's the product roadmap with upcoming features and client-requested items:",
    widgetType: 'analytics-dashboard',
    widgetData: analyticsDashboardDemo,
  },

  // Q7: Client Meetings / QBRs
  {
    id: 'q7-client-meetings',
    triggers: ['client meetings', 'schedule meeting', 'qbr', 'business review', 'upcoming meetings'],
    userQuery: 'Show me upcoming client meetings.',
    aiResponse: "Here are your scheduled client meetings and business reviews:",
    widgetType: 'meeting-scheduler',
    widgetData: {
      title: 'Client Meetings Schedule',
      type: 'Quarterly Business Review',
      duration: '60 minutes',
      availableSlots: [],
      attendees: [],
    },
  },

  // Q8: Churn Risk Analysis
  {
    id: 'q8-churn-risk',
    triggers: ['churn risk', 'at-risk clients', 'risk analysis', 'clients at risk'],
    userQuery: 'Show me clients at churn risk.',
    aiResponse: "Here's the churn risk assessment identifying accounts requiring intervention:",
    widgetType: 'customer-risk-list',
    widgetData: customerRiskListDemo,
  },

  // Q9: Declining Product Adoption
  {
    id: 'q9-declining-adoption',
    triggers: ['declining adoption', 'declining usage', 'low adoption', 'adoption issues'],
    userQuery: 'Show me clients with declining product adoption.',
    aiResponse: "Here are clients showing declining engagement that require attention:",
    widgetType: 'product-adoption-metrics',
    widgetData: productAdoptionMetricsDemo,
  },

  // Q10: Expansion Revenue Opportunities
  {
    id: 'q10-expansion-revenue',
    triggers: ['expansion revenue', 'revenue expansion', 'cross-sell', 'premium upgrade'],
    userQuery: 'Show me expansion revenue opportunities.',
    aiResponse: "Here's the revenue expansion analysis with cross-sell and upsell opportunities:",
    widgetType: 'upsell-opportunities',
    widgetData: upsellOpportunitiesDemo,
  },

  // Q11: Client Engagement Trends
  {
    id: 'q11-engagement-trends',
    triggers: ['engagement trends', 'client engagement', 'engagement metrics', 'interaction trends'],
    userQuery: 'Show me client engagement trends.',
    aiResponse: "Here's the client engagement trend analysis revealing interaction patterns:",
    widgetType: 'sentiment-analysis',
    widgetData: sentimentAnalysisDemo,
  },

  // Q12: Business Review Scheduling
  {
    id: 'q12-qbr-scheduling',
    triggers: ['schedule qbr', 'business review schedule', 'which clients need qbr'],
    userQuery: 'Which clients need business reviews?',
    aiResponse: "Here are clients requiring quarterly business reviews:",
    widgetType: 'meeting-scheduler',
    widgetData: {
      title: 'Business Review Scheduler',
      type: 'Quarterly Business Review',
      duration: '60 minutes',
      availableSlots: [],
      attendees: [],
    },
  },

  // Q13: Most Requested Features
  {
    id: 'q13-requested-features',
    triggers: ['most requested', 'requested features', 'feature requests', 'client requests'],
    userQuery: 'Show me most requested roadmap items.',
    aiResponse: "Here are the product roadmap features most requested by clients:",
    widgetType: 'analytics-dashboard',
    widgetData: analyticsDashboardDemo,
  },

  // Q14: NPS Survey Results
  {
    id: 'q14-nps-results',
    triggers: ['nps results', 'nps survey', 'survey results', 'latest nps'],
    userQuery: 'Show me recent NPS survey results.',
    aiResponse: "Here are the recent NPS survey results by client:",
    widgetType: 'sentiment-analysis',
    widgetData: sentimentAnalysisDemo,
  },

  // Q15: Premium Tier Upgrades
  {
    id: 'q15-premium-upgrades',
    triggers: ['premium upgrade', 'tier upgrade', 'premium tier', 'upgrade candidates'],
    userQuery: 'Show me clients ready for premium tier upgrade.',
    aiResponse: "Here are clients positioned for premium tier upgrades based on usage patterns:",
    widgetType: 'upsell-opportunities',
    widgetData: upsellOpportunitiesDemo,
  },

  // Q16: Revenue Retention Metrics
  {
    id: 'q16-revenue-retention',
    triggers: ['revenue retention', 'retention metrics', 'net revenue retention', 'arr retention'],
    userQuery: 'Analyze revenue retention and expansion metrics.',
    aiResponse: "Here's the revenue retention and expansion metrics analysis:",
    widgetType: 'renewal-pipeline',
    widgetData: renewalPipelineDemo,
  },

  // Q17: Customer Insights (AI-Powered)
  {
    id: 'q17-customer-insights',
    triggers: ['customer insights', 'insights', 'ai insights', 'predictive insights', 'client insights'],
    userQuery: 'Show me customer insights.',
    aiResponse: "Here are AI-powered insights across your client portfolio:",
    widgetType: 'csm-insights-dashboard',
    widgetData: csmInsightsDashboardDemo,
  },

  // Q18: Customer Training Management
  {
    id: 'q18-training',
    triggers: ['training', 'customer training', 'training sessions', 'training management', 'schedule training'],
    userQuery: 'Show me customer training status.',
    aiResponse: "Here's the training management dashboard for your clients:",
    widgetType: 'csm-training-dashboard',
    widgetData: csmTrainingDashboardDemo,
  },
];

/**
 * Find best matching conversation entry for ATC CSM queries using scoring algorithm
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
