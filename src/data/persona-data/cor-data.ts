// =============================================================================
// COR (Contracting Officer's Representative) - Alexa Johnson
// Unique, realistic data for government contract oversight role
// =============================================================================

import type { ContractPerformanceData } from '@/types/widget';

/**
 * COR PRIMARY CONTRACT: Enterprise IT Infrastructure Modernization
 * Unique characteristics:
 * - Large-scale government contract ($2.5M)
 * - Focus on infrastructure and security
 * - Multiple deliverables with compliance tracking
 * - Vendor: TechCorp Solutions Inc.
 */
export const corContractPerformanceData: ContractPerformanceData = {
  title: 'Contract Performance Dashboard',
  contractId: 'CON-2025-042',
  contractName: 'Enterprise IT Infrastructure Modernization',
  vendor: {
    id: 'VEN-TC-001',
    name: 'TechCorp Solutions Inc.',
    tier: 'prime',
  },
  performance: {
    slaCompliance: 87,
    budgetUtilization: 76,
    deliverableCompletion: 92,
    overallScore: 87,
  },
  financials: {
    totalValue: 2500000,
    spent: 1900000,
    committed: 425000,
    remaining: 175000,
  },
  deliverables: [
    {
      id: 'DEL-042-001',
      name: 'Network Security Upgrade - Phase 2',
      dueDate: new Date('2025-11-30'),
      status: 'submitted',
      qualityScore: 94,
    },
    {
      id: 'DEL-042-002',
      name: 'Data Center Migration Plan',
      dueDate: new Date('2025-12-15'),
      status: 'pending',
      qualityScore: 0,
    },
    {
      id: 'DEL-042-003',
      name: 'Quarterly Security Audit Report Q4',
      dueDate: new Date('2025-12-31'),
      status: 'pending',
      qualityScore: 0,
    },
    {
      id: 'DEL-042-004',
      name: 'Disaster Recovery Runbook',
      dueDate: new Date('2025-11-20'),
      status: 'approved',
      qualityScore: 98,
    },
  ],
  issues: [
    {
      severity: 'high',
      description: 'Hardware delivery delayed by 3 weeks due to supply chain issues',
      dueDate: new Date('2025-11-25'),
      assignedTo: 'David Chen (TechCorp PM)',
    },
    {
      severity: 'medium',
      description: 'Security clearance pending for 2 new vendor personnel',
      dueDate: new Date('2025-11-18'),
      assignedTo: 'Security Office',
    },
  ],
  recommendations: [
    {
      priority: 'high',
      action: 'Schedule contract modification meeting',
      reason: 'Hardware delays require timeline adjustment and potential cost modification',
    },
    {
      priority: 'medium',
      action: 'Review disaster recovery test schedule',
      reason: 'DR runbook approved - coordinate with IT team for testing',
    },
    {
      priority: 'low',
      action: 'Request vendor performance improvement plan',
      reason: 'SLA compliance at 87% - below contractual requirement of 90%',
    },
  ],
};

/**
 * COR VENDOR COMPLIANCE TRACKING
 * Multiple vendors with varying performance levels
 */
export const corVendorComplianceData = {
  title: 'Vendor Compliance Overview',
  reportingPeriod: 'Q4 2025',

  // Primary vendor details for dashboard
  vendor: {
    name: 'TechCorp Solutions Inc.',
    tier: 'prime',
    contractValue: 2500000,
  },

  // Compliance scores
  compliance: {
    overallScore: 87,
    slaCompliance: 87,
    securityCompliance: 92,
    reportingCompliance: 89,
    qualityCompliance: 91,
  },

  // Compliance trend data (last 6 months)
  trends: [
    { month: 'Jun 2025', score: 85 },
    { month: 'Jul 2025', score: 82 },
    { month: 'Aug 2025', score: 88 },
    { month: 'Sep 2025', score: 87 },
    { month: 'Oct 2025', score: 89 },
    { month: 'Nov 2025', score: 87 },
  ],

  // Violations requiring attention
  violations: [
    {
      type: 'Service Level Breach',
      severity: 'medium' as const,
      description: 'Response time exceeded 4-hour service level requirement on 3 incidents',
      date: '2025-11-08',
      status: 'open' as const,
      remediationDue: '2025-11-20',
    },
    {
      type: 'Security',
      severity: 'high' as const,
      description: 'Missing security patch on development servers',
      date: '2025-10-28',
      status: 'remediated' as const,
    },
  ],

  // Recommendations for improvement
  recommendations: [
    'Schedule monthly compliance review meetings',
    'Implement automated service level monitoring dashboard',
    'Update security patch management procedures',
  ],

  vendors: [
    {
      id: 'VEN-TC-001',
      name: 'TechCorp Solutions Inc.',
      activeContracts: 2,
      totalContractValue: 3200000,
      performanceScore: 87,
      slaCompliance: 87,
      deliverableOnTimeRate: 92,
      qualityScore: 91,
      riskLevel: 'medium' as const,
      lastAuditDate: '2025-10-15',
      nextAuditDate: '2026-01-15',
      certifications: ['ISO 27001', 'FedRAMP Moderate', 'CMMI Level 3'],
      keyContact: {
        name: 'David Chen',
        title: 'Program Manager',
        email: 'david.chen@techcorpsolutions.com',
        phone: '(202) 555-0142',
      },
    },
    {
      id: 'VEN-CS-002',
      name: 'CloudSecure Systems LLC',
      activeContracts: 1,
      totalContractValue: 850000,
      performanceScore: 95,
      slaCompliance: 98,
      deliverableOnTimeRate: 97,
      qualityScore: 96,
      riskLevel: 'low' as const,
      lastAuditDate: '2025-11-01',
      nextAuditDate: '2026-02-01',
      certifications: ['ISO 27001', 'SOC 2 Type II', 'NIST 800-171'],
      keyContact: {
        name: 'Sarah Martinez',
        title: 'Client Success Director',
        email: 'sarah.martinez@cloudsecure.com',
        phone: '(202) 555-0198',
      },
    },
    {
      id: 'VEN-NS-003',
      name: 'NetSolutions Corp',
      activeContracts: 1,
      totalContractValue: 620000,
      performanceScore: 72,
      slaCompliance: 75,
      deliverableOnTimeRate: 78,
      qualityScore: 73,
      riskLevel: 'high' as const,
      lastAuditDate: '2025-09-20',
      nextAuditDate: '2025-12-20',
      certifications: ['ISO 9001', 'ITIL Foundation'],
      keyContact: {
        name: 'James Wilson',
        title: 'Operations Manager',
        email: 'james.wilson@netsolutions.com',
        phone: '(202) 555-0223',
      },
    },
  ],
  summary: {
    totalActiveVendors: 3,
    totalContractValue: 4670000,
    averagePerformanceScore: 85,
    vendorsAtRisk: 1,
    upcomingAudits: 2,
  },
};

/**
 * COR DELIVERABLE REVIEW QUEUE
 * Pending deliverables requiring COR approval
 */
export const corDeliverableReviewList = {
  title: 'Deliverables Pending Review',
  filters: ['All', 'Overdue', 'Due This Week', 'High Priority'],
  activeFilter: 'All',
  deliverables: [
    {
      id: 'DEL-042-002',
      title: 'Data Center Migration Plan',
      contractId: 'CON-2025-042',
      contractName: 'Enterprise IT Infrastructure Modernization',
      vendor: 'TechCorp Solutions Inc.',
      submittedDate: '2025-11-10',
      dueDate: '2025-12-15',
      status: 'pending-review' as const,
      priority: 'high' as const,
      qualityScore: null,
      reviewer: 'Alexa Johnson',
      daysUntilDue: 32,
      pageCount: 87,
      attachments: 12,
    },
    {
      id: 'DEL-042-003',
      title: 'Quarterly Security Audit Report Q4',
      contractId: 'CON-2025-042',
      contractName: 'Enterprise IT Infrastructure Modernization',
      vendor: 'TechCorp Solutions Inc.',
      submittedDate: null,
      dueDate: '2025-12-31',
      status: 'pending' as const,
      priority: 'critical' as const,
      qualityScore: null,
      reviewer: 'Alexa Johnson',
      daysUntilDue: 48,
      pageCount: null,
      attachments: 0,
    },
    {
      id: 'DEL-037-008',
      title: 'Monthly Service Report - November 2025',
      contractId: 'CON-2024-037',
      contractName: 'Cloud Infrastructure Services',
      vendor: 'CloudSecure Systems LLC',
      submittedDate: '2025-11-05',
      dueDate: '2025-11-15',
      status: 'pending-review' as const,
      priority: 'medium' as const,
      qualityScore: null,
      reviewer: 'Alexa Johnson',
      daysUntilDue: 2,
      pageCount: 24,
      attachments: 8,
    },
    {
      id: 'DEL-019-014',
      title: 'Network Performance Improvement Plan',
      contractId: 'CON-2023-019',
      contractName: 'Network Maintenance & Support',
      vendor: 'NetSolutions Corp',
      submittedDate: '2025-11-01',
      dueDate: '2025-11-10',
      status: 'overdue' as const,
      priority: 'critical' as const,
      qualityScore: null,
      reviewer: 'Alexa Johnson',
      daysUntilDue: -3,
      pageCount: 42,
      attachments: 6,
    },
  ],
  stats: {
    total: 8,
    pendingReview: 3,
    overdue: 1,
    dueThisWeek: 1,
    averageReviewTime: 4.2, // days
  },
};

/**
 * COR BUDGET TRACKING
 * Financial oversight across all contracts
 */
export const corBudgetTrackingData = {
  title: 'COR Budget Overview',
  fiscalYear: 'FY 2025',
  totalAuthorizedBudget: 5200000,
  totalCommitted: 4670000,
  totalSpent: 2850000,
  remainingBudget: 2350000,
  utilizationRate: 55, // percentage
  contracts: [
    {
      contractId: 'CON-2025-042',
      name: 'Enterprise IT Infrastructure Modernization',
      authorized: 2500000,
      spent: 1900000,
      committed: 425000,
      remaining: 175000,
      status: 'on-track' as const,
    },
    {
      contractId: 'CON-2024-037',
      name: 'Cloud Infrastructure Services',
      authorized: 850000,
      spent: 520000,
      committed: 180000,
      remaining: 150000,
      status: 'on-track' as const,
    },
    {
      contractId: 'CON-2023-019',
      name: 'Network Maintenance & Support',
      authorized: 620000,
      spent: 430000,
      committed: 165000,
      remaining: 25000,
      status: 'at-risk' as const,
    },
  ],
  monthlyBurnRate: 237500,
  projectedYearEndSpend: 4900000,
  variance: -300000, // Under budget
};

/**
 * COR SERVICE LEVEL COMPLIANCE TRACKING
 * Service Level Agreement monitoring
 */
export const corSLAComplianceData = {
  title: 'Service Level Compliance Dashboard',
  reportingPeriod: 'November 2025',
  overallCompliance: 87,
  target: 90,
  contracts: [
    {
      contractId: 'CON-2025-042',
      vendor: 'TechCorp Solutions Inc.',
      slaCompliance: 87,
      metrics: [
        {
          metric: 'Response Time',
          target: '4 hours',
          actual: '4.2 hours',
          compliance: 85,
          status: 'warning' as const,
        },
        {
          metric: 'Resolution Time',
          target: '24 hours',
          actual: '22 hours',
          compliance: 92,
          status: 'success' as const,
        },
        {
          metric: 'Availability',
          target: '99.9%',
          actual: '99.7%',
          compliance: 99.7,
          status: 'warning' as const,
        },
        {
          metric: 'Security Patching',
          target: '7 days',
          actual: '5 days',
          compliance: 100,
          status: 'success' as const,
        },
      ],
      breaches: 3,
      credits: 12500, // SLA penalty credits
    },
    {
      contractId: 'CON-2024-037',
      vendor: 'CloudSecure Systems LLC',
      slaCompliance: 98,
      metrics: [
        {
          metric: 'Response Time',
          target: '2 hours',
          actual: '1.5 hours',
          compliance: 100,
          status: 'success' as const,
        },
        {
          metric: 'Uptime',
          target: '99.95%',
          actual: '99.98%',
          compliance: 100,
          status: 'success' as const,
        },
        {
          metric: 'Backup Success Rate',
          target: '100%',
          actual: '99.8%',
          compliance: 99.8,
          status: 'success' as const,
        },
      ],
      breaches: 0,
      credits: 0,
    },
    {
      contractId: 'CON-2023-019',
      vendor: 'NetSolutions Corp',
      slaCompliance: 75,
      metrics: [
        {
          metric: 'Response Time',
          target: '4 hours',
          actual: '6.5 hours',
          compliance: 62,
          status: 'critical' as const,
        },
        {
          metric: 'Resolution Time',
          target: '48 hours',
          actual: '52 hours',
          compliance: 75,
          status: 'warning' as const,
        },
        {
          metric: 'Change Success Rate',
          target: '95%',
          actual: '89%',
          compliance: 89,
          status: 'warning' as const,
        },
      ],
      breaches: 8,
      credits: 31000,
    },
  ],
};

// Export all COR data as a bundle
export const corPersonaData = {
  contractPerformance: corContractPerformanceData,
  vendorCompliance: corVendorComplianceData,
  deliverableReview: corDeliverableReviewList,
  budgetTracking: corBudgetTrackingData,
  slaCompliance: corSLAComplianceData,
};

export default corPersonaData;
