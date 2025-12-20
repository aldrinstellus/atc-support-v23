// Metrics Types - Customer Portal Mock Data

import type { CompanyTier, RiskLevel } from './company';
import type { TicketPriority, TicketChannel, TicketStatus } from './ticket';

export interface DailyMetrics {
  id: string;                       // METRIC-0001
  date: string;                     // ISO date (YYYY-MM-DD)
  ticketsCreated: number;
  ticketsResolved: number;
  ticketsClosed: number;
  ticketsEscalated: number;
  avgFirstResponseTime: number;     // minutes
  avgResolutionTime: number;        // minutes
  slaComplianceRate: number;        // percentage 0-100
  csat: number;                     // 1-5

  // Simple breakdowns
  ticketsByTier: Record<CompanyTier, number>;
  ticketsByPriority: Record<TicketPriority, number>;
  ticketsByChannel: Record<TicketChannel, number>;

  // Sentiment breakdown
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };

  // AI metrics
  aiMetrics: {
    draftsGenerated: number;
    draftsAccepted: number;
    avgConfidence: number;
  };
}

export interface TierBreakdown {
  total: number;
  activeTickets: number;
  atRisk: number;
  churning: number;
}

export interface DashboardStats {
  // Current counts
  totalActiveTickets: number;
  ticketsCreatedToday: number;
  ticketsResolvedToday: number;
  avgFirstResponseTime: number;     // minutes
  avgResolutionTime: number;        // minutes

  // SLA
  slaComplianceRate: number;        // percentage
  breachedTickets: number;          // count breached
  atRiskTickets: number;            // count at risk
  csat: number;                     // 1-5

  // Tier breakdown
  tierBreakdown: Record<CompanyTier, TierBreakdown>;

  // Priority breakdown
  priorityBreakdown: Record<TicketPriority, number>;

  // Sentiment breakdown
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
    frustrated: number;
  };

  // Agent utilization
  agentUtilization: {
    onlineAgents: number;
    totalCapacity: number;
    currentWorkload: number;
    utilizationRate: number;        // percentage
  };

  // AI stats
  aiStats: {
    draftsGenerated: number;
    draftsAccepted: number;
    avgConfidence: number;
    timeSaved: number;              // minutes
  };
}

export interface ChartDataPoint {
  date: string;                    // ISO date or formatted string
  day: number;
  month: string;                   // 'Oct' | 'Nov' | 'Dec' etc.
  value: number;

  // Additional metrics for tooltip
  ticketsCreated?: number;
  ticketsResolved?: number;
  avgResponseTime?: number;
  slaCompliance?: number;
}

export interface TooltipData {
  date: string;
  newTickets: number;
  completed: number;
  avgResponseTime: string;
  sla: string;
}

export interface TrendQuery {
  metric: 'tickets' | 'resolution-time' | 'sla' | 'csat' | 'nps';
  period: '7d' | '30d' | '90d' | '180d';
  groupBy?: 'day' | 'week' | 'month';
  tier?: CompanyTier;
  risk?: RiskLevel;
}

export interface TrendDataPoint {
  date: string;
  value: number;
  label?: string;
}

// Period options for metrics
export const METRIC_PERIODS = ['7d', '30d', '90d', '180d'] as const;
export type MetricPeriod = typeof METRIC_PERIODS[number];
