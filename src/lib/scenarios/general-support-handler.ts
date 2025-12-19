/**
 * General Support Scenario Handler
 *
 * Workflow:
 * 1. Search knowledge base for relevant article
 * 2. Return KB article if found
 * 3. If no good match → route to Jira for human support
 */

import { WorkflowContext, WorkflowResult, SystemActionResult } from '../workflow-engine';
import { getGeneralSupportTemplate } from '../response-templates';
import { searchKnowledgeBase, createJiraTicket } from '../integrations/mock-systems';

// Type definitions for KB article
interface KBArticle {
  title: string;
  url: string;
  relevance: number;
}

export async function handleGeneralSupport(context: WorkflowContext): Promise<WorkflowResult> {
  console.log('[General Support] Starting workflow for query:', context.subject);

  const systemActions: SystemActionResult[] = [];

  try {
    // Step 1: Search knowledge base
    console.log('[General Support] Step 1: Searching knowledge base...');
    const kbResult = await searchKnowledgeBase(context.subject);

    systemActions.push({
      success: kbResult.success,
      action: 'search_knowledge_base',
      message: kbResult.message,
      details: kbResult.data,
    });

    if (kbResult.success && kbResult.data?.article) {
      const article = kbResult.data.article as KBArticle;

      // Check relevance score (demo: >0.75 is good enough)
      if (article.relevance > 0.75) {
        console.log('[General Support] ✅ Found relevant KB article:', article.title);

        const response = getGeneralSupportTemplate(
          context.customerName,
          article.title,
          article.url
        );

        return {
          scenario: 'general_support',
          handled: true,
          aiResolved: true,
          requiresHuman: false,
          response,
          systemActions,
        };
      }
    }

    // Step 2: No good KB article → route to Jira
    console.log('[General Support] ⚠️ No relevant article, creating Jira ticket');

    const jiraResult = await createJiraTicket(
      context.subject,
      context.content,
      'Support'
    );

    systemActions.push({
      success: jiraResult.success,
      action: 'create_jira_ticket',
      message: jiraResult.message,
      details: jiraResult.data,
    });

    return {
      scenario: 'general_support',
      handled: true,
      aiResolved: false,
      requiresHuman: true,
      response: {
        subject: 'Support Request Received',
        htmlContent: `
          <p>Hi ${context.customerName || 'there'},</p>
          <p>We've created a support ticket for your request: <strong>${jiraResult.data?.key}</strong></p>
          <p>A support specialist will review your inquiry and get back to you within 24 hours.</p>
          <p>You can track your ticket at: <a href="${jiraResult.data?.url}">${jiraResult.data?.url}</a></p>
        `,
        plainTextFallback: `Support ticket created: ${jiraResult.data?.key}. Track at: ${jiraResult.data?.url}`,
      },
      systemActions,
    };

  } catch (error) {
    console.error('[General Support] Error:', error);

    return {
      scenario: 'general_support',
      handled: false,
      aiResolved: false,
      requiresHuman: false,
      systemActions,
    };
  }
}
