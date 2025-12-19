import { TrendingUp, Target, Lightbulb, Award, AlertCircle, CheckCircle2, Ticket } from 'lucide-react';
import type { SimilarTicketsAnalysisData } from '@/types/widget';

export function SimilarTicketsAnalysisWidget({ data }: { data: SimilarTicketsAnalysisData }) {
  return (
    <div className="space-y-4 my-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            {data.title}
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            {data.category} • {data.ticketsAnalyzed} tickets analyzed
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="glass-card rounded-lg border border-border bg-card/70 p-3">
          <p className="text-xs font-medium text-muted-foreground mb-1">Tickets Analyzed</p>
          <p className="text-xl font-bold text-foreground">{data.ticketsAnalyzed}</p>
        </div>
        <div className="glass-card rounded-lg border border-border bg-card/70 p-3">
          <p className="text-xs font-medium text-muted-foreground mb-1">Avg Resolution Time</p>
          <p className="text-xl font-bold text-foreground">{data.avgResolutionTime}</p>
        </div>
        <div className="glass-card rounded-lg border border-border bg-card/70 p-3">
          <p className="text-xs font-medium text-muted-foreground mb-1">Success Rate</p>
          <p className="text-xl font-bold text-chart-2">{data.successRate}</p>
        </div>
      </div>

      {/* Common Patterns */}
      <div className="glass-card rounded-lg border border-border bg-card/70 p-4">
        <h5 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
          <Target className="h-4 w-4 text-primary" />
          Common Patterns You&apos;ve Resolved
        </h5>
        <div className="space-y-4">
          {data.commonPatterns.map((pattern, index) => (
            <div key={index} className="space-y-2">
              {/* Pattern Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{pattern.pattern}</span>
                  <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                    {pattern.frequency} tickets
                  </span>
                </div>
                <span className="text-sm font-bold text-primary">{pattern.percentage}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${pattern.percentage}%` }}
                />
              </div>

              {/* Pattern Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 p-3 rounded bg-background/50 border border-border/50">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Avg Resolution Time</p>
                  <p className="text-sm font-semibold text-foreground">{pattern.avgResolutionTime}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Typical Solution</p>
                  <p className="text-sm text-foreground">{pattern.typicalSolution}</p>
                </div>
              </div>

              {/* Examples */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-muted-foreground">Examples:</span>
                {pattern.examples.map((example, exIndex) => (
                  <span
                    key={exIndex}
                    className="inline-flex items-center gap-1 text-xs text-primary bg-primary/20 px-2 py-0.5 rounded border border-primary/20"
                  >
                    <Ticket className="h-3 w-3" />
                    {example}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Strengths */}
      <div className="glass-card rounded-lg border border-chart-2/30 bg-emerald-500/20 p-4">
        <h5 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
          <Award className="h-4 w-4 text-chart-2" />
          Your Strengths
        </h5>
        <div className="space-y-2">
          {data.yourStrengths.map((strength, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-chart-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">{strength}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Improvement Opportunities */}
      {data.improvementOpportunities && data.improvementOpportunities.length > 0 && (
        <div className="glass-card rounded-lg border border-chart-4/30 bg-amber-500/20 p-4">
          <h5 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
            <AlertCircle className="h-4 w-4 text-chart-4" />
            Improvement Opportunities
          </h5>
          <div className="space-y-2">
            {data.improvementOpportunities.map((opportunity, index) => (
              <div key={index} className="flex items-start gap-2">
                <TrendingUp className="h-4 w-4 text-chart-4 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">{opportunity}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Best Practices */}
      <div className="glass-card rounded-lg border border-border bg-card/70 p-4">
        <h5 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
          <Lightbulb className="h-4 w-4 text-primary" />
          Best Practices from Your Resolutions
        </h5>
        <div className="space-y-3">
          {data.bestPractices.map((practice, index) => (
            <div key={index} className="p-3 rounded border border-border/50 bg-background/50">
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="text-sm font-medium text-foreground flex-1">{practice.practice}</p>
                <span className="text-xs font-semibold text-primary bg-primary/20 px-2 py-1 rounded flex-shrink-0">
                  {practice.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Items */}
      <div className="flex items-center gap-2 pt-2">
        <button className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium px-4 py-2 rounded bg-primary/20 hover:bg-primary/30 border border-primary/20 hover:border-primary/40 transition-all">
          <Target className="h-4 w-4" />
          Apply These Patterns
        </button>
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-medium px-4 py-2 rounded bg-muted/20 hover:bg-muted/30 border border-border hover:border-border/80 transition-all">
          <TrendingUp className="h-4 w-4" />
          View Full Analytics
        </button>
      </div>
    </div>
  );
}
