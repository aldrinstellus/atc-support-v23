import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  XCircle,
} from 'lucide-react';
import type { ClientHealthDashboardData } from '@/types/widget';

export function ClientHealthDashboardWidget({ data }: { data: ClientHealthDashboardData }) {
  const healthLevelColors = {
    excellent: 'border-l-success bg-emerald-500/20',
    good: 'border-l-chart-3 bg-chart-3/15',
    'at-risk': 'border-l-chart-4 bg-chart-4/15',
    critical: 'border-l-destructive bg-destructive/15',
  };

  const healthLevelTextColors = {
    excellent: 'text-success',
    good: 'text-chart-3',
    'at-risk': 'text-chart-4',
    critical: 'text-destructive',
  };

  const healthLevelIcons = {
    excellent: <CheckCircle className="h-4 w-4 text-success" />,
    good: <CheckCircle className="h-4 w-4 text-chart-3" />,
    'at-risk': <AlertCircle className="h-4 w-4 text-chart-4" />,
    critical: <XCircle className="h-4 w-4 text-destructive" />,
  };

  const TrendIcon = ({ direction }: { direction: 'up' | 'down' | 'stable' }) => {
    if (direction === 'up') return <TrendingUp className="h-4 w-4 text-success" />;
    if (direction === 'down') return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-chart-3';
    if (score >= 40) return 'text-chart-4';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6 my-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
          <p className="text-sm text-muted-foreground">
            {data.customersAnalyzed} customers analyzed | {data.period}
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-lg border border-success/30 bg-emerald-500/20 p-3">
          <div className="text-xs text-muted-foreground mb-1">Excellent</div>
          <div className="text-2xl font-bold text-success">
            {data.healthMetrics.filter(c => c.healthLevel === 'excellent').length}
          </div>
        </div>
        <div className="glass-card rounded-lg border border-chart-3/30 bg-chart-3/15 p-3">
          <div className="text-xs text-muted-foreground mb-1">Good</div>
          <div className="text-2xl font-bold text-chart-3">
            {data.healthMetrics.filter(c => c.healthLevel === 'good').length}
          </div>
        </div>
        <div className="glass-card rounded-lg border border-chart-4/30 bg-chart-4/15 p-3">
          <div className="text-xs text-muted-foreground mb-1">At Risk</div>
          <div className="text-2xl font-bold text-chart-4">
            {data.healthMetrics.filter(c => c.healthLevel === 'at-risk').length}
          </div>
        </div>
        <div className="glass-card rounded-lg border border-destructive/30 bg-destructive/15 p-3">
          <div className="text-xs text-muted-foreground mb-1">Critical</div>
          <div className="text-2xl font-bold text-destructive">
            {data.healthMetrics.filter(c => c.healthLevel === 'critical').length}
          </div>
        </div>
      </div>

      {/* Customer Health Cards */}
      <div className="space-y-3">
        {data.healthMetrics.map((customer, idx) => (
          <div
            key={idx}
            className={`border-l-4 ${healthLevelColors[customer.healthLevel]} rounded-r glass-card p-4 backdrop-blur-md transition-all duration-200 hover:shadow-md`}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              {/* Customer Name & Health Level */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-base font-semibold text-foreground">{customer.customerName}</h4>
                  <span className={`flex items-center gap-1 text-xs font-semibold uppercase px-2 py-1 rounded ${healthLevelTextColors[customer.healthLevel]} border ${customer.healthLevel === 'critical' ? 'border-destructive' : customer.healthLevel === 'at-risk' ? 'border-chart-4' : customer.healthLevel === 'good' ? 'border-chart-3' : 'border-success'}`}>
                    {healthLevelIcons[customer.healthLevel]}
                    {customer.healthLevel}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{customer.customerId}</span>
                  <span>|</span>
                  <span>ARR: {customer.arr}</span>
                </div>
              </div>

              {/* Health Score */}
              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className={`text-3xl font-bold ${getScoreColor(customer.healthScore)}`}>
                    {customer.healthScore}
                  </div>
                  <TrendIcon direction={customer.trendDirection} />
                </div>
                <div className="text-xs text-muted-foreground">Health Score</div>
              </div>
            </div>

            {/* Score Components */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 pb-3 border-b border-border/50">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Product Adoption</div>
                <div className={`text-sm font-semibold ${getScoreColor(customer.scoreComponents.productAdoption)}`}>
                  {customer.scoreComponents.productAdoption}%
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Support Health</div>
                <div className={`text-sm font-semibold ${getScoreColor(customer.scoreComponents.supportTickets)}`}>
                  {customer.scoreComponents.supportTickets}%
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Payment Health</div>
                <div className={`text-sm font-semibold ${getScoreColor(customer.scoreComponents.paymentHealth)}`}>
                  {customer.scoreComponents.paymentHealth}%
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Renewal Likelihood</div>
                <div className={`text-sm font-semibold ${getScoreColor(customer.scoreComponents.renewalLikelihood)}`}>
                  {customer.scoreComponents.renewalLikelihood}%
                </div>
              </div>
            </div>

            {/* Risk Factors & Recommendations */}
            <div className="flex items-start justify-between gap-4">
              {customer.riskFactors.length > 0 && (
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    <AlertTriangle className="h-3 w-3 text-chart-4" />
                    <span className="text-xs text-muted-foreground">Risk Factors:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {customer.riskFactors.map((risk, riskIdx) => (
                      <span key={riskIdx} className="text-xs px-2 py-0.5 rounded-full bg-chart-4/10 text-chart-4">
                        {risk}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {customer.recommendations.length > 0 && (
                <div className="text-right flex-shrink-0">
                  <div className="text-xs text-muted-foreground mb-1">
                    {customer.recommendations.filter(r => r.priority === 'high').length} high priority actions
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
