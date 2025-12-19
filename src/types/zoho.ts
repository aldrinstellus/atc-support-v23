/**
 * Zoho Desk API Type Definitions
 * Based on n8n workflow webhook payload structure
 */

export type ZohoChannel = 'EMAIL' | 'Email' | 'WEB' | 'PHONE' | 'CHAT' | 'TWITTER' | 'FACEBOOK';

export type ZohoTicketStatus = 'Open' | 'On Hold' | 'Escalated' | 'Closed';

export type ZohoPriority = 'High' | 'Medium' | 'Low';

export type ZohoAuthorType = 'AGENT' | 'CUSTOMER' | 'SYSTEM';

// Webhook Event Types
export type ZohoEventType =
  | 'Ticket_Add'
  | 'Ticket_Thread_Add'
  | 'Ticket_Update'
  | 'Ticket_Delete';

// Contact Information
export interface ZohoContact {
  id: string;
  lastName: string;
  firstName?: string;
  email: string;
  phone?: string;
  mobile?: string;
  accountId?: string;
}

// Thread Author
export interface ZohoAuthor {
  type: ZohoAuthorType;
  email?: string;
  name?: string;
}

// Thread Information
export interface ZohoThread {
  id?: string;
  content: string;
  contentType?: 'plainText' | 'html';
  to?: string;
  from?: string;
  cc?: string;
  bcc?: string;
  isForward?: boolean;
  direction?: 'in' | 'out';
  channel?: ZohoChannel;
  createdTime?: string;
  author?: ZohoAuthor;
}

// Ticket Payload (from webhook)
export interface ZohoTicketPayload {
  id?: string;
  ticketId?: string;
  ticketNumber: string;
  subject: string;
  description?: string;
  status: ZohoTicketStatus;
  priority: ZohoPriority;
  category?: string;
  subCategory?: string;
  channel: ZohoChannel;
  departmentId: string;
  productId?: string;
  contactId: string;
  contact: ZohoContact;
  email: string;
  assigneeId?: string;
  teamId?: string;
  dueDate?: string;
  closedTime?: string;
  createdTime: string;
  modifiedTime: string;
  webUrl: string;

  // First thread (for new tickets)
  firstThread?: ZohoThread;

  // Thread add specific
  content?: string;
  author?: ZohoAuthor;
  isForward?: boolean;
  to?: string;
}

// Webhook Body
export interface ZohoWebhookBody {
  eventType: ZohoEventType;
  orgId: string;
  payload: ZohoTicketPayload;
}

// Webhook Request
export interface ZohoWebhookRequest {
  headers: {
    host: string;
    'x-forwarded-for'?: string;
    'user-agent'?: string;
    'content-type': string;
  };
  body: ZohoWebhookBody[];
}

// Conversation API Response
export interface ZohoConversation {
  id: string;
  type: 'thread' | 'comment' | 'task';
  summary?: string;
  content?: string;
  contentType?: 'plainText' | 'html';
  direction?: 'in' | 'out';
  from?: string;
  to?: string;
  cc?: string;
  bcc?: string;
  author: ZohoAuthor;
  createdTime: string;
  modifiedTime?: string;
  isForward?: boolean;
  channel?: ZohoChannel;
  attachments?: Array<{
    id: string;
    name: string;
    size: number;
  }>;
}

export interface ZohoConversationsResponse {
  data: ZohoConversation[];
  count: number;
}

// Thread Details API Response
export interface ZohoThreadResponse {
  id: string;
  content: string;
  contentType: 'plainText' | 'html';
  summary?: string;
  direction: 'in' | 'out';
  from?: string;
  to?: string;
  cc?: string;
  bcc?: string;
  author: ZohoAuthor;
  createdTime: string;
  modifiedTime?: string;
  channel: ZohoChannel;
  isForward: boolean;
  attachments?: Array<{
    id: string;
    name: string;
    size: number;
    href: string;
  }>;
}

// Send Reply Request
export interface ZohoSendReplyRequest {
  contentType: 'plainText' | 'html';
  content: string;
  fromEmailAddress: string; // Required - must be a valid Zoho Desk email
  to: string;
  cc?: string;
  bcc?: string;
  isForward?: boolean;
  channel: ZohoChannel; // Required - typically 'EMAIL' for email replies
}

// Send Reply Response
export interface ZohoSendReplyResponse {
  id: string;
  direction: 'out';
  content: string;
  createdTime: string;
  from: string;
  to: string;
}

// OAuth Token Response
export interface ZohoTokenResponse {
  access_token: string;
  refresh_token?: string;
  api_domain: string;
  token_type: string;
  expires_in: number;
}

// Extracted Ticket Information (from n8n Code node)
export interface ExtractedTicketInfo {
  ticket_id: string;
  subject: string;
  original_query: string;
  customer_email: string;
  vendor_email: string;
  channel: ZohoChannel;
  isForward: string; // "true" or "false" as string
}

// API Configuration
export interface ZohoDeskConfig {
  orgId: number;
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  baseUrl?: string; // Default: https://desk.zoho.com
}

// API Error Response
export interface ZohoErrorResponse {
  errorCode: string;
  message: string;
  details?: Record<string, unknown>;
}
