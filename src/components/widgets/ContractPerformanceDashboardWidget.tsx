import {
  FileText,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import type { ContractPerformanceData } from '@/types/widget';
import { corContractPerformanceData } from '@/data/persona-data/cor-data';
import { usePersona } from '@/hooks/use-persona';
import { CustomTooltip } from './CustomTooltip';

export function ContractPerformanceDashboardWidget({ data: providedData }: { data?: ContractPerformanceData }) {
  const { currentPersona } = usePersona();

  // Use persona-specific data for COR persona, fallback to provided data
  const data = currentPersona.id === 'cor' ? corContractPerformanceData : providedData;

  // Defensive check
  if (!data || typeof data !== 'object') {
    return (
      <div className="my-4 rounded-lg border border-destructive/30 bg-red-500/20 p-4">
        <p className="text-sm text-destructive">Unable to load contract performance data</p>
      </div>
    );
  }

  const performanceData = [
    { name: 'Compliance', value: data.performance.slaCompliance, color: '#10b981', gradient: 'url(#colorSLA)' },
    { name: 'Budget', value: data.performance.budgetUtilization, color: '#3b82f6', gradient: 'url(#colorBudget)' },
    { name: 'Deliverables', value: data.performance.deliverableCompletion, color: '#8b5cf6', gradient: 'url(#colorDeliverables)' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-chart-4';
    return 'text-destructive';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-emerald-500/20 border-success/30';
    if (score >= 70) return 'bg-amber-500/20 border-chart-4/30';
    return 'bg-red-500/20 border-destructive/30';
  };

  return (
    <motion.div
      className="rounded-lg border border-border bg-card p-6 my-4 shadow-lg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {data.contractId} - {data.contractName}
          </p>
        </div>
        <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${getScoreBg(data.performance.overallScore)}`}>
          <span className={getScoreColor(data.performance.overallScore)}>
            {data.performance.overallScore}% Overall
          </span>
        </div>
      </div>

      {/* Vendor Info */}
      <div className="mb-6 p-4 rounded-lg bg-muted/30 border border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">{data.vendor.name}</p>
            <p className="text-xs text-muted-foreground">Vendor ID: {data.vendor.id}</p>
          </div>
          <span className="px-2 py-1 rounded text-xs font-medium bg-primary/20 text-primary capitalize">
            {data.vendor.tier}
          </span>
        </div>
      </div>

      {/* Performance Metrics */}
      <motion.div className="mb-6" variants={itemVariants}>
        <h4 className="text-sm font-medium mb-3 text-foreground">Performance Metrics</h4>
        <div className="rounded-lg border border-border bg-gradient-to-br from-card to-muted/20 p-4 shadow-inner">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={performanceData}>
              <defs>
                {/* Enhanced 4-stop gradients for richer appearance */}
                <linearGradient id="colorSLA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={1}/>
                  <stop offset="30%" stopColor="#10b981" stopOpacity={0.95}/>
                  <stop offset="70%" stopColor="#059669" stopOpacity={0.9}/>
                  <stop offset="100%" stopColor="#047857" stopOpacity={0.85}/>
                </linearGradient>
                <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity={1}/>
                  <stop offset="30%" stopColor="#3b82f6" stopOpacity={0.95}/>
                  <stop offset="70%" stopColor="#2563eb" stopOpacity={0.9}/>
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.85}/>
                </linearGradient>
                <linearGradient id="colorDeliverables" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity={1}/>
                  <stop offset="30%" stopColor="#8b5cf6" stopOpacity={0.95}/>
                  <stop offset="70%" stopColor="#7c3aed" stopOpacity={0.9}/>
                  <stop offset="100%" stopColor="#6d28d9" stopOpacity={0.85}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip
                content={<CustomTooltip formatter={(value) => `${value}%`} />}
                cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={1000}>
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.gradient} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Financial Summary */}
      <motion.div className="mb-6" variants={itemVariants}>
        <h4 className="text-sm font-medium mb-3 text-foreground">Financial Status</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <motion.div
            className="p-3 rounded-lg bg-gradient-to-br from-muted/30 to-muted/10 border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <DollarSign className="h-4 w-4 text-muted-foreground mb-1" />
            <div className="text-lg font-semibold text-foreground">
              ${(data.financials.totalValue / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-muted-foreground">Total Value</div>
          </motion.div>
          <motion.div
            className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 shadow-sm hover:shadow-md hover:shadow-blue-500/20 transition-shadow cursor-pointer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <TrendingUp className="h-4 w-4 text-blue-500 mb-1" />
            <div className="text-lg font-semibold text-blue-500">
              ${(data.financials.spent / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-muted-foreground">Spent</div>
          </motion.div>
          <motion.div
            className="p-3 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 shadow-sm hover:shadow-md hover:shadow-amber-500/20 transition-shadow cursor-pointer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Clock className="h-4 w-4 text-amber-500 mb-1" />
            <div className="text-lg font-semibold text-amber-500">
              ${(data.financials.committed / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-muted-foreground">Committed</div>
          </motion.div>
          <motion.div
            className="p-3 rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 shadow-sm hover:shadow-md hover:shadow-green-500/20 transition-shadow cursor-pointer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <CheckCircle2 className="h-4 w-4 text-green-500 mb-1" />
            <div className="text-lg font-semibold text-green-500">
              ${(data.financials.remaining / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-muted-foreground">Remaining</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Deliverables */}
      {data.deliverables && data.deliverables.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3 text-foreground">Recent Deliverables</h4>
          <div className="space-y-2">
            {data.deliverables.map((deliverable, idx) => {
              const statusColors = {
                pending: 'bg-amber-500/20 text-chart-4 border-chart-4/30',
                submitted: 'bg-lime-500/20 text-chart-3 border-chart-3/30',
                approved: 'bg-emerald-500/20 text-success border-success/30',
                rejected: 'bg-red-500/20 text-destructive border-destructive/30',
              };

              return (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-border bg-muted/20 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{deliverable.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Due: {new Date(deliverable.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {deliverable.qualityScore !== null && (
                      <span className="text-sm font-medium text-foreground">
                        {deliverable.qualityScore}%
                      </span>
                    )}
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium border ${
                        statusColors[deliverable.status]
                      }`}
                    >
                      {deliverable.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Issues */}
      {data.issues && data.issues.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3 text-foreground flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            Active Issues ({data.issues.length})
          </h4>
          <div className="space-y-2">
            {data.issues.map((issue, idx) => {
              const severityColors = {
                critical: 'border-l-destructive bg-red-500/20',
                high: 'border-l-chart-4 bg-amber-500/20',
                medium: 'border-l-chart-3 bg-lime-500/20',
                low: 'border-l-muted-foreground/50 bg-muted/20',
              };

              return (
                <div
                  key={idx}
                  className={`border-l-4 p-3 rounded-r-lg ${severityColors[issue.severity]}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{issue.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Assigned to: {issue.assignedTo} • Due:{' '}
                        {new Date(issue.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-foreground px-2 py-1 rounded bg-background/50 capitalize">
                      {issue.severity}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {data.recommendations && data.recommendations.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-3 text-foreground">Recommendations</h4>
          <div className="space-y-2">
            {data.recommendations.map((rec, idx) => {
              const priorityColors = {
                critical: 'border-l-destructive bg-red-500/20',
                high: 'border-l-chart-4 bg-amber-500/20',
                medium: 'border-l-chart-3 bg-lime-500/20',
                low: 'border-l-muted-foreground/50 bg-muted/20',
              };

              return (
                <div
                  key={idx}
                  className={`border-l-4 p-3 rounded-r-lg ${priorityColors[rec.priority]}`}
                >
                  <p className="text-sm font-medium text-foreground">{rec.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">{rec.reason}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}
