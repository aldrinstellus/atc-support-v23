# Redis Caching Infrastructure Setup

**Status**: ✅ Complete
**Version**: 1.0.0
**Last Updated**: November 12, 2025

---

## 📋 Overview

Redis caching infrastructure reduces database load and API call costs by caching frequently accessed data. This guide covers setup, usage, and deployment options.

**Key Benefits**:
- ⚡ **Faster Response Times** - Millisecond-level cache hits vs seconds for database queries
- 💰 **Cost Reduction** - Fewer API calls and database queries
- 📊 **Scalability** - Handle higher traffic without additional database resources
- 🔄 **Real-time Updates** - Optional cache invalidation for fresh data

---

## 🚀 Quick Start (5 Minutes)

### 1. **Install Dependencies**

```bash
npm install ioredis @types/ioredis
```

**Status**: ✅ Already installed

### 2. **Configure Environment**

Add to `.env.local`:

```bash
# Local development (requires Redis running locally)
REDIS_URL=redis://localhost:6379

# OR for Vercel production (use Vercel KV Store)
KV_URL=redis://:[password]@your-kv-store.vercel.com:port
```

### 3. **Start Redis Server**

#### Option A: Docker (Recommended for Local Dev)

```bash
# Start Redis in Docker
docker run -d -p 6379:6379 --name redis redis:latest

# Verify it's running
docker ps | grep redis

# Stop when done
docker stop redis
```

#### Option B: Homebrew (macOS)

```bash
# Install
brew install redis

# Start
brew services start redis

# Verify
redis-cli ping
# Expected output: PONG

# Stop
brew services stop redis
```

#### Option C: Linux (apt)

```bash
# Install
sudo apt-get update
sudo apt-get install redis-server

# Start
sudo systemctl start redis-server

# Verify
redis-cli ping

# Stop
sudo systemctl stop redis-server
```

### 4. **Verify Connection**

```bash
# Start your app
npm run dev

# Check logs for Redis connection message:
# [Redis] Connected to Redis server
# [Redis] Redis client ready
```

---

## 💻 Usage Examples

### Basic Caching

```typescript
import { cachedFetch } from '@/lib/cache'

// Cache an API response for 5 minutes
const userData = await cachedFetch(
  'user-profile-123',
  async () => {
    const response = await fetch('/api/users/123')
    return response.json()
  },
  300 // TTL in seconds
)
```

### String Caching (HTML, XML, etc.)

```typescript
import { cachedFetchString } from '@/lib/cache'

const htmlContent = await cachedFetchString(
  'dashboard-html',
  async () => {
    return await generateHtmlReport()
  },
  600 // Cache for 10 minutes
)
```

### Manual Cache Operations

```typescript
import {
  setCacheValue,
  getCacheValue,
  deleteCacheKey,
  clearCachePattern
} from '@/lib/cache'

// Set a value
await setCacheValue('config:theme', { mode: 'dark' }, 3600)

// Get a value
const theme = await getCacheValue('config:theme')

// Delete a key
await deleteCacheKey('config:theme')

// Clear pattern (e.g., all user caches)
await clearCachePattern('user:*')
```

### Cache Statistics

```typescript
import { getCacheStats } from '@/lib/cache'

const stats = await getCacheStats()
// {
//   connected: true,
//   keyCount: 42,
//   memoryUsage: '10.5M'
// }
```

### Health Check

```typescript
import { checkRedisHealth } from '@/lib/redis'

const isHealthy = await checkRedisHealth()
if (isHealthy) {
  console.log('Redis is ready')
} else {
  console.log('Redis is unavailable, using fallback')
}
```

---

## 🔧 Implementation Examples

### 1. **Cache API Responses**

```typescript
// src/app/api/users/[id]/route.ts
import { cachedFetch } from '@/lib/cache'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await cachedFetch(
    `user:${params.id}`,
    async () => {
      // Your database query or API call
      const user = await db.user.findUnique({
        where: { id: params.id }
      })
      return user
    },
    300 // Cache for 5 minutes
  )

  return NextResponse.json(user)
}
```

### 2. **Cache Widget Data**

```typescript
// src/lib/widgets/get-team-metrics.ts
import { cachedFetch } from '@/lib/cache'

export async function getTeamMetrics(teamId: string) {
  return cachedFetch(
    `metrics:team:${teamId}`,
    async () => {
      // Expensive aggregation query
      const metrics = await calculateTeamMetrics(teamId)
      return metrics
    },
    600 // Cache for 10 minutes
  )
}
```

### 3. **Cache Configuration**

```typescript
// src/lib/config.ts
import { cachedFetch } from '@/lib/cache'

export async function getAppConfig() {
  return cachedFetch(
    'config:app:main',
    async () => {
      // Load from database or external service
      return {
        features: ['feature1', 'feature2'],
        theme: 'dark',
        version: '17.0.0'
      }
    },
    3600 // Cache for 1 hour
  )
}
```

### 4. **Invalidate Cache on Updates**

```typescript
// src/app/api/users/[id]/update/route.ts
import { deleteCacheKey } from '@/lib/cache'
import { NextResponse } from 'next/server'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json()

  // Update database
  const user = await db.user.update({
    where: { id: params.id },
    data
  })

  // Invalidate cache
  await deleteCacheKey(`user:${params.id}`)

  return NextResponse.json(user)
}
```

---

## 🌍 Deployment Guide

### Local Development

1. **Start Redis**: `docker run -d -p 6379:6379 redis:latest`
2. **Set Environment**: `REDIS_URL=redis://localhost:6379`
3. **Run App**: `npm run dev`

### Staging/Testing

Use **Upstash** (Serverless Redis):

```bash
# Sign up at https://console.upstash.com
# Create Redis database
# Copy connection string

REDIS_URL=redis://:[password]@[host]:[port]
```

### Production (Vercel)

Use **Vercel KV Store** (built-in Redis):

```bash
# In Vercel Dashboard:
# 1. Go to Settings → Storage → Create Database
# 2. Choose "KV Store"
# 3. Create a new KV database
# 4. Copy KV_URL from Project Environment Variables
# 5. Add to Vercel environment variables

KV_URL=redis://:[password]@your-kv.vercel.com:PORT
```

**Alternative**: Use **Redis Cloud**:

```bash
# Sign up at https://redis.com/cloud/
# Create database
# Copy connection string

REDIS_URL=redis://:[password]@[host]:[port]
```

---

## 📊 Performance Guidelines

### Cache TTL (Time to Live) Recommendations

| Data Type | TTL | Use Case |
|-----------|-----|----------|
| User profiles | 300s (5m) | Frequently accessed, moderate changes |
| Dashboard metrics | 600s (10m) | Aggregated data, can be slightly stale |
| Configuration | 3600s (1h) | Rarely changes, safe to cache long |
| API responses | 300-600s | Depends on data freshness requirements |
| Search results | 600s (10m) | User queries, moderate volatility |
| Lists | 300s (5m) | Pagination, frequently changes |

### Cache Key Naming Convention

Use descriptive, hierarchical keys:

```
{resource}:{id}
user:123
ticket:TICK-001
team:engineering

{resource}:{id}:{action}
user:123:profile
ticket:TICK-001:history

{action}:{param}
search:support
metrics:team-performance
config:theme
```

### Cache Size Management

```typescript
import { getCacheStats } from '@/lib/cache'

// Monitor cache usage
const stats = await getCacheStats()
console.log(`Cache: ${stats.keyCount} keys, ${stats.memoryUsage} memory`)

// Set TTL to reasonable values to prevent unlimited growth
// Use REDIS keyspace notifications for cache warming
```

---

## 🔍 Monitoring & Debugging

### Health Check Endpoint

```typescript
// src/app/api/health/route.ts
import { checkRedisHealth, getRedisClient } from '@/lib/redis'
import { getCacheStats } from '@/lib/cache'

export async function GET() {
  const redisHealthy = await checkRedisHealth()
  const stats = await getCacheStats()

  return Response.json({
    status: 'ok',
    redis: {
      healthy: redisHealthy,
      ...stats
    }
  })
}
```

### Console Logging

The cache system automatically logs:
- Cache hits: `[Cache] Cache hit: { key, ttl }`
- Cache misses: `[Cache] Cache miss: { key, ttl }`
- Redis errors: `[Redis] Connection error: { message, code }`
- Health checks: `[Redis] Connected to Redis server`

### Common Issues

#### Redis Connection Refused

```
Error: connect ECONNREFUSED 127.0.0.1:6379
```

**Solution**:
```bash
# Start Redis server
docker run -d -p 6379:6379 redis:latest

# Verify it's listening
netstat -an | grep 6379
```

#### Timeout on Cache Operations

**Cause**: Redis server is slow or unresponsive

**Solution**:
```typescript
// Timeout is set to 5 seconds, increase if needed
// In src/lib/redis.ts, modify:
commandTimeout: 10000 // Increase from 5000
```

#### Memory Usage Growing

**Cause**: Cache keys not expiring

**Solution**:
```bash
# Monitor key expiration
redis-cli --scan --pattern "*" | wc -l  # Count keys

# Clear old keys
redis-cli FLUSHDB  # WARNING: Clears entire cache

# Or selectively
await clearCachePattern('old:*')
```

---

## 🔒 Security Best Practices

### 1. **Use Strong Passwords**

```bash
# For Redis Cloud / Upstash / Vercel KV
# Use auto-generated strong passwords (20+ chars, mixed case, numbers, symbols)
```

### 2. **Environment Variable Protection**

```bash
# .env.local (NEVER commit)
REDIS_URL=redis://:[password]@host:6379

# .env.example (public)
# REDIS_URL=redis://localhost:6379
```

### 3. **Network Security**

- **Local Dev**: Bind to localhost only (default: `127.0.0.1:6379`)
- **Production**: Use TLS/SSL with Redis Cloud or Vercel KV
- **Firewall**: Restrict Redis port to application servers only

### 4. **Sensitive Data**

```typescript
// DON'T cache passwords, tokens, or PII
// ❌ BAD
await setCacheValue('user:123:password', passwordHash)

// ✅ GOOD
await setCacheValue('user:123:profile', { name, email, role })
```

---

## 📈 Scaling & Optimization

### High-Traffic Optimization

1. **Increase Cache TTL** for stable data
2. **Use Async Caching** to avoid blocking requests
3. **Implement Cache Warming** for frequently accessed data
4. **Monitor Memory** and implement LRU eviction policy

### Redis Configuration for Production

```bash
# In redis.conf or Vercel KV settings
maxmemory-policy allkeys-lru  # Remove least recently used keys
timeout 300                    # Close idle connections
```

### Cluster Mode (For Very High Traffic)

```bash
# Use Vercel KV (built-in clustering) or
# Use Redis Cluster with multiple nodes
# Automatic failover and replication
```

---

## 🧪 Testing

### Unit Test Example

```typescript
// __tests__/cache.test.ts
import { cachedFetch, getCacheValue } from '@/lib/cache'
import { getRedisClient } from '@/lib/redis'

describe('Cache System', () => {
  beforeEach(async () => {
    // Clear cache before each test
    const redis = getRedisClient()
    await redis.flushdb()
  })

  it('should cache and retrieve values', async () => {
    const fetchFn = jest.fn(async () => ({ data: 'test' }))

    // First call - cache miss
    const result1 = await cachedFetch('test-key', fetchFn)
    expect(fetchFn).toHaveBeenCalledTimes(1)
    expect(result1).toEqual({ data: 'test' })

    // Second call - cache hit
    const result2 = await cachedFetch('test-key', fetchFn)
    expect(fetchFn).toHaveBeenCalledTimes(1)  // Not called again
    expect(result2).toEqual({ data: 'test' })
  })
})
```

---

## 📚 Additional Resources

### Official Documentation
- **Redis**: https://redis.io/docs/
- **IORedis**: https://github.com/luin/ioredis
- **Vercel KV**: https://vercel.com/docs/storage/vercel-kv
- **Upstash**: https://upstash.com/docs/redis/overview

### Tools & Monitoring
- **Redis CLI**: `redis-cli` - Command-line interface
- **Redis Insight**: https://redis.com/redis-enterprise/redis-insight/ - Visual management
- **Vercel Dashboard**: https://vercel.com/dashboard/stores/kv - Monitor KV store
- **Prometheus**: Export Redis metrics for monitoring

### Related Documentation
- [Environment Variables Guide](./docs/10-deployment/ENVIRONMENT-VARIABLES.md)
- [Performance Optimization](./docs/13-performance/OPTIMIZATION.md)
- [Deployment Guide](./docs/10-deployment/DEPLOYMENT.md)

---

## 📝 Changelog

### Version 1.0.0 (Nov 12, 2025)

- ✅ Redis client with connection pooling
- ✅ Cache wrapper with automatic fallback
- ✅ Health check and monitoring
- ✅ Multiple usage patterns (JSON, strings, patterns)
- ✅ Environment configuration (.env.example)
- ✅ Comprehensive documentation
- ✅ Production deployment guidance (Vercel KV, Redis Cloud, Upstash)

---

<div align="center">

**Redis Caching Infrastructure**

Reduce load, improve performance, scale confidently.

[View Source Code →](./src/lib/redis.ts) | [View Cache Wrapper →](./src/lib/cache.ts)

</div>
