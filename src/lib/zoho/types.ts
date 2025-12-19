/**
 * Zoho API Type Definitions
 *
 * Environment Variables Required:
 * - ZOHO_CLIENT_ID: OAuth client ID from Zoho Developer Console
 * - ZOHO_CLIENT_SECRET: OAuth client secret
 * - ZOHO_REFRESH_TOKEN: Long-lived refresh token (never expires)
 * - ZOHO_ORG_ID: Zoho Desk organization ID
 */

export interface ZohoTokenResponse {
  access_token: string;
  api_domain: string;
  token_type: string;
  expires_in: number;
}

export interface ZohoTokenCache {
  accessToken: string;
  expiresAt: number;
}

export interface ZohoTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  contactId: string;
  assigneeId?: string;
  departmentId: string;
  createdTime: string;
  modifiedTime: string;
}

export interface ZohoSendReplyRequest {
  ticketId: string;
  content: string;
  isPublicReply?: boolean;
  contentType?: 'plainText' | 'html';
}

export interface ZohoSendReplyResponse {
  id: string;
  content: string;
  contentType: string;
  createdTime: string;
  author: { id: string; name: string; email: string };
  isPublic: boolean;
}

export interface ZohoUpdateTicketStatusRequest {
  ticketId: string;
  status: 'Open' | 'On Hold' | 'Escalated' | 'Closed';
  resolution?: string;
}

export interface ZohoError {
  errorCode: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ZohoApiResponse<T> {
  data?: T;
  error?: ZohoError;
}

export const ZOHO_ENDPOINTS = {
  TOKEN: 'https://accounts.zoho.com/oauth/v2/token',
  TICKETS: () => `https://desk.zoho.com/api/v1/tickets`,
  TICKET_DETAIL: (ticketId: string) => `https://desk.zoho.com/api/v1/tickets/${ticketId}`,
  TICKET_REPLIES: (ticketId: string) => `https://desk.zoho.com/api/v1/tickets/${ticketId}/comments`,
} as const;

export const TOKEN_CONFIG = {
  REFRESH_BUFFER_MS: 5 * 60 * 1000,
  MAX_RETRIES: 2,
  RETRY_DELAY_MS: 1000,
} as const;
