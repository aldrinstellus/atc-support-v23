'use client';

import type { CSMInsightsDashboardData } from '@/types/widget';
import { Lightbulb, AlertTriangle, TrendingUp, Users, DollarSign, Target, ChevronRight } from 'lucide-react';

interface CSMInsightsDashboardWidgetProps {
  data: CSMInsightsDashboardData;
}

const categoryIcons = {
  'churn-risk': AlertTriangle,
  'upsell': TrendingUp,
  'engagement': Users,
  'adoption': Target,
  'satisfaction': Lightbulb,
};

const categoryColors = {
  'churn-risk': 'text-red-500 bg-red-500/20',
  'upsell': 'text-green-500 bg-green-500/20',
  'engagement': 'text-blue-500 bg-blue-500/20',
  'adoption': 'text-purple-500 bg-purple-500/20',
  'satisfaction': 'text-yellow-500 bg-yellow-500/20',
};

const priorityColors = {
  critical: 'bg-red-500/20 text-red-400 border-red-500/30',
  high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  low: 'bg-green-500/20 text-green-400 border-green-500/30',
};

export function CSMInsightsDashboardWidget({ data }: CSMInsightsDashboardWidgetProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{data.title}</h3>
            <p className="text-xs text-muted-foreground">{data.period}</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <div className="p-3 rounded-lg bg-muted/30">
          <p className="text-xs text-muted-foreground">Total Insights</p>
          <p className="text-xl font-bold text-foreground">{data.summary.totalInsights}</p>
        </div>
        <div className="p-3 rounded-lg bg-red-500/20">
          <p className="text-xs text-red-400">Critical</p>
          <p className="text-xl font-bold text-red-400">{data.summary.criticalInsights}</p>
        </div>
        <div className="p-3 rounded-lg bg-orange-500/20">
          <p className="text-xs text-orange-400">High Priority</p>
          <p className="text-xl font-bold text-orange-400">{data.summary.highPriorityInsights}</p>
        </div>
        <div className="p-3 rounded-lg bg-green-500/20">
          <p className="text-xs text-green-400">Potential ARR Impact</p>
          <p className="text-xl font-bold text-green-400">{formatCurrency(data.summary.potentialArrImpact)}</p>
        </div>
      </div>

      {/* Insights List */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Active Insights</h4>
        {data.insights.map((insight) => {
          const CategoryIcon = categoryIcons[insight.category];
          return (
            <div
              key={insight.id}
              className="p-4 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${categoryColors[insight.category]}`}>
                  <CategoryIcon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded border ${priorityColors[insight.priority]}`}>
                      {insight.priority.toUpperCase()}
                    </span>
                    <span className="text-xs text-muted-foreground">{insight.confidence}% confidence</span>
                  </div>
                  <h5 className="font-medium text-foreground mb-1">{insight.title}</h5>
                  <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                  
                  {/* Data Points */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {insight.dataPoints.map((point, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-xs bg-muted rounded-full text-muted-foreground">
                        {point}
                      </span>
                    ))}
                  </div>

                  {/* Impact & Action */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-3 w-3" />
                        {insight.impactedCustomers} customer{insight.impactedCustomers > 1 ? 's' : ''}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <DollarSign className="h-3 w-3" />
                        {formatCurrency(insight.impactedArr)} ARR
                      </span>
                    </div>
                    <button className="flex items-center gap-1 text-xs text-primary hover:underline">
                      Take Action <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Recommended Action */}
                  <div className="mt-2 p-2 rounded bg-primary/20 border border-primary/20">
                    <p className="text-xs text-primary">
                      <strong>Recommended:</strong> {insight.recommendedAction}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
