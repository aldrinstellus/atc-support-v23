import React from 'react';
import {
  Code2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Bug,
  Shield
} from 'lucide-react';
import type { CodeQualityData } from '@/types/widget';

export function CodeQualityDashboardWidget({ data }: { data: CodeQualityData }) {
  // Defensive check
  if (!data || typeof data !== 'object') {
    return (
      <div className="my-4 rounded-lg border border-destructive/30 bg-red-500/20 p-4">
        <p className="text-sm text-destructive">Unable to load code quality data</p>
      </div>
    );
  }

  const gradeColors = {
    A: 'text-success',
    B: 'text-chart-3',
    C: 'text-chart-4',
    D: 'text-destructive',
    F: 'text-destructive',
  };

  const statusColors = {
    pass: 'bg-success/20 text-success border-success/50',
    warning: 'bg-chart-4/20 text-chart-4 border-chart-4/50',
    fail: 'bg-destructive/20 text-destructive border-destructive/50',
  };

  const trendIcons: Record<string, React.JSX.Element> = {
    improving: <TrendingUp className="h-4 w-4 text-success" />,
    stable: <div className="h-1 w-4 bg-chart-3 rounded" />,
    declining: <TrendingDown className="h-4 w-4 text-destructive" />,
    increasing: <TrendingUp className="h-4 w-4 text-success" />,
    decreasing: <TrendingDown className="h-4 w-4 text-destructive" />,
  };

  const issueTypeIcons = {
    bug: <Bug className="h-4 w-4 text-destructive" />,
    vulnerability: <Shield className="h-4 w-4 text-chart-4" />,
    'code-smell': <AlertTriangle className="h-4 w-4 text-chart-3" />,
    duplicate: <Code2 className="h-4 w-4 text-muted-foreground" />,
  };

  const severityColors = {
    critical: 'border-l-destructive bg-red-500/20',
    high: 'border-l-chart-4 bg-amber-500/20',
    medium: 'border-l-chart-3 bg-lime-500/20',
    low: 'border-l-muted-foreground/50 bg-muted/20',
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6 my-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2">
            <span className={`text-3xl font-bold ${gradeColors[data.overall.grade]}`}>
              {data.overall.grade}
            </span>
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-foreground">{data.overall.score}%</span>
              {trendIcons[data.overall.trend]}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Overall Quality</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Test Coverage */}
        <div className="rounded-lg border border-border bg-card/50 p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-foreground">Test Coverage</h4>
            <span className={`text-xs px-2 py-1 rounded border ${statusColors[data.metrics.testCoverage.status]}`}>
              {data.metrics.testCoverage.status}
            </span>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-2xl font-bold text-foreground">{data.metrics.testCoverage.value}%</span>
            <span className="text-sm text-muted-foreground mb-1">/ {data.metrics.testCoverage.target}% target</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${data.metrics.testCoverage.value}%` }}
            />
          </div>
        </div>

        {/* Code Smells */}
        <div className="rounded-lg border border-border bg-card/50 p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-foreground">Code Smells</h4>
            <span className={`text-xs px-2 py-1 rounded border ${statusColors[data.metrics.codeSmells.status]}`}>
              {data.metrics.codeSmells.status}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <div className="text-2xl font-bold text-foreground">{data.metrics.codeSmells.count}</div>
              <p className="text-xs text-muted-foreground">Total Issues</p>
            </div>
            <div>
              <div className="text-xl font-bold text-destructive">{data.metrics.codeSmells.critical}</div>
              <p className="text-xs text-muted-foreground">Critical</p>
            </div>
          </div>
        </div>

        {/* Technical Debt */}
        <div className="rounded-lg border border-border bg-card/50 p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-foreground">Technical Debt</h4>
            {trendIcons[data.metrics.technicalDebt.trend]}
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">{data.metrics.technicalDebt.hours}h</div>
          <p className="text-xs text-muted-foreground">Estimated effort to fix</p>
        </div>

        {/* Duplicate Code */}
        <div className="rounded-lg border border-border bg-card/50 p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-foreground">Duplicate Code</h4>
            <span className={`text-xs px-2 py-1 rounded border ${statusColors[data.metrics.duplicateCode.status]}`}>
              {data.metrics.duplicateCode.status}
            </span>
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">{data.metrics.duplicateCode.percentage}%</div>
          <p className="text-xs text-muted-foreground">Code duplication</p>
        </div>
      </div>

      {/* Recent Issues */}
      {data.recentIssues && data.recentIssues.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <AlertTriangle className="h-4 w-4 text-chart-4" />
            Recent Issues ({data.recentIssues.length})
          </h4>
          <div className="space-y-2">
            {data.recentIssues.map((issue, idx) => (
              <div
                key={idx}
                className={`border-l-4 ${severityColors[issue.severity]} rounded-r p-3 transition-all duration-200 hover:shadow-sm`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {issueTypeIcons[issue.type]}
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {issue.type} • {issue.severity}
                    </span>
                  </div>
                  {issue.assignedTo && (
                    <span className="text-xs px-2 py-1 rounded bg-muted text-foreground">
                      {issue.assignedTo}
                    </span>
                  )}
                </div>
                <p className="text-xs font-mono text-muted-foreground mb-1">{issue.file}</p>
                <p className="text-sm text-foreground">{issue.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
