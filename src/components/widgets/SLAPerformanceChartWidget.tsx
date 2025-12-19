import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle2,
  Clock,
  AlertCircle,
  Target,
} from 'lucide-react';
import type { SLAPerformanceChartData } from '@/types/widget';

export function SLAPerformanceChartWidget({ data }: { data: SLAPerformanceChartData }) {
  const trendIcons = {
    improving: TrendingUp,
    stable: Minus,
    declining: TrendingDown,
  };

  const trendColors = {
    improving: 'text-success',
    stable: 'text-muted-foreground',
    declining: 'text-destructive',
  };

  return (
    <div className="space-y-6 my-4">
      {/* Header with Overall Compliance */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
          <p className="text-sm text-muted-foreground">Overall SLA performance analysis</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2">
            <div
              className={`text-4xl font-bold ${
                data.overallCompliance >= data.target
                  ? 'text-success'
                  : data.overallCompliance >= data.target - 5
                  ? 'text-chart-4'
                  : 'text-destructive'
              }`}
            >
              {data.overallCompliance}%
            </div>
            <div className="text-left">
              <div className="text-xs text-muted-foreground">Overall</div>
              <div className="text-xs text-muted-foreground">
                Target: {data.target}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SLA Categories Breakdown */}
      <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
          <Target className="h-4 w-4 text-primary" />
          SLA Categories
        </h4>
        <div className="space-y-3">
          {data.byCategory.map((category, idx) => {
            const TrendIcon = trendIcons[category.trend];
            const isWarning = category.compliance >= 75 && category.compliance < 90;
            const isCritical = category.compliance < 75;

            return (
              <div
                key={idx}
                className={`border-l-4 rounded-r p-3 transition-all duration-200 hover:shadow-sm ${
                  isCritical
                    ? 'border-l-destructive bg-red-500/20'
                    : isWarning
                    ? 'border-l-chart-4 bg-amber-500/20'
                    : 'border-l-success bg-emerald-500/20'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="text-sm font-semibold text-foreground">
                        {category.category}
                      </h5>
                      <TrendIcon
                        className={`h-3 w-3 ${trendColors[category.trend]}`}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Target: {category.target} • Avg Time: {category.avgTime}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-2xl font-bold ${
                        isCritical
                          ? 'text-destructive'
                          : isWarning
                          ? 'text-chart-4'
                          : 'text-success'
                      }`}
                    >
                      {category.compliance}%
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isCritical
                          ? 'bg-destructive'
                          : isWarning
                          ? 'bg-chart-4'
                          : 'bg-success'
                      }`}
                      style={{ width: `${Math.min(category.compliance, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Breaches Count */}
                {category.breaches > 0 && (
                  <div className="flex items-center gap-1 text-xs">
                    <AlertTriangle className="h-3 w-3 text-chart-4" />
                    <span className="text-muted-foreground">
                      {category.breaches} breach{category.breaches !== 1 ? 'es' : ''} this period
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Trend Chart Visualization */}
      {data.trendData && data.trendData.labels.length > 0 && (
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <TrendingUp className="h-4 w-4 text-primary" />
            Weekly Trend
          </h4>
          {/* Simple text-based trend visualization (can be replaced with chart library) */}
          <div className="space-y-2">
            {data.trendData.datasets.map((dataset, idx) => (
              <div key={idx} className="border-b border-border/50 pb-2 last:border-b-0">
                <div className="text-xs font-medium text-muted-foreground mb-2">
                  {dataset.label}
                </div>
                <div className="flex items-center gap-2">
                  {data.trendData.labels.map((label, labelIdx) => (
                    <div key={labelIdx} className="flex-1 text-center">
                      <div className="text-xs text-muted-foreground mb-1">{label}</div>
                      <div
                        className={`text-sm font-semibold ${
                          dataset.data[labelIdx] >= 90
                            ? 'text-success'
                            : dataset.data[labelIdx] >= 75
                            ? 'text-chart-4'
                            : 'text-destructive'
                        }`}
                      >
                        {dataset.data[labelIdx]}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top SLA Breaches */}
      {data.topBreaches && data.topBreaches.length > 0 && (
        <div className="glass-card rounded-lg border border-destructive/30 bg-red-500/20 p-4 backdrop-blur-md">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            Top SLA Breaches
          </h4>
          <div className="space-y-3">
            {data.topBreaches.map((breach, idx) => (
              <div
                key={idx}
                className="border border-border/50 rounded-lg p-3 bg-card/50 hover:bg-card/70 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-primary font-semibold">
                        {breach.ticketId}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/20 text-destructive font-medium">
                        {breach.priority}
                      </span>
                    </div>
                    <div className="text-sm text-foreground font-medium mb-1">
                      {breach.customer}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Assigned to: {breach.assignedTo}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs text-muted-foreground mb-1">SLA Target</div>
                    <div className="text-sm font-semibold text-foreground">
                      {breach.slaTarget}
                    </div>
                    <div className="text-xs text-destructive mt-1">
                      Actual: {breach.actualTime}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2 mt-2 pt-2 border-t border-border/50">
                  <AlertCircle className="h-3 w-3 text-chart-4 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground">{breach.reason}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Root Cause Analysis */}
      {data.rootCauses && data.rootCauses.length > 0 && (
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <Clock className="h-4 w-4 text-primary" />
            Root Cause Analysis
          </h4>
          <div className="space-y-3">
            {data.rootCauses.map((cause, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 pb-3 border-b border-border/50 last:border-b-0 last:pb-0"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h5 className="text-sm font-semibold text-foreground">{cause.cause}</h5>
                    <span className="text-xs font-mono text-muted-foreground">
                      {cause.count} cases
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{cause.description}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-2xl font-bold text-chart-4">{cause.percentage}%</div>
                  <div className="text-xs text-muted-foreground">of breaches</div>
                </div>
              </div>
            ))}
          </div>

          {/* Simple pie chart visualization using flex bars */}
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex h-4 rounded-full overflow-hidden">
              {data.rootCauses.map((cause, idx) => (
                <div
                  key={idx}
                  className={`transition-all duration-300 ${
                    idx === 0
                      ? 'bg-destructive'
                      : idx === 1
                      ? 'bg-chart-4'
                      : idx === 2
                      ? 'bg-chart-3'
                      : 'bg-muted'
                  }`}
                  style={{ width: `${cause.percentage}%` }}
                  title={`${cause.cause}: ${cause.percentage}%`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {data.recommendations && data.recommendations.length > 0 && (
        <div className="glass-card rounded-lg border border-primary/30 bg-primary/20 p-4 backdrop-blur-md">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            Recommendations
          </h4>
          <div className="space-y-2">
            {data.recommendations.map((recommendation, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-sm text-foreground/90">{recommendation}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
