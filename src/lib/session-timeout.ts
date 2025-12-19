/**
 * Session Timeout Service
 * PRD 1.2.1: Session Management with Idle Detection
 *
 * Provides configurable session timeout with:
 * - Idle detection (mouse, keyboard, scroll activity)
 * - Warning before timeout
 * - Auto-save before logout
 * - Session extension capability
 */

// ============================================================================
// Types
// ============================================================================

export interface SessionTimeoutConfig {
  // Session timeout duration in milliseconds
  timeoutMs: number;
  // Warning shown before timeout in milliseconds
  warningMs: number;
  // Events to consider as user activity
  activityEvents: string[];
  // Callback when session times out
  onTimeout?: () => void;
  // Callback when warning should be shown
  onWarning?: (remainingMs: number) => void;
  // Callback to auto-save work before timeout
  onAutoSave?: () => Promise<void>;
  // Whether to enable the timeout
  enabled: boolean;
}

export interface SessionState {
  lastActivity: Date;
  isWarning: boolean;
  isExpired: boolean;
  remainingMs: number;
  warningShownAt?: Date;
}

export type SessionTimeoutEvent =
  | 'activity'
  | 'warning'
  | 'timeout'
  | 'extended'
  | 'logout';

// ============================================================================
// Configuration
// ============================================================================

export const DEFAULT_SESSION_CONFIG: SessionTimeoutConfig = {
  // 30 minutes of inactivity
  timeoutMs: 30 * 60 * 1000,
  // Show warning 5 minutes before timeout
  warningMs: 5 * 60 * 1000,
  // Events to track for activity
  activityEvents: [
    'mousedown',
    'mousemove',
    'keydown',
    'scroll',
    'touchstart',
    'click',
    'wheel',
  ],
  enabled: true,
};

// Environment-based configuration
export const SESSION_CONFIG = {
  // Development: 60 minute timeout, 10 minute warning
  development: {
    timeoutMs: 60 * 60 * 1000,
    warningMs: 10 * 60 * 1000,
  },
  // Production: 30 minute timeout, 5 minute warning
  production: {
    timeoutMs: 30 * 60 * 1000,
    warningMs: 5 * 60 * 1000,
  },
  // Demo mode: 2 hour timeout, 15 minute warning
  demo: {
    timeoutMs: 2 * 60 * 60 * 1000,
    warningMs: 15 * 60 * 1000,
  },
} as const;

// ============================================================================
// Session Timeout Manager Class
// ============================================================================

type TimeoutCallback = () => void;
type WarningCallback = (remainingMs: number) => void;
type AutoSaveCallback = () => Promise<void>;
type Listener = (event: SessionTimeoutEvent, state: SessionState) => void;

class SessionTimeoutManager {
  private config: SessionTimeoutConfig;
  private state: SessionState;
  private timeoutTimer: ReturnType<typeof setTimeout> | null = null;
  private warningTimer: ReturnType<typeof setTimeout> | null = null;
  private checkInterval: ReturnType<typeof setInterval> | null = null;
  private listeners: Set<Listener> = new Set();
  private activityHandler: (() => void) | null = null;
  private isInitialized: boolean = false;

  constructor(config: Partial<SessionTimeoutConfig> = {}) {
    this.config = { ...DEFAULT_SESSION_CONFIG, ...config };
    this.state = {
      lastActivity: new Date(),
      isWarning: false,
      isExpired: false,
      remainingMs: this.config.timeoutMs,
    };
  }

  /**
   * Initialize session timeout tracking
   */
  initialize(): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    // Create activity handler
    this.activityHandler = this.throttle(() => {
      this.recordActivity();
    }, 1000);

    // Add activity listeners
    this.config.activityEvents.forEach((event) => {
      window.addEventListener(event, this.activityHandler!, { passive: true });
    });

    // Start checking session status
    this.startChecking();
    this.isInitialized = true;
  }

  /**
   * Cleanup and stop tracking
   */
  destroy(): void {
    if (!this.isInitialized) return;

    // Remove activity listeners
    if (this.activityHandler) {
      this.config.activityEvents.forEach((event) => {
        window.removeEventListener(event, this.activityHandler!);
      });
    }

    // Clear timers
    this.stopTimers();
    this.isInitialized = false;
  }

  /**
   * Record user activity
   */
  recordActivity(): void {
    if (!this.config.enabled) return;

    const now = new Date();
    this.state.lastActivity = now;

    // Reset warning state if activity detected
    if (this.state.isWarning) {
      this.state.isWarning = false;
      this.state.warningShownAt = undefined;
      this.emit('activity', this.state);
    }

    // Restart timers
    this.resetTimers();
  }

  /**
   * Extend session (e.g., when user clicks "Stay logged in")
   */
  extendSession(): void {
    this.recordActivity();
    this.state.isWarning = false;
    this.state.isExpired = false;
    this.emit('extended', this.state);
  }

  /**
   * Force logout
   */
  forceLogout(): void {
    this.state.isExpired = true;
    this.emit('logout', this.state);
    this.config.onTimeout?.();
  }

  /**
   * Get current session state
   */
  getState(): Readonly<SessionState> {
    return { ...this.state };
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<SessionTimeoutConfig>): void {
    this.config = { ...this.config, ...config };
    if (this.isInitialized) {
      this.resetTimers();
    }
  }

  /**
   * Subscribe to session events
   */
  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Set timeout callback
   */
  onTimeout(callback: TimeoutCallback): void {
    this.config.onTimeout = callback;
  }

  /**
   * Set warning callback
   */
  onWarning(callback: WarningCallback): void {
    this.config.onWarning = callback;
  }

  /**
   * Set auto-save callback
   */
  onAutoSave(callback: AutoSaveCallback): void {
    this.config.onAutoSave = callback;
  }

  // ============================================================================
  // Private Methods
  // ============================================================================

  private startChecking(): void {
    // Check session status every second
    this.checkInterval = setInterval(() => {
      this.checkSessionStatus();
    }, 1000);
  }

  private checkSessionStatus(): void {
    if (!this.config.enabled) return;

    const now = Date.now();
    const lastActivity = this.state.lastActivity.getTime();
    const elapsed = now - lastActivity;
    const remaining = this.config.timeoutMs - elapsed;

    this.state.remainingMs = Math.max(0, remaining);

    // Check if should show warning
    if (!this.state.isWarning && remaining <= this.config.warningMs && remaining > 0) {
      this.showWarning();
    }

    // Check if session expired
    if (remaining <= 0 && !this.state.isExpired) {
      this.handleTimeout();
    }
  }

  private showWarning(): void {
    this.state.isWarning = true;
    this.state.warningShownAt = new Date();
    this.emit('warning', this.state);
    this.config.onWarning?.(this.state.remainingMs);
  }

  private async handleTimeout(): Promise<void> {
    this.state.isExpired = true;

    // Try to auto-save before timeout
    if (this.config.onAutoSave) {
      try {
        await this.config.onAutoSave();
      } catch (error) {
        console.error('[SessionTimeout] Auto-save failed:', error);
      }
    }

    this.emit('timeout', this.state);
    this.config.onTimeout?.();
  }

  private resetTimers(): void {
    this.stopTimers();

    if (!this.config.enabled) return;

    // Set warning timer
    const warningDelay = this.config.timeoutMs - this.config.warningMs;
    this.warningTimer = setTimeout(() => {
      this.showWarning();
    }, warningDelay);

    // Set timeout timer
    this.timeoutTimer = setTimeout(() => {
      this.handleTimeout();
    }, this.config.timeoutMs);
  }

  private stopTimers(): void {
    if (this.timeoutTimer) {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
    if (this.warningTimer) {
      clearTimeout(this.warningTimer);
      this.warningTimer = null;
    }
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  private emit(event: SessionTimeoutEvent, state: SessionState): void {
    this.listeners.forEach((listener) => {
      try {
        listener(event, { ...state });
      } catch (error) {
        console.error('[SessionTimeout] Listener error:', error);
      }
    });
  }

  private throttle(fn: () => void, ms: number): () => void {
    let lastCall = 0;
    return () => {
      const now = Date.now();
      if (now - lastCall >= ms) {
        lastCall = now;
        fn();
      }
    };
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

let instance: SessionTimeoutManager | null = null;

/**
 * Get or create session timeout manager instance
 */
export function getSessionTimeoutManager(
  config?: Partial<SessionTimeoutConfig>
): SessionTimeoutManager {
  if (!instance) {
    instance = new SessionTimeoutManager(config);
  } else if (config) {
    instance.updateConfig(config);
  }
  return instance;
}

/**
 * Reset session timeout manager (useful for testing)
 */
export function resetSessionTimeoutManager(): void {
  if (instance) {
    instance.destroy();
    instance = null;
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Format remaining time for display
 */
export function formatRemainingTime(ms: number): string {
  if (ms <= 0) return '0:00';

  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Get environment-specific session config
 */
export function getEnvironmentConfig(): Partial<SessionTimeoutConfig> {
  const env = process.env.NODE_ENV || 'development';
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  if (isDemoMode) {
    return SESSION_CONFIG.demo;
  }

  return env === 'production' ? SESSION_CONFIG.production : SESSION_CONFIG.development;
}

export { SessionTimeoutManager };
