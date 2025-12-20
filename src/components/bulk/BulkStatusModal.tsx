'use client';

import { useState } from 'react';
import { X, AlertCircle, Loader2 } from 'lucide-react';

interface BulkStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTicketIds: string[];
  onSuccess: () => void;
}

const STATUSES = [
  { value: 'open', label: 'Open', color: 'bg-blue-100 text-blue-800' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'pending', label: 'Pending', color: 'bg-purple-100 text-purple-800' },
  { value: 'resolved', label: 'Resolved', color: 'bg-green-100 text-green-800' },
  { value: 'closed', label: 'Closed', color: 'bg-gray-100 text-gray-800' },
];

export default function BulkStatusModal({ isOpen, onClose, selectedTicketIds, onSuccess }: BulkStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!selectedStatus) { setError('Please select a status'); return; }
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/bulk/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketIds: selectedTicketIds, status: selectedStatus }),
      });
      if (!response.ok) throw new Error('Failed to update status');
      onSuccess();
      onClose();
    } catch (err) {
      setError('Failed to update status. Please try again.');
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
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center"><AlertCircle className="w-5 h-5 text-purple-600" /></div>
            <div><h2 className="text-lg font-semibold text-gray-900">Update Status</h2><p className="text-sm text-gray-500">{selectedTicketIds.length} ticket(s) selected</p></div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6">
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md"><p className="text-sm text-red-600">{error}</p></div>}
          <label className="block text-sm font-medium text-gray-700 mb-2">Select New Status</label>
          <div className="space-y-2">
            {STATUSES.map((status) => (
              <label key={status.value} className={`flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${selectedStatus === status.value ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                <input type="radio" name="status" value={status.value} checked={selectedStatus === status.value} onChange={(e) => setSelectedStatus(e.target.value)} className="mr-3" />
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>{status.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button onClick={onClose} disabled={loading} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50">Cancel</button>
          <button onClick={handleSubmit} disabled={loading || !selectedStatus} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}{loading ? 'Updating...' : 'Update Status'}
          </button>
        </div>
      </div>
    </div>
  );
}
