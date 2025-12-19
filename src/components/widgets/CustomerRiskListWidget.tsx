import {
  AlertCircle,
  TrendingUp,
  DollarSign,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import type { CustomerRiskListData } from '@/types/widget';

export function CustomerRiskListWidget({ data }: { data: CustomerRiskListData }) {
  const riskLevelColors = {
    critical: 'border-l-destructive bg-red-500/20',
    high: 'border-l-chart-4 bg-amber-500/20',
    medium: 'border-l-chart-3 bg-lime-500/20',
    low: 'border-l-success bg-emerald-500/20',
  };

  const riskLevelTextColors = {
    critical: 'text-destructive',
    high: 'text-chart-4',
    medium: 'text-chart-3',
    low: 'text-success',
  };

  const sentimentColors = {
    positive: 'text-success',
    neutral: 'text-muted-foreground',
    negative: 'text-destructive',
    mixed: 'text-chart-4',
  };

  return (
    <div className="space-y-6 my-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
          <p className="text-sm text-muted-foreground">
            {data.count} high-risk customers out of {data.totalCustomers} total
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-lg border border-destructive/30 bg-red-500/20 p-3">
          <div className="text-xs text-muted-foreground mb-1">Critical Risk</div>
          <div className="text-2xl font-bold text-destructive">
            {data.customers.filter(c => c.riskLevel === 'critical').length}
          </div>
        </div>
        <div className="glass-card rounded-lg border border-chart-4/30 bg-amber-500/20 p-3">
          <div className="text-xs text-muted-foreground mb-1">High Risk</div>
          <div className="text-2xl font-bold text-chart-4">
            {data.customers.filter(c => c.riskLevel === 'high').length}
          </div>
        </div>
        <div className="glass-card rounded-lg border border-chart-3/30 bg-lime-500/20 p-3">
          <div className="text-xs text-muted-foreground mb-1">Total ARR at Risk</div>
          <div className="text-lg font-bold text-foreground">
            ${data.customers.reduce((sum, c) => sum + parseFloat(c.arr.replace(/[$,]/g, '')), 0).toLocaleString()}
          </div>
        </div>
        <div className="glass-card rounded-lg border border-destructive/30 bg-red-500/20 p-3">
          <div className="text-xs text-muted-foreground mb-1">Critical Tickets</div>
          <div className="text-2xl font-bold text-destructive">
            {data.customers.reduce((sum, c) => sum + c.criticalTickets, 0)}
          </div>
        </div>
      </div>

      {/* Customer List */}
      <div className="space-y-3">
        {data.customers.map((customer, idx) => (
          <div
            key={idx}
            className={`border-l-4 ${riskLevelColors[customer.riskLevel]} rounded-r glass-card p-4 backdrop-blur-md transition-all duration-200 hover:shadow-md`}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              {/* Customer Name & Risk Score */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-base font-semibold text-foreground">{customer.name}</h4>
                  <span className={`text-xs font-semibold uppercase px-2 py-1 rounded ${riskLevelTextColors[customer.riskLevel]} border ${customer.riskLevel === 'critical' ? 'border-destructive' : customer.riskLevel === 'high' ? 'border-chart-4' : 'border-chart-3'}`}>
                    {customer.riskLevel}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{customer.id}</span>
                  <span>•</span>
                  <span>CSM: {customer.csm}</span>
                </div>
              </div>

              {/* Risk Score */}
              <div className="text-right flex-shrink-0">
                <div className={`text-3xl font-bold ${riskLevelTextColors[customer.riskLevel]}`}>
                  {customer.riskScore}
                </div>
                <div className="text-xs text-muted-foreground">Risk Score</div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-3 pb-3 border-b border-border/50">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <DollarSign className="h-3 w-3 text-success" />
                  <span className="text-xs text-muted-foreground">ARR</span>
                </div>
                <div className="text-sm font-semibold text-foreground">{customer.arr}</div>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Calendar className="h-3 w-3 text-chart-4" />
                  <span className="text-xs text-muted-foreground">Renewal</span>
                </div>
                <div className="text-sm font-semibold text-foreground">{customer.contractRenewal}</div>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-1">
                  <AlertCircle className="h-3 w-3 text-chart-3" />
                  <span className="text-xs text-muted-foreground">Open Tickets</span>
                </div>
                <div className="text-sm font-semibold text-foreground">{customer.openTickets}</div>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-1">
                  <AlertTriangle className="h-3 w-3 text-destructive" />
                  <span className="text-xs text-muted-foreground">Critical</span>
                </div>
                <div className="text-sm font-semibold text-destructive">{customer.criticalTickets}</div>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-1">
                  <TrendingUp className="h-3 w-3 text-chart-4" />
                  <span className="text-xs text-muted-foreground">Escalations</span>
                </div>
                <div className="text-sm font-semibold text-foreground">{customer.escalations}</div>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-1">
                  <span className={`h-2 w-2 rounded-full ${customer.sentiment === 'positive' ? 'bg-success' : customer.sentiment === 'negative' ? 'bg-destructive' : customer.sentiment === 'mixed' ? 'bg-chart-4' : 'bg-muted-foreground'}`}></span>
                  <span className="text-xs text-muted-foreground">Sentiment</span>
                </div>
                <div className={`text-sm font-semibold capitalize ${sentimentColors[customer.sentiment]}`}>
                  {customer.sentiment}
                </div>
              </div>
            </div>

            {/* Details Row */}
            <div className="flex items-start justify-between gap-4">
              {/* Primary Issues */}
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-1">Primary Issues:</div>
                <div className="flex items-center gap-2 flex-wrap">
                  {customer.primaryIssues.map((issue, issueIdx) => (
                    <span
                      key={issueIdx}
                      className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                    >
                      {issue}
                    </span>
                  ))}
                </div>
              </div>

              {/* Last Contact */}
              <div className="text-right flex-shrink-0">
                <div className="text-xs text-muted-foreground mb-1">Last Contact</div>
                <div className="text-xs font-medium text-foreground">{customer.lastContact}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
