import { getRedisClient, checkRedisHealth } from './redis'

/**
 * Default TTL for cache entries in seconds
 * Set to 5 minutes (300 seconds)
 */
const DEFAULT_TTL = 300

/**
 * Cache wrapper for Redis with graceful fallback
 *
 * If Redis is unavailable, the function executes directly without caching.
 *
 * @param key - Cache key (should be unique and descriptive)
 * @param fetchFn - Async function to execute if cache miss
 * @param ttl - Time to live in seconds (default: 300 = 5 minutes)
 * @returns Cached value or newly fetched value
 *
 * @example
 * ```typescript
 * const data = await cachedFetch(
 *   'user-profile-123',
 *   async () => {
 *     const response = await fetch('https://api.example.com/user/123')
 *     return response.json()
 *   },
 *   300 // Cache for 5 minutes
 * )
 * ```
 */
export async function cachedFetch<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl: number = DEFAULT_TTL,
): Promise<T> {
  try {
    // Check if Redis is available
    const redisAvailable = await checkRedisHealth()

    if (!redisAvailable) {
      console.warn('[Cache] Redis unavailable, executing function directly')
      return await fetchFn()
    }

    const redis = getRedisClient()

    // Try to get from cache
    const cached = await redis.get(key)

    if (cached) {
      console.log('[Cache] Cache hit:', { key, ttl })
      try {
        return JSON.parse(cached) as T
      } catch {
        console.warn('[Cache] Failed to parse cached data, deleting:', { key })
        await redis.del(key)
        // Fall through to fetch
      }
    }

    console.log('[Cache] Cache miss:', { key, ttl })

    // Cache miss - execute function
    const data = await fetchFn()

    // Store in cache
    try {
      await redis.setex(key, ttl, JSON.stringify(data))
      console.log('[Cache] Data cached:', { key, ttl })
    } catch (cacheError) {
      console.warn('[Cache] Failed to cache data:', {
        key,
        error: cacheError instanceof Error ? cacheError.message : 'Unknown error',
      })
      // Don't throw - data is still valid, just not cached
    }

    return data
  } catch (error) {
    console.warn('[Cache] Unexpected error in cachedFetch:', {
      key,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    // Fallback: execute function directly
    return await fetchFn()
  }
}

/**
 * Cache wrapper for string values (no JSON serialization)
 *
 * @param key - Cache key
 * @param fetchFn - Async function returning a string
 * @param ttl - Time to live in seconds (default: 300)
 */
export async function cachedFetchString(
  key: string,
  fetchFn: () => Promise<string>,
  ttl: number = DEFAULT_TTL,
): Promise<string> {
  try {
    const redisAvailable = await checkRedisHealth()

    if (!redisAvailable) {
      return await fetchFn()
    }

    const redis = getRedisClient()
    const cached = await redis.get(key)

    if (cached) {
      console.log('[Cache] String cache hit:', { key })
      return cached
    }

    const data = await fetchFn()
    await redis.setex(key, ttl, data)
    console.log('[Cache] String cached:', { key, ttl })

    return data
  } catch (error) {
    console.warn('[Cache] String fetch error:', {
      key,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    return await fetchFn()
  }
}

/**
 * Manually set a cache value
 *
 * @param key - Cache key
 * @param value - Value to cache (will be JSON stringified)
 * @param ttl - Time to live in seconds (default: 300)
 */
export async function setCacheValue<T>(key: string, value: T, ttl: number = DEFAULT_TTL): Promise<void> {
  try {
    const redisAvailable = await checkRedisHealth()

    if (!redisAvailable) {
      console.warn('[Cache] Redis unavailable, value not cached')
      return
    }

    const redis = getRedisClient()
    await redis.setex(key, ttl, JSON.stringify(value))
    console.log('[Cache] Value set:', { key, ttl })
  } catch (error) {
    console.warn('[Cache] Failed to set cache value:', {
      key,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

/**
 * Get a cached value
 *
 * @param key - Cache key
 * @returns Parsed value or null if not found
 */
export async function getCacheValue<T>(key: string): Promise<T | null> {
  try {
    const redisAvailable = await checkRedisHealth()

    if (!redisAvailable) {
      return null
    }

    const redis = getRedisClient()
    const cached = await redis.get(key)

    if (!cached) {
      return null
    }

    try {
      return JSON.parse(cached) as T
    } catch {
      console.warn('[Cache] Failed to parse cached value:', { key })
      await redis.del(key)
      return null
    }
  } catch (error) {
    console.warn('[Cache] Failed to get cache value:', {
      key,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    return null
  }
}

/**
 * Delete a cache entry
 *
 * @param key - Cache key
 */
export async function deleteCacheKey(key: string): Promise<void> {
  try {
    const redisAvailable = await checkRedisHealth()

    if (!redisAvailable) {
      return
    }

    const redis = getRedisClient()
    await redis.del(key)
    console.log('[Cache] Key deleted:', { key })
  } catch (error) {
    console.warn('[Cache] Failed to delete cache key:', {
      key,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

/**
 * Clear all cache entries matching a pattern
 *
 * @param pattern - Redis key pattern (e.g., "user:*")
 */
export async function clearCachePattern(pattern: string): Promise<void> {
  try {
    const redisAvailable = await checkRedisHealth()

    if (!redisAvailable) {
      return
    }

    const redis = getRedisClient()
    const keys = await redis.keys(pattern)

    if (keys.length > 0) {
      await redis.del(...keys)
      console.log('[Cache] Pattern cleared:', { pattern, deletedCount: keys.length })
    }
  } catch (error) {
    console.warn('[Cache] Failed to clear cache pattern:', {
      pattern,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

/**
 * Get cache statistics
 *
 * @returns Object with cache statistics or null if Redis unavailable
 */
export async function getCacheStats(): Promise<{
  connected: boolean
  keyCount: number
  memoryUsage: string | null
} | null> {
  try {
    const redisAvailable = await checkRedisHealth()

    if (!redisAvailable) {
      return null
    }

    const redis = getRedisClient()
    const info = await redis.info('memory')
    const dbSize = await redis.dbsize()

    const memoryMatch = info.match(/used_memory_human:(.+?)\r/)
    const memoryUsage = memoryMatch ? memoryMatch[1] : null

    return {
      connected: true,
      keyCount: dbSize,
      memoryUsage,
    }
  } catch (error) {
    console.warn('[Cache] Failed to get cache stats:', {
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    return null
  }
}
