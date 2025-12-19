import {
  User,
  BookOpen,
  Settings,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Shield,
  Zap,
  UserCheck
} from 'lucide-react';
import type { InteractiveUpdateData } from '@/types/widget';

export function InteractiveUpdateWidget({ data }: { data: InteractiveUpdateData }) {
  const updateTypeConfig = {
    profile: {
      icon: User,
      color: 'text-primary',
      bg: 'bg-primary/20',
      border: 'border-primary/30',
      label: 'Profile Update',
    },
    course: {
      icon: BookOpen,
      color: 'text-chart-3',
      bg: 'bg-lime-500/20',
      border: 'border-chart-3/30',
      label: 'Course Update',
    },
    settings: {
      icon: Settings,
      color: 'text-chart-4',
      bg: 'bg-amber-500/20',
      border: 'border-chart-4/30',
      label: 'Settings Update',
    },
  };

  const resolutionConfig = {
    'ai-resolved': {
      icon: CheckCircle2,
      color: 'text-success',
      bg: 'bg-emerald-500/20',
      border: 'border-success/30',
      label: '✓ UPDATED BY AI',
    },
    'human-assigned': {
      icon: UserCheck,
      color: 'text-chart-4',
      bg: 'bg-amber-500/20',
      border: 'border-chart-4/30',
      label: '⚠️ ASSIGNED TO HUMAN AGENT',
    },
    'pending': {
      icon: Clock,
      color: 'text-muted-foreground',
      bg: 'bg-muted/20',
      border: 'border-muted',
      label: '⏱️ PENDING UPDATE',
    },
  };

  const typeConfig = updateTypeConfig[data.updateType];
  const TypeIcon = typeConfig.icon;
  const resolution = resolutionConfig[data.resolution];
  const ResolutionIcon = resolution.icon;

  return (
    <div className="rounded-lg border border-border bg-card p-6 my-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <TypeIcon className={`h-5 w-5 ${typeConfig.color}`} />
          <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
        </div>
        <div className="text-sm text-muted-foreground space-y-1">
          <div>
            Ticket: <span className="font-medium text-foreground">{data.ticketId}</span>
            {' • '}
            Customer: <span className="font-medium text-foreground">{data.customer}</span>
          </div>
          <div className="text-foreground italic">&quot;{data.issueReported}&quot;</div>
        </div>
      </div>

      {/* Current Data Display */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          Current {typeConfig.label} Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-lg border border-border bg-muted/30">
          {Object.entries(data.currentData).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <span className="text-xs text-muted-foreground capitalize">{key.replace(/_/g, ' ')}</span>
              <span className="text-sm text-foreground font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Capabilities */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* What AI Can Do */}
        <div className={`rounded-lg border ${typeConfig.border} ${typeConfig.bg} p-4`}>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-4 w-4 text-success" />
            <h5 className="text-sm font-semibold text-foreground">AI Can Update Automatically</h5>
          </div>
          <ul className="space-y-2">
            {data.aiCapabilities.canUpdate.map((field, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{field}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What Needs Human Review */}
        {data.aiCapabilities.needsHuman.length > 0 && (
          <div className="rounded-lg border border-chart-4/30 bg-amber-500/20 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-4 w-4 text-chart-4" />
              <h5 className="text-sm font-semibold text-foreground">Needs Human Approval</h5>
            </div>
            <ul className="space-y-2">
              {data.aiCapabilities.needsHuman.map((field, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-chart-4 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{field}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* AI Explanation */}
      <div className="mb-6 rounded-lg border border-primary/30 bg-primary/20 p-4">
        <p className="text-sm text-foreground">{data.aiCapabilities.explanation}</p>
      </div>

      {/* Updateable Fields List */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-foreground mb-3">Available Update Options</h4>
        <div className="space-y-2">
          {data.updateableFields.map((field, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                field.canAutoUpdate
                  ? 'border-success/30 bg-emerald-500/20 hover:bg-emerald-500/30'
                  : 'border-chart-4/30 bg-amber-500/20 hover:bg-amber-500/30'
              } transition-all cursor-pointer`}
            >
              <div className="flex items-center gap-3 flex-1">
                {field.canAutoUpdate ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : (
                  <Shield className="h-4 w-4 text-chart-4" />
                )}
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{field.label}</div>
                  <div className="text-xs text-muted-foreground">
                    Current: {field.currentValue}
                  </div>
                  {field.requiresApproval && (
                    <div className="text-xs text-chart-4 mt-1">
                      Requires {field.requiresApproval} approval
                    </div>
                  )}
                </div>
              </div>
              <div className={`text-xs px-2 py-1 rounded-full font-medium ${
                field.canAutoUpdate
                  ? 'bg-success/20 text-success'
                  : 'bg-chart-4/20 text-chart-4'
              }`}>
                {field.canAutoUpdate ? 'Auto' : 'Manual'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Update Result (if present) */}
      {data.updateResult && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-foreground mb-3">Update Results</h4>
          <div className={`rounded-lg border p-4 ${
            data.updateResult.success
              ? 'border-success/30 bg-emerald-500/20'
              : 'border-destructive/30 bg-red-500/20'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              {data.updateResult.success ? (
                <CheckCircle2 className="h-5 w-5 text-success" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-destructive" />
              )}
              <p className="text-sm font-semibold text-foreground">{data.updateResult.message}</p>
            </div>

            {data.updateResult.updatedFields.length > 0 && (
              <div className="space-y-2 mt-3 pt-3 border-t border-border/50">
                <div className="text-xs font-medium text-muted-foreground mb-2">Changes Made:</div>
                {data.updateResult.updatedFields.map((field, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-foreground">{field.label}:</span>
                    <span className="text-muted-foreground line-through">{field.oldValue}</span>
                    <span className="text-primary">→</span>
                    <span className="text-success font-medium">{field.newValue}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="text-xs text-muted-foreground mt-3 flex items-center gap-2">
              <Clock className="h-3 w-3" />
              <span>{data.updateResult.timestamp}</span>
            </div>
          </div>
        </div>
      )}

      {/* Human Agent Assignment (if escalated) */}
      {data.humanAgent && (
        <div className="mb-6 rounded-lg border border-chart-4/30 bg-amber-500/20 p-4">
          <div className="flex items-center gap-2 mb-3">
            <UserCheck className="h-5 w-5 text-chart-4" />
            <h4 className="text-sm font-semibold text-foreground">Assigned to Human Agent</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Agent:</span>{' '}
              <span className="text-foreground font-medium">{data.humanAgent.name}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Role:</span>{' '}
              <span className="text-foreground">{data.humanAgent.role}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Expected Response:</span>{' '}
              <span className="text-foreground">{data.humanAgent.eta}</span>
            </div>
            <div className="pt-2 border-t border-border/50 text-muted-foreground">
              <span className="font-medium">Reason:</span> {data.humanAgent.reason}
            </div>
          </div>
        </div>
      )}

      {/* Resolution Status Banner */}
      <div className={`rounded-lg border ${resolution.border} ${resolution.bg} p-4`}>
        <div className="flex items-center gap-3">
          <ResolutionIcon className={`h-6 w-6 ${resolution.color}`} />
          <div className="flex-1">
            <h4 className={`font-bold ${resolution.color} mb-1`}>{resolution.label}</h4>
            {data.resolution === 'ai-resolved' && data.updateResult && (
              <p className="text-sm text-foreground">{data.updateResult.message}</p>
            )}
            {data.resolution === 'human-assigned' && data.humanAgent && (
              <p className="text-sm text-foreground">
                This update requires approval. {data.humanAgent.name} will review your request.
              </p>
            )}
            {data.resolution === 'pending' && (
              <p className="text-sm text-foreground">
                Awaiting user action. Select the fields you&apos;d like to update above.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
