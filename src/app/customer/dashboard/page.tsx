'use client';

import { useState, useMemo } from 'react';
import {
  Bell,
  RefreshCw,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ChevronUp,
  ArrowUpRight,
  Building2,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import { useCustomerTickets } from '@/hooks/customer/useCustomerTickets';
import { useCustomerStats } from '@/hooks/customer/useCustomerStats';
import { useChartData } from '@/hooks/customer/useMetrics';
import { useCustomerPersona } from '@/contexts/CustomerPersonaContext';
import { CustomerPersonaSelector } from '@/components/customer/CustomerPersonaSelector';
import type { EnhancedTicket, TicketPriority, TicketStatus } from '@/types/mock';
import { AVATAR_GRADIENTS, type AvatarGradient } from '@/types/ticket';

// Figma Color Tokens
const COLORS = {
  background: '#030712',
  cardSurface: '#1F2937',
  cardBorder: 'rgba(55, 65, 81, 0.5)',
  primary: '#6366F1',
  primaryHover: '#5457E5',
  textPrimary: '#F9FAFB',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  success: '#16A34A',
  error: '#DC2626',
  warning: '#C2410C',
  lowPriority: '#15803D',
  border: '#374151',
  barInactive: 'rgba(10, 10, 10, 0.8)',
};

// Gradient Avatar Component
function GradientAvatar({
  gradient,
  size = 36,
  className = '',
}: {
  gradient: AvatarGradient;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-full overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      {gradient.blur && (
        <div
          className="absolute inset-0 blur-md opacity-50"
          style={{ backgroundColor: gradient.blur }}
        />
      )}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `linear-gradient(135deg, ${gradient.primary} 0%, ${gradient.secondary} 100%)`,
        }}
      />
    </div>
  );
}

// Priority Badge Component
function PriorityBadge({ priority }: { priority: TicketPriority }) {
  const styles: Record<TicketPriority, { bg: string; text: string; icon: boolean }> = {
    critical: { bg: 'rgba(220, 38, 38, 0.25)', text: '#EF4444', icon: true },
    high: { bg: 'rgba(220, 38, 38, 0.15)', text: '#DC2626', icon: true },
    medium: { bg: 'rgba(194, 65, 12, 0.15)', text: '#C2410C', icon: false },
    low: { bg: 'rgba(21, 128, 61, 0.15)', text: '#15803D', icon: false },
  };

  const style = styles[priority];

  return (
    <span
      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium capitalize"
      style={{
        backgroundColor: style.bg,
        color: style.text,
        borderRadius: '20px',
      }}
    >
      {style.icon && <ArrowUpRight className="w-3 h-3" />}
      {priority}
    </span>
  );
}

// Status Badge Component
function StatusBadge({ status }: { status: TicketStatus }) {
  const styles: Record<TicketStatus, { bg: string; text: string; label: string }> = {
    'open': { bg: 'rgba(99, 102, 241, 0.15)', text: '#818CF8', label: 'Open' },
    'in-progress': { bg: 'rgba(234, 179, 8, 0.15)', text: '#EAB308', label: 'In Progress' },
    'pending-customer': { bg: 'rgba(168, 85, 247, 0.15)', text: '#A855F7', label: 'Pending' },
    'resolved': { bg: 'rgba(34, 197, 94, 0.15)', text: '#22C55E', label: 'Resolved' },
    'closed': { bg: 'rgba(55, 65, 81, 0.3)', text: COLORS.textSecondary, label: 'Closed' },
  };

  const style = styles[status] || styles['open'];

  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium"
      style={{
        backgroundColor: style.bg,
        color: style.text,
        borderRadius: '20px',
      }}
    >
      {style.label}
    </span>
  );
}

// Stat Card Component with loading state
function StatCard({
  label,
  value,
  change,
  isPositive,
  icon,
  isLoading,
}: {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
  isLoading?: boolean;
}) {
  return (
    <div
      className="p-6"
      style={{
        backgroundColor: COLORS.cardSurface,
        borderRadius: '12px',
        border: `1px solid ${COLORS.cardBorder}`,
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm" style={{ color: COLORS.textSecondary }}>
          {label}
        </span>
        {icon}
      </div>
      {isLoading ? (
        <div className="mt-4">
          <div className="h-10 w-24 bg-gray-700 rounded animate-pulse" />
        </div>
      ) : (
        <div className="mt-4 flex items-end justify-between">
          <span className="text-4xl font-semibold" style={{ color: COLORS.textPrimary }}>
            {value}
          </span>
          {change && (
            <span className="text-sm">
              <span style={{ color: isPositive ? COLORS.success : COLORS.error }}>
                {isPositive ? '+' : ''}
                {change}
              </span>
              <span className="ml-1" style={{ color: COLORS.textMuted }}>
                from last month
              </span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// Format time remaining
function formatSlaTime(minutes: number): string {
  if (minutes <= 0) return 'Breached';
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

// Format relative time
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function CustomerDashboardPage() {
  const { isFiltered, currentPersonaLabel } = useCustomerPersona();

  // Ticket state
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TicketStatus[]>([]);

  // Fetch data with filters
  const {
    tickets,
    total,
    totalPages,
    isLoading: ticketsLoading,
    refresh: refreshTickets,
  } = useCustomerTickets({
    search: searchQuery || undefined,
    status: statusFilter.length > 0 ? statusFilter : undefined,
    page,
    pageSize: 10,
    sortBy: 'createdAt',
    sortDir: 'desc',
  });

  const { stats, isLoading: statsLoading } = useCustomerStats();
  const { chartData, isLoading: chartLoading } = useChartData('month');

  // Calculate active tickets for display
  const activeTicketsCount = tickets.filter(
    t => !['resolved', 'closed'].includes(t.status)
  ).length;
  const pendingReviews = tickets.filter(t => t.status === 'open').length;

  // Pagination handlers
  const handlePrevPage = () => setPage(p => Math.max(1, p - 1));
  const handleNextPage = () => setPage(p => Math.min(totalPages, p + 1));

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: COLORS.background, color: COLORS.textPrimary }}
    >
      {/* Header */}
      <header
        className="flex-shrink-0 flex items-center justify-between px-6 py-4"
        style={{
          backgroundColor: COLORS.background,
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="text-xl font-bold" style={{ color: COLORS.textPrimary }}>
              atc
            </span>
            <span className="text-xl font-bold" style={{ color: COLORS.error }}>
              .
            </span>
          </div>
          <h1 className="text-lg font-semibold" style={{ color: COLORS.textPrimary }}>
            Customer Portal
          </h1>
          <CustomerPersonaSelector />
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => refreshTickets()}
            className="p-2 rounded-lg transition-colors hover:bg-gray-800"
            style={{ color: COLORS.textSecondary }}
            title="Refresh data"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button
            className="p-2 rounded-lg transition-colors hover:bg-gray-800"
            style={{ color: COLORS.textSecondary }}
          >
            <Bell className="w-5 h-5" />
          </button>
          <div
            className="w-10 h-10 rounded-full overflow-hidden"
            style={{ border: `2px solid ${COLORS.border}` }}
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=customer&backgroundColor=c0aede"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            label="Active Tickets"
            value={stats?.totalActiveTickets?.toString() ?? '—'}
            isLoading={statsLoading}
            icon={<Building2 className="w-5 h-5 text-indigo-400" />}
          />
          <StatCard
            label="SLA Compliance"
            value={stats ? `${stats.slaComplianceRate}%` : '—'}
            change={(stats?.slaComplianceRate ?? 0) > 90 ? '2.1%' : '-1.5%'}
            isPositive={(stats?.slaComplianceRate ?? 0) > 90}
            isLoading={statsLoading}
          />
          <StatCard
            label="Avg Response Time"
            value={stats ? formatSlaTime(stats.avgFirstResponseTime) : '—'}
            isLoading={statsLoading}
            icon={<Clock className="w-5 h-5 text-blue-400" />}
          />
          <StatCard
            label="At Risk"
            value={stats?.atRiskTickets?.toString() ?? '—'}
            isLoading={statsLoading}
            icon={<AlertTriangle className="w-5 h-5 text-amber-400" />}
          />
        </div>

        {/* Activity Chart */}
        <div
          className="p-6"
          style={{
            backgroundColor: 'rgba(31, 41, 55, 0.4)',
            borderRadius: '12px',
            border: `1px solid ${COLORS.cardBorder}`,
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium" style={{ color: COLORS.textSecondary }}>
              Ticket Volume Trend
            </h3>
            {isFiltered && (
              <span className="text-xs px-2 py-1 rounded bg-indigo-600/20 text-indigo-300">
                Filtered: {currentPersonaLabel}
              </span>
            )}
          </div>
          {chartLoading ? (
            <div className="h-28 flex items-center justify-center">
              <div className="text-sm text-gray-500">Loading chart...</div>
            </div>
          ) : chartData?.ticketVolume ? (
            <div className="flex items-end gap-1 h-28">
              {chartData.ticketVolume.map((item, index) => (
                <div
                  key={index}
                  className="flex-1 bg-indigo-500 rounded-t opacity-70 hover:opacity-100 transition-opacity"
                  style={{ height: `${Math.max(4, (item.value / 100) * 112)}px` }}
                  title={`${item.label}: ${item.value} tickets`}
                />
              ))}
            </div>
          ) : (
            <div className="h-28 flex items-center justify-center text-gray-500">
              No data available
            </div>
          )}
        </div>

        {/* Ticket Queue */}
        <div className="space-y-4">
          {/* Header Row */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold" style={{ color: COLORS.textPrimary }}>
                  Ticket Queue
                </h2>
                <span
                  className="flex items-center gap-2 px-3 py-1.5 text-sm"
                  style={{
                    backgroundColor: COLORS.cardSurface,
                    borderRadius: '9999px',
                    color: COLORS.textSecondary,
                  }}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Auto-refresh
                </span>
              </div>
              <p className="text-sm mt-1" style={{ color: COLORS.textSecondary }}>
                {pendingReviews} Pending Reviews • {total} Total Tickets
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: COLORS.textMuted }}
                />
                <input
                  type="text"
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                  className="w-64 pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  style={{
                    backgroundColor: 'rgba(31, 41, 55, 0.5)',
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: '8px',
                    color: COLORS.textPrimary,
                  }}
                />
              </div>
              <button
                className="flex items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-gray-700"
                style={{
                  backgroundColor: COLORS.cardSurface,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: '8px',
                  color: COLORS.textSecondary,
                }}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>

          {/* Table */}
          <div
            className="overflow-hidden"
            style={{
              backgroundColor: 'rgba(31, 41, 55, 0.4)',
              borderRadius: '20px',
              border: `1px solid ${COLORS.cardBorder}`,
            }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${COLORS.cardBorder}` }}>
                    <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: COLORS.textSecondary }}>
                      <div className="flex items-center gap-1">
                        Ticket ID
                        <ChevronUp className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: COLORS.textSecondary }}>
                      Company
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: COLORS.textSecondary }}>
                      Subject
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: COLORS.textSecondary }}>
                      Priority
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: COLORS.textSecondary }}>
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: COLORS.textSecondary }}>
                      Created
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: COLORS.textSecondary }}>
                      SLA
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ticketsLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid rgba(55, 65, 81, 0.3)` }}>
                        {Array.from({ length: 7 }).map((_, j) => (
                          <td key={j} className="px-4 py-4">
                            <div
                              className="h-4 rounded animate-pulse"
                              style={{
                                backgroundColor: COLORS.cardSurface,
                                width: j === 2 ? '200px' : '80px',
                              }}
                            />
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : tickets.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                        No tickets found
                        {searchQuery && (
                          <span className="block text-sm mt-1">
                            Try adjusting your search or filters
                          </span>
                        )}
                      </td>
                    </tr>
                  ) : (
                    tickets.map((ticket) => (
                      <tr
                        key={ticket.id}
                        className="transition-colors cursor-pointer hover:bg-gray-800/20"
                        style={{ borderBottom: `1px solid rgba(55, 65, 81, 0.3)` }}
                      >
                        <td className="px-4 py-4">
                          <span className="font-medium" style={{ color: COLORS.primary }}>
                            {ticket.ticketNumber}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <GradientAvatar
                              gradient={ticket.contact?.avatar || AVATAR_GRADIENTS.bluePurple}
                              size={36}
                            />
                            <div>
                              <div className="text-sm font-medium" style={{ color: COLORS.textPrimary }}>
                                {ticket.company.name}
                              </div>
                              <div className="text-xs flex items-center gap-1" style={{ color: COLORS.textMuted }}>
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                                  ticket.company.tier === 'enterprise' ? 'bg-purple-900/50 text-purple-300' :
                                  ticket.company.tier === 'smb' ? 'bg-blue-900/50 text-blue-300' :
                                  'bg-green-900/50 text-green-300'
                                }`}>
                                  {ticket.company.tier.toUpperCase()}
                                </span>
                                {ticket.company.riskLevel !== 'healthy' && (
                                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                                    ticket.company.riskLevel === 'at-risk' ? 'bg-amber-900/50 text-amber-300' :
                                    'bg-red-900/50 text-red-300'
                                  }`}>
                                    {ticket.company.riskLevel}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 max-w-xs">
                          <div>
                            <div className="text-sm font-medium" style={{ color: COLORS.textPrimary }}>
                              {ticket.subject}
                            </div>
                            <div className="text-xs truncate" style={{ color: COLORS.textMuted }}>
                              {ticket.description.slice(0, 60)}...
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <PriorityBadge priority={ticket.priority} />
                        </td>
                        <td className="px-4 py-4">
                          <StatusBadge status={ticket.status} />
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm" style={{ color: COLORS.textSecondary }}>
                            {formatRelativeTime(ticket.createdAt)}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`text-sm font-medium ${
                              ticket.slaTimeRemaining <= 0 ? 'text-red-400' :
                              ticket.slaTimeRemaining <= 60 ? 'text-amber-400' :
                              'text-gray-400'
                            }`}
                          >
                            {formatSlaTime(ticket.slaTimeRemaining)}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderTop: `1px solid ${COLORS.cardBorder}` }}
            >
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className="flex items-center gap-1 px-3 py-1.5 text-sm transition-colors hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ color: COLORS.textSecondary }}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <span className="text-sm" style={{ color: COLORS.textSecondary }}>
                Page{' '}
                <span className="font-medium" style={{ color: COLORS.textPrimary }}>
                  {page}
                </span>{' '}
                of {totalPages || 1}
              </span>
              <button
                onClick={handleNextPage}
                disabled={page >= totalPages}
                className="flex items-center gap-1 px-3 py-1.5 text-sm transition-colors hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ color: COLORS.textSecondary }}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating AI Button */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 flex items-center justify-center transition-all hover:scale-105"
        style={{
          backgroundColor: COLORS.primary,
          borderRadius: '9999px',
          boxShadow: `0 10px 25px -5px ${COLORS.primary}4D`,
        }}
      >
        <Sparkles className="w-6 h-6" style={{ color: COLORS.textPrimary }} />
      </button>
    </div>
  );
}
