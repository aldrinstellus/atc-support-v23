import { test, expect, Page } from '@playwright/test';
import { navigateToPersona, clearBrowserState } from '../helpers/persona-helper';
import {
  waitForWidget,
  assertWidgetVisible,
  assertWidgetContainsText,
  assertAIResponseContains,
  getWidget,
} from '../helpers/widget-assertions';
import { sendQuery, clickWidgetButton } from '../helpers/multi-step-helper';

/**
 * Support Agent Persona E2E Tests
 *
 * Tests 9 single-step queries + 3 button actions
 * Total: 12 test cases covering 9 unique widgets + interactive buttons
 */
test.describe('Support Agent Persona Tests', () => {
  let page: Page;
  const consoleMessages: string[] = [];

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    // Capture console messages
    page.on('console', (msg) => {
      consoleMessages.push(`${msg.type()}: ${msg.text()}`);
    });

    // Navigate to Support Agent persona demo page
    await navigateToPersona(page, 'support-agent');
    await clearBrowserState(page);
    await navigateToPersona(page, 'support-agent');
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Q1: Agent Dashboard Widget', async () => {
    console.log('🎯 Testing: "Good morning, what\'s on my plate today?"');

    await sendQuery(page, "Good morning, what's on my plate today?");

    // Wait for widget
    await assertWidgetVisible(page, 'agent-dashboard');

    // Validate content (should NOT show agent name for "My Dashboard")
    await assertWidgetContainsText(page, 'agent-dashboard', 'My Dashboard');

    console.log('✅ Agent Dashboard Widget rendered successfully');
  });

  test('Q2: Ticket Detail Widget', async () => {
    console.log('🎯 Testing: "Show me ticket TICK-001"');

    await sendQuery(page, 'Show me ticket TICK-001');

    // Wait for widget
    await assertWidgetVisible(page, 'ticket-detail');

    // Validate ticket ID
    await assertWidgetContainsText(page, 'ticket-detail', 'TICK-001');

    console.log('✅ Ticket Detail Widget rendered successfully');
  });

  test('Q3: Call Prep Notes Widget', async () => {
    console.log('🎯 Testing: "Help me prepare for the call with Acme Corp"');

    await sendQuery(page, 'Help me prepare for the call with Acme Corp');

    // Wait for widget
    await assertWidgetVisible(page, 'call-prep-notes');

    // Validate content
    await assertWidgetContainsText(page, 'call-prep-notes', 'Call Preparation');

    console.log('✅ Call Prep Notes Widget rendered successfully');
  });

  test('Q4: Response Composer Widget', async () => {
    console.log('🎯 Testing: "Draft a response for this angry customer"');

    await sendQuery(page, 'Draft a response for this angry customer');

    // Wait for widget
    await assertWidgetVisible(page, 'response-composer');

    // Validate content
    await assertWidgetContainsText(page, 'response-composer', 'Response Composer');

    console.log('✅ Response Composer Widget rendered successfully');
  });

  test('Q5: Interactive Button - Send Response', async () => {
    console.log('🎯 Testing Interactive Button: Send Response');

    // Response composer should be visible from previous test, or render again
    const responseComposer = getWidget(page, 'response-composer');
    const isVisible = await responseComposer.isVisible().catch(() => false);

    if (!isVisible) {
      await sendQuery(page, 'Draft a response for this angry customer');
      await waitForWidget(page, 'response-composer');
    }

    // Click "Send Response" button
    await clickWidgetButton(page, 'response-composer', 'Send Response');

    // Validate AI confirmation
    await assertAIResponseContains(page, 'Response sent successfully');

    console.log('✅ Send Response button action validated');
  });

  test('Q6: Interactive Button - Edit and Customize', async () => {
    console.log('🎯 Testing Interactive Button: Edit and Customize');

    // Render response composer again
    await sendQuery(page, 'Draft a response for this angry customer');
    await waitForWidget(page, 'response-composer');

    // Click "Edit & Customize" button
    await clickWidgetButton(page, 'response-composer', 'Edit & Customize');

    // Validate AI response (button triggers response and widget re-render)
    await assertAIResponseContains(page, 'response');

    console.log('✅ Edit and Customize button action validated');
  });

  test('Q7: Interactive Button - Regenerate Response', async () => {
    console.log('🎯 Testing Interactive Button: Regenerate Response');

    // Render response composer again
    await sendQuery(page, 'Draft a response for this angry customer');
    await waitForWidget(page, 'response-composer');

    // Click "Regenerate" button
    await clickWidgetButton(page, 'response-composer', 'Regenerate');

    // Validate AI response
    await assertAIResponseContains(page, 'Regenerating response');

    console.log('✅ Regenerate Response button action validated');
  });

  test('Q8: Ticket List Widget', async () => {
    console.log('🎯 Testing: "Show me my tickets"');

    await sendQuery(page, 'Show me my tickets');

    // Wait for widget
    await assertWidgetVisible(page, 'ticket-list');

    // Validate content
    await assertWidgetContainsText(page, 'ticket-list', 'My Tickets');

    console.log('✅ Ticket List Widget rendered successfully');
  });

  test('Q9: Similar Tickets Analysis Widget', async () => {
    console.log('🎯 Testing: "Find similar tickets I\'ve resolved"');

    await sendQuery(page, "Find similar tickets I've resolved");

    // Wait for widget
    await assertWidgetVisible(page, 'similar-tickets-analysis');

    // Validate content
    await assertWidgetContainsText(page, 'similar-tickets-analysis', 'Your Resolution Patterns');

    console.log('✅ Similar Tickets Analysis Widget rendered successfully');
  });

  test('Q10: Agent Performance Stats Widget', async () => {
    console.log('🎯 Testing: "Show me my performance stats"');

    await sendQuery(page, 'Show me my performance stats');

    // Wait for widget
    await assertWidgetVisible(page, 'agent-performance-stats');

    // Validate content
    await assertWidgetContainsText(page, 'agent-performance-stats', 'Your Performance');

    console.log('✅ Agent Performance Stats Widget rendered successfully');
  });

  test('Q11: Knowledge Base Search Widget', async () => {
    console.log('🎯 Testing: "How do I troubleshoot authentication issues?"');

    await sendQuery(page, 'How do I troubleshoot authentication issues?');

    // Wait for widget
    await assertWidgetVisible(page, 'knowledge-base-search');

    // Validate content
    await assertWidgetContainsText(page, 'knowledge-base-search', 'Knowledge Base');

    console.log('✅ Knowledge Base Search Widget rendered successfully');
  });

  test('Q12: Knowledge Article Widget with Dynamic ID', async () => {
    console.log('🎯 Testing: "Open KB-107" (dynamic ID extraction)');

    await sendQuery(page, 'Open KB-107');

    // Wait for widget
    await assertWidgetVisible(page, 'knowledge-article');

    // Validate KB ID was extracted correctly (should show KB-107, not KB-892)
    await assertWidgetContainsText(page, 'knowledge-article', 'KB-107');

    console.log('✅ Knowledge Article Widget with dynamic ID rendered successfully');
  });

  test('Validate No Console Errors', async () => {
    const errors = consoleMessages.filter(
      (msg) => msg.includes('error') && !msg.includes('404')
    );

    if (errors.length > 0) {
      console.error('❌ Console Errors Found:', errors);
    }

    expect(errors).toHaveLength(0);
    console.log('✅ No console errors detected');
  });
});
