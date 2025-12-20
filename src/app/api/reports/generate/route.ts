import { NextRequest, NextResponse } from 'next/server';
import { getMockDatabase, queryTickets } from '@/data/mock/database';
import type { EnhancedTicket, Agent } from '@/types/mock';

interface ReportConfig {
  templateId?: string;
  metrics: string[];
  dateRange: { start: string; end: string };
  filters?: Record<string, string[]>;
  groupBy?: string;
}

interface MetricData {
  label: string;
  value: number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
}

interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string;
  }>;
}

function generateMetricData(metric: string): MetricData {
  const metricConfigs: Record<string, () => MetricData> = {
    ticketsResolved: () => ({
      label: 'Tickets Resolved',
      value: Math.floor(Math.random() * 500) + 200,
      change: Math.random() * 20 - 10,
      trend: Math.random() > 0.5 ? 'up' : 'down',
    }),
    avgResponseTime: () => ({
      label: 'Avg Response Time',
      value: Math.floor(Math.random() * 60) + 15,
      change: Math.random() * 10 - 5,
      trend: Math.random() > 0.5 ? 'down' : 'up',
    }),
    customerSatisfaction: () => ({
      label: 'Customer Satisfaction',
      value: Math.floor(Math.random() * 15) + 85,
      change: Math.random() * 5 - 2,
      trend: Math.random() > 0.6 ? 'up' : 'stable',
    }),
    slaCompliance: () => ({
      label: 'SLA Compliance',
      value: Math.floor(Math.random() * 10) + 90,
      change: Math.random() * 3 - 1,
      trend: Math.random() > 0.5 ? 'up' : 'stable',
    }),
    slaBreaches: () => ({
      label: 'SLA Breaches',
      value: Math.floor(Math.random() * 20) + 5,
      change: Math.random() * 10 - 5,
      trend: Math.random() > 0.5 ? 'down' : 'up',
    }),
    ticketVolume: () => ({
      label: 'Ticket Volume',
      value: Math.floor(Math.random() * 1000) + 500,
      change: Math.random() * 15 - 7,
      trend: 'stable',
    }),
    firstContactResolution: () => ({
      label: 'First Contact Resolution',
      value: Math.floor(Math.random() * 20) + 70,
      change: Math.random() * 5 - 2,
      trend: Math.random() > 0.5 ? 'up' : 'stable',
    }),
    csatScore: () => ({
      label: 'CSAT Score',
      value: Math.floor(Math.random() * 15) + 80,
      change: Math.random() * 3 - 1,
      trend: 'up',
    }),
  };

  const generator = metricConfigs[metric];
  if (generator) {
    return generator();
  }

  return {
    label: metric.replace(/([A-Z])/g, ' $1').trim(),
    value: Math.floor(Math.random() * 100),
    change: Math.random() * 10 - 5,
    trend: 'stable',
  };
}

function generateChartData(metrics: string[], groupBy?: string): ChartData {
  const db = getMockDatabase();
  const labels = groupBy === 'day'
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    : groupBy === 'week'
    ? ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    : groupBy === 'agent'
    ? db.agents.slice(0, 5).map((a: Agent) => a.name.split(' ')[0])
    : ['Q1', 'Q2', 'Q3', 'Q4'];

  const datasets = metrics.slice(0, 3).map((metric, index) => {
    const colors = ['#f97316', '#3b82f6', '#22c55e', '#a855f7'];
    return {
      label: metric.replace(/([A-Z])/g, ' $1').trim(),
      data: labels.map(() => Math.floor(Math.random() * 100) + 20),
      backgroundColor: colors[index % colors.length],
    };
  });

  return { labels, datasets };
}

export async function POST(request: NextRequest) {
  try {
    const config: ReportConfig = await request.json();
    const { metrics, dateRange, groupBy } = config;

    if (!metrics || metrics.length === 0) {
      return NextResponse.json(
        { error: 'At least one metric is required' },
        { status: 400 }
      );
    }

    if (!dateRange?.start || !dateRange?.end) {
      return NextResponse.json(
        { error: 'Date range is required' },
        { status: 400 }
      );
    }

    // Generate report data
    const metricsData = metrics.map(generateMetricData);
    const chartData = generateChartData(metrics, groupBy);

    // Get summary stats
    const { tickets } = queryTickets({});
    const totalTickets = tickets.length;
    const resolvedTickets = tickets.filter((t: EnhancedTicket) => t.status === 'resolved' || t.status === 'closed').length;
    const avgResolutionTime = Math.floor(Math.random() * 24) + 4;

    const report = {
      id: `rpt-${Date.now()}`,
      generatedAt: new Date().toISOString(),
      dateRange,
      summary: {
        totalTickets,
        resolvedTickets,
        resolutionRate: ((resolvedTickets / totalTickets) * 100).toFixed(1),
        avgResolutionTime: `${avgResolutionTime}h`,
      },
      metrics: metricsData,
      chartData,
      filters: config.filters || {},
      groupBy: groupBy || 'day',
    };

    return NextResponse.json({ success: true, report });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate report' },
      { status: 500 }
    );
  }
}
