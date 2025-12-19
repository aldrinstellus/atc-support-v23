import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import type { TicketListData } from '@/types/widget';

export function TicketListWidget({ data }: { data: TicketListData }) {
  const priorityColors = {
    critical: 'border-destructive/30 bg-red-500/20 text-destructive',
    high: 'border-chart-4/30 bg-amber-500/20 text-chart-4',
    medium: 'border-chart-3/30 bg-lime-500/20 text-chart-3',
    low: 'border-muted/50 bg-muted/20 text-muted-foreground',
  };

  const slaStatusIcons = {
    'on-track': CheckCircle2,
    'at-risk': AlertTriangle,
    'breached': XCircle,
  };

  const slaStatusColors = {
    'on-track': 'text-success',
    'at-risk': 'text-chart-4',
    'breached': 'text-destructive',
  };

  const riskBadgeColors = {
    critical: 'bg-red-500/20 text-destructive border-destructive/30',
    high: 'bg-amber-500/20 text-chart-4 border-chart-4/30',
    medium: 'bg-lime-500/20 text-chart-3 border-chart-3/30',
    low: 'bg-muted text-muted-foreground border-muted',
  };

  return (
    <div className="space-y-4 my-4">
      {/* Header with Summary */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
          <p className="text-sm text-muted-foreground">{data.count} tickets</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-destructive">{data.summary.critical}</div>
                <div className="text-xs text-muted-foreground">Critical</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-chart-4">{data.summary.high}</div>
                <div className="text-xs text-muted-foreground">High</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-chart-3">{data.summary.medium}</div>
                <div className="text-xs text-muted-foreground">Medium</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SLA Summary Bar */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card rounded-lg border border-destructive/30 bg-red-500/20 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Breached</span>
            <span className="text-xl font-bold text-destructive">{data.summary.breached}</span>
          </div>
        </div>
        <div className="glass-card rounded-lg border border-chart-4/30 bg-amber-500/20 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">At Risk</span>
            <span className="text-xl font-bold text-chart-4">{data.summary.atRisk}</span>
          </div>
        </div>
        <div className="glass-card rounded-lg border border-success/30 bg-emerald-500/20 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">On Track</span>
            <span className="text-xl font-bold text-success">{data.summary.onTrack}</span>
          </div>
        </div>
      </div>

      {/* Ticket List */}
      <div className="space-y-2">
        {data.tickets.map((ticket) => {
          const SLAIcon = slaStatusIcons[ticket.slaStatus];

          return (
            <div
              key={ticket.id}
              className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                {/* Priority Badge */}
                <div className={`flex-shrink-0 w-1 h-full rounded-full ${ticket.priority === 'critical' ? 'bg-destructive' : ticket.priority === 'high' ? 'bg-chart-4' : ticket.priority === 'medium' ? 'bg-chart-3' : 'bg-muted-foreground'}`}></div>

                <div className="flex-1 min-w-0">
                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm font-mono font-semibold text-primary">
                        {ticket.id}
                      </span>
                      <span className={`text-xs font-semibold uppercase px-2 py-0.5 rounded border ${priorityColors[ticket.priority]}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <SLAIcon className={`h-4 w-4 ${slaStatusColors[ticket.slaStatus]}`} />
                      <span className={`text-xs font-medium ${slaStatusColors[ticket.slaStatus]}`}>
                        {ticket.slaStatus === 'breached' && `Breached by ${ticket.slaBreachedBy}`}
                        {ticket.slaStatus === 'at-risk' && `Due in ${ticket.slaRemaining}`}
                        {ticket.slaStatus === 'on-track' && 'On track'}
                      </span>
                    </div>
                  </div>

                  {/* Subject */}
                  <h4 className="text-sm font-medium text-foreground mb-2 line-clamp-1">
                    {ticket.subject}
                  </h4>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-foreground">{ticket.customer}</span>
                      {ticket.customerRisk !== 'low' && (
                        <span className={`px-1.5 py-0.5 rounded text-xs font-medium border ${riskBadgeColors[ticket.customerRisk]}`}>
                          {ticket.customerRisk} risk
                        </span>
                      )}
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {ticket.ageInDays} {ticket.ageInDays === 1 ? 'day' : 'days'} old
                    </div>
                    <span>•</span>
                    <span>Updated by {ticket.lastUpdateBy}</span>
                  </div>

                  {/* Tags */}
                  {ticket.tags.length > 0 && (
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {ticket.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
