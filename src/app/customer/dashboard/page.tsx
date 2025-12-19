'use client';

import { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { useTickets } from '@/hooks/useTickets';
import type { Ticket, AvatarGradient, TooltipData } from '@/types/ticket';

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
      {/* Blur effect layer */}
      {gradient.blur && (
        <div
          className="absolute inset-0 blur-md opacity-50"
          style={{ backgroundColor: gradient.blur }}
        />
      )}
      {/* Gradient layer */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `linear-gradient(135deg, ${gradient.primary} 0%, ${gradient.secondary} 100%)`,
        }}
      />
    </div>
  );
}

// Tooltip Component
function ChartTooltip({
  data,
  date,
  visible,
}: {
  data: TooltipData;
  date: string;
  visible: boolean;
}) {
  if (!visible) return null;

  return (
    <div
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-20"
      style={{
        backgroundColor: COLORS.cardSurface,
        borderRadius: '12px',
        border: `1px solid ${COLORS.border}`,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        padding: '16px',
        minWidth: '180px',
      }}
    >
      {/* Arrow */}
      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45"
        style={{
          backgroundColor: COLORS.cardSurface,
          borderRight: `1px solid ${COLORS.border}`,
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      />
      <div className="text-sm font-medium mb-3" style={{ color: COLORS.textPrimary }}>
        {date}
      </div>
      <div className="space-y-2">
        <div className="flex justify-between gap-6 text-xs">
          <span style={{ color: COLORS.textSecondary }}>New Tickets</span>
          <span className="font-medium" style={{ color: COLORS.textPrimary }}>
            {data.newTickets}
          </span>
        </div>
        <div className="flex justify-between gap-6 text-xs">
          <span style={{ color: COLORS.textSecondary }}>Completed</span>
          <span className="font-medium" style={{ color: COLORS.textPrimary }}>
            {data.completed}
          </span>
        </div>
        <div className="flex justify-between gap-6 text-xs">
          <span style={{ color: COLORS.textSecondary }}>Avg response Time</span>
          <span className="font-medium" style={{ color: COLORS.textPrimary }}>
            {data.avgResponseTime}
          </span>
        </div>
        <div className="flex justify-between gap-6 text-xs">
          <span style={{ color: COLORS.textSecondary }}>SLA</span>
          <span className="font-medium" style={{ color: COLORS.textPrimary }}>
            {data.sla}
          </span>
        </div>
      </div>
    </div>
  );
}

// Priority Badge Component
function PriorityBadge({ priority }: { priority: Ticket['priority'] }) {
  const styles: Record<string, { bg: string; text: string; icon: boolean }> = {
    High: { bg: 'rgba(220, 38, 38, 0.15)', text: '#DC2626', icon: true },
    Medium: { bg: 'rgba(194, 65, 12, 0.15)', text: '#C2410C', icon: false },
    Low: { bg: 'rgba(21, 128, 61, 0.15)', text: '#15803D', icon: false },
  };

  const style = styles[priority];

  return (
    <span
      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium"
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
function StatusBadge({ status }: { status: Ticket['status'] }) {
  const styles: Record<string, { bg: string; text: string; icon: boolean }> = {
    'AI-Suggested': { bg: 'rgba(99, 102, 241, 0.15)', text: '#818CF8', icon: true },
    'In Progress': { bg: COLORS.cardSurface, text: COLORS.textSecondary, icon: false },
    Escalated: { bg: 'rgba(220, 38, 38, 0.15)', text: '#DC2626', icon: false },
    Completed: { bg: 'rgba(55, 65, 81, 0.3)', text: COLORS.textSecondary, icon: false },
  };

  const style = styles[status] || styles['In Progress'];

  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium"
      style={{
        backgroundColor: style.bg,
        color: style.text,
        borderRadius: '20px',
      }}
    >
      {style.icon && <Sparkles className="w-3 h-3" />}
      {status}
    </span>
  );
}

// Stat Card Component
function StatCard({
  label,
  value,
  change,
  isPositive,
}: {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
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
      <span className="text-sm" style={{ color: COLORS.textSecondary }}>
        {label}
      </span>
      <div className="mt-4 flex items-end justify-between">
        <span className="text-4xl font-semibold" style={{ color: COLORS.textPrimary }}>
          {value}
        </span>
        <span className="text-sm">
          <span style={{ color: isPositive ? COLORS.success : COLORS.error }}>
            {isPositive ? '+' : ''}
            {change}
          </span>
          <span className="ml-1" style={{ color: COLORS.textMuted }}>
            from last month
          </span>
        </span>
      </div>
    </div>
  );
}

export default function CustomerDashboardPage() {
  const {
    tickets,
    chartData,
    stats,
    pagination,
    isLoading,
    getTooltipData,
    nextPage,
    prevPage,
    refreshTickets,
  } = useTickets();

  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);

  // Handle bar hover
  const handleBarHover = (index: number | null) => {
    setHoveredBar(index);
    if (index !== null) {
      setTooltipData(getTooltipData(index));
    } else {
      setTooltipData(null);
    }
  };

  // Format date for tooltip
  const formatTooltipDate = (day: number, month: string) => {
    const monthFull = month === 'Oct' ? 'October' : month === 'Nov' ? 'November' : 'December';
    return `${monthFull} ${day}, 2025`;
  };

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: COLORS.background, color: COLORS.textPrimary }}
    >
      {/* Header - Figma: h-64px, px-24px */}
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
            Quick Statistics
          </h1>
        </div>
        <div className="flex items-center gap-4">
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

      {/* Scrollable Content - Figma: p-24px, gap-24px */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stat Cards - Figma: grid gap-20px */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            label="Total Tickets"
            value={stats.totalTickets.toString()}
            change={`${stats.totalTicketsChange}%`}
            isPositive={stats.totalTicketsChange > 0}
          />
          <StatCard
            label="Completion"
            value={`${stats.completion}%`}
            change={`${stats.completionChange}%`}
            isPositive={stats.completionChange > 0}
          />
          <StatCard
            label="Avg Response Time"
            value={stats.avgResponseTime}
            change={`${stats.avgResponseTimeChange}%`}
            isPositive={stats.avgResponseTimeChange > 0}
          />
          <StatCard
            label="SLA"
            value={`${stats.sla}%`}
            change={`${stats.slaChange}%`}
            isPositive={stats.slaChange > 0}
          />
        </div>

        {/* Activity Chart - Figma: p-24px, border-radius-12px */}
        <div
          className="p-6"
          style={{
            backgroundColor: 'rgba(31, 41, 55, 0.4)',
            borderRadius: '12px',
            border: `1px solid ${COLORS.cardBorder}`,
          }}
        >
          {/* Chart with bars */}
          <div className="relative">
            {/* Bars Container - Figma: h-112px, gap-3px */}
            <div className="flex items-end gap-[3px] h-28 mb-2">
              {chartData.map((item, index) => (
                <div
                  key={index}
                  className="relative flex-1 flex flex-col items-center"
                  onMouseEnter={() => handleBarHover(index)}
                  onMouseLeave={() => handleBarHover(null)}
                >
                  {/* Bar with gradient overlay */}
                  <div
                    className="w-full max-w-[12px] rounded-sm transition-all duration-200 cursor-pointer relative overflow-hidden"
                    style={{
                      height: `${item.value * 2.5}px`,
                      backgroundColor: COLORS.primary,
                    }}
                  >
                    {/* Inactive overlay - Figma: rgba(10, 10, 10, 0.8) */}
                    {hoveredBar !== index && (
                      <div
                        className="absolute inset-0"
                        style={{ backgroundColor: COLORS.barInactive }}
                      />
                    )}
                  </div>

                  {/* Tooltip */}
                  {hoveredBar === index && tooltipData && (
                    <ChartTooltip
                      data={tooltipData}
                      date={formatTooltipDate(item.day, item.month)}
                      visible={true}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Date Labels - Figma: text-10px */}
            <div className="flex gap-[3px] text-[10px]" style={{ color: COLORS.textMuted }}>
              {chartData.map((item, index) => (
                <div key={index} className="flex-1 text-center">
                  {item.day}
                </div>
              ))}
            </div>
          </div>

          {/* Month Navigation - Figma: mt-16px, pt-12px, border-top */}
          <div
            className="flex items-center justify-between mt-4 pt-3"
            style={{ borderTop: `1px solid ${COLORS.cardBorder}` }}
          >
            <button
              className="flex items-center gap-1 text-sm transition-colors hover:text-white"
              style={{ color: COLORS.textSecondary }}
            >
              <ChevronLeft className="w-4 h-4" />
              <ChevronLeft className="w-4 h-4 -ml-2" />
              October
            </button>
            <span className="text-sm" style={{ color: COLORS.textSecondary }}>
              November
            </span>
            <button
              className="flex items-center gap-1 text-sm transition-colors hover:text-white"
              style={{ color: COLORS.textSecondary }}
            >
              December
              <ChevronRight className="w-4 h-4" />
              <ChevronRight className="w-4 h-4 -ml-2" />
            </button>
          </div>
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
                  Auto-refresh every 5 mins
                </span>
              </div>
              <p className="text-sm mt-1" style={{ color: COLORS.textSecondary }}>
                12 Pending Reviews • 5 New Tickets
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
                  placeholder="Search tickets"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2"
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

          {/* Table - Figma: border-radius-20px */}
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
                    <th
                      className="px-4 py-3 text-left text-sm font-medium"
                      style={{ color: COLORS.textSecondary }}
                    >
                      <div className="flex items-center gap-1">
                        Ticket ID
                        <ChevronUp className="w-3 h-3" />
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-left text-sm font-medium"
                      style={{ color: COLORS.textSecondary }}
                    >
                      Customer
                    </th>
                    <th
                      className="px-4 py-3 text-left text-sm font-medium"
                      style={{ color: COLORS.textSecondary }}
                    >
                      Subject
                    </th>
                    <th
                      className="px-4 py-3 text-left text-sm font-medium"
                      style={{ color: COLORS.textSecondary }}
                    >
                      Priority
                    </th>
                    <th
                      className="px-4 py-3 text-left text-sm font-medium"
                      style={{ color: COLORS.textSecondary }}
                    >
                      Status
                    </th>
                    <th
                      className="px-4 py-3 text-left text-sm font-medium"
                      style={{ color: COLORS.textSecondary }}
                    >
                      Date and Time
                    </th>
                    <th
                      className="px-4 py-3 text-left text-sm font-medium"
                      style={{ color: COLORS.textSecondary }}
                    >
                      Assigned Agent
                    </th>
                    <th
                      className="px-4 py-3 text-left text-sm font-medium"
                      style={{ color: COLORS.textSecondary }}
                    >
                      SLA
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    // Loading skeleton
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr
                        key={i}
                        style={{ borderBottom: `1px solid rgba(55, 65, 81, 0.3)` }}
                      >
                        {Array.from({ length: 8 }).map((_, j) => (
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
                  ) : (
                    tickets.map((ticket) => (
                      <tr
                        key={ticket.id}
                        className="transition-colors cursor-pointer hover:bg-gray-800/20"
                        style={{ borderBottom: `1px solid rgba(55, 65, 81, 0.3)` }}
                      >
                        <td className="px-4 py-4">
                          <span className="font-medium" style={{ color: COLORS.primary }}>
                            {ticket.id}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <GradientAvatar gradient={ticket.customer.avatar} size={36} />
                            <div>
                              <div
                                className="text-sm font-medium"
                                style={{ color: COLORS.textPrimary }}
                              >
                                {ticket.customer.name}
                              </div>
                              <div className="text-xs" style={{ color: COLORS.textMuted }}>
                                {ticket.customer.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 max-w-xs">
                          <div>
                            <div
                              className="text-sm font-medium"
                              style={{ color: COLORS.textPrimary }}
                            >
                              {ticket.subject}
                            </div>
                            <div
                              className="text-xs truncate"
                              style={{ color: COLORS.textMuted }}
                            >
                              {ticket.description}
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
                          <span
                            className="text-sm whitespace-pre-line"
                            style={{ color: COLORS.textSecondary }}
                          >
                            {ticket.dateTime}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          {ticket.assignedAgent ? (
                            <div className="flex items-center gap-2">
                              <div
                                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium"
                                style={{
                                  backgroundColor: COLORS.border,
                                  color: COLORS.textPrimary,
                                }}
                              >
                                {ticket.assignedAgent.initials}
                              </div>
                              <span
                                className="text-sm"
                                style={{ color: COLORS.textPrimary }}
                              >
                                {ticket.assignedAgent.name}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm" style={{ color: COLORS.textMuted }}>
                              ---
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm" style={{ color: COLORS.textSecondary }}>
                            {ticket.sla}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination - Figma: px-16px, py-12px */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderTop: `1px solid ${COLORS.cardBorder}` }}
            >
              <button
                onClick={prevPage}
                className="flex items-center gap-1 px-3 py-1.5 text-sm transition-colors hover:text-white"
                style={{ color: COLORS.textSecondary }}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <span className="text-sm" style={{ color: COLORS.textSecondary }}>
                <span className="font-medium" style={{ color: COLORS.textPrimary }}>
                  {(pagination.page - 1) * pagination.pageSize + 1}-
                  {Math.min(pagination.page * pagination.pageSize, pagination.total)}
                </span>{' '}
                of {pagination.total}
              </span>
              <button
                onClick={nextPage}
                className="flex items-center gap-1 px-3 py-1.5 text-sm transition-colors hover:text-white"
                style={{ color: COLORS.textSecondary }}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating AI Button - Figma: bottom-24px, right-24px, w-56px, h-56px */}
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
