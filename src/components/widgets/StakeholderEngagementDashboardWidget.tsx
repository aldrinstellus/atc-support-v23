import {
  Users,
  MessageSquare,
  Calendar,
  CheckCircle2,
  Clock
} from 'lucide-react';
import type { StakeholderEngagementData } from '@/types/widget';

export function StakeholderEngagementDashboardWidget({ data }: { data: StakeholderEngagementData }) {
  // Defensive check
  if (!data || typeof data !== 'object') {
    return (
      <div className="my-4 rounded-lg border border-destructive/30 bg-red-500/20 p-4">
        <p className="text-sm text-destructive">Unable to load stakeholder engagement data</p>
      </div>
    );
  }

  const engagementColors = {
    high: 'bg-success/20 text-success border-success/50',
    medium: 'bg-chart-3/20 text-chart-3 border-chart-3/50',
    low: 'bg-chart-4/20 text-chart-4 border-chart-4/50',
  };

  const sentimentColors = {
    positive: 'text-success',
    neutral: 'text-chart-3',
    negative: 'text-destructive',
  };

  const actionStatusColors = {
    pending: 'bg-muted text-muted-foreground border-muted-foreground/30',
    'in-progress': 'bg-lime-500/20 text-chart-3 border-chart-3/30',
    completed: 'bg-emerald-500/20 text-success border-success/30',
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6 my-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
        </div>
      </div>

      {/* Communication Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="rounded-lg border border-border bg-card/50 p-4">
          <MessageSquare className="h-5 w-5 text-primary mb-2" />
          <div className="text-2xl font-bold text-foreground mb-1">{data.communications.thisWeek}</div>
          <p className="text-xs text-muted-foreground">Communications This Week</p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-4">
          <MessageSquare className="h-5 w-5 text-primary mb-2" />
          <div className="text-2xl font-bold text-foreground mb-1">{data.communications.thisMonth}</div>
          <p className="text-xs text-muted-foreground">Communications This Month</p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-4">
          <Clock className="h-5 w-5 text-primary mb-2" />
          <div className="text-2xl font-bold text-foreground mb-1">{data.communications.avgResponseTime}</div>
          <p className="text-xs text-muted-foreground">Avg Response Time</p>
        </div>
      </div>

      {/* Stakeholders */}
      {data.stakeholders && data.stakeholders.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <Users className="h-4 w-4 text-primary" />
            Key Stakeholders ({data.stakeholders.length})
          </h4>
          <div className="space-y-3">
            {data.stakeholders.map((stakeholder, idx) => (
              <div key={idx} className="rounded-lg border border-border bg-card/50 p-4 transition-all duration-200 hover:shadow-md">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{stakeholder.name}</p>
                    <p className="text-xs text-muted-foreground">{stakeholder.role} • {stakeholder.organization}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs px-2 py-1 rounded border ${engagementColors[stakeholder.engagementLevel]}`}>
                      {stakeholder.engagementLevel} engagement
                    </span>
                    <span className={`text-xs font-medium ${sentimentColors[stakeholder.sentiment]}`}>
                      {stakeholder.sentiment}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Last Contact</p>
                    <p className="text-xs font-medium text-foreground">{stakeholder.lastContact}</p>
                  </div>
                  {stakeholder.nextMeeting && (
                    <div>
                      <p className="text-xs text-muted-foreground">Next Meeting</p>
                      <p className="text-xs font-medium text-foreground">{stakeholder.nextMeeting}</p>
                    </div>
                  )}
                </div>

                {stakeholder.primaryInterests && stakeholder.primaryInterests.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Primary Interests:</p>
                    <div className="flex flex-wrap gap-1">
                      {stakeholder.primaryInterests.map((interest, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded bg-muted text-foreground">
                          {interest}
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

      {/* Upcoming Meetings */}
      {data.upcomingMeetings && data.upcomingMeetings.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            Upcoming Meetings ({data.upcomingMeetings.length})
          </h4>
          <div className="space-y-2">
            {data.upcomingMeetings.map((meeting, idx) => (
              <div key={idx} className="rounded-lg border border-border bg-card/50 p-3">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-medium text-foreground">{meeting.title}</p>
                  <span className="text-xs text-muted-foreground">{meeting.date}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  Attendees: {meeting.attendees.join(', ')}
                </p>
                {meeting.agenda && meeting.agenda.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-foreground/80 mb-1">Agenda:</p>
                    <ul className="space-y-1">
                      {meeting.agenda.map((item, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-1">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Items */}
      {data.actionItems && data.actionItems.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            Action Items ({data.actionItems.length})
          </h4>
          <div className="space-y-2">
            {data.actionItems.map((item, idx) => (
              <div key={idx} className="rounded-lg border border-border bg-card/50 p-3 transition-all duration-200 hover:shadow-sm">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-sm text-foreground">{item.action}</p>
                  <span className={`text-xs px-2 py-1 rounded border ${actionStatusColors[item.status]}`}>
                    {item.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{item.stakeholder}</span>
                  <span>Due: {item.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
