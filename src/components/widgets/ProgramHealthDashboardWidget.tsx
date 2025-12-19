import {
  Activity,
  AlertTriangle,
  Calendar,
  DollarSign,
  Users,
  AlertCircle
} from 'lucide-react';
import type { ProgramHealthData } from '@/types/widget';

export function ProgramHealthDashboardWidget({ data }: { data: ProgramHealthData }) {
  // Defensive check
  if (!data || typeof data !== 'object') {
    return (
      <div className="my-4 rounded-lg border border-destructive/30 bg-red-500/20 p-4">
        <p className="text-sm text-destructive">Unable to load program health data</p>
      </div>
    );
  }

  const statusColors = {
    'on-track': 'border-success/30 bg-emerald-500/20 text-success',
    'at-risk': 'border-chart-4/30 bg-amber-500/20 text-chart-4',
    'critical': 'border-destructive/30 bg-red-500/20 text-destructive',
  };

  const healthStatusColors = {
    green: 'bg-success/20 text-success border-success/50',
    yellow: 'bg-chart-4/20 text-chart-4 border-chart-4/50',
    red: 'bg-destructive/20 text-destructive border-destructive/50',
  };

  const healthStatusLabels: Record<string, string> = {
    green: 'On Track',
    yellow: 'At Risk',
    red: 'Critical',
  };

  const milestoneStatusColors = {
    completed: 'bg-emerald-500/20 text-success border-success/30',
    'on-track': 'bg-lime-500/20 text-chart-3 border-chart-3/30',
    'at-risk': 'bg-amber-500/20 text-chart-4 border-chart-4/30',
    delayed: 'bg-red-500/20 text-destructive border-destructive/30',
  };

  const riskImpactColors = {
    critical: 'border-l-destructive bg-red-500/20',
    high: 'border-l-chart-4 bg-amber-500/20',
    medium: 'border-l-chart-3 bg-lime-500/20',
    low: 'border-l-muted-foreground/50 bg-muted/20',
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
          <p className="text-sm text-foreground font-medium">{data.programName}</p>
          <p className="text-xs text-muted-foreground">Program ID: {data.programId}</p>
        </div>
        <div className={`px-4 py-2 rounded-lg border ${statusColors[data.status]}`}>
          <span className="text-sm font-semibold uppercase tracking-wide">
            {data.status.replace('-', ' ')}
          </span>
        </div>
      </div>

      {/* Health Indicators Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-lg border border-border bg-card/50 p-3">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className={`px-2 py-1 rounded text-xs font-medium border ${healthStatusColors[data.health.schedule.status]}`}>
              {healthStatusLabels[data.health.schedule.status] || data.health.schedule.status}
            </span>
          </div>
          <div className="text-xl font-bold text-foreground mb-1">{data.health.schedule.score}%</div>
          <p className="text-xs text-muted-foreground mb-1">Schedule</p>
          <p className="text-xs text-muted-foreground/80">{data.health.schedule.variance} variance</p>
        </div>

        <div className="rounded-lg border border-border bg-card/50 p-3">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className={`px-2 py-1 rounded text-xs font-medium border ${healthStatusColors[data.health.budget.status]}`}>
              {healthStatusLabels[data.health.budget.status] || data.health.budget.status}
            </span>
          </div>
          <div className="text-xl font-bold text-foreground mb-1">{data.health.budget.score}%</div>
          <p className="text-xs text-muted-foreground mb-1">Budget</p>
          <p className="text-xs text-muted-foreground/80">{data.health.budget.utilization}% utilized</p>
        </div>

        <div className="rounded-lg border border-border bg-card/50 p-3">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className={`px-2 py-1 rounded text-xs font-medium border ${healthStatusColors[data.health.resources.status]}`}>
              {healthStatusLabels[data.health.resources.status] || data.health.resources.status}
            </span>
          </div>
          <div className="text-xl font-bold text-foreground mb-1">{data.health.resources.score}%</div>
          <p className="text-xs text-muted-foreground mb-1">Resources</p>
          <p className="text-xs text-muted-foreground/80">{data.health.resources.availability}% available</p>
        </div>

        <div className="rounded-lg border border-border bg-card/50 p-3">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            <span className={`px-2 py-1 rounded text-xs font-medium border ${healthStatusColors[data.health.risks.status]}`}>
              {healthStatusLabels[data.health.risks.status] || data.health.risks.status}
            </span>
          </div>
          <div className="text-xl font-bold text-foreground mb-1">{data.health.risks.count}</div>
          <p className="text-xs text-muted-foreground mb-1">Total Risks</p>
          <p className="text-xs text-destructive">{data.health.risks.criticalCount} critical</p>
        </div>
      </div>

      {/* Key Metrics - MOVED AFTER HEALTH INDICATORS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-lg border border-border bg-card/50 p-3 text-center">
          <div className="text-2xl font-bold text-foreground mb-1">{data.keyMetrics.contractsActive}</div>
          <p className="text-xs text-muted-foreground">Active Contracts</p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-3 text-center">
          <div className="text-2xl font-bold text-foreground mb-1">{data.keyMetrics.deliverablesCompleted}</div>
          <p className="text-xs text-muted-foreground">Deliverables Done</p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-3 text-center">
          <div className="text-2xl font-bold text-foreground mb-1">{data.keyMetrics.stakeholderSatisfaction}%</div>
          <p className="text-xs text-muted-foreground">Stakeholder Satisfaction</p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-3 text-center">
          <div className="text-2xl font-bold text-foreground mb-1">${data.keyMetrics.budgetRemaining}M</div>
          <p className="text-xs text-muted-foreground">Budget Remaining</p>
        </div>
      </div>

      {/* Milestones */}
      {data.milestones && data.milestones.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            Program Milestones
          </h4>
          <div className="space-y-2">
            {data.milestones.map((milestone, idx) => (
              <div key={idx} className="rounded-lg border border-border bg-card/50 p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-foreground">{milestone.name}</p>
                  <span className={`text-xs px-2 py-1 rounded border ${milestoneStatusColors[milestone.status]}`}>
                    {milestone.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Due: {milestone.dueDate}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${milestone.completion}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-foreground">{milestone.completion}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Risks */}
      {data.topRisks && data.topRisks.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <AlertCircle className="h-4 w-4 text-chart-4" />
            Top Risks
          </h4>
          <div className="space-y-2">
            {data.topRisks.map((risk, idx) => (
              <div
                key={idx}
                className={`border-l-4 ${riskImpactColors[risk.impact]} rounded-r p-3 transition-all duration-200 hover:shadow-sm`}
              >
                <div className="flex items-start justify-between mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {risk.impact} Impact • {risk.probability} Probability
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground mb-1">{risk.description}</p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium">Mitigation:</span> {risk.mitigation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
