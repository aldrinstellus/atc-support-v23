'use client';

import { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown, Star, AlertCircle, Trophy, Users } from 'lucide-react';

interface AgentPerformance {
  agentId: string;
  name: string;
  email: string;
  status: string;
  skillLevel: string;
  metrics: { ticketsHandled: number; resolvedTickets: number; avgResponseTime: number; satisfactionScore: number; slaComplianceRate: number };
  performance: { tier: string; isTopPerformer: boolean; needsAttention: boolean };
}

interface TeamData {
  agents: AgentPerformance[];
  summary: { totalAgents: number; activeAgents: number; topPerformers: number; needsAttention: number };
}

type SortField = 'tickets' | 'responseTime' | 'satisfaction' | 'sla';

export default function TeamKPIsWidget() {
  const [data, setData] = useState<TeamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortField>('tickets');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/manager/team-performance?sortBy=${sortBy}&order=${sortOrder}`);
        const result = await response.json();
        if (result.success) setData(result.data);
      } catch (err) {
        console.error('Error fetching team performance:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sortBy, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortBy === field) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    else { setSortBy(field); setSortOrder('desc'); }
  };

  const getStatusColor = (status: string) => status === 'available' ? 'bg-green-100 text-green-800' : status === 'busy' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800';

  if (loading && !data) return <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse"><div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div></div>;
  if (!data) return <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center"><p className="text-red-800">Failed to load team performance</p></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Team Performance</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600"><Users className="w-4 h-4" /><span>{data.summary.activeAgents}/{data.summary.totalAgents} active</span></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-lg p-4 border border-green-200"><div className="flex items-center gap-2 mb-2"><Trophy className="w-5 h-5 text-green-600" /><span className="text-sm font-medium text-green-800">Top Performers</span></div><p className="text-2xl font-bold text-green-900">{data.summary.topPerformers}</p></div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200"><div className="flex items-center gap-2 mb-2"><Users className="w-5 h-5 text-blue-600" /><span className="text-sm font-medium text-blue-800">Active Agents</span></div><p className="text-2xl font-bold text-blue-900">{data.summary.activeAgents}</p></div>
        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200"><div className="flex items-center gap-2 mb-2"><AlertCircle className="w-5 h-5 text-orange-600" /><span className="text-sm font-medium text-orange-800">Needs Attention</span></div><p className="text-2xl font-bold text-orange-900">{data.summary.needsAttention}</p></div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100" onClick={() => handleSort('tickets')}>Tickets {sortBy === 'tickets' && (sortOrder === 'asc' ? <ArrowUp className="w-4 h-4 inline" /> : <ArrowDown className="w-4 h-4 inline" />)}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100" onClick={() => handleSort('responseTime')}>Avg Response {sortBy === 'responseTime' && (sortOrder === 'asc' ? <ArrowUp className="w-4 h-4 inline" /> : <ArrowDown className="w-4 h-4 inline" />)}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100" onClick={() => handleSort('satisfaction')}>Satisfaction {sortBy === 'satisfaction' && (sortOrder === 'asc' ? <ArrowUp className="w-4 h-4 inline" /> : <ArrowDown className="w-4 h-4 inline" />)}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100" onClick={() => handleSort('sla')}>SLA {sortBy === 'sla' && (sortOrder === 'asc' ? <ArrowUp className="w-4 h-4 inline" /> : <ArrowDown className="w-4 h-4 inline" />)}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performance</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.agents.slice(0, 10).map((agent) => (
              <tr key={agent.agentId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                  <div className="flex items-center gap-2 mt-1"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>{agent.status}</span><span className="text-xs text-gray-500">{agent.skillLevel}</span></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{agent.metrics.ticketsHandled}</div><div className="text-xs text-gray-500">{agent.metrics.resolvedTickets} resolved</div></td>
                <td className="px-6 py-4 whitespace-nowrap"><div className={`text-sm font-medium ${agent.metrics.avgResponseTime < 30 ? 'text-green-600' : agent.metrics.avgResponseTime < 60 ? 'text-yellow-600' : 'text-red-600'}`}>{agent.metrics.avgResponseTime}m</div></td>
                <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /><span className="text-sm font-medium text-gray-900">{agent.metrics.satisfactionScore.toFixed(1)}</span></div></td>
                <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center gap-2"><div className="flex-1 bg-gray-200 rounded-full h-2 w-20"><div className={`h-2 rounded-full ${agent.metrics.slaComplianceRate >= 95 ? 'bg-green-500' : agent.metrics.slaComplianceRate >= 90 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${agent.metrics.slaComplianceRate}%` }}></div></div><span className="text-sm text-gray-600">{agent.metrics.slaComplianceRate}%</span></div></td>
                <td className="px-6 py-4 whitespace-nowrap">{agent.performance.isTopPerformer ? <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium"><Trophy className="w-3 h-3" />Top</div> : agent.performance.needsAttention ? <div className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium"><AlertCircle className="w-3 h-3" />Attention</div> : null}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
