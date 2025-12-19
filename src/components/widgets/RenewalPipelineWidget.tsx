import {
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import type { RenewalPipelineData } from '@/types/widget';

export function RenewalPipelineWidget({ data }: { data: RenewalPipelineData }) {
  const statusColors = {
    'on-track': 'border-l-success bg-emerald-500/20',
    'at-risk': 'border-l-chart-4 bg-amber-500/20',
    critical: 'border-l-destructive bg-red-500/20',
  };

  const statusTextColors = {
    'on-track': 'text-success',
    'at-risk': 'text-chart-4',
    critical: 'text-destructive',
  };

  const statusIcons = {
    'on-track': <CheckCircle className="h-4 w-4 text-success" />,
    'at-risk': <AlertCircle className="h-4 w-4 text-chart-4" />,
    critical: <AlertTriangle className="h-4 w-4 text-destructive" />,
  };

  const getLikelihoodColor = (likelihood: number) => {
    if (likelihood >= 80) return 'text-success';
    if (likelihood >= 60) return 'text-chart-3';
    if (likelihood >= 40) return 'text-chart-4';
    return 'text-destructive';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6 my-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
          <p className="text-sm text-muted-foreground">
            {data.renewalCount} renewals | {data.period}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{formatCurrency(data.totalArr)}</div>
          <div className="text-xs text-muted-foreground">Total ARR at Renewal</div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-lg border border-chart-4/30 bg-amber-500/20 p-3">
          <div className="text-xs text-muted-foreground mb-1">Next 30 Days</div>
          <div className="text-2xl font-bold text-chart-4">{data.summary.upcomingMonth}</div>
        </div>
        <div className="glass-card rounded-lg border border-chart-3/30 bg-lime-500/20 p-3">
          <div className="text-xs text-muted-foreground mb-1">Next 90 Days</div>
          <div className="text-2xl font-bold text-chart-3">{data.summary.upcomingQuarter}</div>
        </div>
        <div className="glass-card rounded-lg border border-destructive/30 bg-red-500/20 p-3">
          <div className="text-xs text-muted-foreground mb-1">At Risk</div>
          <div className="text-2xl font-bold text-destructive">{data.summary.atRisk}</div>
        </div>
        <div className="glass-card rounded-lg border border-success/30 bg-emerald-500/20 p-3">
          <div className="text-xs text-muted-foreground mb-1">High Value (&gt;$500K)</div>
          <div className="text-2xl font-bold text-success">{data.summary.highValue}</div>
        </div>
      </div>

      {/* Renewal Cards */}
      <div className="space-y-3">
        {data.renewals.map((renewal, idx) => (
          <div
            key={idx}
            className={`border-l-4 ${statusColors[renewal.status]} rounded-r glass-card p-4 backdrop-blur-md transition-all duration-200 hover:shadow-md`}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              {/* Customer Name & Status */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-base font-semibold text-foreground">{renewal.customerName}</h4>
                  <span className={`flex items-center gap-1 text-xs font-semibold uppercase px-2 py-1 rounded ${statusTextColors[renewal.status]} border ${renewal.status === 'critical' ? 'border-destructive' : renewal.status === 'at-risk' ? 'border-chart-4' : 'border-success'}`}>
                    {statusIcons[renewal.status]}
                    {renewal.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{renewal.customerId}</span>
                  <span>|</span>
                  <span>CSM: {renewal.csm}</span>
                </div>
              </div>

              {/* Renewal Likelihood */}
              <div className="text-right flex-shrink-0">
                <div className={`text-3xl font-bold ${getLikelihoodColor(renewal.renewalLikelihood)}`}>
                  {renewal.renewalLikelihood}%
                </div>
                <div className="text-xs text-muted-foreground">Likelihood</div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-3 pb-3 border-b border-border/50">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <DollarSign className="h-3 w-3 text-success" />
                  <span className="text-xs text-muted-foreground">Current ARR</span>
                </div>
                <div className="text-sm font-semibold text-foreground">{formatCurrency(renewal.currentArr)}</div>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Calendar className="h-3 w-3 text-chart-4" />
                  <span className="text-xs text-muted-foreground">Renewal Date</span>
                </div>
                <div className="text-sm font-semibold text-foreground">{renewal.renewalDate}</div>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-1">
                  <AlertTriangle className="h-3 w-3 text-chart-3" />
                  <span className="text-xs text-muted-foreground">Days Until</span>
                </div>
                <div className={`text-sm font-semibold ${renewal.daysUntilRenewal <= 30 ? 'text-destructive' : renewal.daysUntilRenewal <= 60 ? 'text-chart-4' : 'text-foreground'}`}>
                  {renewal.daysUntilRenewal} days
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-muted-foreground">Expansion Opp</span>
                </div>
                <div className="text-sm font-semibold text-success">
                  {renewal.expansionOpportunity > 0 ? `+${formatCurrency(renewal.expansionOpportunity)}` : '-'}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Last Contact</span>
                </div>
                <div className="text-sm font-semibold text-foreground">{renewal.lastEngagement}</div>
              </div>
            </div>

            {/* Action Items */}
            {renewal.actionItems.length > 0 && (
              <div>
                <div className="text-xs text-muted-foreground mb-2">Action Items:</div>
                <div className="flex flex-wrap gap-2">
                  {renewal.actionItems.map((item, itemIdx) => (
                    <span key={itemIdx} className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                      {item}
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
