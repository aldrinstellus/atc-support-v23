'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Ticket, CheckCircle2, Clock, Target, Users, Minus } from 'lucide-react';

interface OverviewData {
  overview: { ticketsToday: number; ticketsThisWeek: number; ticketsThisMonth: number };
  status: { open: number; resolved: number; total: number };
  performance: { avgResponseTime: number; slaComplianceRate: number; utilizationRate: number };
}

export default function ManagerOverviewWidget() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/manager/overview');
        const result = await response.json();
        if (result.success) setData(result.data);
      } catch (err) {
        console.error('Error fetching manager overview:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!data) return <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center"><p className="text-red-800">Failed to load overview data</p></div>;

  const metrics = [
    { title: 'Tickets Today', value: data.overview.ticketsToday, icon: Ticket, color: 'bg-blue-50 text-blue-600' },
    { title: 'Tickets This Week', value: data.overview.ticketsThisWeek, icon: Ticket, color: 'bg-purple-50 text-purple-600' },
    { title: 'Open Tickets', value: data.status.open, icon: Clock, subtitle: `${data.status.resolved} resolved`, color: 'bg-orange-50 text-orange-600' },
    { title: 'Avg Response Time', value: `${data.performance.avgResponseTime}m`, icon: Clock, color: 'bg-cyan-50 text-cyan-600' },
    { title: 'SLA Compliance', value: `${data.performance.slaComplianceRate}%`, icon: Target, color: 'bg-green-50 text-green-600' },
    { title: 'Team Utilization', value: `${data.performance.utilizationRate}%`, icon: Users, color: 'bg-indigo-50 text-indigo-600' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Manager Overview</h2>
        <span className="text-sm text-gray-500">Live updates</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-2 rounded-lg ${metric.color}`}><metric.icon className="w-5 h-5" /></div>
              <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
            {metric.subtitle && <p className="text-sm text-gray-500 mt-1">{metric.subtitle}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
