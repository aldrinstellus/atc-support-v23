/**
 * Access Request Scenario Handler
 *
 * Workflow:
 * 1. Detect access request (SharePoint, Slack, System)
 * 2. Verify user is onboarded (exists in Azure AD)
 * 3. Auto-provision if onboarded
 * 4. If not onboarded → pending manager approval
 */

import { WorkflowContext, WorkflowResult, SystemActionResult, VerificationResult } from '../workflow-engine';
import { getAccessRequestTemplate } from '../response-templates';
import { verifyUserOnboarding, provisionSlackAccess, provisionSharePointAccess } from '../integrations/mock-systems';

export async function handleAccessRequest(context: WorkflowContext): Promise<WorkflowResult> {
  console.log('[Access Request] Starting workflow for:', context.customerEmail);

  const systemActions: SystemActionResult[] = [];
  const verificationResults: VerificationResult[] = [];

  try {
    // Extract what they're requesting access to
    const accessType = extractAccessType(context.subject, context.content);
    console.log('[Access Request] Requesting access to:', accessType);

    // Step 1: Verify user is onboarded
    console.log('[Access Request] Step 1: Verifying user onboarding...');
    const onboardingCheck = await verifyUserOnboarding(context.customerEmail);

    verificationResults.push({
      success: onboardingCheck.success,
      status: onboardingCheck.data?.exists ? 'verified' : 'failed',
      message: onboardingCheck.message,
      details: onboardingCheck.data,
    });

    if (!onboardingCheck.data?.exists) {
      // User not onboarded → pending approval
      console.log('[Access Request] ⚠️ User not onboarded, pending manager approval');

      systemActions.push({
        success: true,
        action: 'pending_approval',
        message: 'Access request awaiting manager approval',
        details: { reason: 'User not found in Active Directory' },
      });

      const response = getAccessRequestTemplate(context.customerName, accessType, 'pending_approval');

      return {
        scenario: 'access_request',
        handled: true,
        aiResolved: false,
        requiresHuman: true,
        response,
        systemActions,
        verificationResults,
      };
    }

    // Step 2: Auto-provision access
    console.log('[Access Request] Step 2: Auto-provisioning access...');

    let provisionResult;

    if (accessType.toLowerCase().includes('slack')) {
      provisionResult = await provisionSlackAccess(context.customerEmail);
    } else if (accessType.toLowerCase().includes('sharepoint')) {
      provisionResult = await provisionSharePointAccess(context.customerEmail, accessType);
    } else {
      // Generic system access
      provisionResult = {
        success: true,
        message: `Access to ${accessType} provisioned`,
        data: { system: accessType, email: context.customerEmail },
      };
    }

    systemActions.push({
      success: provisionResult.success,
      action: 'provision_access',
      message: provisionResult.message,
      details: provisionResult.data,
    });

    if (provisionResult.success) {
      console.log('[Access Request] ✅ Access provisioned successfully');

      const response = getAccessRequestTemplate(context.customerName, accessType, 'provisioned');

      return {
        scenario: 'access_request',
        handled: true,
        aiResolved: true,
        requiresHuman: false,
        response,
        systemActions,
        verificationResults,
      };
    }

    // Provisioning failed → escalate
    console.log('[Access Request] ⚠️ Provisioning failed, escalating');

    const response = getAccessRequestTemplate(context.customerName, accessType, 'pending_approval');

    return {
      scenario: 'access_request',
      handled: true,
      aiResolved: false,
      requiresHuman: true,
      response,
      systemActions,
      verificationResults,
    };

  } catch (error) {
    console.error('[Access Request] Error:', error);

    return {
      scenario: 'access_request',
      handled: false,
      aiResolved: false,
      requiresHuman: false,
      systemActions,
      verificationResults,
    };
  }
}

function extractAccessType(subject: string, content: string): string {
  const combined = `${subject} ${content}`.toLowerCase();

  if (combined.includes('slack')) return 'Slack';
  if (combined.includes('sharepoint')) {
    // Try to extract site name
    const siteMatch = combined.match(/sharepoint\s+(\w+)/i);
    return siteMatch ? `SharePoint ${siteMatch[1]}` : 'SharePoint';
  }
  if (combined.includes('jira')) return 'Jira';
  if (combined.includes('confluence')) return 'Confluence';

  return 'System Access';
}
