import { Page, expect } from '@playwright/test';

export interface MockDraft {
  id: string;
  ticketId: string;
  version: number;
  content: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SENT';
  confidenceScore: number;
  tone: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export async function loginAsAgent(page: Page) {
  await page.goto('/auth/signin');
  await page.fill('input[type="email"]', 'agent@demo.com');
  await page.fill('input[type="password"]', 'demo');
  await page.click('button[type="submit"]');
  await page.waitForURL('/dashboard/drafts');
}

export function createMockDraft(overrides: Partial<MockDraft> = {}): MockDraft {
  return {
    id: 'draft-123',
    ticketId: 'ticket-456',
    version: 1,
    content: 'This is a generated draft response.',
    status: 'PENDING',
    confidenceScore: 0.85,
    tone: 'professional',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

export async function waitForDraftStatus(
  page: Page,
  draftId: string,
  expectedStatus: MockDraft['status'],
  timeout: number = 5000
) {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    const statusElement = page.locator(`[data-testid="draft-${draftId}-status"]`);
    const currentStatus = await statusElement.textContent();
    if (currentStatus?.includes(expectedStatus)) return;
    await page.waitForTimeout(500);
  }
  throw new Error(`Timeout waiting for draft ${draftId} to reach status ${expectedStatus}`);
}

export async function mockDraftGenerateAPI(page: Page, draft: MockDraft) {
  await page.route('**/api/drafts/generate', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, data: draft }),
    });
  });
}

export async function mockDraftUpdateAPI(page: Page, draftId: string, updatedDraft: MockDraft) {
  await page.route(`**/api/drafts/${draftId}`, async (route) => {
    if (route.request().method() === 'PATCH') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, data: updatedDraft }),
      });
    } else {
      await route.continue();
    }
  });
}

export async function mockAPIError(page: Page, endpoint: string, errorMessage: string = 'Internal server error', statusCode: number = 500) {
  await page.route(`**${endpoint}`, async (route) => {
    await route.fulfill({
      status: statusCode,
      contentType: 'application/json',
      body: JSON.stringify({ success: false, error: errorMessage }),
    });
  });
}

export async function navigateToTicket(page: Page, ticketId: string) {
  await page.goto(`/tickets/${ticketId}`);
  await page.waitForLoadState('networkidle');
}

export async function verifyDraftContent(page: Page, expectedContent: string) {
  const draftContent = page.locator('[data-testid="draft-content"]');
  await expect(draftContent).toContainText(expectedContent);
}

export async function verifyConfidenceScore(page: Page, expectedScore: number) {
  const scoreElement = page.locator('[data-testid="confidence-score"]');
  const scoreText = await scoreElement.textContent();
  const displayedScore = parseInt(scoreText?.replace('%', '') || '0') / 100;
  expect(displayedScore).toBeCloseTo(expectedScore, 2);
}
