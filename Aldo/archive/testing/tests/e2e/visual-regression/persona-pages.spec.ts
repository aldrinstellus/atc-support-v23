/**
 * Visual Regression Tests
 *
 * Tests visual consistency across personas and widgets using Playwright screenshots.
 * Compares against baseline images to detect unintended visual changes.
 */

import { test, expect, Page } from '@playwright/test';

describe('Visual Regression Tests', () => {
  test.describe('C-Level Executive Pages', () => {
    let page: Page;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
    });

    test.afterAll(async () => {
      await page.close();
    });

    test('C-Level landing page should match baseline', async () => {
      await page.goto('http://localhost:3014/demo/c-level');
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot('c-level-landing.png', {
        fullPage: true,
        maxDiffPixels: 100,
      });
    });

    test('C-Level executive summary widget should match baseline', async () => {
      await page.goto('http://localhost:3014/demo/c-level');
      await page.waitForLoadState('networkidle');

      const input = page.locator('[data-testid="chat-input"]');
      await input.fill('Show me executive summary');
      await input.press('Enter');

      await page.waitForSelector('[data-widget-type="executive-summary"]', {
        timeout: 15000,
      });

      await expect(page).toHaveScreenshot('c-level-executive-summary.png', {
        fullPage: true,
        maxDiffPixels: 100,
      });
    });

    test('C-Level SLA performance widget should match baseline', async () => {
      await page.goto('http://localhost:3014/demo/c-level');
      await page.waitForLoadState('networkidle');

      const input = page.locator('[data-testid="chat-input"]');
      await input.fill('Show me the SLA performance breakdown');
      await input.press('Enter');

      await page.waitForSelector('[data-widget-type="sla-performance-chart"]', {
        timeout: 15000,
      });

      await expect(page).toHaveScreenshot('c-level-sla-performance.png', {
        fullPage: true,
        maxDiffPixels: 100,
      });
    });
  });

  test.describe('CS Manager Pages', () => {
    let page: Page;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
    });

    test.afterAll(async () => {
      await page.close();
    });

    test('CS Manager landing page should match baseline', async () => {
      await page.goto('http://localhost:3014/demo/cs-manager');
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot('cs-manager-landing.png', {
        fullPage: true,
        maxDiffPixels: 100,
      });
    });

    test('CS Manager team workload widget should match baseline', async () => {
      await page.goto('http://localhost:3014/demo/cs-manager');
      await page.waitForLoadState('networkidle');

      const input = page.locator('[data-testid="chat-input"]');
      await input.fill("Show me my team's status");
      await input.press('Enter');

      await page.waitForSelector('[data-widget-type="team-workload-dashboard"]', {
        timeout: 15000,
      });

      await expect(page).toHaveScreenshot('cs-manager-team-workload.png', {
        fullPage: true,
        maxDiffPixels: 100,
      });
    });
  });

  test.describe('Support Agent Pages', () => {
    let page: Page;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
    });

    test.afterAll(async () => {
      await page.close();
    });

    test('Support Agent landing page should match baseline', async () => {
      await page.goto('http://localhost:3014/demo/support-agent');
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot('support-agent-landing.png', {
        fullPage: true,
        maxDiffPixels: 100,
      });
    });

    test('Support Agent dashboard widget should match baseline', async () => {
      await page.goto('http://localhost:3014/demo/support-agent');
      await page.waitForLoadState('networkidle');

      const input = page.locator('[data-testid="chat-input"]');
      await input.fill("What's on my plate today");
      await input.press('Enter');

      await page.waitForSelector('[data-widget-type="agent-dashboard"]', {
        timeout: 15000,
      });

      await expect(page).toHaveScreenshot('support-agent-dashboard.png', {
        fullPage: true,
        maxDiffPixels: 100,
      });
    });
  });

  test.describe('Responsive Design Visual Tests', () => {
    test('Mobile viewport - Support Agent', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('http://localhost:3014/demo/support-agent');
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot('support-agent-mobile.png', {
        fullPage: true,
        maxDiffPixels: 100,
      });
    });

    test('Tablet viewport - CS Manager', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('http://localhost:3014/demo/cs-manager');
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot('cs-manager-tablet.png', {
        fullPage: true,
        maxDiffPixels: 100,
      });
    });

    test('Desktop viewport - C-Level', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('http://localhost:3014/demo/c-level');
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot('c-level-desktop.png', {
        fullPage: true,
        maxDiffPixels: 100,
      });
    });
  });

  test.describe('Widget Component Visual Tests', () => {
    test('Executive Summary widget close-up', async ({ page }) => {
      await page.goto('http://localhost:3014/demo/c-level');
      await page.waitForLoadState('networkidle');

      const input = page.locator('[data-testid="chat-input"]');
      await input.fill('Show me executive summary');
      await input.press('Enter');

      const widget = page.locator('[data-widget-type="executive-summary"]');
      await widget.waitFor({ timeout: 15000 });

      await expect(widget).toHaveScreenshot('widget-executive-summary.png', {
        maxDiffPixels: 50,
      });
    });

    test('Team Workload widget close-up', async ({ page }) => {
      await page.goto('http://localhost:3014/demo/cs-manager');
      await page.waitForLoadState('networkidle');

      const input = page.locator('[data-testid="chat-input"]');
      await input.fill("Show me my team's status");
      await input.press('Enter');

      const widget = page.locator('[data-widget-type="team-workload-dashboard"]');
      await widget.waitFor({ timeout: 15000 });

      await expect(widget).toHaveScreenshot('widget-team-workload.png', {
        maxDiffPixels: 50,
      });
    });

    test('Agent Dashboard widget close-up', async ({ page }) => {
      await page.goto('http://localhost:3014/demo/support-agent');
      await page.waitForLoadState('networkidle');

      const input = page.locator('[data-testid="chat-input"]');
      await input.fill("What's on my plate today");
      await input.press('Enter');

      const widget = page.locator('[data-widget-type="agent-dashboard"]');
      await widget.waitFor({ timeout: 15000 });

      await expect(widget).toHaveScreenshot('widget-agent-dashboard.png', {
        maxDiffPixels: 50,
      });
    });
  });
});
