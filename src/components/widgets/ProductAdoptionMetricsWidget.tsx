import {
  TrendingUp,
  TrendingDown,
  Minus,
  Users,
  Activity,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  XCircle,
} from 'lucide-react';
import type { ProductAdoptionMetricsData } from '@/types/widget';

export function ProductAdoptionMetricsWidget({ data }: { data: ProductAdoptionMetricsData }) {
  const trendColors = {
    improving: 'border-l-success bg-emerald-500/20',
    stable: 'border-l-chart-3 bg-lime-500/20',
    declining: 'border-l-destructive bg-red-500/20',
  };

  const trendTextColors = {
    improving: 'text-success',
    stable: 'text-chart-3',
    declining: 'text-destructive',
  };

  const trendIcons = {
    improving: <TrendingUp className="h-4 w-4 text-success" />,
    stable: <Minus className="h-4 w-4 text-chart-3" />,
    declining: <TrendingDown className="h-4 w-4 text-destructive" />,
  };

  const riskLevelColors = {
    low: 'text-success',
    medium: 'text-chart-3',
    high: 'text-chart-4',
    critical: 'text-destructive',
  };

  const riskLevelIcons = {
    low: <CheckCircle className="h-4 w-4 text-success" />,
    medium: <AlertCircle className="h-4 w-4 text-chart-3" />,
    high: <AlertTriangle className="h-4 w-4 text-chart-4" />,
    critical: <XCircle className="h-4 w-4 text-destructive" />,
  };

  const getAdoptionColor = (rate: number) => {
    if (rate >= 80) return 'text-success';
    if (rate >= 60) return 'text-chart-3';
    if (rate >= 40) return 'text-chart-4';
    return 'text-destructive';
  };

  const FeatureTrendIcon = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
    if (trend === 'up') return <TrendingUp className="h-3 w-3 text-success" />;
    if (trend === 'down') return <TrendingDown className="h-3 w-3 text-destructive" />;
    return <Minus className="h-3 w-3 text-muted-foreground" />;
  };

  // Calculate summary stats
  const decliningCount = data.metrics.filter(m => m.trend === 'declining').length;
  const criticalCount = data.metrics.filter(m => m.riskLevel === 'critical' || m.riskLevel === 'high').length;
  const avgAdoption = Math.round(data.metrics.reduce((sum, m) => sum + m.currentAdoptionRate, 0) / data.metrics.length);

  return (
    <div className="space-y-6 my-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
          <p className="text-sm text-muted-foreground">
            {data.customersTracked} customers tracked | {data.period}
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-lg border border-chart-3/30 bg-lime-500/20 p-3">
          <div className="text-xs text-muted-foreground mb-1">Avg Adoption Rate</div>
          <div className={`text-2xl font-bold ${getAdoptionColor(avgAdoption)}`}>{avgAdoption}%</div>
        </div>
        <div className="glass-card rounded-lg border border-destructive/30 bg-red-500/20 p-3">
          <div className="text-xs text-muted-foreground mb-1">Declining Adoption</div>
          <div className="text-2xl font-bold text-destructive">{decliningCount}</div>
        </div>
        <div className="glass-card rounded-lg border border-chart-4/30 bg-amber-500/20 p-3">
          <div className="text-xs text-muted-foreground mb-1">High Risk Accounts</div>
          <div className="text-2xl font-bold text-chart-4">{criticalCount}</div>
        </div>
        <div className="glass-card rounded-lg border border-success/30 bg-emerald-500/20 p-3">
          <div className="text-xs text-muted-foreground mb-1">Improving</div>
          <div className="text-2xl font-bold text-success">
            {data.metrics.filter(m => m.trend === 'improving').length}
          </div>
        </div>
      </div>

      {/* Customer Adoption Cards */}
      <div className="space-y-3">
        {data.metrics.map((customer, idx) => (
          <div
            key={idx}
            className={`border-l-4 ${trendColors[customer.trend]} rounded-r glass-card p-4 backdrop-blur-md transition-all duration-200 hover:shadow-md`}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              {/* Customer Name & Trend */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-base font-semibold text-foreground">{customer.customerName}</h4>
                  <span className={`flex items-center gap-1 text-xs font-semibold uppercase px-2 py-1 rounded ${trendTextColors[customer.trend]} border`}>
                    {trendIcons[customer.trend]}
                    {customer.trend} ({customer.trendPercentage > 0 ? '+' : ''}{customer.trendPercentage}%)
                  </span>
                  <span className={`flex items-center gap-1 text-xs font-semibold uppercase px-2 py-1 rounded ${riskLevelColors[customer.riskLevel]} border`}>
                    {riskLevelIcons[customer.riskLevel]}
                    {customer.riskLevel} risk
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{customer.customerId}</span>
                </div>
              </div>

              {/* Adoption Rate */}
              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-2 justify-end">
                  <div className={`text-3xl font-bold ${getAdoptionColor(customer.currentAdoptionRate)}`}>
                    {customer.currentAdoptionRate}%
                  </div>
                  {trendIcons[customer.trend]}
                </div>
                <div className="text-xs text-muted-foreground">
                  Previous: {customer.previousAdoptionRate}%
                </div>
              </div>
            </div>

            {/* Usage Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 pb-3 border-b border-border/50">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Activity className="h-3 w-3 text-chart-3" />
                  <span className="text-xs text-muted-foreground">Logins/Month</span>
                </div>
                <div className="text-sm font-semibold text-foreground">{customer.loginsPerMonth}</div>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Users className="h-3 w-3 text-primary" />
                  <span className="text-xs text-muted-foreground">Active Users</span>
                </div>
                <div className="text-sm font-semibold text-foreground">
                  {customer.activeUsers} / {customer.totalLicenses}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Activity className="h-3 w-3 text-success" />
                  <span className="text-xs text-muted-foreground">Utilization</span>
                </div>
                <div className={`text-sm font-semibold ${getAdoptionColor(customer.utilizationRate)}`}>
                  {customer.utilizationRate}%
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-1">
                  <AlertTriangle className="h-3 w-3 text-chart-4" />
                  <span className="text-xs text-muted-foreground">Risk Level</span>
                </div>
                <div className={`text-sm font-semibold capitalize ${riskLevelColors[customer.riskLevel]}`}>
                  {customer.riskLevel}
                </div>
              </div>
            </div>

            {/* Feature Usage */}
            <div className="mb-3 pb-3 border-b border-border/50">
              <div className="text-xs text-muted-foreground mb-2">Feature Usage:</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {customer.featureUsage.map((feature, featureIdx) => (
                  <div key={featureIdx} className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-xs text-muted-foreground">{feature.feature}</span>
                    <div className="flex items-center gap-1">
                      <span className={`text-xs font-semibold ${getAdoptionColor(feature.usageRate)}`}>
                        {feature.usageRate}%
                      </span>
                      <FeatureTrendIcon trend={feature.trend} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            {customer.recommendations.length > 0 && (
              <div>
                <div className="text-xs text-muted-foreground mb-2">Recommendations:</div>
                <div className="flex flex-wrap gap-2">
                  {customer.recommendations.map((rec, recIdx) => (
                    <span key={recIdx} className="text-xs px-2 py-1 rounded bg-primary/20 text-primary">
                      {rec}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
