'use client';

import { useState } from 'react';
import { X, TrendingUp, Loader2 } from 'lucide-react';

interface BulkEscalateModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTicketIds: string[];
  onSuccess: () => void;
}

const PRIORITIES = [
  { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800' },
  { value: 'medium', label: 'Medium', color: 'bg-blue-100 text-blue-800' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
  { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-800' },
];

export default function BulkEscalateModal({ isOpen, onClose, selectedTicketIds, onSuccess }: BulkEscalateModalProps) {
  const [selectedPriority, setSelectedPriority] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!selectedPriority) { setError('Please select a priority level'); return; }
    if (!reason.trim()) { setError('Please provide an escalation reason'); return; }
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/bulk/escalate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketIds: selectedTicketIds, priority: selectedPriority, reason: reason.trim() }),
      });
      if (!response.ok) throw new Error('Failed to escalate tickets');
      onSuccess();
      onClose();
    } catch (err) {
      setError('Failed to escalate tickets. Please try again.');
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
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center"><TrendingUp className="w-5 h-5 text-red-600" /></div>
            <div><h2 className="text-lg font-semibold text-gray-900">Escalate Tickets</h2><p className="text-sm text-gray-500">{selectedTicketIds.length} ticket(s) selected</p></div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6">
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md"><p className="text-sm text-red-600">{error}</p></div>}
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {PRIORITIES.map((priority) => (
              <label key={priority.value} className={`flex items-center justify-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${selectedPriority === priority.value ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}>
                <input type="radio" name="priority" value={priority.value} checked={selectedPriority === priority.value} onChange={(e) => setSelectedPriority(e.target.value)} className="sr-only" />
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${priority.color}`}>{priority.label}</span>
              </label>
            ))}
          </div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Escalation Reason</label>
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Explain why these tickets need to be escalated..." rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 resize-none" />
        </div>
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button onClick={onClose} disabled={loading} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50">Cancel</button>
          <button onClick={handleSubmit} disabled={loading || !selectedPriority || !reason.trim()} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center gap-2">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}{loading ? 'Escalating...' : 'Escalate Tickets'}
          </button>
        </div>
      </div>
    </div>
  );
}
