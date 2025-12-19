import {
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  ArrowUpCircle,
} from 'lucide-react';
import type { CustomerRiskProfileData } from '@/types/widget';

export function CustomerRiskProfileWidget({ data }: { data: CustomerRiskProfileData }) {
  const riskLevelColors = {
    critical: 'border-destructive/50 bg-destructive/5',
    high: 'border-chart-4/50 bg-chart-4/5',
    medium: 'border-chart-3/50 bg-chart-3/5',
    low: 'border-success/50 bg-success/5',
  };

  const riskLevelTextColors = {
    critical: 'text-destructive',
    high: 'text-chart-4',
    medium: 'text-chart-3',
    low: 'text-success',
  };

  const severityColors = {
    high: 'border-l-destructive bg-destructive/5',
    medium: 'border-l-chart-4 bg-chart-4/5',
    low: 'border-l-chart-3 bg-chart-3/5',
  };

  const priorityColors = {
    critical: 'border-l-destructive bg-destructive/5',
    high: 'border-l-chart-4 bg-chart-4/5',
    medium: 'border-l-chart-3 bg-chart-3/5',
    low: 'border-l-muted-foreground/50 bg-muted/20',
  };

  const trendIcons = {
    increasing: TrendingUp,
    stable: Activity,
    decreasing: TrendingDown,
  };
  const TrendIcon = trendIcons[data.trend];

  return (
    <div className="space-y-6 my-4">
      {/* Header with Risk Score */}
      <div className={`rounded-lg border-2 ${riskLevelColors[data.riskLevel]} p-6`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-foreground">{data.customerName}</h3>
              <span className={`text-xs font-semibold uppercase px-2 py-1 rounded ${riskLevelTextColors[data.riskLevel]} border ${data.riskLevel === 'critical' ? 'border-destructive' : data.riskLevel === 'high' ? 'border-chart-4' : 'border-chart-3'}`}>
                {data.riskLevel} Risk
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Customer ID: {data.customerId}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end mb-1">
              <span className={`text-4xl font-bold ${riskLevelTextColors[data.riskLevel]}`}>
                {data.riskScore}
              </span>
              <TrendIcon className={`h-6 w-6 ${riskLevelTextColors[data.riskLevel]}`} />
            </div>
            <p className="text-xs text-muted-foreground">
              Previous: {data.previousScore}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="h-4 w-4 text-success" />
              <span className="text-xs font-medium text-muted-foreground">ARR</span>
            </div>
            <p className="text-lg font-bold text-foreground">{data.accountValue}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-chart-4" />
              <span className="text-xs font-medium text-muted-foreground">Contract Renewal</span>
            </div>
            <p className="text-lg font-bold text-foreground">{data.contractRenewal}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendIcon className={`h-4 w-4 ${riskLevelTextColors[data.riskLevel]}`} />
              <span className="text-xs font-medium text-muted-foreground">Trend</span>
            </div>
            <p className={`text-lg font-bold capitalize ${riskLevelTextColors[data.riskLevel]}`}>
              {data.trend}
            </p>
          </div>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
          <AlertTriangle className="h-4 w-4 text-chart-4" />
          Risk Factors
        </h4>
        <div className="space-y-3">
          {data.riskFactors.map((factor, idx) => (
            <div
              key={idx}
              className={`border-l-4 ${severityColors[factor.severity]} rounded-r p-3 transition-all duration-200 hover:shadow-sm`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-foreground">{factor.factor}</span>
                    {factor.count !== undefined && (
                      <span className="text-xs font-medium text-muted-foreground">
                        ({factor.count})
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{factor.description}</p>
                  {factor.currentValue && factor.previousValue && (
                    <div className="flex items-center gap-2 mt-1 text-xs">
                      <span className="text-muted-foreground">
                        {factor.previousValue} → {factor.currentValue}
                      </span>
                      {factor.trend === 'down' && <TrendingDown className="h-3 w-3 text-destructive" />}
                      {factor.trend === 'up' && <TrendingUp className="h-3 w-3 text-success" />}
                    </div>
                  )}
                </div>
                <span className="text-xs font-semibold text-muted-foreground ml-4 whitespace-nowrap">
                  {factor.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
          <Activity className="h-4 w-4 text-primary" />
          Recent Activity
        </h4>
        <div className="space-y-3">
          {data.recentActivity.map((activity, idx) => (
            <div key={idx} className="flex gap-3 pb-3 border-b border-border/50 last:border-0 last:pb-0">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{activity.event}</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {activity.date}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Analysis */}
      <div className="glass-card rounded-lg border border-primary/30 bg-primary/5 p-4 backdrop-blur-md">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
          <Activity className="h-4 w-4 text-primary" />
          AI Analysis
        </h4>
        <p className="text-sm text-foreground/90 leading-relaxed">{data.aiAnalysis}</p>
      </div>

      {/* Recommendations */}
      <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
          <ArrowUpCircle className="h-4 w-4 text-success" />
          Recommended Actions
        </h4>
        <div className="space-y-3">
          {data.recommendations.map((rec, idx) => (
            <div
              key={idx}
              className={`border-l-4 ${priorityColors[rec.priority]} rounded-r p-3 transition-all duration-200 hover:shadow-sm`}
            >
              <div className="flex items-start justify-between mb-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {rec.priority} Priority
                </span>
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">{rec.action}</p>
              <p className="text-xs text-muted-foreground mb-2">{rec.description}</p>
              <div className="flex items-center gap-1 text-xs text-success">
                <CheckCircle2 className="h-3 w-3" />
                <span>{rec.estimatedImpact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
