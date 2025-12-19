/**
 * Stakeholder Lead Persona Data - Patricia Kim
 *
 * Role: Requirements management, change control, user feedback, impact analysis
 * Context: Managing stakeholder expectations across 30+ business units
 * Focus: Requirements traceability, change impact, user adoption, communication
 */


/**
 * Impact Analysis Dashboard
 * Analyzing impact of changes across user groups
 */
export const stakeholderImpactData = [
  {
    id: 'IMP-2025-PORTAL',
    initiative: 'Customer Portal Launch',
    description: 'New self-service portal for external customers to manage accounts and submit requests',
    affectedGroups: [
      { name: 'External Customers', userCount: 2800, department: 'External' },
      { name: 'Customer Service Reps', userCount: 45, department: 'Support' },
      { name: 'Account Managers', userCount: 28, department: 'Sales' }
    ],
    impactLevel: 'high',
    impactScore: 8.5,
    readinessScore: 7.2,
    launchDate: '2025-12-15',
    trainingRequired: true,
    changeManagementPlan: 'CLM-PORTAL-001',
    risks: [
      'Customers may resist new self-service model',
      'Support team needs training on portal features',
      'Account managers concerned about reduced customer touchpoints'
    ],
    mitigations: [
      'Phased rollout starting with 500 pilot customers',
      '3-week support team training program',
      'Weekly adoption metrics review with sales leadership'
    ],
    status: 'in-progress'
  },
  {
    id: 'IMP-2025-SSO',
    initiative: 'Single Sign-On Implementation',
    description: 'Replace individual application logins with enterprise SSO using Okta',
    affectedGroups: [
      { name: 'All Employees', userCount: 1250, department: 'Enterprise' },
      { name: 'IT Support', userCount: 22, department: 'IT' },
      { name: 'External Partners', userCount: 340, department: 'External' }
    ],
    impactLevel: 'high',
    impactScore: 9.0,
    readinessScore: 8.5,
    launchDate: '2025-12-10',
    trainingRequired: true,
    changeManagementPlan: 'CLM-SSO-001',
    risks: [
      'Password reset process disruption during cutover',
      'Partners may need new authentication credentials',
      'Legacy applications may have integration issues'
    ],
    mitigations: [
      'IT helpdesk staffed 24/7 during cutover weekend',
      'Partner communication plan with 4-week notice',
      'Fallback authentication for legacy apps'
    ],
    status: 'in-progress'
  },
  {
    id: 'IMP-2025-WAREHOUSE',
    initiative: 'Data Warehouse Launch',
    description: 'New enterprise data warehouse replacing legacy reporting systems',
    affectedGroups: [
      { name: 'Executive Leadership', userCount: 18, department: 'Executive' },
      { name: 'Finance Analysts', userCount: 32, department: 'Finance' },
      { name: 'Sales Operations', userCount: 48, department: 'Sales' },
      { name: 'HR Analytics', userCount: 12, department: 'HR' }
    ],
    impactLevel: 'medium',
    impactScore: 7.0,
    readinessScore: 6.8,
    launchDate: '2025-12-20',
    trainingRequired: true,
    changeManagementPlan: 'CLM-DWH-001',
    risks: [
      'Business users accustomed to Excel-based reporting',
      'Data definitions may differ from legacy systems',
      'Learning curve for Power BI tool'
    ],
    mitigations: [
      'Self-service BI training for all analyst groups',
      'Data dictionary published with mapping to legacy systems',
      'Power BI office hours every Tuesday and Thursday'
    ],
    status: 'planning'
  },
  {
    id: 'IMP-2025-MOBILE',
    initiative: 'Mobile App Rollout',
    description: 'Customer-facing mobile applications for iOS and Android',
    affectedGroups: [
      { name: 'Mobile-First Customers', userCount: 1800, department: 'External' },
      { name: 'Field Sales', userCount: 68, department: 'Sales' },
      { name: 'Mobile Support Team', userCount: 15, department: 'Support' }
    ],
    impactLevel: 'medium',
    impactScore: 6.5,
    readinessScore: 4.2,
    launchDate: '2026-03-15',
    trainingRequired: true,
    changeManagementPlan: 'CLM-MOBILE-001',
    risks: [
      'Low early adoption if web portal sufficient',
      'Support team unfamiliar with mobile troubleshooting',
      'App store review delays'
    ],
    mitigations: [
      'Beta program with 200 power users',
      'Mobile support training starting February 2026',
      'App store submission 6 weeks before launch'
    ],
    status: 'planning'
  },
  {
    id: 'IMP-2025-WORKFLOW',
    initiative: 'Automated Approval Workflows',
    description: 'Replace email-based approvals with automated workflow system',
    affectedGroups: [
      { name: 'Approvers (Managers)', userCount: 180, department: 'All' },
      { name: 'Request Submitters', userCount: 950, department: 'All' },
      { name: 'Finance Controllers', userCount: 24, department: 'Finance' }
    ],
    impactLevel: 'medium',
    impactScore: 7.5,
    readinessScore: 7.8,
    launchDate: '2026-01-10',
    trainingRequired: true,
    changeManagementPlan: 'CLM-WORKFLOW-001',
    risks: [
      'Managers may miss workflow notifications',
      'Approval delegation process unclear',
      'Finance concerned about audit trail'
    ],
    mitigations: [
      'Email and Slack notifications for pending approvals',
      'Manager training on delegation workflows',
      'Audit log demonstration for finance team'
    ],
    status: 'planning'
  },
  {
    id: 'IMP-2025-API',
    initiative: 'API Gateway Implementation',
    description: 'Centralized API gateway for all internal and partner integrations',
    affectedGroups: [
      { name: 'Internal Developers', userCount: 85, department: 'Engineering' },
      { name: 'Integration Partners', userCount: 22, department: 'External' },
      { name: 'API Support Team', userCount: 8, department: 'IT' }
    ],
    impactLevel: 'high',
    impactScore: 8.0,
    readinessScore: 6.5,
    launchDate: '2025-11-30',
    trainingRequired: true,
    changeManagementPlan: 'CLM-API-001',
    risks: [
      'Partners need to update API endpoints',
      'Developers unfamiliar with new authentication',
      'Potential service disruption during cutover'
    ],
    mitigations: [
      'Partner communication 8 weeks before launch',
      'Developer workshops on API gateway usage',
      'Gradual traffic migration over 2 weeks'
    ],
    status: 'in-progress'
  },
  {
    id: 'IMP-2026-ERP',
    initiative: 'ERP System Upgrade',
    description: 'Upgrade from ERP v10 to v12 with new procurement module',
    affectedGroups: [
      { name: 'Finance Team', userCount: 68, department: 'Finance' },
      { name: 'Procurement', userCount: 42, department: 'Operations' },
      { name: 'IT Operations', userCount: 18, department: 'IT' }
    ],
    impactLevel: 'critical',
    impactScore: 9.5,
    readinessScore: 3.8,
    launchDate: '2026-07-01',
    trainingRequired: true,
    changeManagementPlan: 'CLM-ERP-001',
    risks: [
      'Major UI changes will impact all finance users',
      'Historical data migration complexity',
      'Integration with 15+ downstream systems'
    ],
    mitigations: [
      '6-month change management program starting January',
      'Phased training by role starting April 2026',
      'Parallel run for 1 month before cutover'
    ],
    status: 'planning'
  },
  {
    id: 'IMP-2025-SECURITY',
    initiative: 'Zero Trust Network Implementation',
    description: 'New network security model requiring device verification',
    affectedGroups: [
      { name: 'All Employees', userCount: 1250, department: 'Enterprise' },
      { name: 'Remote Workers', userCount: 480, department: 'All' },
      { name: 'Contractors', userCount: 125, department: 'External' }
    ],
    impactLevel: 'high',
    impactScore: 8.5,
    readinessScore: 6.0,
    launchDate: '2026-02-15',
    trainingRequired: true,
    changeManagementPlan: 'CLM-ZEROTRUST-001',
    risks: [
      'VPN access changes may confuse remote workers',
      'Contractor device compliance requirements',
      'Potential productivity impact during transition'
    ],
    mitigations: [
      'IT helpdesk surge support for 2 weeks',
      'Remote worker webinars in January 2026',
      'Contractor device pre-validation program'
    ],
    status: 'planning'
  }
];

/**
 * Business Requirements Tracking
 * Requirements with traceability to implementation
 */
export const stakeholderRequirementsData = [
  {
    id: 'REQ-PORTAL-001',
    title: 'Customer Portal - Self-Service Account Management',
    description: 'Customers must be able to view and update account information without contacting support',
    businessValue: 'Reduce support call volume by 40%, improve customer satisfaction',
    priority: 'high',
    source: 'Customer Service VP - Sarah Martinez',
    submittedDate: '2025-08-15',
    status: 'in-development',
    implementationStatus: 75,
    acceptanceCriteria: [
      'View all account details (contact, billing, usage)',
      'Update contact information with email verification',
      'View transaction history for last 24 months',
      'Download statements in PDF format',
      'Update payment methods securely'
    ],
    linkedUserStories: ['US-1245', 'US-1248', 'US-1252', 'US-1260'],
    testingStatus: 'in-progress',
    approver: 'Sarah Martinez',
    approvalDate: '2025-09-02'
  },
  {
    id: 'REQ-PORTAL-002',
    title: 'Customer Portal - Request Submission',
    description: 'Customers must submit service requests with file attachments and track status',
    businessValue: 'Streamline request intake process, reduce processing time from 3 days to 4 hours',
    priority: 'high',
    source: 'Operations Manager - James Chen',
    submittedDate: '2025-08-18',
    status: 'in-development',
    implementationStatus: 68,
    acceptanceCriteria: [
      'Submit request with structured form and free text',
      'Attach up to 5 files (50MB total)',
      'Receive confirmation email with ticket number',
      'Track request status in real-time',
      'Receive notifications on status changes'
    ],
    linkedUserStories: ['US-1265', 'US-1268', 'US-1275'],
    testingStatus: 'planned',
    approver: 'James Chen',
    approvalDate: '2025-09-05'
  },
  {
    id: 'REQ-SSO-001',
    title: 'Single Sign-On - Okta Integration',
    description: 'Replace individual application logins with Okta SSO for all enterprise applications',
    businessValue: 'Improve security, reduce password reset tickets by 70%, enhance user experience',
    priority: 'critical',
    source: 'CISO - Robert Martinez',
    submittedDate: '2025-07-10',
    status: 'in-testing',
    implementationStatus: 92,
    acceptanceCriteria: [
      'Integrate 40 enterprise applications with Okta',
      'Support MFA for all users',
      'Automatic provisioning/deprovisioning',
      'Self-service password reset',
      'Maintain audit logs for 7 years'
    ],
    linkedUserStories: ['US-1105', 'US-1108', 'US-1115', 'US-1122', 'US-1128'],
    testingStatus: 'in-progress',
    approver: 'Robert Martinez',
    approvalDate: '2025-07-28'
  },
  {
    id: 'REQ-DWH-001',
    title: 'Data Warehouse - Executive Dashboards',
    description: 'Provide real-time executive dashboards for key business metrics',
    businessValue: 'Enable data-driven decision making, reduce reporting cycle from 1 week to 1 day',
    priority: 'high',
    source: 'CFO - Linda Thompson',
    submittedDate: '2025-06-20',
    status: 'in-development',
    implementationStatus: 80,
    acceptanceCriteria: [
      'Revenue dashboard with drill-down to product level',
      'Customer acquisition and retention metrics',
      'Operational efficiency KPIs',
      'Financial performance vs budget',
      'Mobile-responsive dashboard design'
    ],
    linkedUserStories: ['US-985', 'US-992', 'US-998', 'US-1005'],
    testingStatus: 'in-progress',
    approver: 'Linda Thompson',
    approvalDate: '2025-07-08'
  },
  {
    id: 'REQ-DWH-002',
    title: 'Data Warehouse - Self-Service BI',
    description: 'Enable business users to create custom reports and dashboards without IT assistance',
    businessValue: 'Reduce IT backlog, empower business analysts, accelerate insights',
    priority: 'medium',
    source: 'Business Intelligence Manager - David Park',
    submittedDate: '2025-06-25',
    status: 'in-development',
    implementationStatus: 55,
    acceptanceCriteria: [
      'Power BI interface for business users',
      'Certified data models with business definitions',
      'Template reports for common use cases',
      'Data refresh schedules configurable by users',
      'Role-based data security'
    ],
    linkedUserStories: ['US-1012', 'US-1018', 'US-1025'],
    testingStatus: 'planned',
    approver: 'David Park',
    approvalDate: '2025-07-15'
  },
  {
    id: 'REQ-WORKFLOW-001',
    title: 'Automated Workflows - Expense Approvals',
    description: 'Automate expense report approval routing based on amount and department',
    businessValue: 'Reduce approval cycle time from 5 days to 2 days, improve compliance',
    priority: 'high',
    source: 'Finance Director - Maria Rodriguez',
    submittedDate: '2025-09-10',
    status: 'requirements-review',
    implementationStatus: 0,
    acceptanceCriteria: [
      'Route expenses to manager if <$500',
      'Route to director if $500-$2000',
      'Route to VP if >$2000',
      'Auto-approve pre-approved expense categories',
      'Escalate if not approved within 48 hours'
    ],
    linkedUserStories: [],
    testingStatus: 'not-started',
    approver: 'Maria Rodriguez',
    approvalDate: null
  },
  {
    id: 'REQ-WORKFLOW-002',
    title: 'Automated Workflows - PTO Requests',
    description: 'Streamline PTO request and approval process with calendar integration',
    businessValue: 'Improve employee experience, reduce HR workload by 15 hours/week',
    priority: 'medium',
    source: 'HR Director - Jennifer Wong',
    submittedDate: '2025-09-12',
    status: 'requirements-review',
    implementationStatus: 0,
    acceptanceCriteria: [
      'Request PTO with calendar preview',
      'Check team calendar for conflicts',
      'Auto-approve if within policy and no conflicts',
      'Sync approved PTO to Outlook/Google Calendar',
      'Track PTO balance automatically'
    ],
    linkedUserStories: [],
    testingStatus: 'not-started',
    approver: 'Jennifer Wong',
    approvalDate: null
  },
  {
    id: 'REQ-MOBILE-001',
    title: 'Mobile App - Core Customer Features',
    description: 'Provide essential customer features on mobile with offline capability',
    businessValue: 'Capture mobile-first customer segment (45% of customers), improve engagement',
    priority: 'high',
    source: 'CMO - Amanda Rodriguez',
    submittedDate: '2025-09-01',
    status: 'approved',
    implementationStatus: 22,
    acceptanceCriteria: [
      'View account balance and recent transactions',
      'Submit service requests with photo attachments',
      'Scan QR codes for quick access',
      'Push notifications for important updates',
      'Offline mode for core features'
    ],
    linkedUserStories: ['US-1405', 'US-1410', 'US-1418'],
    testingStatus: 'not-started',
    approver: 'Amanda Rodriguez',
    approvalDate: '2025-09-18'
  },
  {
    id: 'REQ-MOBILE-002',
    title: 'Mobile App - Field Sales Tools',
    description: 'Enable field sales team to access customer data and update opportunities on mobile',
    businessValue: 'Increase sales productivity by 25%, improve data accuracy',
    priority: 'high',
    source: 'VP Sales - Thomas Lee',
    submittedDate: '2025-09-05',
    status: 'approved',
    implementationStatus: 18,
    acceptanceCriteria: [
      'View customer 360 profile offline',
      'Update opportunity status and notes',
      'Log customer meetings and activities',
      'Sync changes when back online',
      'Voice notes transcription'
    ],
    linkedUserStories: ['US-1425', 'US-1432', 'US-1438'],
    testingStatus: 'not-started',
    approver: 'Thomas Lee',
    approvalDate: '2025-09-20'
  },
  {
    id: 'REQ-API-001',
    title: 'API Gateway - Partner Integration',
    description: 'Provide secure API access for integration partners with rate limiting and monitoring',
    businessValue: 'Enable partner ecosystem, generate $2M in partnership revenue',
    priority: 'critical',
    source: 'VP Partnerships - Michael Kim',
    submittedDate: '2025-07-22',
    status: 'in-testing',
    implementationStatus: 88,
    acceptanceCriteria: [
      'REST APIs for core business entities',
      'OAuth 2.0 authentication',
      'Rate limiting per partner tier',
      'API usage analytics dashboard',
      'Comprehensive API documentation'
    ],
    linkedUserStories: ['US-1185', 'US-1192', 'US-1198', 'US-1205'],
    testingStatus: 'in-progress',
    approver: 'Michael Kim',
    approvalDate: '2025-08-10'
  },
  {
    id: 'REQ-API-002',
    title: 'API Gateway - Internal Microservices',
    description: 'Centralize API management for internal microservices architecture',
    businessValue: 'Reduce service-to-service latency by 40%, improve observability',
    priority: 'high',
    source: 'Engineering Director - Sarah Chen',
    submittedDate: '2025-07-25',
    status: 'in-testing',
    implementationStatus: 85,
    acceptanceCriteria: [
      'Service discovery and routing',
      'Circuit breaker for fault tolerance',
      'Distributed tracing',
      'Centralized logging',
      'API versioning support'
    ],
    linkedUserStories: ['US-1212', 'US-1218', 'US-1225', 'US-1232'],
    testingStatus: 'in-progress',
    approver: 'Sarah Chen',
    approvalDate: '2025-08-12'
  },
  {
    id: 'REQ-SECURITY-001',
    title: 'Zero Trust - Device Verification',
    description: 'Verify device security posture before granting network access',
    businessValue: 'Prevent unauthorized device access, meet cyber insurance requirements',
    priority: 'critical',
    source: 'CISO - Robert Martinez',
    submittedDate: '2025-08-30',
    status: 'approved',
    implementationStatus: 35,
    acceptanceCriteria: [
      'Verify OS patch level and antivirus status',
      'Require disk encryption for all devices',
      'Continuous device health monitoring',
      'Auto-quarantine non-compliant devices',
      'Self-service remediation portal'
    ],
    linkedUserStories: ['US-1310', 'US-1315', 'US-1322'],
    testingStatus: 'planned',
    approver: 'Robert Martinez',
    approvalDate: '2025-09-15'
  },
  {
    id: 'REQ-SECURITY-002',
    title: 'Zero Trust - Network Segmentation',
    description: 'Implement microsegmentation to isolate sensitive systems',
    businessValue: 'Contain breaches, protect customer data, comply with regulations',
    priority: 'critical',
    source: 'CISO - Robert Martinez',
    submittedDate: '2025-09-02',
    status: 'approved',
    implementationStatus: 28,
    acceptanceCriteria: [
      'Segment production, staging, and dev environments',
      'Isolate PCI and PII data systems',
      'Least-privilege network access policies',
      'Monitor east-west traffic patterns',
      'Automated policy enforcement'
    ],
    linkedUserStories: ['US-1328', 'US-1335', 'US-1342'],
    testingStatus: 'planned',
    approver: 'Robert Martinez',
    approvalDate: '2025-09-18'
  },
  {
    id: 'REQ-ERP-001',
    title: 'ERP Upgrade - New Procurement Module',
    description: 'Implement new procurement module with supplier management and purchase order workflows',
    businessValue: 'Reduce procurement cycle time by 50%, improve supplier compliance',
    priority: 'high',
    source: 'VP Operations - Kevin Brown',
    submittedDate: '2025-10-01',
    status: 'requirements-review',
    implementationStatus: 0,
    acceptanceCriteria: [
      'Supplier onboarding and qualification workflows',
      'Purchase requisition to PO automation',
      'Three-way matching (PO, receipt, invoice)',
      'Contract management and renewals',
      'Supplier performance scorecards'
    ],
    linkedUserStories: [],
    testingStatus: 'not-started',
    approver: 'Kevin Brown',
    approvalDate: null
  },
  {
    id: 'REQ-ERP-002',
    title: 'ERP Upgrade - Enhanced Financial Reporting',
    description: 'Upgrade financial reporting with multi-currency and consolidation features',
    businessValue: 'Support international expansion, reduce close cycle from 15 to 7 days',
    priority: 'high',
    source: 'CFO - Linda Thompson',
    submittedDate: '2025-10-05',
    status: 'requirements-review',
    implementationStatus: 0,
    acceptanceCriteria: [
      'Multi-currency support with auto exchange rates',
      'Intercompany eliminations automation',
      'Consolidated financial statements',
      'Budget vs actual variance analysis',
      'Drill-down to transaction detail'
    ],
    linkedUserStories: [],
    testingStatus: 'not-started',
    approver: 'Linda Thompson',
    approvalDate: null
  }
];

/**
 * Change Request Tracking
 * Business-driven change requests with impact assessment
 */
export const stakeholderChangeData = [
  {
    id: 'CHG-2025-142',
    title: 'Customer Portal - Add Multi-Language Support',
    description: 'Support Spanish and French languages for customer portal',
    requestor: 'Amanda Rodriguez (CMO)',
    requestDate: '2025-10-28',
    status: 'pending-cab',
    priority: 'medium',
    impactAssessment: {
      effort: 'medium',
      risk: 'low',
      affectedSystems: ['Customer Portal', 'API Gateway', 'Email Templates'],
      estimatedCost: 85000,
      estimatedDuration: '8 weeks'
    },
    businessJustification: '18% of customer base prefers Spanish, 12% prefers French. Expected to increase usage by 25% in these segments.',
    cabReviewDate: '2025-11-15',
    decision: null
  },
  {
    id: 'CHG-2025-143',
    title: 'SSO - Add Biometric Authentication',
    description: 'Support fingerprint and face recognition for mobile SSO',
    requestor: 'Robert Martinez (CISO)',
    requestDate: '2025-10-30',
    status: 'approved',
    priority: 'low',
    impactAssessment: {
      effort: 'small',
      risk: 'low',
      affectedSystems: ['Okta', 'Mobile Apps'],
      estimatedCost: 35000,
      estimatedDuration: '4 weeks'
    },
    businessJustification: 'Improve mobile security without compromising user experience. Industry best practice.',
    cabReviewDate: '2025-11-08',
    decision: 'Approved for Q1 2026 implementation'
  },
  {
    id: 'CHG-2025-144',
    title: 'Data Warehouse - Add Marketing Analytics',
    description: 'Integrate marketing platform data (HubSpot, Google Ads) into warehouse',
    requestor: 'Amanda Rodriguez (CMO)',
    requestDate: '2025-11-02',
    status: 'impact-analysis',
    priority: 'high',
    impactAssessment: {
      effort: 'large',
      risk: 'medium',
      affectedSystems: ['Data Warehouse', 'ETL Pipelines', 'BI Dashboards'],
      estimatedCost: 145000,
      estimatedDuration: '12 weeks'
    },
    businessJustification: 'Enable marketing ROI analysis and attribution modeling. Support $3M marketing budget optimization.',
    cabReviewDate: '2025-11-22',
    decision: null
  },
  {
    id: 'CHG-2025-145',
    title: 'Mobile App - Add AR Product Visualization',
    description: 'Augmented reality feature to visualize products in customer space',
    requestor: 'Thomas Lee (VP Sales)',
    requestDate: '2025-11-04',
    status: 'rejected',
    priority: 'low',
    impactAssessment: {
      effort: 'x-large',
      risk: 'high',
      affectedSystems: ['Mobile Apps', 'Product Catalog', 'CDN'],
      estimatedCost: 280000,
      estimatedDuration: '20 weeks'
    },
    businessJustification: 'Differentiate from competitors, improve purchase confidence.',
    cabReviewDate: '2025-11-08',
    decision: 'Rejected - ROI unclear, recommend pilot study first'
  },
  {
    id: 'CHG-2025-146',
    title: 'Workflow - Add Slack Integration',
    description: 'Send approval requests via Slack in addition to email',
    requestor: 'Jennifer Wong (HR Director)',
    requestDate: '2025-11-05',
    status: 'approved',
    priority: 'medium',
    impactAssessment: {
      effort: 'small',
      risk: 'low',
      affectedSystems: ['Workflow Engine', 'Slack Workspace'],
      estimatedCost: 28000,
      estimatedDuration: '3 weeks'
    },
    businessJustification: 'Improve approval response time. 85% of employees use Slack daily.',
    cabReviewDate: '2025-11-08',
    decision: 'Approved for Q4 2025 implementation'
  },
  {
    id: 'CHG-2025-147',
    title: 'API Gateway - Add GraphQL Support',
    description: 'Support GraphQL queries in addition to REST APIs',
    requestor: 'Sarah Chen (Engineering Director)',
    requestDate: '2025-11-06',
    status: 'pending-cab',
    priority: 'low',
    impactAssessment: {
      effort: 'large',
      risk: 'medium',
      affectedSystems: ['API Gateway', 'All Microservices'],
      estimatedCost: 165000,
      estimatedDuration: '14 weeks'
    },
    businessJustification: 'Reduce over-fetching, improve mobile app performance by 30%.',
    cabReviewDate: '2025-11-22',
    decision: null
  },
  {
    id: 'CHG-2025-148',
    title: 'ERP - Add Project Accounting Module',
    description: 'Track project costs, time, and billing for professional services',
    requestor: 'Kevin Brown (VP Operations)',
    requestDate: '2025-11-07',
    status: 'impact-analysis',
    priority: 'high',
    impactAssessment: {
      effort: 'x-large',
      risk: 'high',
      affectedSystems: ['ERP', 'Time Tracking', 'Billing', 'CRM'],
      estimatedCost: 420000,
      estimatedDuration: '28 weeks'
    },
    businessJustification: 'Support new professional services business line ($5M revenue target). Enable project profitability analysis.',
    cabReviewDate: '2025-12-06',
    decision: null
  },
  {
    id: 'CHG-2025-149',
    title: 'Customer Portal - Add Live Chat Support',
    description: 'Integrate live chat widget for real-time customer support',
    requestor: 'Sarah Martinez (Customer Service VP)',
    requestDate: '2025-11-08',
    status: 'impact-analysis',
    priority: 'high',
    impactAssessment: {
      effort: 'medium',
      risk: 'low',
      affectedSystems: ['Customer Portal', 'Zendesk'],
      estimatedCost: 62000,
      estimatedDuration: '6 weeks'
    },
    businessJustification: 'Reduce phone support volume by 30%. Improve customer satisfaction scores.',
    cabReviewDate: '2025-11-22',
    decision: null
  },
  {
    id: 'CHG-2025-150',
    title: 'Data Warehouse - Add Predictive Analytics',
    description: 'Implement machine learning models for customer churn prediction',
    requestor: 'Linda Park (CDO)',
    requestDate: '2025-11-09',
    status: 'pending-cab',
    priority: 'medium',
    impactAssessment: {
      effort: 'large',
      risk: 'medium',
      affectedSystems: ['Data Warehouse', 'ML Platform', 'CRM'],
      estimatedCost: 195000,
      estimatedDuration: '16 weeks'
    },
    businessJustification: 'Proactive retention campaign could save $800K annually in customer churn.',
    cabReviewDate: '2025-11-29',
    decision: null
  },
  {
    id: 'CHG-2025-151',
    title: 'Mobile App - Add Offline Mode',
    description: 'Enable core features to work without internet connection',
    requestor: 'Michael Kim (VP Partnerships)',
    requestDate: '2025-11-09',
    status: 'approved',
    priority: 'high',
    impactAssessment: {
      effort: 'large',
      risk: 'medium',
      affectedSystems: ['Mobile Apps', 'Sync Service', 'Database'],
      estimatedCost: 175000,
      estimatedDuration: '12 weeks'
    },
    businessJustification: 'Critical for field sales in areas with poor connectivity. Requested by 60% of mobile users.',
    cabReviewDate: '2025-11-08',
    decision: 'Approved - prioritize for MVP release'
  }
];

/**
 * User Feedback Management
 * Capturing and categorizing user feedback
 */
export const stakeholderFeedbackData = [
  {
    id: 'FEED-2025-Q4-001',
    source: 'NPS Survey',
    date: '2025-10-31',
    category: 'satisfaction',
    sentiment: 'positive',
    score: 8.5,
    responseCount: 485,
    summary: 'Overall satisfaction with customer portal beta: 8.5/10 NPS score',
    topThemes: [
      'Easy to use interface (82% positive mentions)',
      'Fast page load times (75% positive mentions)',
      'Helpful self-service features (68% positive mentions)'
    ],
    painPoints: [
      'Mobile responsiveness needs improvement (42% mentioned)',
      'Search function not finding relevant results (28% mentioned)',
      'Want to upload multiple files at once (22% mentioned)'
    ],
    actionItems: [
      { action: 'Improve mobile responsive design', owner: 'UX Team', priority: 'high' },
      { action: 'Enhance search algorithm', owner: 'Engineering', priority: 'medium' },
      { action: 'Add bulk file upload feature', owner: 'Product', priority: 'medium' }
    ]
  },
  {
    id: 'FEED-2025-Q4-002',
    source: 'User Interview',
    date: '2025-11-04',
    category: 'feature-request',
    sentiment: 'mixed',
    score: 6.5,
    responseCount: 24,
    summary: 'Sales team interviews regarding mobile app requirements',
    topThemes: [
      'Need offline access to customer data (100% of interviewees)',
      'Want quick notes feature during customer meetings (88%)',
      'Voice-to-text for meeting notes highly desired (75%)'
    ],
    painPoints: [
      'Current web app too slow on mobile devices',
      'Difficult to navigate while driving between meetings',
      'Cannot access data in areas with poor connectivity'
    ],
    actionItems: [
      { action: 'Prioritize offline mode for mobile MVP', owner: 'Mobile Team', priority: 'critical' },
      { action: 'Design quick notes UI for one-handed use', owner: 'UX Team', priority: 'high' },
      { action: 'Evaluate voice transcription vendors', owner: 'Product', priority: 'high' }
    ]
  },
  {
    id: 'FEED-2025-Q4-003',
    source: 'Support Tickets',
    date: '2025-11-06',
    category: 'usability',
    sentiment: 'negative',
    score: 4.2,
    responseCount: 156,
    summary: 'Analysis of 156 support tickets related to SSO implementation',
    topThemes: [
      'Users confused by password reset process (68 tickets)',
      'MFA setup instructions unclear (42 tickets)',
      'Forgot which apps require SSO vs local login (38 tickets)'
    ],
    painPoints: [
      'Password reset email not arriving promptly',
      'MFA setup requires too many steps',
      'No clear guidance on which login method to use'
    ],
    actionItems: [
      { action: 'Simplify password reset flow', owner: 'Identity Team', priority: 'high' },
      { action: 'Create MFA setup video tutorial', owner: 'Training', priority: 'high' },
      { action: 'Add login method indicator to each app', owner: 'Engineering', priority: 'medium' }
    ]
  },
  {
    id: 'FEED-2025-Q4-004',
    source: 'Feature Request Portal',
    date: '2025-11-07',
    category: 'feature-request',
    sentiment: 'positive',
    score: null,
    responseCount: 89,
    summary: 'Top 5 feature requests from community portal (last 30 days)',
    topThemes: [
      'Dark mode for all applications (89 votes)',
      'Export data to Excel/CSV (67 votes)',
      'Customizable dashboard widgets (54 votes)',
      'Keyboard shortcuts (48 votes)',
      'Bulk actions (42 votes)'
    ],
    painPoints: [],
    actionItems: [
      { action: 'Design dark mode color palette', owner: 'Design System', priority: 'medium' },
      { action: 'Implement CSV export for key reports', owner: 'Engineering', priority: 'medium' },
      { action: 'Research dashboard customization feasibility', owner: 'Product', priority: 'low' }
    ]
  },
  {
    id: 'FEED-2025-Q4-005',
    source: 'Town Hall Q&A',
    date: '2025-10-25',
    category: 'training',
    sentiment: 'mixed',
    score: 6.8,
    responseCount: 121,
    summary: 'Employee questions from quarterly town hall meeting',
    topThemes: [
      'When will training be available for new systems? (32 questions)',
      'How to access help documentation? (28 questions)',
      'Will there be refresher training sessions? (22 questions)'
    ],
    painPoints: [
      'Training scheduled too close to launch dates',
      'Not enough hands-on practice time',
      'Documentation hard to find'
    ],
    actionItems: [
      { action: 'Schedule training 4 weeks before launches', owner: 'Training', priority: 'high' },
      { action: 'Create dedicated training environment', owner: 'IT', priority: 'high' },
      { action: 'Improve help documentation findability', owner: 'Knowledge Management', priority: 'medium' }
    ]
  }
];

/**
 * Stakeholder Communications Log
 * Record of all stakeholder touchpoints
 */
export const stakeholderCommunicationData = [
  {
    id: 'COMM-2025-142',
    type: 'town-hall',
    date: '2025-10-25',
    audience: 'All Employees',
    attendees: 1180,
    subject: 'Q3 2025 Business Review & Q4 Initiatives Preview',
    keyMessages: [
      'Q3 revenue exceeded targets by 12%',
      'Customer portal launching December 15',
      'SSO rollout December 10 - expect password reset',
      'Data warehouse training starts in November'
    ],
    materialsShared: [
      'Q3 business results presentation',
      'Q4 project roadmap',
      'Training schedule',
      'FAQ document'
    ],
    feedbackReceived: 'Employees excited about new systems. Concerns about training timing. Questions about SSO process.',
    followUpActions: [
      { action: 'Schedule additional training sessions', owner: 'Patricia Kim', dueDate: '2025-11-08' },
      { action: 'Create SSO quick start guide', owner: 'IT Communications', dueDate: '2025-11-15' }
    ]
  },
  {
    id: 'COMM-2025-143',
    type: 'user-group',
    date: '2025-11-01',
    audience: 'Finance Power Users',
    attendees: 28,
    subject: 'Data Warehouse Finance Dashboards Demo',
    keyMessages: [
      'Executive dashboards launching December 20',
      'Self-service BI available Q1 2026',
      'Data refreshes every 4 hours',
      'Finance data stewards needed by November 15'
    ],
    materialsShared: [
      'Dashboard demo recording',
      'Data dictionary',
      'Power BI training schedule',
      'Data steward role description'
    ],
    feedbackReceived: 'Finance team very positive. Requested additional custom dashboards. Want faster data refresh (hourly).',
    followUpActions: [
      { action: 'Evaluate hourly refresh feasibility', owner: 'Data Engineering', dueDate: '2025-11-15' },
      { action: 'Collect custom dashboard requirements', owner: 'Patricia Kim', dueDate: '2025-11-20' }
    ]
  },
  {
    id: 'COMM-2025-144',
    type: 'training-session',
    date: '2025-11-06',
    audience: 'Customer Service Team',
    attendees: 45,
    subject: 'Customer Portal Training - Session 1 of 3',
    keyMessages: [
      'Portal reduces call volume by enabling self-service',
      'Key features: account management, request submission, status tracking',
      'Support team can view customer portal activity in Zendesk',
      'Portal help documentation available in knowledge base'
    ],
    materialsShared: [
      'Portal user guide',
      'Support team playbook',
      'Common customer scenarios',
      'Training environment access'
    ],
    feedbackReceived: 'Team feels prepared. Want to practice more before launch. Questions about edge cases.',
    followUpActions: [
      { action: 'Schedule additional practice sessions', owner: 'Patricia Kim', dueDate: '2025-11-13' },
      { action: 'Document edge case handling procedures', owner: 'Support Manager', dueDate: '2025-11-18' }
    ]
  },
  {
    id: 'COMM-2025-145',
    type: 'email-blast',
    date: '2025-11-08',
    audience: 'All Employees',
    attendees: 1250,
    subject: 'IMPORTANT: Single Sign-On (SSO) Rollout - December 10',
    keyMessages: [
      'SSO goes live December 10 at 6am',
      'You will need to reset your password on first login',
      'Setup multi-factor authentication (MFA) required',
      'IT helpdesk available 24/7 during rollout weekend',
      'Quick start guide and video tutorial attached'
    ],
    materialsShared: [
      'SSO quick start guide (PDF)',
      'MFA setup video (5 min)',
      'FAQs',
      'IT helpdesk contact info'
    ],
    feedbackReceived: '85% email open rate. 62% clicked quick start guide. 15 questions submitted to helpdesk.',
    followUpActions: [
      { action: 'Send reminder email December 5', owner: 'Patricia Kim', dueDate: '2025-12-05' },
      { action: 'Update FAQ with new questions', owner: 'IT Communications', dueDate: '2025-11-12' }
    ]
  },
  {
    id: 'COMM-2025-146',
    type: 'webinar',
    date: '2025-11-09',
    audience: 'Sales Team',
    attendees: 68,
    subject: 'Mobile App Roadmap & Sales Team Requirements',
    keyMessages: [
      'Mobile app MVP launching March 2026',
      'Offline mode prioritized based on feedback',
      'Voice notes and quick logging features included',
      'Beta program starts January - signup link in chat'
    ],
    materialsShared: [
      'Mobile app wireframes',
      'Feature roadmap',
      'Beta program details',
      'Feedback survey'
    ],
    feedbackReceived: 'Sales team enthusiastic. Want earlier beta access. Requested vehicle mount recommendations.',
    followUpActions: [
      { action: 'Expand beta program to 200 users', owner: 'Product', dueDate: '2025-11-15' },
      { action: 'Research vehicle mount options', owner: 'Patricia Kim', dueDate: '2025-11-20' }
    ]
  }
];
