import { FileCheck, Clock, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import type { DeliverableReviewListData } from '@/types/widget';

export function DeliverableReviewListWidget({ data }: { data: DeliverableReviewListData }) {
  // Defensive validation
  if (!data || typeof data !== 'object') {
    return (
      <div className="my-4 rounded-lg border border-destructive/30 bg-red-500/20 p-4">
        <p className="text-sm text-destructive">Unable to load deliverable review list - invalid data</p>
      </div>
    );
  }

  if (!data.deliverables || !Array.isArray(data.deliverables)) {
    return (
      <div className="my-4 rounded-lg border border-destructive/30 bg-red-500/20 p-4">
        <p className="text-sm text-destructive">Unable to load deliverable review list - missing deliverables</p>
      </div>
    );
  }

  const statusConfig: Record<string, { icon: typeof Clock; color: string; bg: string; border: string }> = {
    pending: {
      icon: Clock,
      color: 'text-chart-4',
      bg: 'bg-amber-500/20',
      border: 'border-chart-4/30',
    },
    submitted: {
      icon: FileCheck,
      color: 'text-chart-3',
      bg: 'bg-lime-500/20',
      border: 'border-chart-3/30',
    },
    'under-review': {
      icon: AlertCircle,
      color: 'text-chart-3',
      bg: 'bg-lime-500/20',
      border: 'border-chart-3/30',
    },
    approved: {
      icon: CheckCircle2,
      color: 'text-success',
      bg: 'bg-emerald-500/20',
      border: 'border-success/30',
    },
    rejected: {
      icon: XCircle,
      color: 'text-destructive',
      bg: 'bg-red-500/20',
      border: 'border-destructive/30',
    },
    'resubmission-required': {
      icon: AlertCircle,
      color: 'text-chart-4',
      bg: 'bg-amber-500/20',
      border: 'border-chart-4/30',
    },
  };

  const priorityConfig = {
    critical: 'border-l-destructive',
    high: 'border-l-chart-4',
    medium: 'border-l-chart-3',
    low: 'border-l-muted-foreground/50',
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6 my-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileCheck className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">{data.title || 'Deliverable Reviews'}</h3>
        </div>
        {data.summary && (
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-chart-4">
              {data.summary.pendingReview || 0} Pending Review
            </span>
          </div>
        )}
      </div>

      {/* Deliverables List */}
      <div className="space-y-3">
        {data.deliverables.map((deliverable, idx) => {
          const config = statusConfig[deliverable.status];
          const StatusIcon = config.icon;
          const daysUntilDue = Math.ceil(
            (new Date(deliverable.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          );
          const isOverdue = daysUntilDue < 0;
          const isUrgent = daysUntilDue <= 2 && daysUntilDue >= 0;

          return (
            <div
              key={idx}
              className={`border-l-4 ${priorityConfig[deliverable.priority]} rounded-r-lg border border-border bg-muted/20 p-4 hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-foreground">{deliverable.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {deliverable.contractName} ({deliverable.contractId})
                  </p>
                </div>
                <div className={`px-2 py-1 rounded flex items-center gap-1 ${config.bg} ${config.border} border`}>
                  <StatusIcon className={`h-3.5 w-3.5 ${config.color}`} />
                  <span className={`text-xs font-medium ${config.color} capitalize`}>
                    {deliverable.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                <div>
                  <p className="text-xs text-muted-foreground">Vendor</p>
                  <p className="text-sm font-medium text-foreground">{deliverable.vendor}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Due Date</p>
                  <p
                    className={`text-sm font-medium ${
                      isOverdue ? 'text-destructive' : isUrgent ? 'text-chart-4' : 'text-foreground'
                    }`}
                  >
                    {new Date(deliverable.dueDate).toLocaleDateString()}
                    {isOverdue && <span className="ml-1 text-xs">(Overdue)</span>}
                    {isUrgent && !isOverdue && <span className="ml-1 text-xs">(Urgent)</span>}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Submitted</p>
                  <p className="text-sm font-medium text-foreground">
                    {deliverable.submittedDate
                      ? new Date(deliverable.submittedDate).toLocaleDateString()
                      : 'Not yet'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Quality Score</p>
                  <p className="text-sm font-medium text-foreground">
                    {deliverable.qualityScore !== null ? `${deliverable.qualityScore}%` : 'Pending'}
                  </p>
                </div>
              </div>

              {deliverable.reviewedBy && (
                <div className="mt-3 p-2 rounded bg-muted/30 border border-border">
                  <p className="text-xs text-muted-foreground">Reviewed By:</p>
                  <p className="text-sm text-foreground mt-1">{deliverable.reviewedBy}</p>
                </div>
              )}

              {deliverable.status === 'submitted' && (
                <div className="mt-3 flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded text-xs font-medium bg-success hover:bg-success/80 text-white transition-colors">
                    Approve
                  </button>
                  <button className="px-3 py-1.5 rounded text-xs font-medium bg-destructive hover:bg-destructive/80 text-white transition-colors">
                    Request Changes
                  </button>
                  <button className="px-3 py-1.5 rounded text-xs font-medium border border-border hover:bg-muted/50 transition-colors">
                    Add Notes
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {data.deliverables.length === 0 && (
        <div className="text-center py-8">
          <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-3" />
          <p className="text-sm font-medium text-foreground">All deliverables reviewed!</p>
          <p className="text-xs text-muted-foreground mt-1">No pending reviews at this time</p>
        </div>
      )}
    </div>
  );
}
