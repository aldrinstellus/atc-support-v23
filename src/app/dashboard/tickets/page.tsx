'use client';

import { useState } from 'react';
import {
  Search,
  Filter,
  Clock,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  User,
  Calendar,
  Tag,
  MoreHorizontal,
  ChevronDown,
} from 'lucide-react';

// Mock ticket data
const mockTickets = [
  {
    id: 'TICK-001',
    subject: 'VPN Connection Issues - Unable to Access Internal Resources',
    customer: 'John Smith',
    customerEmail: 'john.smith@company.com',
    priority: 'high',
    status: 'open',
    category: 'Network',
    createdAt: '2025-12-11T09:30:00Z',
    updatedAt: '2025-12-11T10:15:00Z',
    assignee: 'Sarah Johnson',
    slaDeadline: '2025-12-11T13:30:00Z',
    responseCount: 3,
  },
  {
    id: 'TICK-002',
    subject: 'Password Reset Request - Locked Out of Account',
    customer: 'Emily Davis',
    customerEmail: 'emily.davis@company.com',
    priority: 'medium',
    status: 'pending',
    category: 'Access',
    createdAt: '2025-12-11T08:45:00Z',
    updatedAt: '2025-12-11T09:00:00Z',
    assignee: 'Mike Chen',
    slaDeadline: '2025-12-11T16:45:00Z',
    responseCount: 1,
  },
  {
    id: 'TICK-003',
    subject: 'Software Installation Request - Adobe Creative Suite',
    customer: 'Robert Wilson',
    customerEmail: 'robert.wilson@company.com',
    priority: 'low',
    status: 'in_progress',
    category: 'Software',
    createdAt: '2025-12-10T14:20:00Z',
    updatedAt: '2025-12-11T08:30:00Z',
    assignee: 'Sarah Johnson',
    slaDeadline: '2025-12-12T14:20:00Z',
    responseCount: 5,
  },
  {
    id: 'TICK-004',
    subject: 'Email Not Syncing on Mobile Device',
    customer: 'Lisa Anderson',
    customerEmail: 'lisa.anderson@company.com',
    priority: 'medium',
    status: 'resolved',
    category: 'Email',
    createdAt: '2025-12-10T11:00:00Z',
    updatedAt: '2025-12-11T07:45:00Z',
    assignee: 'Mike Chen',
    slaDeadline: '2025-12-10T19:00:00Z',
    responseCount: 4,
  },
  {
    id: 'TICK-005',
    subject: 'Printer Not Found on Network - Floor 3',
    customer: 'David Martinez',
    customerEmail: 'david.martinez@company.com',
    priority: 'low',
    status: 'open',
    category: 'Hardware',
    createdAt: '2025-12-11T07:15:00Z',
    updatedAt: '2025-12-11T07:15:00Z',
    assignee: null,
    slaDeadline: '2025-12-12T07:15:00Z',
    responseCount: 0,
  },
];

const priorityConfig = {
  high: { color: 'text-red-400', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/30', label: 'High' },
  medium: { color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/30', label: 'Medium' },
  low: { color: 'text-green-400', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/30', label: 'Low' },
};

const statusConfig = {
  open: { color: 'text-blue-400', bgColor: 'bg-blue-500/10', label: 'Open', icon: Clock },
  pending: { color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', label: 'Pending', icon: AlertTriangle },
  in_progress: { color: 'text-purple-400', bgColor: 'bg-purple-500/10', label: 'In Progress', icon: Clock },
  resolved: { color: 'text-green-400', bgColor: 'bg-green-500/10', label: 'Resolved', icon: CheckCircle },
};

export default function TicketsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const filteredTickets = mockTickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tickets</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and track support tickets</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {filteredTickets.length} of {mockTickets.length} tickets
          </span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tickets by ID, subject, or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>

        {/* Priority Filter */}
        <div className="relative">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground hover:bg-muted transition-colors">
          <Filter className="h-4 w-4" />
          More Filters
        </button>
      </div>

      {/* Tickets Table */}
      <div className="bg-card-elevated rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Ticket
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Customer
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Priority
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Assignee
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Updated
              </th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredTickets.map((ticket) => {
              const priority = priorityConfig[ticket.priority as keyof typeof priorityConfig];
              const status = statusConfig[ticket.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;

              return (
                <tr key={ticket.id} className="hover:bg-muted/20 transition-colors cursor-pointer">
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${priority.bgColor} ${priority.color} border ${priority.borderColor}`}>
                          <Tag className="inline h-3 w-3 mr-1" />
                          {ticket.category}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-foreground line-clamp-1">
                        {ticket.subject}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{ticket.customer}</p>
                        <p className="text-xs text-muted-foreground">{ticket.customerEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${priority.bgColor} ${priority.color}`}>
                      {priority.label}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.color}`}>
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {ticket.assignee ? (
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-sm text-foreground">{ticket.assignee}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground italic">Unassigned</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(ticket.updatedAt)}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title="View messages"
                      >
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title="More actions"
                      >
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredTickets.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No tickets found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
