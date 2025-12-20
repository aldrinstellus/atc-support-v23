'use client';

import { useState } from 'react';
import { Link2, Unlink, RefreshCw, ExternalLink, Check, Loader2, AlertCircle } from 'lucide-react';

interface JiraTicketLinkProps {
  ticketId: string;
  linkedIssueKey?: string | null;
  onLink: (jiraIssueKey: string) => Promise<void>;
  onUnlink: () => Promise<void>;
  onSync: () => Promise<void>;
}

export default function JiraTicketLink({
  ticketId,
  linkedIssueKey,
  onLink,
  onUnlink,
  onSync,
}: JiraTicketLinkProps) {
  const [isLinking, setIsLinking] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [issueKey, setIssueKey] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLink = async () => {
    if (!issueKey.match(/^[A-Z]+-\d+$/)) {
      setError('Invalid issue key format (e.g., SUP-123)');
      return;
    }

    setIsLinking(true);
    setError('');
    try {
      await onLink(issueKey);
      setSuccess(`Linked to ${issueKey}`);
      setShowLinkInput(false);
      setIssueKey('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to link issue');
    } finally {
      setIsLinking(false);
    }
  };

  const handleUnlink = async () => {
    setIsLinking(true);
    setError('');
    try {
      await onUnlink();
      setSuccess('Unlinked from Jira');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to unlink issue');
    } finally {
      setIsLinking(false);
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    setError('');
    try {
      await onSync();
      setSuccess('Synced successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to sync');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Link2 className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">Jira Integration</span>
        </div>
        {linkedIssueKey && (
          <a
            href={`https://jira.example.com/browse/${linkedIssueKey}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
          >
            Open in Jira
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {error && (
        <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <span className="text-sm text-red-600">{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded flex items-center gap-2">
          <Check className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-600">{success}</span>
        </div>
      )}

      {linkedIssueKey ? (
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-gray-500">Linked Issue</p>
            <p className="font-mono font-medium text-blue-700">{linkedIssueKey}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm"
            >
              {isSyncing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Sync Now
            </button>
            <button
              onClick={handleUnlink}
              disabled={isLinking}
              className="flex items-center justify-center gap-2 px-3 py-2 text-red-600 border border-red-200 rounded-md hover:bg-red-50 disabled:opacity-50 text-sm"
            >
              {isLinking ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Unlink className="w-4 h-4" />
              )}
              Unlink
            </button>
          </div>
        </div>
      ) : showLinkInput ? (
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Jira Issue Key</label>
            <input
              type="text"
              value={issueKey}
              onChange={(e) => setIssueKey(e.target.value.toUpperCase())}
              placeholder="e.g., SUP-123"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleLink}
              disabled={isLinking || !issueKey}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm"
            >
              {isLinking ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Link2 className="w-4 h-4" />
              )}
              Link Issue
            </button>
            <button
              onClick={() => { setShowLinkInput(false); setIssueKey(''); setError(''); }}
              className="px-3 py-2 text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-sm text-gray-500 mb-3">No Jira issue linked</p>
          <button
            onClick={() => setShowLinkInput(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm mx-auto"
          >
            <Link2 className="w-4 h-4" />
            Link to Jira Issue
          </button>
        </div>
      )}
    </div>
  );
}
