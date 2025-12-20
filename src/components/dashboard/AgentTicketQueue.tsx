'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, ArrowUpDown, Calendar, Filter, ChevronLeft, ChevronRight, RefreshCw, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { TicketFilters, type TicketFilterState } from './TicketFilters';

type TicketStatus = 'pending' | 'in_review' | 'approved' | 'rejected';
type SortField = 'date' | 'priority' | 'status';

interface Ticket {
  id: string;
  title: string;
  customer: string;
  status: TicketStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: Date;
  draftId?: string;
}

const mockTickets: Ticket[] = [
  { id: 'TKT-001', title: 'Cannot access account dashboard', customer: 'John Smith', status: 'pending', priority: 'high', createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), draftId: 'draft-001' },
  { id: 'TKT-002', title: 'Payment processing error', customer: 'Sarah Johnson', status: 'in_review', priority: 'urgent', createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), draftId: 'draft-002' },
  { id: 'TKT-003', title: 'Feature request: Dark mode', customer: 'Mike Wilson', status: 'pending', priority: 'low', createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), draftId: 'draft-003' },
  { id: 'TKT-004', title: 'Email notifications not working', customer: 'Emily Brown', status: 'approved', priority: 'medium', createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000) },
  { id: 'TKT-005', title: 'Data export timeout', customer: 'David Lee', status: 'pending', priority: 'high', createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), draftId: 'draft-005' },
];

const statusConfig: Record<TicketStatus, { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' },
  in_review: { label: 'In Review', className: 'bg-blue-500/20 text-blue-500 border-blue-500/30' },
  approved: { label: 'Approved', className: 'bg-green-500/20 text-green-500 border-green-500/30' },
  rejected: { label: 'Rejected', className: 'bg-red-500/20 text-red-500 border-red-500/30' },
};

const priorityConfig = {
  low: { label: 'Low', className: 'text-gray-500' },
  medium: { label: 'Medium', className: 'text-blue-500' },
  high: { label: 'High', className: 'text-orange-500' },
  urgent: { label: 'Urgent', className: 'text-red-500' },
};

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

// PRD 1.2.2: Auto-refresh interval (5 minutes)
const AUTO_REFRESH_INTERVAL = 5 * 60 * 1000;
const ITEMS_PER_PAGE = 10;

export function AgentTicketQueue() {
  const [filterStatus, setFilterStatus] = useState<TicketStatus | 'all'>('all');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortAscending, setSortAscending] = useState(false);
  // PRD 1.2.2: Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  // PRD 1.2.2: Auto-refresh state
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  // PRD 1.2.3: Advanced filters state
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<TicketFilterState>({});

  // PRD 1.2.2: Manual refresh function
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    // In real implementation, this would fetch from API
    // For now, simulate a refresh with mock data
    await new Promise(resolve => setTimeout(resolve, 500));
    setLastRefreshed(new Date());
    setIsRefreshing(false);
  }, []);

  // PRD 1.2.2: Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh();
    }, AUTO_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [handleRefresh]);

  const filteredTickets = mockTickets
    .filter(ticket => filterStatus === 'all' || ticket.status === filterStatus)
    // PRD 1.2.3: Date range filter
    .filter(ticket => {
      if (!advancedFilters.dateRange?.from && !advancedFilters.dateRange?.to) return true;
      const ticketDate = ticket.createdAt.toISOString().split('T')[0];
      if (advancedFilters.dateRange?.from && ticketDate < advancedFilters.dateRange.from) return false;
      if (advancedFilters.dateRange?.to && ticketDate > advancedFilters.dateRange.to) return false;
      return true;
    })
    // PRD 1.2.3: Customer filter (in real app, would filter by customerId)
    .filter(ticket => {
      if (!advancedFilters.customerName) return true;
      return ticket.customer.toLowerCase().includes(advancedFilters.customerName.toLowerCase());
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'date': comparison = a.createdAt.getTime() - b.createdAt.getTime(); break;
        case 'priority': {
          const order = { low: 0, medium: 1, high: 2, urgent: 3 };
          comparison = order[a.priority] - order[b.priority];
          break;
        }
        case 'status': comparison = a.status.localeCompare(b.status); break;
      }
      return sortAscending ? comparison : -comparison;
    });

  // Count active advanced filters
  const advancedFilterCount = [
    advancedFilters.dateRange?.from || advancedFilters.dateRange?.to,
    advancedFilters.customerId,
    advancedFilters.assignedAgentId,
  ].filter(Boolean).length;

  // PRD 1.2.2: Pagination calculations
  const totalPages = Math.ceil(filteredTickets.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedTickets = filteredTickets.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, advancedFilters]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-foreground">Ticket Queue</h2>
          {/* PRD 1.2.2: Auto-refresh indicator */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Last updated: {lastRefreshed.toLocaleTimeString()}</span>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-1 rounded hover:bg-muted/50 transition-colors disabled:opacity-50"
              title="Refresh now"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* PRD 1.2.3: Advanced filters toggle */}
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`glass-card border-border px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-card/90 transition-colors ${
              showAdvancedFilters || advancedFilterCount > 0 ? 'text-primary border-primary/50' : 'text-foreground'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Advanced
            {advancedFilterCount > 0 && (
              <span className="px-1.5 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">
                {advancedFilterCount}
              </span>
            )}
          </button>
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as TicketStatus | 'all')}
              className="glass-card border-border px-4 py-2 rounded-lg text-sm text-foreground appearance-none pr-10 cursor-pointer hover:bg-card/90 transition-colors"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_review">In Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
          <button
            onClick={() => { setSortField('date'); setSortAscending(!sortAscending); }}
            className="glass-card border-border px-4 py-2 rounded-lg text-sm text-foreground flex items-center gap-2 hover:bg-card/90 transition-colors"
          >
            <ArrowUpDown className="w-4 h-4" />
            Sort by {sortField}
          </button>
        </div>
      </div>

      {/* PRD 1.2.3: Advanced Filters Panel */}
      <AnimatePresence>
        {showAdvancedFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <TicketFilters
              filters={advancedFilters}
              onFiltersChange={setAdvancedFilters}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass-card border-border rounded-xl overflow-hidden">
        <div className="divide-y divide-border">
          <AnimatePresence mode="popLayout">
            {paginatedTickets.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-12 text-center">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No tickets found</p>
              </motion.div>
            ) : (
              paginatedTickets.map((ticket) => (
                <motion.div
                  key={ticket.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-4 hover:bg-card/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-muted-foreground">{ticket.id}</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-medium ${statusConfig[ticket.status].className}`}>
                          {statusConfig[ticket.status].label}
                        </span>
                        <span className={`text-xs font-medium ${priorityConfig[ticket.priority].className}`}>
                          {priorityConfig[ticket.priority].label}
                        </span>
                      </div>
                      <h3 className="text-base font-medium text-foreground mb-1 truncate">{ticket.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{ticket.customer}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatTimeAgo(ticket.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {ticket.draftId && (
                        <Link
                          href={`/dashboard/drafts?id=${ticket.draftId}`}
                          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                          Review Draft
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* PRD 1.2.2: Pagination controls */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredTickets.length)} of {filteredTickets.length} tickets
        </div>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg glass-card border-border hover:bg-card/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === pageNum
                        ? 'bg-primary text-primary-foreground'
                        : 'glass-card border-border hover:bg-card/90'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg glass-card border-border hover:bg-card/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
