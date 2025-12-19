import {
  Rocket,
  Clock,
  AlertTriangle,
  Activity,
  TrendingUp,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import type { DoraMetricsData } from '@/types/widget';

export function DoraMetricsDashboardWidget({ data }: { data: DoraMetricsData }) {
  // Defensive check
  if (!data || typeof data !== 'object') {
    return (
      <div className="my-4 rounded-lg border border-destructive/30 bg-red-500/20 p-4">
        <p className="text-sm text-destructive">Unable to load DORA metrics data</p>
      </div>
    );
  }

  const performanceColors = {
    elite: 'bg-success/20 text-success border-success/50',
    high: 'bg-chart-1/20 text-chart-1 border-chart-1/50',
    medium: 'bg-chart-3/20 text-chart-3 border-chart-3/50',
    low: 'bg-destructive/20 text-destructive border-destructive/50',
  };

  const trendIcons = {
    up: <ArrowUpRight className="h-4 w-4 text-success" />,
    down: <ArrowDownRight className="h-4 w-4 text-destructive" />,
    stable: <Minus className="h-4 w-4 text-muted-foreground" />,
  };

  const metricStatusColors = {
    excellent: 'text-success',
    good: 'text-chart-1',
    fair: 'text-chart-3',
    poor: 'text-destructive',
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6 my-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Period: {data.period} | Team: {data.team}
          </p>
        </div>
        <span className={`px-3 py-2 rounded-lg border ${performanceColors[data.overallPerformance]}`}>
          <span className="text-sm font-semibold uppercase tracking-wide">{data.overallPerformance} Performer</span>
        </span>
      </div>

      {/* Four Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Deployment Frequency */}
        <div className="rounded-lg border border-border bg-card/50 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Rocket className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">Deployment Frequency</span>
            </div>
            {trendIcons[data.deploymentFrequency.trend]}
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-bold ${metricStatusColors[data.deploymentFrequency.status]}`}>
              {data.deploymentFrequency.value}
            </span>
            <span className="text-xs text-muted-foreground">{data.deploymentFrequency.unit}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Target: {data.deploymentFrequency.target} | {data.deploymentFrequency.change}
          </p>
        </div>

        {/* Lead Time for Changes */}
        <div className="rounded-lg border border-border bg-card/50 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">Lead Time for Changes</span>
            </div>
            {trendIcons[data.leadTime.trend]}
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-bold ${metricStatusColors[data.leadTime.status]}`}>
              {data.leadTime.value}
            </span>
            <span className="text-xs text-muted-foreground">{data.leadTime.unit}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Target: {data.leadTime.target} | {data.leadTime.change}
          </p>
        </div>

        {/* Change Failure Rate */}
        <div className="rounded-lg border border-border bg-card/50 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">Change Failure Rate</span>
            </div>
            {trendIcons[data.changeFailureRate.trend]}
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-bold ${metricStatusColors[data.changeFailureRate.status]}`}>
              {data.changeFailureRate.value}%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Target: &lt;{data.changeFailureRate.target}% | {data.changeFailureRate.change}
          </p>
        </div>

        {/* Mean Time to Recovery */}
        <div className="rounded-lg border border-border bg-card/50 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">Mean Time to Recovery</span>
            </div>
            {trendIcons[data.mttr.trend]}
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-bold ${metricStatusColors[data.mttr.status]}`}>
              {data.mttr.value}
            </span>
            <span className="text-xs text-muted-foreground">{data.mttr.unit}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Target: {data.mttr.target} | {data.mttr.change}
          </p>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="rounded-lg border border-border bg-card/50 p-4 mb-4">
        <h4 className="text-sm font-semibold mb-3 text-foreground">Performance Summary</h4>
        <div className="space-y-2">
          {data.insights.map((insight, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle2 className={`h-4 w-4 mt-0.5 ${insight.type === 'positive' ? 'text-success' : insight.type === 'warning' ? 'text-chart-3' : 'text-destructive'}`} />
              <p className="text-sm text-muted-foreground">{insight.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Incidents */}
      {data.recentIncidents && data.recentIncidents.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-3 text-foreground">
            Recent Incidents ({data.recentIncidents.length})
          </h4>
          <div className="space-y-2">
            {data.recentIncidents.map((incident, idx) => (
              <div key={idx} className="rounded-lg border border-border bg-card/50 p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{incident.title}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${incident.resolved ? 'bg-emerald-500/20 text-success' : 'bg-red-500/20 text-destructive'}`}>
                    {incident.resolved ? 'Resolved' : 'Open'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Duration: {incident.duration}</span>
                  <span>Impact: {incident.impact}</span>
                  <span>{incident.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
