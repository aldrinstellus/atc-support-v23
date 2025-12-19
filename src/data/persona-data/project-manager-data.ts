// =============================================================================
// PROJECT MANAGER - Dale Thompson
// Unique, realistic data for agile software development project management
// =============================================================================

import type { SprintBurndownData, TeamVelocityData, TaskKanbanData } from '@/types/widget';

/**
 * PROJECT MANAGER PRIMARY SPRINT: Sprint 24 - Q4 Feature Release
 * Unique characteristics:
 * - Two-week sprint (Nov 4-17, 2025)
 * - Focus on user authentication and payment features
 * - 8-person development team
 * - Mobile app + web platform
 */
export const pmSprintBurndownData: SprintBurndownData = {
  title: 'Sprint 24 Burndown Chart',
  sprint: {
    name: 'Sprint 24 - Q4 Feature Release',
    startDate: '2025-11-04',
    endDate: '2025-11-17',
    totalStoryPoints: 55,
    completedStoryPoints: 40,
  },
  status: 'on-track' as const,
  velocity: {
    current: 42,
    average: 47,
    trend: 'stable' as const,
  },
  burndown: [
    { date: '2025-11-04', idealRemaining: 55, actualRemaining: 55 },
    { date: '2025-11-05', idealRemaining: 50, actualRemaining: 52 },
    { date: '2025-11-06', idealRemaining: 45, actualRemaining: 48 },
    { date: '2025-11-07', idealRemaining: 40, actualRemaining: 43 },
    { date: '2025-11-08', idealRemaining: 35, actualRemaining: 37 },
    { date: '2025-11-11', idealRemaining: 30, actualRemaining: 30 },
    { date: '2025-11-12', idealRemaining: 25, actualRemaining: 24 },
    { date: '2025-11-13', idealRemaining: 20, actualRemaining: 15 },
    { date: '2025-11-14', idealRemaining: 15, actualRemaining: 15 },
    { date: '2025-11-17', idealRemaining: 0, actualRemaining: 15 },
  ],
  risks: [
    'Payment gateway sandbox access delayed - API credentials pending',
    'iOS build pipeline intermittent failures - 30% failure rate',
  ],
};

/**
 * PROJECT MANAGER TEAM VELOCITY
 * Historical sprint performance over last 6 sprints
 */
export const pmTeamVelocityData: TeamVelocityData = {
  title: 'Team Velocity Trends',
  currentSprint: {
    name: 'Sprint 24',
    velocity: 42,
    capacity: 50,
    utilizationRate: 84,
  },
  velocityTrend: [
    { sprint: 'Sprint 18', plannedVelocity: 52, actualVelocity: 48 },
    { sprint: 'Sprint 19', plannedVelocity: 50, actualVelocity: 50 },
    { sprint: 'Sprint 20', plannedVelocity: 55, actualVelocity: 51 },
    { sprint: 'Sprint 21', plannedVelocity: 48, actualVelocity: 46 },
    { sprint: 'Sprint 22', plannedVelocity: 53, actualVelocity: 49 },
    { sprint: 'Sprint 23', plannedVelocity: 51, actualVelocity: 47 },
  ],
  teamMembers: [
    {
      name: 'Aisha Okafor',
      role: 'Senior Backend Engineer',
      capacity: 40,
      assigned: 38,
      completed: 13,
      utilizationRate: 95,
    },
    {
      name: 'Marcus Lee',
      role: 'Backend Engineer',
      capacity: 40,
      assigned: 32,
      completed: 11,
      utilizationRate: 80,
    },
    {
      name: 'Elena Volkov',
      role: 'Frontend Engineer',
      capacity: 40,
      assigned: 35,
      completed: 8,
      utilizationRate: 88,
    },
    {
      name: 'Priya Sharma',
      role: 'Mobile Engineer (iOS)',
      capacity: 40,
      assigned: 36,
      completed: 13,
      utilizationRate: 90,
    },
    {
      name: 'Carlos Rivera',
      role: 'Mobile Engineer (Android)',
      capacity: 40,
      assigned: 32,
      completed: 10,
      utilizationRate: 80,
    },
    {
      name: 'Jordan Kim',
      role: 'Full Stack Engineer',
      capacity: 40,
      assigned: 28,
      completed: 7,
      utilizationRate: 70,
    },
  ],
  predictability: {
    score: 92,
    consistency: 'High - Team consistently delivers 46-51 story points per sprint',
  },
};

/**
 * PROJECT MANAGER TASK KANBAN BOARD
 * Current sprint work breakdown
 */
export const pmTaskKanbanData: TaskKanbanData = {
  title: 'Sprint 24 Task Board',
  sprint: 'Sprint 24 - Q4 Feature Release',
  columns: [
    {
      name: 'todo' as const,
      tasks: [
        {
          id: 'TASK-398',
          title: 'Implement Stripe webhook handlers',
          assignedTo: 'Marcus Lee',
          priority: 'high' as const,
          storyPoints: 5,
          blockedBy: 'Waiting for Stripe API credentials',
          tags: ['backend', 'payment'],
        },
        {
          id: 'TASK-401',
          title: 'Design payment confirmation screen (mobile)',
          assignedTo: 'Priya Sharma',
          priority: 'high' as const,
          storyPoints: 3,
          tags: ['mobile', 'ui'],
        },
        {
          id: 'TASK-405',
          title: 'Add push notification settings page',
          assignedTo: 'Unassigned',
          priority: 'medium' as const,
          storyPoints: 5,
          tags: ['mobile', 'settings'],
        },
        {
          id: 'TASK-407',
          title: 'Update API documentation for OAuth endpoints',
          assignedTo: 'Jordan Kim',
          priority: 'low' as const,
          storyPoints: 2,
          tags: ['documentation'],
        },
      ],
    },
    {
      name: 'in-progress' as const,
      tasks: [
        {
          id: 'TASK-392',
          title: 'OAuth 2.0 token refresh logic',
          assignedTo: 'Aisha Okafor',
          priority: 'critical' as const,
          storyPoints: 8,
          tags: ['backend', 'security'],
        },
        {
          id: 'TASK-395',
          title: 'FCM push notification service integration',
          assignedTo: 'Carlos Rivera',
          priority: 'high' as const,
          storyPoints: 5,
          tags: ['mobile', 'backend'],
        },
        {
          id: 'TASK-399',
          title: 'Payment amount validation and formatting',
          assignedTo: 'Elena Volkov',
          priority: 'high' as const,
          storyPoints: 3,
          tags: ['frontend', 'validation'],
        },
        {
          id: 'TASK-402',
          title: 'Add biometric authentication option (iOS)',
          assignedTo: 'Priya Sharma',
          priority: 'medium' as const,
          storyPoints: 5,
          tags: ['mobile', 'security'],
        },
        {
          id: 'TASK-404',
          title: 'Implement payment retry logic',
          assignedTo: 'Marcus Lee',
          priority: 'medium' as const,
          storyPoints: 3,
          tags: ['backend', 'payment'],
        },
      ],
    },
    {
      name: 'review' as const,
      tasks: [
        {
          id: 'TASK-389',
          title: 'OAuth consent screen UI',
          assignedTo: 'Elena Volkov',
          priority: 'high' as const,
          storyPoints: 5,
          tags: ['frontend', 'ui'],
        },
        {
          id: 'TASK-393',
          title: 'Social login integration (Google, Apple)',
          assignedTo: 'Aisha Okafor',
          priority: 'high' as const,
          storyPoints: 5,
          tags: ['backend', 'integration'],
        },
        {
          id: 'TASK-396',
          title: 'Push notification permission request flow',
          assignedTo: 'Carlos Rivera',
          priority: 'medium' as const,
          storyPoints: 2,
          tags: ['mobile', 'ui'],
        },
      ],
    },
    {
      name: 'done' as const,
      tasks: [
        {
          id: 'TASK-387',
          title: 'OAuth 2.0 authorization server setup',
          assignedTo: 'Aisha Okafor',
          priority: 'critical' as const,
          storyPoints: 8,
          tags: ['backend', 'security'],
        },
        {
          id: 'TASK-388',
          title: 'User authentication database schema',
          assignedTo: 'Marcus Lee',
          priority: 'critical' as const,
          storyPoints: 5,
          tags: ['database', 'backend'],
        },
        {
          id: 'TASK-390',
          title: 'Login screen redesign (mobile)',
          assignedTo: 'Priya Sharma',
          priority: 'high' as const,
          storyPoints: 5,
          tags: ['mobile', 'ui'],
        },
        {
          id: 'TASK-391',
          title: 'Session management middleware',
          assignedTo: 'Aisha Okafor',
          priority: 'high' as const,
          storyPoints: 5,
          tags: ['backend', 'security'],
        },
        {
          id: 'TASK-394',
          title: 'Password reset flow with email verification',
          assignedTo: 'Jordan Kim',
          priority: 'medium' as const,
          storyPoints: 5,
          tags: ['backend', 'frontend'],
        },
        {
          id: 'TASK-397',
          title: 'Payment form validation tests (unit + E2E)',
          assignedTo: 'Test Automation Team',
          priority: 'high' as const,
          storyPoints: 3,
          tags: ['testing'],
        },
        {
          id: 'TASK-400',
          title: 'Notification preferences API endpoints',
          assignedTo: 'Carlos Rivera',
          priority: 'medium' as const,
          storyPoints: 3,
          tags: ['backend', 'api'],
        },
        {
          id: 'TASK-403',
          title: 'Login analytics tracking',
          assignedTo: 'Jordan Kim',
          priority: 'low' as const,
          storyPoints: 2,
          tags: ['analytics'],
        },
      ],
    },
  ],
  myTasks: {
    todo: 4,
    inProgress: 5,
    review: 3,
    completed: 8,
  },
};

/**
 * PROJECT MANAGER RESOURCE CAPACITY
 * Team workload and availability
 */
export const pmResourceCapacityData = {
  title: 'Team Capacity Dashboard',
  sprint: 'Sprint 24',
  totalCapacity: 320, // hours
  allocated: 248,
  available: 72,
  utilizationRate: 78,
  teamMembers: [
    {
      name: 'Aisha Okafor',
      role: 'Senior Backend Engineer',
      capacity: 40, // hours
      allocated: 38,
      tasks: 2,
      storyPoints: 13,
      utilization: 95,
      availability: 'Available',
      skills: ['Node.js', 'OAuth', 'Database Design'],
    },
    {
      name: 'Marcus Lee',
      role: 'Backend Engineer',
      capacity: 40,
      allocated: 32,
      tasks: 3,
      storyPoints: 11,
      utilization: 80,
      availability: 'Available',
      skills: ['Python', 'Payment APIs', 'Webhooks'],
    },
    {
      name: 'Elena Volkov',
      role: 'Frontend Engineer',
      capacity: 40,
      allocated: 35,
      tasks: 2,
      storyPoints: 8,
      utilization: 88,
      availability: 'Available',
      skills: ['React', 'TypeScript', 'UI/UX'],
    },
    {
      name: 'Priya Sharma',
      role: 'Mobile Engineer (iOS)',
      capacity: 40,
      allocated: 36,
      tasks: 3,
      storyPoints: 13,
      utilization: 90,
      availability: 'Available',
      skills: ['Swift', 'SwiftUI', 'Push Notifications'],
    },
    {
      name: 'Carlos Rivera',
      role: 'Mobile Engineer (Android)',
      capacity: 40,
      allocated: 32,
      tasks: 3,
      storyPoints: 10,
      utilization: 80,
      availability: 'Available',
      skills: ['Kotlin', 'FCM', 'Android SDK'],
    },
    {
      name: 'Jordan Kim',
      role: 'Full Stack Engineer',
      capacity: 40,
      allocated: 28,
      tasks: 2,
      storyPoints: 7,
      utilization: 70,
      availability: 'Available',
      skills: ['Node.js', 'React', 'API Design'],
    },
    {
      name: 'Sarah Chen',
      role: 'DevOps Engineer',
      capacity: 40,
      allocated: 24,
      tasks: 1,
      storyPoints: 0,
      utilization: 60,
      availability: 'Investigating CI/CD issues',
      skills: ['AWS', 'Docker', 'CI/CD'],
    },
    {
      name: 'Test Automation Team',
      role: 'QA Engineers (2 people)',
      capacity: 40,
      allocated: 23,
      tasks: 1,
      storyPoints: 3,
      utilization: 58,
      availability: 'Available for new test tasks',
      skills: ['Selenium', 'Jest', 'Playwright'],
    },
  ],
  upcomingTimeOff: [
    {
      member: 'Marcus Lee',
      dates: 'Nov 18-22',
      reason: 'Vacation',
      impact: 'Sprint 25 capacity reduced by 40 hours',
    },
  ],
};

/**
 * PROJECT MANAGER BLOCKERS & RISKS
 * Active impediments requiring PM attention
 */
export const pmBlockersDashboardData = {
  title: 'Active Blockers & Risks',
  sprint: 'Sprint 24',
  totalBlockers: 3,
  totalRisks: 2,
  blockers: [
    {
      id: 'BLOCK-142',
      task: 'TASK-398 - Stripe webhook handlers',
      description: 'Stripe API credentials not received from vendor',
      assignedTo: 'Marcus Lee',
      blockedSince: '2025-11-10',
      daysBlocked: 3,
      severity: 'high' as const,
      impact: '5 story points at risk',
      resolution: 'Dale escalated to vendor PM - expected resolution by Nov 15',
      owner: 'Dale Thompson',
    },
    {
      id: 'BLOCK-143',
      task: 'TASK-395 - FCM push notification integration',
      description: 'iOS build pipeline intermittent failures blocking testing',
      assignedTo: 'Carlos Rivera',
      blockedSince: '2025-11-12',
      daysBlocked: 1,
      severity: 'medium' as const,
      impact: 'Testing delayed by 1-2 days',
      resolution: 'Sarah Chen investigating Xcode configuration - workaround available',
      owner: 'Sarah Chen',
    },
    {
      id: 'BLOCK-144',
      task: 'TASK-389 - OAuth consent screen UI',
      description: 'Waiting for legal team approval on consent text',
      assignedTo: 'Elena Volkov',
      blockedSince: '2025-11-11',
      daysBlocked: 2,
      severity: 'low' as const,
      impact: 'UI complete but cannot deploy to production',
      resolution: 'Legal review scheduled for Nov 14',
      owner: 'Legal Team',
    },
  ],
  risks: [
    {
      id: 'RISK-S24-001',
      description: 'Payment gateway integration may slip to Sprint 25',
      probability: 'high' as const,
      impact: 'high' as const,
      mitigation: 'Backup plan: use mock server for Sprint 24 demo, complete integration in Sprint 25',
      owner: 'Dale Thompson',
    },
    {
      id: 'RISK-S24-003',
      description: 'Team capacity reduced in Sprint 25 due to vacation',
      probability: 'confirmed' as const,
      impact: 'medium' as const,
      mitigation: 'Sprint 25 planning adjusted to 45-point commitment',
      owner: 'Dale Thompson',
    },
  ],
};

// Export all Project Manager data as a bundle
export const projectManagerPersonaData = {
  sprintBurndown: pmSprintBurndownData,
  teamVelocity: pmTeamVelocityData,
  taskKanban: pmTaskKanbanData,
  resourceCapacity: pmResourceCapacityData,
  blockersDashboard: pmBlockersDashboardData,
};

export default projectManagerPersonaData;
