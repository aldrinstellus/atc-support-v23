// Query Detection Module for Bhanu's Assistant-First Interface
// Maps natural language queries to appropriate widgets based on persona and intent

import type { WidgetType, WidgetData } from '@/types/widget';
import { findBestMatch as findCLevelMatch } from './c-level-conversation';
import { findBestMatch as findCSManagerMatch } from './cs-manager-conversation';
import { findBestMatch as findATCExecutiveMatch } from './atc-executive-conversation';
import { findBestMatch as findATCManagerMatch } from './atc-manager-conversation';
import { findBestMatch as findATCSupportMatch } from './atc-support-conversation';
import { findBestMatch as findATCCSMMatch } from './atc-csm-conversation';
import {
  executiveSummaryDemo,
  customerRiskProfileDemo,
  ticketDetailDemo,
  slaPerformanceChartDemo,
  agentPerformanceComparisonDemo,
  callPrepNotesDemo,
  responseComposerDemo,
  teamWorkloadDashboardDemo,
  customerRiskListDemo,
  ticketListDemo,
  agentDashboardDemo,
  meetingSchedulerDemo,
  similarTicketsAnalysisDemo,
  agentPerformanceStatsDemo,
  knowledgeBaseSearchDemo,
  knowledgeArticleDemo,
  messageComposerDemo,
  passwordResetArticleDemo,
  passwordResetEscalationDemo,
  accountUnlockSuccessDemo,
  accountUnlockEscalationDemo,
  multiSystemAccessResolvedDemo,
  profileUpdateSuccessDemo,
  courseUpdateSuccessDemo,
  // V17 Government Mode Demo Data
  contractPerformanceDemo,
  deliverableReviewListDemo,
  vendorComplianceDemo,
  programHealthDemo,
  stakeholderEngagementDemo,
  requirementsTrackingDemo,
  changeRequestDemo,
  // V17 Project Mode Demo Data
  sprintBurndownDemo,
  teamVelocityDemo,
  codeQualityDemo,
  deploymentPipelineDemo,
  taskKanbanDemo,
  resourceCapacityDemo,
  blockerResolutionDemo,
  // Analytics Widgets (Cyborg Priority 1)
  analyticsDashboardDemo,
  performanceTrendsDemo,
  sentimentAnalysisDemo,
} from '@/data/demo-widget-data';
import { doraMetricsDemo } from '@/data/csm-widget-data';

export interface QueryMatch {
  widgetType: WidgetType | null;
  widgetData: WidgetData | null;
  responseText: string;
}

export type PersonaId =
  | 'c-level' | 'cs-manager' | 'support-agent' | 'csm'
  // V17 ATC Mode
  | 'atc-executive' | 'atc-manager' | 'atc-support' | 'atc-csm'
  // V17 Government Mode
  | 'cor' | 'program-manager' | 'stakeholder-lead'
  // V17 Project Mode
  | 'project-manager' | 'service-team-lead' | 'service-team-member';

/**
 * Detect widget intent from user query
 */
export function detectWidgetQuery(
  query: string,
  personaId: PersonaId
): QueryMatch | null {
  const q = query.toLowerCase().trim();

  // Route based on persona
  switch (personaId) {
    // V14/V15 Personas
    case 'c-level':
      return detectCLevelQuery(q);
    case 'cs-manager':
      return detectManagerQuery(q);
    case 'support-agent':
      return detectAgentQuery(q);
    case 'csm':
      return detectCSMQuery(q);
    // V17 ATC Mode Personas (use dedicated ATC conversation files)
    case 'atc-executive':
      return detectATCExecutiveQuery(q);
    case 'atc-manager':
      return detectATCManagerQuery(q);
    case 'atc-support':
      return detectATCSupportQuery(q);
    case 'atc-csm':
      return detectATCCSMQuery(q);
    // V17 Government Mode Personas
    case 'cor':
      return detectCORQuery(q);
    case 'program-manager':
      return detectProgramManagerQuery(q);
    case 'stakeholder-lead':
      return detectStakeholderLeadQuery(q);
    // V17 Project Mode Personas
    case 'project-manager':
      return detectProjectManagerQuery(q);
    case 'service-team-lead':
      return detectServiceTeamLeadQuery(q);
    case 'service-team-member':
      return detectServiceTeamMemberQuery(q);
    default:
      return null;
  }
}

// ============================================================================
// C-LEVEL EXECUTIVE QUERIES
// ============================================================================

function detectCLevelQuery(q: string): QueryMatch | null {
  // NEW: Use Bhanu's pattern matching from c-level-conversation.ts
  const bhanuMatch = findCLevelMatch(q);
  if (bhanuMatch) {
    // Map Bhanu's widget types to our WidgetType
    return {
      widgetType: bhanuMatch.widgetType as WidgetType,
      widgetData: bhanuMatch.widgetData ?? null,
      responseText: bhanuMatch.aiResponse,
    };
  }

  // FALLBACK: Original pattern matching for backward compatibility
  // EXACT QUERY MATCHING (checked first - no ambiguity, no cache issues)
  const exactMatches: Record<string, QueryMatch> = {
    'show me the sla performance breakdown': {
      widgetType: 'sla-performance-chart',
      widgetData: slaPerformanceChartDemo,
      responseText: "Here's the detailed SLA performance breakdown: [v2]",
    },
    'which categories are we failing': {
      widgetType: 'sla-performance-chart',
      widgetData: slaPerformanceChartDemo,
      responseText: "We're currently failing in these SLA categories: [v2]",
    },
  };

  // Check for exact match
  if (exactMatches[q]) {
    return exactMatches[q];
  }

  // PATTERN MATCHING (fallback for query variations)

  // CYBORG PRIORITY 1: Analytics Widgets (check BEFORE executive summary for specificity)

  // Analytics Dashboard
  if (
    q.includes('analytics') ||
    (q.includes('show') && q.includes('metrics')) ||
    q.includes('ticket trends') ||
    q.includes('show data') ||
    q.includes('metrics overview')
  ) {
    return {
      widgetType: 'analytics-dashboard',
      widgetData: analyticsDashboardDemo,
      responseText: "Executive analytics dashboard displays ticket volume trends and response time metrics:",
    };
  }

  // Performance Trends
  if (
    (q.includes('performance') && q.includes('trend')) ||
    q.includes('how are we doing') ||
    q.includes('show trends') ||
    q.includes('performance over time') ||
    (q.includes('show') && q.includes('improvement'))
  ) {
    return {
      widgetType: 'performance-trends',
      widgetData: performanceTrendsDemo,
      responseText: "Performance trend analysis reveals multi-metric patterns across response time, resolution, and satisfaction:",
    };
  }

  // Sentiment Analysis
  if (
    q.includes('sentiment') ||
    (q.includes('customer') && q.includes('feeling')) ||
    q.includes('customer feedback') ||
    q.includes('customer happiness') ||
    (q.includes('how are') && q.includes('customers'))
  ) {
    return {
      widgetType: 'sentiment-analysis',
      widgetData: sentimentAnalysisDemo,
      responseText: "Customer sentiment analysis shows overall satisfaction trends and recent feedback:",
    };
  }

  // 1. Executive Summary (now fallback for generic dashboard/summary queries)
  if (
    q.includes('executive summary') ||
    q.includes('system health') ||
    (q.includes('good morning') && q.includes('summary')) ||
    (q.includes('show me') && q.includes('dashboard') && !q.includes('analytics')) ||
    (q.includes('show me') && q.includes('summary'))
  ) {
    return {
      widgetType: 'executive-summary',
      widgetData: executiveSummaryDemo,
      responseText: "Good morning. Here's your executive summary for today:",
    };
  }

  // 2. Customer Risk Profile & High-Risk Customers
  if (
    q.includes('high-risk customers') ||
    q.includes('at-risk customers') ||
    q.includes('customer risk') ||
    (q.includes('show me') && q.includes('risk'))
  ) {
    return {
      widgetType: 'customer-risk-list',
      widgetData: customerRiskListDemo,
      responseText: "Strategic risk portfolio shows customers requiring executive attention:",  // WONDER WOMAN FIX: C-Level specific
    };
  }

  if (
    q.includes('tell me more about') ||
    q.includes('risk score') ||
    q.includes('why did') ||
    (q.includes('acme') && (q.includes('risk') || q.includes('increase')))
  ) {
    return {
      widgetType: 'customer-risk-profile',
      widgetData: customerRiskProfileDemo,
      responseText: "Let me pull up the detailed risk profile:",
    };
  }

  // 3a. SLA Failing Categories (specific query - check first)
  if (q.includes('which categories') && q.includes('failing')) {
    return {
      widgetType: 'sla-performance-chart',
      widgetData: slaPerformanceChartDemo,
      responseText: "We're currently failing in these SLA categories:",
    };
  }

  // 3b. SLA Performance Breakdown (general queries)
  if (
    q.includes('sla performance') ||
    q.includes('sla breakdown') ||
    (q.includes('show me') && q.includes('sla'))
  ) {
    return {
      widgetType: 'sla-performance-chart',
      widgetData: slaPerformanceChartDemo,
      responseText: "Here's the detailed SLA performance breakdown:",
    };
  }

  // 4. Live Zoho Tickets Dashboard
  if (
    q.includes('my current tickets') ||
    q.includes('all my current tickets') ||
    (q.includes('current tickets') && q.includes('zoho')) ||
    (q.includes('live tickets') && q.includes('dashboard')) ||
    q.includes('show me all my current tickets')
  ) {
    return {
      widgetType: 'ticket-list',
      widgetData: ticketListDemo,
      responseText: "Executive ticket overview from Zoho Desk:",  // WONDER WOMAN FIX: C-Level specific
    };
  }

  // 5. Ticket Detail (specific ticket numbers) - LIVE FROM ZOHO
  if (
    q.includes('ticket #') ||
    q.includes('ticket number') ||
    /tick-?\d+/i.test(q) ||
    (q.includes('show me ticket') && /\d+/.test(q)) ||
    (q.includes('details') && /\d+/.test(q))
  ) {
    // Extract ticket number from query (preserve TICK- prefix)
    const ticketNumberMatch = q.match(/tick-?(\d+)/i);
    const ticketNumber = ticketNumberMatch ? `TICK-${ticketNumberMatch[1]}` : null;

    console.log('[Query Detection - C-Level] Ticket query detected. Query:', q);
    console.log('[Query Detection - C-Level] Regex match:', ticketNumberMatch);
    console.log('[Query Detection - C-Level] Constructed ticketNumber:', ticketNumber);

    if (ticketNumber) {
      return {
        widgetType: 'live-ticket-detail',
        widgetData: { ticketNumber },
        responseText: `Ticket details with executive summary from Zoho Desk:`,  // WONDER WOMAN FIX: C-Level specific
      };
    }

    // Fallback to demo if no number found
    return {
      widgetType: 'ticket-detail',
      widgetData: ticketDetailDemo,
      responseText: "Here are the complete details for this ticket:",
    };
  }

  // 6. Revenue Impact Analysis (NEW)
  if (
    (q.includes('revenue') && q.includes('impact')) ||
    (q.includes('revenue') && q.includes('analysis'))
  ) {
    return {
      widgetType: 'analytics-dashboard',
      widgetData: analyticsDashboardDemo,
      responseText: "Revenue impact analysis from support operations shows financial correlations:",
    };
  }

  // 7. Customer Satisfaction Scores (NEW)
  if (
    (q.includes('satisfaction') && q.includes('score')) ||
    (q.includes('customer satisfaction') && q.includes('metric')) ||
    q.includes('show me customer satisfaction')
  ) {
    return {
      widgetType: 'sentiment-analysis',
      widgetData: sentimentAnalysisDemo,
      responseText: "Customer satisfaction score analysis reveals overall sentiment trends:",
    };
  }

  // 8. Escalation Trends (NEW)
  if (
    (q.includes('escalation') && q.includes('trend')) ||
    (q.includes('escalation') && q.includes('over')) ||
    q.includes('escalation trends')
  ) {
    return {
      widgetType: 'analytics-dashboard',
      widgetData: analyticsDashboardDemo,
      responseText: "Escalation trend analysis shows patterns over the last 3 months:",
    };
  }

  // 9. Customer Retention Metrics (NEW)
  if (
    (q.includes('retention') && q.includes('metric')) ||
    (q.includes('customer retention') && q.includes('forecast')) ||
    q.includes('retention metrics')
  ) {
    return {
      widgetType: 'customer-risk-list',
      widgetData: customerRiskListDemo,
      responseText: "Customer retention metrics and forecasts for strategic planning:",
    };
  }

  // 10. Resource Allocation Efficiency (NEW)
  if (
    (q.includes('resource') && q.includes('allocation')) ||
    (q.includes('resource') && q.includes('efficiency')) ||
    q.includes('resource allocation efficiency')
  ) {
    return {
      widgetType: 'performance-trends',
      widgetData: performanceTrendsDemo,
      responseText: "Resource allocation efficiency analysis across support operations:",
    };
  }

  // 11. Team Capacity vs Demand (NEW)
  if (
    (q.includes('capacity') && q.includes('demand')) ||
    (q.includes('team capacity') && q.includes('projection')) ||
    q.includes('capacity vs demand')
  ) {
    return {
      widgetType: 'performance-trends',
      widgetData: performanceTrendsDemo,
      responseText: "Team capacity versus demand projections for strategic resource planning:",
    };
  }

  // 12. Integration ROI Analysis (NEW)
  if (
    (q.includes('integration') && q.includes('roi')) ||
    (q.includes('integration') && q.includes('analysis')) ||
    q.includes('integration roi')
  ) {
    return {
      widgetType: 'analytics-dashboard',
      widgetData: analyticsDashboardDemo,
      responseText: "Integration ROI analysis shows return on technology investments:",
    };
  }

  // 13. Competitive Positioning (NEW)
  if (
    (q.includes('competitive') && q.includes('position')) ||
    (q.includes('competitive') && q.includes('feedback')) ||
    q.includes('competitive positioning')
  ) {
    return {
      widgetType: 'sentiment-analysis',
      widgetData: sentimentAnalysisDemo,
      responseText: "Competitive positioning analysis derived from customer feedback:",
    };
  }

  // 14. Meeting Scheduler
  if (
    q.includes('schedule') ||
    q.includes('book') ||
    (q.includes('executive call') && q.includes('attend'))
  ) {
    return {
      widgetType: 'meeting-scheduler',
      widgetData: meetingSchedulerDemo,
      responseText: "I've found available time slots for the executive call:",
    };
  }

  return null;
}

// ============================================================================
// CS MANAGER QUERIES
// ============================================================================

function detectManagerQuery(q: string): QueryMatch | null {
  // NEW: Use conversation pattern matching from cs-manager-conversation.ts
  const conversationMatch = findCSManagerMatch(q);
  if (conversationMatch) {
    // Map conversation entry to QueryMatch
    return {
      widgetType: conversationMatch.widgetType as WidgetType,
      widgetData: conversationMatch.widgetData as WidgetData,
      responseText: conversationMatch.aiResponse,
    };
  }

  // FALLBACK: Original pattern matching for backward compatibility
  // 1. Team Workload Dashboard
  if (
    q.includes("team's status") ||
    q.includes('team status') ||
    q.includes('team workload') ||
    q.includes('show me my team') ||
    (q.includes('good morning') && q.includes('team'))
  ) {
    return {
      widgetType: 'team-workload-dashboard',
      widgetData: teamWorkloadDashboardDemo,
      responseText: "Here's your team's current workload status:",
    };
  }

  // 2. Live Zoho Tickets Dashboard
  if (
    q.includes('my current tickets') ||
    q.includes('all my current tickets') ||
    (q.includes('current tickets') && q.includes('zoho')) ||
    (q.includes('live tickets') && q.includes('dashboard')) ||
    q.includes('show me all my current tickets')
  ) {
    return {
      widgetType: 'ticket-list',
      widgetData: ticketListDemo,
      responseText: "Here are the live tickets from Zoho Desk:",
    };
  }

  // 2.5. Ticket Detail (specific ticket numbers) - LIVE FROM ZOHO
  if (
    q.includes('ticket #') ||
    q.includes('ticket number') ||
    (q.includes('show me ticket') && /\d+/.test(q)) ||
    (q.includes('details') && /\d+/.test(q)) ||
    (q.includes('show me details for ticket') && /\d+/.test(q))
  ) {
    // Extract ticket number from query (preserve TICK- prefix)
    const ticketNumberMatch = q.match(/tick-?(\d+)/i);
    const ticketNumber = ticketNumberMatch ? `TICK-${ticketNumberMatch[1]}` : null;

    console.log('[Query Detection - CS Manager] Ticket detail detected. Query:', q);
    console.log('[Query Detection - CS Manager] Extracted ticket number:', ticketNumber);

    if (ticketNumber) {
      const result: QueryMatch = {
        widgetType: 'live-ticket-detail' as WidgetType,
        widgetData: { ticketNumber },
        responseText: `Here are the complete details for ticket #${ticketNumber} from Zoho Desk:`,
      };
      console.log('[Query Detection - CS Manager] Returning:', result);
      return result;
    }

    // Fallback to demo if no number found
    return {
      widgetType: 'ticket-detail',
      widgetData: ticketDetailDemo,
      responseText: "Here are the complete details for this ticket:",
    };
  }

  // 3. Agent Performance Comparison
  if (
    q.includes('top and bottom performers') ||
    q.includes('performance comparison') ||
    q.includes('compare performance') ||
    q.includes('compare agent performance') ||
    q.includes('top performers') ||
    q.includes('bottom performers') ||
    (q.includes('show me') && q.includes('performers'))
  ) {
    return {
      widgetType: 'agent-performance-comparison',
      widgetData: agentPerformanceComparisonDemo,
      responseText: "Here's the agent performance comparison for this week:",
    };
  }

  // 3. High-Risk Customers List
  if (
    q.includes('high-risk customers') ||
    q.includes('at-risk customers') ||
    q.includes('customer risk') ||
    q.includes('customers at risk') ||
    (q.includes('show me all') && q.includes('risk'))
  ) {
    return {
      widgetType: 'customer-risk-list',
      widgetData: customerRiskListDemo,
      responseText: "Here's the list of all high-risk customers requiring attention:",
    };
  }

  // 4. Ticket List (for specific agent)
  if (
    (q.includes('show me') && q.includes('tickets')) ||
    q.includes('his tickets') ||
    q.includes('her tickets')
  ) {
    // Extract agent name from query (e.g., "Sarah" from "Show me Sarah's tickets")
    const nameMatch = q.match(/(?:show me |his |her )(\w+)(?:'s)?\s*tickets/i);
    const agentName = nameMatch ? nameMatch[1] : "the agent";
    const capitalizedName = agentName.charAt(0).toUpperCase() + agentName.slice(1);

    return {
      widgetType: 'ticket-list',
      widgetData: {
        ...ticketListDemo,
        title: `${capitalizedName}'s Tickets`
      },
      responseText: `Here are ${capitalizedName}'s current tickets:`,
    };
  }

  // 5. Meeting Scheduler (for 1-on-1) - Now handled by cs-manager-conversation.ts

  // 6. Message Composer (for customer communication)
  if (
    q.includes('draft message') ||
    q.includes('draft a message') ||
    q.includes('compose message') ||
    q.includes('write email') ||
    q.includes('write a message') ||
    (q.includes('message') && q.includes('customer'))
  ) {
    return {
      widgetType: 'message-composer',
      widgetData: messageComposerDemo,
      responseText: "I've drafted a message for you to review:",
    };
  }

  // 7. Customers with Multiple Open Tickets (NEW)
  if (
    (q.includes('multiple') && q.includes('open') && q.includes('ticket')) ||
    (q.includes('customers with') && q.includes('multiple tickets')) ||
    q.includes('customers with multiple open tickets')
  ) {
    return {
      widgetType: 'customer-risk-list',
      widgetData: customerRiskListDemo,
      responseText: "Customers with multiple open tickets requiring attention:",
    };
  }

  // 8. Accounts with Declining Satisfaction (NEW)
  if (
    (q.includes('declining') && q.includes('satisfaction')) ||
    (q.includes('accounts with declining') && q.includes('score')) ||
    q.includes('declining satisfaction scores')
  ) {
    return {
      widgetType: 'customer-risk-list',
      widgetData: customerRiskListDemo,
      responseText: "Accounts with declining satisfaction scores require intervention:",
    };
  }

  // 9. Team Capacity Planning (NEW)
  if (
    (q.includes('capacity') && q.includes('planning')) ||
    (q.includes('team capacity') && q.includes('Q1')) ||
    q.includes('capacity planning')
  ) {
    return {
      widgetType: 'team-workload-dashboard',
      widgetData: teamWorkloadDashboardDemo,
      responseText: "Team capacity planning analysis for Q1 2026 resource allocation:",
    };
  }

  // 10. Escalation Trends & Root Cause Analysis (NEW)
  if (
    (q.includes('escalation') && q.includes('trend') && q.includes('root cause')) ||
    (q.includes('escalation trends') && q.includes('analysis')) ||
    q.includes('escalation trends and root cause')
  ) {
    return {
      widgetType: 'analytics-dashboard',
      widgetData: analyticsDashboardDemo,
      responseText: "Escalation trend analysis with root cause identification:",
    };
  }

  return null;
}

// ============================================================================
// SUPPORT AGENT QUERIES
// ============================================================================

function detectAgentQuery(q: string): QueryMatch | null {
  // ============================================================================
  // RBAC GUARDS: Block C-Level and CSM queries for Support Agents
  // ============================================================================

  // Block Executive Summary / Board Metrics (C-Level only)
  if (
    q.includes('executive summary') ||
    (q.includes('board') && q.includes('metrics')) ||
    q.includes('board-level') ||
    (q.includes('show') && q.includes('board'))
  ) {
    return {
      widgetType: null,
      widgetData: null,
      responseText: "Board-level metrics and executive summaries are only available to C-Level executives. As a Support Agent, you have access to ticket management, knowledge base, and customer interaction tools. Try asking: 'Show me my open tickets' or 'What's on my plate today?'",
    };
  }

  // Block Churn Risk / ARR Data (CSM only)
  if (
    (q.includes('churn') && q.includes('risk')) ||
    (q.includes('customers') && q.includes('churn')) ||
    q.includes('at-risk customers') ||
    q.includes('customer retention') ||
    (q.includes('arr') && q.includes('customer'))
  ) {
    return {
      widgetType: null,
      widgetData: null,
      responseText: "Customer retention and churn risk data are managed by the Customer Success team. As a Support Agent, you can view high-priority tickets and escalated cases. Try asking: 'Show me high-priority tickets' or 'Show me escalated tickets'.",
    };
  }

  // ============================================================================
  // END RBAC GUARDS
  // ============================================================================

  // PASSWORD RESET DEMO FLOW - Priority detection
  // Step 1: Initial password reset request
  if (
    (q.includes('password') && (q.includes('reset') || q.includes('lock'))) ||
    q.includes('i need to password reset') ||
    q.includes('need password reset') ||
    q.includes('locked out')
  ) {
    return {
      widgetType: 'knowledge-article',
      widgetData: passwordResetArticleDemo,
      responseText: "I can help you with password reset! Let me show you our step-by-step guide with video tutorial and direct reset link. This should resolve your issue quickly.",
    };
  }

  // Step 2: Escalation when user still unable to reset
  if (
    q.includes('still unable') ||
    q.includes('still can\'t') ||
    q.includes('not working') ||
    q.includes('didn\'t work') ||
    q.includes('still having trouble') ||
    (q.includes('need') && q.includes('help'))
  ) {
    return {
      widgetType: 'escalation-path',
      widgetData: passwordResetEscalationDemo,
      responseText: "I understand you need additional assistance. Let me escalate this to a human agent right away. I've created a Jira issue and notified our CS team via email and SMS. Sarah Chen will reach out within 15 minutes to help resolve this.",
    };
  }

  // ACCOUNT UNLOCK DEMO FLOW
  // Step 1: Initial account unlock request
  if (
    (q.includes('unlock') && q.includes('account')) ||
    q.includes('account locked') ||
    q.includes('cant access') ||
    q.includes('cannot access') ||
    q.includes('account is locked')
  ) {
    return {
      widgetType: 'response-composer',
      widgetData: accountUnlockSuccessDemo,
      responseText: "Let me check your account status and verify if I can unlock it for you...",
    };
  }

  // Step 2: Security escalation path (if severe security issues detected)
  if (
    q.includes('security issue') ||
    q.includes('security flag') ||
    q.includes('severe issue') ||
    q.includes('suspicious activity') ||
    (q.includes('detected') && q.includes('security'))
  ) {
    return {
      widgetType: 'escalation-path',
      widgetData: accountUnlockEscalationDemo,
      responseText: "I've detected security concerns that require human review. Let me escalate this to our security team right away for your safety.",
    };
  }

  // MULTI-SYSTEM ACCESS DEMO FLOW
  // Detects when user reports issues with multiple systems (SharePoint, Slack, Email, etc.)
  if (
    (q.includes('sharepoint') && (q.includes('slack') || q.includes('email'))) ||
    (q.includes('slack') && q.includes('email')) ||
    q.includes('multiple systems') ||
    q.includes('all systems') ||
    (q.includes("can't access") && (q.includes('and') || q.includes(','))) ||
    (q.includes('access') && q.includes('sharepoint') && q.includes('slack'))
  ) {
    // Default to fully resolved demo (user can manually trigger partial by asking for specific scenarios)
    return {
      widgetType: 'system-access-status',
      widgetData: multiSystemAccessResolvedDemo,
      responseText: "Let me check your access across all these systems and fix any issues I find...",
    };
  }

  // INTERACTIVE UPDATE DEMO FLOW - Profile Updates
  if (
    (q.includes('update') && q.includes('profile')) ||
    (q.includes('change') && q.includes('profile')) ||
    q.includes('how do i update my profile') ||
    q.includes('how to update profile') ||
    (q.includes('edit') && q.includes('profile'))
  ) {
    return {
      widgetType: 'interactive-update',
      widgetData: profileUpdateSuccessDemo,
      responseText: "I can help you update your profile! Let me show you what I can do automatically and what requires approval...",
    };
  }

  // INTERACTIVE UPDATE DEMO FLOW - Course Updates
  if (
    (q.includes('update') && q.includes('course')) ||
    (q.includes('change') && q.includes('course')) ||
    q.includes('how do i update a course') ||
    q.includes('how to update course') ||
    (q.includes('edit') && q.includes('course'))
  ) {
    return {
      widgetType: 'interactive-update',
      widgetData: courseUpdateSuccessDemo,
      responseText: "I can help you update course information! Let me load the current details and show you what can be changed...",
    };
  }

  // Button Actions (Response Composer)
  if (q.includes('send the response') || q.includes('send response')) {
    return {
      widgetType: null,
      widgetData: null,
      responseText: '✓ Response sent successfully! The customer will receive your message within the next few minutes.',
    };
  }

  if (q.includes('edit and customize')) {
    return {
      widgetType: null,
      widgetData: null,
      responseText: 'Opening response editor... You can now customize the message before sending.',
    };
  }

  if (q.includes('regenerate response')) {
    return {
      widgetType: null,
      widgetData: null,
      responseText: '✓ Regenerating response with a different approach...',
    };
  }

  // 1. Agent Dashboard (daily overview)
  if (
    q.includes("what's on my plate") ||
    q.includes('my plate today') ||
    (q.includes('good morning') && !q.includes('summary'))
  ) {
    return {
      widgetType: 'agent-dashboard',
      widgetData: agentDashboardDemo,
      responseText: "Good morning! Here's what's on your plate today:",
    };
  }

  // 2. Ticket Detail - LIVE FROM ZOHO
  if (
    q.includes('ticket #') ||
    q.includes('ticket number') ||
    (q.includes('show me ticket') && /\d+/.test(q)) ||
    (q.includes('details') && /\d+/.test(q)) ||
    (q.includes('show me details for ticket') && /\d+/.test(q))
  ) {
    // Extract ticket number from query (preserve TICK- prefix)
    const ticketNumberMatch = q.match(/tick-?(\d+)/i);
    const ticketNumber = ticketNumberMatch ? `TICK-${ticketNumberMatch[1]}` : null;

    if (ticketNumber) {
      return {
        widgetType: 'live-ticket-detail',
        widgetData: { ticketNumber },
        responseText: `Here are the complete details for ticket #${ticketNumber} from Zoho Desk:`,
      };
    }

    // Fallback to demo if no number found
    return {
      widgetType: 'ticket-detail',
      widgetData: ticketDetailDemo,
      responseText: "Here are the complete details for this ticket:",
    };
  }

  // 3. Call Prep Notes
  if (
    q.includes('prepare for') && q.includes('call') ||
    q.includes('draft prep notes') ||
    q.includes('call preparation') ||
    q.includes('help me prepare')
  ) {
    return {
      widgetType: 'call-prep-notes',
      widgetData: callPrepNotesDemo,
      responseText: "I've prepared comprehensive notes for your upcoming call:",
    };
  }

  // 4. Response Composer
  if (
    q.includes('draft response') ||
    q.includes('draft a response') ||
    q.includes('help me respond') ||
    q.includes('compose response')
  ) {
    return {
      widgetType: 'response-composer',
      widgetData: responseComposerDemo,
      responseText: "I've drafted a response for you to review:",
    };
  }

  // 5. Ticket List (agent's own tickets or live Zoho tickets)
  if (
    q.includes('my tickets') ||
    q.includes('tickets that need attention') ||
    (q.includes('show me') && q.includes('other tickets')) ||
    (q.includes('current tickets') && q.includes('zoho')) ||
    (q.includes('live tickets') && q.includes('dashboard'))
  ) {
    return {
      widgetType: 'ticket-list',
      widgetData: ticketListDemo,
      responseText: "Here are the live tickets from Zoho Desk:",
    };
  }

  // 6. Similar Tickets Analysis
  if (
    q.includes('similar tickets') ||
    q.includes('learn the patterns') ||
    (q.includes('tickets i') && q.includes('resolved'))
  ) {
    return {
      widgetType: 'similar-tickets-analysis',
      widgetData: similarTicketsAnalysisDemo,
      responseText: "Here are patterns from similar tickets you've successfully resolved:",
    };
  }

  // 7. Agent Performance Stats
  if (
    q.includes('performance stats') ||
    q.includes('my stats') ||
    q.includes('my performance') ||
    (q.includes('show me') && q.includes('stats'))
  ) {
    return {
      widgetType: 'agent-performance-stats',
      widgetData: agentPerformanceStatsDemo,
      responseText: "Here's your performance summary for this week:",
    };
  }

  // 8. Knowledge Base Search
  if (
    q.includes('how do i troubleshoot') ||
    q.includes('how to') ||
    q.includes('how can i') ||
    q.includes('search kb') ||
    q.includes('knowledge base')
  ) {
    return {
      widgetType: 'knowledge-base-search',
      widgetData: knowledgeBaseSearchDemo,
      responseText: "I've searched the knowledge base for you:",
    };
  }

  // 9. Knowledge Article
  if (q.includes('open kb') || /kb-?\d+/.test(q)) {
    const kbMatch = q.match(/kb-?(\d+)/i);
    const kbId = kbMatch ? `KB-${kbMatch[1]}` : 'KB-892';

    return {
      widgetType: 'knowledge-article',
      widgetData: { ...knowledgeArticleDemo, id: kbId },
      responseText: `Here's ${kbId}:`,
    };
  }

  // 10. AI Resolution Tracking (NEW)
  if (
    (q.includes('how many') && q.includes('ai') && q.includes('resolve')) ||
    (q.includes('ai') && q.includes('resolved')) ||
    q.includes('ai resolve for me')
  ) {
    return {
      widgetType: 'agent-dashboard',
      widgetData: agentDashboardDemo,
      responseText: "AI automation analytics show resolution statistics for your workload:",
    };
  }

  // 11. Conversation History (NEW)
  if (
    (q.includes('conversation') && q.includes('history')) ||
    (q.includes('show me conversation') && q.includes('with')) ||
    q.includes('conversation history with')
  ) {
    return {
      widgetType: 'ticket-list',
      widgetData: ticketListDemo,
      responseText: "Customer conversation history and interaction timeline:",
    };
  }

  // 12. Jira Ticket Linking (NEW)
  if (
    (q.includes('link') && q.includes('ticket') && q.includes('jira')) ||
    (q.includes('link') && q.includes('jira') && q.includes('issue')) ||
    q.includes('link ticket to jira')
  ) {
    return {
      widgetType: 'ticket-detail',
      widgetData: ticketDetailDemo,
      responseText: "Jira integration interface for linking support tickets to engineering issues:",
    };
  }

  return null;
}

// ============================================================================
// CSM (CUSTOMER SUCCESS MANAGER) QUERIES
// ============================================================================

function detectCSMQuery(q: string): QueryMatch | null {
  // PRIORITY 1: Client Health & Risk (Most Specific First)

  // Declining Product Adoption
  if (
    (q.includes('declining') && q.includes('adoption')) ||
    (q.includes('declining') && q.includes('product')) ||
    q.includes('product adoption') && q.includes('declining')
  ) {
    return {
      widgetType: 'product-adoption-metrics',
      widgetData: null,
      responseText: "Client product adoption analysis shows declining engagement that requires attention:",
    };
  }

  // Churn Risk (Specific Patterns)
  if (
    (q.includes('churn') && (q.includes('risk') || q.includes('quarter'))) ||
    (q.includes('at risk') && q.includes('churn')) ||
    q.includes('risk of churn')
  ) {
    return {
      widgetType: 'churn-risk-analysis',
      widgetData: null,
      responseText: "Client retention risk assessment identifies accounts at risk of churning:",
    };
  }

  // Health Scores (General)
  if (
    q.includes('health score') ||
    q.includes('client health') ||
    (q.includes('show') && q.includes('health') && q.includes('client'))
  ) {
    return {
      widgetType: 'client-health-dashboard',
      widgetData: null,
      responseText: "Client health scores for your assigned portfolio:",
    };
  }

  // Product Adoption (General)
  if (
    q.includes('product adoption') ||
    q.includes('feature usage') ||
    (q.includes('adoption') && q.includes('metric'))
  ) {
    return {
      widgetType: 'product-adoption-metrics',
      widgetData: null,
      responseText: "Product adoption analysis across your client base:",
    };
  }

  // PRIORITY 2: Engagement & Trends

  // Client Engagement Trends
  if (
    (q.includes('engagement') && q.includes('trend')) ||
    (q.includes('client') && q.includes('engagement')) ||
    q.includes('engagement trends month-over-month')
  ) {
    return {
      widgetType: 'client-feedback-dashboard',
      widgetData: null,
      responseText: "Client engagement trend analysis reveals interaction patterns:",
    };
  }

  // PRIORITY 3: Renewals & Revenue

  // Upcoming Renewals (Specific Timeframe)
  if (
    (q.includes('renewal') && (q.includes('upcoming') || q.includes('next'))) ||
    (q.includes('renewal') && q.includes('90 days')) ||
    q.includes('upcoming renewals')
  ) {
    return {
      widgetType: 'renewal-pipeline',
      widgetData: null,
      responseText: "Renewal pipeline for the next 90 days shows contracts requiring attention:",
    };
  }

  // Expansion Opportunities
  if (
    (q.includes('expansion') && q.includes('opportunit')) ||
    (q.includes('identify') && q.includes('expansion')) ||
    q.includes('expansion opportunities')
  ) {
    return {
      widgetType: 'upsell-opportunities',
      widgetData: null,
      responseText: "Revenue expansion analysis identifies growth opportunities across your portfolio:",
    };
  }

  // Premium Tier Upgrades
  if (
    (q.includes('premium') && q.includes('tier') && q.includes('upgrade')) ||
    (q.includes('ready for') && q.includes('upgrade')) ||
    q.includes('premium tier upgrade')
  ) {
    return {
      widgetType: 'upsell-opportunities',
      widgetData: null,
      responseText: "Client upgrade readiness analysis shows accounts positioned for premium tier:",
    };
  }

  // Revenue Retention & Expansion Metrics
  if (
    (q.includes('revenue') && (q.includes('retention') || q.includes('expansion'))) ||
    (q.includes('retention') && q.includes('expansion') && q.includes('metric')) ||
    (q.includes('analyze') && q.includes('revenue'))
  ) {
    return {
      widgetType: 'upsell-opportunities',
      widgetData: null,
      responseText: "Revenue retention and expansion metrics analysis:",
    };
  }

  // Renewal & Contract (General)
  if (q.includes('renewal') || q.includes('contract')) {
    return {
      widgetType: 'renewal-pipeline',
      widgetData: null,
      responseText: "Renewal pipeline overview for your assigned accounts:",
    };
  }

  // Upsell & Cross-sell (General)
  if (
    q.includes('upsell') ||
    q.includes('cross-sell') ||
    q.includes('expansion')
  ) {
    return {
      widgetType: 'upsell-opportunities',
      widgetData: null,
      responseText: "Expansion and upsell opportunities across your client portfolio:",
    };
  }

  // PRIORITY 4: Client Feedback & NPS

  // NPS Survey Results (Specific)
  if (
    (q.includes('nps') && (q.includes('survey') || q.includes('result'))) ||
    (q.includes('recent') && q.includes('nps')) ||
    q.includes('nps survey results')
  ) {
    return {
      widgetType: 'client-feedback-dashboard',
      widgetData: null,
      responseText: "Recent NPS survey results by client reveal satisfaction trends:",
    };
  }

  // Client Feedback & Satisfaction (General)
  if (
    q.includes('nps') ||
    q.includes('feedback') ||
    q.includes('satisfaction')
  ) {
    return {
      widgetType: 'client-feedback-dashboard',
      widgetData: null,
      responseText: "Client feedback and Net Promoter Score analysis:",
    };
  }

  // PRIORITY 5: Business Reviews & Meetings

  // Which Clients Need Business Reviews
  if (
    (q.includes('which') && q.includes('business review')) ||
    (q.includes('need') && q.includes('business review')) ||
    q.includes('clients need business review')
  ) {
    return {
      widgetType: 'business-review-scheduler',
      widgetData: null,
      responseText: "Client business review scheduling assessment shows accounts requiring QBRs:",
    };
  }

  // Schedule Quarterly Business Reviews
  if (
    (q.includes('schedule') && q.includes('business review')) ||
    (q.includes('quarterly') && q.includes('business review')) ||
    q.includes('schedule qbr') ||
    q.includes('quarterly business reviews')
  ) {
    return {
      widgetType: 'business-review-scheduler',
      widgetData: null,
      responseText: "Quarterly business review scheduling interface for top accounts:",
    };
  }

  // Business Review & QBR (General)
  if (q.includes('business review') || q.includes('qbr')) {
    return {
      widgetType: 'business-review-scheduler',
      widgetData: null,
      responseText: "Business review schedule and upcoming client meetings:",
    };
  }

  // PRIORITY 6: Product Roadmap

  // Most Requested Roadmap Items
  if (
    (q.includes('most requested') && q.includes('roadmap')) ||
    (q.includes('roadmap') && q.includes('most requested')) ||
    q.includes('product roadmap items most requested')
  ) {
    return {
      widgetType: 'product-roadmap-view',
      widgetData: null,
      responseText: "Product roadmap analysis highlighting features most requested by clients:",
    };
  }

  // Product Roadmap (General)
  if (
    q.includes('product roadmap') ||
    q.includes('upcoming feature') ||
    q.includes('roadmap')
  ) {
    return {
      widgetType: 'product-roadmap-view',
      widgetData: null,
      responseText: "Product roadmap with client-requested features and development timeline:",
    };
  }

  // FALLBACK: Show CSM dashboard
  return {
    widgetType: 'csm-dashboard',
    widgetData: null,
    responseText: "Customer Success Manager dashboard overview:",
  };
}

// ============================================================================
// V17 ATC MODE QUERIES (Use dedicated conversation files)
// ============================================================================

function detectATCExecutiveQuery(q: string): QueryMatch | null {
  // Use ATC Executive conversation pattern matching
  const atcMatch = findATCExecutiveMatch(q);
  if (atcMatch) {
    return {
      widgetType: atcMatch.widgetType as WidgetType,
      widgetData: atcMatch.widgetData ?? null,
      responseText: atcMatch.aiResponse,
    };
  }

  // Fallback to generic C-Level detection for backward compatibility
  return detectCLevelQuery(q);
}

function detectATCManagerQuery(q: string): QueryMatch | null {
  // Use ATC Manager conversation pattern matching
  const atcMatch = findATCManagerMatch(q);
  if (atcMatch) {
    return {
      widgetType: atcMatch.widgetType as WidgetType,
      widgetData: atcMatch.widgetData ?? null,
      responseText: atcMatch.aiResponse,
    };
  }

  // Fallback to generic CS Manager detection for backward compatibility
  return detectManagerQuery(q);
}

function detectATCSupportQuery(q: string): QueryMatch | null {
  // Use ATC Support conversation pattern matching
  const atcMatch = findATCSupportMatch(q);
  if (atcMatch) {
    return {
      widgetType: atcMatch.widgetType as WidgetType,
      widgetData: atcMatch.widgetData ?? null,
      responseText: atcMatch.aiResponse,
    };
  }

  // Fallback to generic Support Agent detection for backward compatibility
  return detectAgentQuery(q);
}

function detectATCCSMQuery(q: string): QueryMatch | null {
  // Use ATC CSM conversation pattern matching
  const atcMatch = findATCCSMMatch(q);
  if (atcMatch) {
    return {
      widgetType: atcMatch.widgetType as WidgetType,
      widgetData: atcMatch.widgetData ?? null,
      responseText: atcMatch.aiResponse,
    };
  }

  // Fallback to generic CSM detection for backward compatibility
  return detectCSMQuery(q);
}

// ============================================================================
// V17 GOVERNMENT MODE - COR (Contracting Officer's Representative) QUERIES
// ============================================================================

function detectCORQuery(q: string): QueryMatch | null {
  // Ticket Detail (specific ticket numbers) - PRIORITY: Check BEFORE generic queries
  if (
    q.includes('ticket #') ||
    q.includes('ticket number') ||
    /tick-?\d+/i.test(q) ||
    (q.includes('show me ticket') && /\d+/.test(q)) ||
    (q.includes('details') && /\d+/.test(q))
  ) {
    // Extract ticket number from query (preserve TICK- prefix)
    const ticketNumberMatch = q.match(/tick-?(\d+)/i);
    const ticketNumber = ticketNumberMatch ? `TICK-${ticketNumberMatch[1]}` : null;

    console.log('[Query Detection - COR] Ticket query detected. Query:', q);
    console.log('[Query Detection - COR] Regex match:', ticketNumberMatch);
    console.log('[Query Detection - COR] Constructed ticketNumber:', ticketNumber);

    if (ticketNumber) {
      return {
        widgetType: 'live-ticket-detail',
        widgetData: { ticketNumber },
        responseText: `Ticket details for government contract support:`,
      };
    }

    // Fallback to demo if no number found
    return {
      widgetType: 'ticket-detail',
      widgetData: ticketDetailDemo,
      responseText: "Here are the complete details for this ticket:",
    };
  }

  // PRIORITY 0: Contract Status (MUST be checked BEFORE deliverables pattern)
  if (
    (q.includes('current') && q.includes('contract') && q.includes('status')) ||
    (q.includes('contract status') && !q.includes('deliverable')) ||
    (q.includes('show') && q.includes('contract') && q.includes('current'))
  ) {
    return {
      widgetType: 'contract-performance-dashboard',
      widgetData: contractPerformanceDemo,
      responseText: "Your contract portfolio shows performance metrics across all active contracts:",
    };
  }

  // PRIORITY 1: Vendor Performance Metrics (UNIQUE - check FIRST before generic vendor queries)
  if (
    (q.includes('vendor') && q.includes('performance') && q.includes('metric')) ||
    (q.includes('show') && q.includes('vendor performance'))
  ) {
    return {
      widgetType: 'vendor-compliance-dashboard',
      widgetData: vendorComplianceDemo,
      responseText: "Vendor performance metrics show SLA compliance, quality scores, and trend analysis across all active contracts:",
    };
  }

  // PRIORITY 2: Budget Tracking Dashboard (UNIQUE - uses Program Health widget)
  if (
    (q.includes('budget') && q.includes('tracking') && q.includes('dashboard')) ||
    (q.includes('show') && q.includes('budget tracking'))
  ) {
    return {
      widgetType: 'program-health-dashboard',
      widgetData: programHealthDemo,
      responseText: "Budget tracking dashboard displays program health metrics including budget utilization, schedule variance, resource allocation, and risk management:",
    };
  }

  // PRIORITY 3: Compliance Dashboard (UNIQUE - uses Requirements Tracking widget)
  if (
    (q.includes('compliance') && q.includes('dashboard')) ||
    (q.includes('show') && q.includes('compliance dashboard'))
  ) {
    return {
      widgetType: 'requirements-tracking-dashboard',
      widgetData: requirementsTrackingDemo,
      responseText: "Compliance dashboard tracks regulatory requirements, policy adherence, and compliance metrics across all contracts and vendors:",
    };
  }

  // PRIORITY 4: Contract Deliverables Status (UNIQUE)
  if (
    (q.includes('contract') && q.includes('deliverable') && q.includes('status')) ||
    (q.includes('deliverable') && q.includes('status')) ||
    (q.includes('show') && q.includes('deliverables status'))
  ) {
    return {
      widgetType: 'deliverable-review-list',
      widgetData: deliverableReviewListDemo,
      responseText: "Contract deliverables status shows pending reviews, submissions, approvals, and quality scores across all active contracts:",
    };
  }

  // Contract Performance (generic)
  if (
    q.includes('contract performance') ||
    (q.includes('show') && q.includes('contract') && q.includes('performance'))
  ) {
    return {
      widgetType: 'contract-performance-dashboard',
      widgetData: contractPerformanceDemo,
      responseText: "Contract performance analysis displays SLA compliance, budget utilization, and deliverable completion rates:",
    };
  }

  // Deliverable Reviews (generic)
  if (
    q.includes('deliverable') && (q.includes('review') || q.includes('pending') || q.includes('approve')) ||
    q.includes('pending deliverables') ||
    q.includes('deliverable review')
  ) {
    return {
      widgetType: 'deliverable-review-list',
      widgetData: deliverableReviewListDemo,
      responseText: "Deliverable review queue shows items requiring your attention and approval:",
    };
  }

  // Vendor Compliance (generic)
  if (
    q.includes('vendor compliance') ||
    (q.includes('vendor') && q.includes('sla'))
  ) {
    return {
      widgetType: 'vendor-compliance-dashboard',
      widgetData: vendorComplianceDemo,
      responseText: "Vendor compliance monitoring indicates the following status across your portfolio:",
    };
  }

  // Budget queries (generic)
  if (q.includes('budget') && (q.includes('status') || q.includes('utilization') || q.includes('remaining'))) {
    return {
      widgetType: 'contract-performance-dashboard',
      widgetData: contractPerformanceDemo,
      responseText: "Budget tracking for CON-2025-042 shows utilization against allocated funds:",
    };
  }

  // SLA compliance (generic)
  if (q.includes('sla') && (q.includes('compliance') || q.includes('breach') || q.includes('violation'))) {
    return {
      widgetType: 'vendor-compliance-dashboard',
      widgetData: vendorComplianceDemo,
      responseText: "SLA compliance analysis reveals vendor performance against contractual obligations:",
    };
  }

  // Quality issues (generic)
  if (q.includes('quality') && (q.includes('issue') || q.includes('score') || q.includes('problem'))) {
    return {
      widgetType: 'deliverable-review-list',
      widgetData: deliverableReviewListDemo,
      responseText: "Quality assurance review identifies deliverables with technical concerns requiring resolution:",
    };
  }

  // Default: Show contract performance
  return {
    widgetType: 'contract-performance-dashboard',
    widgetData: contractPerformanceDemo,
    responseText: "Contract oversight dashboard displays performance tracking for your active portfolio:",
  };
}

// ============================================================================
// V17 GOVERNMENT MODE - PROGRAM MANAGER QUERIES
// ============================================================================

function detectProgramManagerQuery(q: string): QueryMatch | null {
  // Program Health → Stakeholder Engagement Dashboard
  if (
    q.includes('program health') ||
    q.includes('program status') ||
    q.includes('program dashboard')
  ) {
    return {
      widgetType: 'stakeholder-engagement-dashboard',
      widgetData: stakeholderEngagementDemo,
      responseText: "Program stakeholder engagement shows communication effectiveness across all program stakeholders:",
    };
  }

  // Milestones → Sprint Burndown (shows progress tracking toward milestones)
  if (q.includes('milestone') && (q.includes('status') || q.includes('track') || q.includes('progress'))) {
    return {
      widgetType: 'sprint-burndown-chart',
      widgetData: sprintBurndownDemo,
      responseText: "Strategic milestone tracking shows sprint progress and completion velocity across program phases:",
    };
  }

  // Risks → Change Request Dashboard
  if (q.includes('risk') && (q.includes('top') || q.includes('critical') || q.includes('high'))) {
    return {
      widgetType: 'change-request-dashboard',
      widgetData: changeRequestDemo,
      responseText: "Critical risks requiring change request review and approval:",
    };
  }

  // Budget/Schedule variance → Team Velocity Dashboard
  if (q.includes('variance') || (q.includes('schedule') && q.includes('status'))) {
    return {
      widgetType: 'team-velocity-dashboard',
      widgetData: teamVelocityDemo,
      responseText: "Schedule variance analysis shows team velocity and sprint performance impact:",
    };
  }

  // Resources → Resource Capacity Dashboard
  if (q.includes('resource') && (q.includes('availability') || q.includes('allocation') || q.includes('capacity'))) {
    return {
      widgetType: 'resource-capacity-dashboard',
      widgetData: resourceCapacityDemo,
      responseText: "Resource allocation across initiatives shows capacity and utilization:",
    };
  }

  // Default: Contract Performance Dashboard
  return {
    widgetType: 'contract-performance-dashboard',
    widgetData: contractPerformanceDemo,
    responseText: "Program portfolio overview showing contract performance metrics:",
  };
}

// ============================================================================
// V17 GOVERNMENT MODE - STAKEHOLDER LEAD QUERIES
// ============================================================================

function detectStakeholderLeadQuery(q: string): QueryMatch | null {
  // Stakeholder Engagement → Stakeholder Engagement Dashboard (proper widget for Jessica Martinez)
  if (
    q.includes('stakeholder') && (q.includes('engagement') || q.includes('status') || q.includes('communication')) ||
    q.includes('stakeholder dashboard')
  ) {
    return {
      widgetType: 'stakeholder-engagement-dashboard',
      widgetData: stakeholderEngagementDemo,
      responseText: "Stakeholder engagement metrics show communication effectiveness and relationship health:",
    };
  }

  // Requirements Tracking → Requirements Tracking Dashboard (proper widget for Jessica Martinez)
  if (
    q.includes('requirement') && (q.includes('track') || q.includes('status') || q.includes('progress')) ||
    q.includes('requirements tracking')
  ) {
    return {
      widgetType: 'requirements-tracking-dashboard',
      widgetData: requirementsTrackingDemo,
      responseText: "Requirements tracking status shows implementation progress and validation metrics:",
    };
  }

  // Change Requests → Blocker Resolution Dashboard (stakeholder-identified blockers)
  if (
    q.includes('change request') ||
    (q.includes('change') && (q.includes('pending') || q.includes('approval') || q.includes('approved')))
  ) {
    return {
      widgetType: 'blocker-resolution-dashboard',
      widgetData: blockerResolutionDemo,
      responseText: "Critical blockers and change requests requiring stakeholder escalation and resolution:",
    };
  }

  // Meetings → Meeting Scheduler (stakeholder coordination meetings)
  if (q.includes('meeting') && (q.includes('upcoming') || q.includes('schedule') || q.includes('next'))) {
    return {
      widgetType: 'meeting-scheduler',
      widgetData: meetingSchedulerDemo,
      responseText: "Upcoming stakeholder coordination meetings with DNR program office:",
    };
  }

  // Action items → Interactive Update (stakeholder action items and updates)
  if (q.includes('action item') || (q.includes('action') && q.includes('pending'))) {
    return {
      widgetType: 'interactive-update',
      widgetData: profileUpdateSuccessDemo,
      responseText: "Pending action items from stakeholder meetings require follow-up and closure:",
    };
  }

  // Traceability → Analytics Dashboard (requirements analytics and coverage)
  if (q.includes('traceability') || (q.includes('requirement') && q.includes('coverage'))) {
    return {
      widgetType: 'analytics-dashboard',
      widgetData: analyticsDashboardDemo,
      responseText: "Requirements traceability analytics showing coverage from business needs to implementation:",
    };
  }

  // Default: Executive Summary (high-level stakeholder overview)
  return {
    widgetType: 'executive-summary',
    widgetData: executiveSummaryDemo,
    responseText: "Stakeholder management executive summary displays key metrics and engagement status:",
  };
}

// ============================================================================
// V17 PROJECT MODE - PROJECT MANAGER QUERIES
// ============================================================================

function detectProjectManagerQuery(q: string): QueryMatch | null {
  // Sprint Burndown
  if (
    q.includes('burndown') ||
    q.includes('sprint progress') ||
    (q.includes('sprint') && (q.includes('status') || q.includes('track')))
  ) {
    return {
      widgetType: 'sprint-burndown-chart',
      widgetData: sprintBurndownDemo,
      responseText: "Sprint 24 velocity tracking shows current progress against commitment:",
    };
  }

  // Team Velocity
  if (
    q.includes('velocity') ||
    q.includes('team performance') ||
    (q.includes('team') && q.includes('capacity'))
  ) {
    return {
      widgetType: 'team-velocity-dashboard',
      widgetData: teamVelocityDemo,
      responseText: "Team capacity analysis indicates velocity trends across the last 6 sprints:",
    };
  }

  // Resource Capacity
  if (
    q.includes('resource') && (q.includes('capacity') || q.includes('allocation') || q.includes('availability')) ||
    q.includes('team capacity')
  ) {
    return {
      widgetType: 'resource-capacity-dashboard',
      widgetData: resourceCapacityDemo,
      responseText: "Resource allocation for current sprint shows team availability and utilization:",
    };
  }

  // Sprint planning → Task Kanban Board (show upcoming sprint tasks)
  if (q.includes('sprint planning') || (q.includes('sprint') && q.includes('plan'))) {
    return {
      widgetType: 'task-kanban-board',
      widgetData: taskKanbanDemo,
      responseText: "Sprint planning task board shows backlog items ready for next sprint commitment:",
    };
  }

  // Blockers → Blocker Resolution Dashboard (actual blockers/impediments)
  if (q.includes('blocker') || q.includes('blocked task')) {
    return {
      widgetType: 'blocker-resolution-dashboard',
      widgetData: blockerResolutionDemo,
      responseText: "Active blockers and impediments requiring immediate resolution:",
    };
  }

  // Scope management
  if (q.includes('scope') || q.includes('scope creep')) {
    return {
      widgetType: 'change-request-dashboard',
      widgetData: changeRequestDemo,
      responseText: "Scope change requests requiring PM review and approval:",
    };
  }

  // Project Status → Sprint Burndown Chart (shows overall project progress)
  if (
    (q.includes('project') && q.includes('status')) ||
    q.includes('project overview') ||
    q.includes('project progress')
  ) {
    return {
      widgetType: 'sprint-burndown-chart',
      widgetData: sprintBurndownDemo,
      responseText: "Current project status shows sprint progress and delivery timeline:",
    };
  }

  // Default: Stakeholder Engagement (PM coordinates stakeholders)
  return {
    widgetType: 'stakeholder-engagement-dashboard',
    widgetData: stakeholderEngagementDemo,
    responseText: "Project coordination dashboard shows stakeholder engagement and sprint status:",
  };
}

// ============================================================================
// V17 PROJECT MODE - SERVICE TEAM LEAD QUERIES (Government Enhanced)
// ============================================================================

function detectServiceTeamLeadQuery(q: string): QueryMatch | null {
  // PRIORITY 1: Team Workload / Status (Project context - most requested)
  if (
    (q.includes('team') && q.includes('workload')) ||
    (q.includes('team') && q.includes('status')) ||
    (q.includes('show') && q.includes('team')) ||
    q.includes("what's my team working on")
  ) {
    return {
      widgetType: 'team-workload-dashboard',
      widgetData: teamWorkloadDashboardDemo,
      responseText: "Project service team workload shows task distribution and capacity across team members:",
    };
  }

  // Code Quality Dashboard (includes code coverage and technical debt)
  if (
    q.includes('code quality') ||
    (q.includes('show') && q.includes('code quality')) ||
    q.includes('technical debt') ||
    q.includes('test coverage') ||
    q.includes('code coverage') ||
    (q.includes('coverage') && q.includes('debt')) ||
    (q.includes('code') && (q.includes('smell') || q.includes('issue') || q.includes('metric')))
  ) {
    return {
      widgetType: 'code-quality-dashboard',
      widgetData: codeQualityDemo,
      responseText: "Code quality metrics show technical debt trends, test coverage, and code health status:",
    };
  }

  // Deployment Pipeline Status
  if (
    q.includes('deployment') ||
    (q.includes('show') && q.includes('deployment')) ||
    q.includes('pipeline') ||
    q.includes('ci/cd') ||
    (q.includes('deploy') && q.includes('status'))
  ) {
    return {
      widgetType: 'deployment-pipeline-dashboard',
      widgetData: deploymentPipelineDemo,
      responseText: "Deployment pipeline status shows CI/CD health, build success rates, and recent deployments:",
    };
  }

  // Technical Debt Tracking (explicit queries)
  if (
    (q.includes('technical') && q.includes('debt')) ||
    q.includes('tech debt') ||
    q.includes('refactoring backlog')
  ) {
    return {
      widgetType: 'code-quality-dashboard',
      widgetData: codeQualityDemo,
      responseText: "Technical debt analysis identifies areas requiring refactoring and improvement:",
    };
  }

  // Blockers → Blocker Resolution Dashboard
  if (
    (q.includes('blocker') && (q.includes('resolve') || q.includes('resolution') || q.includes('active'))) ||
    q.includes('blocked tasks')
  ) {
    return {
      widgetType: 'blocker-resolution-dashboard',
      widgetData: blockerResolutionDemo,
      responseText: "Real-time blocker metrics show active impediments requiring immediate technical resolution:",
    };
  }

  // Team Performance Analytics
  if (
    (q.includes('team') && q.includes('performance')) ||
    q.includes('team analytics') ||
    q.includes('developer metrics')
  ) {
    return {
      widgetType: 'agent-performance-comparison',
      widgetData: agentPerformanceComparisonDemo,
      responseText: "Team performance comparison shows individual contributions and efficiency metrics:",
    };
  }

  // Performance metrics (DORA) → Dedicated DORA Metrics Dashboard
  if (q.includes('dora') || (q.includes('performance') && (q.includes('metric') || q.includes('kpi')))) {
    return {
      widgetType: 'dora-metrics-dashboard',
      widgetData: doraMetricsDemo,
      responseText: "DORA metrics show deployment frequency, lead time for changes, change failure rate, and mean time to recovery:",
    };
  }

  // Default: Team Workload Dashboard (most useful for team lead)
  return {
    widgetType: 'team-workload-dashboard',
    widgetData: teamWorkloadDashboardDemo,
    responseText: "Service team lead dashboard displays team workload and task assignments:",
  };
}

// ============================================================================
// V17 PROJECT MODE - SERVICE TEAM MEMBER QUERIES (Government Enhanced)
// ============================================================================

function detectServiceTeamMemberQuery(q: string): QueryMatch | null {
  // IC-FOCUSED QUERIES ONLY (No strategic/program-level data)

  // PRIORITY 0: Daily Update / Standup - task-focused dashboard
  if (
    q.includes('daily update') ||
    q.includes('standup') ||
    q.includes('daily standup') ||
    q.includes('morning update') ||
    (q.includes('today') && q.includes('update'))
  ) {
    return {
      widgetType: 'agent-dashboard',
      widgetData: agentDashboardDemo,
      responseText: "Here's your daily update with today's sprint tasks, blockers, and priorities:",
    };
  }

  // PRIORITY 1: My Assigned Requests / Tasks (Government context)
  if (
    q.includes('my assigned') ||
    (q.includes('show') && q.includes('my') && q.includes('request')) ||
    q.includes('assigned to me') ||
    q.includes('my tasks') ||
    q.includes('my sprint tasks') ||
    q.includes('my work') ||
    q.includes('what should i work on') ||
    q.includes('my priorities') ||
    (q.includes('task') && (q.includes('assigned') || q.includes('mine')))
  ) {
    return {
      widgetType: 'agent-dashboard',
      widgetData: agentDashboardDemo,
      responseText: "Your personal task dashboard shows assigned project tasks and priorities:",
    };
  }

  // Time Tracking
  if (
    q.includes('time tracking') ||
    q.includes('time logged') ||
    q.includes('my hours') ||
    (q.includes('show') && q.includes('time'))
  ) {
    return {
      widgetType: 'agent-performance-stats',
      widgetData: agentPerformanceStatsDemo,
      responseText: "Time tracking summary shows hours logged and task completion status:",
    };
  }

  // My Pull Requests / Code Reviews
  if (
    q.includes('my pull request') ||
    q.includes('my pr') ||
    q.includes('pull requests') ||
    (q.includes('review') && q.includes('status'))
  ) {
    return {
      widgetType: 'code-quality-dashboard',
      widgetData: codeQualityDemo,
      responseText: "Your pull requests and code review status:",
    };
  }

  // My Performance Stats
  if (
    q.includes('my performance') ||
    q.includes('my stats') ||
    (q.includes('performance') && q.includes('sprint'))
  ) {
    return {
      widgetType: 'agent-performance-stats',
      widgetData: agentPerformanceStatsDemo,
      responseText: "Your personal performance metrics for this sprint:",
    };
  }

  // My Blockers
  if (
    q.includes('my blocker') ||
    q.includes('blockers affecting') ||
    (q.includes('blocker') && !q.includes('team'))
  ) {
    return {
      widgetType: 'system-access-status',
      widgetData: multiSystemAccessResolvedDemo,
      responseText: "Blockers currently affecting your work:",
    };
  }

  // My Current Stories/Tasks
  if (
    q.includes('my stories') ||
    q.includes('my current stories') ||
    q.includes('assigned stories')
  ) {
    return {
      widgetType: 'task-kanban-board',
      widgetData: taskKanbanDemo,
      responseText: "Your assigned stories and tasks for the current sprint:",
    };
  }

  // Knowledge base (IC has access to documentation)
  if (
    q.includes('how to') ||
    q.includes('troubleshoot') ||
    q.includes('knowledge') ||
    q.includes('documentation') ||
    q.includes('guide') ||
    q.includes('search')
  ) {
    return {
      widgetType: 'knowledge-article',
      widgetData: knowledgeArticleDemo,
      responseText: "Knowledge base search found relevant documentation:",
    };
  }

  // Code quality issues (personal code quality)
  if (q.includes('code') && (q.includes('issue') || q.includes('bug') || q.includes('fix'))) {
    return {
      widgetType: 'code-quality-dashboard',
      widgetData: codeQualityDemo,
      responseText: "Code quality issues in your recent commits:",
    };
  }

  // Default: Show personal performance stats (IC-appropriate)
  return {
    widgetType: 'agent-performance-stats',
    widgetData: agentPerformanceStatsDemo,
    responseText: "Your performance metrics show code contributions, PR reviews, and sprint velocity:",
  };
}
