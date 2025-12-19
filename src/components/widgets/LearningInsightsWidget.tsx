'use client';

import { useState, useEffect } from 'react';
import {
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  BarChart3,
  Activity,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from 'lucide-react';
import type {
  LearningAnalytics,
  LearningInsight,
  PatternSummary,
} from '@/types/learning';
import {
  PATTERN_LABELS,
  PATTERN_COLORS,
  SEVERITY_LABELS,
  SEVERITY_COLORS,
} from '@/types/learning';

interface LearningInsightsWidgetProps {
  className?: string;
  showDetails?: boolean;
}

export function LearningInsightsWidget({
  className = '',
  showDetails = true,
}: LearningInsightsWidgetProps) {
  const [analytics, setAnalytics] = useState<LearningAnalytics | null>(null);
  const [insights, setInsights] = useState<LearningInsight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Calculate date range
      const toDate = new Date();
      const fromDate = new Date();
      switch (timeRange) {
        case 'day':
          fromDate.setDate(fromDate.getDate() - 1);
          break;
        case 'week':
          fromDate.setDate(fromDate.getDate() - 7);
          break;
        case 'month':
          fromDate.setMonth(fromDate.getMonth() - 1);
          break;
      }

      const response = await fetch(
        `/api/learning?fromDate=${fromDate.toISOString()}&toDate=${toDate.toISOString()}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch learning data');
      }

      const data = await response.json();

      if (data.success) {
        setAnalytics(data.analytics);
        setInsights(data.insights || []);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load');
      // Set demo data on error
      setAnalytics(getDemoAnalytics());
      setInsights(getDemoInsights());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [timeRange]);

  const getInsightIcon = (type: LearningInsight['type']) => {
    switch (type) {
      case 'improvement_opportunity':
        return <Lightbulb className="h-4 w-4 text-chart-3" />;
      case 'pattern_detected':
        return <Activity className="h-4 w-4 text-primary" />;
      case 'anomaly':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'success_pattern':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
    }
  };

  const getImpactColor = (impact: 'low' | 'medium' | 'high') => {
    switch (impact) {
      case 'low':
        return 'text-muted-foreground';
      case 'medium':
        return 'text-chart-3';
      case 'high':
        return 'text-destructive';
    }
  };

  if (isLoading) {
    return (
      <div className={`glass-card rounded-lg border border-border bg-card/70 p-4 ${className}`}>
        <div className="flex items-center gap-2 animate-pulse">
          <Brain className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Loading learning data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-card rounded-lg border border-border bg-card/70 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Learning Loop Insights</h3>
          {analytics && analytics.totalEditsRecorded > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
              {analytics.totalEditsRecorded} edits analyzed
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Time Range Selector */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as 'day' | 'week' | 'month')}
            className="text-xs bg-muted border border-border rounded px-2 py-1 text-foreground"
          >
            <option value="day">Last 24h</option>
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
          </select>

          <button
            onClick={fetchData}
            className="p-1 rounded hover:bg-muted transition-colors"
            title="Refresh data"
          >
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </button>

          {showDetails && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded hover:bg-muted transition-colors"
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      {analytics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border-b border-border">
          <StatCard
            label="Avg Edit %"
            value={`${analytics.avgEditPercent.toFixed(1)}%`}
            trend={analytics.avgEditPercent < 20 ? 'up' : 'down'}
            trendLabel={analytics.avgEditPercent < 20 ? 'Good' : 'Needs work'}
          />
          <StatCard
            label="Avg Confidence"
            value={`${analytics.avgConfidenceScore.toFixed(0)}%`}
            trend={analytics.avgConfidenceScore >= 75 ? 'up' : 'down'}
            trendLabel={analytics.avgConfidenceScore >= 75 ? 'On target' : 'Below target'}
          />
          <StatCard
            label="Edit Time"
            value={`${Math.round(analytics.avgEditDurationSeconds / 60)}m`}
            trend={analytics.avgEditDurationSeconds < 300 ? 'up' : 'down'}
            trendLabel={analytics.avgEditDurationSeconds < 300 ? 'Fast' : 'Slow'}
          />
          <StatCard
            label="Minor Edits"
            value={`${((analytics.severityDistribution.minor / Math.max(1, analytics.totalEditsRecorded)) * 100).toFixed(0)}%`}
            trend={analytics.severityDistribution.minor > analytics.totalEditsRecorded * 0.5 ? 'up' : 'down'}
            trendLabel="Target >50%"
          />
        </div>
      )}

      {/* Insights */}
      {insights.length > 0 && (
        <div className="p-4 space-y-3">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Active Insights
          </h4>
          {insights.slice(0, isExpanded ? undefined : 3).map((insight) => (
            <div
              key={insight.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
            >
              {getInsightIcon(insight.type)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-foreground">{insight.title}</span>
                  <span className={`text-xs ${getImpactColor(insight.impact)}`}>
                    {insight.impact.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{insight.description}</p>
                {insight.suggestedAction && (
                  <p className="text-xs text-primary mt-1">
                    Suggested: {insight.suggestedAction}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Expanded Details */}
      {showDetails && isExpanded && analytics && (
        <>
          {/* Severity Distribution */}
          <div className="p-4 border-t border-border">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Edit Severity Distribution
            </h4>
            <div className="space-y-2">
              {Object.entries(analytics.severityDistribution).map(([severity, count]) => {
                const percentage = (count / Math.max(1, analytics.totalEditsRecorded)) * 100;
                return (
                  <div key={severity} className="flex items-center gap-2">
                    <span
                      className={`text-xs w-24 ${SEVERITY_COLORS[severity as keyof typeof SEVERITY_COLORS]}`}
                    >
                      {SEVERITY_LABELS[severity as keyof typeof SEVERITY_LABELS]}
                    </span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${severity === 'minor' ? 'bg-success' : severity === 'moderate' ? 'bg-chart-3' : severity === 'major' ? 'bg-chart-4' : 'bg-destructive'}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-10 text-right">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Patterns */}
          {analytics.topPatterns && analytics.topPatterns.length > 0 && (
            <div className="p-4 border-t border-border">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Top Edit Patterns
              </h4>
              <div className="flex flex-wrap gap-2">
                {analytics.topPatterns.map((pattern) => (
                  <div
                    key={pattern.category}
                    className={`text-xs px-3 py-1.5 rounded-full border ${PATTERN_COLORS[pattern.category]}`}
                  >
                    <span className="font-medium">{PATTERN_LABELS[pattern.category]}</span>
                    <span className="ml-2 opacity-70">{pattern.percentage.toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Correlation Insight */}
          {analytics.confidenceCorrelation !== 0 && (
            <div className="p-4 border-t border-border">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                <BarChart3 className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <span className="text-sm font-medium text-foreground">Confidence Correlation</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    {analytics.confidenceCorrelation < -0.3
                      ? 'Strong negative correlation: Lower confidence scores accurately predict higher edit requirements.'
                      : analytics.confidenceCorrelation < 0
                        ? 'Weak negative correlation: Some relationship between confidence and edits.'
                        : 'Positive or no correlation: Confidence scores may need recalibration.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {(!analytics || analytics.totalEditsRecorded === 0) && !isLoading && (
        <div className="p-8 text-center">
          <Brain className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            No edit data yet. Learning insights will appear as agents review and edit AI drafts.
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="px-4 pb-4">
          <p className="text-xs text-muted-foreground italic">
            Using demo data. {error}
          </p>
        </div>
      )}
    </div>
  );
}

// Stat Card Component
function StatCard({
  label,
  value,
  trend,
  trendLabel,
}: {
  label: string;
  value: string;
  trend: 'up' | 'down';
  trendLabel: string;
}) {
  return (
    <div className="text-center">
      <p className="text-xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="flex items-center justify-center gap-1 mt-1">
        {trend === 'up' ? (
          <TrendingUp className="h-3 w-3 text-success" />
        ) : (
          <TrendingDown className="h-3 w-3 text-destructive" />
        )}
        <span className={`text-xs ${trend === 'up' ? 'text-success' : 'text-destructive'}`}>
          {trendLabel}
        </span>
      </div>
    </div>
  );
}

// Demo data for when API is not available
function getDemoAnalytics(): LearningAnalytics {
  return {
    totalDraftsReviewed: 45,
    totalEditsRecorded: 45,
    avgEditPercent: 18.5,
    avgEditDurationSeconds: 180,
    avgConfidenceScore: 78,
    confidenceCorrelation: -0.42,
    severityDistribution: {
      minor: 22,
      moderate: 15,
      major: 6,
      complete_rewrite: 2,
    },
    topPatterns: [
      { category: 'TONE_ADJUSTMENT', count: 18, percentage: 40, avgConfidenceWhenOccurs: 72, examples: [] },
      { category: 'DETAIL_ADDITION', count: 12, percentage: 27, avgConfidenceWhenOccurs: 68, examples: [] },
      { category: 'PERSONALIZATION', count: 8, percentage: 18, avgConfidenceWhenOccurs: 75, examples: [] },
      { category: 'GRAMMAR_FIX', count: 5, percentage: 11, avgConfidenceWhenOccurs: 85, examples: [] },
    ],
    fromDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    toDate: new Date(),
  };
}

function getDemoInsights(): LearningInsight[] {
  return [
    {
      id: '1',
      type: 'pattern_detected',
      title: 'Frequent Tone Adjustments',
      description:
        '40% of drafts require tone modifications. Consider calibrating AI tone settings for support responses.',
      impact: 'medium',
      category: 'TONE_ADJUSTMENT',
      suggestedAction: 'Review AI prompt templates for tone guidelines',
      dataPoints: 18,
      confidence: 0.85,
      createdAt: new Date(),
    },
    {
      id: '2',
      type: 'success_pattern',
      title: 'High Accuracy for Password Reset',
      description:
        'Password reset ticket drafts have 92% approval rate with minor edits. Consider applying similar templates to other categories.',
      impact: 'low',
      category: 'OTHER',
      suggestedAction: 'Document password reset template patterns',
      dataPoints: 25,
      confidence: 0.9,
      createdAt: new Date(),
    },
    {
      id: '3',
      type: 'improvement_opportunity',
      title: 'Detail Additions Common',
      description:
        '27% of drafts need additional details. AI may benefit from including more contextual information.',
      impact: 'medium',
      category: 'DETAIL_ADDITION',
      suggestedAction: 'Enhance AI context prompts with customer history',
      dataPoints: 12,
      confidence: 0.75,
      createdAt: new Date(),
    },
  ];
}

export default LearningInsightsWidget;
