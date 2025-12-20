// Agent Types - Customer Portal Mock Data

import type { AvatarGradient } from '../ticket';

export type AgentStatus = 'online' | 'away' | 'offline';
export type AgentRole = 'support' | 'senior-support' | 'team-lead' | 'csm' | 'manager';

export interface Agent {
  id: string;                      // AGNT-001
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  role: AgentRole;
  teamId: string;                  // FK to Team
  managerId: string | null;        // FK to Agent (for hierarchy)
  status: AgentStatus;
  capacity: number;                // max tickets
  currentWorkload: number;         // current assigned tickets
  skills: string[];
  avatar: AvatarGradient;
  initials: string;
  performanceScore: number;        // 0-100
  avgResolutionTime: number;       // hours
  ticketsResolvedThisWeek: number;
  ticketsResolvedThisMonth: number;
  csat: number;                    // 1-5 rating
  createdAt: string;               // ISO date
}

export interface Team {
  id: string;                      // TEAM-01
  name: string;
  managerId: string;               // FK to Agent
  focusArea: string;               // 'enterprise', 'smb', 'technical', etc.
  memberCount: number;
  description: string;
}

export interface AgentFilters {
  teamId?: string;
  role?: AgentRole;
  status?: AgentStatus;
  search?: string;
}

export interface AgentWorkload {
  agentId: string;
  name: string;
  capacity: number;
  currentLoad: number;
  utilizationPercent: number;
  ticketsByPriority: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

// Agent skills for realistic data
export const AGENT_SKILLS = [
  'Technical Support',
  'Billing',
  'Account Management',
  'Product Expert',
  'Enterprise Support',
  'API Integration',
  'Security',
  'Onboarding',
  'Training',
  'Escalation Handling',
] as const;

// Team focus areas
export const TEAM_FOCUS_AREAS = [
  'Enterprise Support',
  'SMB Support',
  'Technical Support',
  'Billing & Accounts',
  'Customer Success',
] as const;

export type AgentSkill = typeof AGENT_SKILLS[number];
export type TeamFocusArea = typeof TEAM_FOCUS_AREAS[number];
