/**
 * Account Unlock Scenario Handler
 *
 * Workflow:
 * 1. Detect account unlock request
 * 2. Verify account is actually locked (Azure AD)
 * 3. Auto-unlock if possible
 * 4. If cannot unlock → escalate to IT team
 * 5. Send appropriate email response
 */

import { WorkflowContext, WorkflowResult, SystemActionResult, VerificationResult } from '../workflow-engine';
import { getAccountUnlockTemplate } from '../response-templates';
import { checkAccountLockStatus, unlockAccount } from '../integrations/mock-systems';

export async function handleAccountUnlock(context: WorkflowContext): Promise<WorkflowResult> {
  console.log('[Account Unlock] Starting workflow for:', context.customerEmail);

  const systemActions: SystemActionResult[] = [];
  const verificationResults: VerificationResult[] = [];

  try {
    // Step 1: Verify account is actually locked
    console.log('[Account Unlock] Step 1: Checking account lock status...');
    const lockStatus = await checkAccountLockStatus(context.customerEmail);

    verificationResults.push({
      success: lockStatus.success,
      status: lockStatus.data?.isLocked ? 'verified' : 'failed',
      message: lockStatus.message,
      details: lockStatus.data,
    });

    if (!lockStatus.data?.isLocked) {
      // Account is not locked - inform customer
      console.log('[Account Unlock] Account is not locked');
      return {
        scenario: 'account_unlock',
        handled: true,
        aiResolved: true,
        requiresHuman: false,
        response: {
          subject: 'Account Status: Not Locked',
          htmlContent: `
            <p>Hi ${context.customerName || 'there'},</p>
            <p>We checked your account and it's not currently locked. You should be able to log in.</p>
            <p>If you're still having trouble logging in, please try:</p>
            <ul>
              <li>Verify you're using the correct password</li>
              <li>Check that Caps Lock is off</li>
              <li>Clear your browser cache and try again</li>
            </ul>
            <p>If problems persist, reply to this email and we'll escalate to our IT team.</p>
          `,
          plainTextFallback: 'Your account is not locked. Please verify your password and try again.',
        },
        systemActions,
        verificationResults,
      };
    }

    // Step 2: Attempt auto-unlock
    console.log('[Account Unlock] Step 2: Attempting auto-unlock...');

    if (lockStatus.data?.canAutoUnlock) {
      const unlockResult = await unlockAccount(context.customerEmail);

      systemActions.push({
        success: unlockResult.success,
        action: 'unlock_account',
        message: unlockResult.message,
        details: unlockResult.data,
      });

      if (unlockResult.success) {
        console.log('[Account Unlock] ✅ Auto-unlock successful');

        const response = getAccountUnlockTemplate(context.customerName, 'auto_unlocked');

        return {
          scenario: 'account_unlock',
          handled: true,
          aiResolved: true,
          requiresHuman: false,
          response,
          systemActions,
          verificationResults,
        };
      }
    }

    // Step 3: Cannot auto-unlock → escalate to IT
    console.log('[Account Unlock] ⚠️ Cannot auto-unlock, escalating to IT');

    systemActions.push({
      success: true,
      action: 'escalate_to_it',
      message: 'Account unlock requires manual IT intervention',
      details: {
        reason: 'Security policy requires manual verification',
        lockDuration: lockStatus.data?.lockDuration || 'unknown',
      },
    });

    const response = getAccountUnlockTemplate(context.customerName, 'escalated');

    return {
      scenario: 'account_unlock',
      handled: true,
      aiResolved: false,
      requiresHuman: true,
      response,
      systemActions,
      verificationResults,
    };

  } catch (error) {
    console.error('[Account Unlock] Error:', error);

    // Graceful fallback - return unhandled so Claude AI takes over
    return {
      scenario: 'account_unlock',
      handled: false,
      aiResolved: false,
      requiresHuman: false,
      systemActions,
      verificationResults,
    };
  }
}
