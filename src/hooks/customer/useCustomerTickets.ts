'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type {
  EnhancedTicket,
  TicketStatus,
  TicketPriority,
  TicketChannel,
  TicketCategory,
  CompanyTier,
  RiskLevel,
} from '@/types/mock';
import { useCustomerPersona } from '@/contexts/CustomerPersonaContext';

export interface TicketQueryOptions {
  status?: TicketStatus[];
  priority?: TicketPriority[];
  channel?: TicketChannel[];
  category?: TicketCategory[];
  search?: string;
  slaBreached?: boolean;
  aiSuggested?: boolean;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}

export interface TicketQueryResult {
  tickets: EnhancedTicket[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export function useCustomerTickets(options: TicketQueryOptions = {}) {
  const { selectedTier, selectedRisk } = useCustomerPersona();
  const [data, setData] = useState<TicketQueryResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Build query string
  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    // Add persona filters
    if (selectedTier !== 'all') params.set('tier', selectedTier);
    if (selectedRisk !== 'all') params.set('risk', selectedRisk);

    // Add query options
    if (options.status?.length) params.set('status', options.status.join(','));
    if (options.priority?.length) params.set('priority', options.priority.join(','));
    if (options.channel?.length) params.set('channel', options.channel.join(','));
    if (options.category?.length) params.set('category', options.category.join(','));
    if (options.search) params.set('search', options.search);
    if (options.slaBreached !== undefined) params.set('slaBreached', String(options.slaBreached));
    if (options.aiSuggested !== undefined) params.set('aiSuggested', String(options.aiSuggested));
    if (options.page) params.set('page', String(options.page));
    if (options.pageSize) params.set('pageSize', String(options.pageSize));
    if (options.sortBy) params.set('sortBy', options.sortBy);
    if (options.sortDir) params.set('sortDir', options.sortDir);

    return params.toString();
  }, [selectedTier, selectedRisk, options]);

  const fetchTickets = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/mock/tickets?${queryString}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch tickets: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.success) {
        setData({
          tickets: result.data,
          total: result.pagination.total,
          page: result.pagination.page,
          pageSize: result.pagination.pageSize,
          totalPages: result.pagination.totalPages,
        });
      } else {
        throw new Error(result.error || 'Failed to fetch tickets');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching tickets:', err);
    } finally {
      setIsLoading(false);
    }
  }, [queryString]);

  // Fetch on mount and when query changes
  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  // Refresh function
  const refresh = useCallback(() => {
    return fetchTickets();
  }, [fetchTickets]);

  return {
    tickets: data?.tickets ?? [],
    total: data?.total ?? 0,
    page: data?.page ?? 1,
    pageSize: data?.pageSize ?? 20,
    totalPages: data?.totalPages ?? 0,
    isLoading,
    error,
    refresh,
  };
}

// Get a single ticket with full details
export function useTicketDetails(ticketId: string | null) {
  const [data, setData] = useState<{
    ticket: EnhancedTicket;
    history: any[];
    company: any;
    contact: any;
    agent: any;
    slaConfig: any;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ticketId) {
      setData(null);
      return;
    }

    const fetchTicket = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/mock/tickets/${ticketId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ticket: ${response.statusText}`);
        }

        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error(result.error || 'Ticket not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching ticket:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  return { data, isLoading, error };
}

export default useCustomerTickets;
