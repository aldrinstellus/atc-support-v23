'use client';

import { useState, useEffect, useCallback } from 'react';
import type { DailyMetrics } from '@/types/mock';

export type TrendPeriod = 'week' | 'month' | 'quarter';

export interface TrendData {
  labels: string[];
  ticketVolume: number[];
  resolutionRate: number[];
  slaCompliance: number[];
  csat: number[];
  sentimentTrend: {
    positive: number[];
    neutral: number[];
    negative: number[];
  };
}

export function useMetricsTrend(period: TrendPeriod = 'month', includeRaw = false) {
  const [trend, setTrend] = useState<TrendData | null>(null);
  const [rawMetrics, setRawMetrics] = useState<DailyMetrics[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrend = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ period });
      if (includeRaw) params.set('includeRaw', 'true');

      const response = await fetch(`/api/mock/metrics/trends?${params}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch trends: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.success) {
        setTrend(result.data.trend);
        if (result.data.rawMetrics) {
          setRawMetrics(result.data.rawMetrics);
        }
      } else {
        throw new Error(result.error || 'Failed to fetch trends');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching trends:', err);
    } finally {
      setIsLoading(false);
    }
  }, [period, includeRaw]);

  useEffect(() => {
    fetchTrend();
  }, [fetchTrend]);

  return { trend, rawMetrics, isLoading, error, refresh: fetchTrend };
}

// Get SLA breach statistics
export function useSLAStats() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSLA = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/mock/sla?includeStats=true');
      if (!response.ok) {
        throw new Error(`Failed to fetch SLA stats: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.success) {
        setData(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch SLA stats');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching SLA stats:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSLA();
  }, [fetchSLA]);

  return { data, isLoading, error, refresh: fetchSLA };
}

// Chart data formatter for the dashboard
export function useChartData(period: TrendPeriod = 'month') {
  const { trend, isLoading, error, refresh } = useMetricsTrend(period);

  // Format data for charts
  const chartData = trend ? {
    ticketVolume: trend.labels.map((label, i) => ({
      label,
      value: trend.ticketVolume[i],
    })),
    resolutionRate: trend.labels.map((label, i) => ({
      label,
      value: trend.resolutionRate[i],
    })),
    slaCompliance: trend.labels.map((label, i) => ({
      label,
      value: trend.slaCompliance[i],
    })),
    csat: trend.labels.map((label, i) => ({
      label,
      value: trend.csat[i],
    })),
    sentiment: trend.labels.map((label, i) => ({
      label,
      positive: trend.sentimentTrend.positive[i],
      neutral: trend.sentimentTrend.neutral[i],
      negative: trend.sentimentTrend.negative[i],
    })),
  } : null;

  return { chartData, isLoading, error, refresh };
}

export default useMetricsTrend;
