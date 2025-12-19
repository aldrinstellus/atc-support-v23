// Live Metrics Widget - Example of auto-refresh integration
// Shows real-time metrics with smooth updates

'use client';

import { useAutoRefresh } from '@/hooks/useAutoRefresh';
import { Activity, TrendingUp, TrendingDown, Clock, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data generator
function generateMetrics() {
  const baseTickets = 142;
  const baseSLA = 87;
  const baseResolution = 4.2;
  const baseCustomers = 3;

  return {
    tickets: {
      value: baseTickets + Math.floor(Math.random() * 10) - 5,
      change: Math.floor(Math.random() * 20) - 10,
      trend: Math.random() > 0.5 ? 'up' as const : 'down' as const,
    },
    sla: {
      value: baseSLA + Math.floor(Math.random() * 6) - 3,
      change: Math.floor(Math.random() * 6) - 3,
      trend: Math.random() > 0.5 ? 'up' as const : 'down' as const,
    },
    resolution: {
      value: (baseResolution + (Math.random() * 0.6 - 0.3)).toFixed(1),
      change: ((Math.random() * 1) - 0.5).toFixed(1),
      trend: Math.random() > 0.5 ? 'up' as const : 'down' as const,
    },
    atRiskCustomers: {
      value: baseCustomers + (Math.random() > 0.7 ? 1 : 0),
      change: Math.random() > 0.8 ? 1 : 0,
      trend: Math.random() > 0.5 ? 'up' as const : 'down' as const,
    },
  };
}

export function LiveMetricsWidget() {
  const { data, isLoading, lastRefresh, refresh } = useAutoRefresh(
    generateMetrics,
    {
      interval: 12000, // Refresh every 12 seconds
      refreshOnMount: true,
      minDelay: 300,
      maxDelay: 600,
    }
  );

  // Show skeleton only on initial load
  if (isLoading && !data) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-muted rounded w-32 mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-muted rounded w-20"></div>
              <div className="h-8 bg-muted rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const metrics = [
    {
      label: 'Open Tickets',
      value: data?.tickets.value || 0,
      change: data?.tickets.change || 0,
      trend: data?.tickets.trend || 'up',
      icon: Activity,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/20',
    },
    {
      label: 'SLA Performance',
      value: `${data?.sla.value || 0}%`,
      change: data?.sla.change || 0,
      trend: data?.sla.trend || 'up',
      icon: TrendingUp,
      color: data?.sla.value && data.sla.value >= 90 ? 'text-green-500' : 'text-yellow-500',
      bgColor: data?.sla.value && data.sla.value >= 90 ? 'bg-green-500/20' : 'bg-yellow-500/20',
    },
    {
      label: 'Avg Resolution',
      value: `${data?.resolution.value || 0}h`,
      change: parseFloat(data?.resolution.change || '0'),
      trend: data?.resolution.trend || 'down',
      icon: Clock,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/20',
    },
    {
      label: 'At-Risk Customers',
      value: data?.atRiskCustomers.value || 0,
      change: data?.atRiskCustomers.change || 0,
      trend: data?.atRiskCustomers.trend || 'up',
      icon: TrendingDown,
      color: data?.atRiskCustomers.value && data.atRiskCustomers.value > 2 ? 'text-red-500' : 'text-orange-500',
      bgColor: data?.atRiskCustomers.value && data.atRiskCustomers.value > 2 ? 'bg-red-500/20' : 'bg-orange-500/20',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-card border border-border rounded-lg p-6 relative"
    >
      {/* Header with refresh indicator */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Live Metrics</h3>
        <div className="flex items-center gap-3">
          {/* Last updated timestamp */}
          {lastRefresh && (
            <motion.span
              key={lastRefresh.toISOString()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs text-muted-foreground"
            >
              {lastRefresh.toLocaleTimeString()}
            </motion.span>
          )}

          {/* Loading spinner */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              transition={{ duration: 0.6, ease: "linear" }}
            >
              <RefreshCw className="w-4 h-4 text-muted-foreground" />
            </motion.div>
          )}

          {/* Manual refresh button */}
          <button
            onClick={refresh}
            className="p-1.5 hover:bg-muted rounded transition-colors"
            title="Refresh now"
          >
            <RefreshCw className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-4">
        <AnimatePresence mode="wait">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="space-y-2"
            >
              {/* Metric icon and label */}
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded ${metric.bgColor}`}>
                  <metric.icon className={`w-4 h-4 ${metric.color}`} />
                </div>
                <span className="text-sm text-muted-foreground">{metric.label}</span>
              </div>

              {/* Value and change indicator */}
              <div className="flex items-baseline gap-2">
                <motion.span
                  key={`${metric.label}-${metric.value}`}
                  initial={{ scale: 1.2, color: 'rgb(59, 130, 246)' }}
                  animate={{ scale: 1, color: 'inherit' }}
                  transition={{ duration: 0.4 }}
                  className="text-2xl font-bold text-foreground"
                >
                  {metric.value}
                </motion.span>

                {metric.change !== 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-1 text-xs ${
                      metric.trend === 'up'
                        ? metric.change > 0
                          ? 'text-green-500'
                          : 'text-red-500'
                        : metric.change > 0
                        ? 'text-red-500'
                        : 'text-green-500'
                    }`}
                  >
                    {metric.trend === 'up' ? '↑' : '↓'}
                    <span>{Math.abs(metric.change)}</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Update pulse effect */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 bg-blue-500/5 rounded-lg pointer-events-none"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * Compact version for dashboards
 */
export function LiveMetricsBadge() {
  const { data, isLoading } = useAutoRefresh(
    () => ({
      tickets: 142 + Math.floor(Math.random() * 10),
      sla: 87 + Math.floor(Math.random() * 6),
    }),
    {
      interval: 10000,
      refreshOnMount: true,
    }
  );

  return (
    <div className="flex items-center gap-3 bg-card border border-border rounded-full px-4 py-2">
      <div className="flex items-center gap-2">
        {isLoading && <Activity className="w-3 h-3 animate-pulse text-green-500" />}
        <span className="text-sm text-muted-foreground">Tickets:</span>
        <motion.span
          key={data?.tickets}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="text-sm font-semibold"
        >
          {data?.tickets || 0}
        </motion.span>
      </div>
      <div className="w-px h-4 bg-border"></div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">SLA:</span>
        <motion.span
          key={data?.sla}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className={`text-sm font-semibold ${
            data?.sla && data.sla >= 90 ? 'text-green-500' : 'text-yellow-500'
          }`}
        >
          {data?.sla || 0}%
        </motion.span>
      </div>
    </div>
  );
}
