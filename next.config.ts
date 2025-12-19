import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Force cache busting on each build to prevent stale JavaScript
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
  // TypeScript errors will fail the build (ESLint config moved to separate file in Next.js 16)
  typescript: {
    ignoreBuildErrors: false,
  },
  // Output configuration for Vercel deployment
  output: 'standalone',
  // Experimental features
  experimental: {
    // Enable server actions
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Security headers + Cache control for real-time updates
  async headers() {
    return [
      // HTML pages - no caching to ensure real-time updates
      {
        source: '/:path*',
        headers: [
          // Security headers
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          // Cache control - prevent stale content
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'Expires', value: '0' },
          // Vercel edge cache control
          { key: 'Surrogate-Control', value: 'no-store' },
          { key: 'CDN-Cache-Control', value: 'no-store' },
          { key: 'Vercel-CDN-Cache-Control', value: 'no-store' },
        ],
      },
      // Static assets can be cached (JS, CSS, images)
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },
    ];
  },
};

export default nextConfig;
