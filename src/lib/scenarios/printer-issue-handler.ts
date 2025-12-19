/**
 * Printer Issue Scenario Handler
 *
 * Workflow:
 * 1. Send troubleshooting guide immediately
 * 2. If follow-up indicates still not working → create IT ticket
 */

import { WorkflowContext, WorkflowResult, SystemActionResult } from '../workflow-engine';
import { getPrinterIssueTemplate } from '../response-templates';
import { createJiraTicket } from '../integrations/mock-systems';

export async function handlePrinterIssue(context: WorkflowContext): Promise<WorkflowResult> {
  console.log('[Printer Issue] Starting workflow for:', context.customerEmail);

  const systemActions: SystemActionResult[] = [];

  try {
    // For initial request → send troubleshooting guide
    if (!context.isThread) {
      console.log('[Printer Issue] Sending troubleshooting guide');

      const response = getPrinterIssueTemplate(context.customerName);

      return {
        scenario: 'printer_issue',
        handled: true,
        aiResolved: true,
        requiresHuman: false,
        response,
        systemActions,
      };
    }

    // For follow-up (thread) → create IT ticket for in-person support
    console.log('[Printer Issue] Follow-up detected, creating IT ticket');

    const jiraResult = await createJiraTicket(
      `Printer Issue - ${context.subject}`,
      `Customer ${context.customerEmail} tried troubleshooting steps but printer still not working.\n\nOriginal issue: ${context.content}`,
      'Hardware Support'
    );

    systemActions.push({
      success: jiraResult.success,
      action: 'create_it_ticket',
      message: jiraResult.message,
      details: jiraResult.data,
    });

    return {
      scenario: 'printer_issue',
      handled: true,
      aiResolved: false,
      requiresHuman: true,
      response: {
        subject: 'IT Support Ticket Created for Printer Issue',
        htmlContent: `
          <p>Hi ${context.customerName || 'there'},</p>
          <p>Since the troubleshooting steps didn't resolve your printer issue, we've created an IT support ticket for in-person assistance.</p>
          <p><strong>Ticket:</strong> ${jiraResult.data?.key}</p>
          <p>An IT technician will visit your location within 4 business hours to resolve the printer issue.</p>
          <p>Track your ticket: <a href="${jiraResult.data?.url}">${jiraResult.data?.url}</a></p>
        `,
        plainTextFallback: `IT ticket created: ${jiraResult.data?.key}. Track at: ${jiraResult.data?.url}`,
      },
      systemActions,
    };

  } catch (error) {
    console.error('[Printer Issue] Error:', error);

    return {
      scenario: 'printer_issue',
      handled: false,
      aiResolved: false,
      requiresHuman: false,
      systemActions,
    };
  }
}
