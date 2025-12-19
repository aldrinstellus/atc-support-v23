import { test, expect, Page } from '@playwright/test';
import { navigateToPersona, clearBrowserState } from '../helpers/persona-helper';
import {
  assertWidgetVisible,
  assertWidgetContainsText,
} from '../helpers/widget-assertions';
import { sendQuery, executeConversationFlow } from '../helpers/multi-step-helper';

/**
 * C-Level Executive Persona E2E Tests
 *
 * Tests 6 single-step queries + 1 multi-step conversation (Schedule Call → Yes → Book)
 * Total: 7 test cases covering 6 unique widgets
 */
test.describe('C-Level Executive Persona Tests', () => {
  let page: Page;
  const consoleMessages: string[] = [];

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    // Capture console messages for error detection
    page.on('console', (msg) => {
      consoleMessages.push(`${msg.type()}: ${msg.text()}`);
    });

    // Navigate to C-Level persona demo page
    await navigateToPersona(page, 'c-level');
    await clearBrowserState(page);
    await navigateToPersona(page, 'c-level');
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Q1: Executive Summary Widget', async () => {
    console.log('🎯 Testing: "Show me executive summary"');

    await sendQuery(page, 'Show me executive summary');

    // Wait for widget to render
    await assertWidgetVisible(page, 'executive-summary');

    // Validate widget content
    await assertWidgetContainsText(page, 'executive-summary', 'Executive Summary');
    await assertWidgetContainsText(page, 'executive-summary', 'SLA Performance');
    await assertWidgetContainsText(page, 'executive-summary', 'Customer Health');

    console.log('✅ Executive Summary Widget rendered successfully');
  });

  test('Q2: Customer Risk Profile Widget', async () => {
    console.log('🎯 Testing: "Tell me more about Acme Corp"');

    await sendQuery(page, 'Tell me more about Acme Corp');

    // Wait for widget
    await assertWidgetVisible(page, 'customer-risk-profile');

    // Validate content
    await assertWidgetContainsText(page, 'customer-risk-profile', 'Acme Corporation');
    await assertWidgetContainsText(page, 'customer-risk-profile', 'Risk');

    console.log('✅ Customer Risk Profile Widget rendered successfully');
  });

  test('Q3: SLA Performance Chart Widget', async () => {
    console.log('🎯 Testing: "Show me the SLA performance breakdown"');

    await sendQuery(page, 'Show me the SLA performance breakdown');

    // Wait for widget
    await assertWidgetVisible(page, 'sla-performance-chart');

    // Validate content
    await assertWidgetContainsText(page, 'sla-performance-chart', 'SLA Performance');

    console.log('✅ SLA Performance Chart Widget rendered successfully');
  });

  test('Q4: Customer Risk List Widget', async () => {
    console.log('🎯 Testing: "Show me high-risk customers"');

    await sendQuery(page, 'Show me high-risk customers');

    // Wait for widget
    await assertWidgetVisible(page, 'customer-risk-list');

    // Validate content
    await assertWidgetContainsText(page, 'customer-risk-list', 'High-Risk Customers');

    console.log('✅ Customer Risk List Widget rendered successfully');
  });

  test('Q5: Ticket Detail Widget', async () => {
    console.log('🎯 Testing: "Show me ticket TICK-001"');

    await sendQuery(page, 'Show me ticket TICK-001');

    // Wait for widget
    await assertWidgetVisible(page, 'ticket-detail');

    // Validate content
    await assertWidgetContainsText(page, 'ticket-detail', 'TICK-001');

    console.log('✅ Ticket Detail Widget rendered successfully');
  });

  test('Q6-Q8: Multi-Step - Schedule Executive Call (3 steps)', async () => {
    console.log('🎯 Testing Multi-Step Conversation: Schedule Executive Call');

    // Define 3-step conversation flow
    const conversationSteps = [
      {
        userQuery: 'Schedule executive call',
        expectedResponse: 'Would you like me to check',
        waitForResponse: true,
      },
      {
        userQuery: 'yes',
        expectedWidget: 'meeting-scheduler' as const,
        waitForResponse: true,
      },
      {
        userQuery: 'book tomorrow at 1pm',
        expectedWidget: 'meeting-confirmation' as const,
        waitForResponse: true,
      },
    ];

    // Execute multi-step flow
    const results = await executeConversationFlow(page, conversationSteps);

    // Validate all steps passed
    expect(results.every(r => r.passed)).toBe(true);
    expect(results).toHaveLength(3);

    // Additional validation: meeting-confirmation should show time
    await assertWidgetContainsText(page, 'meeting-confirmation', '1:00 PM');

    console.log('✅ Multi-Step Conversation Flow completed successfully');
  });

  test('Validate No Console Errors', async () => {
    const errors = consoleMessages.filter(
      (msg) => msg.includes('error') && !msg.includes('404') // Ignore 404s
    );

    if (errors.length > 0) {
      console.error('❌ Console Errors Found:', errors);
    }

    expect(errors).toHaveLength(0);
    console.log('✅ No console errors detected');
  });
});
