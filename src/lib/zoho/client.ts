/**
 * Zoho Desk OAuth Client
 *
 * Features:
 * - In-memory token caching
 * - Automatic token refresh (5 min before expiry)
 * - Retry logic on 401 (up to 2 retries)
 * - Demo mode fallback when credentials missing
 */

import type {
  ZohoTokenResponse,
  ZohoTokenCache,
  ZohoTicket,
  ZohoSendReplyRequest,
  ZohoSendReplyResponse,
  ZohoUpdateTicketStatusRequest,
  ZohoApiResponse,
} from './types';

import { ZOHO_ENDPOINTS, TOKEN_CONFIG } from './types';

class ZohoClient {
  private tokenCache: ZohoTokenCache | null = null;
  private refreshPromise: Promise<string> | null = null;
  private demoMode: boolean = false;

  constructor() {
    this.demoMode = !this.hasRequiredCredentials();
    if (this.demoMode) {
      console.warn('[ZohoClient] Running in DEMO MODE - credentials not configured');
    }
  }

  private hasRequiredCredentials(): boolean {
    return Boolean(
      process.env.ZOHO_CLIENT_ID &&
      process.env.ZOHO_CLIENT_SECRET &&
      process.env.ZOHO_REFRESH_TOKEN &&
      process.env.ZOHO_ORG_ID
    );
  }

  async getAccessToken(): Promise<string> {
    if (this.demoMode) return 'DEMO_TOKEN';
    if (this.isTokenValid()) return this.tokenCache!.accessToken;
    if (this.refreshPromise) return this.refreshPromise;

    this.refreshPromise = this.refreshAccessToken();
    try {
      return await this.refreshPromise;
    } finally {
      this.refreshPromise = null;
    }
  }

  private isTokenValid(): boolean {
    if (!this.tokenCache) return false;
    return this.tokenCache.expiresAt > (Date.now() + TOKEN_CONFIG.REFRESH_BUFFER_MS);
  }

  private async refreshAccessToken(): Promise<string> {
    const params = new URLSearchParams({
      refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
      client_id: process.env.ZOHO_CLIENT_ID!,
      client_secret: process.env.ZOHO_CLIENT_SECRET!,
      grant_type: 'refresh_token',
    });

    const response = await fetch(ZOHO_ENDPOINTS.TOKEN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.status}`);
    }

    const data: ZohoTokenResponse = await response.json();
    this.tokenCache = {
      accessToken: data.access_token,
      expiresAt: Date.now() + (data.expires_in * 1000),
    };

    return data.access_token;
  }

  private async makeAuthenticatedRequest<T>(
    url: string,
    options: RequestInit = {},
    retryCount = 0
  ): Promise<ZohoApiResponse<T>> {
    if (this.demoMode) {
      return { error: { errorCode: 'DEMO_MODE', message: 'Demo mode - credentials not configured' } };
    }

    try {
      const token = await this.getAccessToken();
      const response = await fetch(url, {
        ...options,
        headers: {
          'Authorization': `Zoho-oauthtoken ${token}`,
          'Content-Type': 'application/json',
          'orgId': process.env.ZOHO_ORG_ID!,
          ...options.headers,
        },
      });

      if (response.status === 401 && retryCount < TOKEN_CONFIG.MAX_RETRIES) {
        this.tokenCache = null;
        await new Promise(r => setTimeout(r, TOKEN_CONFIG.RETRY_DELAY_MS));
        return this.makeAuthenticatedRequest<T>(url, options, retryCount + 1);
      }

      const data = await response.json();
      if (!response.ok) {
        return { error: { errorCode: `HTTP_${response.status}`, message: data.message || 'Request failed' } };
      }
      return { data };
    } catch (error) {
      return { error: { errorCode: 'NETWORK_ERROR', message: error instanceof Error ? error.message : 'Unknown error' } };
    }
  }

  async sendReply(request: ZohoSendReplyRequest): Promise<ZohoApiResponse<ZohoSendReplyResponse>> {
    const { ticketId, content, isPublicReply = true, contentType = 'plainText' } = request;
    return this.makeAuthenticatedRequest<ZohoSendReplyResponse>(
      ZOHO_ENDPOINTS.TICKET_REPLIES(ticketId),
      { method: 'POST', body: JSON.stringify({ content, contentType, isPublic: isPublicReply }) }
    );
  }

  async updateTicketStatus(request: ZohoUpdateTicketStatusRequest): Promise<ZohoApiResponse<ZohoTicket>> {
    const { ticketId, status, resolution } = request;
    const body: Record<string, string> = { status };
    if (status === 'Closed' && resolution) body.resolution = resolution;

    return this.makeAuthenticatedRequest<ZohoTicket>(
      ZOHO_ENDPOINTS.TICKET_DETAIL(ticketId),
      { method: 'PATCH', body: JSON.stringify(body) }
    );
  }

  async getTicket(ticketId: string): Promise<ZohoApiResponse<ZohoTicket>> {
    return this.makeAuthenticatedRequest<ZohoTicket>(ZOHO_ENDPOINTS.TICKET_DETAIL(ticketId));
  }

  isDemoMode(): boolean { return this.demoMode; }
  clearTokenCache(): void { this.tokenCache = null; }
}

export const zohoClient = new ZohoClient();
export { ZohoClient };
