// SLA Configuration Types - Customer Portal Mock Data

import type { CompanyTier } from './company';
import type { TicketPriority } from './ticket';

export interface SLAConfig {
  id: string;                      // SLA-ENTERPRISE-CRITICAL
  tier: CompanyTier;
  priority: TicketPriority;
  firstResponseTarget: number;     // minutes
  resolutionTarget: number;        // minutes
  businessHoursOnly: boolean;
  escalationMinutes: number;       // when to escalate
  notifyOnWarning: boolean;
  warningThresholdPercent: number; // e.g., 80% of time elapsed
}

export interface SLABreach {
  ticketId: string;
  ticketNumber: string;
  companyName: string;
  tier: CompanyTier;
  priority: TicketPriority;
  breachType: 'first-response' | 'resolution';
  breachedAt: string;              // ISO date
  overdueMinutes: number;
  agentId: string | null;
  agentName: string | null;
}

export interface SLAAtRisk {
  ticketId: string;
  ticketNumber: string;
  companyName: string;
  tier: CompanyTier;
  priority: TicketPriority;
  riskType: 'first-response' | 'resolution';
  dueAt: string;                   // ISO date
  minutesRemaining: number;
  percentUsed: number;
  agentId: string | null;
  agentName: string | null;
}

export interface SLAStats {
  totalTickets: number;
  onTrack: number;
  atRisk: number;
  breached: number;
  complianceRate: number;          // percentage
  avgFirstResponseTime: number;    // minutes
  avgResolutionTime: number;       // hours
  byTier: Record<CompanyTier, {
    total: number;
    compliant: number;
    complianceRate: number;
  }>;
  byPriority: Record<TicketPriority, {
    total: number;
    compliant: number;
    complianceRate: number;
  }>;
}

// SLA target matrix (minutes)
export const SLA_TARGETS: Record<CompanyTier, Record<TicketPriority, { firstResponse: number; resolution: number }>> = {
  enterprise: {
    critical: { firstResponse: 15, resolution: 240 },     // 15min / 4hr
    high: { firstResponse: 60, resolution: 480 },         // 1hr / 8hr
    medium: { firstResponse: 120, resolution: 1440 },     // 2hr / 24hr
    low: { firstResponse: 240, resolution: 2880 },        // 4hr / 48hr
  },
  smb: {
    critical: { firstResponse: 30, resolution: 480 },     // 30min / 8hr
    high: { firstResponse: 120, resolution: 1440 },       // 2hr / 24hr
    medium: { firstResponse: 240, resolution: 2880 },     // 4hr / 48hr
    low: { firstResponse: 480, resolution: 5760 },        // 8hr / 96hr
  },
  startup: {
    critical: { firstResponse: 60, resolution: 960 },     // 1hr / 16hr
    high: { firstResponse: 240, resolution: 2880 },       // 4hr / 48hr
    medium: { firstResponse: 480, resolution: 5760 },     // 8hr / 96hr
    low: { firstResponse: 960, resolution: 11520 },       // 16hr / 192hr
  },
};
