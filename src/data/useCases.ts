/**
 * Use Cases Data
 *
 * Real-world scenarios demonstrating how each persona
 * benefits from the AI-Enhanced Customer Support platform.
 *
 * Phase 3: Presentation Polish
 */

export interface UseCase {
  id: string;
  title: string;
  persona: 'C-Level Executive' | 'CS Manager' | 'Support Agent' | 'Client Success Manager';
  personaIcon: string;
  scenario: string;
  challenge: string;
  solution: string;
  result: string;
  metrics?: {
    label: string;
    value: string;
    improvement?: string;
  }[];
  tags: string[];
}

export const useCases: UseCase[] = [
  {
    id: 'uc-executive-1',
    title: 'Strategic Decision Making',
    persona: 'C-Level Executive',
    personaIcon: 'crown',
    scenario: 'CEO needs real-time customer health metrics for quarterly board meeting presentation',
    challenge: 'Historical data scattered across multiple systems. No unified view of customer satisfaction trends and churn risk.',
    solution: 'AI-powered executive dashboard aggregates data from all touchpoints, providing predictive analytics and trend analysis with natural language insights.',
    result: 'Presented accurate churn risk analysis to the board, identified at-risk accounts worth $2M in ARR, and implemented proactive retention strategy.',
    metrics: [
      { label: 'Time Saved', value: '4 hours', improvement: '85% reduction' },
      { label: 'Revenue Protected', value: '$2M ARR', improvement: 'Prevented churn' },
      { label: 'Data Accuracy', value: '99.8%', improvement: 'Real-time sync' },
    ],
    tags: ['executive', 'analytics', 'churn-prevention', 'board-meeting'],
  },
  {
    id: 'uc-manager-1',
    title: 'Team Performance Optimization',
    persona: 'CS Manager',
    personaIcon: 'users',
    scenario: 'CS Manager faces peak ticket volume during product launch with uneven agent workload distribution',
    challenge: 'Some agents overwhelmed with 25+ tickets while others have <10. Manual reassignment takes too long, SLA breaches imminent.',
    solution: 'AI analyzes real-time ticket complexity, agent skills, current workload, and response times. Recommends optimal ticket reassignments with one-click execution.',
    result: 'Balanced workload across team in 5 minutes. Reduced average resolution time by 35%, prevented 47 SLA breaches, increased team satisfaction score from 6.2 to 8.9.',
    metrics: [
      { label: 'Resolution Time', value: '35% faster', improvement: '8.5 → 5.5 hours avg' },
      { label: 'SLA Compliance', value: '100%', improvement: '47 breaches prevented' },
      { label: 'Team Satisfaction', value: '8.9/10', improvement: '+44% from 6.2' },
    ],
    tags: ['manager', 'workload-balancing', 'sla', 'team-optimization'],
  },
  {
    id: 'uc-agent-1',
    title: 'Agent Productivity Boost',
    persona: 'Support Agent',
    personaIcon: 'headphones',
    scenario: 'Support agent receives complex technical issue from enterprise client with 2-hour SLA deadline',
    challenge: 'Unfamiliar with this specific integration issue. Searching internal docs, Slack, and past tickets could take 30+ minutes. Clock is ticking.',
    solution: 'AI instantly surfaces 3 similar resolved tickets, relevant KB articles, and suggests response template with technical solution. Agent can customize and send in minutes.',
    result: 'Resolved critical issue in 12 minutes (3x faster than 36-minute average). Customer praised quick response. Agent confidence increased, stress reduced.',
    metrics: [
      { label: 'Resolution Time', value: '12 minutes', improvement: '3x faster than avg' },
      { label: 'CSAT Score', value: '5/5 stars', improvement: 'Praised speed' },
      { label: 'Agent Confidence', value: '+60%', improvement: 'Self-reported' },
    ],
    tags: ['agent', 'productivity', 'knowledge-base', 'sla', 'customer-satisfaction'],
  },
  {
    id: 'uc-csm-1',
    title: 'Proactive Client Success',
    persona: 'Client Success Manager',
    personaIcon: 'briefcase',
    scenario: 'CSM manages 50 enterprise accounts and needs to identify accounts at risk of churn during renewal season',
    challenge: 'No time to manually review product adoption, support ticket trends, and engagement metrics for all 50 accounts. Risk of missing early warning signs.',
    solution: 'AI continuously monitors product usage, NPS trends, support ticket sentiment, and executive engagement. Surfaces top 8 at-risk accounts with recommended intervention actions.',
    result: 'Proactively reached out to 8 at-risk accounts with personalized retention offers. Saved 6 accounts worth $480K ARR. Increased renewal rate from 82% to 94%.',
    metrics: [
      { label: 'Accounts Saved', value: '6 of 8', improvement: '75% success rate' },
      { label: 'Revenue Retained', value: '$480K ARR', improvement: 'Prevented churn' },
      { label: 'Renewal Rate', value: '94%', improvement: '+12% from 82%' },
    ],
    tags: ['csm', 'churn-prevention', 'renewals', 'product-adoption', 'revenue-retention'],
  },
];

/**
 * Get use cases by persona
 */
export const getUseCasesByPersona = (
  persona: 'C-Level Executive' | 'CS Manager' | 'Support Agent' | 'Client Success Manager'
): UseCase[] => {
  return useCases.filter(uc => uc.persona === persona);
};

/**
 * Get use case by ID
 */
export const getUseCaseById = (id: string): UseCase | undefined => {
  return useCases.find(uc => uc.id === id);
};

/**
 * Get use cases by tag
 */
export const getUseCasesByTag = (tag: string): UseCase[] => {
  return useCases.filter(uc => uc.tags.includes(tag));
};

/**
 * Get all unique tags from use cases
 */
export const getAllUseCaseTags = (): string[] => {
  const tags = new Set<string>();
  useCases.forEach(uc => uc.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
};
