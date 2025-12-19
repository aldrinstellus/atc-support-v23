import { Page, expect, Locator } from '@playwright/test';

export type WidgetType =
  | 'executive-summary'
  | 'customer-risk-profile'
  | 'sla-performance-chart'
  | 'customer-risk-list'
  | 'ticket-detail'
  | 'meeting-scheduler'
  | 'meeting-confirmation'
  | 'team-workload-dashboard'
  | 'ticket-list'
  | 'agent-performance-comparison'
  | 'message-composer'
  | 'agent-dashboard'
  | 'call-prep-notes'
  | 'response-composer'
  | 'similar-tickets-analysis'
  | 'agent-performance-stats'
  | 'knowledge-base-search'
  | 'knowledge-article';

/**
 * Wait for a specific widget to appear and return its locator
 */
export async function waitForWidget(page: Page, widgetType: WidgetType, timeout = 15000): Promise<Locator> {
  const widget = page.locator(`[data-widget-type="${widgetType}"]`).first();
  await expect(widget).toBeVisible({ timeout });
  return widget;
}

/**
 * Assert that a widget is visible on the page
 */
export async function assertWidgetVisible(page: Page, widgetType: WidgetType) {
  const widget = await waitForWidget(page, widgetType);
  await expect(widget).toBeVisible();
}

/**
 * Assert that a widget contains specific text
 */
export async function assertWidgetContainsText(page: Page, widgetType: WidgetType, text: string) {
  const widget = await waitForWidget(page, widgetType);
  await expect(widget).toContainText(text);
}

/**
 * Assert widget has specific structure (e.g., number of cards/sections)
 */
export async function assertWidgetStructure(page: Page, widgetType: WidgetType, selector: string, count: number) {
  const widget = await waitForWidget(page, widgetType);
  const elements = widget.locator(selector);
  await expect(elements).toHaveCount(count);
}

/**
 * Assert no JavaScript console errors occurred
 */
export async function assertNoConsoleErrors(page: Page, messages: string[]) {
  const errors = messages.filter(msg => msg.includes('error') || msg.includes('Error'));
  expect(errors).toHaveLength(0);
}

/**
 * Wait for AI response to appear in chat
 */
export async function waitForAIResponse(page: Page, timeout = 15000) {
  // Wait for AI message to appear (last message in chat)
  const aiMessage = page.locator('[data-message-role="ai"]').last();
  await expect(aiMessage).toBeVisible({ timeout });
  return aiMessage;
}

/**
 * Assert AI response contains specific text
 */
export async function assertAIResponseContains(page: Page, text: string) {
  const aiMessage = await waitForAIResponse(page);
  await expect(aiMessage).toContainText(text);
}

/**
 * Get widget element by type
 */
export function getWidget(page: Page, widgetType: WidgetType): Locator {
  return page.locator(`[data-widget-type="${widgetType}"]`).first();
}
