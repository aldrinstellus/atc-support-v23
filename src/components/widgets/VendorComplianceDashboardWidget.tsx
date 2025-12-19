import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';
import { CustomTooltip } from './CustomTooltip';
import { corVendorComplianceData } from '@/data/persona-data/cor-data';
import { usePersona } from '@/hooks/use-persona';
import type { VendorComplianceData } from '@/types/widget';

export function VendorComplianceDashboardWidget({ data }: { data?: VendorComplianceData }) {
  const { currentPersona } = usePersona();

  // Only show for COR persona
  if (currentPersona.id !== 'cor') {
    return null;
  }

  // Use COR-specific data if no data prop provided
  const vendorData = data || corVendorComplianceData;
  // Defensive check
  if (!vendorData || typeof vendorData !== 'object') {
    return (
      <div className="my-4 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
        <p className="text-sm text-destructive">Unable to load vendor compliance data</p>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-chart-4';
    return 'text-destructive';
  };

  const violationColors = {
    critical: 'border-l-destructive bg-destructive/5',
    high: 'border-l-chart-4 bg-chart-4/5',
    medium: 'border-l-chart-3 bg-chart-3/5',
    low: 'border-l-muted-foreground/50 bg-muted/20',
  };

  const statusBadges = {
    open: 'bg-destructive/10 text-destructive border-destructive/30',
    remediated: 'bg-success/10 text-success border-success/30',
    waived: 'bg-muted text-muted-foreground border-muted-foreground/30',
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6 my-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">{vendorData.title}</h3>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-foreground font-medium">{vendorData.vendor.name}</p>
            <p className="text-xs text-muted-foreground">
              {vendorData.vendor.tier === 'prime' ? 'Prime Contractor' : 'Subcontractor'} •
              Contract Value: ${(vendorData.vendor.contractValue / 1000000).toFixed(1)}M
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold ${getScoreColor(vendorData.compliance.overallScore)}`}>
            {vendorData.compliance.overallScore}%
          </div>
          <p className="text-xs text-muted-foreground mt-1">Overall Compliance</p>
        </div>
      </div>

      {/* Compliance Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Service Level', value: vendorData.compliance.slaCompliance },
          { label: 'Security', value: vendorData.compliance.securityCompliance },
          { label: 'Reporting', value: vendorData.compliance.reportingCompliance },
          { label: 'Quality', value: vendorData.compliance.qualityCompliance },
        ].map((metric, idx) => (
          <motion.div
            key={idx}
            className="rounded-lg border border-border bg-card/50 p-3 hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.03, y: -2 }}
          >
            <div className={`text-xl font-bold mb-1 ${getScoreColor(metric.value)}`}>
              {metric.value}%
            </div>
            <p className="text-xs text-muted-foreground">{metric.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Compliance Trend Chart */}
      {vendorData.trends && vendorData.trends.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-3 text-foreground">Compliance Trend (Last 6 Months)</h4>
          <div className="rounded-lg border border-border bg-card/50 p-4">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={vendorData.trends}>
                <defs>
                  {/* Multi-stop gradient for compliance trend */}
                  <linearGradient id="vendorComplianceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.5}/>
                    <stop offset="30%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="70%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  domain={[0, 100]}
                  tickLine={false}
                />
                <Tooltip
                  content={<CustomTooltip formatter={(value) => `${value}% Compliance`} />}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  fill="url(#vendorComplianceGradient)"
                  animationDuration={1500}
                  dot={{
                    fill: '#8b5cf6',
                    r: 5,
                    strokeWidth: 2,
                    stroke: '#fff'
                  }}
                  activeDot={{
                    r: 7,
                    strokeWidth: 3,
                    stroke: '#fff'
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Violations */}
      {vendorData.violations && vendorData.violations.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <AlertTriangle className="h-4 w-4 text-chart-4" />
            Compliance Violations ({vendorData.violations.length})
          </h4>
          <div className="space-y-2">
            {vendorData.violations.map((violation, idx) => (
              <div
                key={idx}
                className={`border-l-4 ${violationColors[violation.severity]} rounded-r p-3 transition-all duration-200 hover:shadow-sm`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {violation.type}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded border ${statusBadges[violation.status]}`}>
                      {violation.status}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{violation.date}</span>
                </div>
                <p className="text-sm text-foreground mb-1">{violation.description}</p>
                {violation.remediationDue && violation.status === 'open' && (
                  <p className="text-xs text-chart-4 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Remediation due: {violation.remediationDue}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {vendorData.recommendations && vendorData.recommendations.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <CheckCircle2 className="h-4 w-4 text-success" />
            Recommendations
          </h4>
          <ul className="space-y-2">
            {vendorData.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-foreground/90">
                <span className="text-primary mt-1">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
