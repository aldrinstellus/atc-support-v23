// Mock Data Module
// Re-exports all mock data functionality

export * from './seed';
export * from './database';

// Generator exports (for testing/custom generation)
export { generateTeams, generateAgents } from './generators/agent-generator';
export { generateCompanies } from './generators/company-generator';
export { generateContacts } from './generators/contact-generator';
export { generateSLAConfigs } from './generators/sla-generator';
export { generateTickets, generateTicketHistory } from './generators/ticket-generator';
export {
  generateDailyMetrics,
  generateDashboardStats,
  generateTrendData,
} from './generators/metrics-generator';
