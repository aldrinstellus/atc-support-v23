import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E Testing Configuration for Enterprise AI Support V20
 * Tests authentication, draft review, and multi-persona features
 */
export default defineConfig({
  // Test directory - includes both e2e/ and tests/e2e/
  testDir: './e2e',

  // Parallel execution
  fullyParallel: true,

  // Fail build if tests are left with .only
  forbidOnly: !!process.env.CI,

  // Retry configuration
  retries: process.env.CI ? 2 : 0,

  // Parallel workers
  workers: process.env.CI ? 1 : undefined,

  // Test reporters
  reporter: [
    ['html', { outputFolder: 'test-results/playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/test-results.json' }],
    ['list']
  ],

  // Global test configuration
  use: {
    // Base URL for V20 application
    baseURL: 'http://localhost:3020',

    // Capture screenshots on failure
    screenshot: 'only-on-failure',

    // Record videos for failing tests
    video: 'retain-on-failure',

    // Capture traces for debugging
    trace: 'on-first-retry',

    // Timeouts
    actionTimeout: 30000,
    navigationTimeout: 30000,
  },

  // Test projects
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],

  // Web server configuration
  webServer: {
    command: 'PORT=3020 npm run dev',
    url: 'http://localhost:3020',
    reuseExistingServer: true,
    timeout: 120000,
  },

  // Test timeouts
  timeout: 90000, // 90 seconds per test
  expect: {
    timeout: 15000 // 15 seconds for assertions
  }
});
