import {
  FileText,
  AlertTriangle,
  Link2
} from 'lucide-react';
import type { RequirementsTrackingData } from '@/types/widget';

export function RequirementsTrackingDashboardWidget({ data }: { data: RequirementsTrackingData }) {
  // Defensive check
  if (!data || typeof data !== 'object') {
    return (
      <div className="my-4 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
        <p className="text-sm text-destructive">Unable to load requirements tracking data</p>
      </div>
    );
  }

  const statusColors = {
    draft: 'bg-muted text-muted-foreground border-muted-foreground/30',
    'in-review': 'bg-chart-3/10 text-chart-3 border-chart-3/30',
    approved: 'bg-success/10 text-success border-success/30',
    implemented: 'bg-chart-1/10 text-chart-1 border-chart-1/30',
    verified: 'bg-primary/10 text-primary border-primary/30',
  };

  const categoryColors = {
    functional: 'bg-chart-1/20 text-chart-1',
    'non-functional': 'bg-chart-2/20 text-chart-2',
    technical: 'bg-chart-3/20 text-chart-3',
    business: 'bg-chart-4/20 text-chart-4',
  };

  const priorityColors = {
    critical: 'border-l-destructive bg-destructive/5',
    high: 'border-l-chart-4 bg-chart-4/5',
    medium: 'border-l-chart-3 bg-chart-3/5',
    low: 'border-l-muted-foreground/50 bg-muted/20',
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6 my-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <FileText className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="rounded-lg border border-border bg-card/50 p-3 text-center">
          <div className="text-2xl font-bold text-foreground mb-1">{data.summary.total}</div>
          <p className="text-xs text-muted-foreground">Total Requirements</p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-3 text-center">
          <div className="text-2xl font-bold text-success mb-1">{data.summary.approved}</div>
          <p className="text-xs text-muted-foreground">Approved</p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-3 text-center">
          <div className="text-2xl font-bold text-chart-3 mb-1">{data.summary.inReview}</div>
          <p className="text-xs text-muted-foreground">In Review</p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-3 text-center">
          <div className="text-2xl font-bold text-muted-foreground mb-1">{data.summary.draft}</div>
          <p className="text-xs text-muted-foreground">Draft</p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-3 text-center">
          <div className="text-2xl font-bold text-primary mb-1">{data.summary.traceability}%</div>
          <p className="text-xs text-muted-foreground">Traceability</p>
        </div>
      </div>

      {/* Requirements List */}
      {data.requirements && data.requirements.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-3 text-foreground">Requirements ({data.requirements.length})</h4>
          <div className="space-y-3">
            {data.requirements.map((req, idx) => (
              <div
                key={idx}
                className={`border-l-4 ${priorityColors[req.priority]} rounded-r p-4 transition-all duration-200 hover:shadow-md`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-semibold text-muted-foreground">{req.id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${categoryColors[req.category]}`}>
                        {req.category}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground mb-1">{req.title}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded border ${statusColors[req.status]}`}>
                    {req.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Assigned To</p>
                    <p className="text-xs font-medium text-foreground">{req.assignedTo}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Stakeholders</p>
                    <div className="flex flex-wrap gap-1">
                      {req.stakeholders.map((stakeholder, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded bg-muted text-foreground">
                          {stakeholder}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Traceability Metrics */}
                <div className="rounded-lg border border-border bg-card/30 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Link2 className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-medium text-foreground">Traceability</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Design Docs</p>
                      <p className="text-sm font-semibold text-foreground">{req.traceability.designDocs}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Test Cases</p>
                      <p className="text-sm font-semibold text-foreground">{req.traceability.testCases}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Completeness</p>
                      <p className="text-sm font-semibold text-primary">{req.traceability.completeness}%</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* At-Risk Requirements */}
      {data.risksAtRisk && data.risksAtRisk.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <AlertTriangle className="h-4 w-4 text-chart-4" />
            Requirements at Risk ({data.risksAtRisk.length})
          </h4>
          <div className="space-y-2">
            {data.risksAtRisk.map((risk, idx) => (
              <div key={idx} className="rounded-lg border border-chart-4/30 bg-chart-4/5 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-semibold text-muted-foreground">{risk.id}</span>
                  <span className="text-sm font-medium text-foreground">{risk.title}</span>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-chart-4">Risk:</span> {risk.risk}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground/80">Mitigation:</span> {risk.mitigation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
