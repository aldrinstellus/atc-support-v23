/**
 * Accessibility E2E Tests - WCAG 2.1 Level AA Compliance
 *
 * Tests application accessibility across all personas and key pages.
 * Uses axe-playwright for automated accessibility testing.
 *
 * WCAG 2.1 Level AA Requirements:
 * - Perceivable: Information must be presentable to users
 * - Operable: UI components must be operable
 * - Understandable: Information and operation must be understandable
 * - Robust: Content must be robust enough for assistive technologies
 */

import { test, expect, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

describe('Accessibility - WCAG 2.1 Level AA Compliance', () => {
  test.describe('C-Level Executive Pages', () => {
    let page: Page;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
    });

    test.afterAll(async () => {
      await page.close();
    });

    test('C-Level demo page should have no accessibility violations', async () => {
      await page.goto('http://localhost:3014/demo/c-level');
      await page.waitForLoadState('networkidle');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('C-Level page with loaded widget should have no violations', async () => {
      await page.goto('http://localhost:3014/demo/c-level');
      await page.waitForLoadState('networkidle');

      // Load executive summary widget
      const input = page.locator('[data-testid="chat-input"]');
      await input.fill('Show me executive summary');
      await input.press('Enter');

      // Wait for widget to render
      await page.waitForSelector('[data-widget-type="executive-summary"]', {
        timeout: 15000,
      });

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
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

    test('CS Manager demo page should have no accessibility violations', async () => {
      await page.goto('http://localhost:3014/demo/cs-manager');
      await page.waitForLoadState('networkidle');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('CS Manager page with team workload widget should have no violations', async () => {
      await page.goto('http://localhost:3014/demo/cs-manager');
      await page.waitForLoadState('networkidle');

      const input = page.locator('[data-testid="chat-input"]');
      await input.fill("Show me my team's status");
      await input.press('Enter');

      await page.waitForSelector('[data-widget-type="team-workload-dashboard"]', {
        timeout: 15000,
      });

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
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

    test('Support Agent demo page should have no accessibility violations', async () => {
      await page.goto('http://localhost:3014/demo/support-agent');
      await page.waitForLoadState('networkidle');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('Support Agent page with agent dashboard widget should have no violations', async () => {
      await page.goto('http://localhost:3014/demo/support-agent');
      await page.waitForLoadState('networkidle');

      const input = page.locator('[data-testid="chat-input"]');
      await input.fill("What's on my plate today");
      await input.press('Enter');

      await page.waitForSelector('[data-widget-type="agent-dashboard"]', {
        timeout: 15000,
      });

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });

  test.describe('Keyboard Navigation', () => {
    let page: Page;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
    });

    test.afterAll(async () => {
      await page.close();
    });

    test('should navigate using keyboard only', async () => {
      await page.goto('http://localhost:3014/demo/support-agent');
      await page.waitForLoadState('networkidle');

      // Tab to input field
      await page.keyboard.press('Tab');

      // Verify input is focused
      const focusedElement = await page.evaluate(() => document.activeElement?.getAttribute('data-testid'));
      expect(focusedElement).toBe('chat-input');

      // Type query
      await page.keyboard.type("What's on my plate");

      // Submit with Enter
      await page.keyboard.press('Enter');

      // Wait for widget
      await page.waitForSelector('[data-widget-type="agent-dashboard"]', {
        timeout: 15000,
      });
    });

    test('should support focus visible indicators', async () => {
      await page.goto('http://localhost:3014/demo/c-level');
      await page.waitForLoadState('networkidle');

      // Tab to navigate
      await page.keyboard.press('Tab');

      // Check for focus-visible styles
      const focusedElement = await page.locator(':focus-visible').first();
      expect(await focusedElement.count()).toBeGreaterThan(0);
    });
  });

  test.describe('Color Contrast', () => {
    test('should meet contrast requirements', async ({ page }) => {
      await page.goto('http://localhost:3014/demo/c-level');
      await page.waitForLoadState('networkidle');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2aa'])
        .disableRules(['color-contrast-enhanced']) // Test AA, not AAA
        .analyze();

      // Filter for color-contrast violations only
      const contrastViolations = accessibilityScanResults.violations.filter(
        v => v.id === 'color-contrast'
      );

      expect(contrastViolations).toEqual([]);
    });
  });

  test.describe('Screen Reader Support', () => {
    test('should have proper ARIA labels', async ({ page }) => {
      await page.goto('http://localhost:3014/demo/support-agent');
      await page.waitForLoadState('networkidle');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      // Check for ARIA violations
      const ariaViolations = accessibilityScanResults.violations.filter(
        v => v.id.includes('aria')
      );

      expect(ariaViolations).toEqual([]);
    });

    test('should have proper heading structure', async ({ page }) => {
      await page.goto('http://localhost:3014/demo/c-level');
      await page.waitForLoadState('networkidle');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a'])
        .analyze();

      // Check for heading order violations
      const headingViolations = accessibilityScanResults.violations.filter(
        v => v.id.includes('heading')
      );

      expect(headingViolations).toEqual([]);
    });
  });

  test.describe('Form Accessibility', () => {
    test('should have proper form labels', async ({ page }) => {
      await page.goto('http://localhost:3014/demo/support-agent');
      await page.waitForLoadState('networkidle');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      // Check for label violations
      const labelViolations = accessibilityScanResults.violations.filter(
        v => v.id === 'label' || v.id === 'form-field-multiple-labels'
      );

      expect(labelViolations).toEqual([]);
    });
  });

  test.describe('Interactive Elements', () => {
    test('should have sufficient click/touch targets', async ({ page }) => {
      await page.goto('http://localhost:3014/demo/cs-manager');
      await page.waitForLoadState('networkidle');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2aa'])
        .analyze();

      // Check for target size violations
      const targetViolations = accessibilityScanResults.violations.filter(
        v => v.id.includes('target-size')
      );

      expect(targetViolations).toEqual([]);
    });

    test('should have descriptive link text', async ({ page }) => {
      await page.goto('http://localhost:3014/demo/c-level');
      await page.waitForLoadState('networkidle');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a'])
        .analyze();

      // Check for link name violations
      const linkViolations = accessibilityScanResults.violations.filter(
        v => v.id === 'link-name'
      );

      expect(linkViolations).toEqual([]);
    });
  });

  test.describe('Responsive Design Accessibility', () => {
    test('should be accessible on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
      await page.goto('http://localhost:3014/demo/support-agent');
      await page.waitForLoadState('networkidle');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should be accessible on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 }); // iPad
      await page.goto('http://localhost:3014/demo/cs-manager');
      await page.waitForLoadState('networkidle');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });
});
