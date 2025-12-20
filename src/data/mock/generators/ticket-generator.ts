// Ticket & Activity Generator

import { faker } from '@faker-js/faker';
import type {
  EnhancedTicket,
  TicketActivity,
  TicketStatus,
  TicketPriority,
  TicketChannel,
  TicketSentiment,
  TicketCategory,
  TicketActionType,
  Company,
  Contact,
  Agent,
  SLAConfig,
} from '@/types/mock';
import { TICKET_CATEGORIES, TICKET_TAGS, SLA_TARGETS } from '@/types/mock';
import { generateId, DISTRIBUTIONS, CONSTRAINTS, weightedRandom } from '../seed';

const channels: TicketChannel[] = ['email', 'chat', 'phone', 'web'];
const categories: TicketCategory[] = Object.keys(TICKET_CATEGORIES) as TicketCategory[];

// Subject templates by category
const SUBJECT_TEMPLATES: Record<TicketCategory, string[]> = {
  'technical-issue': [
    'Cannot connect to {{service}}',
    '{{feature}} not working properly',
    'Error when trying to {{action}}',
    'System crash during {{activity}}',
    'Performance issues with {{component}}',
  ],
  'billing': [
    'Question about invoice #{{number}}',
    'Billing discrepancy for {{month}}',
    'Update payment method',
    'Request for refund',
    'Subscription upgrade inquiry',
  ],
  'account-access': [
    'Cannot log into my account',
    'Password reset not working',
    'MFA setup issues',
    'Account locked out',
    'SSO configuration help',
  ],
  'feature-request': [
    'Request: {{feature}} integration',
    'Enhancement suggestion for {{component}}',
    'New feature idea: {{idea}}',
    'API improvement request',
    'UI/UX feedback',
  ],
  'general-inquiry': [
    'Question about {{topic}}',
    'Need information on {{subject}}',
    'Help with {{task}}',
    'General support request',
    'Documentation clarification',
  ],
  'bug-report': [
    'Bug: {{component}} shows incorrect data',
    'Issue with {{feature}} after update',
    'Reproducible crash in {{module}}',
    'Data sync problem',
    'UI glitch on {{page}}',
  ],
  'integration': [
    '{{integration}} API connection failed',
    'Webhook not receiving events',
    'OAuth setup assistance',
    'Data import from {{source}}',
    'Third-party integration help',
  ],
  'onboarding': [
    'New user setup assistance',
    'Team onboarding questions',
    'Initial configuration help',
    'Getting started guide',
    'Best practices inquiry',
  ],
};

const PLACEHOLDER_VALUES: Record<string, string[]> = {
  service: ['API', 'Dashboard', 'Mobile App', 'Email Service', 'Analytics'],
  feature: ['Reports', 'Export', 'Notifications', 'Search', 'Filters'],
  action: ['save data', 'export report', 'send email', 'upload file', 'create user'],
  activity: ['data sync', 'batch processing', 'report generation', 'backup'],
  component: ['Dashboard', 'Settings', 'User Management', 'Analytics', 'Reports'],
  month: ['January', 'February', 'March', 'April', 'May', 'June'],
  number: ['12345', '67890', '11111', '22222', '33333'],
  topic: ['pricing', 'features', 'security', 'compliance', 'updates'],
  subject: ['API limits', 'data retention', 'custom domains', 'team permissions'],
  task: ['team setup', 'data migration', 'report customization', 'automation'],
  idea: ['bulk actions', 'custom fields', 'advanced filters', 'dark mode'],
  module: ['Reports', 'Dashboard', 'Settings', 'Analytics'],
  page: ['home', 'settings', 'profile', 'reports', 'analytics'],
  integration: ['Slack', 'Salesforce', 'HubSpot', 'Zendesk', 'Jira'],
  source: ['CSV', 'Salesforce', 'HubSpot', 'legacy system'],
};

function generateSubject(category: TicketCategory): string {
  const templates = SUBJECT_TEMPLATES[category];
  let subject = faker.helpers.arrayElement(templates);

  // Replace placeholders
  const placeholderMatches = subject.match(/\{\{(\w+)\}\}/g);
  if (placeholderMatches) {
    for (const match of placeholderMatches) {
      const key = match.replace(/\{\{|\}\}/g, '');
      const values = PLACEHOLDER_VALUES[key] || ['item'];
      subject = subject.replace(match, faker.helpers.arrayElement(values));
    }
  }

  return subject;
}

export function generateTickets(
  count: number,
  companies: Company[],
  contacts: Contact[],
  agents: Agent[],
  slaConfigs: SLAConfig[]
): EnhancedTicket[] {
  const tickets: EnhancedTicket[] = [];
  const supportAgents = agents.filter(a => ['support', 'senior-support', 'team-lead'].includes(a.role));

  for (let i = 0; i < count; i++) {
    // Select random company
    const company = faker.helpers.arrayElement(companies);

    // Get contacts for this company
    const companyContacts = contacts.filter(c => c.companyId === company.id);
    const contact = faker.helpers.arrayElement(companyContacts);

    // Determine priority based on company risk level
    const priorityWeights = DISTRIBUTIONS.priorityByRisk[company.riskLevel];
    const priority = weightedRandom(priorityWeights) as TicketPriority;

    // Determine status
    const status = weightedRandom(DISTRIBUTIONS.ticketStatus) as TicketStatus;

    // Determine sentiment based on risk
    const sentimentWeights = DISTRIBUTIONS.sentimentByRisk[company.riskLevel];
    const sentiment = weightedRandom(sentimentWeights) as TicketSentiment;

    // Get SLA config
    const slaConfig = slaConfigs.find(
      s => s.tier === company.tier && s.priority === priority
    )!;

    // Generate dates
    const createdAt = faker.date.recent({ days: 90 });
    const firstResponseDue = new Date(createdAt.getTime() + slaConfig.firstResponseTarget * 60000);
    const resolutionDue = new Date(createdAt.getTime() + slaConfig.resolutionTarget * 60000);

    // Determine if resolved/closed and calculate response times
    const isResolved = ['resolved', 'closed'].includes(status);
    const resolvedAt = isResolved
      ? faker.date.between({ from: createdAt, to: new Date() })
      : null;
    const closedAt = status === 'closed' && resolvedAt
      ? faker.date.between({ from: resolvedAt, to: new Date() })
      : null;

    // Calculate SLA breaches
    const firstResponseAt = faker.date.between({ from: createdAt, to: resolvedAt || new Date() });
    const firstResponseBreached = firstResponseAt > firstResponseDue;
    const resolutionBreached = isResolved && resolvedAt! > resolutionDue;

    // Calculate SLA time remaining
    const now = new Date();
    const slaTimeRemaining = isResolved
      ? 0
      : Math.round((resolutionDue.getTime() - now.getTime()) / 60000);

    // AI features
    const aiSuggested = Math.random() < DISTRIBUTIONS.aiSuggestedByPriority[priority];
    const aiConfidence = aiSuggested ? faker.number.int({ min: 70, max: 98 }) : null;

    // Assign agent (some tickets unassigned)
    const isAssigned = status !== 'open' || Math.random() > 0.3;
    const agent = isAssigned ? faker.helpers.arrayElement(supportAgents) : null;

    // Generate category and subject
    const category = faker.helpers.arrayElement(categories);
    const subject = generateSubject(category);

    tickets.push({
      id: generateId('TICK', i + 1, 6),
      ticketNumber: `TKT-2025-${String(i + 1).padStart(6, '0')}`,
      companyId: company.id,
      contactId: contact.id,
      agentId: agent?.id || null,
      subject,
      description: faker.lorem.paragraph(),
      category,
      tags: faker.helpers.arrayElements(TICKET_TAGS as unknown as string[], { min: 0, max: 3 }),
      priority,
      status,
      channel: faker.helpers.arrayElement(channels),
      sentiment,
      slaConfigId: slaConfig.id,
      firstResponseDue: firstResponseDue.toISOString(),
      resolutionDue: resolutionDue.toISOString(),
      firstResponseAt: firstResponseAt.toISOString(),
      firstResponseBreached,
      resolutionBreached,
      slaTimeRemaining,
      aiSuggested,
      aiConfidence,
      aiDraftId: aiSuggested ? generateId('DRAFT', i + 1, 6) : null,
      createdAt: createdAt.toISOString(),
      updatedAt: faker.date.between({ from: createdAt, to: new Date() }).toISOString(),
      resolvedAt: resolvedAt?.toISOString() || null,
      closedAt: closedAt?.toISOString() || null,
      // Denormalized fields
      company: {
        name: company.name,
        tier: company.tier,
        riskLevel: company.riskLevel,
      },
      contact: {
        name: contact.name,
        email: contact.email,
        avatar: contact.avatar,
      },
      agent: agent ? {
        name: agent.name,
        initials: agent.initials,
        avatar: agent.avatar,
      } : undefined,
    });
  }

  // Update agent workloads
  for (const agent of agents) {
    agent.currentWorkload = tickets.filter(
      t => t.agentId === agent.id && !['resolved', 'closed'].includes(t.status)
    ).length;
  }

  return tickets;
}

export function generateTicketHistory(tickets: EnhancedTicket[], agents: Agent[]): TicketActivity[] {
  const history: TicketActivity[] = [];
  let activityIndex = 0;

  for (const ticket of tickets) {
    const ticketCreatedAt = new Date(ticket.createdAt);
    const ticketUpdatedAt = new Date(ticket.updatedAt);

    // Created event
    history.push({
      id: generateId('ACT', ++activityIndex, 6),
      ticketId: ticket.id,
      action: 'created',
      actorId: ticket.contactId,
      actorType: 'customer',
      actorName: ticket.contact?.name || 'Customer',
      oldValue: null,
      newValue: ticket.status,
      note: `Ticket created via ${ticket.channel}`,
      isInternal: false,
      timestamp: ticket.createdAt,
    });

    // Assigned event (if assigned)
    if (ticket.agentId) {
      const assignedAt = faker.date.between({ from: ticketCreatedAt, to: ticketUpdatedAt });
      history.push({
        id: generateId('ACT', ++activityIndex, 6),
        ticketId: ticket.id,
        action: 'assigned',
        actorId: 'system',
        actorType: 'system',
        actorName: 'System',
        oldValue: null,
        newValue: ticket.agentId,
        note: `Assigned to ${ticket.agent?.name || 'Agent'}`,
        isInternal: true,
        timestamp: assignedAt.toISOString(),
      });
    }

    // Status change events
    if (ticket.status !== 'open') {
      const statusChanges: TicketStatus[] = [];
      if (['in-progress', 'pending-customer', 'resolved', 'closed'].includes(ticket.status)) {
        statusChanges.push('in-progress');
      }
      if (['pending-customer'].includes(ticket.status)) {
        statusChanges.push('pending-customer');
      }
      if (['resolved', 'closed'].includes(ticket.status)) {
        statusChanges.push('resolved');
      }
      if (ticket.status === 'closed') {
        statusChanges.push('closed');
      }

      let prevStatus: TicketStatus = 'open';
      for (const newStatus of statusChanges) {
        const statusChangeAt = faker.date.between({ from: ticketCreatedAt, to: ticketUpdatedAt });
        history.push({
          id: generateId('ACT', ++activityIndex, 6),
          ticketId: ticket.id,
          action: 'status_changed',
          actorId: ticket.agentId || 'system',
          actorType: ticket.agentId ? 'agent' : 'system',
          actorName: ticket.agent?.name || 'System',
          oldValue: prevStatus,
          newValue: newStatus,
          note: null,
          isInternal: false,
          timestamp: statusChangeAt.toISOString(),
        });
        prevStatus = newStatus;
      }
    }

    // AI draft event
    if (ticket.aiSuggested) {
      history.push({
        id: generateId('ACT', ++activityIndex, 6),
        ticketId: ticket.id,
        action: 'ai_draft_generated',
        actorId: 'system',
        actorType: 'system',
        actorName: 'AI Assistant',
        oldValue: null,
        newValue: `${ticket.aiConfidence}%`,
        note: `AI draft generated with ${ticket.aiConfidence}% confidence`,
        isInternal: true,
        timestamp: faker.date.between({ from: ticketCreatedAt, to: ticketUpdatedAt }).toISOString(),
      });
    }

    // Random comments
    const numComments = faker.number.int({ min: 0, max: 3 });
    for (let c = 0; c < numComments; c++) {
      const isCustomer = Math.random() < 0.4;
      history.push({
        id: generateId('ACT', ++activityIndex, 6),
        ticketId: ticket.id,
        action: isCustomer ? 'customer_replied' : 'comment_added',
        actorId: isCustomer ? ticket.contactId : (ticket.agentId || 'system'),
        actorType: isCustomer ? 'customer' : 'agent',
        actorName: isCustomer ? (ticket.contact?.name || 'Customer') : (ticket.agent?.name || 'Agent'),
        oldValue: null,
        newValue: faker.lorem.sentence(),
        note: null,
        isInternal: false,
        timestamp: faker.date.between({ from: ticketCreatedAt, to: ticketUpdatedAt }).toISOString(),
      });
    }
  }

  // Sort by timestamp
  history.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  return history;
}
