/**
 * Lighthouse CI Configuration
 *
 * Performance, accessibility, best practices, and SEO audits.
 * Target scores: 90+ for all metrics
 */

module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      url: [
        'http://localhost:3014/demo/c-level',
        'http://localhost:3014/demo/cs-manager',
        'http://localhost:3014/demo/support-agent',
      ],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
        },
        formFactor: 'desktop',
        screenEmulation: {
          mobile: false,
          width: 1920,
          height: 1080,
          deviceScaleFactor: 1,
          disabled: false,
        },
      },
    },
    assert: {
      assertions: {
        // Performance assertions
        'categories:performance': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 3000 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
        'speed-index': ['warn', { maxNumericValue: 3000 }],

        // Accessibility assertions
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'color-contrast': 'error',
        'heading-order': 'warn',
        'html-has-lang': 'error',
        'meta-viewport': 'error',

        // Best practices assertions
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'errors-in-console': 'warn',
        'uses-https': 'error',
        'uses-http2': 'warn',

        // SEO assertions
        'categories:seo': ['warn', { minScore: 0.9 }],
        'document-title': 'error',
        'meta-description': 'warn',
        'robots-txt': 'off',

        // PWA (optional)
        'categories:pwa': 'off',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
