import {
  TrendingUp,
  Users,
  Activity,
  Target
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import type { TeamVelocityData } from '@/types/widget';
import { pmTeamVelocityData } from '@/data/persona-data/project-manager-data';
import { usePersona } from '@/hooks/use-persona';
import { CustomTooltip } from './CustomTooltip';

export function TeamVelocityDashboardWidget({ data: providedData }: { data?: TeamVelocityData }) {
  const { currentPersona } = usePersona();

  // Use persona-specific data for Project Manager persona, fallback to provided data
  const data = currentPersona.id === 'project-manager' ? pmTeamVelocityData : providedData;

  // Defensive check
  if (!data || typeof data !== 'object') {
    return (
      <div className="my-4 rounded-lg border border-destructive/30 bg-red-500/20 p-4">
        <p className="text-sm text-destructive">Unable to load team velocity data</p>
      </div>
    );
  }

  const getUtilizationColor = (rate: number) => {
    if (rate >= 90) return 'text-destructive';
    if (rate >= 75) return 'text-success';
    if (rate >= 50) return 'text-chart-3';
    return 'text-muted-foreground';
  };

  const getUtilizationBg = (rate: number) => {
    if (rate >= 90) return 'bg-destructive';
    if (rate >= 75) return 'bg-success';
    if (rate >= 50) return 'bg-chart-3';
    return 'bg-muted-foreground';
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
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
      </div>

      {/* Current Sprint Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-lg border border-border bg-card/50 p-3">
          <Activity className="h-4 w-4 text-primary mb-2" />
          <div className="text-2xl font-bold text-foreground mb-1">{data.currentSprint.velocity}</div>
          <p className="text-xs text-muted-foreground">Current Velocity</p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-3">
          <Target className="h-4 w-4 text-primary mb-2" />
          <div className="text-2xl font-bold text-foreground mb-1">{data.currentSprint.capacity}</div>
          <p className="text-xs text-muted-foreground">Team Capacity</p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-3">
          <TrendingUp className="h-4 w-4 text-primary mb-2" />
          <div className={`text-2xl font-bold mb-1 ${getUtilizationColor(data.currentSprint.utilizationRate)}`}>
            {data.currentSprint.utilizationRate}%
          </div>
          <p className="text-xs text-muted-foreground">Utilization Rate</p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-3">
          <Activity className="h-4 w-4 text-primary mb-2" />
          <div className="text-2xl font-bold text-foreground mb-1">{data.predictability.score}%</div>
          <p className="text-xs text-muted-foreground">Predictability</p>
        </div>
      </div>

      {/* Velocity Trend Chart */}
      {data.velocityTrend && data.velocityTrend.length > 0 && (
        <motion.div className="mb-6" variants={itemVariants}>
          <h4 className="text-sm font-semibold mb-3 text-foreground">Velocity Trend</h4>
          <div className="rounded-lg border border-border bg-gradient-to-br from-card/50 to-muted/20 p-4 shadow-inner">
            <ResponsiveContainer width="100%" height={270}>
              <BarChart data={data.velocityTrend} barGap={8}>
                <defs>
                  {/* Enhanced 4-stop gradients for richer appearance */}
                  <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity={1}/>
                    <stop offset="30%" stopColor="#8b5cf6" stopOpacity={0.95}/>
                    <stop offset="70%" stopColor="#7c3aed" stopOpacity={0.9}/>
                    <stop offset="100%" stopColor="#6d28d9" stopOpacity={0.85}/>
                  </linearGradient>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity={1}/>
                    <stop offset="30%" stopColor="#3b82f6" stopOpacity={0.95}/>
                    <stop offset="70%" stopColor="#2563eb" stopOpacity={0.9}/>
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.85}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis
                  dataKey="sprint"
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip
                  content={<CustomTooltip formatter={(value) => `${value} pts`} />}
                  cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }}
                />
                <Legend />
                <Bar dataKey="plannedVelocity" fill="url(#colorPlanned)" name="Planned Velocity" radius={[8, 8, 0, 0]} animationDuration={1000} />
                <Bar dataKey="actualVelocity" fill="url(#colorActual)" name="Actual Velocity" radius={[8, 8, 0, 0]} animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      {/* Team Members */}
      {data.teamMembers && data.teamMembers.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <Users className="h-4 w-4 text-primary" />
            Team Capacity ({data.teamMembers.length} members)
          </h4>
          <div className="space-y-3">
            {data.teamMembers.map((member, idx) => (
              <div key={idx} className="rounded-lg border border-border bg-card/50 p-4 transition-all duration-200 hover:shadow-md">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                  <div className={`text-sm font-bold ${getUtilizationColor(member.utilizationRate)}`}>
                    {member.utilizationRate}%
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Capacity</span>
                    <span className="font-medium text-foreground">{member.capacity} pts</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Assigned</span>
                    <span className="font-medium text-foreground">{member.assigned} pts</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Completed</span>
                    <span className="font-medium text-success">{member.completed} pts</span>
                  </div>

                  {/* Utilization Bar */}
                  <div className="mt-2">
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getUtilizationBg(member.utilizationRate)} transition-all duration-300`}
                        style={{ width: `${Math.min(member.utilizationRate, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
