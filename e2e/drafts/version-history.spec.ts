import { test, expect } from '@playwright/test';
import { loginAsAgent, createMockDraft, mockDraftGenerateAPI, navigateToTicket, type MockDraft } from './utils';

test.describe('Draft Version History', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAgent(page);
  });

  test('should view version history', async ({ page }) => {
    const versions: MockDraft[] = [
      createMockDraft({ id: 'draft-1', version: 1, content: 'Version 1', createdAt: '2025-12-10T10:00:00Z' }),
      createMockDraft({ id: 'draft-2', version: 2, content: 'Version 2', createdAt: '2025-12-10T11:00:00Z' }),
      createMockDraft({ id: 'draft-3', version: 3, content: 'Version 3', createdAt: '2025-12-10T12:00:00Z' }),
    ];
    await page.route('**/api/drafts/versions/**', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true, data: { versions } }) });
    });
    await mockDraftGenerateAPI(page, versions[2]);
    await navigateToTicket(page, versions[0].ticketId);
    await page.click('[data-testid="generate-draft-button"]');
    await page.waitForSelector('[data-testid="draft-content"]', { state: 'visible' });
    await page.click('[data-testid="version-history-button"]');
    await expect(page.locator('[data-testid="version-history-modal"]')).toBeVisible();
    await expect(page.locator('[data-testid^="version-item-"]')).toHaveCount(3);
  });

  test('should compare versions with diff view', async ({ page }) => {
    const version1 = createMockDraft({ id: 'draft-1', version: 1, content: 'Thank you for your message.' });
    const version2 = createMockDraft({ id: 'draft-2', version: 2, content: 'Thank you for contacting us.' });
    await page.route('**/api/drafts/versions/**', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true, data: { versions: [version2, version1] } }) });
    });
    await mockDraftGenerateAPI(page, version2);
    await navigateToTicket(page, version1.ticketId);
    await page.click('[data-testid="generate-draft-button"]');
    await page.waitForSelector('[data-testid="draft-content"]', { state: 'visible' });
    await page.click('[data-testid="version-history-button"]');
    await page.click('[data-testid="version-item-1"]');
    await page.click('[data-testid="compare-versions-button"]');
    await expect(page.locator('[data-testid="version-diff-view"]')).toBeVisible();
  });

  test('should regenerate with different tone', async ({ page }) => {
    const originalDraft = createMockDraft({ tone: 'professional', content: 'Thank you for your inquiry.' });
    const casualDraft = createMockDraft({ ...originalDraft, id: 'draft-2', version: 2, tone: 'casual', content: 'Thanks for reaching out!' });
    await mockDraftGenerateAPI(page, originalDraft);
    await page.route('**/api/drafts/regenerate', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true, data: casualDraft }) });
    });
    await navigateToTicket(page, originalDraft.ticketId);
    await page.click('[data-testid="generate-draft-button"]');
    await page.waitForSelector('[data-testid="draft-content"]', { state: 'visible' });
    await page.click('[data-testid="regenerate-draft-button"]');
    await expect(page.locator('[data-testid="tone-selector-modal"]')).toBeVisible();
    await page.click('[data-testid="tone-option-casual"]');
    await page.click('[data-testid="confirm-regenerate-button"]');
    await page.waitForSelector('[data-testid="draft-content"]', { state: 'visible' });
    await expect(page.locator('[data-testid="draft-tone"]')).toContainText('casual');
  });

  test('should restore previous version', async ({ page }) => {
    const version1Content = 'Original content from version 1';
    const version1 = createMockDraft({ id: 'draft-1', version: 1, content: version1Content });
    const version2 = createMockDraft({ id: 'draft-2', version: 2, content: 'Modified content' });
    await page.route('**/api/drafts/versions/**', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true, data: { versions: [version2, version1] } }) });
    });
    await page.route('**/api/drafts/restore/**', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true, data: { ...version1, id: 'draft-3', version: 3 } }) });
    });
    await mockDraftGenerateAPI(page, version2);
    await navigateToTicket(page, version1.ticketId);
    await page.click('[data-testid="generate-draft-button"]');
    await page.waitForSelector('[data-testid="draft-content"]', { state: 'visible' });
    await page.click('[data-testid="version-history-button"]');
    await page.click('[data-testid="version-item-1"]');
    await page.click('[data-testid="restore-version-button"]');
    await page.click('[data-testid="confirm-restore-button"]');
    await expect(page.locator('[data-testid="draft-content"]')).toContainText(version1Content);
    await expect(page.locator('[data-testid="success-toast"]')).toContainText('Version restored');
  });

  test('should handle version history API failure', async ({ page }) => {
    await page.route('**/api/drafts/versions/**', async (route) => {
      await route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ success: false, error: 'Failed to load' }) });
    });
    const mockDraft = createMockDraft();
    await mockDraftGenerateAPI(page, mockDraft);
    await navigateToTicket(page, mockDraft.ticketId);
    await page.click('[data-testid="generate-draft-button"]');
    await page.waitForSelector('[data-testid="draft-content"]', { state: 'visible' });
    await page.click('[data-testid="version-history-button"]');
    await expect(page.locator('[data-testid="error-toast"]')).toBeVisible();
  });
});
