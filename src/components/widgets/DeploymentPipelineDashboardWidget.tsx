import {
  Rocket,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  Activity
} from 'lucide-react';
import type { DeploymentPipelineData } from '@/types/widget';

export function DeploymentPipelineDashboardWidget({ data }: { data: DeploymentPipelineData }) {
  // Defensive check
  if (!data || typeof data !== 'object') {
    return (
      <div className="my-4 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
        <p className="text-sm text-destructive">Unable to load deployment pipeline data</p>
      </div>
    );
  }

  const pipelineStatusColors = {
    passing: 'bg-emerald-500/20 text-success border-success/50',
    failing: 'bg-red-500/20 text-destructive border-destructive/50',
    running: 'bg-lime-500/20 text-chart-3 border-chart-3/50',
  };

  const stageStatusIcons = {
    passed: <CheckCircle2 className="h-5 w-5 text-success" />,
    failed: <XCircle className="h-5 w-5 text-destructive" />,
    running: <Activity className="h-5 w-5 text-chart-3 animate-pulse" />,
    pending: <Clock className="h-5 w-5 text-muted-foreground" />,
  };

  const stageStatusColors = {
    passed: 'border-success/30 bg-emerald-500/20',
    failed: 'border-destructive/30 bg-red-500/20',
    running: 'border-chart-3/30 bg-lime-500/20',
    pending: 'border-border bg-card/50',
  };

  const deploymentStatusColors = {
    success: 'bg-emerald-500/20 text-success border-success/30',
    failed: 'bg-red-500/20 text-destructive border-destructive/30',
    'rolled-back': 'bg-amber-500/20 text-chart-4 border-chart-4/30',
  };

  const environmentBadges: Record<string, string> = {
    production: 'bg-red-500/20 text-destructive border-destructive/30',
    staging: 'bg-lime-500/20 text-chart-3 border-chart-3/30',
    development: 'bg-chart-1/20 text-chart-1 border-chart-1/30',
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6 my-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Rocket className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded border ${environmentBadges[data.pipeline.environment]}`}>
              {data.pipeline.environment}
            </span>
            <span className="text-xs text-muted-foreground">
              Last deployment: {data.pipeline.lastDeployment}
            </span>
          </div>
        </div>
        <span className={`px-3 py-2 rounded-lg border ${pipelineStatusColors[data.pipeline.status]}`}>
          <span className="text-sm font-semibold uppercase tracking-wide">{data.pipeline.status}</span>
        </span>
      </div>

      {/* Pipeline Stages */}
      {data.stages && data.stages.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-3 text-foreground">Pipeline Stages</h4>
          <div className="space-y-3">
            {data.stages.map((stage, idx) => (
              <div key={idx} className={`rounded-lg border p-4 ${stageStatusColors[stage.status]} transition-all duration-200`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {stageStatusIcons[stage.status]}
                    <div>
                      <p className="text-sm font-semibold text-foreground">{stage.name}</p>
                      {stage.startTime && (
                        <p className="text-xs text-muted-foreground">Started: {stage.startTime}</p>
                      )}
                    </div>
                  </div>
                  {stage.duration && (
                    <span className="text-xs font-medium text-foreground">{stage.duration}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-lg border border-border bg-card/50 p-3">
          <TrendingUp className="h-4 w-4 text-primary mb-2" />
          <div className="text-2xl font-bold text-foreground mb-1">{data.deploymentFrequency.thisWeek}</div>
          <p className="text-xs text-muted-foreground">Deployments This Week</p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-3">
          <Clock className="h-4 w-4 text-primary mb-2" />
          <div className="text-2xl font-bold text-foreground mb-1">{data.metrics.leadTime}</div>
          <p className="text-xs text-muted-foreground">Lead Time</p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-3">
          <CheckCircle2 className="h-4 w-4 text-success mb-2" />
          <div className="text-2xl font-bold text-success mb-1">{data.metrics.deploymentSuccess}%</div>
          <p className="text-xs text-muted-foreground">Success Rate</p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-3">
          <Activity className="h-4 w-4 text-primary mb-2" />
          <div className="text-2xl font-bold text-foreground mb-1">{data.metrics.mttr}</div>
          <p className="text-xs text-muted-foreground">MTTR</p>
        </div>
      </div>

      {/* Recent Deployments */}
      {data.recentDeployments && data.recentDeployments.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-3 text-foreground">
            Recent Deployments ({data.recentDeployments.length})
          </h4>
          <div className="space-y-2">
            {data.recentDeployments.map((deployment, idx) => (
              <div key={idx} className="rounded-lg border border-border bg-card/50 p-3 transition-all duration-200 hover:shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-foreground">{deployment.version}</span>
                    <span className={`text-xs px-2 py-0.5 rounded border ${environmentBadges[deployment.environment]}`}>
                      {deployment.environment}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded border ${deploymentStatusColors[deployment.status]}`}>
                      {deployment.status}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{deployment.timestamp}</span>
                </div>
                <p className="text-xs text-muted-foreground">Deployed by {deployment.deployedBy}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
