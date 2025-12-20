// Customer Hooks - Re-exports

export { useCustomerTickets, useTicketDetails } from './useCustomerTickets';
export { useCustomerStats, useTicketStats, useCompanyStats } from './useCustomerStats';
export { useCompanies, useCompanyDetails } from './useCompanies';
export { useAgents, useAgentWorkload } from './useAgents';
export { useMetricsTrend, useSLAStats, useChartData } from './useMetrics';

// Types
export type { TicketQueryOptions, TicketQueryResult } from './useCustomerTickets';
export type { CompanyQueryOptions, CompanyQueryResult } from './useCompanies';
export type { AgentQueryOptions } from './useAgents';
export type { TrendPeriod, TrendData } from './useMetrics';
