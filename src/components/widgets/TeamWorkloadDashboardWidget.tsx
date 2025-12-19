import {
  AlertTriangle,
} from 'lucide-react';
import type { TeamWorkloadDashboardData } from '@/types/widget';

export function TeamWorkloadDashboardWidget({ data }: { data: TeamWorkloadDashboardData }) {
  const statusColors = {
    online: 'border-success/30 bg-emerald-500/20 text-success',
    busy: 'border-chart-4/30 bg-amber-500/20 text-chart-4',
    offline: 'border-muted/30 bg-muted/20 text-muted-foreground',
    overloaded: 'border-destructive/30 bg-red-500/20 text-destructive',
  };

  const loadStatusColors = {
    low: 'bg-chart-3',
    moderate: 'bg-chart-4',
    high: 'bg-chart-4',
    overloaded: 'bg-destructive',
    offline: 'bg-muted',
  };

  const performanceColors = {
    excellent: 'text-success',
    good: 'text-chart-3',
    'needs-attention': 'text-chart-4',
  };

  return (
    <div className="space-y-6 my-4">
      {/* Header with Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
          <p className="text-sm text-muted-foreground">Last updated: {data.lastUpdated}</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{data.agentsOnline}/{data.teamSize}</div>
            <div className="text-xs text-muted-foreground">Agents Online</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{data.totalTickets}</div>
            <div className="text-xs text-muted-foreground">Total Tickets</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{data.avgTicketsPerAgent.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">Avg per Agent</div>
          </div>
        </div>
      </div>

      {/* AI Recommendation */}
      {data.aiRecommendation && (
        <div className={`glass-card rounded-lg border p-4 backdrop-blur-md ${
          data.aiRecommendation.severity === 'critical'
            ? 'border-destructive/50 bg-red-500/20'
            : data.aiRecommendation.severity === 'high'
            ? 'border-chart-4/50 bg-amber-500/20'
            : 'border-primary/30 bg-primary/20'
        }`}>
          <div className="flex items-start gap-3 mb-3">
            <AlertTriangle className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
              data.aiRecommendation.severity === 'critical'
                ? 'text-destructive'
                : data.aiRecommendation.severity === 'high'
                ? 'text-chart-4'
                : 'text-primary'
            }`} />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-1">
                {data.aiRecommendation.type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h4>
              <p className="text-sm text-foreground/90 mb-3">{data.aiRecommendation.message}</p>
              {data.aiRecommendation.suggestedActions.map((action, idx) => (
                <div key={idx} className="mb-2 last:mb-0 pl-4 border-l-2 border-primary/30">
                  <p className="text-xs font-medium text-foreground mb-1">{action.action}</p>
                  <p className="text-xs text-muted-foreground">{action.impact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.agents.map((agent) => (
          <div
            key={agent.id}
            className={`glass-card rounded-lg border p-4 backdrop-blur-md transition-all duration-200 hover:shadow-md ${
              agent.loadStatus === 'overloaded'
                ? 'border-destructive/30 bg-red-500/20'
                : 'border-border bg-card/70'
            }`}
          >
            {/* Agent Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary via-chart-2 to-primary shadow-md ring-2 ring-primary/30">
                  <span className="text-xs font-bold text-primary-foreground">{agent.avatar}</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{agent.name}</h4>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded border inline-block ${statusColors[agent.status]}`}>
                    {agent.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Load Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Workload</span>
                <span className={`text-xs font-bold ${
                  agent.loadPercentage > 100 ? 'text-destructive' :
                  agent.loadPercentage > 80 ? 'text-chart-4' :
                  'text-success'
                }`}>
                  {agent.loadPercentage}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${loadStatusColors[agent.loadStatus]} transition-all duration-300`}
                  style={{ width: `${Math.min(agent.loadPercentage, 100)}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                <span>{agent.ticketCount} tickets</span>
                <span>{agent.capacity} capacity</span>
              </div>
            </div>

            {/* Tickets Breakdown */}
            <div className="grid grid-cols-4 gap-1 mb-3">
              {agent.activeTickets.critical > 0 && (
                <div className="text-center">
                  <div className="text-sm font-bold text-destructive">{agent.activeTickets.critical}</div>
                  <div className="text-xs text-muted-foreground">Crit</div>
                </div>
              )}
              {agent.activeTickets.high > 0 && (
                <div className="text-center">
                  <div className="text-sm font-bold text-chart-4">{agent.activeTickets.high}</div>
                  <div className="text-xs text-muted-foreground">High</div>
                </div>
              )}
              {agent.activeTickets.medium > 0 && (
                <div className="text-center">
                  <div className="text-sm font-bold text-chart-3">{agent.activeTickets.medium}</div>
                  <div className="text-xs text-muted-foreground">Med</div>
                </div>
              )}
              {agent.activeTickets.low > 0 && (
                <div className="text-center">
                  <div className="text-sm font-bold text-muted-foreground">{agent.activeTickets.low}</div>
                  <div className="text-xs text-muted-foreground">Low</div>
                </div>
              )}
            </div>

            {/* Metrics */}
            <div className="space-y-2 pt-2 border-t border-border/50">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Avg Response</span>
                <span className="font-medium text-foreground">{agent.avgResponseTime}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Compliance</span>
                <span className={`font-medium ${agent.slaCompliance >= 90 ? 'text-success' : agent.slaCompliance >= 75 ? 'text-chart-4' : 'text-destructive'}`}>
                  {agent.slaCompliance}%
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Performance</span>
                <span className={`font-medium capitalize ${performanceColors[agent.performance]}`}>
                  {agent.performance}
                </span>
              </div>
            </div>

            {/* Alerts */}
            {agent.alerts.length > 0 && (
              <div className="mt-3 pt-2 border-t border-border/50 space-y-1">
                {agent.alerts.map((alert, idx) => (
                  <div key={idx} className="flex items-start gap-1">
                    <AlertTriangle className="h-3 w-3 text-chart-4 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-muted-foreground">{alert}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
