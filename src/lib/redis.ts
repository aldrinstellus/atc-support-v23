// @ts-nocheck

import Redis from 'ioredis'

// Get Redis URL from environment variables with fallback to localhost
const redisUrl = process.env.REDIS_URL || process.env.KV_URL || 'redis://localhost:6379'

/**
 * Redis Client Instance
 *
 * Singleton pattern to ensure only one connection to Redis.
 * Automatically reconnects on connection loss.
 *
 * Usage:
 * ```typescript
 * import { redis } from '@/lib/redis'
 *
 * // Set a value
 * await redis.set('key', 'value', 'EX', 300)
 *
 * // Get a value
 * const value = await redis.get('key')
 * ```
 */

let redis: Redis | null = null

export function getRedisClient(): Redis {
  if (redis) {
    return redis
  }

  redis = new Redis(redisUrl, {
    // Connection settings
    maxRetriesPerRequest: null,
    enableReadyCheck: true,
    enableOfflineQueue: true,

    // Timeout settings (in milliseconds)
    connectTimeout: 10000,
    commandTimeout: 5000,

    // Retry strategy
    retryStrategy: (times) => {
      const delay = Math.min(times * 50, 2000)
      return delay
    },

    // Exponential backoff for reconnection
    reconnectOnError: (err) => {
      const targetError = 'READONLY'
      if (err.message.includes(targetError)) {
        return true // Reconnect on READONLY error
      }
      return false
    },
  })

  // Connection event handlers
  redis.on('error', (error) => {
    console.error('[Redis] Connection error:', {
      message: error.message,
      code: error.code,
      timestamp: new Date().toISOString(),
    })
  })

  redis.on('connect', () => {
    console.log('[Redis] Connected to Redis server')
  })

  redis.on('ready', () => {
    console.log('[Redis] Redis client ready')
  })

  redis.on('reconnecting', () => {
    console.warn('[Redis] Attempting to reconnect...')
  })

  redis.on('close', () => {
    console.warn('[Redis] Connection closed')
  })

  return redis
}

/**
 * Health check for Redis connection
 *
 * Returns true if Redis is available, false otherwise
 */
export async function checkRedisHealth(): Promise<boolean> {
  try {
    const client = getRedisClient()
    const pong = await client.ping()
    return pong === 'PONG'
  } catch (error) {
    console.error('[Redis] Health check failed:', error instanceof Error ? error.message : 'Unknown error')
    return false
  }
}

/**
 * Close Redis connection
 *
 * Call this during graceful shutdown
 */
export async function closeRedis(): Promise<void> {
  if (redis) {
    try {
      await redis.quit()
      redis = null
      console.log('[Redis] Connection closed gracefully')
    } catch (error) {
      console.error('[Redis] Error closing connection:', error instanceof Error ? error.message : 'Unknown error')
    }
  }
}

export default getRedisClient
