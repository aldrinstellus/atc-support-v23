import React from 'react';
import {
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  User,
  Mail,
  Phone,
  DollarSign,
  Tag,
  Activity,
  GitBranch,
  TrendingUp,
  TrendingDown,
  ArrowUpCircle,
  Building,
  FileText,
} from 'lucide-react';
import type { TicketDetailData } from '@/types/widget';

export function TicketDetailWidget({ data }: { data: TicketDetailData }) {
  const priorityColors = {
    critical: 'border-destructive/50 bg-red-500/20 text-destructive',
    high: 'border-chart-4/50 bg-amber-500/20 text-chart-4',
    medium: 'border-chart-3/50 bg-lime-500/20 text-chart-3',
    low: 'border-muted/50 bg-muted/20 text-muted-foreground',
  };

  const statusColors = {
    open: 'border-chart-3/50 bg-lime-500/20 text-chart-3',
    'in-progress': 'border-chart-4/50 bg-amber-500/20 text-chart-4',
    pending: 'border-chart-4/50 bg-amber-500/20 text-chart-4',
    resolved: 'border-success/50 bg-emerald-500/20 text-success',
    closed: 'border-muted/50 bg-muted/20 text-muted-foreground',
  };

  const slaStatusColors = {
    met: 'text-success',
    'at-risk': 'text-chart-4',
    breached: 'text-destructive',
  };

  const slaStatusIcons = {
    met: CheckCircle2,
    'at-risk': AlertCircle,
    breached: XCircle,
  };

  const riskLevelColors = {
    critical: 'border-destructive/50 bg-red-500/20 text-destructive',
    high: 'border-chart-4/50 bg-amber-500/20 text-chart-4',
    medium: 'border-chart-3/50 bg-lime-500/20 text-chart-3',
    low: 'border-success/50 bg-emerald-500/20 text-success',
  };

  const sentimentTrendIcons = {
    improving: TrendingUp,
    stable: Activity,
    declining: TrendingDown,
  };
  const SentimentTrendIcon = sentimentTrendIcons[data.aiInsights.sentiment.trend];

  return (
    <div className="space-y-6 my-4">
      {/* Header - Ticket ID & Status */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold font-mono text-primary">{data.ticketId}</h3>
            <span className={`text-xs font-semibold uppercase px-2 py-1 rounded border ${priorityColors[data.priority]}`}>
              {data.priority}
            </span>
            <span className={`text-xs font-semibold uppercase px-2 py-1 rounded border ${statusColors[data.status]}`}>
              {data.status.replace('-', ' ')}
            </span>
          </div>
          <h4 className="text-lg font-semibold text-foreground">{data.subject}</h4>
        </div>
      </div>

      {/* Customer Info Card */}
      <div className={`glass-card rounded-lg border-2 p-4 backdrop-blur-md ${riskLevelColors[data.customer.riskLevel]}`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary via-chart-2 to-primary shadow-md ring-2 ring-primary/30">
              <Building className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h5 className="text-base font-bold text-foreground">{data.customer.name}</h5>
              <p className="text-sm text-muted-foreground">{data.customer.plan} • {data.customer.id}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${data.customer.riskLevel === 'critical' ? 'text-destructive' : data.customer.riskLevel === 'high' ? 'text-chart-4' : 'text-success'}`}>
              {data.customer.riskScore}
            </div>
            <div className="text-xs text-muted-foreground uppercase">{data.customer.riskLevel} Risk</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-border/50">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <DollarSign className="h-3 w-3 text-success" />
              <span className="text-xs text-muted-foreground">ARR</span>
            </div>
            <div className="text-sm font-semibold text-foreground">{data.customer.arr}</div>
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              <User className="h-3 w-3 text-primary" />
              <span className="text-xs text-muted-foreground">Contact</span>
            </div>
            <div className="text-sm font-semibold text-foreground">{data.customer.contactName}</div>
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Mail className="h-3 w-3 text-chart-3" />
              <span className="text-xs text-muted-foreground">Email</span>
            </div>
            <div className="text-xs font-medium text-foreground truncate">{data.customer.contactEmail}</div>
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Phone className="h-3 w-3 text-chart-4" />
              <span className="text-xs text-muted-foreground">Phone</span>
            </div>
            <div className="text-xs font-medium text-foreground">{data.customer.contactPhone}</div>
          </div>
        </div>
      </div>

      {/* Metadata & SLA Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Metadata */}
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
          <h5 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <FileText className="h-4 w-4 text-primary" />
            Ticket Metadata
          </h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created:</span>
              <span className="font-medium text-foreground">{new Date(data.metadata.created).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">By:</span>
              <span className="font-medium text-foreground">{data.metadata.createdBy}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Assigned:</span>
              <span className="font-medium text-foreground">{data.metadata.assignedTo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Updated:</span>
              <span className="font-medium text-foreground">{new Date(data.metadata.lastUpdated).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Category:</span>
              <span className="font-medium text-foreground">{data.metadata.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Product:</span>
              <span className="font-medium text-foreground">{data.metadata.product}</span>
            </div>
          </div>
          {data.metadata.tags.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <div className="flex items-center gap-2 flex-wrap">
                {data.metadata.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SLA Tracking */}
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
          <h5 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <Clock className="h-4 w-4 text-primary" />
            SLA Tracking
          </h5>
          <div className="space-y-3">
            {/* Response Time */}
            <div className="p-3 rounded border border-border/50 bg-background/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">Response Time</span>
                {React.createElement(slaStatusIcons[data.sla.responseTime.status], {
                  className: `h-4 w-4 ${slaStatusColors[data.sla.responseTime.status]}`
                })}
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Target:</span>
                <span className="font-medium text-foreground">{data.sla.responseTime.target}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Actual:</span>
                <span className={`font-semibold ${slaStatusColors[data.sla.responseTime.status]}`}>
                  {data.sla.responseTime.actual}
                </span>
              </div>
            </div>

            {/* Resolution Time */}
            <div className="p-3 rounded border border-border/50 bg-background/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">Resolution Time</span>
                {React.createElement(slaStatusIcons[data.sla.resolutionTime.status], {
                  className: `h-4 w-4 ${slaStatusColors[data.sla.resolutionTime.status]}`
                })}
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Target:</span>
                <span className="font-medium text-foreground">{data.sla.resolutionTime.target}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Elapsed:</span>
                <span className={`font-semibold ${slaStatusColors[data.sla.resolutionTime.status]}`}>
                  {data.sla.resolutionTime.elapsed}
                </span>
              </div>
              {data.sla.resolutionTime.breachedBy && (
                <div className="mt-2 pt-2 border-t border-destructive/20">
                  <span className="text-xs font-semibold text-destructive">
                    Breached by {data.sla.resolutionTime.breachedBy}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
        <h5 className="text-sm font-semibold mb-3 text-foreground">Description</h5>
        <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">{data.description}</p>
      </div>

      {/* Timeline */}
      <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
        <h5 className="text-sm font-semibold mb-4 flex items-center gap-2 text-foreground">
          <Activity className="h-4 w-4 text-primary" />
          Activity Timeline
        </h5>
        <div className="space-y-4">
          {data.timeline.map((event, idx) => (
            <div key={idx} className="flex gap-3 pb-4 border-b border-border/50 last:border-0 last:pb-0">
              <div className="flex-shrink-0 mt-1">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{event.action}</span>
                    <span className="text-xs text-muted-foreground">{event.actor}</span>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(event.timestamp).toLocaleString()}
                  </span>
                </div>
                {event.content && (
                  <p className="text-sm text-foreground/80 mt-2 p-3 rounded bg-muted/30">
                    {event.content}
                  </p>
                )}
                {event.jiraTicket && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-chart-3">
                    <GitBranch className="h-3 w-3" />
                    <span>Linked to Jira: {event.jiraTicket}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Jira Integration */}
      {data.jiraIntegration && (
        <div className="glass-card rounded-lg border border-chart-3/30 bg-lime-500/20 p-4 backdrop-blur-md">
          <h5 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <GitBranch className="h-4 w-4 text-chart-3" />
            Jira Integration
          </h5>
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-sm font-mono font-semibold text-chart-3 mb-1">
                {data.jiraIntegration.linkedIssue}
              </div>
              <div className="text-sm text-foreground">{data.jiraIntegration.issueTitle}</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold text-chart-4">{data.jiraIntegration.status}</div>
              <div className="text-xs text-muted-foreground">{data.jiraIntegration.priority}</div>
            </div>
          </div>
          {data.jiraIntegration.comments.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border/50 space-y-2">
              <div className="text-xs font-medium text-muted-foreground mb-2">Recent Comments:</div>
              {data.jiraIntegration.comments.map((comment, idx) => (
                <div key={idx} className="text-xs p-2 rounded bg-background/50">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-foreground">{comment.author}</span>
                    <span className="text-muted-foreground">{new Date(comment.timestamp).toLocaleDateString()}</span>
                  </div>
                  <p className="text-muted-foreground">{comment.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* AI Sentiment Analysis */}
      <div className="glass-card rounded-lg border border-primary/30 bg-primary/20 p-4 backdrop-blur-md">
        <h5 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
          <Activity className="h-4 w-4 text-primary" />
          AI Sentiment Analysis
        </h5>
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Current Sentiment</div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground capitalize">{data.aiInsights.sentiment.current}</span>
              <SentimentTrendIcon className={`h-5 w-5 ${
                data.aiInsights.sentiment.trend === 'improving' ? 'text-success' :
                data.aiInsights.sentiment.trend === 'declining' ? 'text-destructive' :
                'text-muted-foreground'
              }`} />
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground mb-1">Sentiment Score</div>
            <div className={`text-2xl font-bold ${
              data.aiInsights.sentiment.score >= 70 ? 'text-success' :
              data.aiInsights.sentiment.score >= 40 ? 'text-chart-4' :
              'text-destructive'
            }`}>
              {data.aiInsights.sentiment.score}%
            </div>
          </div>
        </div>
        <p className="text-sm text-foreground/90">{data.aiInsights.sentiment.analysis}</p>
      </div>

      {/* Recommended Actions */}
      {data.aiInsights.recommendedActions.length > 0 && (
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
          <h5 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <ArrowUpCircle className="h-4 w-4 text-success" />
            Recommended Actions
          </h5>
          <div className="space-y-2">
            {data.aiInsights.recommendedActions.map((action, idx) => (
              <div
                key={idx}
                className={`p-3 rounded border ${
                  action.priority === 'critical' ? 'border-l-4 border-l-destructive bg-red-500/20' :
                  action.priority === 'high' ? 'border-l-4 border-l-chart-4 bg-amber-500/20' :
                  'border-l-4 border-l-chart-3 bg-lime-500/20'
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <span className="text-xs font-semibold uppercase text-muted-foreground">
                    {action.priority} Priority
                  </span>
                </div>
                <div className="text-sm font-semibold text-foreground mb-1">{action.action}</div>
                <div className="text-xs text-muted-foreground">{action.details}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Tickets */}
      {data.relatedTickets.length > 0 && (
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
          <h5 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <FileText className="h-4 w-4 text-primary" />
            Related Tickets
          </h5>
          <div className="space-y-2">
            {data.relatedTickets.map((ticket, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono font-semibold text-primary">{ticket.id}</span>
                  <span className="text-sm text-foreground truncate">{ticket.subject}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    ticket.priority === 'critical' ? 'bg-red-500/20 text-destructive' :
                    ticket.priority === 'high' ? 'bg-amber-500/20 text-chart-4' :
                    'bg-lime-500/20 text-chart-3'
                  }`}>
                    {ticket.priority}
                  </span>
                  <span className="text-xs text-muted-foreground">{ticket.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
