/**
 * Program Manager Persona Data - Jennifer Chen
 *
 * Role: Multi-project portfolio management, strategic oversight, cross-team coordination
 * Context: Managing 5 major strategic initiatives with $12M total budget
 * Focus: Program-level governance, resource allocation, executive reporting
 */

/**
 * Program Manager Portfolio Dashboard
 * 5 active strategic initiatives across enterprise
 */
export const programManagerOverviewData = [
  {
    id: 'INIT-2025-DT',
    name: 'Digital Transformation Initiative',
    description: 'Enterprise-wide modernization of legacy systems and processes',
    status: 'active',
    budget: {
      allocated: 4200000,
      spent: 1680000,
      remaining: 2520000,
      percentSpent: 40
    },
    timeline: {
      startDate: '2025-01-15',
      plannedEndDate: '2026-06-30',
      currentPhase: 'Phase 2: Platform Migration',
      progressPercent: 42
    },
    projects: ['Digital Workspace', 'API Gateway', 'Data Lake', 'Customer Portal'],
    keyMetrics: {
      totalProjects: 4,
      completedMilestones: 12,
      totalMilestones: 28,
      teamSize: 38,
      riskLevel: 'medium'
    },
    executiveSponsor: 'Sarah Thompson, CTO',
    lastReviewDate: '2025-11-06',
    nextReviewDate: '2025-12-04'
  },
  {
    id: 'INIT-2024-CLOUD',
    name: 'Cloud Migration Program',
    description: 'Migration of on-premise infrastructure to AWS cloud platform',
    status: 'active',
    budget: {
      allocated: 2800000,
      spent: 2380000,
      remaining: 420000,
      percentSpent: 85
    },
    timeline: {
      startDate: '2024-04-01',
      plannedEndDate: '2025-12-31',
      currentPhase: 'Phase 4: Production Cutover',
      progressPercent: 88
    },
    projects: ['Infrastructure Migration', 'Database Replatform', 'Security Hardening'],
    keyMetrics: {
      totalProjects: 3,
      completedMilestones: 31,
      totalMilestones: 35,
      teamSize: 22,
      riskLevel: 'high'
    },
    executiveSponsor: 'Michael Chen, VP Infrastructure',
    lastReviewDate: '2025-11-08',
    nextReviewDate: '2025-11-22'
  },
  {
    id: 'INIT-2025-SEC',
    name: 'Security Modernization',
    description: 'Zero-trust architecture implementation and security posture improvement',
    status: 'active',
    budget: {
      allocated: 1500000,
      spent: 525000,
      remaining: 975000,
      percentSpent: 35
    },
    timeline: {
      startDate: '2025-03-01',
      plannedEndDate: '2026-08-31',
      currentPhase: 'Phase 1: Architecture Design',
      progressPercent: 28
    },
    projects: ['Zero Trust Network', 'Identity Management', 'SOC Enhancement'],
    keyMetrics: {
      totalProjects: 3,
      completedMilestones: 5,
      totalMilestones: 18,
      teamSize: 15,
      riskLevel: 'low'
    },
    executiveSponsor: 'Robert Martinez, CISO',
    lastReviewDate: '2025-10-30',
    nextReviewDate: '2025-11-27'
  },
  {
    id: 'INIT-2025-DATA',
    name: 'Data Analytics Platform',
    description: 'Enterprise data warehouse and analytics capability buildout',
    status: 'active',
    budget: {
      allocated: 2100000,
      spent: 1050000,
      remaining: 1050000,
      percentSpent: 50
    },
    timeline: {
      startDate: '2025-02-10',
      plannedEndDate: '2026-04-30',
      currentPhase: 'Phase 2: Data Pipeline Development',
      progressPercent: 55
    },
    projects: ['Data Warehouse', 'BI Tools', 'ML Platform', 'Data Governance'],
    keyMetrics: {
      totalProjects: 4,
      completedMilestones: 14,
      totalMilestones: 26,
      teamSize: 28,
      riskLevel: 'medium'
    },
    executiveSponsor: 'Linda Park, CDO',
    lastReviewDate: '2025-11-05',
    nextReviewDate: '2025-12-03'
  },
  {
    id: 'INIT-2025-MOBILE',
    name: 'Mobile App Suite',
    description: 'Customer-facing mobile applications for iOS and Android',
    status: 'planning',
    budget: {
      allocated: 1900000,
      spent: 285000,
      remaining: 1615000,
      percentSpent: 15
    },
    timeline: {
      startDate: '2025-09-01',
      plannedEndDate: '2026-10-31',
      currentPhase: 'Phase 1: Requirements & Design',
      progressPercent: 18
    },
    projects: ['Customer App', 'Partner App', 'Employee App'],
    keyMetrics: {
      totalProjects: 3,
      completedMilestones: 3,
      totalMilestones: 22,
      teamSize: 18,
      riskLevel: 'medium'
    },
    executiveSponsor: 'Amanda Rodriguez, CMO',
    lastReviewDate: '2025-10-25',
    nextReviewDate: '2025-11-20'
  }
];

/**
 * Program-Level Milestone Tracker
 * Strategic milestones across all initiatives
 */
export const programManagerMilestoneData = [
  {
    id: 'MILE-DT-001',
    programId: 'INIT-2025-DT',
    name: 'API Gateway Production Launch',
    description: 'Deploy API gateway to production with initial 20 service integrations',
    dueDate: '2025-11-30',
    status: 'at-risk',
    progressPercent: 72,
    dependencies: ['MILE-DT-003', 'MILE-SEC-002'],
    owner: 'Marcus Johnson',
    impact: 'high',
    lastUpdate: '2025-11-09: Integration testing delayed 1 week due to vendor issues'
  },
  {
    id: 'MILE-DT-002',
    programId: 'INIT-2025-DT',
    name: 'Customer Portal Beta Release',
    description: 'Launch beta version to 500 pilot customers',
    dueDate: '2025-12-15',
    status: 'on-track',
    progressPercent: 55,
    dependencies: ['MILE-DT-001'],
    owner: 'Rachel Kim',
    impact: 'high',
    lastUpdate: '2025-11-07: UI/UX testing completed successfully'
  },
  {
    id: 'MILE-DT-003',
    programId: 'INIT-2025-DT',
    name: 'Data Lake Phase 1 Complete',
    description: 'Ingest and process 10 TB of historical data',
    dueDate: '2025-11-15',
    status: 'complete',
    progressPercent: 100,
    dependencies: [],
    owner: 'David Wang',
    impact: 'medium',
    lastUpdate: '2025-11-12: All data ingestion pipelines validated'
  },
  {
    id: 'MILE-CLOUD-001',
    programId: 'INIT-2024-CLOUD',
    name: 'Production Database Cutover',
    description: 'Migrate production databases to AWS RDS with zero downtime',
    dueDate: '2025-11-20',
    status: 'at-risk',
    progressPercent: 85,
    dependencies: ['MILE-CLOUD-002', 'MILE-SEC-001'],
    owner: 'Thomas Anderson',
    impact: 'critical',
    lastUpdate: '2025-11-10: Replication lag issues under investigation'
  },
  {
    id: 'MILE-CLOUD-002',
    programId: 'INIT-2024-CLOUD',
    name: 'Network Infrastructure Validation',
    description: 'Complete performance and security testing of cloud network',
    dueDate: '2025-11-18',
    status: 'on-track',
    progressPercent: 92,
    dependencies: [],
    owner: 'Jennifer Lee',
    impact: 'high',
    lastUpdate: '2025-11-11: Final load tests scheduled for 11/16'
  },
  {
    id: 'MILE-CLOUD-003',
    programId: 'INIT-2024-CLOUD',
    name: 'Legacy System Decommission',
    description: 'Shut down on-premise datacenter and archive data',
    dueDate: '2025-12-31',
    status: 'blocked',
    progressPercent: 45,
    dependencies: ['MILE-CLOUD-001'],
    owner: 'Robert Chen',
    impact: 'medium',
    lastUpdate: '2025-11-08: Waiting for database cutover completion'
  },
  {
    id: 'MILE-SEC-001',
    programId: 'INIT-2025-SEC',
    name: 'Identity Provider Integration',
    description: 'Integrate Okta with all enterprise applications',
    dueDate: '2025-12-10',
    status: 'on-track',
    progressPercent: 68,
    dependencies: [],
    owner: 'Maria Rodriguez',
    impact: 'high',
    lastUpdate: '2025-11-09: 25 of 40 applications integrated'
  },
  {
    id: 'MILE-SEC-002',
    programId: 'INIT-2025-SEC',
    name: 'Zero Trust Network Segmentation',
    description: 'Implement microsegmentation across all environments',
    dueDate: '2026-02-15',
    status: 'on-track',
    progressPercent: 35,
    dependencies: ['MILE-SEC-001'],
    owner: 'Kevin Park',
    impact: 'high',
    lastUpdate: '2025-11-05: Dev environment segmentation complete'
  },
  {
    id: 'MILE-DATA-001',
    programId: 'INIT-2025-DATA',
    name: 'Data Warehouse Production Launch',
    description: 'Deploy Snowflake data warehouse with initial data marts',
    dueDate: '2025-12-20',
    status: 'on-track',
    progressPercent: 78,
    dependencies: ['MILE-DATA-002'],
    owner: 'Lisa Chen',
    impact: 'high',
    lastUpdate: '2025-11-08: Performance testing exceeded targets'
  },
  {
    id: 'MILE-DATA-002',
    programId: 'INIT-2025-DATA',
    name: 'ETL Pipeline Deployment',
    description: 'Deploy 50 ETL pipelines for core business data',
    dueDate: '2025-11-25',
    status: 'on-track',
    progressPercent: 88,
    dependencies: [],
    owner: 'James Kim',
    impact: 'high',
    lastUpdate: '2025-11-10: 44 of 50 pipelines in production'
  },
  {
    id: 'MILE-DATA-003',
    programId: 'INIT-2025-DATA',
    name: 'BI Dashboard Rollout',
    description: 'Deploy Power BI dashboards to 500 business users',
    dueDate: '2026-01-15',
    status: 'on-track',
    progressPercent: 42,
    dependencies: ['MILE-DATA-001'],
    owner: 'Sarah Johnson',
    impact: 'medium',
    lastUpdate: '2025-11-06: 15 executive dashboards completed'
  },
  {
    id: 'MILE-MOBILE-001',
    programId: 'INIT-2025-MOBILE',
    name: 'Mobile Design System Complete',
    description: 'Finalize design system and component library',
    dueDate: '2025-12-05',
    status: 'on-track',
    progressPercent: 85,
    dependencies: [],
    owner: 'Emily Rodriguez',
    impact: 'medium',
    lastUpdate: '2025-11-09: Design reviews scheduled with stakeholders'
  },
  {
    id: 'MILE-MOBILE-002',
    programId: 'INIT-2025-MOBILE',
    name: 'Customer App MVP',
    description: 'Complete MVP for customer-facing mobile app',
    dueDate: '2026-03-15',
    status: 'on-track',
    progressPercent: 22,
    dependencies: ['MILE-MOBILE-001'],
    owner: 'Michael Park',
    impact: 'high',
    lastUpdate: '2025-11-07: Technical architecture approved'
  },
  {
    id: 'MILE-MOBILE-003',
    programId: 'INIT-2025-MOBILE',
    name: 'Backend API Development',
    description: 'Build REST APIs for all mobile applications',
    dueDate: '2026-02-28',
    status: 'on-track',
    progressPercent: 38,
    dependencies: ['MILE-DT-001'],
    owner: 'David Lee',
    impact: 'high',
    lastUpdate: '2025-11-05: 12 of 30 endpoints completed'
  },
  {
    id: 'MILE-EXEC-001',
    programId: 'INIT-2025-DT',
    name: 'Q4 2025 Executive Review',
    description: 'Quarterly business review with executive steering committee',
    dueDate: '2025-12-18',
    status: 'on-track',
    progressPercent: 25,
    dependencies: [],
    owner: 'Jennifer Chen',
    impact: 'high',
    lastUpdate: '2025-11-09: Preparing presentation materials'
  }
];

/**
 * Resource Allocation Across Programs
 * Team capacity and budget distribution
 */
export const programManagerResourceData = [
  {
    id: 'RES-DT-2025',
    programId: 'INIT-2025-DT',
    resourceType: 'team',
    allocated: 38,
    utilized: 36,
    available: 2,
    unit: 'FTEs',
    costPerUnit: 120000,
    totalCost: 4560000,
    period: 'Q4 2025',
    constraints: [
      'Need 5 additional cloud engineers for Q1 2026',
      '2 senior architects rolling off in December',
      'Customer Portal team at 110% capacity'
    ],
    allocation: {
      'Digital Workspace': 12,
      'API Gateway': 10,
      'Data Lake': 8,
      'Customer Portal': 8
    }
  },
  {
    id: 'RES-CLOUD-2025',
    programId: 'INIT-2024-CLOUD',
    resourceType: 'team',
    allocated: 22,
    utilized: 22,
    available: 0,
    unit: 'FTEs',
    costPerUnit: 135000,
    totalCost: 2970000,
    period: 'Q4 2025',
    constraints: [
      'Team fully allocated through year-end',
      'Database team working overtime for cutover',
      'Need weekend support for production migration'
    ],
    allocation: {
      'Infrastructure Migration': 8,
      'Database Replatform': 10,
      'Security Hardening': 4
    }
  },
  {
    id: 'RES-SEC-2025',
    programId: 'INIT-2025-SEC',
    resourceType: 'team',
    allocated: 15,
    utilized: 14,
    available: 1,
    unit: 'FTEs',
    costPerUnit: 145000,
    totalCost: 2175000,
    period: 'Q4 2025',
    constraints: [
      'Waiting for security clearances for 2 contractors',
      'SOC team needs additional training on new tools'
    ],
    allocation: {
      'Zero Trust Network': 6,
      'Identity Management': 5,
      'SOC Enhancement': 4
    }
  },
  {
    id: 'RES-DATA-2025',
    programId: 'INIT-2025-DATA',
    resourceType: 'team',
    allocated: 28,
    utilized: 27,
    available: 1,
    unit: 'FTEs',
    costPerUnit: 130000,
    totalCost: 3640000,
    period: 'Q4 2025',
    constraints: [
      'Data engineer market very competitive',
      'BI team backlog growing - need 3 additional analysts',
      'ML platform team ramping up in Q1 2026'
    ],
    allocation: {
      'Data Warehouse': 10,
      'BI Tools': 8,
      'ML Platform': 6,
      'Data Governance': 4
    }
  },
  {
    id: 'RES-MOBILE-2025',
    programId: 'INIT-2025-MOBILE',
    resourceType: 'team',
    allocated: 18,
    utilized: 16,
    available: 2,
    unit: 'FTEs',
    costPerUnit: 125000,
    totalCost: 2250000,
    period: 'Q4 2025',
    constraints: [
      'Need iOS developer with financial services experience',
      'Design team shared with other initiatives',
      'Backend team waiting for API gateway completion'
    ],
    allocation: {
      'Customer App': 8,
      'Partner App': 5,
      'Employee App': 5
    }
  },
  {
    id: 'RES-BUDGET-Q4',
    programId: 'PORTFOLIO',
    resourceType: 'budget',
    allocated: 3200000,
    utilized: 2650000,
    available: 550000,
    unit: 'USD',
    costPerUnit: 1,
    totalCost: 3200000,
    period: 'Q4 2025',
    constraints: [
      'Cloud migration over budget by $380K',
      'Mobile program under budget - funds available',
      'Need to reserve $250K for Q1 2026 carryover'
    ],
    allocation: {
      'Digital Transformation': 1100000,
      'Cloud Migration': 880000,
      'Security Modernization': 425000,
      'Data Analytics': 550000,
      'Mobile Apps': 245000
    }
  }
];

/**
 * Stakeholder Communications & Executive Updates
 * High-level program status communications
 */
export const programManagerStakeholderData = [
  {
    id: 'COMM-EXEC-001',
    type: 'executive-review',
    date: '2025-11-06',
    audience: 'Executive Steering Committee',
    subject: 'Digital Transformation Initiative - Monthly Review',
    status: 'sent',
    keyMessages: [
      'API Gateway launch delayed 1 week due to vendor integration issues',
      'Customer Portal on track for December beta launch',
      'Data Lake Phase 1 completed ahead of schedule',
      'Request approval for 5 additional cloud engineers in Q1 2026'
    ],
    decisions: [
      'Approved budget reallocation of $150K from Data Lake to API Gateway',
      'Endorsed plan to hire contractors for cloud engineer gap',
      'Requested detailed risk mitigation plan for API Gateway'
    ],
    actions: [
      { owner: 'Jennifer Chen', action: 'Submit cloud engineer hiring plan by 11/15', dueDate: '2025-11-15' },
      { owner: 'Marcus Johnson', action: 'Provide API Gateway risk mitigation plan', dueDate: '2025-11-13' },
      { owner: 'Sarah Thompson', action: 'Review and approve contractor budget', dueDate: '2025-11-20' }
    ],
    nextMeeting: '2025-12-04'
  },
  {
    id: 'COMM-EXEC-002',
    type: 'risk-escalation',
    date: '2025-11-08',
    audience: 'CTO, VP Infrastructure, CFO',
    subject: 'URGENT: Cloud Migration Budget Overrun',
    status: 'sent',
    keyMessages: [
      'Cloud migration 85% complete but budget overrun by $380K (14%)',
      'Root cause: Unexpected data transfer costs and extended consultant time',
      'Production cutover at risk without additional funding',
      'Proposed mitigation: Reallocate funds from Mobile program (under budget)'
    ],
    decisions: [
      'CFO approved emergency budget transfer of $400K from Mobile to Cloud',
      'Required weekly status updates until production cutover complete',
      'Post-project review required to improve cost estimation'
    ],
    actions: [
      { owner: 'Jennifer Chen', action: 'Submit revised cloud budget with contingency', dueDate: '2025-11-11' },
      { owner: 'Michael Chen', action: 'Provide detailed cost breakdown and lessons learned', dueDate: '2025-11-15' },
      { owner: 'Amanda Rodriguez', action: 'Revise Mobile program timeline after budget reduction', dueDate: '2025-11-18' }
    ],
    nextMeeting: '2025-11-15'
  },
  {
    id: 'COMM-TOWN-001',
    type: 'town-hall',
    date: '2025-10-25',
    audience: 'All Program Teams (121 attendees)',
    subject: 'Q3 2025 Program Portfolio Review',
    status: 'complete',
    keyMessages: [
      'Portfolio delivered 28 milestones in Q3, 93% on-time',
      'Digital Transformation and Data Analytics programs exceeding expectations',
      'Cloud Migration entering critical cutover phase',
      'Q4 focus: Production launches and quality assurance'
    ],
    decisions: [
      'Announced new Security Modernization executive sponsor',
      'Introduced cross-program dependency tracking process',
      'Launched program management excellence awards'
    ],
    actions: [
      { owner: 'All PMs', action: 'Submit Q4 risk registers by 11/01', dueDate: '2025-11-01' },
      { owner: 'Jennifer Chen', action: 'Schedule 1:1s with all project managers', dueDate: '2025-11-10' }
    ],
    nextMeeting: '2026-01-24'
  },
  {
    id: 'COMM-BUS-001',
    type: 'business-review',
    date: '2025-11-05',
    audience: 'Business Unit Leaders',
    subject: 'Data Analytics Platform - Q4 Business Readiness',
    status: 'sent',
    keyMessages: [
      'Data Warehouse launching December 20 with 15 executive dashboards',
      'Required: Business unit data stewards identified by 11/15',
      'Training sessions scheduled for weeks of 12/02 and 12/09',
      'Initial focus: Finance, Sales, and Operations use cases'
    ],
    decisions: [
      'Business units committed to providing data stewards',
      'Agreed to phased rollout starting with executives',
      'Requested additional self-service BI training for analysts'
    ],
    actions: [
      { owner: 'Business Units', action: 'Nominate data stewards', dueDate: '2025-11-15' },
      { owner: 'Lisa Chen', action: 'Schedule data steward onboarding', dueDate: '2025-11-18' },
      { owner: 'Sarah Johnson', action: 'Create self-service BI training curriculum', dueDate: '2025-11-25' }
    ],
    nextMeeting: '2025-12-03'
  },
  {
    id: 'COMM-VENDOR-001',
    type: 'vendor-review',
    date: '2025-11-09',
    audience: 'AWS Account Team',
    subject: 'Cloud Migration Performance & Cost Review',
    status: 'scheduled',
    keyMessages: [
      'Review current AWS spend vs forecast ($2.8M actual vs $2.4M planned)',
      'Discuss cost optimization opportunities post-migration',
      'Address data transfer cost overruns',
      'Plan reserved instance strategy for 2026'
    ],
    decisions: [],
    actions: [
      { owner: 'Jennifer Chen', action: 'Prepare cost analysis presentation', dueDate: '2025-11-09' },
      { owner: 'Thomas Anderson', action: 'Document cost optimization recommendations', dueDate: '2025-11-09' }
    ],
    nextMeeting: '2025-11-09'
  }
];

/**
 * Program Risk Register
 * Strategic risks across portfolio
 */
export const programManagerRiskData = [
  {
    id: 'RISK-PROG-001',
    programId: 'INIT-2024-CLOUD',
    category: 'budget',
    title: 'Cloud Migration Budget Overrun',
    description: 'Program spending tracking 14% over budget due to unexpected data transfer costs and extended consultant engagements',
    probability: 'certain',
    impact: 'high',
    riskScore: 20,
    status: 'open',
    owner: 'Jennifer Chen',
    identifiedDate: '2025-10-22',
    mitigationStrategy: 'Reallocate $400K from Mobile program to Cloud Migration. Implement weekly cost reviews. Negotiate data transfer discounts with AWS.',
    mitigationStatus: 'in-progress',
    lastReview: '2025-11-08',
    contingencyPlan: 'If budget transfer insufficient, delay legacy datacenter decommission to Q1 2026 to spread costs'
  },
  {
    id: 'RISK-PROG-002',
    programId: 'INIT-2024-CLOUD',
    category: 'timeline',
    title: 'Production Database Cutover Complexity',
    description: 'Database migration experiencing replication lag issues. Cutover window may need extension from 4 hours to 8 hours.',
    probability: 'likely',
    impact: 'critical',
    riskScore: 16,
    status: 'open',
    owner: 'Thomas Anderson',
    identifiedDate: '2025-11-10',
    mitigationStrategy: 'Increase replication capacity. Schedule extended maintenance window. Prepare rollback procedures. Deploy additional monitoring.',
    mitigationStatus: 'in-progress',
    lastReview: '2025-11-11',
    contingencyPlan: 'If cutover fails, rollback to on-premise within 2 hours. Reschedule cutover for 12/15 with lessons learned applied'
  },
  {
    id: 'RISK-PROG-003',
    programId: 'INIT-2025-DT',
    category: 'resource',
    title: 'Cloud Engineer Shortage',
    description: 'Need 5 additional cloud engineers for Q1 2026 but market is competitive. Risk of project delays if hiring unsuccessful.',
    probability: 'likely',
    impact: 'medium',
    riskScore: 12,
    status: 'open',
    owner: 'Jennifer Chen',
    identifiedDate: '2025-10-28',
    mitigationStrategy: 'Engage 3 recruiting firms. Offer competitive comp packages. Consider contractors as bridge. Upskill existing engineers.',
    mitigationStatus: 'planned',
    lastReview: '2025-11-06',
    contingencyPlan: 'Use contract engineers for 6 months while continuing permanent hiring. Descope non-critical features if needed.'
  },
  {
    id: 'RISK-PROG-004',
    programId: 'INIT-2025-DT',
    category: 'technical',
    title: 'API Gateway Vendor Integration Issues',
    description: 'Third-party vendor API not compatible with our gateway. May delay launch by 2-3 weeks while vendor provides fix.',
    probability: 'likely',
    impact: 'high',
    riskScore: 15,
    status: 'open',
    owner: 'Marcus Johnson',
    identifiedDate: '2025-11-03',
    mitigationStrategy: 'Work with vendor on emergency patch. Build adapter layer as workaround. Consider alternative vendors for future integrations.',
    mitigationStatus: 'in-progress',
    lastReview: '2025-11-09',
    contingencyPlan: 'Launch gateway without this vendor integration. Add integration in Phase 2 after vendor fixes issue.'
  },
  {
    id: 'RISK-PROG-005',
    programId: 'INIT-2025-DATA',
    category: 'resource',
    title: 'BI Analyst Capacity Constraint',
    description: 'Business unit demand for BI dashboards exceeding team capacity by 40%. Risk of stakeholder dissatisfaction.',
    probability: 'likely',
    impact: 'medium',
    riskScore: 12,
    status: 'open',
    owner: 'Sarah Johnson',
    identifiedDate: '2025-11-01',
    mitigationStrategy: 'Prioritize executive and high-impact dashboards. Train business users on self-service BI. Hire 3 additional BI analysts.',
    mitigationStatus: 'in-progress',
    lastReview: '2025-11-06',
    contingencyPlan: 'Engage BI consulting firm for 3-month surge support. Push lower priority dashboards to Q2 2026.'
  },
  {
    id: 'RISK-PROG-006',
    programId: 'INIT-2025-SEC',
    category: 'compliance',
    title: 'Security Clearance Delays',
    description: 'Waiting for security clearances for 2 contractors. Background check process taking 6-8 weeks instead of expected 2-4 weeks.',
    probability: 'likely',
    impact: 'low',
    riskScore: 6,
    status: 'open',
    owner: 'Maria Rodriguez',
    identifiedDate: '2025-10-15',
    mitigationStrategy: 'Expedite clearance process through HR. Assign cleared staff to critical path tasks. Build clearance wait time into schedules.',
    mitigationStatus: 'in-progress',
    lastReview: '2025-11-05',
    contingencyPlan: 'Use cleared staff only. Delay non-critical tasks requiring contractor support by 4 weeks.'
  },
  {
    id: 'RISK-PROG-007',
    programId: 'INIT-2025-MOBILE',
    category: 'dependency',
    title: 'Mobile Backend Dependent on API Gateway',
    description: 'Mobile app backend development blocked until API Gateway completes. API Gateway delays cascade to mobile schedule.',
    probability: 'possible',
    impact: 'medium',
    riskScore: 9,
    status: 'open',
    owner: 'David Lee',
    identifiedDate: '2025-11-07',
    mitigationStrategy: 'Build mobile APIs against mock API Gateway. Plan parallel development tracks. Buffer 3 weeks in mobile schedule.',
    mitigationStatus: 'planned',
    lastReview: '2025-11-09',
    contingencyPlan: 'If API Gateway delays >4 weeks, build mobile-specific backend APIs independent of gateway.'
  },
  {
    id: 'RISK-PROG-008',
    programId: 'PORTFOLIO',
    category: 'budget',
    title: 'Portfolio Budget Exhaustion',
    description: 'Only $550K remaining in Q4 budget with 7 weeks left. Risk of insufficient funds for unplanned issues.',
    probability: 'possible',
    impact: 'high',
    riskScore: 12,
    status: 'open',
    owner: 'Jennifer Chen',
    identifiedDate: '2025-11-09',
    mitigationStrategy: 'Freeze all non-essential spending. Require executive approval for expenses >$25K. Reserve $250K for emergencies.',
    mitigationStatus: 'in-progress',
    lastReview: '2025-11-09',
    contingencyPlan: 'Request emergency budget increase from CFO. Delay discretionary projects to Q1 2026.'
  },
  {
    id: 'RISK-PROG-009',
    programId: 'INIT-2025-DT',
    category: 'stakeholder',
    title: 'Customer Portal User Acceptance Risk',
    description: 'Beta launch to 500 customers without full UAT. Risk of negative feedback impacting brand.',
    probability: 'possible',
    impact: 'medium',
    riskScore: 9,
    status: 'open',
    owner: 'Rachel Kim',
    identifiedDate: '2025-11-05',
    mitigationStrategy: 'Conduct internal UAT with 50 employees. Create customer support playbook. Monitor feedback closely during beta.',
    mitigationStatus: 'planned',
    lastReview: '2025-11-07',
    contingencyPlan: 'If critical issues found in beta, pull portal from beta users and fix before wider launch.'
  },
  {
    id: 'RISK-PROG-010',
    programId: 'INIT-2025-DATA',
    category: 'technical',
    title: 'Data Quality Issues in Legacy Sources',
    description: 'Discovering significant data quality issues in legacy systems during ETL development. May delay warehouse launch.',
    probability: 'likely',
    impact: 'medium',
    riskScore: 12,
    status: 'open',
    owner: 'James Kim',
    identifiedDate: '2025-10-18',
    mitigationStrategy: 'Implement data quality rules in ETL. Work with business to define data remediation priorities. Accept known quality issues with documentation.',
    mitigationStatus: 'in-progress',
    lastReview: '2025-11-08',
    contingencyPlan: 'Launch warehouse with quality warnings on affected data. Run data remediation project in Q1 2026.'
  }
];
