'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Agent, Team, AgentRole, AgentStatus } from '@/types/mock';

export interface AgentQueryOptions {
  teamId?: string;
  role?: AgentRole;
  status?: AgentStatus;
  search?: string;
  includeTeams?: boolean;
}

export function useAgents(options: AgentQueryOptions = {}) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Build query string
  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    if (options.teamId) params.set('teamId', options.teamId);
    if (options.role) params.set('role', options.role);
    if (options.status) params.set('status', options.status);
    if (options.search) params.set('search', options.search);
    if (options.includeTeams) params.set('includeTeams', 'true');

    return params.toString();
  }, [options]);

  const fetchAgents = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/mock/agents?${queryString}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch agents: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.success) {
        setAgents(result.data);
        if (result.teams) {
          setTeams(result.teams);
        }
      } else {
        throw new Error(result.error || 'Failed to fetch agents');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching agents:', err);
    } finally {
      setIsLoading(false);
    }
  }, [queryString]);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  return {
    agents,
    teams,
    total: agents.length,
    isLoading,
    error,
    refresh: fetchAgents,
  };
}

// Get agent workload distribution
export function useAgentWorkload() {
  const [data, setData] = useState<{
    agents: Array<Agent & { utilization: number }>;
    summary: {
      totalAgents: number;
      onlineAgents: number;
      averageUtilization: number;
      overloadedAgents: number;
    };
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkload = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/mock/agents/workload');
      if (!response.ok) {
        throw new Error(`Failed to fetch workload: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.success) {
        setData(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch workload');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching workload:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkload();
  }, [fetchWorkload]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(fetchWorkload, 30 * 1000);
    return () => clearInterval(interval);
  }, [fetchWorkload]);

  return { data, isLoading, error, refresh: fetchWorkload };
}

export default useAgents;
