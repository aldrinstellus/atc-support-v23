import {
  AlertCircle,
  Clock,
  TrendingUp,
  Calendar,
  Sparkles,
  Target,
  Bell,
} from 'lucide-react';
import type { AgentDashboardData } from '@/types/widget';

export function AgentDashboardWidget({ data }: { data: AgentDashboardData }) {
  const severityColors = {
    high: 'border-destructive/30 bg-destructive/5',
    medium: 'border-chart-4/30 bg-chart-4/5',
    low: 'border-chart-3/30 bg-chart-3/5',
  };

  const severityTextColors = {
    high: 'text-destructive',
    medium: 'text-chart-4',
    low: 'text-chart-3',
  };

  return (
    <div className="space-y-6 my-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
          <p className="text-sm text-muted-foreground">
            {data.date}
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">Total Tickets</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{data.summary.totalTickets}</div>
        </div>

        <div className="glass-card rounded-lg border border-destructive/30 bg-destructive/5 p-4 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <span className="text-xs font-medium text-muted-foreground">Critical</span>
          </div>
          <div className="text-2xl font-bold text-destructive">{data.summary.critical}</div>
        </div>

        <div className="glass-card rounded-lg border border-chart-4/30 bg-chart-4/5 p-4 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-chart-4" />
            <span className="text-xs font-medium text-muted-foreground">Due Soon</span>
          </div>
          <div className="text-2xl font-bold text-chart-4">{data.summary.dueSoon}</div>
        </div>

        <div className="glass-card rounded-lg border border-chart-3/30 bg-chart-3/5 p-4 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="h-4 w-4 text-chart-3" />
            <span className="text-xs font-medium text-muted-foreground">Needs Response</span>
          </div>
          <div className="text-2xl font-bold text-chart-3">{data.summary.needsResponse}</div>
        </div>
      </div>

      {/* Performance Snapshot - MOVED AFTER SUMMARY CARDS */}
      <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
          <TrendingUp className="h-4 w-4 text-success" />
          Your Performance This Week
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Resolved Today</div>
            <div className="text-lg font-bold text-foreground">
              {data.performanceSnapshot.ticketsResolvedToday}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Resolved This Week</div>
            <div className="text-lg font-bold text-foreground">
              {data.performanceSnapshot.ticketsResolvedThisWeek}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Avg Response</div>
            <div className="text-lg font-bold text-foreground">
              {data.performanceSnapshot.avgResponseTime}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Satisfaction</div>
            <div className="text-lg font-bold text-success">
              {data.performanceSnapshot.customerSatisfaction.toFixed(1)}/5.0
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Compliance</div>
            <div className="text-lg font-bold text-success">
              {data.performanceSnapshot.slaCompliance}%
            </div>
          </div>
        </div>
      </div>

      {/* Priority Alerts */}
      {data.priorities.length > 0 && (
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <AlertCircle className="h-4 w-4 text-destructive" />
            Priority Alerts
          </h4>
          <div className="space-y-3">
            {data.priorities.map((priority, idx) => (
              <div
                key={idx}
                className={`border-l-4 ${severityColors[priority.severity]} rounded-r p-3`}
              >
                <div className="flex items-start justify-between mb-1">
                  <span className={`text-sm font-medium ${severityTextColors[priority.severity]}`}>
                    {priority.message}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{priority.tickets.length} ticket{priority.tickets.length !== 1 ? 's' : ''}</span>
                  <span>•</span>
                  <span className="font-mono">{priority.tickets.join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Suggestions */}
      {data.aiSuggestions.length > 0 && (
        <div className="glass-card rounded-lg border border-primary/30 bg-primary/5 p-4 backdrop-blur-md">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            AI Suggestions
          </h4>
          <div className="space-y-2">
            {data.aiSuggestions.map((suggestion, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-sm text-foreground/90">{suggestion.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Meetings */}
      {data.upcomingMeetings.length > 0 && (
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <Calendar className="h-4 w-4 text-chart-3" />
            Today&apos;s Meetings
          </h4>
          <div className="space-y-3">
            {data.upcomingMeetings.map((meeting, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 pb-3 border-b border-border/50 last:border-0 last:pb-0"
              >
                <div className="flex-shrink-0 w-12 text-center">
                  <div className="text-sm font-bold text-foreground">{meeting.time}</div>
                  <div className="text-xs text-muted-foreground">{meeting.duration}</div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground mb-1">{meeting.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {meeting.attendees.join(', ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
