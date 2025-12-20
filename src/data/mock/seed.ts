// Mock Data Seed Configuration
// Deterministic seed for consistent demo data across sessions

import type { CompanyTier, RiskLevel } from '@/types/mock';

// Deterministic seed for reproducible data
export const MOCK_SEED = 42;

// Record counts
export const RECORD_COUNTS = {
  teams: 5,
  agents: 50,
  companies: 100,
  contactsPerCompanyMin: 1,
  contactsPerCompanyMax: 5,
  tickets: 1000,
  historyPerTicketAvg: 5,
  metricsDays: 180,
};

// Alias for DATA_COUNTS (used by database.ts)
export const DATA_COUNTS = RECORD_COUNTS;

// Distribution weights for realistic data
export const DISTRIBUTIONS = {
  // Company tier distribution
  companyTier: {
    enterprise: 0.15,    // 15 companies
    smb: 0.45,           // 45 companies
    startup: 0.40,       // 40 companies
  } as Record<CompanyTier, number>,

  // Risk level by tier (more enterprise = healthier)
  riskByTier: {
    enterprise: { healthy: 0.70, 'at-risk': 0.25, churning: 0.05 },
    smb: { healthy: 0.55, 'at-risk': 0.35, churning: 0.10 },
    startup: { healthy: 0.45, 'at-risk': 0.40, churning: 0.15 },
  } as Record<CompanyTier, Record<RiskLevel, number>>,

  // Priority distribution by risk level (riskier = more urgent)
  priorityByRisk: {
    healthy: { low: 0.30, medium: 0.50, high: 0.15, critical: 0.05 },
    'at-risk': { low: 0.15, medium: 0.40, high: 0.30, critical: 0.15 },
    churning: { low: 0.10, medium: 0.30, high: 0.35, critical: 0.25 },
  } as Record<RiskLevel, Record<string, number>>,

  // Ticket status distribution
  ticketStatus: {
    open: 0.20,
    'in-progress': 0.25,
    'pending-customer': 0.15,
    resolved: 0.25,
    closed: 0.15,
  },

  // Sentiment by risk level
  sentimentByRisk: {
    healthy: { positive: 0.30, neutral: 0.60, negative: 0.05, frustrated: 0.05 },
    'at-risk': { positive: 0.15, neutral: 0.45, negative: 0.20, frustrated: 0.20 },
    churning: { positive: 0.05, neutral: 0.30, negative: 0.30, frustrated: 0.35 },
  } as Record<RiskLevel, Record<string, number>>,

  // AI suggestion rate by priority
  aiSuggestedByPriority: {
    critical: 0.80,
    high: 0.65,
    medium: 0.50,
    low: 0.30,
  },
};

// Business constraints for realistic ranges
export const CONSTRAINTS = {
  // ARR ranges by tier
  arrRanges: {
    enterprise: { min: 100000, max: 2000000 },
    smb: { min: 10000, max: 100000 },
    startup: { min: 500, max: 10000 },
  } as Record<CompanyTier, { min: number; max: number }>,

  // Employee count ranges by tier
  employeeRanges: {
    enterprise: { min: 500, max: 50000 },
    smb: { min: 50, max: 500 },
    startup: { min: 1, max: 50 },
  } as Record<CompanyTier, { min: number; max: number }>,

  // Contacts per company by tier
  contactsPerCompany: {
    enterprise: { min: 5, max: 10 },
    smb: { min: 2, max: 5 },
    startup: { min: 1, max: 3 },
  } as Record<CompanyTier, { min: number; max: number }>,

  // Tickets per company range (monthly average)
  ticketsPerCompanyMonthly: {
    enterprise: { min: 20, max: 50 },
    smb: { min: 5, max: 20 },
    startup: { min: 1, max: 5 },
  } as Record<CompanyTier, { min: number; max: number }>,

  // Agent capacity
  agentCapacity: {
    support: { min: 20, max: 30 },
    'senior-support': { min: 15, max: 25 },
    'team-lead': { min: 10, max: 15 },
    csm: { min: 10, max: 20 },
    manager: { min: 5, max: 10 },
  },

  // Health score ranges by risk level
  healthScoreRanges: {
    healthy: { min: 75, max: 100 },
    'at-risk': { min: 40, max: 74 },
    churning: { min: 0, max: 39 },
  } as Record<RiskLevel, { min: number; max: number }>,

  // Churn probability ranges by risk level
  churnProbabilityRanges: {
    healthy: { min: 0.01, max: 0.10 },
    'at-risk': { min: 0.25, max: 0.50 },
    churning: { min: 0.60, max: 0.90 },
  } as Record<RiskLevel, { min: number; max: number }>,

  // Performance score ranges
  performanceScore: { min: 60, max: 100 },

  // CSAT ranges
  csat: { min: 3.5, max: 5.0 },

  // Resolution time ranges (hours)
  resolutionTimeHours: {
    critical: { min: 1, max: 4 },
    high: { min: 2, max: 8 },
    medium: { min: 4, max: 24 },
    low: { min: 8, max: 72 },
  },
};

// Helper function to get weighted random value
export function weightedRandom<T extends string>(weights: Record<T, number>): T {
  const entries = Object.entries(weights) as [T, number][];
  const totalWeight = entries.reduce((sum, [, weight]) => sum + weight, 0);
  let random = Math.random() * totalWeight;

  for (const [value, weight] of entries) {
    random -= weight;
    if (random <= 0) {
      return value;
    }
  }

  return entries[entries.length - 1][0];
}

// Helper to generate ID with prefix and padding
export function generateId(prefix: string, index: number, padding: number = 4): string {
  return `${prefix}-${String(index).padStart(padding, '0')}`;
}
