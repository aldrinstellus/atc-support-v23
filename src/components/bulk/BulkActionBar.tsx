'use client';

import { X, UserCheck, AlertCircle, TrendingUp } from 'lucide-react';

interface BulkActionBarProps {
  selectedCount: number;
  onReassign: () => void;
  onUpdateStatus: () => void;
  onEscalate: () => void;
  onClearSelection: () => void;
}

export default function BulkActionBar({ selectedCount, onReassign, onUpdateStatus, onEscalate, onClearSelection }: BulkActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-6 py-4 flex items-center gap-4">
        <div className="flex items-center gap-2 pr-4 border-r border-gray-200">
          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">{selectedCount}</div>
          <span className="text-sm font-medium text-gray-700">{selectedCount} {selectedCount === 1 ? 'ticket' : 'tickets'} selected</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onReassign} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"><UserCheck className="w-4 h-4" />Reassign</button>
          <button onClick={onUpdateStatus} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"><AlertCircle className="w-4 h-4" />Update Status</button>
          <button onClick={onEscalate} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"><TrendingUp className="w-4 h-4" />Escalate</button>
        </div>
        <button onClick={onClearSelection} className="ml-2 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors" title="Clear selection"><X className="w-4 h-4" /></button>
      </div>
    </div>
  );
}
