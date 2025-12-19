import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Health Check Endpoint
 *
 * Used by monitoring systems and load balancers to verify service health.
 * Checks application uptime, memory usage, and database connectivity.
 *
 * Returns:
 * - 200 OK: Service is healthy
 * - 503 Service Unavailable: Service is unhealthy (database disconnected)
 */
export async function GET() {
  const checks = {
    uptime: process.uptime(),
    timestamp: Date.now(),
    environment: process.env.NODE_ENV || 'development',
    version: '19.0.0',
    database: 'unknown' as 'connected' | 'disconnected' | 'unknown',
    memory: {
      heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024), // MB
      heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024), // MB
      rss: Math.round(process.memoryUsage().rss / 1024 / 1024), // MB
    },
  };

  try {
    // Check database connection with a simple query
    await prisma.$queryRaw`SELECT 1`;
    checks.database = 'connected';

    return NextResponse.json({
      status: 'healthy',
      checks,
      message: 'All systems operational',
    });
  } catch (error) {
    checks.database = 'disconnected';

    console.error('[Health Check] Database connection failed:', error);

    return NextResponse.json({
      status: 'unhealthy',
      checks,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 503 });
  }
}

// Allow health checks without authentication
export const dynamic = 'force-dynamic';
export const revalidate = 0;
