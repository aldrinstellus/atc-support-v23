'use client';

import { X, User, Ticket, Building2, Clock, AlertTriangle, TrendingUp, MessageSquare } from 'lucide-react';
import { getMockDatabase, queryTickets, queryCompanies } from '@/data/mock/database';
import type { EnhancedTicket, Agent, Company } from '@/types/mock';

interface ContextData {
  type: 'ticket' | 'agent' | 'customer' | null;
  id: string | null;
}

interface ChatContextPanelProps {
  context: ContextData;
  onClose: () => void;
  isOpen: boolean;
}

interface TicketContext {
  id: string;
  subject: string;
  status: string;
  priority: string;
  customer: { name: string; company: string };
  agent: { name: string };
  createdAt: string;
  messages: number;
}

interface AgentContext {
  id: string;
  name: string;
  email: string;
  ticketsResolved: number;
  csatScore: number;
  avgResponseTime: string;
  currentWorkload: number;
}

interface CustomerContext {
  id: string;
  name: string;
  company: string;
  tier: string;
  openTickets: number;
  lifetimeValue: string;
  riskScore: string;
}

function TicketContextView({ ticketId }: { ticketId: string }) {
  const db = getMockDatabase();
  const { tickets } = queryTickets({});
  const ticket = tickets.find((t: EnhancedTicket) => t.id === ticketId) || tickets[0];
  const { companies } = queryCompanies({});
  const company = companies.find((c: Company) => c.id === ticket?.companyId);
  const agent = db.agents.find((a: Agent) => a.id === ticket?.agentId);

  const data: TicketContext = {
    id: ticket?.id || ticketId,
    subject: ticket?.subject || 'Unable to access account',
    status: ticket?.status || 'open',
    priority: ticket?.priority || 'high',
    customer: { name: ticket?.contact?.name || 'John Smith', company: company?.name || 'Acme Corp' },
    agent: { name: agent?.name || 'Sarah Chen' },
    createdAt: ticket?.createdAt || new Date().toISOString(),
    messages: 5,
  };

  const statusColors: Record<string, string> = {
    'open': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    'pending-customer': 'bg-purple-100 text-purple-800',
    'resolved': 'bg-green-100 text-green-800',
    'closed': 'bg-gray-100 text-gray-800',
  };

  const priorityColors: Record<string, string> = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-blue-100 text-blue-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800',
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-orange-600">
        <Ticket className="w-5 h-5" />
        <span className="font-medium">Ticket Context</span>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg space-y-3">
        <div>
          <p className="text-xs text-gray-500">Ticket ID</p>
          <p className="font-mono text-sm">{data.id}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Subject</p>
          <p className="text-sm font-medium">{data.subject}</p>
        </div>
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[data.status] || statusColors.open}`}>
            {data.status.replace('_', ' ')}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[data.priority] || priorityColors.medium}`}>
            {data.priority}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Customer:</span>
          <span className="font-medium">{data.customer.name}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Building2 className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Company:</span>
          <span className="font-medium">{data.customer.company}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Assigned:</span>
          <span className="font-medium">{data.agent.name}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Created:</span>
          <span className="font-medium">{new Date(data.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MessageSquare className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Messages:</span>
          <span className="font-medium">{data.messages}</span>
        </div>
      </div>
    </div>
  );
}

function AgentContextView({ agentId }: { agentId: string }) {
  const db = getMockDatabase();
  const agents = db.agents;
  const agent = agents.find((a: Agent) => a.id === agentId) || agents[0];

  // Use actual agent properties
  const utilizationPercent = agent ? Math.round((agent.currentWorkload / agent.capacity) * 100) : 75;

  const data: AgentContext = {
    id: agent?.id || agentId,
    name: agent?.name || 'Sarah Chen',
    email: agent?.email || 'sarah.chen@company.com',
    ticketsResolved: agent?.ticketsResolvedThisMonth || 156,
    csatScore: agent ? Math.round(agent.csat * 20) : 94, // Convert 1-5 to percentage
    avgResponseTime: `${agent?.avgResolutionTime || 8} hrs`,
    currentWorkload: utilizationPercent,
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-blue-600">
        <User className="w-5 h-5" />
        <span className="font-medium">Agent Context</span>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-medium text-lg">
              {data.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="font-medium">{data.name}</p>
            <p className="text-sm text-gray-500">{data.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-green-50 rounded-lg">
          <p className="text-xs text-gray-500">Tickets Resolved</p>
          <p className="text-xl font-bold text-green-600">{data.ticketsResolved}</p>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-gray-500">CSAT Score</p>
          <p className="text-xl font-bold text-blue-600">{data.csatScore}%</p>
        </div>
        <div className="p-3 bg-purple-50 rounded-lg">
          <p className="text-xs text-gray-500">Avg Response</p>
          <p className="text-xl font-bold text-purple-600">{data.avgResponseTime}</p>
        </div>
        <div className="p-3 bg-orange-50 rounded-lg">
          <p className="text-xs text-gray-500">Workload</p>
          <p className="text-xl font-bold text-orange-600">{data.currentWorkload}%</p>
        </div>
      </div>
    </div>
  );
}

function CustomerContextView({ customerId }: { customerId: string }) {
  const { companies } = queryCompanies({});
  const { tickets } = queryTickets({});
  const company = companies.find((c: Company) => c.id === customerId) || companies[0];
  const db = getMockDatabase();
  // Find a contact for this company
  const contact = db.contacts.find((c) => c.companyId === company?.id);
  const openTickets = tickets.filter((t: EnhancedTicket) => t.companyId === company?.id && t.status === 'open').length;

  // Format ARR as currency
  const formattedArr = company?.arr ? `$${(company.arr / 1000).toFixed(0)}K` : '$125K';

  const data: CustomerContext = {
    id: company?.id || customerId,
    name: contact?.name || 'John Smith',
    company: company?.name || 'Acme Corp',
    tier: company?.tier || 'enterprise',
    openTickets: openTickets || 3,
    lifetimeValue: formattedArr,
    riskScore: company?.riskLevel === 'churning' ? 'High' : company?.riskLevel === 'at-risk' ? 'Medium' : 'Low',
  };

  const tierColors: Record<string, string> = {
    enterprise: 'bg-purple-100 text-purple-800',
    smb: 'bg-blue-100 text-blue-800',
    startup: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-green-600">
        <Building2 className="w-5 h-5" />
        <span className="font-medium">Customer Context</span>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg space-y-3">
        <div>
          <p className="text-xs text-gray-500">Contact</p>
          <p className="font-medium">{data.name}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Company</p>
          <p className="font-medium">{data.company}</p>
        </div>
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${tierColors[data.tier] || tierColors.standard}`}>
          {data.tier.charAt(0).toUpperCase() + data.tier.slice(1)}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 flex items-center gap-2">
            <Ticket className="w-4 h-4" />
            Open Tickets
          </span>
          <span className="font-medium">{data.openTickets}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Lifetime Value
          </span>
          <span className="font-medium">{data.lifetimeValue}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Churn Risk
          </span>
          <span className={`font-medium ${data.riskScore === 'High' ? 'text-red-600' : data.riskScore === 'Medium' ? 'text-orange-600' : 'text-green-600'}`}>
            {data.riskScore}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ChatContextPanel({ context, onClose, isOpen }: ChatContextPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="w-80 border-l border-gray-200 bg-white flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Context</h3>
        <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {context.type === 'ticket' && context.id && (
          <TicketContextView ticketId={context.id} />
        )}
        {context.type === 'agent' && context.id && (
          <AgentContextView agentId={context.id} />
        )}
        {context.type === 'customer' && context.id && (
          <CustomerContextView customerId={context.id} />
        )}
        {!context.type && (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No context selected</p>
            <p className="text-sm mt-1">Context will appear here when relevant</p>
          </div>
        )}
      </div>
    </div>
  );
}
