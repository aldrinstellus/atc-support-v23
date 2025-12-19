/**
 * Email Notification Issue Scenario Handler
 *
 * Workflow:
 * 1. Check system health for email notification service
 * 2. If system OK → respond with resolution steps
 * 3. If system issue detected → create DevOps alert
 */

import { WorkflowContext, WorkflowResult, SystemActionResult, VerificationResult } from '../workflow-engine';
import { getEmailNotificationTemplate } from '../response-templates';
import { checkSystemHealth, createDevOpsAlert } from '../integrations/mock-systems';

export async function handleEmailNotificationIssue(context: WorkflowContext): Promise<WorkflowResult> {
  console.log('[Email Notification] Starting workflow for:', context.customerEmail);

  const systemActions: SystemActionResult[] = [];
  const verificationResults: VerificationResult[] = [];

  try {
    // Step 1: Check system health
    console.log('[Email Notification] Step 1: Checking email system health...');
    const healthCheck = await checkSystemHealth('email-notifications');

    verificationResults.push({
      success: healthCheck.success,
      status: healthCheck.data?.status === 'operational' ? 'verified' : 'failed',
      message: healthCheck.message,
      details: healthCheck.data,
    });

    systemActions.push({
      success: healthCheck.success,
      action: 'check_system_health',
      message: healthCheck.message,
      details: healthCheck.data,
    });

    // If system is healthy → provide resolution steps
    if (healthCheck.data?.status === 'operational') {
      console.log('[Email Notification] ✅ System healthy, providing resolution steps');

      const response = getEmailNotificationTemplate(context.customerName, 'resolved');

      return {
        scenario: 'email_notification_issue',
        handled: true,
        aiResolved: true,
        requiresHuman: false,
        response,
        systemActions,
        verificationResults,
      };
    }

    // Step 2: System issue detected → create DevOps alert
    console.log('[Email Notification] ⚠️ System issue detected, alerting DevOps');

    const devOpsAlert = await createDevOpsAlert(
      'Email Notification Service Degraded',
      `Customer reported email notification issue. System health check shows: ${healthCheck.message}`,
      'high'
    );

    systemActions.push({
      success: devOpsAlert.success,
      action: 'create_devops_alert',
      message: devOpsAlert.message,
      details: devOpsAlert.data,
    });

    const response = getEmailNotificationTemplate(context.customerName, 'escalated');

    return {
      scenario: 'email_notification_issue',
      handled: true,
      aiResolved: false,
      requiresHuman: true,
      response,
      systemActions,
      verificationResults,
    };

  } catch (error) {
    console.error('[Email Notification] Error:', error);

    return {
      scenario: 'email_notification_issue',
      handled: false,
      aiResolved: false,
      requiresHuman: false,
      systemActions,
      verificationResults,
    };
  }
}
