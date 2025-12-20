// Mock Database Singleton
// Generates all mock data on first access with consistent relationships

import { faker } from '@faker-js/faker';
import type {
  Company,
  Contact,
  Agent,
  Team,
  EnhancedTicket,
  TicketActivity,
  SLAConfig,
  DailyMetrics,
  DashboardStats,
  CompanyTier,
  RiskLevel,
} from '@/types/mock';
import { MOCK_SEED, DATA_COUNTS } from './seed';
import { generateTeams, generateAgents } from './generators/agent-generator';
import { generateCompanies } from './generators/company-generator';
import { generateContacts } from './generators/contact-generator';
import { generateSLAConfigs } from './generators/sla-generator';
import { generateTickets, generateTicketHistory } from './generators/ticket-generator';
import { generateDailyMetrics, generateDashboardStats, generateTrendData } from './generators/metrics-generator';

export interface MockDatabase {
  teams: Team[];
  agents: Agent[];
  companies: Company[];
  contacts: Contact[];
  slaConfigs: SLAConfig[];
  tickets: EnhancedTicket[];
  ticketHistory: TicketActivity[];
  dailyMetrics: DailyMetrics[];
  dashboardStats: DashboardStats;
}

// Singleton instance
let database: MockDatabase | null = null;

/**
 * Initialize and return the mock database
 * Uses MOCK_SEED for deterministic data generation
 */
export function getMockDatabase(): MockDatabase {
  if (database) {
    return database;
  }

  // Set seed for deterministic generation
  faker.seed(MOCK_SEED);

  console.log('[MockDB] Generating mock database with seed:', MOCK_SEED);

  // Generate data in dependency order
  const teams = generateTeams(DATA_COUNTS.teams);
  console.log(`[MockDB] Generated ${teams.length} teams`);

  const agents = generateAgents(DATA_COUNTS.agents, teams);
  console.log(`[MockDB] Generated ${agents.length} agents`);

  const companies = generateCompanies(DATA_COUNTS.companies, agents);
  console.log(`[MockDB] Generated ${companies.length} companies`);

  const contacts = generateContacts(companies);
  console.log(`[MockDB] Generated ${contacts.length} contacts`);

  const slaConfigs = generateSLAConfigs();
  console.log(`[MockDB] Generated ${slaConfigs.length} SLA configs`);

  const tickets = generateTickets(DATA_COUNTS.tickets, companies, contacts, agents, slaConfigs);
  console.log(`[MockDB] Generated ${tickets.length} tickets`);

  const ticketHistory = generateTicketHistory(tickets, agents);
  console.log(`[MockDB] Generated ${ticketHistory.length} history entries`);

  const dailyMetrics = generateDailyMetrics(DATA_COUNTS.metricsDays, tickets, agents);
  console.log(`[MockDB] Generated ${dailyMetrics.length} days of metrics`);

  const dashboardStats = generateDashboardStats(tickets, companies, agents, dailyMetrics);
  console.log('[MockDB] Generated dashboard stats');

  database = {
    teams,
    agents,
    companies,
    contacts,
    slaConfigs,
    tickets,
    ticketHistory,
    dailyMetrics,
    dashboardStats,
  };

  console.log('[MockDB] Mock database initialized successfully');

  return database;
}

/**
 * Reset the database (useful for testing)
 */
export function resetMockDatabase(): void {
  database = null;
  console.log('[MockDB] Database reset');
}

/**
 * Get filtered tickets with pagination
 */
export interface TicketQueryOptions {
  tier?: CompanyTier;
  risk?: RiskLevel;
  status?: string[];
  priority?: string[];
  channel?: string[];
  sentiment?: string[];
  category?: string[];
  agentId?: string;
  companyId?: string;
  search?: string;
  slaBreached?: boolean;
  aiSuggested?: boolean;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}

export function queryTickets(options: TicketQueryOptions = {}): {
  tickets: EnhancedTicket[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
} {
  const db = getMockDatabase();
  let filtered = [...db.tickets];

  // Apply filters
  if (options.tier) {
    filtered = filtered.filter(t => t.company.tier === options.tier);
  }

  if (options.risk) {
    filtered = filtered.filter(t => t.company.riskLevel === options.risk);
  }

  if (options.status && options.status.length > 0) {
    filtered = filtered.filter(t => options.status!.includes(t.status));
  }

  if (options.priority && options.priority.length > 0) {
    filtered = filtered.filter(t => options.priority!.includes(t.priority));
  }

  if (options.channel && options.channel.length > 0) {
    filtered = filtered.filter(t => options.channel!.includes(t.channel));
  }

  if (options.sentiment && options.sentiment.length > 0) {
    filtered = filtered.filter(t => options.sentiment!.includes(t.sentiment));
  }

  if (options.category && options.category.length > 0) {
    filtered = filtered.filter(t => options.category!.includes(t.category));
  }

  if (options.agentId) {
    filtered = filtered.filter(t => t.agentId === options.agentId);
  }

  if (options.companyId) {
    filtered = filtered.filter(t => t.companyId === options.companyId);
  }

  if (options.slaBreached !== undefined) {
    filtered = filtered.filter(t =>
      (t.firstResponseBreached || t.resolutionBreached) === options.slaBreached
    );
  }

  if (options.aiSuggested !== undefined) {
    filtered = filtered.filter(t => t.aiSuggested === options.aiSuggested);
  }

  // Search filter
  if (options.search) {
    const searchLower = options.search.toLowerCase();
    filtered = filtered.filter(t =>
      t.subject.toLowerCase().includes(searchLower) ||
      t.description.toLowerCase().includes(searchLower) ||
      t.ticketNumber.toLowerCase().includes(searchLower) ||
      t.company.name.toLowerCase().includes(searchLower) ||
      t.contact?.name.toLowerCase().includes(searchLower)
    );
  }

  // Sorting
  const sortBy = options.sortBy || 'createdAt';
  const sortDir = options.sortDir || 'desc';

  filtered.sort((a, b) => {
    let aVal: unknown = a[sortBy as keyof EnhancedTicket];
    let bVal: unknown = b[sortBy as keyof EnhancedTicket];

    // Handle nested properties
    if (sortBy === 'company.name') {
      aVal = a.company.name;
      bVal = b.company.name;
    } else if (sortBy === 'contact.name') {
      aVal = a.contact?.name;
      bVal = b.contact?.name;
    } else if (sortBy === 'agent.name') {
      aVal = a.agent?.name;
      bVal = b.agent?.name;
    }

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDir === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    if (aVal instanceof Date || typeof aVal === 'string') {
      const aDate = new Date(aVal as string).getTime();
      const bDate = new Date(bVal as string).getTime();
      return sortDir === 'asc' ? aDate - bDate : bDate - aDate;
    }

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });

  // Pagination
  const page = options.page || 1;
  const pageSize = options.pageSize || 20;
  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const paginatedTickets = filtered.slice(start, start + pageSize);

  return {
    tickets: paginatedTickets,
    total,
    page,
    pageSize,
    totalPages,
  };
}

/**
 * Get companies with filters
 */
export interface CompanyQueryOptions {
  tier?: CompanyTier;
  risk?: RiskLevel;
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}

export function queryCompanies(options: CompanyQueryOptions = {}): {
  companies: Company[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
} {
  const db = getMockDatabase();
  let filtered = [...db.companies];

  if (options.tier) {
    filtered = filtered.filter(c => c.tier === options.tier);
  }

  if (options.risk) {
    filtered = filtered.filter(c => c.riskLevel === options.risk);
  }

  if (options.search) {
    const searchLower = options.search.toLowerCase();
    filtered = filtered.filter(c =>
      c.name.toLowerCase().includes(searchLower) ||
      c.domain.toLowerCase().includes(searchLower) ||
      c.industry.toLowerCase().includes(searchLower)
    );
  }

  // Sorting
  const sortBy = options.sortBy || 'name';
  const sortDir = options.sortDir || 'asc';

  filtered.sort((a, b) => {
    const aVal = a[sortBy as keyof Company];
    const bVal = b[sortBy as keyof Company];

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDir === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });

  // Pagination
  const page = options.page || 1;
  const pageSize = options.pageSize || 20;
  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const paginatedCompanies = filtered.slice(start, start + pageSize);

  return {
    companies: paginatedCompanies,
    total,
    page,
    pageSize,
    totalPages,
  };
}

/**
 * Get a single company with all related data
 */
export function getCompanyWithRelations(companyId: string): {
  company: Company;
  contacts: Contact[];
  tickets: EnhancedTicket[];
  assignedCsm: Agent | null;
} | null {
  const db = getMockDatabase();
  const company = db.companies.find(c => c.id === companyId);

  if (!company) return null;

  return {
    company,
    contacts: db.contacts.filter(c => c.companyId === companyId),
    tickets: db.tickets.filter(t => t.companyId === companyId),
    assignedCsm: db.agents.find(a => a.id === company.assignedCsmId) || null,
  };
}

/**
 * Get a single ticket with full history
 */
export function getTicketWithHistory(ticketId: string): {
  ticket: EnhancedTicket;
  history: TicketActivity[];
  company: Company;
  contact: Contact | null;
  agent: Agent | null;
  slaConfig: SLAConfig | null;
} | null {
  const db = getMockDatabase();
  const ticket = db.tickets.find(t => t.id === ticketId);

  if (!ticket) return null;

  return {
    ticket,
    history: db.ticketHistory.filter(h => h.ticketId === ticketId),
    company: db.companies.find(c => c.id === ticket.companyId)!,
    contact: db.contacts.find(c => c.id === ticket.contactId) || null,
    agent: ticket.agentId ? db.agents.find(a => a.id === ticket.agentId) || null : null,
    slaConfig: db.slaConfigs.find(s => s.id === ticket.slaConfigId) || null,
  };
}

/**
 * Get agent workload distribution
 */
export function getAgentWorkload(): {
  agents: Array<Agent & { utilization: number }>;
  summary: {
    totalAgents: number;
    onlineAgents: number;
    averageUtilization: number;
    overloadedAgents: number;
  };
} {
  const db = getMockDatabase();

  const agentsWithUtilization = db.agents.map(agent => ({
    ...agent,
    utilization: agent.capacity > 0
      ? Math.round((agent.currentWorkload / agent.capacity) * 100)
      : 0,
  }));

  const onlineAgents = agentsWithUtilization.filter(a => a.status === 'online');
  const overloadedAgents = onlineAgents.filter(a => a.utilization > 100);

  return {
    agents: agentsWithUtilization,
    summary: {
      totalAgents: db.agents.length,
      onlineAgents: onlineAgents.length,
      averageUtilization: onlineAgents.length > 0
        ? Math.round(onlineAgents.reduce((sum, a) => sum + a.utilization, 0) / onlineAgents.length)
        : 0,
      overloadedAgents: overloadedAgents.length,
    },
  };
}

/**
 * Get metrics for a specific time period
 */
export function getMetricsTrend(period: 'week' | 'month' | 'quarter') {
  const db = getMockDatabase();
  return generateTrendData(db.dailyMetrics, period);
}

/**
 * Get SLA breach statistics
 */
export function getSLABreachStats(): {
  byTier: Record<CompanyTier, { total: number; breached: number; rate: number }>;
  byPriority: Record<string, { total: number; breached: number; rate: number }>;
  overall: { total: number; breached: number; rate: number };
} {
  const db = getMockDatabase();
  const activeTickets = db.tickets.filter(t => !['resolved', 'closed'].includes(t.status));

  const tiers: CompanyTier[] = ['enterprise', 'smb', 'startup'];
  const priorities = ['critical', 'high', 'medium', 'low'];

  const byTier: Record<CompanyTier, { total: number; breached: number; rate: number }> = {} as any;
  for (const tier of tiers) {
    const tierTickets = activeTickets.filter(t => t.company.tier === tier);
    const breached = tierTickets.filter(t => t.firstResponseBreached || t.resolutionBreached);
    byTier[tier] = {
      total: tierTickets.length,
      breached: breached.length,
      rate: tierTickets.length > 0 ? Math.round((breached.length / tierTickets.length) * 100) : 0,
    };
  }

  const byPriority: Record<string, { total: number; breached: number; rate: number }> = {};
  for (const priority of priorities) {
    const priorityTickets = activeTickets.filter(t => t.priority === priority);
    const breached = priorityTickets.filter(t => t.firstResponseBreached || t.resolutionBreached);
    byPriority[priority] = {
      total: priorityTickets.length,
      breached: breached.length,
      rate: priorityTickets.length > 0 ? Math.round((breached.length / priorityTickets.length) * 100) : 0,
    };
  }

  const totalBreached = activeTickets.filter(t => t.firstResponseBreached || t.resolutionBreached);

  return {
    byTier,
    byPriority,
    overall: {
      total: activeTickets.length,
      breached: totalBreached.length,
      rate: activeTickets.length > 0 ? Math.round((totalBreached.length / activeTickets.length) * 100) : 0,
    },
  };
}
