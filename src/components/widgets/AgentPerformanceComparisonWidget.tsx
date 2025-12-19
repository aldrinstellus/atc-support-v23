import {
  Trophy,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Star,
  Target,
  Users,
} from 'lucide-react';
import type { AgentPerformanceComparisonData } from '@/types/widget';

export function AgentPerformanceComparisonWidget({
  data,
}: {
  data: AgentPerformanceComparisonData;
}) {
  return (
    <div className="space-y-6 my-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
          <p className="text-sm text-muted-foreground">Period: {data.period}</p>
        </div>
      </div>

      {/* Team Average Card */}
      <div className="glass-card rounded-lg border border-primary/30 bg-primary/20 p-4 backdrop-blur-md">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
          <Users className="h-4 w-4 text-primary" />
          Team Average
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Tickets Resolved</div>
            <div className="text-lg font-bold text-foreground">
              {data.teamAverage.ticketsResolved}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Avg Resolution</div>
            <div className="text-lg font-bold text-foreground">
              {data.teamAverage.avgResolutionTime}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Compliance</div>
            <div
              className={`text-lg font-bold ${
                data.teamAverage.slaCompliance >= 90
                  ? 'text-success'
                  : data.teamAverage.slaCompliance >= 75
                  ? 'text-chart-4'
                  : 'text-destructive'
              }`}
            >
              {data.teamAverage.slaCompliance}%
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Customer Sat</div>
            <div
              className={`text-lg font-bold ${
                data.teamAverage.customerSatisfaction >= 4.5
                  ? 'text-success'
                  : data.teamAverage.customerSatisfaction >= 4.0
                  ? 'text-chart-4'
                  : 'text-destructive'
              }`}
            >
              {data.teamAverage.customerSatisfaction.toFixed(1)}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">First Response</div>
            <div className="text-lg font-bold text-foreground">
              {data.teamAverage.firstResponseTime}
            </div>
          </div>
        </div>
      </div>

      {/* Top Performers */}
      {data.topPerformers && data.topPerformers.length > 0 && (
        <div className="glass-card rounded-lg border border-success/30 bg-emerald-500/20 p-4 backdrop-blur-md">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <Trophy className="h-4 w-4 text-success" />
            Top Performers
          </h4>
          <div className="space-y-4">
            {data.topPerformers.map((agent) => (
              <div
                key={agent.rank}
                className="border border-border/50 rounded-lg p-4 bg-card/50 hover:bg-card/70 transition-all duration-200"
              >
                {/* Agent Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {/* Rank Badge */}
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        agent.rank === 1
                          ? 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-lg'
                          : agent.rank === 2
                          ? 'bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 shadow-md'
                          : 'bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 shadow-md'
                      }`}
                    >
                      <span className="text-sm font-bold text-white">#{agent.rank}</span>
                    </div>

                    {/* Avatar */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary via-chart-2 to-primary shadow-md ring-2 ring-primary/30">
                      <span className="text-sm font-bold text-primary-foreground">
                        {agent.avatar}
                      </span>
                    </div>

                    <div>
                      <h5 className="text-base font-semibold text-foreground">{agent.name}</h5>
                      <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success font-medium inline-flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {agent.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <CheckCircle2 className="h-3 w-3 text-success" />
                      <span className="text-xs text-muted-foreground">Resolved</span>
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      {agent.metrics.ticketsResolved}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {((agent.metrics.ticketsResolved / data.teamAverage.ticketsResolved - 1) * 100).toFixed(0)}% vs avg
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Clock className="h-3 w-3 text-chart-3" />
                      <span className="text-xs text-muted-foreground">Resolution</span>
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      {agent.metrics.avgResolutionTime}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Target className="h-3 w-3 text-primary" />
                      <span className="text-xs text-muted-foreground">Compliance</span>
                    </div>
                    <div
                      className={`text-sm font-semibold ${
                        agent.metrics.slaCompliance >= 90
                          ? 'text-success'
                          : agent.metrics.slaCompliance >= 75
                          ? 'text-chart-4'
                          : 'text-destructive'
                      }`}
                    >
                      {agent.metrics.slaCompliance}%
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-3 w-3 text-chart-4" />
                      <span className="text-xs text-muted-foreground">CSAT</span>
                    </div>
                    <div
                      className={`text-sm font-semibold ${
                        agent.metrics.customerSatisfaction >= 4.5
                          ? 'text-success'
                          : agent.metrics.customerSatisfaction >= 4.0
                          ? 'text-chart-4'
                          : 'text-destructive'
                      }`}
                    >
                      {agent.metrics.customerSatisfaction.toFixed(1)}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <TrendingUp className="h-3 w-3 text-chart-2" />
                      <span className="text-xs text-muted-foreground">1st Response</span>
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      {agent.metrics.firstResponseTime}
                    </div>
                  </div>
                </div>

                {/* Strengths */}
                {agent.strengths && agent.strengths.length > 0 && (
                  <div className="pt-3 border-t border-border/50">
                    <div className="text-xs text-muted-foreground mb-2">Key Strengths:</div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {agent.strengths.map((strength, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-success border border-success/30"
                        >
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Needs Attention */}
      {data.needsAttention && data.needsAttention.length > 0 && (
        <div className="glass-card rounded-lg border border-chart-4/30 bg-amber-500/20 p-4 backdrop-blur-md">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <AlertTriangle className="h-4 w-4 text-chart-4" />
            Needs Attention
          </h4>
          <div className="space-y-4">
            {data.needsAttention.map((agent) => (
              <div
                key={agent.rank}
                className="border border-border/50 rounded-lg p-4 bg-card/50 hover:bg-card/70 transition-all duration-200"
              >
                {/* Agent Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary via-chart-2 to-primary shadow-md ring-2 ring-primary/30">
                      <span className="text-sm font-bold text-primary-foreground">
                        {agent.avatar}
                      </span>
                    </div>

                    <div>
                      <h5 className="text-base font-semibold text-foreground">{agent.name}</h5>
                      {agent.status && (
                        <span className="text-xs px-2 py-1 rounded-full bg-chart-4/20 text-chart-4 font-medium">
                          {agent.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <CheckCircle2 className="h-3 w-3 text-chart-3" />
                      <span className="text-xs text-muted-foreground">Resolved</span>
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      {agent.metrics.ticketsResolved}
                    </div>
                    <div className="text-xs text-chart-4">
                      {((agent.metrics.ticketsResolved / data.teamAverage.ticketsResolved - 1) * 100).toFixed(0)}% vs avg
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Clock className="h-3 w-3 text-chart-3" />
                      <span className="text-xs text-muted-foreground">Resolution</span>
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      {agent.metrics.avgResolutionTime}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Target className="h-3 w-3 text-primary" />
                      <span className="text-xs text-muted-foreground">Compliance</span>
                    </div>
                    <div
                      className={`text-sm font-semibold ${
                        agent.metrics.slaCompliance >= 90
                          ? 'text-success'
                          : agent.metrics.slaCompliance >= 75
                          ? 'text-chart-4'
                          : 'text-destructive'
                      }`}
                    >
                      {agent.metrics.slaCompliance}%
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-3 w-3 text-chart-4" />
                      <span className="text-xs text-muted-foreground">CSAT</span>
                    </div>
                    <div
                      className={`text-sm font-semibold ${
                        agent.metrics.customerSatisfaction >= 4.5
                          ? 'text-success'
                          : agent.metrics.customerSatisfaction >= 4.0
                          ? 'text-chart-4'
                          : 'text-destructive'
                      }`}
                    >
                      {agent.metrics.customerSatisfaction.toFixed(1)}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <TrendingUp className="h-3 w-3 text-chart-2" />
                      <span className="text-xs text-muted-foreground">1st Response</span>
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      {agent.metrics.firstResponseTime}
                    </div>
                  </div>
                </div>

                {/* Concerns */}
                {agent.concerns && agent.concerns.length > 0 && (
                  <div className="pb-3 mb-3 border-b border-border/50">
                    <div className="text-xs text-muted-foreground mb-2">Concerns:</div>
                    <div className="space-y-1">
                      {agent.concerns.map((concern, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-chart-4 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-muted-foreground">{concern}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {agent.recommendations && agent.recommendations.length > 0 && (
                  <div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Coaching Recommendations:
                    </div>
                    <div className="space-y-1">
                      {agent.recommendations.map((rec, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3 w-3 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-foreground/90">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
