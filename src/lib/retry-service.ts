/**
 * Retry Service
 * PRD 1.5.3: Retry Logic & Duplicate Prevention
 *
 * Provides exponential backoff retry logic and idempotency for email sending.
 */

// ============================================================================
// Types
// ============================================================================

export type RetryableErrorCode =
  | 'NETWORK_ERROR'
  | 'TIMEOUT'
  | 'RATE_LIMITED'
  | 'SERVER_ERROR'
  | 'CONNECTION_RESET'
  | 'SERVICE_UNAVAILABLE';

export type NonRetryableErrorCode =
  | 'INVALID_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'DUPLICATE_SEND'
  | 'VALIDATION_FAILED';

export type SendErrorCode = RetryableErrorCode | NonRetryableErrorCode;

export interface RetryConfig {
  maxAttempts: number;
  initialDelayMs: number;
  maxDelayMs: number;
  backoffMultiplier: number;
  jitterFactor: number; // 0-1, adds randomness to prevent thundering herd
}

export interface RetryResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  errorCode?: SendErrorCode;
  attempts: number;
  totalTimeMs: number;
  retriedErrors?: string[];
}

export interface SendAttempt {
  draftId: string;
  attemptNumber: number;
  timestamp: Date;
  success: boolean;
  errorCode?: SendErrorCode;
  errorMessage?: string;
  responseTimeMs: number;
}

export interface IdempotencyRecord {
  draftId: string;
  idempotencyKey: string;
  messageId?: string;
  status: 'pending' | 'success' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  expiresAt: Date;
}

// ============================================================================
// Configuration
// ============================================================================

export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  initialDelayMs: 1000,
  maxDelayMs: 30000,
  backoffMultiplier: 2,
  jitterFactor: 0.2,
};

export const IDEMPOTENCY_CONFIG = {
  // Time window to consider same request a duplicate
  DUPLICATE_WINDOW_MS: 5 * 60 * 1000, // 5 minutes
  // Time to keep idempotency records
  RECORD_EXPIRY_MS: 24 * 60 * 60 * 1000, // 24 hours
  // Maximum stored records before cleanup
  MAX_RECORDS: 1000,
} as const;

// ============================================================================
// In-Memory Storage (Demo Mode)
// ============================================================================

// Idempotency records to prevent duplicate sends
const idempotencyStore: Map<string, IdempotencyRecord> = new Map();

// Send attempts for audit trail
const sendAttemptsStore: Map<string, SendAttempt[]> = new Map();

// ============================================================================
// Error Classification
// ============================================================================

const RETRYABLE_HTTP_CODES = [408, 429, 500, 502, 503, 504];
const NON_RETRYABLE_HTTP_CODES = [400, 401, 403, 404, 422];

/**
 * Determine if an error is retryable based on HTTP status or error type
 */
export function isRetryableError(error: unknown, httpStatus?: number): boolean {
  // Check HTTP status first
  if (httpStatus !== undefined) {
    if (RETRYABLE_HTTP_CODES.includes(httpStatus)) return true;
    if (NON_RETRYABLE_HTTP_CODES.includes(httpStatus)) return false;
  }

  // Check error message patterns
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    const retryablePatterns = [
      'network',
      'timeout',
      'econnreset',
      'econnrefused',
      'socket hang up',
      'rate limit',
      'too many requests',
      'service unavailable',
      'temporarily unavailable',
    ];

    return retryablePatterns.some((pattern) => message.includes(pattern));
  }

  return false;
}

/**
 * Map error to appropriate error code
 */
export function getErrorCode(error: unknown, httpStatus?: number): SendErrorCode {
  if (httpStatus === 429) return 'RATE_LIMITED';
  if (httpStatus === 408) return 'TIMEOUT';
  if (httpStatus === 503 || httpStatus === 502) return 'SERVICE_UNAVAILABLE';
  if (httpStatus && httpStatus >= 500) return 'SERVER_ERROR';
  if (httpStatus === 401) return 'UNAUTHORIZED';
  if (httpStatus === 403) return 'FORBIDDEN';
  if (httpStatus === 404) return 'NOT_FOUND';
  if (httpStatus === 400 || httpStatus === 422) return 'VALIDATION_FAILED';

  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    if (message.includes('timeout')) return 'TIMEOUT';
    if (message.includes('network') || message.includes('econn')) return 'NETWORK_ERROR';
    if (message.includes('rate limit')) return 'RATE_LIMITED';
  }

  return 'NETWORK_ERROR';
}

// ============================================================================
// Retry Logic
// ============================================================================

/**
 * Calculate delay for next retry with exponential backoff and jitter
 */
export function calculateRetryDelay(
  attemptNumber: number,
  config: RetryConfig = DEFAULT_RETRY_CONFIG
): number {
  // Exponential backoff: delay = initialDelay * (multiplier ^ attempt)
  const exponentialDelay =
    config.initialDelayMs * Math.pow(config.backoffMultiplier, attemptNumber - 1);

  // Cap at max delay
  const cappedDelay = Math.min(exponentialDelay, config.maxDelayMs);

  // Add jitter to prevent thundering herd
  const jitter = cappedDelay * config.jitterFactor * Math.random();

  return Math.floor(cappedDelay + jitter);
}

/**
 * Execute a function with retry logic
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  config: RetryConfig = DEFAULT_RETRY_CONFIG
): Promise<RetryResult<T>> {
  const startTime = Date.now();
  const retriedErrors: string[] = [];
  let lastError: unknown;
  let lastErrorCode: SendErrorCode | undefined;

  for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
    try {
      const data = await fn();
      return {
        success: true,
        data,
        attempts: attempt,
        totalTimeMs: Date.now() - startTime,
        retriedErrors: retriedErrors.length > 0 ? retriedErrors : undefined,
      };
    } catch (error) {
      lastError = error;
      lastErrorCode = getErrorCode(error);

      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      // Check if we should retry
      if (attempt < config.maxAttempts && isRetryableError(error)) {
        retriedErrors.push(`Attempt ${attempt}: ${errorMessage}`);

        // Wait before retry
        const delay = calculateRetryDelay(attempt, config);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        // Non-retryable or last attempt
        break;
      }
    }
  }

  return {
    success: false,
    error: lastError instanceof Error ? lastError.message : 'Unknown error',
    errorCode: lastErrorCode,
    attempts: config.maxAttempts,
    totalTimeMs: Date.now() - startTime,
    retriedErrors: retriedErrors.length > 0 ? retriedErrors : undefined,
  };
}

// ============================================================================
// Idempotency & Duplicate Prevention
// ============================================================================

/**
 * Generate idempotency key for a draft send operation
 */
export function generateIdempotencyKey(
  draftId: string,
  toEmail: string,
  contentHash?: string
): string {
  const timestamp = Math.floor(Date.now() / IDEMPOTENCY_CONFIG.DUPLICATE_WINDOW_MS);
  const components = [draftId, toEmail, timestamp.toString()];
  if (contentHash) {
    components.push(contentHash);
  }
  return components.join(':');
}

/**
 * Simple hash function for content deduplication
 */
export function hashContent(content: string): string {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString(36);
}

/**
 * Check if a send operation is a duplicate
 */
export function checkDuplicateSend(idempotencyKey: string): IdempotencyRecord | null {
  cleanupExpiredRecords();

  const existing = idempotencyStore.get(idempotencyKey);
  if (!existing) return null;

  // Only consider it a duplicate if successful or still pending
  if (existing.status === 'success' || existing.status === 'pending') {
    return existing;
  }

  return null;
}

/**
 * Create or update idempotency record
 */
export function createIdempotencyRecord(
  draftId: string,
  idempotencyKey: string
): IdempotencyRecord {
  const record: IdempotencyRecord = {
    draftId,
    idempotencyKey,
    status: 'pending',
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + IDEMPOTENCY_CONFIG.RECORD_EXPIRY_MS),
  };

  idempotencyStore.set(idempotencyKey, record);
  return record;
}

/**
 * Update idempotency record status
 */
export function updateIdempotencyRecord(
  idempotencyKey: string,
  status: 'success' | 'failed',
  messageId?: string
): void {
  const record = idempotencyStore.get(idempotencyKey);
  if (record) {
    record.status = status;
    record.completedAt = new Date();
    if (messageId) {
      record.messageId = messageId;
    }
    idempotencyStore.set(idempotencyKey, record);
  }
}

/**
 * Get idempotency record
 */
export function getIdempotencyRecord(idempotencyKey: string): IdempotencyRecord | undefined {
  return idempotencyStore.get(idempotencyKey);
}

/**
 * Cleanup expired idempotency records
 */
export function cleanupExpiredRecords(): number {
  const now = Date.now();
  let removed = 0;

  for (const [key, record] of idempotencyStore.entries()) {
    if (record.expiresAt.getTime() < now) {
      idempotencyStore.delete(key);
      removed++;
    }
  }

  // If still over limit, remove oldest records
  if (idempotencyStore.size > IDEMPOTENCY_CONFIG.MAX_RECORDS) {
    const sortedEntries = [...idempotencyStore.entries()].sort(
      (a, b) => a[1].createdAt.getTime() - b[1].createdAt.getTime()
    );

    const toRemove = sortedEntries.slice(0, idempotencyStore.size - IDEMPOTENCY_CONFIG.MAX_RECORDS);
    for (const [key] of toRemove) {
      idempotencyStore.delete(key);
      removed++;
    }
  }

  return removed;
}

// ============================================================================
// Send Attempt Tracking
// ============================================================================

/**
 * Record a send attempt
 */
export function recordSendAttempt(attempt: SendAttempt): void {
  const existing = sendAttemptsStore.get(attempt.draftId) || [];
  existing.push(attempt);
  sendAttemptsStore.set(attempt.draftId, existing);
}

/**
 * Get send attempts for a draft
 */
export function getSendAttempts(draftId: string): SendAttempt[] {
  return sendAttemptsStore.get(draftId) || [];
}

/**
 * Get failed attempts that might need retry
 */
export function getFailedAttempts(draftId: string): SendAttempt[] {
  return getSendAttempts(draftId).filter((a) => !a.success);
}

/**
 * Check if draft has any successful sends
 */
export function hasSuccessfulSend(draftId: string): boolean {
  return getSendAttempts(draftId).some((a) => a.success);
}

/**
 * Clear send attempts for a draft
 */
export function clearSendAttempts(draftId: string): void {
  sendAttemptsStore.delete(draftId);
}

// ============================================================================
// Circuit Breaker Pattern
// ============================================================================

interface CircuitBreakerState {
  failures: number;
  lastFailure: Date | null;
  state: 'closed' | 'open' | 'half-open';
  nextAttempt: Date | null;
}

const CIRCUIT_BREAKER_CONFIG = {
  failureThreshold: 5,
  resetTimeoutMs: 60000, // 1 minute
  halfOpenSuccessThreshold: 2,
} as const;

const circuitBreakerState: CircuitBreakerState = {
  failures: 0,
  lastFailure: null,
  state: 'closed',
  nextAttempt: null,
};

/**
 * Check if circuit breaker allows requests
 */
export function isCircuitBreakerOpen(): boolean {
  if (circuitBreakerState.state === 'closed') return false;

  if (circuitBreakerState.state === 'open') {
    // Check if we should transition to half-open
    if (
      circuitBreakerState.nextAttempt &&
      Date.now() >= circuitBreakerState.nextAttempt.getTime()
    ) {
      circuitBreakerState.state = 'half-open';
      return false;
    }
    return true;
  }

  // Half-open allows requests
  return false;
}

/**
 * Record circuit breaker success
 */
export function recordCircuitBreakerSuccess(): void {
  if (circuitBreakerState.state === 'half-open') {
    circuitBreakerState.failures = 0;
    circuitBreakerState.state = 'closed';
    circuitBreakerState.nextAttempt = null;
  }
}

/**
 * Record circuit breaker failure
 */
export function recordCircuitBreakerFailure(): void {
  circuitBreakerState.failures++;
  circuitBreakerState.lastFailure = new Date();

  if (circuitBreakerState.failures >= CIRCUIT_BREAKER_CONFIG.failureThreshold) {
    circuitBreakerState.state = 'open';
    circuitBreakerState.nextAttempt = new Date(
      Date.now() + CIRCUIT_BREAKER_CONFIG.resetTimeoutMs
    );
  }
}

/**
 * Get circuit breaker status
 */
export function getCircuitBreakerStatus(): CircuitBreakerState {
  return { ...circuitBreakerState };
}

/**
 * Reset circuit breaker (for testing/admin)
 */
export function resetCircuitBreaker(): void {
  circuitBreakerState.failures = 0;
  circuitBreakerState.lastFailure = null;
  circuitBreakerState.state = 'closed';
  circuitBreakerState.nextAttempt = null;
}
