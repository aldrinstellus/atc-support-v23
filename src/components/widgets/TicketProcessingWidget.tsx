/**
 * Ticket Processing Widget
 * Real-time display of Zoho ticket processing status
 */

import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
  FileText,
  Brain,
  Search,
  MessageSquare,
  Send,
  AlertTriangle,
  ExternalLink,
  TrendingUp,
} from 'lucide-react';
import type { TicketProcessingData } from '@/types/widget';

export function TicketProcessingWidget({ data }: { data: TicketProcessingData }) {
  // Status configuration
  const statusConfig = {
    extracting: { icon: FileText, color: 'text-chart-3', label: 'Extracting Information' },
    classifying: { icon: Brain, color: 'text-chart-3', label: 'Classifying Ticket' },
    searching: { icon: Search, color: 'text-chart-3', label: 'Searching Knowledge Base' },
    generating: { icon: MessageSquare, color: 'text-chart-3', label: 'Generating Response' },
    replying: { icon: Send, color: 'text-chart-3', label: 'Sending Reply' },
    escalating: { icon: TrendingUp, color: 'text-chart-4', label: 'Creating Jira Ticket' },
    completed: { icon: CheckCircle2, color: 'text-success', label: 'Processing Complete' },
    failed: { icon: AlertCircle, color: 'text-destructive', label: 'Processing Failed' },
  };

  const currentStatus = statusConfig[data.status];
  const StatusIcon = currentStatus.icon;
  const isCompleted = data.status === 'completed';
  const isFailed = data.status === 'failed';

  // Calculate progress percentage
  const totalSteps = data.timeline.length;
  const completedSteps = data.timeline.filter(s => s.status === 'completed').length;
  const progressPercent = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  return (
    <div className="rounded-lg border border-border bg-card p-6 my-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <StatusIcon className={`h-5 w-5 ${currentStatus.color} ${!isCompleted && !isFailed ? 'animate-pulse' : ''}`} />
          <h3 className="text-lg font-semibold text-foreground">{currentStatus.label}</h3>
        </div>
        <div className="text-sm text-muted-foreground space-y-1">
          <div>
            Ticket: <span className="font-medium text-foreground">{data.ticketNumber}</span>
            {' • '}
            Customer: <span className="font-medium text-foreground">{data.customer}</span>
          </div>
          <div className="text-foreground italic">&quot;{data.subject}&quot;</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Processing Progress</span>
          <span className="text-sm text-muted-foreground">{Math.round(progressPercent)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              isFailed ? 'bg-destructive' : isCompleted ? 'bg-success' : 'bg-chart-3'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-foreground mb-3">Processing Timeline</h4>
        <div className="space-y-2">
          {data.timeline.map((step, idx) => {
            const stepIcons: Record<string, typeof Clock> = {
              extract_info: FileText,
              get_conversations: FileText,
              classify_ticket: Brain,
              kb_search: Search,
              generate_response: MessageSquare,
              send_reply: Send,
              check_escalation: AlertTriangle,
              create_jira_escalation: TrendingUp,
              create_jira_report: TrendingUp,
            };

            const StepIcon = stepIcons[step.step] || Clock;
            const stepStatus = step.status;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  stepStatus === 'completed'
                    ? 'border-success/30 bg-emerald-500/20'
                    : stepStatus === 'in_progress'
                    ? 'border-chart-3/30 bg-lime-500/20'
                    : stepStatus === 'failed'
                    ? 'border-destructive/30 bg-red-500/20'
                    : 'border-border bg-muted/30'
                }`}
              >
                <div className="flex-shrink-0">
                  {stepStatus === 'completed' ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : stepStatus === 'in_progress' ? (
                    <Loader2 className="h-4 w-4 text-chart-3 animate-spin" />
                  ) : stepStatus === 'failed' ? (
                    <AlertCircle className="h-4 w-4 text-destructive" />
                  ) : (
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <StepIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground capitalize">
                    {step.step.replace(/_/g, ' ')}
                  </div>
                  {step.duration && (
                    <div className="text-xs text-muted-foreground">
                      {step.duration}ms
                    </div>
                  )}
                </div>
                {stepStatus === 'completed' && (
                  <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Classification Results */}
      {data.classification && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary" />
            AI Classification
          </h4>
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <span className="text-xs text-muted-foreground">Category</span>
                <div className="text-sm font-medium text-foreground">
                  {data.classification.primary_category.replace(/_/g, ' ')}
                </div>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Confidence</span>
                <div className="text-sm font-medium text-foreground">
                  {Math.round(data.classification.confidence * 100)}%
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-border/50">
              <span className="text-xs text-muted-foreground">Analysis</span>
              <p className="text-sm text-foreground mt-1">{data.classification.reasoning}</p>
            </div>
            <div className="mt-3 flex items-center gap-2">
              {data.classification.auto_resolvable ? (
                <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success font-medium">
                  Auto-Resolvable
                </span>
              ) : (
                <span className="text-xs px-2 py-1 rounded-full bg-chart-4/20 text-chart-4 font-medium">
                  Requires Human Review
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Knowledge Base Search */}
      {data.kbSearch && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Search className="h-4 w-4 text-primary" />
            Knowledge Base Search
          </h4>
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-muted-foreground">Method</span>
                <div className="text-sm font-medium text-foreground capitalize">
                  {data.kbSearch.method}
                </div>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Matches Found</span>
                <div className="text-sm font-medium text-foreground">
                  {data.kbSearch.matches}
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-border/50 mt-3">
              <span className="text-xs text-muted-foreground">Query</span>
              <p className="text-sm text-foreground mt-1 italic">&quot;{data.kbSearch.query}&quot;</p>
            </div>
          </div>
        </div>
      )}

      {/* AI Response */}
      {data.aiResponse && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-primary" />
            Generated Response
          </h4>
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-sm text-foreground whitespace-pre-wrap">{data.aiResponse.text}</p>
            {data.aiResponse.needsEscalation && data.aiResponse.escalationSignals.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-chart-4" />
                  <span className="text-xs font-medium text-chart-4">Escalation Signals Detected</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.aiResponse.escalationSignals.slice(0, 3).map((signal, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded-full bg-chart-4/20 text-chart-4"
                    >
                      &quot;{signal}&quot;
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Jira Ticket */}
      {data.jiraTicket && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-chart-4" />
            Jira Ticket Created
          </h4>
          <div className="rounded-lg border border-chart-4/30 bg-amber-500/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-foreground">{data.jiraTicket.key}</div>
                <div className="text-xs text-muted-foreground mt-1">{data.jiraTicket.summary}</div>
              </div>
              <a
                href={data.jiraTicket.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-chart-4 hover:text-chart-4/80 transition-colors"
              >
                View in Jira
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {data.error && (
        <div className="mb-6 rounded-lg border border-destructive/30 bg-red-500/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <h4 className="text-sm font-semibold text-destructive">Processing Error</h4>
          </div>
          <p className="text-sm text-foreground">
            Failed at step: <span className="font-medium">{data.error.step}</span>
          </p>
          <p className="text-sm text-muted-foreground mt-1">{data.error.message}</p>
        </div>
      )}

      {/* Summary Footer */}
      <div className={`rounded-lg border p-4 ${
        isFailed
          ? 'border-destructive/30 bg-red-500/20'
          : isCompleted
          ? 'border-success/30 bg-emerald-500/20'
          : 'border-chart-3/30 bg-lime-500/20'
      }`}>
        <div className="flex items-center gap-3">
          <StatusIcon className={`h-6 w-6 ${currentStatus.color}`} />
          <div className="flex-1">
            <h4 className={`font-bold ${currentStatus.color} mb-1`}>
              {currentStatus.label}
            </h4>
            {data.totalDuration && (
              <p className="text-sm text-muted-foreground">
                Total processing time: {(data.totalDuration / 1000).toFixed(2)}s
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
