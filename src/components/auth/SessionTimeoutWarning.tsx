'use client';

/**
 * Session Timeout Warning Component
 * PRD 1.2.1: Visual warning before session timeout
 *
 * Shows a modal dialog when session is about to expire,
 * allowing users to extend their session or log out.
 */

import { useEffect, useState } from 'react';
import { Clock, AlertTriangle, LogOut, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSessionTimeout } from '@/hooks/useSessionTimeout';

// ============================================================================
// Types
// ============================================================================

export interface SessionTimeoutWarningProps {
  // Whether session timeout is enabled
  enabled?: boolean;
  // Custom auto-save callback
  onAutoSave?: () => Promise<void>;
  // Custom timeout callback (before redirect)
  onTimeout?: () => void;
}

// ============================================================================
// Component
// ============================================================================

export function SessionTimeoutWarning({
  enabled = true,
  onAutoSave,
  onTimeout,
}: SessionTimeoutWarningProps) {
  const {
    showWarning,
    remainingTimeFormatted,
    extendSession,
    logout,
    dismissWarning,
    state,
  } = useSessionTimeout({
    enabled,
    onAutoSave,
    onTimeout,
  });

  const [isExtending, setIsExtending] = useState(false);

  // Get urgency level based on remaining time
  const getUrgencyLevel = (): 'normal' | 'warning' | 'critical' => {
    if (state.remainingMs <= 60000) return 'critical'; // Last minute
    if (state.remainingMs <= 120000) return 'warning'; // Last 2 minutes
    return 'normal';
  };

  const urgency = getUrgencyLevel();

  // Handle extend session
  const handleExtendSession = async () => {
    setIsExtending(true);
    try {
      extendSession();
    } finally {
      // Small delay for visual feedback
      setTimeout(() => setIsExtending(false), 500);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    if (!showWarning) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleExtendSession();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        dismissWarning();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showWarning]);

  return (
    <AnimatePresence>
      {showWarning && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            onClick={dismissWarning}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-full max-w-md"
          >
            <div
              className={`
                bg-card rounded-xl border shadow-2xl overflow-hidden
                ${urgency === 'critical' ? 'border-red-500/50' : 'border-amber-500/50'}
              `}
            >
              {/* Header */}
              <div
                className={`
                  px-6 py-4 flex items-center gap-3
                  ${urgency === 'critical' ? 'bg-red-500/10' : 'bg-amber-500/10'}
                `}
              >
                <div
                  className={`
                    p-2 rounded-full
                    ${urgency === 'critical' ? 'bg-red-500/20 text-red-500' : 'bg-amber-500/20 text-amber-500'}
                  `}
                >
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Session Expiring</h2>
                  <p className="text-sm text-muted-foreground">
                    Your session will expire soon due to inactivity
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                {/* Timer Display */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
                    <Clock
                      className={`h-5 w-5 ${urgency === 'critical' ? 'text-red-500 animate-pulse' : 'text-amber-500'}`}
                    />
                    <span
                      className={`
                        text-2xl font-mono font-bold
                        ${urgency === 'critical' ? 'text-red-500' : 'text-amber-500'}
                      `}
                    >
                      {remainingTimeFormatted}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Time remaining before automatic logout
                  </p>
                </div>

                {/* Warning Text */}
                <div className="bg-muted/50 rounded-lg p-4 mb-6 text-sm text-muted-foreground">
                  <p>
                    For security reasons, your session will end after a period of
                    inactivity. Any unsaved changes will be automatically saved
                    before logout.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={handleExtendSession}
                    disabled={isExtending}
                    className={`
                      flex-1 inline-flex items-center justify-center gap-2 px-4 py-3
                      rounded-lg font-medium transition-colors
                      ${
                        isExtending
                          ? 'bg-primary/50 text-primary-foreground cursor-wait'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'
                      }
                    `}
                  >
                    {isExtending ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Extending...</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4" />
                        <span>Stay Logged In</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={logout}
                    className="px-4 py-3 rounded-lg font-medium border border-border
                      hover:bg-muted transition-colors inline-flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log Out</span>
                  </button>
                </div>

                {/* Keyboard Hints */}
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">Enter</kbd> to stay logged in or{' '}
                  <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">Esc</kbd> to dismiss
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default SessionTimeoutWarning;
