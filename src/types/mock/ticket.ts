// Enhanced Ticket Types - Customer Portal Mock Data

import type { AvatarGradient } from '../ticket';
import type { CompanyTier, RiskLevel } from './company';

export type TicketStatus = 'open' | 'in-progress' | 'pending-customer' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';
export type TicketChannel = 'email' | 'chat' | 'phone' | 'web';
export type TicketSentiment = 'frustrated' | 'neutral' | 'satisfied' | 'positive' | 'negative';
export type TicketCategory = 
  | 'technical-issue'
  | 'billing'
  | 'account-access'
  | 'feature-request'
  | 'general-inquiry'
  | 'bug-report'
  | 'integration'
  | 'onboarding';

export interface EnhancedTicket {
  id: string;                      // TICK-000001
  ticketNumber: string;            // Human readable: TKT-2025-001234
  companyId: string;               // FK to Company
  contactId: string;               // FK to Contact
  agentId: string | null;          // FK to Agent (null if unassigned)
  
  // Content
  subject: string;
  description: string;
  category: TicketCategory;
  tags: string[];
  
  // Status & Priority
  priority: TicketPriority;
  status: TicketStatus;
  channel: TicketChannel;
  sentiment: TicketSentiment;
  
  // SLA tracking
  slaConfigId: string;             // FK to SLAConfig
  firstResponseDue: string;        // ISO date
  resolutionDue: string;           // ISO date
  firstResponseAt: string | null;  // ISO date
  firstResponseBreached: boolean;
  resolutionBreached: boolean;
  slaTimeRemaining: number;        // minutes (negative if breached)
  
  // AI features
  aiSuggested: boolean;
  aiConfidence: number | null;     // 0-100
  aiDraftId: string | null;
  
  // Timestamps
  createdAt: string;               // ISO date
  updatedAt: string;               // ISO date
  resolvedAt: string | null;       // ISO date
  closedAt: string | null;         // ISO date
  
  // Denormalized for display (populated by generator)
  company: {
    name: string;
    tier: CompanyTier;
    riskLevel: RiskLevel;
  };
  contact: {
    name: string;
    email: string;
    avatar: AvatarGradient;
  };
  agent?: {
    name: string;
    initials: string;
    avatar: AvatarGradient;
  };
}

export type TicketActionType = 
  | 'created'
  | 'assigned'
  | 'reassigned'
  | 'status_changed'
  | 'priority_changed'
  | 'comment_added'
  | 'internal_note'
  | 'resolved'
  | 'closed'
  | 'reopened'
  | 'escalated'
  | 'sla_warning'
  | 'sla_breached'
  | 'ai_draft_generated'
  | 'customer_replied';

export interface TicketActivity {
  id: string;
  ticketId: string;                // FK to Ticket
  action: TicketActionType;
  actorId: string;                 // Agent ID or 'system' or contact ID
  actorType: 'agent' | 'system' | 'customer';
  actorName: string;
  oldValue: string | null;
  newValue: string | null;
  note: string | null;
  isInternal: boolean;
  timestamp: string;               // ISO date
}

export interface TicketFilters {
  companyId?: string;
  contactId?: string;
  agentId?: string;
  tier?: CompanyTier;
  risk?: RiskLevel;
  status?: TicketStatus | TicketStatus[];
  priority?: TicketPriority | TicketPriority[];
  category?: TicketCategory;
  channel?: TicketChannel;
  sentiment?: TicketSentiment;
  search?: string;
  slaBreached?: boolean;
  aiSuggested?: boolean;
  unassigned?: boolean;
  dateFrom?: string;
  dateTo?: string;
}

export interface TicketSortConfig {
  field: 'createdAt' | 'updatedAt' | 'priority' | 'status' | 'slaTimeRemaining';
  direction: 'asc' | 'desc';
}

// Ticket categories with display names
export const TICKET_CATEGORIES: Record<TicketCategory, string> = {
  'technical-issue': 'Technical Issue',
  'billing': 'Billing',
  'account-access': 'Account Access',
  'feature-request': 'Feature Request',
  'general-inquiry': 'General Inquiry',
  'bug-report': 'Bug Report',
  'integration': 'Integration',
  'onboarding': 'Onboarding',
};

// Common ticket tags
export const TICKET_TAGS = [
  'urgent',
  'vip',
  'escalated',
  'waiting-on-customer',
  'waiting-on-engineering',
  'recurring-issue',
  'feature-related',
  'security',
  'performance',
  'data-issue',
] as const;

export type TicketTag = typeof TICKET_TAGS[number];
