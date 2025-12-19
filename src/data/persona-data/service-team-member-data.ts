/**
 * Service Team Member Persona Data - Molly Rivera
 *
 * Role: Individual contributor, hands-on development, day-to-day tasks
 * Context: Senior engineer on Herbert's team, working on customer portal and API features
 * Focus: Personal tasks, active tickets, knowledge base, standup notes, time tracking
 */


/**
 * My Tasks Dashboard
 * Personal task list with priorities and deadlines
 */
export const serviceMemberTaskData = [
  {
    id: 'TASK-ME-1892',
    title: 'Implement multi-file upload for customer portal',
    description: 'Add ability to upload up to 5 files (50MB total) in service request form',
    type: 'feature',
    priority: 'high',
    status: 'done',
    assignedDate: '2025-11-04',
    dueDate: '2025-11-08',
    completedDate: '2025-11-08',
    estimatedHours: 8,
    actualHours: 9.5,
    tags: ['customer-portal', 'frontend', 'backend'],
    linkedPR: 'PR-2845',
    linkedTicket: 'TICKET-1892',
    blockers: [],
    notes: 'Completed and merged. Handles file validation, progress tracking, and error states.'
  },
  {
    id: 'TASK-ME-1895',
    title: 'Fix customer portal mobile responsiveness issues',
    description: 'Resolve layout issues on mobile devices <768px width',
    type: 'bug',
    priority: 'high',
    status: 'in-progress',
    assignedDate: '2025-11-09',
    dueDate: '2025-11-12',
    completedDate: null,
    estimatedHours: 6,
    actualHours: 3.5,
    tags: ['customer-portal', 'frontend', 'mobile', 'css'],
    linkedPR: null,
    linkedTicket: 'TICKET-1895',
    blockers: [],
    notes: 'Testing on various devices. Fixing header collapse and form input sizing.'
  },
  {
    id: 'TASK-ME-1898',
    title: 'Optimize customer search query performance',
    description: 'Improve search response time from 2.4s to <500ms',
    type: 'performance',
    priority: 'high',
    status: 'done',
    assignedDate: '2025-11-05',
    dueDate: '2025-11-07',
    completedDate: '2025-11-07',
    estimatedHours: 4,
    actualHours: 5,
    tags: ['performance', 'database', 'backend'],
    linkedPR: 'PR-2842',
    linkedTicket: 'PERF-288',
    blockers: [],
    notes: 'Added database index and optimized query. 60% performance improvement achieved.'
  },
  {
    id: 'TASK-ME-1902',
    title: 'Review and approve API gateway rate limiting PR',
    description: 'Code review for Alex Thompson PR on rate limiting implementation',
    type: 'code-review',
    priority: 'medium',
    status: 'in-progress',
    assignedDate: '2025-11-10',
    dueDate: '2025-11-12',
    completedDate: null,
    estimatedHours: 2,
    actualHours: 1,
    tags: ['code-review', 'api-gateway'],
    linkedPR: 'PR-2848',
    linkedTicket: null,
    blockers: [],
    notes: 'Reviewed architecture. Suggesting improvements to error messaging and monitoring.'
  },
  {
    id: 'TASK-ME-1905',
    title: 'Add E2E tests for file upload flow',
    description: 'Write Playwright tests for multi-file upload feature',
    type: 'testing',
    priority: 'medium',
    status: 'todo',
    assignedDate: '2025-11-11',
    dueDate: '2025-11-13',
    completedDate: null,
    estimatedHours: 3,
    actualHours: 0,
    tags: ['testing', 'e2e', 'playwright'],
    linkedPR: null,
    linkedTicket: 'TEST-448',
    blockers: [],
    notes: 'Starting tomorrow. Need to test happy path, error handling, and file size limits.'
  },
  {
    id: 'TASK-ME-1908',
    title: 'Refactor email notification service',
    description: 'Reduce technical debt in email template rendering logic',
    type: 'tech-debt',
    priority: 'low',
    status: 'todo',
    assignedDate: '2025-11-11',
    dueDate: '2025-11-18',
    completedDate: null,
    estimatedHours: 6,
    actualHours: 0,
    tags: ['tech-debt', 'refactoring', 'email'],
    linkedPR: null,
    linkedTicket: 'DEBT-155',
    blockers: [],
    notes: 'Low priority. Work on this when bandwidth available after main tasks done.'
  },
  {
    id: 'TASK-ME-1910',
    title: 'Investigate production error spike on 11/09',
    description: 'Analyze 15 errors related to customer data sync service',
    type: 'bug',
    priority: 'medium',
    status: 'in-progress',
    assignedDate: '2025-11-09',
    dueDate: '2025-11-11',
    completedDate: null,
    estimatedHours: 4,
    actualHours: 2.5,
    tags: ['production', 'debugging', 'sync-service'],
    linkedPR: null,
    linkedTicket: 'INCIDENT-448',
    blockers: [],
    notes: 'Root cause: API rate limit exceeded. Implementing exponential backoff retry logic.'
  },
  {
    id: 'TASK-ME-1912',
    title: 'Pair with Casey on mobile backend APIs',
    description: 'Mentoring session to review mobile API architecture and best practices',
    type: 'mentoring',
    priority: 'medium',
    status: 'scheduled',
    assignedDate: '2025-11-10',
    dueDate: '2025-11-13',
    completedDate: null,
    estimatedHours: 2,
    actualHours: 0,
    tags: ['mentoring', 'pairing', 'api'],
    linkedPR: null,
    linkedTicket: null,
    blockers: [],
    notes: 'Scheduled for Thursday 11/14 at 2pm. Will review REST API design and authentication patterns.'
  },
  {
    id: 'TASK-ME-TODAY-1',
    title: '[TODAY] Fix mobile layout issues',
    description: 'Continue work on responsive design fixes',
    type: 'focus',
    priority: 'high',
    status: 'in-progress',
    assignedDate: '2025-11-12',
    dueDate: '2025-11-12',
    completedDate: null,
    estimatedHours: 4,
    actualHours: 2,
    tags: ['today', 'customer-portal', 'frontend'],
    linkedPR: null,
    linkedTicket: 'TICKET-1895',
    blockers: [],
    notes: 'Today focus: Complete mobile testing and create PR by end of day.'
  },
  {
    id: 'TASK-ME-TODAY-2',
    title: '[TODAY] Complete API gateway code review',
    description: 'Finish review and approve Alex PR',
    type: 'focus',
    priority: 'medium',
    status: 'in-progress',
    assignedDate: '2025-11-12',
    dueDate: '2025-11-12',
    completedDate: null,
    estimatedHours: 1,
    actualHours: 1,
    tags: ['today', 'code-review'],
    linkedPR: 'PR-2848',
    linkedTicket: null,
    blockers: [],
    notes: 'Today focus: Complete review before standup.'
  },
  {
    id: 'TASK-ME-TODAY-3',
    title: '[TODAY] Start E2E tests for file upload',
    description: 'Write initial Playwright test structure',
    type: 'focus',
    priority: 'medium',
    status: 'todo',
    assignedDate: '2025-11-12',
    dueDate: '2025-11-12',
    completedDate: null,
    estimatedHours: 2,
    actualHours: 0,
    tags: ['today', 'testing'],
    linkedPR: null,
    linkedTicket: 'TEST-448',
    blockers: [],
    notes: 'Today focus: Get basic test structure in place and 1-2 test scenarios.'
  }
];

/**
 * Active Support Tickets Assigned to Me
 * Customer-reported issues requiring attention
 */
export const serviceMemberTicketData = [
  {
    id: 'TICKET-ME-4521',
    title: 'Customer unable to upload PDF files',
    description: 'Customer reports error "Invalid file type" when uploading PDF documents',
    severity: 'high',
    status: 'in-progress',
    reportedBy: 'John Smith (Customer)',
    reportedDate: '2025-11-11 09:15',
    assignedDate: '2025-11-11 09:30',
    slaDeadline: '2025-11-12 09:30',
    hoursRemaining: 6.5,
    priority: 'urgent',
    category: 'bug',
    affectedFeature: 'File Upload',
    reproduced: true,
    rootCause: 'MIME type validation too strict - not accepting some PDF variants',
    resolution: 'in-progress',
    notes: 'Fix identified. Testing expanded MIME type list. Will deploy hotfix today.',
    customerUpdates: [
      { date: '2025-11-11 09:45', message: 'Acknowledged. Investigating now.' },
      { date: '2025-11-11 12:30', message: 'Root cause identified. Fix in progress. ETA: EOD today.' }
    ]
  },
  {
    id: 'TICKET-ME-4518',
    title: 'Request form not saving draft on mobile',
    description: 'Service request form draft auto-save not working on iOS Safari',
    severity: 'medium',
    status: 'investigating',
    reportedBy: 'Sarah Johnson (Customer)',
    reportedDate: '2025-11-10 14:22',
    assignedDate: '2025-11-10 15:00',
    slaDeadline: '2025-11-13 15:00',
    hoursRemaining: 26,
    priority: 'medium',
    category: 'bug',
    affectedFeature: 'Service Request Form',
    reproduced: false,
    rootCause: 'under-investigation',
    resolution: null,
    notes: 'Cannot reproduce on iOS 17. Requested customer device/browser details.',
    customerUpdates: [
      { date: '2025-11-10 15:15', message: 'Investigating. Need more details about device and browser version.' },
      { date: '2025-11-11 10:00', message: 'Waiting for customer response on device details.' }
    ]
  },
  {
    id: 'TICKET-ME-4515',
    title: 'Search results missing recent customers',
    description: 'Customer search not returning customers added in last 24 hours',
    severity: 'medium',
    status: 'resolved',
    reportedBy: 'Mike Davis (Internal - Sales)',
    reportedDate: '2025-11-08 11:30',
    assignedDate: '2025-11-08 12:00',
    slaDeadline: '2025-11-11 12:00',
    hoursRemaining: 0,
    priority: 'medium',
    category: 'bug',
    affectedFeature: 'Customer Search',
    reproduced: true,
    rootCause: 'Search index refresh scheduled every 24 hours, causing lag',
    resolution: 'Fixed - increased index refresh frequency to every 1 hour',
    resolvedDate: '2025-11-09 10:00',
    notes: 'Deployed fix on 11/09. Monitoring search index lag metrics.',
    customerUpdates: [
      { date: '2025-11-08 13:00', message: 'Reproduced issue. Working on fix.' },
      { date: '2025-11-09 10:15', message: 'Fix deployed. Search index now refreshes hourly. Please verify.' }
    ]
  },
  {
    id: 'TICKET-ME-4512',
    title: 'Performance: Account dashboard slow to load',
    description: 'Account dashboard taking 8-10 seconds to load for customers with large transaction history',
    severity: 'low',
    status: 'investigating',
    reportedBy: 'Lisa Brown (Customer)',
    reportedDate: '2025-11-07 16:45',
    assignedDate: '2025-11-08 09:00',
    slaDeadline: '2025-11-15 09:00',
    hoursRemaining: 69,
    priority: 'low',
    category: 'performance',
    affectedFeature: 'Account Dashboard',
    reproduced: true,
    rootCause: 'under-investigation',
    resolution: null,
    notes: 'Reproduced with test account (50K+ transactions). Analyzing query performance.',
    customerUpdates: [
      { date: '2025-11-08 09:30', message: 'Confirmed performance issue. Investigating optimization options.' }
    ]
  },
  {
    id: 'TICKET-ME-4525',
    title: 'Email notification not received',
    description: 'Customer did not receive email confirmation after submitting service request',
    severity: 'medium',
    status: 'todo',
    reportedBy: 'Tom Wilson (Customer)',
    reportedDate: '2025-11-12 08:15',
    assignedDate: '2025-11-12 08:30',
    slaDeadline: '2025-11-15 08:30',
    hoursRemaining: 72,
    priority: 'medium',
    category: 'bug',
    affectedFeature: 'Email Notifications',
    reproduced: false,
    rootCause: null,
    resolution: null,
    notes: 'Just assigned. Need to check email logs and queue status.',
    customerUpdates: []
  },
  {
    id: 'TICKET-ME-4523',
    title: 'Feature request: Bulk delete for saved items',
    description: 'Customer wants ability to delete multiple saved items at once instead of one-by-one',
    severity: 'low',
    status: 'todo',
    reportedBy: 'Jennifer Lee (Customer)',
    reportedDate: '2025-11-11 13:20',
    assignedDate: '2025-11-11 14:00',
    slaDeadline: null,
    hoursRemaining: null,
    priority: 'low',
    category: 'feature-request',
    affectedFeature: 'Saved Items',
    reproduced: null,
    rootCause: null,
    resolution: null,
    notes: 'Valid feature request. Will discuss with product team in next planning meeting.',
    customerUpdates: [
      { date: '2025-11-11 14:15', message: 'Thanks for the suggestion. Will bring to product team for prioritization.' }
    ]
  }
];

/**
 * Knowledge Base Favorites
 * Frequently accessed documentation and guides
 */
export const serviceMemberKnowledgeData = [
  {
    id: 'KB-FAV-001',
    title: 'Customer Portal Architecture Overview',
    category: 'architecture',
    url: '/kb/customer-portal-architecture',
    lastAccessed: '2025-11-11',
    accessCount: 24,
    tags: ['customer-portal', 'architecture', 'frontend'],
    personalNotes: 'Refer to this when onboarding new team members or making architectural changes',
    useful: true
  },
  {
    id: 'KB-FAV-002',
    title: 'API Gateway Configuration Guide',
    category: 'infrastructure',
    url: '/kb/api-gateway-config',
    lastAccessed: '2025-11-10',
    accessCount: 18,
    tags: ['api-gateway', 'configuration', 'backend'],
    personalNotes: 'Complete guide for rate limiting, authentication, and monitoring setup',
    useful: true
  },
  {
    id: 'KB-FAV-003',
    title: 'Debugging Production Issues Checklist',
    category: 'troubleshooting',
    url: '/kb/production-debugging',
    lastAccessed: '2025-11-09',
    accessCount: 32,
    tags: ['debugging', 'production', 'incidents'],
    personalNotes: 'Step-by-step guide for investigating production errors. Use during on-call.',
    useful: true
  },
  {
    id: 'KB-FAV-004',
    title: 'Database Query Optimization Best Practices',
    category: 'performance',
    url: '/kb/db-optimization',
    lastAccessed: '2025-11-07',
    accessCount: 15,
    tags: ['database', 'performance', 'optimization'],
    personalNotes: 'Used this for customer search optimization. Great indexing strategies.',
    useful: true
  },
  {
    id: 'KB-FAV-005',
    title: 'File Upload Security Checklist',
    category: 'security',
    url: '/kb/file-upload-security',
    lastAccessed: '2025-11-08',
    accessCount: 12,
    tags: ['security', 'file-upload', 'validation'],
    personalNotes: 'Referenced for multi-file upload feature. MIME type validation, size limits, virus scanning.',
    useful: true
  },
  {
    id: 'KB-FAV-006',
    title: 'React Testing with Playwright',
    category: 'testing',
    url: '/kb/playwright-testing',
    lastAccessed: '2025-11-11',
    accessCount: 22,
    tags: ['testing', 'playwright', 'e2e'],
    personalNotes: 'Best practices for E2E testing. Good examples of complex user flows.',
    useful: true
  },
  {
    id: 'KB-FAV-007',
    title: 'CSS Mobile Responsiveness Patterns',
    category: 'frontend',
    url: '/kb/mobile-responsive-css',
    lastAccessed: '2025-11-12',
    accessCount: 8,
    tags: ['css', 'mobile', 'responsive-design'],
    personalNotes: 'Using this today for mobile layout fixes. Flexbox and grid patterns.',
    useful: true
  },
  {
    id: 'KB-FAV-008',
    title: 'Email Service Integration Guide',
    category: 'backend',
    url: '/kb/email-service-integration',
    lastAccessed: '2025-11-05',
    accessCount: 10,
    tags: ['email', 'integration', 'backend'],
    personalNotes: 'SendGrid setup, template management, error handling',
    useful: true
  },
  {
    id: 'KB-FAV-009',
    title: 'On-Call Runbook',
    category: 'operations',
    url: '/kb/oncall-runbook',
    lastAccessed: '2025-11-03',
    accessCount: 28,
    tags: ['on-call', 'runbook', 'incidents'],
    personalNotes: 'Essential reading for on-call shifts. Escalation procedures and common issues.',
    useful: true
  },
  {
    id: 'KB-FAV-010',
    title: 'Code Review Guidelines',
    category: 'process',
    url: '/kb/code-review-guidelines',
    lastAccessed: '2025-11-10',
    accessCount: 42,
    tags: ['code-review', 'process', 'best-practices'],
    personalNotes: 'Team code review standards. Refer to this when reviewing PRs.',
    useful: true
  },
  {
    id: 'KB-FAV-011',
    title: 'TypeScript Advanced Patterns',
    category: 'development',
    url: '/kb/typescript-patterns',
    lastAccessed: '2025-10-28',
    accessCount: 16,
    tags: ['typescript', 'patterns', 'development'],
    personalNotes: 'Generic types, utility types, and advanced TypeScript features',
    useful: true
  },
  {
    id: 'KB-FAV-012',
    title: 'Monitoring & Alerting Setup',
    category: 'observability',
    url: '/kb/monitoring-setup',
    lastAccessed: '2025-11-01',
    accessCount: 14,
    tags: ['monitoring', 'alerting', 'observability'],
    personalNotes: 'DataDog dashboards, custom metrics, alert thresholds',
    useful: true
  },
  {
    id: 'KB-FAV-013',
    title: 'Customer Portal API Documentation',
    category: 'api',
    url: '/kb/customer-portal-api',
    lastAccessed: '2025-11-12',
    accessCount: 38,
    tags: ['api', 'documentation', 'customer-portal'],
    personalNotes: 'Complete API reference. Use when building new features.',
    useful: true
  },
  {
    id: 'KB-FAV-014',
    title: 'Git Workflow & Branching Strategy',
    category: 'process',
    url: '/kb/git-workflow',
    lastAccessed: '2025-10-22',
    accessCount: 8,
    tags: ['git', 'workflow', 'process'],
    personalNotes: 'Team git conventions. Branch naming, commit messages, PR process.',
    useful: true
  },
  {
    id: 'KB-FAV-015',
    title: 'Performance Profiling Tools',
    category: 'performance',
    url: '/kb/performance-profiling',
    lastAccessed: '2025-11-06',
    accessCount: 12,
    tags: ['performance', 'profiling', 'optimization'],
    personalNotes: 'Chrome DevTools, Lighthouse, React Profiler usage guides',
    useful: true
  }
];

/**
 * Daily Standup Notes
 * Last 5 days of standup updates
 */
export const serviceMemberStandupData = [
  {
    id: 'STANDUP-2025-11-12',
    date: '2025-11-12',
    yesterday: [
      'Completed API gateway code review for Alex',
      'Fixed customer portal mobile layout issues (80% done)',
      'Investigated production error spike - root cause identified'
    ],
    today: [
      'Complete mobile layout fixes and create PR',
      'Start E2E tests for file upload feature',
      'Review and respond to new support ticket (email notification issue)'
    ],
    blockers: [
      'None'
    ],
    notes: 'On track for sprint goals. Mobile fixes almost done.'
  },
  {
    id: 'STANDUP-2025-11-11',
    date: '2025-11-11',
    yesterday: [
      'Deployed multi-file upload feature to production',
      'Started mobile responsive design fixes',
      'Reviewed email template refactoring PR'
    ],
    today: [
      'Continue mobile layout fixes (testing on multiple devices)',
      'Complete API gateway PR review',
      'Investigate production error spike from 11/09'
    ],
    blockers: [
      'Waiting for design team feedback on mobile header collapse behavior'
    ],
    notes: 'Multi-file upload deployed successfully. No issues reported.'
  },
  {
    id: 'STANDUP-2025-11-10',
    date: '2025-11-10',
    yesterday: [
      'Completed customer search optimization (60% performance improvement)',
      'Fixed search results bug (missing recent customers)',
      'Responded to 3 customer support tickets'
    ],
    today: [
      'Review API gateway rate limiting PR',
      'Start mobile responsiveness bug fixes',
      'Pair with Casey on mobile backend APIs (2pm)'
    ],
    blockers: [
      'None'
    ],
    notes: 'Search optimization merged and deployed. Great feedback from users.'
  },
  {
    id: 'STANDUP-2025-11-09',
    date: '2025-11-09',
    yesterday: [
      'Finished multi-file upload feature (created PR-2845)',
      'Fixed bug in customer search (resolved TICKET-4515)',
      'On-call: Responded to 2 incidents (5min response time avg)'
    ],
    today: [
      'Address PR feedback on multi-file upload',
      'Optimize customer search query (PERF-288)',
      'Investigate new support ticket (account dashboard performance)'
    ],
    blockers: [
      'None - PR has minor feedback, should be quick fix'
    ],
    notes: 'On-call shift went well. Both incidents resolved quickly.'
  },
  {
    id: 'STANDUP-2025-11-08',
    date: '2025-11-08',
    yesterday: [
      'Implemented file upload progress tracking',
      'Added file validation and error handling',
      'Code review for Jordan SSO integration PR'
    ],
    today: [
      'Complete multi-file upload feature',
      'Write tests for upload functionality',
      'Create PR for code review'
    ],
    blockers: [
      'None'
    ],
    notes: 'Multi-file upload almost done. Should have PR ready by EOD.'
  }
];

/**
 * Time Tracking
 * Weekly time breakdown by project and task
 */
export const serviceMemberTimeData = [
  {
    id: 'TIME-2025-W45',
    week: 'Week 45 (Nov 11-15, 2025)',
    totalHours: 42,
    billableHours: 38,
    nonBillableHours: 4,
    breakdown: {
      'Feature Development': 18,
      'Bug Fixes': 12,
      'Code Reviews': 6,
      'On-Call Support': 4,
      'Meetings': 2
    },
    byProject: {
      'Customer Portal': 22,
      'API Gateway': 8,
      'Database Optimization': 6,
      'Support Tickets': 6
    },
    byTask: [
      { task: 'TASK-ME-1892 - Multi-file upload', hours: 9.5, billable: true },
      { task: 'TASK-ME-1895 - Mobile responsiveness', hours: 5.5, billable: true },
      { task: 'TASK-ME-1898 - Search optimization', hours: 5, billable: true },
      { task: 'TASK-ME-1902 - API gateway code review', hours: 2, billable: true },
      { task: 'TASK-ME-1910 - Production error investigation', hours: 4, billable: true },
      { task: 'TICKET-ME-4521 - File upload bug', hours: 3, billable: true },
      { task: 'TICKET-ME-4518 - Mobile draft save bug', hours: 2, billable: true },
      { task: 'TICKET-ME-4515 - Search results bug', hours: 3, billable: true },
      { task: 'On-Call Support', hours: 4, billable: false },
      { task: 'Team Meetings', hours: 2, billable: false },
      { task: 'Sprint Planning', hours: 1.5, billable: false },
      { task: 'Mentoring Casey', hours: 0.5, billable: false }
    ],
    overtime: 2,
    notes: 'Busy week. Covering for Taylor on PTO. 2 hours overtime due to on-call incidents.'
  },
  {
    id: 'TIME-2025-W44',
    week: 'Week 44 (Nov 4-8, 2025)',
    totalHours: 40,
    billableHours: 36,
    nonBillableHours: 4,
    breakdown: {
      'Feature Development': 24,
      'Bug Fixes': 8,
      'Code Reviews': 4,
      'Meetings': 2,
      'Learning': 2
    },
    byProject: {
      'Customer Portal': 28,
      'Code Reviews': 6,
      'Professional Development': 2,
      'Support Tickets': 4
    },
    byTask: [
      { task: 'TASK-ME-1892 - Multi-file upload', hours: 18, billable: true },
      { task: 'TASK-ME-1880 - Form validation improvements', hours: 6, billable: true },
      { task: 'Code Reviews (various)', hours: 6, billable: true },
      { task: 'TICKET-ME-4505 - Upload error handling', hours: 4, billable: true },
      { task: 'Team Retrospective', hours: 1.5, billable: false },
      { task: 'Sprint Planning', hours: 1.5, billable: false },
      { task: 'TypeScript Training', hours: 2, billable: false },
      { task: 'Slack/Email Communication', hours: 1, billable: false }
    ],
    overtime: 0,
    notes: 'Good week. Made solid progress on multi-file upload feature.'
  },
  {
    id: 'TIME-2025-W43',
    week: 'Week 43 (Oct 28-Nov 1, 2025)',
    totalHours: 38,
    billableHours: 34,
    nonBillableHours: 4,
    breakdown: {
      'Feature Development': 20,
      'Bug Fixes': 10,
      'Code Reviews': 4,
      'Meetings': 2,
      'Technical Debt': 2
    },
    byProject: {
      'Customer Portal': 18,
      'Database Optimization': 8,
      'Code Reviews': 6,
      'Support Tickets': 6
    },
    byTask: [
      { task: 'TASK-ME-1865 - Customer data caching', hours: 12, billable: true },
      { task: 'TASK-ME-1872 - Database query tuning', hours: 8, billable: true },
      { task: 'Code Reviews (various)', hours: 6, billable: true },
      { task: 'TICKET-ME-4488 - Portal loading issue', hours: 4, billable: true },
      { task: 'TICKET-ME-4492 - Form submission bug', hours: 4, billable: true },
      { task: 'Team Meetings', hours: 2, billable: false },
      { task: 'Sprint Retrospective', hours: 1.5, billable: false },
      { task: 'Knowledge Sharing Session', hours: 0.5, billable: false }
    ],
    overtime: 0,
    notes: 'Normal workload. Good sprint execution.'
  },
  {
    id: 'TIME-SUMMARY-MONTH',
    period: 'November 2025 (Month-to-Date)',
    totalHours: 88,
    billableHours: 80,
    nonBillableHours: 8,
    breakdown: {
      'Feature Development': 50,
      'Bug Fixes': 20,
      'Code Reviews': 10,
      'On-Call Support': 4,
      'Meetings': 4
    },
    byProject: {
      'Customer Portal': 58,
      'API Gateway': 10,
      'Database Work': 12,
      'Support Tickets': 8
    },
    utilizationRate: 90.9,
    overtimeHours: 2,
    notes: 'Month-to-date: 88 hours (90.9% utilization). 1 on-call shift. Good progress on sprint goals.'
  },
  {
    id: 'TIME-SUMMARY-SPRINT',
    period: 'Sprint 45 (Oct 28 - Nov 11)',
    totalHours: 80,
    billableHours: 72,
    nonBillableHours: 8,
    breakdown: {
      'Feature Development': 44,
      'Bug Fixes': 18,
      'Code Reviews': 10,
      'On-Call Support': 4,
      'Meetings': 4
    },
    byProject: {
      'Customer Portal': 50,
      'Database Optimization': 14,
      'API Gateway': 8,
      'Support': 8
    },
    tasksCompleted: 12,
    storyPointsCompleted: 18,
    sprintVelocity: 18,
    notes: 'Sprint 45: 18 story points completed (100% of commitment). Strong sprint execution.'
  }
];
