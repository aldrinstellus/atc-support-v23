import { NextResponse } from 'next/server';

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: 'performance' | 'sla' | 'customer' | 'agent' | 'custom';
  metrics: string[];
  filters: string[];
  groupBy: string[];
  chartType: 'bar' | 'line' | 'pie' | 'table' | 'mixed';
  isDefault: boolean;
  createdAt: string;
  createdBy: string;
}

const defaultTemplates: ReportTemplate[] = [
  {
    id: 'tmpl-001',
    name: 'Weekly Performance Summary',
    description: 'Overview of team performance metrics for the week',
    category: 'performance',
    metrics: ['ticketsResolved', 'avgResponseTime', 'customerSatisfaction', 'slaCompliance'],
    filters: ['dateRange', 'team', 'agent'],
    groupBy: ['day', 'agent'],
    chartType: 'mixed',
    isDefault: true,
    createdAt: '2024-01-01T00:00:00Z',
    createdBy: 'system',
  },
  {
    id: 'tmpl-002',
    name: 'SLA Breach Analysis',
    description: 'Detailed analysis of SLA breaches and near-misses',
    category: 'sla',
    metrics: ['slaBreaches', 'nearMisses', 'breachRate', 'avgBreachTime'],
    filters: ['dateRange', 'priority', 'category'],
    groupBy: ['priority', 'category'],
    chartType: 'bar',
    isDefault: true,
    createdAt: '2024-01-01T00:00:00Z',
    createdBy: 'system',
  },
  {
    id: 'tmpl-003',
    name: 'Customer Satisfaction Trends',
    description: 'Track CSAT scores over time by customer segment',
    category: 'customer',
    metrics: ['csatScore', 'npsScore', 'responseRate', 'feedbackCount'],
    filters: ['dateRange', 'customerTier', 'category'],
    groupBy: ['week', 'customerTier'],
    chartType: 'line',
    isDefault: true,
    createdAt: '2024-01-01T00:00:00Z',
    createdBy: 'system',
  },
  {
    id: 'tmpl-004',
    name: 'Agent Productivity Report',
    description: 'Individual agent productivity and quality metrics',
    category: 'agent',
    metrics: ['ticketsHandled', 'avgHandleTime', 'firstContactResolution', 'qualityScore'],
    filters: ['dateRange', 'agent', 'team'],
    groupBy: ['agent', 'day'],
    chartType: 'table',
    isDefault: true,
    createdAt: '2024-01-01T00:00:00Z',
    createdBy: 'system',
  },
  {
    id: 'tmpl-005',
    name: 'Ticket Volume Analysis',
    description: 'Analyze ticket volume patterns and trends',
    category: 'performance',
    metrics: ['ticketVolume', 'peakHours', 'categoryDistribution', 'priorityDistribution'],
    filters: ['dateRange', 'category', 'channel'],
    groupBy: ['hour', 'category'],
    chartType: 'bar',
    isDefault: true,
    createdAt: '2024-01-01T00:00:00Z',
    createdBy: 'system',
  },
];

export async function GET() {
  return NextResponse.json({
    templates: defaultTemplates,
    categories: ['performance', 'sla', 'customer', 'agent', 'custom'],
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, category, metrics, filters, groupBy, chartType } = body;

    if (!name || !metrics || metrics.length === 0) {
      return NextResponse.json(
        { error: 'Name and at least one metric are required' },
        { status: 400 }
      );
    }

    const newTemplate: ReportTemplate = {
      id: `tmpl-custom-${Date.now()}`,
      name,
      description: description || '',
      category: category || 'custom',
      metrics,
      filters: filters || [],
      groupBy: groupBy || [],
      chartType: chartType || 'table',
      isDefault: false,
      createdAt: new Date().toISOString(),
      createdBy: 'current-user',
    };

    return NextResponse.json({
      success: true,
      template: newTemplate,
      message: 'Template saved successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    );
  }
}
