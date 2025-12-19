import {
  Users,
  TrendingUp,
  Calendar
} from 'lucide-react';
import type { ResourceCapacityData } from '@/types/widget';

export function ResourceCapacityDashboardWidget({ data }: { data: ResourceCapacityData }) {
  // Defensive check
  if (!data || typeof data !== 'object') {
    return (
      <div className="my-4 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
        <p className="text-sm text-destructive">Unable to load resource capacity data</p>
      </div>
    );
  }

  const statusColors = {
    available: 'bg-emerald-500/20 text-success border-success/50',
    'at-capacity': 'bg-lime-500/20 text-chart-3 border-chart-3/50',
    'over-allocated': 'bg-red-500/20 text-destructive border-destructive/50',
  };

  const getUtilizationColor = (rate: number) => {
    if (rate > 100) return 'text-destructive';
    if (rate >= 90) return 'text-chart-4';
    if (rate >= 70) return 'text-success';
    return 'text-chart-3';
  };

  const getUtilizationBg = (rate: number) => {
    if (rate > 100) return 'bg-destructive';
    if (rate >= 90) return 'bg-chart-4';
    if (rate >= 70) return 'bg-success';
    return 'bg-chart-3';
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6 my-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
      </div>

      {/* Team Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-lg border border-border bg-card/50 p-3">
          <div className="text-2xl font-bold text-foreground mb-1">{data.teamCapacity.totalHours}h</div>
          <p className="text-xs text-muted-foreground">Total Capacity</p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-3">
          <div className="text-2xl font-bold text-chart-4 mb-1">{data.teamCapacity.allocated}h</div>
          <p className="text-xs text-muted-foreground">Allocated</p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-3">
          <div className="text-2xl font-bold text-success mb-1">{data.teamCapacity.available}h</div>
          <p className="text-xs text-muted-foreground">Available</p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-3">
          <div className={`text-2xl font-bold mb-1 ${getUtilizationColor(data.teamCapacity.utilizationRate)}`}>
            {data.teamCapacity.utilizationRate}%
          </div>
          <p className="text-xs text-muted-foreground">Utilization</p>
        </div>
      </div>

      {/* Team Members */}
      {data.members && data.members.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-3 text-foreground">
            Team Members ({data.members.length})
          </h4>
          <div className="space-y-3">
            {data.members.map((member, idx) => {
              const utilizationRate = Math.round((member.allocated / member.capacity) * 100);
              return (
                <div key={idx} className="rounded-lg border border-border bg-card/50 p-4 transition-all duration-200 hover:shadow-md">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded border ${statusColors[member.status]}`}>
                      {member.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Capacity</p>
                      <p className="text-sm font-semibold text-foreground">{member.capacity}h</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Allocated</p>
                      <p className="text-sm font-semibold text-foreground">{member.allocated}h</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Available</p>
                      <p className="text-sm font-semibold text-success">{member.available}h</p>
                    </div>
                  </div>

                  {/* Capacity Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Utilization</span>
                      <span className={`text-xs font-semibold ${getUtilizationColor(utilizationRate)}`}>
                        {utilizationRate}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getUtilizationBg(utilizationRate)} transition-all duration-300`}
                        style={{ width: `${Math.min(utilizationRate, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Upcoming PTO */}
                  {member.upcomingPTO && member.upcomingPTO.length > 0 && (
                    <div className="pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-1">Upcoming PTO:</p>
                      <div className="flex flex-wrap gap-1">
                        {member.upcomingPTO.map((pto, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded bg-amber-500/20 text-chart-4 border border-chart-4/30">
                            <Calendar className="inline h-3 w-3 mr-1" />
                            {pto}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Upcoming Sprints Forecast */}
      {data.upcomingSprints && data.upcomingSprints.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <TrendingUp className="h-4 w-4 text-primary" />
            Capacity Forecast
          </h4>
          <div className="space-y-2">
            {data.upcomingSprints.map((sprint, idx) => {
              const gapColor = sprint.gap < 0 ? 'text-destructive' : sprint.gap === 0 ? 'text-success' : 'text-chart-3';
              const gapBg = sprint.gap < 0 ? 'bg-red-500/20 border-destructive/30' : sprint.gap === 0 ? 'bg-emerald-500/20 border-success/30' : 'bg-lime-500/20 border-chart-3/30';

              return (
                <div key={idx} className="rounded-lg border border-border bg-card/50 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-foreground">{sprint.sprint}</p>
                    <span className={`text-xs px-2 py-1 rounded border ${gapBg}`}>
                      {sprint.gap < 0 ? `${sprint.gap}h shortage` : sprint.gap === 0 ? 'Balanced' : `${sprint.gap}h surplus`}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <p className="text-muted-foreground">Capacity</p>
                      <p className="font-semibold text-foreground">{sprint.capacity}h</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Demand</p>
                      <p className="font-semibold text-foreground">{sprint.demand}h</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Gap</p>
                      <p className={`font-semibold ${gapColor}`}>{sprint.gap}h</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
