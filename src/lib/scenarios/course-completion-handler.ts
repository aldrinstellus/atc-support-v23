/**
 * Course Completion Scenario Handler
 *
 * Workflow:
 * 1. Extract course name from request
 * 2. Verify completion status in LMS
 * 3. Auto-mark complete if verified
 * 4. If not complete → escalate to Product team
 */

import { WorkflowContext, WorkflowResult, SystemActionResult, VerificationResult } from '../workflow-engine';
import { getCourseCompletionTemplate } from '../response-templates';
import { checkCourseCompletion, markCourseComplete } from '../integrations/mock-systems';

export async function handleCourseCompletion(context: WorkflowContext): Promise<WorkflowResult> {
  console.log('[Course Completion] Starting workflow for:', context.customerEmail);

  const systemActions: SystemActionResult[] = [];
  const verificationResults: VerificationResult[] = [];

  try {
    // Extract course name
    const courseName = extractCourseName(context.subject, context.content);
    console.log('[Course Completion] Course:', courseName);

    // Step 1: Verify course completion in LMS
    console.log('[Course Completion] Step 1: Checking LMS...');
    const completionCheck = await checkCourseCompletion(context.customerEmail, courseName);

    verificationResults.push({
      success: completionCheck.success,
      status: completionCheck.data?.isComplete ? 'verified' : 'failed',
      message: completionCheck.message,
      details: completionCheck.data,
    });

    systemActions.push({
      success: completionCheck.success,
      action: 'check_lms_completion',
      message: completionCheck.message,
      details: completionCheck.data,
    });

    // If not actually complete → escalate to Product team
    if (!completionCheck.data?.isComplete) {
      console.log('[Course Completion] ⚠️ Course not complete, escalating to Product team');

      const response = getCourseCompletionTemplate(context.customerName, courseName, 'escalated');

      return {
        scenario: 'course_completion',
        handled: true,
        aiResolved: false,
        requiresHuman: true,
        response,
        systemActions,
        verificationResults,
      };
    }

    // Step 2: Auto-mark as complete
    console.log('[Course Completion] Step 2: Marking course complete...');
    const markResult = await markCourseComplete(context.customerEmail, courseName);

    systemActions.push({
      success: markResult.success,
      action: 'mark_course_complete',
      message: markResult.message,
      details: markResult.data,
    });

    if (markResult.success) {
      console.log('[Course Completion] ✅ Course marked complete');

      const response = getCourseCompletionTemplate(context.customerName, courseName, 'auto_completed');

      return {
        scenario: 'course_completion',
        handled: true,
        aiResolved: true,
        requiresHuman: false,
        response,
        systemActions,
        verificationResults,
      };
    }

    // Marking failed → escalate
    console.log('[Course Completion] ⚠️ Failed to mark complete, escalating');

    const response = getCourseCompletionTemplate(context.customerName, courseName, 'escalated');

    return {
      scenario: 'course_completion',
      handled: true,
      aiResolved: false,
      requiresHuman: true,
      response,
      systemActions,
      verificationResults,
    };

  } catch (error) {
    console.error('[Course Completion] Error:', error);

    return {
      scenario: 'course_completion',
      handled: false,
      aiResolved: false,
      requiresHuman: false,
      systemActions,
      verificationResults,
    };
  }
}

function extractCourseName(subject: string, content: string): string {
  const combined = `${subject} ${content}`;

  // Try to extract course name in quotes
  const quotedMatch = combined.match(/"([^"]+)"/);
  if (quotedMatch) return quotedMatch[1];

  // Try to extract after "course" keyword
  const courseMatch = combined.match(/course[:\s]+([A-Z][\w\s]+)/i);
  if (courseMatch) return courseMatch[1].trim();

  // Default
  return 'Your Course';
}
