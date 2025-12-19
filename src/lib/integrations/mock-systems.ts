/**
 * Mock External System Integrations
 *
 * For demo purposes, these are simulated integrations.
 * In production, these would connect to real Azure AD, Slack, Jira, LMS, etc.
 */

export interface IntegrationResult {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
}

// ========================================
// AZURE AD / ACTIVE DIRECTORY
// ========================================

/**
 * Check if account is locked in Active Directory
 */
export async function checkAccountLockStatus(email: string): Promise<IntegrationResult> {
  console.log(`[Mock Azure AD] Checking lock status for ${email}`);

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Demo: 80% chance account is locked (can auto-unlock)
  const isLocked = Math.random() < 0.8;

  return {
    success: true,
    message: isLocked ? 'Account is locked' : 'Account is not locked',
    data: {
      email,
      isLocked,
      lockReason: isLocked ? 'Too many failed login attempts' : null,
      lastLogin: new Date(Date.now() - 86400000).toISOString(),
      canAutoUnlock: isLocked,
    },
  };
}

/**
 * Unlock user account in Active Directory
 */
export async function unlockAccount(email: string): Promise<IntegrationResult> {
  console.log(`[Mock Azure AD] Unlocking account for ${email}`);

  await new Promise(resolve => setTimeout(resolve, 800));

  return {
    success: true,
    message: 'Account successfully unlocked',
    data: {
      email,
      unlockedAt: new Date().toISOString(),
      resetRequired: false,
    },
  };
}

/**
 * Check if user exists in Azure AD (for onboarding verification)
 */
export async function verifyUserOnboarding(email: string): Promise<IntegrationResult> {
  console.log(`[Mock Azure AD] Verifying onboarding for ${email}`);

  await new Promise(resolve => setTimeout(resolve, 500));

  // Demo: 70% of users are onboarded
  const isOnboarded = Math.random() < 0.7;

  return {
    success: true,
    message: isOnboarded ? 'User found in directory' : 'User not found - onboarding incomplete',
    data: {
      email,
      exists: isOnboarded,
      accountCreatedAt: isOnboarded ? new Date(Date.now() - 7 * 86400000).toISOString() : null,
      department: isOnboarded ? 'Engineering' : null,
    },
  };
}

// ========================================
// SLACK / COLLABORATION TOOLS
// ========================================

/**
 * Provision Slack access for user
 */
export async function provisionSlackAccess(email: string): Promise<IntegrationResult> {
  console.log(`[Mock Slack] Provisioning access for ${email}`);

  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    success: true,
    message: 'Slack access provisioned successfully',
    data: {
      email,
      slackUserId: `U${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
      workspaceUrl: 'https://yourcompany.slack.com',
      channelsAdded: ['#general', '#announcements', '#engineering'],
    },
  };
}

/**
 * Provision SharePoint access
 */
export async function provisionSharePointAccess(email: string, siteName: string): Promise<IntegrationResult> {
  console.log(`[Mock SharePoint] Provisioning ${siteName} access for ${email}`);

  await new Promise(resolve => setTimeout(resolve, 800));

  return {
    success: true,
    message: `SharePoint access to "${siteName}" granted`,
    data: {
      email,
      siteName,
      siteUrl: `https://yourcompany.sharepoint.com/sites/${siteName.toLowerCase().replace(/\s/g, '-')}`,
      permissionLevel: 'Member',
    },
  };
}

// ========================================
// KNOWLEDGE BASE / DOCUMENTATION
// ========================================

/**
 * Search knowledge base for relevant articles
 */
export async function searchKnowledgeBase(query: string): Promise<IntegrationResult> {
  console.log(`[Mock KB] Searching for: "${query}"`);

  await new Promise(resolve => setTimeout(resolve, 600));

  const queryLower = query.toLowerCase();

  // Demo KB articles with keywords for matching
  const articles = [
    {
      title: 'How to Export Data to CSV or Excel',
      url: 'https://kb.example.com/data-export',
      keywords: ['export', 'data', 'csv', 'excel', 'download', 'spreadsheet'],
      relevance: 0.95
    },
    {
      title: 'How to Reset Your Password',
      url: 'https://kb.example.com/password-reset',
      keywords: ['password', 'reset', 'forgot', 'login'],
      relevance: 0.95
    },
    {
      title: 'Account Lockout Troubleshooting',
      url: 'https://kb.example.com/account-lockout',
      keywords: ['lock', 'locked', 'lockout', 'account', 'unlock'],
      relevance: 0.88
    },
    {
      title: 'Accessing SharePoint Sites',
      url: 'https://kb.example.com/sharepoint-access',
      keywords: ['sharepoint', 'access', 'permission', 'site'],
      relevance: 0.82
    },
    {
      title: 'Printer Setup and Troubleshooting Guide',
      url: 'https://kb.example.com/printer-setup',
      keywords: ['printer', 'print', 'printing', 'setup', 'install'],
      relevance: 0.79
    },
    {
      title: 'Email Notification Settings',
      url: 'https://kb.example.com/email-notifications',
      keywords: ['email', 'notification', 'alerts', 'receiving'],
      relevance: 0.75
    },
  ];

  // Score articles based on keyword matching
  const scoredArticles = articles.map(article => {
    let matchScore = 0;
    article.keywords.forEach(keyword => {
      if (queryLower.includes(keyword)) {
        matchScore += 1;
      }
    });
    return {
      ...article,
      matchScore,
      // Adjust relevance based on match score
      relevance: matchScore > 0 ? Math.min(0.98, article.relevance + (matchScore * 0.1)) : article.relevance * 0.3
    };
  });

  // Sort by relevance score
  scoredArticles.sort((a, b) => b.relevance - a.relevance);

  // Return best match
  const bestMatch = scoredArticles[0];

  return {
    success: true,
    message: 'Knowledge base article found',
    data: {
      query,
      article: {
        title: bestMatch.title,
        url: bestMatch.url,
        relevance: bestMatch.relevance
      },
      totalResults: articles.length,
      matchScore: bestMatch.matchScore,
    },
  };
}

// ========================================
// JIRA / ISSUE TRACKING
// ========================================

/**
 * Create Jira ticket for IT support
 */
export async function createJiraTicket(summary: string, description: string, issueType: string = 'Support'): Promise<IntegrationResult> {
  console.log(`[Mock Jira] Creating ${issueType} ticket: ${summary}`);

  await new Promise(resolve => setTimeout(resolve, 1200));

  const ticketKey = `SUP-${Math.floor(Math.random() * 9000) + 1000}`;

  return {
    success: true,
    message: 'Jira ticket created successfully',
    data: {
      key: ticketKey,
      summary,
      description,
      issueType,
      status: 'Open',
      priority: 'Medium',
      assignee: 'IT Support Queue',
      url: `https://yourcompany.atlassian.net/browse/${ticketKey}`,
      createdAt: new Date().toISOString(),
    },
  };
}

// ========================================
// LMS / LEARNING MANAGEMENT SYSTEM
// ========================================

/**
 * Check course completion status in LMS
 */
export async function checkCourseCompletion(email: string, courseName: string): Promise<IntegrationResult> {
  console.log(`[Mock LMS] Checking "${courseName}" completion for ${email}`);

  await new Promise(resolve => setTimeout(resolve, 700));

  // Demo: 60% of courses are actually complete but not marked
  const isComplete = Math.random() < 0.6;
  const progress = isComplete ? 100 : Math.floor(Math.random() * 95) + 1;

  return {
    success: true,
    message: isComplete ? 'Course is complete' : 'Course is not fully complete',
    data: {
      email,
      courseName,
      progress,
      isComplete,
      lastActivityDate: new Date(Date.now() - 3 * 86400000).toISOString(),
      quizzesPassed: isComplete ? 5 : 4,
      totalQuizzes: 5,
    },
  };
}

/**
 * Mark course as complete in LMS
 */
export async function markCourseComplete(email: string, courseName: string): Promise<IntegrationResult> {
  console.log(`[Mock LMS] Marking "${courseName}" complete for ${email}`);

  await new Promise(resolve => setTimeout(resolve, 900));

  return {
    success: true,
    message: 'Course marked as complete',
    data: {
      email,
      courseName,
      completedAt: new Date().toISOString(),
      certificateUrl: `https://lms.example.com/certificates/${Math.random().toString(36).substring(7)}`,
      creditsEarned: 2.5,
    },
  };
}

// ========================================
// DEVOPS / MONITORING
// ========================================

/**
 * Check system health (email notifications, etc.)
 */
export async function checkSystemHealth(systemName: string): Promise<IntegrationResult> {
  console.log(`[Mock DevOps] Checking health of ${systemName}`);

  await new Promise(resolve => setTimeout(resolve, 600));

  // Demo: 20% chance of system issue
  const hasIssue = Math.random() < 0.2;

  return {
    success: true,
    message: hasIssue ? 'System health degraded' : 'System health: OK',
    data: {
      systemName,
      status: hasIssue ? 'degraded' : 'operational',
      uptime: '99.8%',
      lastIncident: hasIssue ? new Date(Date.now() - 3600000).toISOString() : null,
      affectedServices: hasIssue ? ['email-notifications', 'webhook-delivery'] : [],
    },
  };
}

/**
 * Create DevOps alert/incident
 */
export async function createDevOpsAlert(title: string, description: string, severity: 'low' | 'medium' | 'high' = 'medium'): Promise<IntegrationResult> {
  console.log(`[Mock DevOps] Creating ${severity} alert: ${title}`);

  await new Promise(resolve => setTimeout(resolve, 500));

  const incidentId = `INC-${Date.now().toString(36).toUpperCase()}`;

  return {
    success: true,
    message: 'DevOps alert created',
    data: {
      incidentId,
      title,
      description,
      severity,
      status: 'investigating',
      assignedTeam: 'DevOps On-Call',
      slackChannel: '#incidents',
      createdAt: new Date().toISOString(),
    },
  };
}

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Simulate network delay
 */
export async function simulateDelay(ms: number = 500): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Random boolean with configurable probability
 */
export function randomSuccess(probability: number = 0.8): boolean {
  return Math.random() < probability;
}
