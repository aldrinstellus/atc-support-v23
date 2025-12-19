import {
  AlertOctagon,
  Clock,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { BlockerResolutionData } from '@/types/widget';

export function BlockerResolutionDashboardWidget({ data }: { data: BlockerResolutionData }) {
  // Defensive check
  if (!data || typeof data !== 'object') {
    return (
      <div className="my-4 rounded-lg border border-destructive/30 bg-red-500/20 p-4">
        <p className="text-sm text-destructive">Unable to load blocker resolution data</p>
      </div>
    );
  }

  const severityColors = {
    critical: 'border-l-destructive bg-red-500/20',
    high: 'border-l-chart-4 bg-amber-500/20',
    medium: 'border-l-chart-3 bg-lime-500/20',
    low: 'border-l-muted-foreground/50 bg-muted/20',
  };

  const statusColors = {
    open: 'bg-red-500/20 text-destructive border-destructive/30',
    'in-progress': 'bg-lime-500/20 text-chart-3 border-chart-3/30',
    resolved: 'bg-emerald-500/20 text-success border-success/30',
  };

  const blockerTypeIcons = {
    technical: '🔧',
    dependency: '🔗',
    resource: '👥',
    external: '🌐',
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6 my-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <AlertOctagon className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="rounded-lg border border-border bg-card/50 p-4">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="h-5 w-5 text-chart-4" />
            <div>
              <div className="text-2xl font-bold text-foreground">{data.activeBlockers}</div>
              <p className="text-xs text-muted-foreground">Active Blockers</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-4">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <div className="text-2xl font-bold text-foreground">{data.avgResolutionTime}</div>
              <p className="text-xs text-muted-foreground">Avg Resolution Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blockers List */}
      {data.blockers && data.blockers.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-3 text-foreground">
            Current Blockers ({data.blockers.length})
          </h4>
          <div className="space-y-3">
            {data.blockers.map((blocker, idx) => (
              <div
                key={idx}
                className={`border-l-4 ${severityColors[blocker.severity]} rounded-r p-4 transition-all duration-200 hover:shadow-md`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-semibold text-muted-foreground">{blocker.id}</span>
                      <span className="text-sm">{blockerTypeIcons[blocker.blockerType]}</span>
                      <span className="text-xs font-medium text-muted-foreground uppercase">
                        {blocker.blockerType}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{blocker.task}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded border ${statusColors[blocker.status]}`}>
                    {blocker.status}
                  </span>
                </div>

                <p className="text-sm text-foreground/90 mb-3">{blocker.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-lg border border-border bg-card/30 p-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Blocked Since</p>
                    <p className="text-xs font-medium text-foreground">{blocker.blockedSince}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Impacted Tasks</p>
                    <p className="text-xs font-medium text-destructive">{blocker.impactedTasks} tasks</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Assigned To</p>
                    <p className="text-xs font-medium text-foreground">{blocker.assignedTo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resolution Trend Chart */}
      {data.resolutionTrend && data.resolutionTrend.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <TrendingUp className="h-4 w-4 text-primary" />
            Resolution Trend
          </h4>
          <div className="rounded-lg border border-border bg-card/50 p-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data.resolutionTrend}>
                <defs>
                  <linearGradient id="openedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#dc2626" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#b91c1c" stopOpacity={0.5} />
                  </linearGradient>
                  <linearGradient id="resolvedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#16a34a" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#15803d" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="week"
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Legend />
                <Bar dataKey="opened" fill="url(#openedGradient)" name="Opened" radius={[8, 8, 0, 0]} />
                <Bar dataKey="resolved" fill="url(#resolvedGradient)" name="Resolved" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
