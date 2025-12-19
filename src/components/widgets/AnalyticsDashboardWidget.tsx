import { BarChart3 } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

interface AnalyticsDashboardData {
  ticketVolume: Array<{ date: string; tickets: number }>;
  responseTime: Array<{ hour: string; avgMinutes: number }>;
  resolution: {
    resolved: number;
    pending: number;
    escalated: number;
  };
}

export function AnalyticsDashboardWidget({ data }: { data: AnalyticsDashboardData }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 my-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Analytics Dashboard</h3>
      </div>

      <div className="space-y-6">
        {/* Resolution Stats - MOVED TO TOP */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-foreground">Resolution Status</h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-emerald-500/20 border border-success/30 p-4 rounded-lg">
              <div className="text-2xl font-semibold text-success">
                {data.resolution.resolved}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Resolved</div>
            </div>
            <div className="bg-amber-500/20 border border-chart-4/30 p-4 rounded-lg">
              <div className="text-2xl font-semibold text-chart-4">
                {data.resolution.pending}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Pending</div>
            </div>
            <div className="bg-red-500/20 border border-destructive/30 p-4 rounded-lg">
              <div className="text-2xl font-semibold text-destructive">
                {data.resolution.escalated}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Escalated</div>
            </div>
          </div>
        </div>

        {/* Ticket Volume Chart */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-foreground">
            Ticket Volume (Last 7 Days)
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.ticketVolume}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))',
                }}
              />
              <Bar
                dataKey="tickets"
                fill="var(--chart-1)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Response Time Chart */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-foreground">
            Avg Response Time by Hour
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data.responseTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="hour"
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))',
                }}
              />
              <Line
                type="monotone"
                dataKey="avgMinutes"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={{ fill: 'var(--chart-1)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
