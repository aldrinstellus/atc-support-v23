import { TrendingUp, TrendingDown, Award, Star, Clock, Target, ThumbsUp, Calendar, Trophy } from 'lucide-react';
import type { AgentPerformanceStatsData } from '@/types/widget';

export function AgentPerformanceStatsWidget({ data }: { data: AgentPerformanceStatsData }) {
  const getTrendIcon = (trend: string) => {
    if (trend.startsWith('+')) {
      return <TrendingUp className="h-3 w-3 text-chart-2" />;
    } else if (trend.startsWith('-') && trend.includes('hours')) {
      // Negative time trend is good (faster)
      return <TrendingUp className="h-3 w-3 text-chart-2" />;
    } else if (trend.startsWith('-')) {
      return <TrendingDown className="h-3 w-3 text-destructive" />;
    }
    return null;
  };

  const getTrendColor = (trend: string) => {
    if (trend.startsWith('+')) {
      return 'text-chart-2';
    } else if (trend.startsWith('-') && trend.includes('hours')) {
      return 'text-chart-2'; // Negative time is good
    } else if (trend.startsWith('-')) {
      return 'text-destructive';
    }
    return 'text-muted-foreground';
  };

  return (
    <div className="space-y-4 my-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            {data.title}
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            {data.period}
          </p>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Tickets Resolved */}
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <p className="text-xs font-medium text-muted-foreground">Tickets Resolved</p>
            </div>
            <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
              {data.keyMetrics.ticketsResolved.percentile} percentile
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{data.keyMetrics.ticketsResolved.value}</p>
            <div className="flex items-center gap-2 text-xs">
              {getTrendIcon(data.keyMetrics.ticketsResolved.trend)}
              <span className={getTrendColor(data.keyMetrics.ticketsResolved.trend)}>
                {data.keyMetrics.ticketsResolved.trend}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{data.keyMetrics.ticketsResolved.comparison}</span>
            </div>
          </div>
        </div>

        {/* Avg Resolution Time */}
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <p className="text-xs font-medium text-muted-foreground">Avg Resolution Time</p>
            </div>
            <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
              {data.keyMetrics.avgResolutionTime.percentile} percentile
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{data.keyMetrics.avgResolutionTime.value}</p>
            <div className="flex items-center gap-2 text-xs">
              {getTrendIcon(data.keyMetrics.avgResolutionTime.trend)}
              <span className={getTrendColor(data.keyMetrics.avgResolutionTime.trend)}>
                {data.keyMetrics.avgResolutionTime.trend}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{data.keyMetrics.avgResolutionTime.comparison}</span>
            </div>
          </div>
        </div>

        {/* First Response Time */}
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <p className="text-xs font-medium text-muted-foreground">First Response Time</p>
            </div>
            <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
              {data.keyMetrics.firstResponseTime.percentile} percentile
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{data.keyMetrics.firstResponseTime.value}</p>
            <div className="flex items-center gap-2 text-xs">
              {getTrendIcon(data.keyMetrics.firstResponseTime.trend)}
              <span className={getTrendColor(data.keyMetrics.firstResponseTime.trend)}>
                {data.keyMetrics.firstResponseTime.trend}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{data.keyMetrics.firstResponseTime.comparison}</span>
            </div>
          </div>
        </div>

        {/* SLA Compliance */}
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <p className="text-xs font-medium text-muted-foreground">Compliance</p>
            </div>
            <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
              {data.keyMetrics.slaCompliance.percentile} percentile
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{data.keyMetrics.slaCompliance.value}</p>
            <div className="flex items-center gap-2 text-xs">
              {getTrendIcon(data.keyMetrics.slaCompliance.trend)}
              <span className={getTrendColor(data.keyMetrics.slaCompliance.trend)}>
                {data.keyMetrics.slaCompliance.trend}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{data.keyMetrics.slaCompliance.comparison}</span>
            </div>
          </div>
        </div>

        {/* Customer Satisfaction */}
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              <p className="text-xs font-medium text-muted-foreground">Customer Satisfaction</p>
            </div>
            <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
              {data.keyMetrics.customerSatisfaction.percentile} percentile
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{data.keyMetrics.customerSatisfaction.value}</p>
            <div className="flex items-center gap-2 text-xs">
              {getTrendIcon(data.keyMetrics.customerSatisfaction.trend)}
              <span className={getTrendColor(data.keyMetrics.customerSatisfaction.trend)}>
                {data.keyMetrics.customerSatisfaction.trend}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{data.keyMetrics.customerSatisfaction.comparison}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="glass-card rounded-lg border border-border bg-card/70 p-4">
        <h5 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
          <Calendar className="h-4 w-4 text-primary" />
          Category Breakdown
        </h5>
        <div className="space-y-3">
          {data.categoryBreakdown.map((category, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{category.category}</span>
                  <span className="text-xs text-muted-foreground">{category.count} tickets • Avg {category.avgTime}</span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
              <span className="text-sm font-semibold text-foreground min-w-[3rem] text-right">
                {category.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      {data.achievements && data.achievements.length > 0 && (
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4">
          <h5 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
            <Trophy className="h-4 w-4 text-primary" />
            Achievements
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {data.achievements.map((achievement, index) => (
              <div key={index} className="p-3 rounded border border-border/50 bg-background/50">
                <p className="text-sm font-semibold text-foreground mb-1">{achievement.badge}</p>
                <p className="text-xs text-muted-foreground mb-1">{achievement.description}</p>
                <p className="text-xs text-muted-foreground">Earned {achievement.dateEarned}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Customer Feedback */}
      {data.feedback && data.feedback.length > 0 && (
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4">
          <h5 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
            <ThumbsUp className="h-4 w-4 text-primary" />
            Recent Customer Feedback
          </h5>
          <div className="space-y-3">
            {data.feedback.slice(0, 3).map((item, index) => (
              <div key={index} className="p-3 rounded border border-border/50 bg-background/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{item.customer}</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < item.rating ? 'text-chart-4 fill-chart-4' : 'text-muted stroke-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic">&quot;{item.comment}&quot;</p>
                <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
