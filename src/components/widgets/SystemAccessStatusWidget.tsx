import { CheckCircle2, XCircle, AlertTriangle, Wrench, Server, Clock } from 'lucide-react';
import type { SystemAccessStatusData } from '@/types/widget';

export function SystemAccessStatusWidget({ data }: { data: SystemAccessStatusData }) {
  const statusConfig = {
    working: {
      icon: CheckCircle2,
      color: 'text-success',
      bg: 'bg-emerald-500/20',
      border: 'border-success/30',
      label: 'WORKING',
    },
    fixed: {
      icon: CheckCircle2,
      color: 'text-success',
      bg: 'bg-emerald-500/20',
      border: 'border-success/30',
      label: 'FIXED',
    },
    degraded: {
      icon: AlertTriangle,
      color: 'text-chart-4',
      bg: 'bg-amber-500/20',
      border: 'border-chart-4/30',
      label: 'DEGRADED',
    },
    down: {
      icon: XCircle,
      color: 'text-destructive',
      bg: 'bg-red-500/20',
      border: 'border-destructive/30',
      label: 'DOWN',
    },
  };

  const resolutionConfig = {
    'fully-resolved': {
      color: 'text-success',
      bg: 'bg-emerald-500/20',
      border: 'border-success/30',
      icon: CheckCircle2,
      label: '✓ TICKET RESOLVED BY AI',
    },
    'partially-resolved': {
      color: 'text-chart-4',
      bg: 'bg-amber-500/20',
      border: 'border-chart-4/30',
      icon: AlertTriangle,
      label: '⚠ PARTIALLY RESOLVED - MANUAL ACTION NEEDED',
    },
    'escalation-needed': {
      color: 'text-destructive',
      bg: 'bg-red-500/20',
      border: 'border-destructive/30',
      icon: XCircle,
      label: '❌ ESCALATION REQUIRED',
    },
  };

  const resolution = resolutionConfig[data.overallResolution];

  return (
    <div className="rounded-lg border border-border bg-card p-6 my-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Server className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">System Access Check</h3>
        </div>
        <div className="text-sm text-muted-foreground space-y-1">
          <div>
            Ticket: <span className="font-medium text-foreground">{data.ticketId}</span>
            {' • '}
            Customer: <span className="font-medium text-foreground">{data.customer}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            <span>{data.timestamp}</span>
          </div>
          <div className="mt-2 text-foreground">
            Issue Reported: <span className="italic">&quot;{data.issueReported}&quot;</span>
          </div>
        </div>
      </div>

      {/* System Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {data.systemChecks.map((system, index) => {
          const config = statusConfig[system.status];
          const StatusIcon = config.icon;

          return (
            <div
              key={index}
              className={`rounded-lg border ${config.border} ${config.bg} p-4 transition-all hover:shadow-md`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-foreground">{system.systemName}</h4>
                <StatusIcon className={`h-5 w-5 ${config.color}`} />
              </div>
              <div
                className={`inline-block text-xs px-2 py-1 rounded-full uppercase font-medium ${config.color} ${config.bg} border ${config.border} mb-3`}
              >
                {config.label}
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Issue:</span>
                  <div className="text-foreground mt-1">{system.issue}</div>
                </div>
                {system.aiAction && (
                  <div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Wrench className="h-3 w-3" />
                      <span>AI Action:</span>
                    </div>
                    <div className="text-foreground mt-1">{system.aiAction}</div>
                  </div>
                )}
                {system.details && (
                  <div className="text-xs text-muted-foreground pt-2 border-t border-border/50">
                    {system.details}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Automated Actions Summary */}
      {data.automatedActions.length > 0 && (
        <div className="mb-6 rounded-lg border border-primary/30 bg-primary/20 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Wrench className="h-4 w-4 text-primary" />
            <h4 className="font-semibold text-foreground">Automated Actions Performed</h4>
          </div>
          <ul className="space-y-2">
            {data.automatedActions.map((action, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Manual Actions Needed (if any) */}
      {data.manualActionsNeeded && data.manualActionsNeeded.length > 0 && (
        <div className="mb-6 rounded-lg border border-chart-4/30 bg-amber-500/20 p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-chart-4" />
            <h4 className="font-semibold text-foreground">Manual Actions Required</h4>
          </div>
          <ul className="space-y-2">
            {data.manualActionsNeeded.map((action, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <AlertTriangle className="h-4 w-4 text-chart-4 mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Resolution Status */}
      <div className={`rounded-lg border ${resolution.border} ${resolution.bg} p-4`}>
        <div className="flex items-center gap-3 mb-2">
          <resolution.icon className={`h-5 w-5 ${resolution.color}`} />
          <h4 className={`font-bold ${resolution.color}`}>{resolution.label}</h4>
        </div>
        <p className="text-sm text-foreground">{data.resolutionMessage}</p>
      </div>
    </div>
  );
}
