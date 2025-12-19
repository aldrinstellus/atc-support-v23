// React hook for auto-refreshing widget data during demos
// Simulates live data updates without actual backend polling

'use client';

import { useEffect, useState, useCallback } from 'react';
import { simulateApiDelay } from '@/lib/mock-realtime';

/**
 * Configuration options for auto-refresh
 */
export interface AutoRefreshOptions {
  /** Refresh interval in milliseconds (default: 10000 = 10 seconds) */
  interval?: number;
  /** Minimum API delay in milliseconds (default: 200ms) */
  minDelay?: number;
  /** Maximum API delay in milliseconds (default: 500ms) */
  maxDelay?: number;
  /** Whether to refresh on mount (default: false) */
  refreshOnMount?: boolean;
  /** Whether auto-refresh is enabled (default: true) */
  enabled?: boolean;
}

/**
 * Hook for auto-refreshing widget data with simulated API delays
 *
 * Features:
 * - Automatic refresh at configurable intervals
 * - Simulated API latency for realism
 * - Loading state management
 * - Manual refresh capability
 * - Pause/resume functionality
 * - Last refresh timestamp
 *
 * @example
 * ```typescript
 * function MyWidget() {
 *   const { data, isLoading, refresh, lastRefresh } = useAutoRefresh(
 *     () => fetchWidgetData(),
 *     { interval: 15000 } // Refresh every 15 seconds
 *   );
 *
 *   return (
 *     <div>
 *       {isLoading ? <Skeleton /> : <DataView data={data} />}
 *       <button onClick={refresh}>Refresh Now</button>
 *       <span>Last updated: {lastRefresh?.toLocaleTimeString()}</span>
 *     </div>
 *   );
 * }
 * ```
 */
export function useAutoRefresh<T>(
  dataFetcher: () => T | Promise<T>,
  options: AutoRefreshOptions = {}
) {
  const {
    interval = 10000,
    minDelay = 200,
    maxDelay = 500,
    refreshOnMount = false,
    enabled = true,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(refreshOnMount);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // Fetch data with simulated API delay
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API latency for realistic demos
      const result = await simulateApiDelay(dataFetcher, minDelay, maxDelay);
      setData(result);
      setLastRefresh(new Date());
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      console.error('Auto-refresh error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [dataFetcher, minDelay, maxDelay]);

  // Initial fetch (if refreshOnMount is true)
  useEffect(() => {
    if (refreshOnMount) {
      fetchData();
    }
  }, [refreshOnMount, fetchData]);

  // Set up auto-refresh interval
  useEffect(() => {
    if (!enabled) return;

    const intervalId = setInterval(() => {
      fetchData();
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [enabled, interval, fetchData]);

  // Manual refresh function
  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    lastRefresh,
    refresh,
  };
}

/**
 * Hook for polling specific data updates
 *
 * Similar to useAutoRefresh but optimized for incremental updates
 * rather than full data replacement.
 *
 * @example
 * ```typescript
 * function TicketList() {
 *   const [tickets, setTickets] = useState(initialTickets);
 *
 *   useDataPolling(
 *     async () => {
 *       const newTickets = await fetchNewTickets(lastTicketId);
 *       setTickets(prev => [...newTickets, ...prev]);
 *     },
 *     { interval: 20000 } // Check every 20 seconds
 *   );
 * }
 * ```
 */
export function useDataPolling(
  onPoll: () => void | Promise<void>,
  options: AutoRefreshOptions = {}
) {
  const {
    interval = 15000,
    enabled = true,
  } = options;

  useEffect(() => {
    if (!enabled) return;

    const intervalId = setInterval(async () => {
      try {
        await onPoll();
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [enabled, interval, onPoll]);
}

/**
 * Hook for debounced auto-refresh
 *
 * Prevents rapid successive refreshes when data updates frequently.
 *
 * @example
 * ```typescript
 * function MetricsDashboard() {
 *   const { data, refresh } = useDebouncedAutoRefresh(
 *     () => fetchMetrics(),
 *     { interval: 5000, debounce: 2000 }
 *   );
 * }
 * ```
 */
export function useDebouncedAutoRefresh<T>(
  dataFetcher: () => T | Promise<T>,
  options: AutoRefreshOptions & { debounce?: number } = {}
) {
  const {
    interval = 10000,
    minDelay = 200,
    maxDelay = 500,
    refreshOnMount = false,
    enabled = true,
    debounce = 1000,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(refreshOnMount);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const fetchData = useCallback(async () => {
    // Clear existing debounce timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set new debounce timer
    const timer = setTimeout(async () => {
      setIsLoading(true);

      try {
        const result = await simulateApiDelay(dataFetcher, minDelay, maxDelay);
        setData(result);
        setLastRefresh(new Date());
      } catch (err) {
        console.error('Debounced refresh error:', err);
      } finally {
        setIsLoading(false);
      }
    }, debounce);

    setDebounceTimer(timer);
  }, [dataFetcher, minDelay, maxDelay, debounce, debounceTimer]);

  useEffect(() => {
    if (refreshOnMount) {
      fetchData();
    }
  }, [refreshOnMount, fetchData]);

  useEffect(() => {
    if (!enabled) return;

    const intervalId = setInterval(() => {
      fetchData();
    }, interval);

    return () => {
      clearInterval(intervalId);
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [enabled, interval, fetchData, debounceTimer]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    lastRefresh,
    refresh,
  };
}

/**
 * Hook for optimistic UI updates with auto-refresh
 *
 * Updates UI immediately, then syncs with "server" in background.
 *
 * @example
 * ```typescript
 * function TaskList() {
 *   const { data, optimisticUpdate } = useOptimisticAutoRefresh(
 *     () => fetchTasks()
 *   );
 *
 *   const completeTask = (taskId: string) => {
 *     optimisticUpdate(tasks =>
 *       tasks.map(t => t.id === taskId ? { ...t, status: 'done' } : t)
 *     );
 *   };
 * }
 * ```
 */
export function useOptimisticAutoRefresh<T>(
  dataFetcher: () => T | Promise<T>,
  options: AutoRefreshOptions = {}
) {
  const {
    interval = 10000,
    minDelay = 200,
    maxDelay = 500,
    refreshOnMount = false,
    enabled = true,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(refreshOnMount);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const result = await simulateApiDelay(dataFetcher, minDelay, maxDelay);
      setData(result);
      setLastRefresh(new Date());
    } catch (err) {
      console.error('Optimistic refresh error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [dataFetcher, minDelay, maxDelay]);

  useEffect(() => {
    if (refreshOnMount) {
      fetchData();
    }
  }, [refreshOnMount, fetchData]);

  useEffect(() => {
    if (!enabled) return;

    const intervalId = setInterval(() => {
      fetchData();
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [enabled, interval, fetchData]);

  // Optimistic update function
  const optimisticUpdate = useCallback((updateFn: (current: T | null) => T) => {
    setData((currentData) => {
      try {
        return updateFn(currentData);
      } catch (err) {
        console.error('Optimistic update error:', err);
        return currentData;
      }
    });
  }, []);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    lastRefresh,
    refresh,
    optimisticUpdate,
  };
}
