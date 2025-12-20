// Mock Data Types - Re-exports

// Company types
export type {
  CompanyTier,
  RiskLevel,
  CompanyLocation,
  Company,
  CompanyFilters,
  CompanyStats,
  Industry,
} from './company';
export { INDUSTRIES } from './company';

// Contact types
export type {
  Contact,
  ContactFilters,
  Department,
} from './contact';
export { DEPARTMENTS, JOB_TITLES } from './contact';

// Agent types
export type {
  AgentStatus,
  AgentRole,
  Agent,
  Team,
  AgentFilters,
  AgentWorkload,
  AgentSkill,
  TeamFocusArea,
} from './agent';
export { AGENT_SKILLS, TEAM_FOCUS_AREAS } from './agent';

// Ticket types
export type {
  TicketStatus,
  TicketPriority,
  TicketChannel,
  TicketSentiment,
  TicketCategory,
  EnhancedTicket,
  TicketActionType,
  TicketActivity,
  TicketFilters,
  TicketSortConfig,
  TicketTag,
} from './ticket';
export { TICKET_CATEGORIES, TICKET_TAGS } from './ticket';

// SLA types
export type {
  SLAConfig,
  SLABreach,
  SLAAtRisk,
  SLAStats,
} from './sla';
export { SLA_TARGETS } from './sla';

// Metrics types
export type {
  DailyMetrics,
  DashboardStats,
  TierBreakdown,
  ChartDataPoint,
  TooltipData,
  TrendQuery,
  TrendDataPoint,
  MetricPeriod,
} from './metrics';
export { METRIC_PERIODS } from './metrics';
