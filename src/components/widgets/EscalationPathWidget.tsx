import { GitBranch, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface EscalationPathData {
  ticketId: string;
  currentStage: number;
  stages: Array<{
    level: string;
    assignee: string;
    status: 'completed' | 'current' | 'pending';
    timestamp?: string;
    duration?: string;
    notes?: string;
  }>;
  recommendedAction?: string;
}

export function EscalationPathWidget({ data }: { data: EscalationPathData }) {
  const statusConfig = {
    completed: {
      icon: CheckCircle2,
      color: 'text-success',
      bg: 'bg-emerald-500/20',
      border: 'border-success/30',
    },
    current: {
      icon: Clock,
      color: 'text-chart-4',
      bg: 'bg-amber-500/20',
      border: 'border-chart-4/30',
    },
    pending: {
      icon: AlertCircle,
      color: 'text-muted-foreground',
      bg: 'bg-muted',
      border: 'border-muted',
    },
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6 my-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <GitBranch className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Escalation Path</h3>
      </div>

      <div className="space-y-6">
        <div className="text-sm text-muted-foreground">
          Ticket: <span className="font-medium text-foreground">{data.ticketId}</span>
        </div>

        {/* Escalation stages */}
        <div className="relative">
          {data.stages.map((stage, index) => {
            const config = statusConfig[stage.status];
            const Icon = config.icon;
            const isLast = index === data.stages.length - 1;

            return (
              <div key={index} className="relative flex gap-4">
                {/* Timeline line */}
                {!isLast && (
                  <div className="absolute left-4 top-10 w-[2px] h-[calc(100%+8px)] bg-border" />
                )}

                {/* Icon */}
                <div
                  className={`relative w-9 h-9 rounded-full ${config.bg} border ${config.border} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </div>

                {/* Content */}
                <div className={`flex-1 pb-8 ${isLast ? 'pb-0' : ''}`}>
                  <div className="flex items-start justify-between mb-1">
                    <div className="font-semibold text-foreground">{stage.level}</div>
                    {stage.timestamp && (
                      <div className="text-xs text-muted-foreground">
                        {stage.timestamp}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {stage.assignee}
                  </div>
                  {stage.duration && (
                    <div className="text-xs text-muted-foreground">
                      Duration: {stage.duration}
                    </div>
                  )}
                  {stage.notes && (
                    <div className="mt-2 text-sm bg-muted p-3 rounded-lg text-foreground">
                      {stage.notes}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Recommended action */}
        {data.recommendedAction && (
          <div className="bg-primary/20 border border-primary/30 rounded-lg p-4">
            <div className="text-xs text-primary uppercase font-medium mb-2">
              Recommended Action
            </div>
            <div className="text-sm text-foreground">{data.recommendedAction}</div>
          </div>
        )}
      </div>
    </div>
  );
}
