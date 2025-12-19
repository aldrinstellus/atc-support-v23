'use client';

/**
 * Session Timeout Hook
 * PRD 1.2.1: React hook for session timeout management
 *
 * Provides easy integration with React components for:
 * - Session state tracking
 * - Warning modal display
 * - Session extension
 * - Automatic logout
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { signOut } from 'next-auth/react';
import {
  getSessionTimeoutManager,
  resetSessionTimeoutManager,
  formatRemainingTime,
  getEnvironmentConfig,
  type SessionState,
  type SessionTimeoutConfig,
  type SessionTimeoutEvent,
} from '@/lib/session-timeout';

// ============================================================================
// Types
// ============================================================================

export interface UseSessionTimeoutOptions {
  // Override default timeout config
  config?: Partial<SessionTimeoutConfig>;
  // Callback when session times out
  onTimeout?: () => void;
  // Callback before logout for auto-save
  onAutoSave?: () => Promise<void>;
  // Whether to enable (default: true for authenticated users)
  enabled?: boolean;
  // Custom redirect URL after timeout
  redirectUrl?: string;
}

export interface UseSessionTimeoutReturn {
  // Current session state
  state: SessionState;
  // Formatted remaining time (e.g., "5:00")
  remainingTimeFormatted: string;
  // Whether to show warning modal
  showWarning: boolean;
  // Whether session has expired
  isExpired: boolean;
  // Extend session (reset timers)
  extendSession: () => void;
  // Force logout
  logout: () => void;
  // Dismiss warning (doesn't extend session)
  dismissWarning: () => void;
  // Manager instance for advanced use
  manager: ReturnType<typeof getSessionTimeoutManager>;
}

// ============================================================================
// Hook Implementation
// ============================================================================

export function useSessionTimeout(
  options: UseSessionTimeoutOptions = {}
): UseSessionTimeoutReturn {
  const {
    config,
    onTimeout,
    onAutoSave,
    enabled = true,
    redirectUrl = '/auth/signin?timeout=true',
  } = options;

  // Merge environment config with custom config
  const mergedConfig = {
    ...getEnvironmentConfig(),
    ...config,
    enabled,
  };

  // Get manager instance
  const manager = getSessionTimeoutManager(mergedConfig);

  // State
  const [state, setState] = useState<SessionState>(manager.getState());
  const [showWarning, setShowWarning] = useState(false);
  const warningDismissed = useRef(false);

  // Formatted remaining time
  const remainingTimeFormatted = formatRemainingTime(state.remainingMs);

  // Handle timeout
  const handleTimeout = useCallback(async () => {
    // Run custom onTimeout callback
    if (onTimeout) {
      onTimeout();
    }

    // Sign out and redirect
    await signOut({ callbackUrl: redirectUrl });
  }, [onTimeout, redirectUrl]);

  // Handle auto-save
  const handleAutoSave = useCallback(async () => {
    if (onAutoSave) {
      await onAutoSave();
    }
  }, [onAutoSave]);

  // Extend session
  const extendSession = useCallback(() => {
    manager.extendSession();
    setShowWarning(false);
    warningDismissed.current = false;
  }, [manager]);

  // Force logout
  const logout = useCallback(() => {
    manager.forceLogout();
  }, [manager]);

  // Dismiss warning (without extending session)
  const dismissWarning = useCallback(() => {
    setShowWarning(false);
    warningDismissed.current = true;
  }, []);

  // Setup effect
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Set callbacks
    manager.onTimeout(handleTimeout);
    manager.onAutoSave(handleAutoSave);

    // Subscribe to events
    const unsubscribe = manager.subscribe(
      (event: SessionTimeoutEvent, newState: SessionState) => {
        setState({ ...newState });

        switch (event) {
          case 'warning':
            if (!warningDismissed.current) {
              setShowWarning(true);
            }
            break;
          case 'extended':
          case 'activity':
            warningDismissed.current = false;
            setShowWarning(false);
            break;
          case 'timeout':
          case 'logout':
            setShowWarning(false);
            break;
        }
      }
    );

    // Initialize manager
    manager.initialize();

    // Cleanup
    return () => {
      unsubscribe();
      // Don't destroy manager on unmount - it should persist
      // resetSessionTimeoutManager();
    };
  }, [enabled, manager, handleTimeout, handleAutoSave]);

  // Update state periodically
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      setState(manager.getState());
    }, 1000);

    return () => clearInterval(interval);
  }, [enabled, manager]);

  return {
    state,
    remainingTimeFormatted,
    showWarning,
    isExpired: state.isExpired,
    extendSession,
    logout,
    dismissWarning,
    manager,
  };
}

// ============================================================================
// Cleanup utility
// ============================================================================

/**
 * Reset session timeout (useful for logout or testing)
 */
export function resetSessionTimeout(): void {
  resetSessionTimeoutManager();
}

export default useSessionTimeout;
