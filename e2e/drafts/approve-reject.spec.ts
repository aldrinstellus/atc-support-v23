import { test, expect } from '@playwright/test';
import { loginAsAgent, createMockDraft, mockDraftGenerateAPI, mockDraftUpdateAPI, waitForDraftStatus, navigateToTicket } from './utils';

test.describe('Draft Approval and Rejection', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAgent(page);
  });

  test('should approve draft successfully', async ({ page }) => {
    const mockDraft = createMockDraft({ status: 'PENDING' });
    const approvedDraft = createMockDraft({ ...mockDraft, status: 'APPROVED' });
    await mockDraftGenerateAPI(page, mockDraft);
    await mockDraftUpdateAPI(page, mockDraft.id, approvedDraft);
    await navigateToTicket(page, mockDraft.ticketId);
    await page.click('[data-testid="generate-draft-button"]');
    await page.waitForSelector('[data-testid="draft-content"]', { state: 'visible' });
    await page.click('[data-testid="approve-draft-button"]');
    await waitForDraftStatus(page, mockDraft.id, 'APPROVED');
    await expect(page.locator('[data-testid="success-toast"]')).toContainText('Draft approved');
  });

  test('should reject draft with reason', async ({ page }) => {
    const rejectionReason = 'Content does not match company tone';
    const mockDraft = createMockDraft({ status: 'PENDING' });
    const rejectedDraft = createMockDraft({ ...mockDraft, status: 'REJECTED', rejectionReason });
    await mockDraftGenerateAPI(page, mockDraft);
    await mockDraftUpdateAPI(page, mockDraft.id, rejectedDraft);
    await navigateToTicket(page, mockDraft.ticketId);
    await page.click('[data-testid="generate-draft-button"]');
    await page.waitForSelector('[data-testid="draft-content"]', { state: 'visible' });
    await page.click('[data-testid="reject-draft-button"]');
    await expect(page.locator('[data-testid="rejection-modal"]')).toBeVisible();
    await page.fill('[data-testid="rejection-reason-input"]', rejectionReason);
    await page.click('[data-testid="confirm-rejection-button"]');
    await waitForDraftStatus(page, mockDraft.id, 'REJECTED');
  });

  test('should require rejection reason', async ({ page }) => {
    const mockDraft = createMockDraft({ status: 'PENDING' });
    await mockDraftGenerateAPI(page, mockDraft);
    await navigateToTicket(page, mockDraft.ticketId);
    await page.click('[data-testid="generate-draft-button"]');
    await page.waitForSelector('[data-testid="draft-content"]', { state: 'visible' });
    await page.click('[data-testid="reject-draft-button"]');
    await page.click('[data-testid="confirm-rejection-button"]');
    await expect(page.locator('[data-testid="rejection-reason-error"]')).toBeVisible();
  });

  test('should edit draft before approval', async ({ page }) => {
    const mockDraft = createMockDraft({ content: 'Original content', status: 'PENDING' });
    const editedContent = 'Edited content with improvements';
    const editedDraft = createMockDraft({ ...mockDraft, content: editedContent });
    await mockDraftGenerateAPI(page, mockDraft);
    await mockDraftUpdateAPI(page, mockDraft.id, editedDraft);
    await navigateToTicket(page, mockDraft.ticketId);
    await page.click('[data-testid="generate-draft-button"]');
    await page.waitForSelector('[data-testid="draft-content"]', { state: 'visible' });
    await page.click('[data-testid="edit-draft-button"]');
    const editor = page.locator('[data-testid="draft-editor"]');
    await expect(editor).toBeVisible();
    await editor.clear();
    await editor.fill(editedContent);
    await page.click('[data-testid="save-draft-button"]');
    await expect(page.locator('[data-testid="draft-content"]')).toContainText(editedContent);
  });

  test('should send approved draft', async ({ page }) => {
    const mockDraft = createMockDraft({ status: 'APPROVED' });
    const sentDraft = createMockDraft({ ...mockDraft, status: 'SENT' });
    await mockDraftGenerateAPI(page, mockDraft);
    await mockDraftUpdateAPI(page, mockDraft.id, sentDraft);
    await navigateToTicket(page, mockDraft.ticketId);
    await page.click('[data-testid="generate-draft-button"]');
    await page.waitForSelector('[data-testid="draft-content"]', { state: 'visible' });
    await page.click('[data-testid="send-draft-button"]');
    await page.click('[data-testid="confirm-send-button"]');
    await waitForDraftStatus(page, mockDraft.id, 'SENT');
    await expect(page.locator('[data-testid="success-toast"]')).toContainText('Draft sent');
  });

  test('should not send unapproved draft', async ({ page }) => {
    const mockDraft = createMockDraft({ status: 'PENDING' });
    await mockDraftGenerateAPI(page, mockDraft);
    await navigateToTicket(page, mockDraft.ticketId);
    await page.click('[data-testid="generate-draft-button"]');
    await page.waitForSelector('[data-testid="draft-content"]', { state: 'visible' });
    await expect(page.locator('[data-testid="send-draft-button"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="approve-draft-button"]')).toBeVisible();
  });
});
