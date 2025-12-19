import {
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Activity,
} from 'lucide-react';
import type { ExecutiveSummaryData } from '@/types/widget';

export function ExecutiveSummaryWidget({ data }: { data: ExecutiveSummaryData }) {
  // Defensive check for malformed data
  if (!data || typeof data !== 'object') {
    console.error('[ExecutiveSummaryWidget] Invalid data received:', data);
    return (
      <div className="my-4 rounded-lg border border-destructive/30 bg-red-500/20 p-4">
        <p className="text-sm text-destructive">Unable to load executive summary: Invalid data</p>
      </div>
    );
  }

  if (!data.sections || !Array.isArray(data.sections)) {
    console.error('[ExecutiveSummaryWidget] Missing or invalid sections:', data);
    return (
      <div className="my-4 rounded-lg border border-destructive/30 bg-red-500/20 p-4">
        <p className="text-sm text-destructive">Unable to load executive summary: Missing sections data</p>
      </div>
    );
  }

  const statusIcons = {
    success: CheckCircle2,
    warning: AlertTriangle,
    critical: AlertCircle,
    info: Activity,
  };

  const statusColors = {
    success: 'border-success/30 bg-emerald-500/20',
    warning: 'border-chart-4/30 bg-amber-500/20',
    critical: 'border-destructive/30 bg-red-500/20',
    info: 'border-chart-3/30 bg-lime-500/20',
  };

  const statusTextColors = {
    success: 'text-success',
    warning: 'text-chart-4',
    critical: 'text-destructive',
    info: 'text-chart-3',
  };

  const priorityColors = {
    critical: 'border-l-destructive bg-red-500/20',
    high: 'border-l-chart-4 bg-amber-500/20',
    medium: 'border-l-chart-3 bg-lime-500/20',
    low: 'border-l-muted-foreground/50 bg-muted/20',
  };

  return (
    <div className="space-y-6 my-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
          <p className="text-sm text-muted-foreground">{data.date}</p>
        </div>
      </div>

      {/* Summary Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.sections.map((section, idx) => {
          const StatusIcon = statusIcons[section.status];
          const changeIsPositive = section.change.startsWith('+');
          const changeIsNegative = section.change.startsWith('-');

          return (
            <div
              key={idx}
              className={`rounded-lg border p-4 ${statusColors[section.status]} transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex items-start justify-between mb-3">
                <StatusIcon className={`h-5 w-5 ${statusTextColors[section.status]}`} />
                {section.change && (
                  <div className="flex items-center gap-1">
                    {changeIsPositive && <TrendingUp className="h-3.5 w-3.5 text-success" />}
                    {changeIsNegative && <TrendingDown className="h-3.5 w-3.5 text-destructive" />}
                    <span
                      className={`text-xs font-medium ${
                        changeIsPositive
                          ? 'text-success'
                          : changeIsNegative
                          ? 'text-destructive'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {section.change}
                    </span>
                  </div>
                )}
              </div>

              <div className="text-2xl font-bold mb-1 text-foreground">{section.value}</div>
              <div className="text-xs font-medium text-foreground/80 mb-2">{section.title}</div>
              <p className="text-xs text-muted-foreground">{section.description}</p>
            </div>
          );
        })}
      </div>

      {/* Key Insights */}
      {data.keyInsights && Array.isArray(data.keyInsights) && data.keyInsights.length > 0 && (
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <Activity className="h-4 w-4 text-primary" />
            Key Insights
          </h4>
          <ul className="space-y-2">
            {data.keyInsights.map((insight, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                <span className="text-sm text-foreground/90 leading-relaxed">{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommended Actions */}
      {data.recommendedActions && Array.isArray(data.recommendedActions) && data.recommendedActions.length > 0 && (
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <AlertCircle className="h-4 w-4 text-primary" />
            Recommended Actions
          </h4>
          <div className="space-y-3">
            {data.recommendedActions.map((action, idx) => (
              <div
                key={idx}
                className={`border-l-4 ${priorityColors[action.priority]} rounded-r p-3 transition-all duration-200 hover:shadow-sm`}
              >
                <div className="flex items-start justify-between mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {action.priority} Priority
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground mb-1">{action.action}</p>
                <p className="text-xs text-muted-foreground">{action.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
