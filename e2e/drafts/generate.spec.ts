import { test, expect } from '@playwright/test';
import { loginAsAgent, createMockDraft, mockDraftGenerateAPI, mockAPIError, navigateToTicket, verifyDraftContent, verifyConfidenceScore } from './utils';

test.describe('Draft Generation', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAgent(page);
  });

  test('should generate draft from ticket successfully', async ({ page }) => {
    const mockDraft = createMockDraft({ content: 'Thank you for contacting us.', confidenceScore: 0.92 });
    await mockDraftGenerateAPI(page, mockDraft);
    await navigateToTicket(page, mockDraft.ticketId);
    await page.click('[data-testid="generate-draft-button"]');
    await expect(page.locator('[data-testid="draft-loading"]')).toBeVisible();
    await page.waitForSelector('[data-testid="draft-content"]', { state: 'visible' });
    await verifyDraftContent(page, mockDraft.content);
  });

  test('should display confidence score correctly', async ({ page }) => {
    const mockDraft = createMockDraft({ confidenceScore: 0.87 });
    await mockDraftGenerateAPI(page, mockDraft);
    await navigateToTicket(page, mockDraft.ticketId);
    await page.click('[data-testid="generate-draft-button"]');
    await page.waitForSelector('[data-testid="confidence-score"]', { state: 'visible' });
    await verifyConfidenceScore(page, 0.87);
  });

  test('should show medium confidence warning', async ({ page }) => {
    const mockDraft = createMockDraft({ confidenceScore: 0.65 });
    await mockDraftGenerateAPI(page, mockDraft);
    await navigateToTicket(page, mockDraft.ticketId);
    await page.click('[data-testid="generate-draft-button"]');
    await page.waitForSelector('[data-testid="confidence-score"]', { state: 'visible' });
    await expect(page.locator('[data-testid="confidence-warning"]')).toBeVisible();
  });

  test('should handle API failure gracefully', async ({ page }) => {
    await mockAPIError(page, '/api/drafts/generate', 'Failed to generate draft', 500);
    await navigateToTicket(page, 'ticket-456');
    await page.click('[data-testid="generate-draft-button"]');
    await expect(page.locator('[data-testid="error-toast"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-toast"]')).toContainText('Failed to generate draft');
  });

  test('should show loading state during generation', async ({ page }) => {
    const mockDraft = createMockDraft();
    await page.route('**/api/drafts/generate', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true, data: mockDraft }) });
    });
    await navigateToTicket(page, mockDraft.ticketId);
    await page.click('[data-testid="generate-draft-button"]');
    await expect(page.locator('[data-testid="draft-loading-spinner"]')).toBeVisible();
    await expect(page.locator('[data-testid="generate-draft-button"]')).toBeDisabled();
  });

  test('should populate draft metadata correctly', async ({ page }) => {
    const mockDraft = createMockDraft({ tone: 'professional', version: 1 });
    await mockDraftGenerateAPI(page, mockDraft);
    await navigateToTicket(page, mockDraft.ticketId);
    await page.click('[data-testid="generate-draft-button"]');
    await page.waitForSelector('[data-testid="draft-metadata"]', { state: 'visible' });
    await expect(page.locator('[data-testid="draft-tone"]')).toContainText('professional');
    await expect(page.locator('[data-testid="draft-version"]')).toContainText('Version 1');
  });
});
