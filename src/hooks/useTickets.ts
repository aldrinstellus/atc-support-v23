'use client';

import { useState, useEffect, useCallback } from 'react';
import type {
  Ticket,
  ChartDataPoint,
  DashboardStats,
  PaginationState,
  TooltipData,
} from '@/types/ticket';
import { AVATAR_GRADIENTS } from '@/types/ticket';

// Mock data generator - Replace with actual API calls
const generateMockTickets = (): Ticket[] => {
  return [
    {
      id: 'T-1001',
      customer: {
        name: 'Javier Ramirez',
        email: 'javier@globe...',
        avatar: AVATAR_GRADIENTS.greenBlue
      },
      subject: 'Network Connectivity Issues',
      description: 'Unable to connect to the corporate network.',
      priority: 'High',
      status: 'AI-Suggested',
      dateTime: '2h ago',
      assignedAgent: null,
      sla: '15:40',
    },
    {
      id: 'T-1002',
      customer: {
        name: 'Anya Petrova',
        email: 'anya@start...',
        avatar: AVATAR_GRADIENTS.purplePink
      },
      subject: 'Printer Not Responding',
      description: 'Cannot print documents to the office printer.',
      priority: 'High',
      status: 'Completed',
      dateTime: 'Aug 23\n10:00am',
      assignedAgent: { initials: 'SD', name: 'Samantha Downing' },
      sla: '15:40',
    },
    {
      id: 'T-1003',
      customer: {
        name: 'Kenji Tanaka',
        email: 'kenji@cyb...',
        avatar: AVATAR_GRADIENTS.bluePurple
      },
      subject: 'Software Installation Failed',
      description: 'Error during installation of new software pac...',
      priority: 'Medium',
      status: 'Escalated',
      dateTime: 'Aug 24\n11:00am',
      assignedAgent: { initials: 'RK', name: 'Rahul Kohli' },
      sla: '15:40',
    },
    {
      id: 'T-1004',
      customer: {
        name: 'Ingrid Bergman',
        email: 'ingrid@oscor...',
        avatar: AVATAR_GRADIENTS.yellowOrange
      },
      subject: 'Email Access Blocked',
      description: 'Unable to access company email account.',
      priority: 'Medium',
      status: 'Escalated',
      dateTime: 'Aug 26\n9:15am',
      assignedAgent: { initials: 'LC', name: 'Laura Chen' },
      sla: '15:40',
    },
    {
      id: 'T-1005',
      customer: {
        name: 'Omar Hassan',
        email: 'omar@wayn...',
        avatar: AVATAR_GRADIENTS.yellowGreen
      },
      subject: 'VPN Connection Problems',
      description: 'Intermittent disconnections from the VPN.',
      priority: 'Low',
      status: 'Completed',
      dateTime: 'Aug 27\n2:45pm',
      assignedAgent: { initials: 'AD', name: "Anita D'Souza" },
      sla: '15:40',
    },
    {
      id: 'T-1006',
      customer: {
        name: 'Priya Sharma',
        email: 'priya@tyrell...',
        avatar: AVATAR_GRADIENTS.pinkRose
      },
      subject: 'Slow Application Performance',
      description: 'Applications are running slower than usual.',
      priority: 'Low',
      status: 'Escalated',
      dateTime: 'Aug 25\n12:30pm',
      assignedAgent: { initials: 'MG', name: 'Mark Garrison' },
      sla: '15:40',
    },
    {
      id: 'T-1007',
      customer: {
        name: 'Rajesh Patel',
        email: 'rajesh@um...',
        avatar: AVATAR_GRADIENTS.redPink
      },
      subject: 'File Server Access Denied',
      description: 'Cannot access shared files on the server.',
      priority: 'Low',
      status: 'Completed',
      dateTime: 'Aug 28\n1:00pm',
      assignedAgent: { initials: 'TK', name: 'Tina Kaur' },
      sla: '15:40',
    },
    {
      id: 'T-1008',
      customer: {
        name: 'Elena Rodriguez',
        email: 'elena@starkin...',
        avatar: AVATAR_GRADIENTS.indigoPurple
      },
      subject: 'Password Reset Required',
      description: 'Need to reset my password, locked out of ac...',
      priority: 'Low',
      status: 'Escalated',
      dateTime: 'Aug 23\n10:00am',
      assignedAgent: { initials: 'BF', name: 'Bradford Finn' },
      sla: '15:40',
    },
  ];
};

const generateChartData = (): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];

  // October (28-31)
  for (let i = 28; i <= 31; i++) {
    data.push({ day: i, month: 'Oct', value: Math.floor(Math.random() * 25) + 5 });
  }
  // November (1-30)
  for (let i = 1; i <= 30; i++) {
    data.push({ day: i, month: 'Nov', value: Math.floor(Math.random() * 35) + 10 });
  }
  // December (1-8)
  for (let i = 1; i <= 8; i++) {
    data.push({ day: i, month: 'Dec', value: Math.floor(Math.random() * 30) + 8 });
  }

  return data;
};

const generateTooltipData = (): TooltipData => ({
  newTickets: Math.floor(Math.random() * 15) + 15,
  completed: Math.floor(Math.random() * 10) + 8,
  avgResponseTime: `${Math.floor(Math.random() * 5) + 1}m`,
  sla: `${Math.floor(Math.random() * 30) + 70}%`,
});

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalTickets: 216,
    totalTicketsChange: 0.46,
    completion: 63,
    completionChange: 0.16,
    avgResponseTime: '10m',
    avgResponseTimeChange: -1.66,
    sla: 72,
    slaChange: 1.06,
  });
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 7,
    total: 120,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tickets
  const fetchTickets = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Replace with actual API call:
      // const response = await fetch('/api/tickets');
      // const data = await response.json();

      setTickets(generateMockTickets());
      setChartData(generateChartData());
    } catch (err) {
      setError('Failed to fetch tickets');
      console.error('Error fetching tickets:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Refresh tickets (for auto-refresh)
  const refreshTickets = useCallback(async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      setTickets(generateMockTickets());
    } catch (err) {
      console.error('Error refreshing tickets:', err);
    }
  }, []);

  // Get tooltip data for a specific bar
  const getTooltipData = useCallback((index: number): TooltipData => {
    // In real implementation, this would come from API
    return generateTooltipData();
  }, []);

  // Pagination handlers
  const goToPage = useCallback((page: number) => {
    setPagination(prev => ({ ...prev, page }));
  }, []);

  const nextPage = useCallback(() => {
    setPagination(prev => ({
      ...prev,
      page: Math.min(prev.page + 1, Math.ceil(prev.total / prev.pageSize)),
    }));
  }, []);

  const prevPage = useCallback(() => {
    setPagination(prev => ({
      ...prev,
      page: Math.max(prev.page - 1, 1),
    }));
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(refreshTickets, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refreshTickets]);

  return {
    tickets,
    chartData,
    stats,
    pagination,
    isLoading,
    error,
    fetchTickets,
    refreshTickets,
    getTooltipData,
    goToPage,
    nextPage,
    prevPage,
  };
}

export default useTickets;
