import { Page, expect } from '@playwright/test';
import { waitForAIResponse, waitForWidget } from './widget-assertions';
import type { WidgetType } from './widget-assertions';

export interface ConversationStep {
  userQuery: string;
  expectedResponse?: string; // Optional text expected in AI response
  expectedWidget?: WidgetType; // Optional widget expected to render
  waitForResponse?: boolean; // Wait for AI response (default: true)
}

/**
 * Send a query to the chat input and submit
 */
export async function sendQuery(page: Page, query: string) {
  const chatInput = page.locator('[data-testid="chat-input"]');
  await chatInput.waitFor({ state: 'visible', timeout: 5000 });
  await chatInput.clear();
  await chatInput.fill(query);

  const sendButton = page.locator('[data-testid="send-button"]');
  await sendButton.click();
}

/**
 * Execute a multi-step conversation flow
 */
export async function executeConversationFlow(page: Page, steps: ConversationStep[]) {
  const results: Array<{ step: number; query: string; passed: boolean; error?: string }> = [];

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const stepNum = i + 1;

    console.log(`\n📝 Step ${stepNum}: "${step.userQuery}"`);

    try {
      // Send query
      await sendQuery(page, step.userQuery);

      // Wait for AI response if needed (default: true)
      if (step.waitForResponse !== false) {
        await waitForAIResponse(page, 15000);
        console.log(`✅ AI responded to step ${stepNum}`);

        // Validate expected response text if provided
        if (step.expectedResponse) {
          const aiMessage = await waitForAIResponse(page);
          await expect(aiMessage).toContainText(step.expectedResponse);
          console.log(`✅ Response contains expected text`);
        }
      }

      // Validate expected widget if provided
      if (step.expectedWidget) {
        const widget = await waitForWidget(page, step.expectedWidget, 15000);
        await expect(widget).toBeVisible();
        console.log(`✅ Widget "${step.expectedWidget}" rendered`);
      }

      results.push({ step: stepNum, query: step.userQuery, passed: true });

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      console.error(`❌ Step ${stepNum} failed:`, errorMsg);
      results.push({ step: stepNum, query: step.userQuery, passed: false, error: errorMsg });
      throw error; // Re-throw to fail the test
    }
  }

  return results;
}

/**
 * Click a button within a widget and wait for response
 */
export async function clickWidgetButton(page: Page, widgetType: WidgetType, buttonText: string) {
  const widget = page.locator(`[data-widget-type="${widgetType}"]`).first();
  await expect(widget).toBeVisible();

  const button = widget.locator(`button:has-text("${buttonText}")`);
  await button.click();

  // Wait for AI response after button click
  await waitForAIResponse(page, 10000);
}

/**
 * Clear chat history (useful between test cases)
 */
export async function clearChatHistory(page: Page) {
  await page.evaluate(() => {
    // Clear conversation messages from localStorage
    const currentPersona = localStorage.getItem('currentPersona');
    if (currentPersona) {
      localStorage.removeItem(`conversations_${currentPersona}`);
    }
  });
  await page.reload();
  await page.waitForLoadState('networkidle');
}
