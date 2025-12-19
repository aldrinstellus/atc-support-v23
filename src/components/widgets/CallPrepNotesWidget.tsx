import {
  Phone,
  User,
  Clock,
  Users,
  FileText,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Minus,
  Target,
  MessageSquare,
  Lightbulb,
} from 'lucide-react';
import type { CallPrepNotesData } from '@/types/widget';

export function CallPrepNotesWidget({ data }: { data: CallPrepNotesData }) {
  const riskLevelColors = {
    critical: 'text-destructive',
    high: 'text-chart-4',
    medium: 'text-chart-3',
    low: 'text-success',
  };

  const priorityColors = {
    high: 'border-destructive/30 bg-red-500/20',
    medium: 'border-chart-4/30 bg-amber-500/20',
    low: 'border-chart-3/30 bg-lime-500/20',
  };

  const callTypeLabels = {
    'support-call': 'Support Call',
    'escalation': 'Escalation',
    'follow-up': 'Follow-up',
    'onboarding': 'Onboarding',
    'renewal': 'Renewal Discussion',
  };

  const trendIcons = {
    improving: TrendingUp,
    stable: Minus,
    declining: TrendingDown,
  };

  const trendColors = {
    improving: 'text-success',
    stable: 'text-muted-foreground',
    declining: 'text-destructive',
  };

  const TrendIcon = trendIcons[data.context.sentiment.trend];

  return (
    <div className="space-y-6 my-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
          <p className="text-sm text-muted-foreground">
            Call preparation guide and talking points
          </p>
        </div>
      </div>

      {/* Customer Info Card */}
      <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h4 className="text-base font-semibold text-foreground">
                {data.customer.name}
              </h4>
              <span
                className={`text-xs font-semibold uppercase px-2 py-1 rounded ${riskLevelColors[data.customer.riskLevel]} border ${
                  data.customer.riskLevel === 'critical'
                    ? 'border-destructive'
                    : data.customer.riskLevel === 'high'
                    ? 'border-chart-4'
                    : data.customer.riskLevel === 'medium'
                    ? 'border-chart-3'
                    : 'border-success'
                }`}
              >
                {data.customer.riskLevel} Risk
              </span>
            </div>
            <div className="text-xs text-muted-foreground mb-2">
              {data.customer.id} • {data.customer.plan} • ARR: {data.customer.arr}
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className={`text-3xl font-bold ${riskLevelColors[data.customer.riskLevel]}`}>
              {data.customer.riskScore}
            </div>
            <div className="text-xs text-muted-foreground">Risk Score</div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-border/50">
          <div className="flex items-start gap-2">
            <User className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs text-muted-foreground">Contact Person</div>
              <div className="text-sm font-medium text-foreground">
                {data.customer.contactPerson}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MessageSquare className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs text-muted-foreground">Email</div>
              <div className="text-sm font-medium text-foreground">
                {data.customer.contactEmail}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Phone className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs text-muted-foreground">Phone</div>
              <div className="text-sm font-medium text-foreground">
                {data.customer.contactPhone}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call Details */}
      <div className="glass-card rounded-lg border border-primary/30 bg-primary/20 p-4 backdrop-blur-md">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
          <Phone className="h-4 w-4 text-primary" />
          Call Details
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-xs text-muted-foreground mb-1">Purpose</div>
              <div className="text-sm font-medium text-foreground">
                {data.callDetails.purpose}
              </div>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-medium">
              {callTypeLabels[data.callDetails.type]}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border/50">
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-chart-3 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-muted-foreground">Scheduled Time</div>
                <div className="text-sm font-medium text-foreground">
                  {data.callDetails.scheduledTime}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Target className="h-4 w-4 text-chart-3 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-muted-foreground">Duration</div>
                <div className="text-sm font-medium text-foreground">
                  {data.callDetails.duration}
                </div>
              </div>
            </div>
          </div>

          {data.callDetails.attendees && data.callDetails.attendees.length > 0 && (
            <div className="pt-3 border-t border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-chart-3" />
                <span className="text-xs text-muted-foreground">Attendees</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.callDetails.attendees.map((attendee, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 rounded-full bg-muted text-foreground"
                  >
                    {attendee}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Context Section */}
      <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
          <FileText className="h-4 w-4 text-primary" />
          Context & Background
        </h4>

        {/* Account Health */}
        <div className="mb-4 pb-4 border-b border-border/50">
          <div className="text-xs font-medium text-muted-foreground mb-2">Account Health</div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div>
              <div className="text-xs text-muted-foreground">Open Tickets</div>
              <div className="text-lg font-semibold text-foreground">
                {data.context.accountHealth.openTickets}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Critical</div>
              <div className="text-lg font-semibold text-destructive">
                {data.context.accountHealth.criticalTickets}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Avg Response</div>
              <div className="text-sm font-semibold text-foreground">
                {data.context.accountHealth.avgResponseTime}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">SLA</div>
              <div
                className={`text-lg font-semibold ${
                  data.context.accountHealth.slaCompliance >= 90
                    ? 'text-success'
                    : data.context.accountHealth.slaCompliance >= 75
                    ? 'text-chart-4'
                    : 'text-destructive'
                }`}
              >
                {data.context.accountHealth.slaCompliance}%
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Last Contact</div>
              <div className="text-sm font-semibold text-foreground">
                {data.context.accountHealth.lastContact}
              </div>
            </div>
          </div>
        </div>

        {/* Sentiment */}
        <div className="mb-4 pb-4 border-b border-border/50">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-medium text-muted-foreground">Customer Sentiment</div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground capitalize">
                {data.context.sentiment.current}
              </span>
              <TrendIcon className={`h-4 w-4 ${trendColors[data.context.sentiment.trend]}`} />
            </div>
          </div>
          {data.context.sentiment.recentFeedback && (
            <p className="text-xs text-muted-foreground italic">
              &quot;{data.context.sentiment.recentFeedback}&quot;
            </p>
          )}
        </div>

        {/* Recent Tickets */}
        {data.context.recentTickets && data.context.recentTickets.length > 0 && (
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-2">Recent Tickets</div>
            <div className="space-y-2">
              {data.context.recentTickets.map((ticket, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded bg-muted/50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-primary font-semibold">
                        {ticket.id}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          ticket.priority === 'critical'
                            ? 'bg-destructive/20 text-destructive'
                            : ticket.priority === 'high'
                            ? 'bg-chart-4/20 text-chart-4'
                            : 'bg-chart-3/20 text-chart-3'
                        }`}
                      >
                        {ticket.priority}
                      </span>
                    </div>
                    <div className="text-xs text-foreground">{ticket.subject}</div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <div className="text-xs text-muted-foreground">{ticket.status}</div>
                    <div className="text-xs text-muted-foreground">{ticket.created}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Talking Points */}
      {data.talkingPoints && data.talkingPoints.length > 0 && (
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <MessageSquare className="h-4 w-4 text-primary" />
            Key Talking Points
          </h4>
          <div className="space-y-3">
            {data.talkingPoints.map((point, idx) => (
              <div
                key={idx}
                className={`border-l-4 rounded-r p-3 ${priorityColors[point.priority]}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <h5 className="text-sm font-semibold text-foreground">{point.topic}</h5>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full uppercase font-medium ${
                      point.priority === 'high'
                        ? 'bg-destructive/20 text-destructive'
                        : point.priority === 'medium'
                        ? 'bg-chart-4/20 text-chart-4'
                        : 'bg-chart-3/20 text-chart-3'
                    }`}
                  >
                    {point.priority}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{point.description}</p>
                <div className="pt-2 border-t border-border/50">
                  <div className="text-xs text-muted-foreground mb-1">Suggested Approach:</div>
                  <p className="text-xs text-foreground/90">{point.suggestedApproach}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Potential Objections */}
      {data.potentialObjections && data.potentialObjections.length > 0 && (
        <div className="glass-card rounded-lg border border-chart-4/30 bg-amber-500/20 p-4 backdrop-blur-md">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <AlertCircle className="h-4 w-4 text-chart-4" />
            Potential Objections & Responses
          </h4>
          <div className="space-y-3">
            {data.potentialObjections.map((item, idx) => (
              <div key={idx} className="border border-border/50 rounded-lg p-3 bg-card/50">
                <div className="mb-2">
                  <div className="text-xs text-muted-foreground mb-1">Objection:</div>
                  <p className="text-sm font-medium text-foreground">{item.objection}</p>
                </div>
                <div className="pt-2 border-t border-border/50">
                  <div className="text-xs text-muted-foreground mb-1">Suggested Response:</div>
                  <p className="text-xs text-foreground/90">{item.response}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Success Criteria */}
      {data.successCriteria && data.successCriteria.length > 0 && (
        <div className="glass-card rounded-lg border border-success/30 bg-emerald-500/20 p-4 backdrop-blur-md">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <CheckCircle2 className="h-4 w-4 text-success" />
            Success Criteria
          </h4>
          <div className="space-y-2">
            {data.successCriteria.map((criterion, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/90">{criterion}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Recommendations */}
      {data.aiRecommendations && data.aiRecommendations.length > 0 && (
        <div className="glass-card rounded-lg border border-primary/30 bg-primary/20 p-4 backdrop-blur-md">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <Lightbulb className="h-4 w-4 text-primary" />
            AI Recommendations
          </h4>
          <div className="space-y-3">
            {data.aiRecommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-medium capitalize flex-shrink-0">
                  {rec.type}
                </span>
                <p className="text-sm text-foreground/90 flex-1">{rec.recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
