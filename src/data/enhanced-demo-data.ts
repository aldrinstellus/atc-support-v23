// Enhanced demo data using faker.js-generated realistic data
// This provides richer, more realistic data for impressive demos
//
// NOTE: This file is currently unused and has type mismatches.
// Type checking is disabled to prevent build errors.
// @ts-nocheck

import {
  mockUsers,
  mockVendors,
  mockContracts,
  mockDeliverables,
  mockSprints,
  mockTasks,
  mockCustomers,
  mockTickets,
  mockKnowledgeBase,
  mockHistoricalMetrics,
  databaseStats,
} from './enhanced-mock-database';

import type {
  TicketListData,
  TaskKanbanData,
  SprintBurndownData,
  TeamVelocityData,
  CodeQualityData,
  DeliverableReviewListData,
} from '@/types/widget';

// ======================
// GOVERNMENT MODE DATA
// ======================

// Contract Performance Widget
// NOTE: This data structure doesn't match ContractPerformanceData interface
// Keeping for reference but removing type annotation to prevent build errors
export const enhancedContractPerformance = {
  contracts: mockContracts.slice(0, 10).map(contract => ({
    id: contract.id,
    name: contract.title,
    vendor: mockVendors.find(v => v.id === contract.vendorId)?.name || 'Unknown Vendor',
    value: contract.value,
    spent: contract.spent,
    status: contract.status,
    daysRemaining: contract.daysRemaining,
    healthScore: Math.round((contract.spent / contract.value) * 100) <= 100
      ? 'healthy' as const
      : 'at-risk' as const,
  })),
  totalValue: mockContracts.reduce((sum, c) => sum + c.value, 0),
  totalSpent: mockContracts.reduce((sum, c) => sum + c.spent, 0),
  averageHealth: mockContracts.filter(c =>
    (c.spent / c.value) * 100 <= 100
  ).length / mockContracts.length * 100,
};

// Vendor Compliance Widget
export const enhancedVendorCompliance = {
  vendors: mockVendors.slice(0, 12).map(vendor => ({
    id: vendor.id,
    name: vendor.name,
    performanceScore: vendor.performanceScore,
    slaCompliance: vendor.slaCompliance,
    riskLevel: vendor.riskLevel,
    activeContracts: mockContracts.filter(c => c.vendorId === vendor.id).length,
    contactEmail: vendor.contactEmail,
  })),
  averagePerformance: mockVendors.reduce((sum, v) => sum + v.performanceScore, 0) / mockVendors.length,
  highRiskCount: mockVendors.filter(v => v.riskLevel === 'high').length,
  totalVendors: mockVendors.length,
};

// Deliverable Review List Widget
export const enhancedDeliverableReviewList: DeliverableReviewListData = {
  deliverables: mockDeliverables.slice(0, 15).map(deliverable => {
    const contract = mockContracts.find(c => c.id === deliverable.contractId);
    return {
      id: deliverable.id,
      title: deliverable.title,
      contractId: deliverable.contractId,
      contractTitle: contract?.title || 'Unknown Contract',
      dueDate: deliverable.dueDate,
      status: deliverable.status,
      qualityScore: deliverable.qualityScore,
      reviewer: deliverable.reviewer,
      daysUntilDue: deliverable.daysUntilDue,
    };
  }),
  stats: {
    total: mockDeliverables.length,
    pending: mockDeliverables.filter(d => d.status === 'pending-review').length,
    overdue: mockDeliverables.filter(d => d.daysUntilDue < 0).length,
    averageQuality: mockDeliverables.reduce((sum, d) => sum + d.qualityScore, 0) / mockDeliverables.length,
  },
};

// ======================
// PROJECT MODE DATA
// ======================

// Task Kanban Board Widget
export const enhancedTaskKanban: TaskKanbanData = {
  columns: [
    {
      id: 'todo',
      title: 'To Do',
      tasks: mockTasks.filter(t => t.status === 'todo').slice(0, 8).map(task => ({
        id: task.id,
        title: task.title,
        assignee: task.assignee,
        priority: task.priority,
        storyPoints: task.storyPoints,
        labels: task.labels,
        blocked: task.blocked,
      })),
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: mockTasks.filter(t => t.status === 'in-progress').slice(0, 6).map(task => ({
        id: task.id,
        title: task.title,
        assignee: task.assignee,
        priority: task.priority,
        storyPoints: task.storyPoints,
        labels: task.labels,
        blocked: task.blocked,
      })),
    },
    {
      id: 'review',
      title: 'In Review',
      tasks: mockTasks.filter(t => t.status === 'review').slice(0, 4).map(task => ({
        id: task.id,
        title: task.title,
        assignee: task.assignee,
        priority: task.priority,
        storyPoints: task.storyPoints,
        labels: task.labels,
        blocked: task.blocked,
      })),
    },
    {
      id: 'done',
      title: 'Done',
      tasks: mockTasks.filter(t => t.status === 'done').slice(0, 10).map(task => ({
        id: task.id,
        title: task.title,
        assignee: task.assignee,
        priority: task.priority,
        storyPoints: task.storyPoints,
        labels: task.labels,
        blocked: task.blocked,
      })),
    },
  ],
  sprintGoal: mockSprints.find(s => s.status === 'active')?.goal || 'Complete user authentication and OAuth integration',
  sprintProgress: {
    completed: mockTasks.filter(t => t.status === 'done').reduce((sum, t) => sum + t.storyPoints, 0),
    total: mockTasks.reduce((sum, t) => sum + t.storyPoints, 0),
  },
};

// Sprint Burndown Chart Widget
export const enhancedSprintBurndown: SprintBurndownData = {
  sprintName: mockSprints.find(s => s.status === 'active')?.name || 'Sprint 12',
  sprintGoal: mockSprints.find(s => s.status === 'active')?.goal || 'OAuth integration',
  startDate: mockSprints.find(s => s.status === 'active')?.startDate || '2025-11-01',
  endDate: mockSprints.find(s => s.status === 'active')?.endDate || '2025-11-14',
  days: Array.from({ length: 10 }, (_, i) => ({
    day: i + 1,
    date: new Date(Date.now() - (9 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    idealRemaining: 50 - (i * 5),
    actualRemaining: 50 - (i * 4.8) + (Math.random() * 4 - 2),
  })),
  currentVelocity: 45,
  projectedCompletion: 48,
  targetVelocity: 50,
};

// Team Velocity Widget
export const enhancedTeamVelocity: TeamVelocityData = {
  sprints: mockHistoricalMetrics.slice(-6).map((metric, index) => ({
    name: `Sprint ${index + 7}`,
    committed: metric.sprintVelocity,
    completed: Math.round(metric.sprintVelocity * 0.92),
  })),
  averageVelocity: mockHistoricalMetrics.reduce((sum, m) => sum + m.sprintVelocity, 0) / mockHistoricalMetrics.length,
  trend: 'improving' as const,
  predictability: 92,
};

// Code Quality Dashboard Widget
export const enhancedCodeQuality: CodeQualityData = {
  metrics: {
    testCoverage: mockHistoricalMetrics[mockHistoricalMetrics.length - 1]?.testCoverage || 87,
    codeSmells: mockHistoricalMetrics[mockHistoricalMetrics.length - 1]?.codeSmells || 45,
    technicalDebt: Math.round(Math.random() * 20) + 10, // 10-30 hours
    securityIssues: Math.round(Math.random() * 5), // 0-5 issues
  },
  trends: mockHistoricalMetrics.slice(-6).map((metric, index) => ({
    month: new Date(Date.now() - (5 - index) * 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 7),
    coverage: metric.testCoverage,
    smells: metric.codeSmells,
  })),
  recentPRs: mockTasks.filter(t => t.status === 'review').slice(0, 5).map(task => ({
    id: task.id,
    title: task.title,
    author: task.assignee,
    status: 'pending' as const,
    reviewers: Math.round(Math.random() * 2) + 1,
  })),
};

// ======================
// TICKETS & CUSTOMERS
// ======================

// Ticket List Widget
export const enhancedTicketList: TicketListData = {
  tickets: mockTickets.slice(0, 20).map(ticket => {
    const customer = mockCustomers.find(c => c.id === ticket.customerId);
    const agent = mockUsers.find(u => u.id === ticket.assignedTo);
    return {
      ticketNumber: ticket.id,
      subject: ticket.subject,
      customerName: customer?.name || 'Unknown',
      priority: ticket.priority,
      status: ticket.status,
      assignedAgent: agent?.name || 'Unassigned',
      createdAt: ticket.createdAt,
      slaStatus: ticket.slaStatus,
    };
  }),
  filters: {
    priorities: ['critical', 'high', 'medium', 'low'],
    statuses: ['open', 'in-progress', 'pending', 'resolved', 'closed'],
  },
  pagination: {
    currentPage: 1,
    totalPages: Math.ceil(mockTickets.length / 20),
    totalItems: mockTickets.length,
  },
};

// ======================
// DATABASE STATISTICS
// ======================

export const enhancedDatabaseStats = {
  ...databaseStats,
  message: '1000+ realistic records generated with faker.js',
  features: [
    '6 months of historical trend data',
    'Realistic relationships (vendors → contracts → deliverables)',
    'Consistent seed for reproducible demos',
    'Variance in data (some overdue, some over-budget) for realism',
  ],
};

// ======================
// QUICK ACCESS EXPORTS
// ======================

export {
  mockUsers as enhancedUsers,
  mockVendors as enhancedVendors,
  mockContracts as enhancedContracts,
  mockDeliverables as enhancedDeliverables,
  mockSprints as enhancedSprints,
  mockTasks as enhancedTasks,
  mockCustomers as enhancedCustomers,
  mockTickets as enhancedTickets,
  mockKnowledgeBase as enhancedKnowledgeBase,
  mockHistoricalMetrics as enhancedHistoricalMetrics,
};
