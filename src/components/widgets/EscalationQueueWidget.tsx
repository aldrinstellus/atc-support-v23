'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, Clock, User, Building2, ArrowRight, CheckCircle } from 'lucide-react';

interface EscalationTicket {
  ticketId: string;
  title: string;
  description: string;
  priority: string;
  category: string;
  escalatedAt: string;
  hoursSinceEscalation: number;
  isUrgent: boolean;
  escalationReason: string;
  assignedTo: { id: string; name: string; email: string } | null;
  company: { id: string; name: string };
}

interface EscalationData {
  escalations: EscalationTicket[];
  summary: { total: number; urgent: number; critical: number; high: number };
}

export default function EscalationQueueWidget() {
  const [data, setData] = useState<EscalationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/manager/escalations');
        const result = await response.json();
        if (result.success) setData(result.data);
      } catch (err) {
        console.error('Error fetching escalations:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getPriorityColor = (priority: string) => priority === 'critical' ? 'bg-red-100 text-red-800' : priority === 'high' ? 'bg-orange-100 text-orange-800' : priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800';
  const formatTimeAgo = (hours: number) => hours < 1 ? 'Less than 1 hour ago' : hours < 24 ? `${hours} hours ago` : `${Math.floor(hours / 24)} days ago`;

  if (loading) return <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse"><div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div></div>;
  if (!data) return <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center"><p className="text-red-800">Failed to load escalations</p></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Escalation Queue</h2>
        {data.summary.urgent > 0 && <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium flex items-center gap-1"><AlertTriangle className="w-4 h-4" />{data.summary.urgent} urgent</span>}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4"><div className="text-sm text-gray-600 mb-1">Total</div><div className="text-2xl font-bold text-gray-900">{data.summary.total}</div></div>
        <div className="bg-red-50 rounded-lg border border-red-200 p-4"><div className="text-sm text-red-600 mb-1">Critical</div><div className="text-2xl font-bold text-red-900">{data.summary.critical}</div></div>
        <div className="bg-orange-50 rounded-lg border border-orange-200 p-4"><div className="text-sm text-orange-600 mb-1">High</div><div className="text-2xl font-bold text-orange-900">{data.summary.high}</div></div>
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4"><div className="text-sm text-gray-600 mb-1">Urgent</div><div className="text-2xl font-bold text-gray-900">{data.summary.urgent}</div></div>
      </div>
      {data.escalations.length === 0 ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center"><CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" /><p className="text-green-800 font-medium">No pending escalations</p></div>
      ) : (
        <div className="space-y-3">
          {data.escalations.slice(0, 5).map((ticket) => (
            <div key={ticket.ticketId} className={`bg-white rounded-lg border-2 p-4 ${ticket.isUrgent ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold uppercase ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</span>
                    {ticket.isUrgent && <span className="px-2 py-1 bg-red-600 text-white rounded text-xs font-semibold uppercase flex items-center gap-1"><AlertTriangle className="w-3 h-3" />URGENT</span>}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{ticket.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{ticket.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1"><Building2 className="w-4 h-4" />{ticket.company.name}</div>
                <div className="flex items-center gap-1"><Clock className="w-4 h-4" />{formatTimeAgo(ticket.hoursSinceEscalation)}</div>
                {ticket.assignedTo && <div className="flex items-center gap-1"><User className="w-4 h-4" />{ticket.assignedTo.name}</div>}
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mb-3"><p className="text-sm text-yellow-900"><strong>Reason:</strong> {ticket.escalationReason}</p></div>
              <div className="flex items-center justify-end gap-2">
                <button className="px-3 py-1.5 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700"><CheckCircle className="w-4 h-4 inline mr-1" />Resolve</button>
                <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700"><ArrowRight className="w-4 h-4 inline mr-1" />Reassign</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
