/**
 * Service Team Lead Persona Data - Herbert Roberts
 *
 * Role: Technical team management, code quality, operational excellence
 * Context: Managing 8-person engineering team with focus on platform reliability
 * Focus: Team workload, code quality, deployments, performance metrics, team health
 */


/**
 * Team Workload Dashboard
 * Current capacity and workload distribution
 */
export const serviceTeamWorkloadData = [
  {
    id: 'WORK-2025-W45',
    teamMember: 'Molly Rivera',
    role: 'Senior Software Engineer',
    currentCapacity: 40,
    allocatedHours: 42,
    utilizationPercent: 105,
    status: 'overloaded',
    activeTickets: 6,
    activePRs: 3,
    onCallThisWeek: true,
    workBreakdown: {
      'Feature Development': 18,
      'Bug Fixes': 12,
      'Code Reviews': 6,
      'On-Call Support': 4,
      'Technical Debt': 2
    },
    burnoutRisk: 'medium',
    notes: 'Covering for teammate on PTO. Needs support with on-call rotation.'
  },
  {
    id: 'WORK-2025-W45-02',
    teamMember: 'Alex Thompson',
    role: 'Software Engineer',
    currentCapacity: 40,
    allocatedHours: 38,
    utilizationPercent: 95,
    status: 'healthy',
    activeTickets: 4,
    activePRs: 2,
    onCallThisWeek: false,
    workBreakdown: {
      'Feature Development': 24,
      'Bug Fixes': 8,
      'Code Reviews': 4,
      'Technical Debt': 2
    },
    burnoutRisk: 'low',
    notes: 'Good balance. Working on customer portal performance improvements.'
  },
  {
    id: 'WORK-2025-W45-03',
    teamMember: 'Jordan Lee',
    role: 'Staff Software Engineer',
    currentCapacity: 40,
    allocatedHours: 36,
    utilizationPercent: 90,
    status: 'healthy',
    activeTickets: 5,
    activePRs: 4,
    onCallThisWeek: false,
    workBreakdown: {
      'Architecture Design': 12,
      'Feature Development': 14,
      'Code Reviews': 8,
      'Mentoring': 2
    },
    burnoutRisk: 'low',
    notes: 'Leading API gateway integration. Mentoring 2 junior engineers.'
  },
  {
    id: 'WORK-2025-W45-04',
    teamMember: 'Taylor Martinez',
    role: 'Software Engineer',
    currentCapacity: 40,
    allocatedHours: 32,
    utilizationPercent: 80,
    status: 'under-utilized',
    activeTickets: 3,
    activePRs: 2,
    onCallThisWeek: false,
    workBreakdown: {
      'Feature Development': 16,
      'Bug Fixes': 8,
      'Code Reviews': 4,
      'Learning/Training': 4
    },
    burnoutRisk: 'low',
    notes: 'On PTO next week (11/18-11/22). Wrapping up current work before leave.'
  },
  {
    id: 'WORK-2025-W45-05',
    teamMember: 'Casey Johnson',
    role: 'Junior Software Engineer',
    currentCapacity: 40,
    allocatedHours: 36,
    utilizationPercent: 90,
    status: 'healthy',
    activeTickets: 4,
    activePRs: 2,
    onCallThisWeek: false,
    workBreakdown: {
      'Feature Development': 20,
      'Bug Fixes': 10,
      'Learning/Training': 4,
      'Code Reviews': 2
    },
    burnoutRisk: 'low',
    notes: 'Ramping up well. Working on mobile backend APIs with mentorship from Jordan.'
  },
  {
    id: 'WORK-2025-W45-06',
    teamMember: 'Morgan Davis',
    role: 'Senior Software Engineer',
    currentCapacity: 40,
    allocatedHours: 40,
    utilizationPercent: 100,
    status: 'at-capacity',
    activeTickets: 5,
    activePRs: 3,
    onCallThisWeek: true,
    workBreakdown: {
      'Feature Development': 22,
      'Bug Fixes': 8,
      'On-Call Support': 6,
      'Code Reviews': 4
    },
    burnoutRisk: 'low',
    notes: 'On-call primary this week. Database migration work for cloud project.'
  },
  {
    id: 'WORK-2025-W45-07',
    teamMember: 'Riley Chen',
    role: 'Software Engineer',
    currentCapacity: 40,
    allocatedHours: 38,
    utilizationPercent: 95,
    status: 'healthy',
    activeTickets: 4,
    activePRs: 2,
    onCallThisWeek: false,
    workBreakdown: {
      'Feature Development': 18,
      'Bug Fixes': 12,
      'Code Reviews': 6,
      'Technical Debt': 2
    },
    burnoutRisk: 'low',
    notes: 'Focus on data warehouse ETL pipelines. Good progress on sprint goals.'
  },
  {
    id: 'WORK-2025-W45-08',
    teamMember: 'Avery Park',
    role: 'DevOps Engineer',
    currentCapacity: 40,
    allocatedHours: 44,
    utilizationPercent: 110,
    status: 'overloaded',
    activeTickets: 7,
    activePRs: 2,
    onCallThisWeek: true,
    workBreakdown: {
      'Infrastructure Work': 18,
      'CI/CD Pipeline': 12,
      'On-Call Support': 8,
      'Deployments': 4,
      'Code Reviews': 2
    },
    burnoutRisk: 'high',
    notes: 'Critical: Handling cloud migration cutover prep + on-call. Need immediate support.'
  }
];

/**
 * Code Quality Metrics
 * Team-wide quality indicators
 */
export const serviceTeamQualityData = {
  period: 'November 2025',
  codeCoverage: {
    current: 87.2,
    target: 85,
    trend: 'up',
    byComponent: {
      'API Layer': 92.5,
      'Business Logic': 88.4,
      'Data Access': 85.2,
      'UI Components': 82.8,
      'Utils': 94.1
    }
  },
  technicalDebt: {
    score: 6.8,
    trend: 'improving',
    categories: {
      'Code Smells': 142,
      'Duplications': 38,
      'Complexity': 24,
      'Security Hotspots': 12
    },
    estimatedRemediationDays: 18,
    topDebtItems: [
      { file: 'legacy-report-generator.ts', effort: '3 days', severity: 'high' },
      { file: 'customer-data-sync.ts', effort: '2 days', severity: 'medium' },
      { file: 'email-template-engine.ts', effort: '2 days', severity: 'medium' },
      { file: 'batch-processor.ts', effort: '1.5 days', severity: 'high' },
      { file: 'auth-middleware.ts', effort: '1 day', severity: 'low' }
    ]
  },
  bugDensity: {
    currentSprint: 2.1,
    lastSprint: 2.8,
    target: 2.5,
    trend: 'improving',
    byPriority: {
      'Critical': 0,
      'High': 3,
      'Medium': 12,
      'Low': 18
    }
  },
  codeReviewStats: {
    averageTurnaroundHours: 6.5,
    target: 8,
    reviewCompletionRate: 94,
    qualityScore: 8.2,
    topReviewers: [
      { name: 'Jordan Lee', reviewCount: 28, avgQualityScore: 9.1 },
      { name: 'Molly Rivera', reviewCount: 24, avgQualityScore: 8.8 },
      { name: 'Morgan Davis', reviewCount: 22, avgQualityScore: 8.5 }
    ]
  },
  securityMetrics: {
    vulnerabilities: {
      'Critical': 0,
      'High': 2,
      'Medium': 8,
      'Low': 15
    },
    dependenciesOutdated: 28,
    lastSecurityScan: '2025-11-10',
    nextScanScheduled: '2025-11-17'
  },
  performanceMetrics: {
    p95ResponseTime: 185,
    target: 200,
    errorRate: 0.12,
    targetErrorRate: 0.5,
    slowestEndpoints: [
      { endpoint: '/api/reports/generate', avgMs: 2400, p95Ms: 4200 },
      { endpoint: '/api/customers/export', avgMs: 1800, p95Ms: 3100 },
      { endpoint: '/api/analytics/dashboard', avgMs: 850, p95Ms: 1600 }
    ]
  }
};

/**
 * Code Review Tracking
 * Active pull requests and review status
 */
export const serviceTeamCodeReviewData = [
  {
    id: 'PR-2845',
    title: 'feat: Add multi-file upload to customer portal',
    author: 'Molly Rivera',
    createdDate: '2025-11-08',
    status: 'approved',
    reviewers: ['Jordan Lee', 'Alex Thompson'],
    linesChanged: { additions: 285, deletions: 42 },
    complexity: 'medium',
    turnaroundHours: 5.5,
    comments: 12,
    approvals: 2,
    changesRequested: 0,
    linkedTickets: ['TICKET-1892'],
    ciStatus: 'passed',
    qualityGateStatus: 'passed',
    mergeable: true
  },
  {
    id: 'PR-2846',
    title: 'fix: Resolve database connection pool exhaustion',
    author: 'Morgan Davis',
    createdDate: '2025-11-09',
    status: 'changes-requested',
    reviewers: ['Jordan Lee', 'Avery Park'],
    linesChanged: { additions: 124, deletions: 68 },
    complexity: 'high',
    turnaroundHours: 8.2,
    comments: 18,
    approvals: 1,
    changesRequested: 1,
    linkedTickets: ['INCIDENT-445'],
    ciStatus: 'passed',
    qualityGateStatus: 'warning',
    mergeable: false,
    reviewNotes: 'Avery requested changes: Add connection pool monitoring metrics'
  },
  {
    id: 'PR-2847',
    title: 'refactor: Simplify email template engine',
    author: 'Riley Chen',
    createdDate: '2025-11-10',
    status: 'in-review',
    reviewers: ['Jordan Lee', 'Molly Rivera'],
    linesChanged: { additions: 420, deletions: 680 },
    complexity: 'high',
    turnaroundHours: 3.8,
    comments: 8,
    approvals: 0,
    changesRequested: 0,
    linkedTickets: ['DEBT-152'],
    ciStatus: 'passed',
    qualityGateStatus: 'passed',
    mergeable: true,
    reviewNotes: 'In progress - Jordan reviewing architecture changes'
  },
  {
    id: 'PR-2848',
    title: 'feat: API Gateway rate limiting implementation',
    author: 'Alex Thompson',
    createdDate: '2025-11-10',
    status: 'in-review',
    reviewers: ['Jordan Lee', 'Herbert Roberts'],
    linesChanged: { additions: 385, deletions: 22 },
    complexity: 'high',
    turnaroundHours: 2.5,
    comments: 5,
    approvals: 1,
    changesRequested: 0,
    linkedTickets: ['FEATURE-782'],
    ciStatus: 'passed',
    qualityGateStatus: 'passed',
    mergeable: true,
    reviewNotes: 'Jordan approved. Waiting for Herbert final review.'
  },
  {
    id: 'PR-2849',
    title: 'test: Add E2E tests for customer portal flows',
    author: 'Casey Johnson',
    createdDate: '2025-11-11',
    status: 'in-review',
    reviewers: ['Molly Rivera', 'Taylor Martinez'],
    linesChanged: { additions: 520, deletions: 15 },
    complexity: 'medium',
    turnaroundHours: 1.2,
    comments: 3,
    approvals: 0,
    changesRequested: 0,
    linkedTickets: ['TEST-445'],
    ciStatus: 'running',
    qualityGateStatus: 'pending',
    mergeable: false,
    reviewNotes: 'Waiting for CI completion'
  },
  {
    id: 'PR-2850',
    title: 'fix: Correct timezone handling in reporting module',
    author: 'Taylor Martinez',
    createdDate: '2025-11-11',
    status: 'draft',
    reviewers: [],
    linesChanged: { additions: 88, deletions: 52 },
    complexity: 'low',
    turnaroundHours: 0,
    comments: 0,
    approvals: 0,
    changesRequested: 0,
    linkedTickets: ['BUG-1245'],
    ciStatus: 'not-run',
    qualityGateStatus: 'not-run',
    mergeable: false,
    reviewNotes: 'Draft - awaiting manual testing before review'
  },
  {
    id: 'PR-2841',
    title: 'feat: SSO integration with Okta',
    author: 'Jordan Lee',
    createdDate: '2025-11-06',
    status: 'merged',
    reviewers: ['Herbert Roberts', 'Morgan Davis', 'Avery Park'],
    linesChanged: { additions: 1240, deletions: 385 },
    complexity: 'very-high',
    turnaroundHours: 18.5,
    comments: 42,
    approvals: 3,
    changesRequested: 2,
    linkedTickets: ['FEATURE-650', 'FEATURE-652'],
    ciStatus: 'passed',
    qualityGateStatus: 'passed',
    mergeable: true,
    mergedDate: '2025-11-09',
    reviewNotes: 'Excellent work. Multiple review rounds for critical security feature.'
  },
  {
    id: 'PR-2842',
    title: 'perf: Optimize customer search query performance',
    author: 'Molly Rivera',
    createdDate: '2025-11-07',
    status: 'merged',
    reviewers: ['Morgan Davis', 'Jordan Lee'],
    linesChanged: { additions: 145, deletions: 92 },
    complexity: 'medium',
    turnaroundHours: 6.0,
    comments: 15,
    approvals: 2,
    changesRequested: 0,
    linkedTickets: ['PERF-288'],
    ciStatus: 'passed',
    qualityGateStatus: 'passed',
    mergeable: true,
    mergedDate: '2025-11-08',
    reviewNotes: 'Great performance improvement - 60% faster queries'
  },
  {
    id: 'PR-2843',
    title: 'chore: Update dependencies and fix security vulnerabilities',
    author: 'Avery Park',
    createdDate: '2025-11-08',
    status: 'merged',
    reviewers: ['Herbert Roberts'],
    linesChanged: { additions: 28, deletions: 28 },
    complexity: 'low',
    turnaroundHours: 2.0,
    comments: 4,
    approvals: 1,
    changesRequested: 0,
    linkedTickets: ['SEC-425'],
    ciStatus: 'passed',
    qualityGateStatus: 'passed',
    mergeable: true,
    mergedDate: '2025-11-08',
    reviewNotes: 'Routine security update'
  },
  {
    id: 'PR-2844',
    title: 'docs: Update API documentation with new endpoints',
    author: 'Alex Thompson',
    createdDate: '2025-11-08',
    status: 'merged',
    reviewers: ['Jordan Lee'],
    linesChanged: { additions: 420, deletions: 0 },
    complexity: 'low',
    turnaroundHours: 1.5,
    comments: 2,
    approvals: 1,
    changesRequested: 0,
    linkedTickets: ['DOC-182'],
    ciStatus: 'passed',
    qualityGateStatus: 'passed',
    mergeable: true,
    mergedDate: '2025-11-08',
    reviewNotes: 'Documentation for API gateway endpoints'
  }
];

/**
 * Deployment Status
 * Production deployment tracking and health
 */
export const serviceTeamDeploymentData = [
  {
    id: 'DEPLOY-2025-W45-01',
    environment: 'production',
    date: '2025-11-08',
    time: '14:30 UTC',
    version: 'v2.45.0',
    status: 'success',
    deploymentDuration: 12,
    deployer: 'Avery Park',
    changes: [
      'SSO integration with Okta',
      'Customer search performance optimization',
      'Security vulnerability fixes',
      'API documentation updates'
    ],
    pullRequests: ['PR-2841', 'PR-2842', 'PR-2843', 'PR-2844'],
    testsRun: 1845,
    testsPassed: 1845,
    testsFailed: 0,
    healthCheckStatus: 'healthy',
    rollbackRequired: false,
    postDeploymentIssues: 0,
    notes: 'Smooth deployment. All health checks passed. No user-reported issues.'
  },
  {
    id: 'DEPLOY-2025-W45-02',
    environment: 'production',
    date: '2025-11-11',
    time: '10:15 UTC',
    version: 'v2.45.1',
    status: 'success',
    deploymentDuration: 8,
    deployer: 'Avery Park',
    changes: [
      'Hotfix: Okta SSO session timeout issue',
      'Monitoring improvements'
    ],
    pullRequests: ['PR-2851'],
    testsRun: 1850,
    testsPassed: 1850,
    testsFailed: 0,
    healthCheckStatus: 'healthy',
    rollbackRequired: false,
    postDeploymentIssues: 0,
    notes: 'Emergency hotfix for SSO issue reported by users. Fix verified.'
  },
  {
    id: 'DEPLOY-2025-W44-05',
    environment: 'production',
    date: '2025-11-01',
    time: '15:00 UTC',
    version: 'v2.44.2',
    status: 'success',
    deploymentDuration: 15,
    deployer: 'Morgan Davis',
    changes: [
      'Customer portal beta features',
      'Multi-file upload capability',
      'Enhanced error handling'
    ],
    pullRequests: ['PR-2820', 'PR-2825', 'PR-2830'],
    testsRun: 1820,
    testsPassed: 1818,
    testsFailed: 2,
    healthCheckStatus: 'healthy',
    rollbackRequired: false,
    postDeploymentIssues: 1,
    notes: '2 flaky tests failed but passed on retry. Minor UI issue reported and tracked in BUG-1288.'
  },
  {
    id: 'DEPLOY-2025-W43-04',
    environment: 'production',
    date: '2025-10-25',
    time: '14:00 UTC',
    version: 'v2.43.5',
    status: 'rolled-back',
    deploymentDuration: 18,
    deployer: 'Avery Park',
    changes: [
      'Database migration for reporting module',
      'New analytics endpoints'
    ],
    pullRequests: ['PR-2785', 'PR-2790'],
    testsRun: 1800,
    testsPassed: 1800,
    testsFailed: 0,
    healthCheckStatus: 'degraded',
    rollbackRequired: true,
    postDeploymentIssues: 3,
    notes: 'Database migration caused performance degradation. Rolled back in 5 minutes. Root cause: missing index.'
  },
  {
    id: 'DEPLOY-2025-STAGING-01',
    environment: 'staging',
    date: '2025-11-11',
    time: '09:00 UTC',
    version: 'v2.46.0-rc1',
    status: 'success',
    deploymentDuration: 10,
    deployer: 'Molly Rivera',
    changes: [
      'API Gateway rate limiting',
      'Email template refactoring',
      'E2E test improvements'
    ],
    pullRequests: ['PR-2848', 'PR-2847', 'PR-2849'],
    testsRun: 1860,
    testsPassed: 1858,
    testsFailed: 2,
    healthCheckStatus: 'healthy',
    rollbackRequired: false,
    postDeploymentIssues: 0,
    notes: 'Release candidate for next week production deployment. 2 known test failures being addressed.'
  },
  {
    id: 'DEPLOY-2025-W45-SUMMARY',
    environment: 'summary',
    period: 'Week 45 (Nov 6-12)',
    deploymentFrequency: {
      production: 2,
      staging: 4,
      development: 18
    },
    successRate: {
      production: 100,
      staging: 100,
      development: 94
    },
    averageDeploymentTime: {
      production: 10,
      staging: 8,
      development: 5
    },
    totalChangesDeployed: 12,
    totalPullRequests: 15,
    incidentsTriggered: 0,
    rollbacks: 0,
    notes: 'Excellent week. All production deployments successful. On track for release schedule.'
  }
];

/**
 * Team Performance Metrics
 * Individual and team-level productivity and quality
 */
export const serviceTeamPerformanceData = {
  period: 'Sprint 45 (Oct 28 - Nov 11)',
  sprintGoals: {
    planned: 85,
    completed: 78,
    carryover: 7,
    completionRate: 91.8
  },
  velocity: {
    current: 78,
    lastSprint: 82,
    average3Sprints: 80,
    trend: 'stable'
  },
  individualMetrics: [
    {
      name: 'Molly Rivera',
      pointsCompleted: 18,
      tasksCompleted: 12,
      codeReviewsGiven: 24,
      prsMerged: 8,
      bugsFixed: 6,
      incidentResponse: 2,
      qualityScore: 8.8,
      velocityTrend: 'up'
    },
    {
      name: 'Alex Thompson',
      pointsCompleted: 14,
      tasksCompleted: 9,
      codeReviewsGiven: 18,
      prsMerged: 5,
      bugsFixed: 4,
      incidentResponse: 1,
      qualityScore: 8.5,
      velocityTrend: 'stable'
    },
    {
      name: 'Jordan Lee',
      pointsCompleted: 12,
      tasksCompleted: 6,
      codeReviewsGiven: 28,
      prsMerged: 4,
      bugsFixed: 2,
      incidentResponse: 0,
      qualityScore: 9.1,
      velocityTrend: 'stable',
      notes: 'More time spent on architecture and code reviews (staff role)'
    },
    {
      name: 'Taylor Martinez',
      pointsCompleted: 10,
      tasksCompleted: 8,
      codeReviewsGiven: 12,
      prsMerged: 6,
      bugsFixed: 5,
      incidentResponse: 0,
      qualityScore: 8.2,
      velocityTrend: 'stable'
    },
    {
      name: 'Casey Johnson',
      pointsCompleted: 8,
      tasksCompleted: 7,
      codeReviewsGiven: 8,
      prsMerged: 4,
      bugsFixed: 3,
      incidentResponse: 0,
      qualityScore: 7.9,
      velocityTrend: 'up',
      notes: 'Junior engineer - showing steady improvement'
    },
    {
      name: 'Morgan Davis',
      pointsCompleted: 16,
      tasksCompleted: 10,
      codeReviewsGiven: 22,
      prsMerged: 7,
      bugsFixed: 5,
      incidentResponse: 3,
      qualityScore: 8.5,
      velocityTrend: 'stable'
    },
    {
      name: 'Riley Chen',
      pointsCompleted: 12,
      tasksCompleted: 8,
      codeReviewsGiven: 16,
      prsMerged: 5,
      bugsFixed: 4,
      incidentResponse: 1,
      qualityScore: 8.3,
      velocityTrend: 'stable'
    },
    {
      name: 'Avery Park',
      pointsCompleted: 10,
      tasksCompleted: 6,
      codeReviewsGiven: 14,
      prsMerged: 3,
      bugsFixed: 2,
      incidentResponse: 5,
      qualityScore: 8.7,
      velocityTrend: 'down',
      notes: 'High incident response load due to cloud migration work'
    }
  ],
  incidentMetrics: {
    totalIncidents: 12,
    criticalIncidents: 2,
    meanTimeToDetect: 8.5,
    meanTimeToResolve: 32,
    targetMTTR: 60,
    onCallRotation: {
      'Molly Rivera': { shifts: 1, incidents: 2, avgResponseMin: 5 },
      'Morgan Davis': { shifts: 1, incidents: 3, avgResponseMin: 7 },
      'Avery Park': { shifts: 2, incidents: 5, avgResponseMin: 4 }
    }
  },
  teamHealth: {
    morale: 7.8,
    collaborationScore: 8.5,
    knowledgeSharing: 8.2,
    workLifeBalance: 7.2,
    concerns: [
      'Molly Rivera and Avery Park showing signs of overload',
      'Need to improve on-call rotation coverage',
      'Team requesting more pairing sessions for knowledge transfer'
    ],
    strengths: [
      'Excellent code review culture and quality',
      'Strong incident response capabilities',
      'Good mentorship for junior engineers',
      'Consistent sprint execution'
    ]
  },
  improvementActions: [
    {
      action: 'Add contractor to support Avery Park with infrastructure work',
      owner: 'Herbert Roberts',
      priority: 'high',
      dueDate: '2025-11-18'
    },
    {
      action: 'Redistribute Molly Rivera on-call shift to Alex Thompson',
      owner: 'Herbert Roberts',
      priority: 'high',
      dueDate: '2025-11-13'
    },
    {
      action: 'Schedule bi-weekly pairing sessions for knowledge sharing',
      owner: 'Jordan Lee',
      priority: 'medium',
      dueDate: '2025-11-20'
    },
    {
      action: 'Conduct team retrospective on sprint 45 execution',
      owner: 'Herbert Roberts',
      priority: 'medium',
      dueDate: '2025-11-14'
    }
  ]
};
