/**
 * Email Service
 * PRD 1.5.1: Email Sending with CC/BCC and Attachments
 *
 * Handles email sending, validation, and attachment management.
 */

import type {
  EmailRecipient,
  EmailAttachment,
  SendEmailRequest,
  SendEmailResponse,
  EmailValidationResult,
  EmailValidationError,
} from '@/types/email';
import {
  EMAIL_CONFIG,
  isValidEmail,
  validateRecipients,
  validateAttachments,
  getAttachmentType,
  generateAttachmentId,
} from '@/types/email';

// ============================================================================
// In-Memory Storage (Demo Mode)
// ============================================================================

const attachmentStorage: Map<string, EmailAttachment> = new Map();
const draftAttachments: Map<string, string[]> = new Map(); // draftId -> attachmentIds

// ============================================================================
// Email Validation
// ============================================================================

/**
 * Validate entire email send request
 */
export function validateEmailRequest(request: SendEmailRequest): EmailValidationResult {
  const errors: EmailValidationError[] = [];
  const warnings: string[] = [];

  // Validate TO recipients (required)
  if (!request.to || request.to.length === 0) {
    errors.push({
      code: 'MISSING_REQUIRED_RECIPIENT',
      field: 'to',
      message: 'At least one TO recipient is required',
    });
  } else {
    errors.push(...validateRecipients(request.to, 'to'));
  }

  // Validate CC recipients (optional)
  if (request.cc && request.cc.length > 0) {
    errors.push(...validateRecipients(request.cc, 'cc'));
  }

  // Validate BCC recipients (optional)
  if (request.bcc && request.bcc.length > 0) {
    errors.push(...validateRecipients(request.bcc, 'bcc'));
  }

  // Check for cross-list duplicates
  const allEmails = new Set<string>();
  const checkDuplicates = (recipients: EmailRecipient[], type: string) => {
    recipients.forEach((r) => {
      const email = r.email.toLowerCase();
      if (allEmails.has(email)) {
        warnings.push(`${r.email} appears in multiple recipient lists`);
      }
      allEmails.add(email);
    });
  };

  if (request.to) checkDuplicates(request.to, 'to');
  if (request.cc) checkDuplicates(request.cc, 'cc');
  if (request.bcc) checkDuplicates(request.bcc, 'bcc');

  // Validate attachments if provided
  if (request.attachmentIds && request.attachmentIds.length > 0) {
    const attachments = request.attachmentIds
      .map((id) => attachmentStorage.get(id))
      .filter((a): a is EmailAttachment => a !== undefined);

    if (attachments.length !== request.attachmentIds.length) {
      const missingCount = request.attachmentIds.length - attachments.length;
      errors.push({
        code: 'INVALID_FILE_TYPE',
        field: 'attachmentIds',
        message: `${missingCount} attachment(s) not found`,
      });
    }

    errors.push(...validateAttachments(attachments));
  }

  // Validate body content
  if (!request.body?.trim()) {
    errors.push({
      code: 'EMPTY_BODY',
      field: 'body',
      message: 'Email body cannot be empty',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}

// ============================================================================
// Attachment Management
// ============================================================================

/**
 * Store attachment metadata (in demo mode, just metadata - not actual files)
 */
export function storeAttachment(
  draftId: string,
  filename: string,
  mimeType: string,
  size: number,
  url?: string
): EmailAttachment {
  const attachment: EmailAttachment = {
    id: generateAttachmentId(),
    filename: filename.replace(/[^a-zA-Z0-9._-]/g, '_'), // Sanitize filename
    originalName: filename,
    mimeType,
    size,
    type: getAttachmentType(mimeType, filename),
    url,
    uploadedAt: new Date(),
  };

  // Store attachment
  attachmentStorage.set(attachment.id, attachment);

  // Associate with draft
  const existingAttachments = draftAttachments.get(draftId) || [];
  existingAttachments.push(attachment.id);
  draftAttachments.set(draftId, existingAttachments);

  return attachment;
}

/**
 * Get all attachments for a draft
 */
export function getDraftAttachments(draftId: string): EmailAttachment[] {
  const attachmentIds = draftAttachments.get(draftId) || [];
  return attachmentIds
    .map((id) => attachmentStorage.get(id))
    .filter((a): a is EmailAttachment => a !== undefined);
}

/**
 * Get single attachment by ID
 */
export function getAttachment(attachmentId: string): EmailAttachment | undefined {
  return attachmentStorage.get(attachmentId);
}

/**
 * Remove attachment from draft
 */
export function removeAttachment(draftId: string, attachmentId: string): boolean {
  // Remove from draft association
  const attachmentIds = draftAttachments.get(draftId) || [];
  const index = attachmentIds.indexOf(attachmentId);
  if (index > -1) {
    attachmentIds.splice(index, 1);
    draftAttachments.set(draftId, attachmentIds);
  }

  // Remove from storage
  return attachmentStorage.delete(attachmentId);
}

/**
 * Clear all attachments for a draft
 */
export function clearDraftAttachments(draftId: string): number {
  const attachmentIds = draftAttachments.get(draftId) || [];
  let count = 0;

  attachmentIds.forEach((id) => {
    if (attachmentStorage.delete(id)) {
      count++;
    }
  });

  draftAttachments.delete(draftId);
  return count;
}

/**
 * Get total size of draft attachments
 */
export function getDraftAttachmentSize(draftId: string): number {
  return getDraftAttachments(draftId).reduce((sum, att) => sum + att.size, 0);
}

/**
 * Check if draft can accept more attachments
 */
export function canAddAttachment(draftId: string, newFileSize: number): boolean {
  const currentAttachments = getDraftAttachments(draftId);

  // Check count limit
  if (currentAttachments.length >= EMAIL_CONFIG.MAX_ATTACHMENTS) {
    return false;
  }

  // Check individual file size
  if (newFileSize > EMAIL_CONFIG.MAX_ATTACHMENT_SIZE) {
    return false;
  }

  // Check total size
  const currentSize = getDraftAttachmentSize(draftId);
  if (currentSize + newFileSize > EMAIL_CONFIG.MAX_TOTAL_SIZE) {
    return false;
  }

  return true;
}

// ============================================================================
// Email Sending (Zoho Desk Integration)
// ============================================================================

interface ZohoSendOptions {
  ticketId: string;
  content: string;
  ccRecipients?: EmailRecipient[];
  bccRecipients?: EmailRecipient[];
  attachments?: EmailAttachment[];
}

/**
 * Send email via Zoho Desk API
 */
export async function sendViaZohoDesk(
  options: ZohoSendOptions
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const DEMO_MODE = process.env.DEMO_MODE === 'true';

  if (DEMO_MODE) {
    // Simulate successful send in demo mode
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
    return {
      success: true,
      messageId: `MSG-${Date.now()}`,
    };
  }

  // Real Zoho Desk integration
  try {
    const orgId = process.env.ZOHO_ORG_ID;
    const accessToken = process.env.ZOHO_ACCESS_TOKEN;

    if (!orgId || !accessToken) {
      return { success: false, error: 'Zoho Desk credentials not configured' };
    }

    // Build request body
    const requestBody: Record<string, unknown> = {
      channel: 'EMAIL',
      content: options.content,
      isPublic: true,
      contentType: 'html',
    };

    // Add CC recipients
    if (options.ccRecipients && options.ccRecipients.length > 0) {
      requestBody.cc = options.ccRecipients.map((r) => r.email).join(',');
    }

    // Add BCC recipients
    if (options.bccRecipients && options.bccRecipients.length > 0) {
      requestBody.bcc = options.bccRecipients.map((r) => r.email).join(',');
    }

    // Add attachments (Zoho requires attachment IDs from prior upload)
    if (options.attachments && options.attachments.length > 0) {
      // In real implementation, we would upload attachments first and get Zoho attachment IDs
      // For now, we include attachment URLs if available
      requestBody.attachments = options.attachments
        .filter((a) => a.url)
        .map((a) => ({
          href: a.url,
          name: a.originalName,
          size: a.size,
        }));
    }

    const response = await fetch(
      `https://desk.zoho.com/api/v1/tickets/${options.ticketId}/sendReply`,
      {
        method: 'POST',
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          orgId: orgId,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.message || 'Failed to send via Zoho' };
    }

    const data = await response.json();
    return { success: true, messageId: data.id };
  } catch (error) {
    console.error('[Zoho Desk] Send error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Full email send flow with validation
 */
export async function sendEmail(
  request: SendEmailRequest,
  ticketId: string,
  content: string
): Promise<SendEmailResponse> {
  // Validate request
  const validation = validateEmailRequest({ ...request, body: content });

  if (!validation.isValid) {
    return {
      success: false,
      error: 'Email validation failed',
      validationErrors: validation.errors,
    };
  }

  // Get attachments
  const attachments = request.attachmentIds
    ? request.attachmentIds
        .map((id) => getAttachment(id))
        .filter((a): a is EmailAttachment => a !== undefined)
    : [];

  // Send via Zoho
  const sendResult = await sendViaZohoDesk({
    ticketId,
    content,
    ccRecipients: request.cc,
    bccRecipients: request.bcc,
    attachments,
  });

  if (!sendResult.success) {
    return {
      success: false,
      error: sendResult.error,
    };
  }

  return {
    success: true,
    messageId: sendResult.messageId,
    sentAt: new Date(),
    recipients: {
      to: request.to.length,
      cc: request.cc?.length || 0,
      bcc: request.bcc?.length || 0,
    },
    attachmentCount: attachments.length,
  };
}

// ============================================================================
// Email Signature Configuration (PRD 1.5.1)
// ============================================================================

/**
 * Email signature configuration for agents
 */
export interface EmailSignatureConfig {
  enabled: boolean;
  name: string;
  title?: string;
  department?: string;
  company: string;
  phone?: string;
  email?: string;
  website?: string;
  logoUrl?: string;
  customHtml?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
  };
}

/**
 * Default email signature configuration
 */
const DEFAULT_SIGNATURE_CONFIG: EmailSignatureConfig = {
  enabled: true,
  name: '',
  title: 'Support Agent',
  department: 'Customer Support',
  company: 'ATC Support',
  website: 'https://atc-support.com',
};

// In-memory signature storage (per agent/user)
const signatureStorage: Map<string, EmailSignatureConfig> = new Map();

/**
 * Get email signature for an agent
 */
export function getEmailSignature(agentId: string): EmailSignatureConfig {
  return signatureStorage.get(agentId) || { ...DEFAULT_SIGNATURE_CONFIG };
}

/**
 * Save email signature for an agent
 */
export function saveEmailSignature(agentId: string, config: Partial<EmailSignatureConfig>): EmailSignatureConfig {
  const existing = getEmailSignature(agentId);
  const updated: EmailSignatureConfig = {
    ...existing,
    ...config,
  };
  signatureStorage.set(agentId, updated);
  return updated;
}

/**
 * Generate HTML signature block
 */
export function generateSignatureHtml(config: EmailSignatureConfig): string {
  if (!config.enabled) {
    return '';
  }

  // If custom HTML provided, use it
  if (config.customHtml) {
    return config.customHtml;
  }

  // Build standard signature
  const lines: string[] = [];

  lines.push('<div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e5e5; font-family: Arial, sans-serif; font-size: 12px; color: #666;">');

  // Name and title
  if (config.name) {
    lines.push(`<p style="margin: 0 0 4px 0; font-weight: 600; color: #333; font-size: 14px;">${config.name}</p>`);
  }
  if (config.title) {
    lines.push(`<p style="margin: 0 0 2px 0;">${config.title}</p>`);
  }
  if (config.department) {
    lines.push(`<p style="margin: 0 0 8px 0;">${config.department}</p>`);
  }

  // Company info
  lines.push(`<p style="margin: 0 0 4px 0; font-weight: 600; color: #333;">${config.company}</p>`);

  // Contact details
  if (config.phone) {
    lines.push(`<p style="margin: 0 0 2px 0;">Phone: ${config.phone}</p>`);
  }
  if (config.email) {
    lines.push(`<p style="margin: 0 0 2px 0;">Email: <a href="mailto:${config.email}" style="color: #0066cc;">${config.email}</a></p>`);
  }
  if (config.website) {
    lines.push(`<p style="margin: 0 0 8px 0;">Web: <a href="${config.website}" style="color: #0066cc;">${config.website}</a></p>`);
  }

  // Social links
  if (config.socialLinks?.linkedin || config.socialLinks?.twitter) {
    const socialParts: string[] = [];
    if (config.socialLinks.linkedin) {
      socialParts.push(`<a href="${config.socialLinks.linkedin}" style="color: #0077b5;">LinkedIn</a>`);
    }
    if (config.socialLinks.twitter) {
      socialParts.push(`<a href="${config.socialLinks.twitter}" style="color: #1da1f2;">Twitter</a>`);
    }
    lines.push(`<p style="margin: 0;">${socialParts.join(' | ')}</p>`);
  }

  // Logo
  if (config.logoUrl) {
    lines.push(`<img src="${config.logoUrl}" alt="${config.company}" style="max-width: 120px; height: auto; margin-top: 8px;" />`);
  }

  lines.push('</div>');

  return lines.join('\n');
}

/**
 * Append signature to email content
 */
export function appendSignature(content: string, agentId: string): string {
  const signature = getEmailSignature(agentId);
  const signatureHtml = generateSignatureHtml(signature);

  if (!signatureHtml) {
    return content;
  }

  return `${content}\n\n${signatureHtml}`;
}

/**
 * Reset signature to default
 */
export function resetEmailSignature(agentId: string): EmailSignatureConfig {
  const defaultConfig = { ...DEFAULT_SIGNATURE_CONFIG };
  signatureStorage.set(agentId, defaultConfig);
  return defaultConfig;
}

/**
 * Delete signature for an agent
 */
export function deleteEmailSignature(agentId: string): boolean {
  return signatureStorage.delete(agentId);
}

// ============================================================================
// CRM Internal Notes (PRD 1.5.2)
// Add internal notes to tickets documenting draft actions
// ============================================================================

export interface InternalNoteOptions {
  ticketId: string;
  agentId: string;
  agentName: string;
  action: 'DRAFT_GENERATED' | 'DRAFT_APPROVED' | 'DRAFT_REJECTED' | 'DRAFT_SENT' | 'DRAFT_ESCALATED' | 'DRAFT_REGENERATED';
  details: {
    draftId?: string;
    confidenceScore?: number;
    tone?: string;
    detailLevel?: string;
    editPercent?: number;
    rejectionReason?: string;
    escalationReason?: string;
    escalationPriority?: string;
    sentAt?: Date;
    recipientCount?: number;
    ccCount?: number;
    bccCount?: number;
    attachmentCount?: number;
  };
}

/**
 * Add internal note to a ticket via Zoho Desk
 */
export async function addInternalNote(
  options: InternalNoteOptions
): Promise<{ success: boolean; noteId?: string; error?: string }> {
  const DEMO_MODE = process.env.DEMO_MODE === 'true';

  // Format note content
  const noteContent = formatInternalNote(options);

  if (DEMO_MODE) {
    // Simulate successful note creation in demo mode
    console.log(`[CRM Note] Demo mode - ${options.action} note for ticket ${options.ticketId}`);
    console.log(noteContent);
    await new Promise((resolve) => setTimeout(resolve, 100));
    return {
      success: true,
      noteId: `NOTE-${Date.now()}`,
    };
  }

  // Real Zoho Desk integration
  try {
    const orgId = process.env.ZOHO_ORG_ID;
    const accessToken = process.env.ZOHO_ACCESS_TOKEN;

    if (!orgId || !accessToken) {
      // Silent fail in demo mode - don't block the main operation
      console.warn('[CRM Note] Zoho Desk credentials not configured, skipping internal note');
      return { success: false, error: 'Zoho Desk credentials not configured' };
    }

    const response = await fetch(
      `https://desk.zoho.com/api/v1/tickets/${options.ticketId}/comments`,
      {
        method: 'POST',
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          orgId: orgId,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: noteContent,
          isPublic: false, // Internal note, not visible to customer
          contentType: 'html',
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[CRM Note] Failed to add internal note:', errorData);
      return { success: false, error: errorData.message || 'Failed to add internal note' };
    }

    const data = await response.json();
    return { success: true, noteId: data.id };
  } catch (error) {
    console.error('[CRM Note] Error adding internal note:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Format internal note content based on action type
 */
function formatInternalNote(options: InternalNoteOptions): string {
  const { action, agentName, details } = options;
  const timestamp = new Date().toISOString();

  const lines: string[] = [
    '<div style="font-family: Arial, sans-serif; font-size: 13px; color: #333;">',
    `<p style="color: #666; font-size: 11px; margin: 0 0 8px 0;">🤖 <strong>AI Support System</strong> • ${timestamp}</p>`,
  ];

  switch (action) {
    case 'DRAFT_GENERATED':
      lines.push('<p style="margin: 0 0 8px 0;"><strong>📝 AI Draft Generated</strong></p>');
      lines.push('<ul style="margin: 0; padding-left: 20px;">');
      if (details.draftId) lines.push(`<li>Draft ID: ${details.draftId}</li>`);
      if (details.confidenceScore !== undefined) lines.push(`<li>Confidence Score: ${details.confidenceScore}%</li>`);
      if (details.tone) lines.push(`<li>Tone: ${details.tone}</li>`);
      lines.push('</ul>');
      break;

    case 'DRAFT_APPROVED':
      lines.push('<p style="margin: 0 0 8px 0;"><strong>✅ Draft Approved</strong></p>');
      lines.push('<ul style="margin: 0; padding-left: 20px;">');
      lines.push(`<li>Approved by: ${agentName}</li>`);
      if (details.draftId) lines.push(`<li>Draft ID: ${details.draftId}</li>`);
      if (details.editPercent !== undefined && details.editPercent > 0) {
        lines.push(`<li>Edit percentage: ${details.editPercent.toFixed(1)}%</li>`);
      }
      lines.push('</ul>');
      break;

    case 'DRAFT_REJECTED':
      lines.push('<p style="margin: 0 0 8px 0;"><strong>❌ Draft Rejected</strong></p>');
      lines.push('<ul style="margin: 0; padding-left: 20px;">');
      lines.push(`<li>Rejected by: ${agentName}</li>`);
      if (details.draftId) lines.push(`<li>Draft ID: ${details.draftId}</li>`);
      if (details.rejectionReason) lines.push(`<li>Reason: ${details.rejectionReason}</li>`);
      lines.push('</ul>');
      break;

    case 'DRAFT_SENT':
      lines.push('<p style="margin: 0 0 8px 0;"><strong>📤 Response Sent to Customer</strong></p>');
      lines.push('<ul style="margin: 0; padding-left: 20px;">');
      lines.push(`<li>Sent by: ${agentName}</li>`);
      if (details.draftId) lines.push(`<li>Draft ID: ${details.draftId}</li>`);
      if (details.sentAt) lines.push(`<li>Sent at: ${new Date(details.sentAt).toLocaleString()}</li>`);
      if (details.recipientCount !== undefined) lines.push(`<li>Recipients: ${details.recipientCount}</li>`);
      if (details.ccCount !== undefined && details.ccCount > 0) lines.push(`<li>CC: ${details.ccCount}</li>`);
      if (details.bccCount !== undefined && details.bccCount > 0) lines.push(`<li>BCC: ${details.bccCount}</li>`);
      if (details.attachmentCount !== undefined && details.attachmentCount > 0) {
        lines.push(`<li>Attachments: ${details.attachmentCount}</li>`);
      }
      lines.push('</ul>');
      break;

    case 'DRAFT_ESCALATED':
      lines.push('<p style="margin: 0 0 8px 0;"><strong>⚠️ Draft Escalated</strong></p>');
      lines.push('<ul style="margin: 0; padding-left: 20px;">');
      lines.push(`<li>Escalated by: ${agentName}</li>`);
      if (details.draftId) lines.push(`<li>Draft ID: ${details.draftId}</li>`);
      if (details.escalationPriority) lines.push(`<li>Priority: ${details.escalationPriority}</li>`);
      if (details.escalationReason) lines.push(`<li>Reason: ${details.escalationReason}</li>`);
      lines.push('</ul>');
      break;

    case 'DRAFT_REGENERATED':
      lines.push('<p style="margin: 0 0 8px 0;"><strong>🔄 Draft Regenerated</strong></p>');
      lines.push('<ul style="margin: 0; padding-left: 20px;">');
      lines.push(`<li>Requested by: ${agentName}</li>`);
      if (details.draftId) lines.push(`<li>Draft ID: ${details.draftId}</li>`);
      if (details.tone) lines.push(`<li>New tone: ${details.tone}</li>`);
      if (details.detailLevel) lines.push(`<li>Detail level: ${details.detailLevel}</li>`);
      if (details.confidenceScore !== undefined) lines.push(`<li>New confidence: ${details.confidenceScore}%</li>`);
      lines.push('</ul>');
      break;
  }

  lines.push('</div>');
  return lines.join('\n');
}

// ============================================================================
// Demo Data
// ============================================================================

/**
 * Add demo attachments for testing
 */
export function addDemoAttachments(draftId: string): void {
  // Add a sample PDF attachment
  storeAttachment(
    draftId,
    'troubleshooting-guide.pdf',
    'application/pdf',
    256 * 1024, // 256KB
    '/demo/attachments/troubleshooting-guide.pdf'
  );

  // Add a sample image attachment
  storeAttachment(
    draftId,
    'screenshot.png',
    'image/png',
    128 * 1024, // 128KB
    '/demo/attachments/screenshot.png'
  );
}
