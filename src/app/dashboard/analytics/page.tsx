'use client';

import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  Users,
  MessageSquare,
  AlertTriangle,
} from 'lucide-react';

const stats = [
  {
    label: 'Total Tickets',
    value: '1,284',
    change: '+12.5%',
    trend: 'up',
    icon: MessageSquare,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    label: 'Resolution Rate',
    value: '94.2%',
    change: '+2.3%',
    trend: 'up',
    icon: CheckCircle,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  {
    label: 'Avg Response Time',
    value: '2.4h',
    change: '-15%',
    trend: 'up',
    icon: Clock,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  {
    label: 'Active Agents',
    value: '12',
    change: '+1',
    trend: 'up',
    icon: Users,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
  },
];

const categoryBreakdown = [
  { category: 'Network', count: 342, percentage: 26.6 },
  { category: 'Software', count: 298, percentage: 23.2 },
  { category: 'Hardware', count: 256, percentage: 19.9 },
  { category: 'Access', count: 198, percentage: 15.4 },
  { category: 'Email', count: 124, percentage: 9.7 },
  { category: 'Other', count: 66, percentage: 5.1 },
];

const recentActivity = [
  { agent: 'Sarah Johnson', action: 'resolved', ticketId: 'TICK-089', time: '5 min ago' },
  { agent: 'Mike Chen', action: 'assigned', ticketId: 'TICK-092', time: '12 min ago' },
  { agent: 'AI Assistant', action: 'drafted', ticketId: 'TICK-094', time: '18 min ago' },
  { agent: 'Sarah Johnson', action: 'responded', ticketId: 'TICK-087', time: '25 min ago' },
  { agent: 'Mike Chen', action: 'escalated', ticketId: 'TICK-085', time: '32 min ago' },
];

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Monitor team performance and ticket metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="px-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-5 bg-card-elevated rounded-xl border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${
                  stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="bg-card-elevated rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Tickets by Category</h2>
              <p className="text-xs text-muted-foreground">Distribution of ticket types</p>
            </div>
          </div>
          <div className="space-y-4">
            {categoryBreakdown.map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-foreground">{item.category}</span>
                  <span className="text-sm text-muted-foreground">{item.count} ({item.percentage}%)</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card-elevated rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-green-500/10">
              <Clock className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
              <p className="text-xs text-muted-foreground">Latest team actions</p>
            </div>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{activity.agent}</span>
                      {' '}{activity.action}{' '}
                      <span className="font-mono text-primary">{activity.ticketId}</span>
                    </p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SLA Warning */}
      <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
          <div>
            <p className="text-sm font-medium text-yellow-400">SLA Warning</p>
            <p className="text-xs text-muted-foreground">3 tickets are approaching their SLA deadline. Review the queue to prioritize responses.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
