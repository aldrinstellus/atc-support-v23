// Ticket Types - Matching Figma Dashboard Spec

export interface Customer {
  name: string;
  email: string;
  avatar: AvatarGradient;
}

export interface AvatarGradient {
  primary: string;
  secondary: string;
  blur?: string;
}

export interface AssignedAgent {
  initials: string;
  name: string;
  avatar?: AvatarGradient;
}

export type TicketPriority = 'High' | 'Medium' | 'Low';
export type TicketStatus = 'AI-Suggested' | 'In Progress' | 'Escalated' | 'Completed';

export interface Ticket {
  id: string;
  customer: Customer;
  subject: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  dateTime: string;
  assignedAgent: AssignedAgent | null;
  sla: string;
}

export interface ChartDataPoint {
  day: number;
  month: 'Oct' | 'Nov' | 'Dec';
  value: number;
}

export interface TooltipData {
  newTickets: number;
  completed: number;
  avgResponseTime: string;
  sla: string;
}

export interface DashboardStats {
  totalTickets: number;
  totalTicketsChange: number;
  completion: number;
  completionChange: number;
  avgResponseTime: string;
  avgResponseTimeChange: number;
  sla: number;
  slaChange: number;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

// Avatar gradient presets from Figma
export const AVATAR_GRADIENTS: Record<string, AvatarGradient> = {
  greenBlue: { primary: '#2AC770', secondary: '#14B8A6', blur: '#2AC770' },
  yellowGreen: { primary: '#FFD22F', secondary: '#2AC770', blur: '#2AC770' },
  purplePink: { primary: '#A855F7', secondary: '#EC4899', blur: '#A855F7' },
  bluePurple: { primary: '#3B82F6', secondary: '#8B5CF6', blur: '#3B82F6' },
  yellowOrange: { primary: '#FCD34D', secondary: '#F59E0B', blur: '#F59E0B' },
  pinkRose: { primary: '#F472B6', secondary: '#FB7185', blur: '#F472B6' },
  redPink: { primary: '#EF4444', secondary: '#EC4899', blur: '#EF4444' },
  indigoPurple: { primary: '#6366F1', secondary: '#A855F7', blur: '#6366F1' },
};
