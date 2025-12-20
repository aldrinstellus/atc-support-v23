// Metrics & Dashboard Stats Generator

import { faker } from '@faker-js/faker';
import type {
  DailyMetrics,
  DashboardStats,
  EnhancedTicket,
  Agent,
  Company,
  CompanyTier,
  RiskLevel,
} from '@/types/mock';
import { generateId } from '../seed';

export function generateDailyMetrics(
  days: number,
  tickets: EnhancedTicket[],
  agents: Agent[]
): DailyMetrics[] {
  const metrics: DailyMetrics[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    const dateStr = date.toISOString().split('T')[0];

    // Calculate realistic metrics based on day of week
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const weekendMultiplier = isWeekend ? 0.3 : 1;

    // Base values with some randomness
    const baseNewTickets = Math.round(faker.number.int({ min: 30, max: 60 }) * weekendMultiplier);
    const baseResolved = Math.round(baseNewTickets * faker.number.float({ min: 0.85, max: 1.15 }));

    // Trend modifiers (slight improvement over time)
    const trendProgress = (days - i) / days;
    const trendMultiplier = 1 + trendProgress * 0.1; // 10% improvement over period

    // Calculate tier distribution based on ticket data proportions
    const tierDistribution = {
      enterprise: faker.number.float({ min: 0.12, max: 0.18 }),
      smb: faker.number.float({ min: 0.42, max: 0.48 }),
      startup: 0, // Will be calculated
    };
    tierDistribution.startup = 1 - tierDistribution.enterprise - tierDistribution.smb;

    const totalNewTickets = baseNewTickets;
    const enterpriseTickets = Math.round(totalNewTickets * tierDistribution.enterprise);
    const smbTickets = Math.round(totalNewTickets * tierDistribution.smb);
    const startupTickets = totalNewTickets - enterpriseTickets - smbTickets;

    // Response times (in hours)
    const avgFirstResponseTime = faker.number.float({ min: 1.5, max: 4.5 }) / trendMultiplier;
    const avgResolutionTime = faker.number.float({ min: 6, max: 18 }) / trendMultiplier;

    // SLA metrics
    const slaComplianceRate = Math.min(
      100,
      faker.number.float({ min: 85, max: 95 }) * trendMultiplier
    );

    // CSAT (4.0-5.0 scale)
    const csat = faker.number.float({ min: 4.1, max: 4.8, fractionDigits: 2 });

    // Sentiment distribution
    const positiveRatio = faker.number.float({ min: 0.50, max: 0.65 });
    const negativeRatio = faker.number.float({ min: 0.10, max: 0.20 });
    const neutralRatio = 1 - positiveRatio - negativeRatio;

    metrics.push({
      id: generateId('METRIC', days - i, 4),
      date: dateStr,
      ticketsCreated: totalNewTickets,
      ticketsResolved: baseResolved,
      ticketsClosed: Math.round(baseResolved * 0.9),
      ticketsEscalated: Math.round(baseNewTickets * faker.number.float({ min: 0.03, max: 0.08 })),
      avgFirstResponseTime: Math.round(avgFirstResponseTime * 60), // In minutes
      avgResolutionTime: Math.round(avgResolutionTime * 60), // In minutes
      slaComplianceRate: Math.round(slaComplianceRate * 10) / 10,
      csat,
      ticketsByTier: {
        enterprise: enterpriseTickets,
        smb: smbTickets,
        startup: startupTickets,
      },
      ticketsByPriority: {
        critical: Math.round(totalNewTickets * 0.05),
        high: Math.round(totalNewTickets * 0.20),
        medium: Math.round(totalNewTickets * 0.45),
        low: Math.round(totalNewTickets * 0.30),
      },
      ticketsByChannel: {
        email: Math.round(totalNewTickets * 0.45),
        chat: Math.round(totalNewTickets * 0.30),
        phone: Math.round(totalNewTickets * 0.15),
        web: Math.round(totalNewTickets * 0.10),
      },
      sentimentBreakdown: {
        positive: Math.round(totalNewTickets * positiveRatio),
        neutral: Math.round(totalNewTickets * neutralRatio),
        negative: Math.round(totalNewTickets * negativeRatio),
      },
      aiMetrics: {
        draftsGenerated: Math.round(totalNewTickets * faker.number.float({ min: 0.60, max: 0.80 })),
        draftsAccepted: Math.round(totalNewTickets * faker.number.float({ min: 0.45, max: 0.65 })),
        avgConfidence: faker.number.int({ min: 78, max: 92 }),
      },
    });
  }

  return metrics;
}

export function generateDashboardStats(
  tickets: EnhancedTicket[],
  companies: Company[],
  agents: Agent[],
  dailyMetrics: DailyMetrics[]
): DashboardStats {
  const now = new Date();
  const activeTickets = tickets.filter(t => !['resolved', 'closed'].includes(t.status));
  const resolvedToday = tickets.filter(t => {
    if (!t.resolvedAt) return false;
    const resolved = new Date(t.resolvedAt);
    return resolved.toDateString() === now.toDateString();
  });

  // Calculate SLA metrics
  const ticketsWithSla = activeTickets.filter(t => t.slaTimeRemaining !== null);
  const breachedTickets = activeTickets.filter(t => t.resolutionBreached || t.firstResponseBreached);
  const atRiskTickets = ticketsWithSla.filter(t => t.slaTimeRemaining! <= 60 && t.slaTimeRemaining! > 0);

  // Calculate averages from last 7 days
  const last7Days = dailyMetrics.slice(-7);
  const avgFirstResponse = last7Days.reduce((sum, m) => sum + m.avgFirstResponseTime, 0) / 7;
  const avgResolution = last7Days.reduce((sum, m) => sum + m.avgResolutionTime, 0) / 7;
  const avgSlaCompliance = last7Days.reduce((sum, m) => sum + m.slaComplianceRate, 0) / 7;
  const avgCsat = last7Days.reduce((sum, m) => sum + m.csat, 0) / 7;

  // Tier breakdown
  const tierBreakdown = {
    enterprise: {
      total: companies.filter(c => c.tier === 'enterprise').length,
      activeTickets: activeTickets.filter(t => t.company.tier === 'enterprise').length,
      atRisk: companies.filter(c => c.tier === 'enterprise' && c.riskLevel === 'at-risk').length,
      churning: companies.filter(c => c.tier === 'enterprise' && c.riskLevel === 'churning').length,
    },
    smb: {
      total: companies.filter(c => c.tier === 'smb').length,
      activeTickets: activeTickets.filter(t => t.company.tier === 'smb').length,
      atRisk: companies.filter(c => c.tier === 'smb' && c.riskLevel === 'at-risk').length,
      churning: companies.filter(c => c.tier === 'smb' && c.riskLevel === 'churning').length,
    },
    startup: {
      total: companies.filter(c => c.tier === 'startup').length,
      activeTickets: activeTickets.filter(t => t.company.tier === 'startup').length,
      atRisk: companies.filter(c => c.tier === 'startup' && c.riskLevel === 'at-risk').length,
      churning: companies.filter(c => c.tier === 'startup' && c.riskLevel === 'churning').length,
    },
  };

  // Agent workload
  const onlineAgents = agents.filter(a => a.status === 'online');
  const totalCapacity = onlineAgents.reduce((sum, a) => sum + a.capacity, 0);
  const totalWorkload = onlineAgents.reduce((sum, a) => sum + a.currentWorkload, 0);

  // Priority breakdown
  const priorityBreakdown = {
    critical: activeTickets.filter(t => t.priority === 'critical').length,
    high: activeTickets.filter(t => t.priority === 'high').length,
    medium: activeTickets.filter(t => t.priority === 'medium').length,
    low: activeTickets.filter(t => t.priority === 'low').length,
  };

  // Sentiment breakdown
  const sentimentBreakdown = {
    positive: activeTickets.filter(t => t.sentiment === 'positive').length,
    neutral: activeTickets.filter(t => t.sentiment === 'neutral').length,
    negative: activeTickets.filter(t => t.sentiment === 'negative').length,
    frustrated: activeTickets.filter(t => t.sentiment === 'frustrated').length,
  };

  return {
    totalActiveTickets: activeTickets.length,
    ticketsCreatedToday: last7Days[last7Days.length - 1]?.ticketsCreated || 0,
    ticketsResolvedToday: resolvedToday.length,
    avgFirstResponseTime: Math.round(avgFirstResponse),
    avgResolutionTime: Math.round(avgResolution),
    slaComplianceRate: Math.round(avgSlaCompliance * 10) / 10,
    csat: Math.round(avgCsat * 100) / 100,
    breachedTickets: breachedTickets.length,
    atRiskTickets: atRiskTickets.length,
    tierBreakdown,
    priorityBreakdown,
    sentimentBreakdown,
    agentUtilization: {
      onlineAgents: onlineAgents.length,
      totalCapacity,
      currentWorkload: totalWorkload,
      utilizationRate: totalCapacity > 0 ? Math.round((totalWorkload / totalCapacity) * 100) : 0,
    },
    aiStats: {
      draftsGenerated: tickets.filter(t => t.aiSuggested).length,
      draftsAccepted: Math.round(tickets.filter(t => t.aiSuggested).length * 0.78),
      avgConfidence: 85,
      timeSaved: Math.round(tickets.filter(t => t.aiSuggested).length * 3.5), // 3.5 min per draft
    },
  };
}

export function generateTrendData(
  dailyMetrics: DailyMetrics[],
  period: 'week' | 'month' | 'quarter'
): {
  labels: string[];
  ticketVolume: number[];
  resolutionRate: number[];
  slaCompliance: number[];
  csat: number[];
  sentimentTrend: { positive: number[]; neutral: number[]; negative: number[] };
} {
  const periodDays = period === 'week' ? 7 : period === 'month' ? 30 : 90;
  const relevantMetrics = dailyMetrics.slice(-periodDays);

  // Aggregate by appropriate interval
  const aggregateInterval = period === 'week' ? 1 : period === 'month' ? 1 : 7;
  const aggregatedData: DailyMetrics[][] = [];

  for (let i = 0; i < relevantMetrics.length; i += aggregateInterval) {
    aggregatedData.push(relevantMetrics.slice(i, i + aggregateInterval));
  }

  const labels = aggregatedData.map(group => {
    const date = new Date(group[0].date);
    return period === 'quarter'
      ? `Week ${Math.ceil((aggregatedData.indexOf(group) + 1))}`
      : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  const ticketVolume = aggregatedData.map(group =>
    group.reduce((sum, m) => sum + m.ticketsCreated, 0)
  );

  const resolutionRate = aggregatedData.map(group => {
    const created = group.reduce((sum, m) => sum + m.ticketsCreated, 0);
    const resolved = group.reduce((sum, m) => sum + m.ticketsResolved, 0);
    return created > 0 ? Math.round((resolved / created) * 100) : 0;
  });

  const slaCompliance = aggregatedData.map(group =>
    Math.round(group.reduce((sum, m) => sum + m.slaComplianceRate, 0) / group.length)
  );

  const csat = aggregatedData.map(group =>
    Math.round((group.reduce((sum, m) => sum + m.csat, 0) / group.length) * 100) / 100
  );

  const sentimentTrend = {
    positive: aggregatedData.map(group =>
      group.reduce((sum, m) => sum + m.sentimentBreakdown.positive, 0)
    ),
    neutral: aggregatedData.map(group =>
      group.reduce((sum, m) => sum + m.sentimentBreakdown.neutral, 0)
    ),
    negative: aggregatedData.map(group =>
      group.reduce((sum, m) => sum + m.sentimentBreakdown.negative, 0)
    ),
  };

  return { labels, ticketVolume, resolutionRate, slaCompliance, csat, sentimentTrend };
}
