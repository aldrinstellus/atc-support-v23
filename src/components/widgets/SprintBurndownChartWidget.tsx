import {
  TrendingDown,
  Activity,
  AlertTriangle
} from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';
import type { SprintBurndownData } from '@/types/widget';
import { pmSprintBurndownData } from '@/data/persona-data/project-manager-data';
import { usePersona } from '@/hooks/use-persona';
import { CustomTooltip } from './CustomTooltip';

export function SprintBurndownChartWidget({ data: providedData }: { data?: SprintBurndownData }) {
  const { currentPersona } = usePersona();

  // Use persona-specific data for Project Manager persona, fallback to provided data
  const data = currentPersona.id === 'project-manager' ? pmSprintBurndownData : providedData;

  // Defensive check
  if (!data || typeof data !== 'object') {
    return (
      <div className="my-4 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
        <p className="text-sm text-destructive">Unable to load sprint burndown data</p>
      </div>
    );
  }

  const statusColors = {
    'on-track': 'border-success/30 bg-emerald-500/20 text-success',
    'at-risk': 'border-chart-4/30 bg-amber-500/20 text-chart-4',
    'critical': 'border-destructive/30 bg-red-500/20 text-destructive',
  };

  const velocityTrendIcon = {
    increasing: <TrendingDown className="h-4 w-4 text-success rotate-180" />,
    stable: <Activity className="h-4 w-4 text-chart-3" />,
    decreasing: <TrendingDown className="h-4 w-4 text-destructive" />,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100 }
    }
  };

  return (
    <motion.div
      className="rounded-lg border border-border bg-card p-6 my-4 shadow-lg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
          </div>
          <p className="text-sm text-foreground font-medium">{data.sprint.name}</p>
          <p className="text-xs text-muted-foreground">
            {data.sprint.startDate} - {data.sprint.endDate}
          </p>
        </div>
        <div className={`px-4 py-2 rounded-lg border ${statusColors[data.status]}`}>
          <span className="text-sm font-semibold uppercase tracking-wide">{data.status}</span>
        </div>
      </div>

      {/* Sprint Progress */}
      <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" variants={itemVariants}>
        <motion.div
          className="rounded-lg border border-border bg-gradient-to-br from-card/50 to-muted/20 p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="text-2xl font-bold text-foreground mb-1">{data.sprint.totalStoryPoints}</div>
          <p className="text-xs text-muted-foreground">Total Story Points</p>
        </motion.div>
        <motion.div
          className="rounded-lg border border-green-500/30 bg-gradient-to-br from-green-500/20 to-green-600/10 p-3 shadow-sm hover:shadow-md hover:shadow-green-500/20 transition-shadow cursor-pointer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="text-2xl font-bold text-green-500 mb-1">{data.sprint.completedStoryPoints}</div>
          <p className="text-xs text-muted-foreground">Completed Points</p>
        </motion.div>
        <motion.div
          className="rounded-lg border border-primary/30 bg-gradient-to-br from-primary/20 to-primary/10 p-3 shadow-sm hover:shadow-md hover:shadow-primary/20 transition-shadow cursor-pointer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="text-2xl font-bold text-primary mb-1">{data.velocity.current}</div>
          <p className="text-xs text-muted-foreground">Current Velocity</p>
        </motion.div>
        <motion.div
          className="rounded-lg border border-border bg-gradient-to-br from-card/50 to-muted/20 p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold text-foreground">{data.velocity.average}</span>
            {velocityTrendIcon[data.velocity.trend]}
          </div>
          <p className="text-xs text-muted-foreground">Avg Velocity</p>
        </motion.div>
      </motion.div>

      {/* Burndown Chart */}
      {data.burndown && data.burndown.length > 0 && (
        <motion.div className="mb-6" variants={itemVariants}>
          <h4 className="text-sm font-semibold mb-3 text-foreground">Burndown Chart</h4>
          <div className="rounded-lg border border-border bg-gradient-to-br from-card/50 to-muted/20 p-4 shadow-inner">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={data.burndown}>
                <defs>
                  {/* Enhanced 4-stop gradients for richer appearance */}
                  <linearGradient id="colorIdeal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#cbd5e1" stopOpacity={0.4}/>
                    <stop offset="30%" stopColor="#94a3b8" stopOpacity={0.3}/>
                    <stop offset="70%" stopColor="#64748b" stopOpacity={0.15}/>
                    <stop offset="100%" stopColor="#475569" stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fb923c" stopOpacity={0.6}/>
                    <stop offset="30%" stopColor="#f97316" stopOpacity={0.5}/>
                    <stop offset="70%" stopColor="#ea580c" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#c2410c" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  label={{ value: 'Story Points', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip
                  content={<CustomTooltip formatter={(value) => `${value} pts`} />}
                  cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, strokeDasharray: '5 5' }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="idealRemaining"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="url(#colorIdeal)"
                  name="Ideal Burndown"
                  animationDuration={1500}
                />
                <Area
                  type="monotone"
                  dataKey="actualRemaining"
                  stroke="#f97316"
                  strokeWidth={3}
                  fill="url(#colorActual)"
                  name="Actual Burndown"
                  animationDuration={1500}
                  dot={{ fill: '#f97316', r: 5, strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 7, strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      {/* Status Legend */}
      <motion.div className="mb-6 rounded-lg border border-border bg-gradient-to-br from-card/50 to-muted/20 p-4" variants={itemVariants}>
        <h4 className="text-sm font-semibold mb-3 text-foreground">Sprint Status Indicators</h4>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-sm" />
            <span className="text-sm text-muted-foreground">On Track</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-chart-4 shadow-sm" />
            <span className="text-sm text-muted-foreground">At Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-destructive shadow-sm" />
            <span className="text-sm text-muted-foreground">Critical</span>
          </div>
        </div>
      </motion.div>

      {/* Risks */}
      {data.risks && data.risks.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <AlertTriangle className="h-4 w-4 text-chart-4" />
            Sprint Risks
          </h4>
          <div className="space-y-2">
            {data.risks.map((risk, idx) => (
              <div key={idx} className="rounded-lg border border-chart-4/30 bg-amber-500/20 p-3 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-chart-4 mt-0.5" />
                <span className="text-sm text-foreground">
                  {typeof risk === 'string' ? risk : (risk as { description?: string }).description || JSON.stringify(risk)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
