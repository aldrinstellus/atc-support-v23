'use client';

import { useState } from 'react';
import { X, UserCheck, Loader2 } from 'lucide-react';
import { getMockDatabase } from '@/data/mock/database';
import type { Agent } from '@/types/mock';

interface BulkReassignModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTicketIds: string[];
  onSuccess: () => void;
}

export default function BulkReassignModal({ isOpen, onClose, selectedTicketIds, onSuccess }: BulkReassignModalProps) {
  const [selectedAgentId, setSelectedAgentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const db = getMockDatabase();
  const agents = db.agents;

  const handleSubmit = async () => {
    if (!selectedAgentId) { setError('Please select an agent'); return; }
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/bulk/reassign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketIds: selectedTicketIds, assignedAgentId: selectedAgentId }),
      });
      if (!response.ok) throw new Error('Failed to reassign tickets');
      onSuccess();
      onClose();
    } catch (err) {
      setError('Failed to reassign tickets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"><UserCheck className="w-5 h-5 text-blue-600" /></div>
            <div><h2 className="text-lg font-semibold text-gray-900">Reassign Tickets</h2><p className="text-sm text-gray-500">{selectedTicketIds.length} ticket(s) selected</p></div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6">
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md"><p className="text-sm text-red-600">{error}</p></div>}
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Agent</label>
          <select value={selectedAgentId} onChange={(e) => setSelectedAgentId(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Choose an agent...</option>
            {agents.slice(0, 20).map((agent: Agent) => <option key={agent.id} value={agent.id}>{agent.name} ({agent.email})</option>)}
          </select>
        </div>
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button onClick={onClose} disabled={loading} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50">Cancel</button>
          <button onClick={handleSubmit} disabled={loading || !selectedAgentId} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}{loading ? 'Reassigning...' : 'Reassign Tickets'}
          </button>
        </div>
      </div>
    </div>
  );
}
