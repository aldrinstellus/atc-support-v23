'use client';

import { useState } from 'react';
import { ArrowUpRight, UserCheck, AlertTriangle, Clock, MessageSquare, Check, Loader2 } from 'lucide-react';

interface SuggestedAction {
  id: string;
  type: 'escalate' | 'reassign' | 'close' | 'follow_up' | 'coaching';
  label: string;
  description: string;
  confidence: number;
  params?: Record<string, string>;
}

interface ChatActionButtonsProps {
  actions: SuggestedAction[];
  onExecute: (action: SuggestedAction) => Promise<void>;
}

const ACTION_ICONS: Record<string, React.ReactNode> = {
  escalate: <ArrowUpRight className="w-4 h-4" />,
  reassign: <UserCheck className="w-4 h-4" />,
  close: <Check className="w-4 h-4" />,
  follow_up: <Clock className="w-4 h-4" />,
  coaching: <MessageSquare className="w-4 h-4" />,
};

const ACTION_COLORS: Record<string, { bg: string; text: string; hover: string }> = {
  escalate: { bg: 'bg-red-50', text: 'text-red-700', hover: 'hover:bg-red-100' },
  reassign: { bg: 'bg-blue-50', text: 'text-blue-700', hover: 'hover:bg-blue-100' },
  close: { bg: 'bg-green-50', text: 'text-green-700', hover: 'hover:bg-green-100' },
  follow_up: { bg: 'bg-purple-50', text: 'text-purple-700', hover: 'hover:bg-purple-100' },
  coaching: { bg: 'bg-orange-50', text: 'text-orange-700', hover: 'hover:bg-orange-100' },
};

export default function ChatActionButtons({ actions, onExecute }: ChatActionButtonsProps) {
  const [executingId, setExecutingId] = useState<string | null>(null);
  const [executedIds, setExecutedIds] = useState<Set<string>>(new Set());

  if (!actions || actions.length === 0) return null;

  const handleExecute = async (action: SuggestedAction) => {
    if (executedIds.has(action.id)) return;

    setExecutingId(action.id);
    try {
      await onExecute(action);
      setExecutedIds(prev => new Set([...prev, action.id]));
    } catch (error) {
      console.error('Failed to execute action:', error);
    } finally {
      setExecutingId(null);
    }
  };

  return (
    <div className="mt-4 space-y-2">
      <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Suggested Actions</p>
      <div className="flex flex-wrap gap-2">
        {actions.map(action => {
          const colors = ACTION_COLORS[action.type] || ACTION_COLORS.follow_up;
          const isExecuting = executingId === action.id;
          const isExecuted = executedIds.has(action.id);

          return (
            <button
              key={action.id}
              onClick={() => handleExecute(action)}
              disabled={isExecuting || isExecuted}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isExecuted
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : `${colors.bg} ${colors.text} ${colors.hover}`
              }`}
              title={action.description}
            >
              {isExecuting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isExecuted ? (
                <Check className="w-4 h-4" />
              ) : (
                ACTION_ICONS[action.type]
              )}
              {isExecuted ? 'Done' : action.label}
              {!isExecuted && action.confidence >= 0.9 && (
                <span className="ml-1 px-1.5 py-0.5 bg-white bg-opacity-50 rounded text-xs">
                  {Math.round(action.confidence * 100)}%
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
