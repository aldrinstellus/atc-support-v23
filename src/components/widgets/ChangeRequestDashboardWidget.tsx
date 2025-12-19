import {
  GitBranch,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Users
} from 'lucide-react';
import type { ChangeRequestData } from '@/types/widget';

export function ChangeRequestDashboardWidget({ data }: { data: ChangeRequestData }) {
  // Defensive check
  if (!data || typeof data !== 'object') {
    return (
      <div className="my-4 rounded-lg border border-destructive/30 bg-red-500/20 p-4">
        <p className="text-sm text-destructive">Unable to load change request data</p>
      </div>
    );
  }

  const statusColors = {
    'pending-review': 'bg-amber-500/20 text-chart-4 border-chart-4/30',
    approved: 'bg-emerald-500/20 text-success border-success/30',
    rejected: 'bg-red-500/20 text-destructive border-destructive/30',
    implemented: 'bg-primary/20 text-primary border-primary/30',
  };

  const categoryColors = {
    scope: 'bg-chart-1/20 text-chart-1',
    schedule: 'bg-chart-2/20 text-chart-2',
    budget: 'bg-chart-3/20 text-chart-3',
    requirements: 'bg-chart-4/20 text-chart-4',
  };

  const impactColors = {
    high: 'text-destructive',
    medium: 'text-chart-4',
    low: 'text-chart-3',
    none: 'text-muted-foreground',
  };

  const approverStatusColors = {
    pending: 'bg-muted text-muted-foreground',
    approved: 'bg-success/20 text-success',
    rejected: 'bg-destructive/20 text-destructive',
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6 my-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <GitBranch className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-lg border border-border bg-card/50 p-3 text-center">
          <div className="text-2xl font-bold text-chart-4 mb-1">{data.summary.pending}</div>
          <p className="text-xs text-muted-foreground">Pending Review</p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-3 text-center">
          <div className="text-2xl font-bold text-success mb-1">{data.summary.approved}</div>
          <p className="text-xs text-muted-foreground">Approved</p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-3 text-center">
          <div className="text-2xl font-bold text-destructive mb-1">{data.summary.rejected}</div>
          <p className="text-xs text-muted-foreground">Rejected</p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-3 text-center">
          <div className="text-2xl font-bold text-primary mb-1">{data.summary.implemented}</div>
          <p className="text-xs text-muted-foreground">Implemented</p>
        </div>
      </div>

      {/* Change Requests List */}
      {data.requests && data.requests.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-3 text-foreground">
            Change Requests ({data.requests.length})
          </h4>
          <div className="space-y-4">
            {data.requests.map((request, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-border bg-card/50 p-4 transition-all duration-200 hover:shadow-md"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-semibold text-muted-foreground">{request.id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${categoryColors[request.category]}`}>
                        {request.category}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-foreground mb-1">{request.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Requested by {request.requestedBy} on {request.requestDate}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded border ${statusColors[request.status]}`}>
                    {request.status}
                  </span>
                </div>

                {/* Impact Analysis */}
                <div className="rounded-lg border border-border bg-card/30 p-3 mb-3">
                  <h5 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5 text-primary" />
                    Impact Analysis
                  </h5>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Schedule</p>
                      <p className={`text-xs font-semibold uppercase ${impactColors[request.impact.schedule]}`}>
                        {request.impact.schedule}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Budget</p>
                      <p className={`text-xs font-semibold uppercase ${impactColors[request.impact.budget]}`}>
                        {request.impact.budget}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Resources</p>
                      <p className={`text-xs font-semibold uppercase ${impactColors[request.impact.resources]}`}>
                        {request.impact.resources}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Approvers */}
                {request.approvers && request.approvers.length > 0 && (
                  <div>
                    <h5 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-primary" />
                      Approvers
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {request.approvers.map((approver, i) => (
                        <div
                          key={i}
                          className={`text-xs px-3 py-1.5 rounded ${approverStatusColors[approver.status]}`}
                        >
                          <span className="font-medium">{approver.name}</span>
                          {approver.status === 'pending' && (
                            <span className="ml-1">
                              <Clock className="inline h-3 w-3" />
                            </span>
                          )}
                          {approver.status === 'approved' && (
                            <span className="ml-1">
                              <CheckCircle2 className="inline h-3 w-3" />
                            </span>
                          )}
                          {approver.status === 'rejected' && (
                            <span className="ml-1">
                              <AlertTriangle className="inline h-3 w-3" />
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
