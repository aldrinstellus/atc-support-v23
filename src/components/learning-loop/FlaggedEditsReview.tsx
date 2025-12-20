'use client';

import { useState, useEffect } from 'react';
import { Check, X, Eye, AlertTriangle, Clock, User, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

interface FlaggedEdit {
  id: string;
  ticketId: string;
  originalResponse: string;
  editedResponse: string;
  editPercentage: number;
  agentId: string;
  agentName: string;
  category: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface FlaggedEditsReviewProps {
  onApprove: (editId: string) => Promise<void>;
  onReject: (editId: string, reason: string) => Promise<void>;
}

const MOCK_FLAGGED_EDITS: FlaggedEdit[] = [
  {
    id: 'edit-001',
    ticketId: 'TICK-1234',
    originalResponse: 'Thank you for contacting support. To reset your password, please visit our website and click on "Forgot Password". You will receive an email with instructions.',
    editedResponse: 'Hi there! I understand how frustrating it can be when you can\'t access your account. Here\'s how to reset your password:\n\n1. Go to login page\n2. Click "Forgot Password"\n3. Enter your email\n4. Check your inbox (and spam folder!)\n5. Click the reset link\n\nIf you don\'t receive the email within 5 minutes, let me know and I\'ll help you directly!',
    editPercentage: 65,
    agentId: 'agent-001',
    agentName: 'Sarah Chen',
    category: 'Password Reset',
    createdAt: '2024-01-15T10:30:00Z',
    status: 'pending',
  },
  {
    id: 'edit-002',
    ticketId: 'TICK-1235',
    originalResponse: 'Your subscription will renew on the date shown in your account settings.',
    editedResponse: 'Great question! Your subscription will automatically renew on January 25th. Here\'s what you can do:\n\n- View renewal date: Account Settings > Subscription\n- Cancel auto-renew: Same page, toggle off "Auto-renew"\n- Upgrade/downgrade: Click "Change Plan"\n\nNeed help with any of these? Just let me know!',
    editPercentage: 78,
    agentId: 'agent-002',
    agentName: 'Mike Johnson',
    category: 'Billing',
    createdAt: '2024-01-15T11:45:00Z',
    status: 'pending',
  },
  {
    id: 'edit-003',
    ticketId: 'TICK-1236',
    originalResponse: 'Please try clearing your browser cache and cookies.',
    editedResponse: 'I\'m sorry you\'re experiencing this issue! Let\'s try a few quick fixes:\n\n**Quick Fix (2 min):**\n1. Press Ctrl+Shift+Delete (Cmd+Shift+Delete on Mac)\n2. Select "Cached images and files"\n3. Click "Clear data"\n4. Refresh the page\n\n**If that doesn\'t work:**\n- Try incognito/private mode\n- Try a different browser\n\nLet me know if the issue persists!',
    editPercentage: 82,
    agentId: 'agent-003',
    agentName: 'Emily Davis',
    category: 'Technical',
    createdAt: '2024-01-15T14:20:00Z',
    status: 'pending',
  },
];

export default function FlaggedEditsReview({ onApprove, onReject }: FlaggedEditsReviewProps) {
  const [edits, setEdits] = useState<FlaggedEdit[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setEdits(MOCK_FLAGGED_EDITS);
      setLoading(false);
    }, 500);
  }, []);

  const handleApprove = async (editId: string) => {
    setProcessingId(editId);
    try {
      await onApprove(editId);
      setEdits(prev => prev.map(e => e.id === editId ? { ...e, status: 'approved' as const } : e));
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (editId: string) => {
    if (!rejectReason.trim()) return;
    setProcessingId(editId);
    try {
      await onReject(editId, rejectReason);
      setEdits(prev => prev.map(e => e.id === editId ? { ...e, status: 'rejected' as const } : e));
      setShowRejectModal(null);
      setRejectReason('');
    } finally {
      setProcessingId(null);
    }
  };

  const pendingEdits = edits.filter(e => e.status === 'pending');
  const processedEdits = edits.filter(e => e.status !== 'pending');

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
        <span className="ml-2 text-gray-600">Loading flagged edits...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-yellow-700">
            <Clock className="w-5 h-5" />
            <span className="font-medium">Pending Review</span>
          </div>
          <p className="text-3xl font-bold text-yellow-800 mt-2">{pendingEdits.length}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-700">
            <Check className="w-5 h-5" />
            <span className="font-medium">Approved</span>
          </div>
          <p className="text-3xl font-bold text-green-800 mt-2">{edits.filter(e => e.status === 'approved').length}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-700">
            <X className="w-5 h-5" />
            <span className="font-medium">Rejected</span>
          </div>
          <p className="text-3xl font-bold text-red-800 mt-2">{edits.filter(e => e.status === 'rejected').length}</p>
        </div>
      </div>

      {/* Pending Edits */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <h2 className="text-lg font-semibold text-gray-900">Flagged Edits (&gt;30% changes)</h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">Review significant edits for training data quality</p>
        </div>

        <div className="divide-y divide-gray-200">
          {pendingEdits.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No pending edits to review
            </div>
          ) : (
            pendingEdits.map(edit => (
              <div key={edit.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-sm text-gray-600">{edit.ticketId}</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{edit.category}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        edit.editPercentage > 70 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {edit.editPercentage}% changed
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      <span>{edit.agentName}</span>
                      <span className="text-gray-300">|</span>
                      <Clock className="w-4 h-4" />
                      <span>{new Date(edit.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setExpandedId(expandedId === edit.id ? null : edit.id)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                  >
                    {expandedId === edit.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {expandedId === edit.id && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-red-50 rounded-lg">
                      <p className="text-xs font-medium text-red-700 uppercase mb-2">Original Response</p>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{edit.originalResponse}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-xs font-medium text-green-700 uppercase mb-2">Edited Response</p>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{edit.editedResponse}</p>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => handleApprove(edit.id)}
                    disabled={processingId === edit.id}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    {processingId === edit.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    Approve for Training
                  </button>
                  <button
                    onClick={() => setShowRejectModal(edit.id)}
                    disabled={processingId === edit.id}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                    Reject
                  </button>
                  <button
                    onClick={() => setExpandedId(expandedId === edit.id ? null : edit.id)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    <Eye className="w-4 h-4" />
                    {expandedId === edit.id ? 'Hide' : 'Compare'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reject Edit</h3>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Please provide a reason for rejection..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              rows={4}
            />
            <div className="flex items-center justify-end gap-3 mt-4">
              <button
                onClick={() => { setShowRejectModal(null); setRejectReason(''); }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReject(showRejectModal)}
                disabled={!rejectReason.trim() || processingId === showRejectModal}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
