/**
 * Integration Tests for Health Check API Endpoint
 *
 * Tests the /api/health endpoint functionality including:
 * - Service health status
 * - Database connectivity
 * - Memory monitoring
 * - Uptime tracking
 */

import { GET } from '@/app/api/health/route';
import { NextRequest } from 'next/server';

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    $queryRaw: jest.fn(),
  },
}));

import { prisma } from '@/lib/prisma';

describe('Health Check API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/health', () => {
    test('should return 200 when all systems are healthy', async () => {
      // Mock successful database connection
      (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce([{ '?column?': 1 }]);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.status).toBe('healthy');
      expect(data.message).toBe('All systems operational');
      expect(data.checks).toBeDefined();
    });

    test('should return proper check structure', async () => {
      (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce([{ '?column?': 1 }]);

      const response = await GET();
      const data = await response.json();

      expect(data.checks).toHaveProperty('uptime');
      expect(data.checks).toHaveProperty('timestamp');
      expect(data.checks).toHaveProperty('environment');
      expect(data.checks).toHaveProperty('version');
      expect(data.checks).toHaveProperty('database');
      expect(data.checks).toHaveProperty('memory');

      expect(typeof data.checks.uptime).toBe('number');
      expect(typeof data.checks.timestamp).toBe('number');
      expect(typeof data.checks.version).toBe('string');
    });

    test('should report database as connected when successful', async () => {
      (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce([{ '?column?': 1 }]);

      const response = await GET();
      const data = await response.json();

      expect(data.checks.database).toBe('connected');
    });

    test('should return 503 when database is disconnected', async () => {
      // Mock database connection failure
      (prisma.$queryRaw as jest.Mock).mockRejectedValueOnce(
        new Error('Database connection failed')
      );

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(503);
      expect(data.status).toBe('unhealthy');
      expect(data.message).toBe('Database connection failed');
      expect(data.checks.database).toBe('disconnected');
      expect(data.error).toBeDefined();
    });

    test('should include memory statistics', async () => {
      (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce([{ '?column?': 1 }]);

      const response = await GET();
      const data = await response.json();

      expect(data.checks.memory).toHaveProperty('heapUsed');
      expect(data.checks.memory).toHaveProperty('heapTotal');
      expect(data.checks.memory).toHaveProperty('rss');

      expect(typeof data.checks.memory.heapUsed).toBe('number');
      expect(typeof data.checks.memory.heapTotal).toBe('number');
      expect(typeof data.checks.memory.rss).toBe('number');

      // Memory values should be positive
      expect(data.checks.memory.heapUsed).toBeGreaterThan(0);
      expect(data.checks.memory.heapTotal).toBeGreaterThan(0);
      expect(data.checks.memory.rss).toBeGreaterThan(0);
    });

    test('should include correct version number', async () => {
      (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce([{ '?column?': 1 }]);

      const response = await GET();
      const data = await response.json();

      expect(data.checks.version).toBe('14.0.0');
    });

    test('should include environment information', async () => {
      (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce([{ '?column?': 1 }]);

      const response = await GET();
      const data = await response.json();

      expect(data.checks.environment).toBe('test');
    });

    test('should track uptime', async () => {
      (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce([{ '?column?': 1 }]);

      const response = await GET();
      const data = await response.json();

      expect(typeof data.checks.uptime).toBe('number');
      expect(data.checks.uptime).toBeGreaterThanOrEqual(0);
    });

    test('should include timestamp', async () => {
      (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce([{ '?column?': 1 }]);

      const beforeTimestamp = Date.now();
      const response = await GET();
      const afterTimestamp = Date.now();
      const data = await response.json();

      expect(data.checks.timestamp).toBeGreaterThanOrEqual(beforeTimestamp);
      expect(data.checks.timestamp).toBeLessThanOrEqual(afterTimestamp);
    });

    test('should handle database timeout errors', async () => {
      (prisma.$queryRaw as jest.Mock).mockRejectedValueOnce(
        new Error('Connection timeout')
      );

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(503);
      expect(data.status).toBe('unhealthy');
      expect(data.error).toContain('timeout');
    });

    test('should handle unknown database errors gracefully', async () => {
      (prisma.$queryRaw as jest.Mock).mockRejectedValueOnce('Unknown error');

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(503);
      expect(data.status).toBe('unhealthy');
      expect(data.error).toBe('Unknown error');
    });
  });

  describe('Performance', () => {
    test('should respond within acceptable time', async () => {
      (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce([{ '?column?': 1 }]);

      const startTime = Date.now();
      await GET();
      const endTime = Date.now();

      const responseTime = endTime - startTime;
      expect(responseTime).toBeLessThan(1000); // Should respond within 1 second
    });
  });

  describe('Response Headers', () => {
    test('should return JSON content type', async () => {
      (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce([{ '?column?': 1 }]);

      const response = await GET();
      const contentType = response.headers.get('content-type');

      expect(contentType).toContain('application/json');
    });
  });
});
