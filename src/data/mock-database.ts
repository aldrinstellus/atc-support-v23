// V17 Mock Database - Lightweight 8-table structure with ~190 records
// Supports Government and Project mode persona workflows
// Designed for realistic Zoho Help Desk demo scenarios

// ============================================================================
// DATABASE SCHEMA TYPES
// ============================================================================

export interface Ticket {
  id: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'in-progress' | 'pending' | 'resolved' | 'closed';
  subject: string;
  customerId: string;
  assignedTo: string;
  createdAt: Date;
  slaDeadline: Date;
  tags: string[];
  category: 'contract' | 'requirements' | 'technical' | 'support';
  mode: 'government' | 'project';
}

export interface Customer {
  id: string;
  name: string;
  tier: 'enterprise-plus' | 'enterprise' | 'professional' | 'standard';
  arr: number;
  riskScore: number;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  contractRenewal: Date;
  csm: string;
  mode: 'government' | 'project';
}

export interface User {
  id: string;
  mode: 'government' | 'project';
  name: string;
  email: string;
  role: string;
  badgeLabel: string;
  badgeColor: string;
}

export interface Deliverable {
  id: string;
  contractId: string;
  name: string;
  dueDate: Date;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
  reviewedBy?: string;
  qualityScore?: number;
  issues: number;
}

export interface Contract {
  id: string;
  vendorId: string;
  value: number;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'terminated';
  slaCompliance: number;
  performanceScore: number;
}

export interface Sprint {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: 'planning' | 'active' | 'completed';
  velocity: number;
  capacity: number;
  teamId: string;
}

export interface Task {
  id: string;
  sprintId: string;
  assignedTo: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'todo' | 'in-progress' | 'review' | 'done';
  storyPoints: number;
  blockedBy?: string;
  title: string;
}

export interface KnowledgeBaseArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  videoUrl?: string;
  viewCount: number;
  helpfulCount: number;
  mode: 'government' | 'project' | 'both';
}

// ============================================================================
// MOCK DATA - TICKETS (50 records: 25 Government + 25 Project)
// ============================================================================

export const mockTickets: Ticket[] = [
  // Government Mode Tickets (25)
  {
    id: 'TICK-GOV-001',
    priority: 'critical',
    status: 'open',
    subject: 'Q4 Security Audit Report deliverable delayed',
    customerId: 'CUST-GOV-001',
    assignedTo: 'cor',
    createdAt: new Date('2025-11-10'),
    slaDeadline: new Date('2025-11-13'),
    tags: ['deliverable', 'audit', 'security'],
    category: 'contract',
    mode: 'government',
  },
  {
    id: 'TICK-GOV-002',
    priority: 'high',
    status: 'in-progress',
    subject: 'SLA breach notification for contract CON-2025-042',
    customerId: 'CUST-GOV-001',
    assignedTo: 'cor',
    createdAt: new Date('2025-11-11'),
    slaDeadline: new Date('2025-11-14'),
    tags: ['sla', 'contract', 'compliance'],
    category: 'contract',
    mode: 'government',
  },
  {
    id: 'TICK-GOV-003',
    priority: 'medium',
    status: 'open',
    subject: 'Monthly performance report generation failed',
    customerId: 'CUST-GOV-002',
    assignedTo: 'program-manager',
    createdAt: new Date('2025-11-09'),
    slaDeadline: new Date('2025-11-15'),
    tags: ['reporting', 'program-health'],
    category: 'technical',
    mode: 'government',
  },
  {
    id: 'TICK-GOV-004',
    priority: 'high',
    status: 'open',
    subject: 'Stakeholder feedback system not recording submissions',
    customerId: 'CUST-GOV-003',
    assignedTo: 'stakeholder-lead',
    createdAt: new Date('2025-11-10'),
    slaDeadline: new Date('2025-11-13'),
    tags: ['stakeholder', 'feedback', 'system'],
    category: 'technical',
    mode: 'government',
  },
  {
    id: 'TICK-GOV-005',
    priority: 'critical',
    status: 'in-progress',
    subject: 'Change request CR-2847 requires urgent review',
    customerId: 'CUST-GOV-003',
    assignedTo: 'stakeholder-lead',
    createdAt: new Date('2025-11-11'),
    slaDeadline: new Date('2025-11-12'),
    tags: ['change-request', 'urgent'],
    category: 'requirements',
    mode: 'government',
  },
  // Additional Government tickets (20 more)
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `TICK-GOV-${String(i + 6).padStart(3, '0')}`,
    priority: (['critical', 'high', 'medium', 'low'] as const)[i % 4],
    status: (['open', 'in-progress', 'pending'] as const)[i % 3],
    subject: [
      'Budget modification request pending approval',
      'Vendor compliance report overdue',
      'Deliverable quality score below threshold',
      'Requirements traceability matrix incomplete',
      'Stakeholder meeting scheduling conflict',
      'Contract renewal documentation needed',
      'Program milestone status update required',
      'Resource allocation request pending',
      'Risk assessment report generation error',
      'Vendor performance review scheduled',
      'Compliance audit findings review',
      'Deliverable submission deadline approaching',
      'Budget utilization report requested',
      'Change request impact analysis needed',
      'Stakeholder communication plan update',
      'Contract modification approval required',
      'Program health dashboard access issue',
      'Requirements approval workflow stuck',
      'Vendor SLA breach investigation',
      'Budget forecast update requested',
    ][i % 20],
    customerId: `CUST-GOV-${String((i % 3) + 1).padStart(3, '0')}`,
    assignedTo: ['cor', 'program-manager', 'stakeholder-lead'][i % 3],
    createdAt: new Date(Date.now() - (i + 1) * 24 * 60 * 60 * 1000),
    slaDeadline: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000),
    tags: [['budget', 'approval'], ['vendor', 'compliance'], ['deliverable', 'quality']][i % 3],
    category: (['contract', 'requirements', 'technical'] as const)[i % 3],
    mode: 'government' as const,
  })),

  // Project Mode Tickets (25)
  {
    id: 'TICK-PROJ-001',
    priority: 'critical',
    status: 'open',
    subject: 'Production deployment failed - authentication service down',
    customerId: 'CUST-PROJ-001',
    assignedTo: 'service-team-lead',
    createdAt: new Date('2025-11-12'),
    slaDeadline: new Date('2025-11-12T18:00:00'),
    tags: ['production', 'deployment', 'critical'],
    category: 'technical',
    mode: 'project',
  },
  {
    id: 'TICK-PROJ-002',
    priority: 'high',
    status: 'in-progress',
    subject: 'Sprint 24 burndown shows 15-point deficit',
    customerId: 'CUST-PROJ-001',
    assignedTo: 'project-manager',
    createdAt: new Date('2025-11-11'),
    slaDeadline: new Date('2025-11-14'),
    tags: ['sprint', 'velocity', 'planning'],
    category: 'support',
    mode: 'project',
  },
  {
    id: 'TICK-PROJ-003',
    priority: 'medium',
    status: 'open',
    subject: 'Code quality scan flagged 12 critical issues',
    customerId: 'CUST-PROJ-002',
    assignedTo: 'service-team-lead',
    createdAt: new Date('2025-11-10'),
    slaDeadline: new Date('2025-11-15'),
    tags: ['code-quality', 'technical-debt'],
    category: 'technical',
    mode: 'project',
  },
  {
    id: 'TICK-PROJ-004',
    priority: 'high',
    status: 'open',
    subject: 'Task TASK-5821 blocked by external API dependency',
    customerId: 'CUST-PROJ-001',
    assignedTo: 'service-team-member',
    createdAt: new Date('2025-11-09'),
    slaDeadline: new Date('2025-11-13'),
    tags: ['blocker', 'dependency', 'api'],
    category: 'technical',
    mode: 'project',
  },
  {
    id: 'TICK-PROJ-005',
    priority: 'critical',
    status: 'in-progress',
    subject: 'CI/CD pipeline failing on staging environment',
    customerId: 'CUST-PROJ-002',
    assignedTo: 'service-team-lead',
    createdAt: new Date('2025-11-11'),
    slaDeadline: new Date('2025-11-12T12:00:00'),
    tags: ['cicd', 'deployment', 'staging'],
    category: 'technical',
    mode: 'project',
  },
  // Additional Project tickets (20 more)
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `TICK-PROJ-${String(i + 6).padStart(3, '0')}`,
    priority: (['critical', 'high', 'medium', 'low'] as const)[i % 4],
    status: (['open', 'in-progress', 'pending'] as const)[i % 3],
    subject: [
      'Team velocity declining for 3 consecutive sprints',
      'Resource capacity showing 120% allocation',
      'Test coverage dropped below 80% threshold',
      'Deployment frequency decreased by 40%',
      'Kanban board shows 8 tasks blocked',
      'Sprint planning meeting rescheduling needed',
      'Code review turnaround time increased',
      'Technical debt reached 200 hours',
      'Team member PTO causing capacity gap',
      'Build time increased to 15 minutes',
      'Performance tests failing on latest build',
      'Documentation update required for API changes',
      'Sprint retrospective action items pending',
      'Dependency update breaking integration tests',
      'Monitoring alerts misconfigured',
      'Database migration rollback needed',
      'Feature flag cleanup overdue',
      'Load testing results show degradation',
      'Security scan flagged 5 vulnerabilities',
      'Release notes generation failed',
    ][i % 20],
    customerId: `CUST-PROJ-${String((i % 2) + 1).padStart(3, '0')}`,
    assignedTo: ['project-manager', 'service-team-lead', 'service-team-member'][i % 3],
    createdAt: new Date(Date.now() - (i + 1) * 24 * 60 * 60 * 1000),
    slaDeadline: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000),
    tags: [['sprint', 'velocity'], ['deployment', 'cicd'], ['code-quality', 'testing']][i % 3],
    category: (['technical', 'support'] as const)[i % 2],
    mode: 'project' as const,
  })),
];

// ============================================================================
// MOCK DATA - CUSTOMERS (18 records: 10 Government + 8 Project)
// ============================================================================

export const mockCustomers: Customer[] = [
  // Government Customers (10)
  {
    id: 'CUST-GOV-001',
    name: 'Department of Defense - IT Modernization Program',
    tier: 'enterprise-plus',
    arr: 2500000,
    riskScore: 42,
    riskLevel: 'medium',
    contractRenewal: new Date('2026-03-15'),
    csm: 'Alexa Johnson',
    mode: 'government',
  },
  {
    id: 'CUST-GOV-002',
    name: 'Veterans Affairs - Healthcare System Upgrade',
    tier: 'enterprise',
    arr: 1800000,
    riskScore: 28,
    riskLevel: 'low',
    contractRenewal: new Date('2026-06-30'),
    csm: 'Jennifer Chen',
    mode: 'government',
  },
  {
    id: 'CUST-GOV-003',
    name: 'State of Wisconsin - eGrants Management System',
    tier: 'enterprise',
    arr: 2100000,
    riskScore: 35,
    riskLevel: 'medium',
    contractRenewal: new Date('2026-09-01'),
    csm: 'Jessica Martinez',
    mode: 'government',
  },
  ...Array.from({ length: 7 }, (_, i) => ({
    id: `CUST-GOV-${String(i + 4).padStart(3, '0')}`,
    name: [
      'FBI - Cyber Security Infrastructure',
      'NASA - Data Analytics Platform',
      'USDA - Grant Management Portal',
      'HHS - Medicare Modernization',
      'DOE - Energy Grid Management System',
      'EPA - Environmental Compliance Portal',
      'DHS - Border Security Technology',
    ][i],
    tier: (['enterprise-plus', 'enterprise', 'professional'] as const)[i % 3],
    arr: [2200000, 1500000, 1200000, 1900000, 1600000, 1400000, 2000000][i],
    riskScore: [38, 45, 52, 30, 41, 48, 33][i],
    riskLevel: (['medium', 'medium', 'high', 'low', 'medium', 'medium', 'low'] as const)[i],
    contractRenewal: new Date(Date.now() + (i + 4) * 30 * 24 * 60 * 60 * 1000),
    csm: ['Alexa Johnson', 'Jennifer Chen', 'Jessica Martinez'][i % 3],
    mode: 'government' as const,
  })),

  // Project Customers (8)
  {
    id: 'CUST-PROJ-001',
    name: 'TechCorp Enterprise Solutions',
    tier: 'enterprise',
    arr: 1200000,
    riskScore: 38,
    riskLevel: 'medium',
    contractRenewal: new Date('2026-02-28'),
    csm: 'Dale Thompson',
    mode: 'project',
  },
  {
    id: 'CUST-PROJ-002',
    name: 'Global Financial Services Inc',
    tier: 'enterprise-plus',
    arr: 1800000,
    riskScore: 25,
    riskLevel: 'low',
    contractRenewal: new Date('2026-05-15'),
    csm: 'Herbert Roberts',
    mode: 'project',
  },
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `CUST-PROJ-${String(i + 3).padStart(3, '0')}`,
    name: [
      'HealthTech Solutions',
      'E-commerce Platform Co',
      'Manufacturing Automation Ltd',
      'Retail Chain Systems',
      'Insurance Tech Innovators',
      'Logistics Network Solutions',
    ][i],
    tier: (['enterprise', 'professional', 'standard'] as const)[i % 3],
    arr: [950000, 650000, 450000, 850000, 750000, 550000][i],
    riskScore: [42, 31, 48, 35, 39, 44][i],
    riskLevel: (['medium', 'low', 'medium', 'medium', 'medium', 'medium'] as const)[i],
    contractRenewal: new Date(Date.now() + (i + 3) * 30 * 24 * 60 * 60 * 1000),
    csm: ['Dale Thompson', 'Herbert Roberts', 'Molly Rivera'][i % 3],
    mode: 'project' as const,
  })),
];

// ============================================================================
// MOCK DATA - USERS (6 records: 3 Government + 3 Project)
// ============================================================================

export const mockUsers: User[] = [
  // Government Mode Users
  {
    id: 'cor',
    mode: 'government',
    name: 'Alexa Johnson',
    email: 'alexa.johnson@agency.gov',
    role: "Contracting Officer's Representative",
    badgeLabel: 'COR',
    badgeColor: 'bg-blue-500',
  },
  {
    id: 'program-manager',
    mode: 'government',
    name: 'Jennifer Chen',
    email: 'jennifer.chen@agency.gov',
    role: 'Program Manager',
    badgeLabel: 'PM',
    badgeColor: 'bg-purple-500',
  },
  {
    id: 'stakeholder-lead',
    mode: 'government',
    name: 'Jessica Martinez',
    email: 'jessica.martinez@agency.gov',
    role: 'Stakeholder Lead',
    badgeLabel: 'SL',
    badgeColor: 'bg-green-500',
  },
  // Project Mode Users
  {
    id: 'project-manager',
    mode: 'project',
    name: 'Dale Thompson',
    email: 'dale.thompson@company.com',
    role: 'Project Manager',
    badgeLabel: 'PM',
    badgeColor: 'bg-orange-500',
  },
  {
    id: 'service-team-lead',
    mode: 'project',
    name: 'Herbert Roberts',
    email: 'herbert.roberts@company.com',
    role: 'Service Team Lead',
    badgeLabel: 'TL',
    badgeColor: 'bg-cyan-500',
  },
  {
    id: 'service-team-member',
    mode: 'project',
    name: 'Molly Rivera',
    email: 'molly.rivera@company.com',
    role: 'Service Team Member',
    badgeLabel: 'TM',
    badgeColor: 'bg-pink-500',
  },
];

// ============================================================================
// MOCK DATA - DELIVERABLES (24 records - Government Mode only)
// ============================================================================

export const mockDeliverables: Deliverable[] = [
  {
    id: 'DEL-2847',
    contractId: 'CON-2025-042',
    name: 'Q4 Security Audit Report',
    dueDate: new Date('2025-11-15'),
    status: 'submitted',
    reviewedBy: 'cor',
    qualityScore: 78,
    issues: 2,
  },
  {
    id: 'DEL-2848',
    contractId: 'CON-2025-042',
    name: 'Monthly Performance Dashboard',
    dueDate: new Date('2025-11-30'),
    status: 'approved',
    reviewedBy: 'cor',
    qualityScore: 92,
    issues: 0,
  },
  {
    id: 'DEL-2849',
    contractId: 'CON-2025-043',
    name: 'System Architecture Documentation',
    dueDate: new Date('2025-12-01'),
    status: 'pending',
    issues: 0,
  },
  ...Array.from({ length: 21 }, (_, i) => ({
    id: `DEL-${String(2850 + i).padStart(4, '0')}`,
    contractId: `CON-2025-${String(42 + (i % 5)).padStart(3, '0')}`,
    name: [
      'Technical Design Document',
      'User Training Materials',
      'Data Migration Plan',
      'Security Compliance Report',
      'API Integration Guide',
      'Performance Test Results',
      'Disaster Recovery Plan',
      'System Maintenance Procedures',
      'Code Review Summary',
      'Requirements Traceability Matrix',
      'Change Management Plan',
      'Quality Assurance Report',
      'Deployment Runbook',
      'Configuration Management Plan',
      'Risk Assessment Report',
      'Incident Response Plan',
      'Business Continuity Plan',
      'Vendor Management Guide',
      'Budget Utilization Report',
      'Stakeholder Communication Plan',
      'Project Closeout Report',
    ][i],
    dueDate: new Date(Date.now() + (i + 1) * 7 * 24 * 60 * 60 * 1000),
    status: (['pending', 'submitted', 'approved', 'rejected'] as const)[i % 4],
    reviewedBy: i % 4 !== 0 ? 'cor' : undefined,
    qualityScore: i % 4 !== 0 ? 70 + (i % 25) : undefined,
    issues: [0, 1, 2, 3][i % 4],
  })),
];

// ============================================================================
// MOCK DATA - CONTRACTS (12 records - Government Mode only)
// ============================================================================

export const mockContracts: Contract[] = [
  {
    id: 'CON-2025-042',
    vendorId: 'VEND-1523',
    value: 2500000,
    startDate: new Date('2025-01-01'),
    endDate: new Date('2027-12-31'),
    status: 'active',
    slaCompliance: 87,
    performanceScore: 85,
  },
  {
    id: 'CON-2025-043',
    vendorId: 'VEND-1524',
    value: 1800000,
    startDate: new Date('2025-03-01'),
    endDate: new Date('2027-02-28'),
    status: 'active',
    slaCompliance: 92,
    performanceScore: 91,
  },
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `CON-2025-${String(44 + i).padStart(3, '0')}`,
    vendorId: `VEND-${String(1525 + i).padStart(4, '0')}`,
    value: [1200000, 2100000, 1500000, 1900000, 1400000, 2200000, 1600000, 1700000, 2000000, 1300000][i],
    startDate: new Date(Date.now() - (i + 1) * 60 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + (730 - i * 30) * 24 * 60 * 60 * 1000),
    status: (['active', 'active', 'active', 'completed'] as const)[i % 4],
    slaCompliance: 75 + (i % 20),
    performanceScore: 70 + (i % 25),
  })),
];

// ============================================================================
// MOCK DATA - SPRINTS (12 records - Project Mode only)
// ============================================================================

export const mockSprints: Sprint[] = [
  {
    id: 'SPRINT-24',
    name: 'Sprint 24 - Q4 Features',
    startDate: new Date('2025-11-04'),
    endDate: new Date('2025-11-17'),
    status: 'active',
    velocity: 42,
    capacity: 55,
    teamId: 'TEAM-001',
  },
  {
    id: 'SPRINT-23',
    name: 'Sprint 23 - Performance Optimization',
    startDate: new Date('2025-10-21'),
    endDate: new Date('2025-11-03'),
    status: 'completed',
    velocity: 48,
    capacity: 50,
    teamId: 'TEAM-001',
  },
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `SPRINT-${String(22 - i).padStart(2, '0')}`,
    name: `Sprint ${22 - i} - ${['Bug Fixes', 'New Features', 'Refactoring', 'Security Updates'][i % 4]}`,
    startDate: new Date(Date.now() - (i + 2) * 14 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() - (i + 1) * 14 * 24 * 60 * 60 * 1000),
    status: 'completed' as const,
    velocity: 40 + (i % 15),
    capacity: 45 + (i % 10),
    teamId: 'TEAM-001',
  })),
];

// ============================================================================
// MOCK DATA - TASKS (36 records - Project Mode only)
// ============================================================================

export const mockTasks: Task[] = [
  {
    id: 'TASK-5821',
    sprintId: 'SPRINT-24',
    assignedTo: 'service-team-member',
    priority: 'high',
    status: 'in-progress',
    storyPoints: 8,
    blockedBy: 'External API dependency',
    title: 'Implement OAuth2 integration with external vendor API',
  },
  {
    id: 'TASK-5822',
    sprintId: 'SPRINT-24',
    assignedTo: 'service-team-member',
    priority: 'medium',
    status: 'todo',
    storyPoints: 5,
    title: 'Add pagination to customer dashboard',
  },
  {
    id: 'TASK-5823',
    sprintId: 'SPRINT-24',
    assignedTo: 'service-team-lead',
    priority: 'critical',
    status: 'in-progress',
    storyPoints: 13,
    title: 'Fix production authentication service outage',
  },
  ...Array.from({ length: 33 }, (_, i) => ({
    id: `TASK-${String(5824 + i).padStart(4, '0')}`,
    sprintId: i < 15 ? 'SPRINT-24' : 'SPRINT-23',
    assignedTo: ['service-team-member', 'service-team-lead', 'project-manager'][i % 3],
    priority: (['critical', 'high', 'medium', 'low'] as const)[i % 4],
    status: (['todo', 'in-progress', 'review', 'done'] as const)[i % 4],
    storyPoints: [1, 2, 3, 5, 8, 13][i % 6],
    blockedBy: i % 5 === 0 ? 'Technical dependency' : undefined,
    title: [
      'Update user profile API endpoint',
      'Refactor database queries for performance',
      'Add unit tests for payment module',
      'Implement dark mode theme',
      'Fix memory leak in background worker',
      'Optimize image loading strategy',
      'Add error handling to checkout flow',
      'Update API documentation',
      'Configure CI/CD pipeline',
      'Implement feature flags',
      'Add analytics tracking',
      'Update dependencies to latest versions',
      'Fix cross-browser compatibility issues',
      'Implement caching strategy',
      'Add monitoring alerts',
      'Refactor component library',
      'Implement lazy loading',
      'Add accessibility improvements',
      'Fix mobile responsive issues',
      'Optimize bundle size',
      'Add integration tests',
      'Implement rate limiting',
      'Update error messages',
      'Add loading states',
      'Implement search functionality',
      'Fix data validation issues',
      'Add file upload feature',
      'Implement export functionality',
      'Update UI components',
      'Fix security vulnerabilities',
      'Add user preferences',
      'Implement notifications',
      'Update email templates',
    ][i],
  })),
];

// ============================================================================
// MOCK DATA - KNOWLEDGE BASE (20 articles: Government & Project)
// ============================================================================

export const mockKnowledgeBase: KnowledgeBaseArticle[] = [
  // Government Mode Articles (10)
  {
    id: 'KB-GOV-001',
    title: 'How to Review Contract Deliverables',
    category: 'Contract Management',
    content: 'Step-by-step guide for CORs to review vendor deliverables...',
    videoUrl: 'https://example.com/video/deliverable-review',
    viewCount: 245,
    helpfulCount: 198,
    mode: 'government',
  },
  {
    id: 'KB-GOV-002',
    title: 'Understanding SLA Compliance Metrics',
    category: 'Performance Monitoring',
    content: 'Complete guide to interpreting SLA compliance dashboards...',
    viewCount: 312,
    helpfulCount: 267,
    mode: 'government',
  },
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `KB-GOV-${String(i + 3).padStart(3, '0')}`,
    title: [
      'Budget Modification Request Process',
      'Vendor Performance Review Guidelines',
      'Stakeholder Communication Best Practices',
      'Requirements Traceability Setup',
      'Change Request Approval Workflow',
      'Program Health Dashboard Tutorial',
      'Compliance Reporting Requirements',
      'Contract Renewal Procedures',
    ][i],
    category: ['Budget', 'Vendor Management', 'Communications', 'Requirements', 'Change Management', 'Program Management', 'Compliance', 'Contracts'][i],
    content: `Detailed article content for ${i + 3}...`,
    videoUrl: i % 2 === 0 ? `https://example.com/video/gov-${i + 3}` : undefined,
    viewCount: 150 + i * 20,
    helpfulCount: 120 + i * 15,
    mode: 'government' as const,
  })),

  // Project Mode Articles (10)
  {
    id: 'KB-PROJ-001',
    title: 'Sprint Planning Best Practices',
    category: 'Agile Methodology',
    content: 'Comprehensive guide to effective sprint planning sessions...',
    videoUrl: 'https://example.com/video/sprint-planning',
    viewCount: 428,
    helpfulCount: 365,
    mode: 'project',
  },
  {
    id: 'KB-PROJ-002',
    title: 'Resolving Deployment Pipeline Failures',
    category: 'DevOps',
    content: 'Troubleshooting guide for common CI/CD pipeline issues...',
    viewCount: 392,
    helpfulCount: 341,
    mode: 'project',
  },
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `KB-PROJ-${String(i + 3).padStart(3, '0')}`,
    title: [
      'Understanding Team Velocity Metrics',
      'Code Quality Standards and Guidelines',
      'Kanban Board Management Tips',
      'Handling Technical Blockers',
      'Resource Capacity Planning',
      'Sprint Retrospective Facilitation',
      'Testing Strategy Overview',
      'Performance Optimization Techniques',
    ][i],
    category: ['Agile', 'Quality Assurance', 'Project Management', 'Technical', 'Resource Planning', 'Agile', 'Testing', 'Performance'][i],
    content: `Detailed article content for project ${i + 3}...`,
    videoUrl: i % 2 === 0 ? `https://example.com/video/proj-${i + 3}` : undefined,
    viewCount: 200 + i * 25,
    helpfulCount: 170 + i * 20,
    mode: 'project' as const,
  })),
];

// ============================================================================
// DATABASE SUMMARY
// ============================================================================

export const databaseSummary = {
  tables: 8,
  totalRecords: 188,
  breakdown: {
    tickets: 50,
    customers: 18,
    users: 6,
    deliverables: 24,
    contracts: 12,
    sprints: 12,
    tasks: 36,
    knowledgeBase: 20,
  },
  modes: {
    government: {
      tickets: 25,
      customers: 10,
      users: 3,
      deliverables: 24,
      contracts: 12,
      knowledgeBase: 10,
    },
    project: {
      tickets: 25,
      customers: 8,
      users: 3,
      sprints: 12,
      tasks: 36,
      knowledgeBase: 10,
    },
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getTicketsByMode(mode: 'government' | 'project'): Ticket[] {
  return mockTickets.filter(ticket => ticket.mode === mode);
}

export function getTicketsByPersona(personaId: string): Ticket[] {
  return mockTickets.filter(ticket => ticket.assignedTo === personaId);
}

export function getCustomersByMode(mode: 'government' | 'project'): Customer[] {
  return mockCustomers.filter(customer => customer.mode === mode);
}

export function getUsersByMode(mode: 'government' | 'project'): User[] {
  return mockUsers.filter(user => user.mode === mode);
}

export function getContractById(contractId: string): Contract | undefined {
  return mockContracts.find(contract => contract.id === contractId);
}

export function getDeliverablesByContract(contractId: string): Deliverable[] {
  return mockDeliverables.filter(del => del.contractId === contractId);
}

export function getTasksBySprint(sprintId: string): Task[] {
  return mockTasks.filter(task => task.sprintId === sprintId);
}

export function getKnowledgeBaseByMode(mode: 'government' | 'project' | 'both'): KnowledgeBaseArticle[] {
  return mockKnowledgeBase.filter(article => article.mode === mode || article.mode === 'both');
}
