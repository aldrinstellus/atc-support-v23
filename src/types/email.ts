/**
 * Email Types
 * PRD 1.5.1: CC/BCC and Attachments Support
 *
 * Comprehensive types for email sending with advanced features.
 */

// ============================================================================
// Recipient Types
// ============================================================================

export interface EmailRecipient {
  email: string;
  name?: string;
  type: 'to' | 'cc' | 'bcc';
}

export interface EmailRecipients {
  to: EmailRecipient[];
  cc?: EmailRecipient[];
  bcc?: EmailRecipient[];
}

// ============================================================================
// Attachment Types
// ============================================================================

export type AttachmentType =
  | 'document' // PDF, DOC, DOCX, etc.
  | 'image' // JPG, PNG, GIF, etc.
  | 'spreadsheet' // XLS, XLSX, CSV
  | 'presentation' // PPT, PPTX
  | 'archive' // ZIP, RAR
  | 'text' // TXT, MD
  | 'other';

export interface EmailAttachment {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number; // bytes
  type: AttachmentType;
  url?: string; // Storage URL
  path?: string; // Local path
  uploadedAt: Date;
  uploadedBy?: string;
}

export interface AttachmentUploadRequest {
  draftId: string;
  file: File | Buffer;
  filename?: string;
}

export interface AttachmentUploadResponse {
  success: boolean;
  attachment?: EmailAttachment;
  error?: string;
}

export interface AttachmentListResponse {
  success: boolean;
  attachments: EmailAttachment[];
  totalSize: number;
  error?: string;
}

// ============================================================================
// Email Configuration
// ============================================================================

export const EMAIL_CONFIG = {
  // Maximum attachment size (10MB)
  MAX_ATTACHMENT_SIZE: 10 * 1024 * 1024,
  // Maximum total attachments size (25MB)
  MAX_TOTAL_SIZE: 25 * 1024 * 1024,
  // Maximum number of attachments
  MAX_ATTACHMENTS: 10,
  // Maximum recipients per type
  MAX_RECIPIENTS: {
    to: 10,
    cc: 20,
    bcc: 50,
  },
  // Allowed file extensions
  ALLOWED_EXTENSIONS: [
    // Documents
    '.pdf',
    '.doc',
    '.docx',
    '.txt',
    '.rtf',
    '.odt',
    // Spreadsheets
    '.xls',
    '.xlsx',
    '.csv',
    '.ods',
    // Presentations
    '.ppt',
    '.pptx',
    '.odp',
    // Images
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.webp',
    '.svg',
    // Archives
    '.zip',
    '.7z',
    // Other
    '.md',
    '.json',
    '.xml',
  ],
  // Blocked file extensions (security)
  BLOCKED_EXTENSIONS: [
    '.exe',
    '.bat',
    '.cmd',
    '.sh',
    '.ps1',
    '.vbs',
    '.js',
    '.msi',
    '.dll',
    '.scr',
    '.com',
  ],
} as const;

// ============================================================================
// Email Send Request/Response
// ============================================================================

export interface SendEmailRequest {
  draftId: string;
  to: EmailRecipient[];
  cc?: EmailRecipient[];
  bcc?: EmailRecipient[];
  attachmentIds?: string[];
  subject?: string; // Override if needed
  body?: string; // Override if needed
  scheduleSend?: Date; // Future send time
  trackOpens?: boolean;
  trackClicks?: boolean;
}

export interface SendEmailResponse {
  success: boolean;
  messageId?: string;
  sentAt?: Date;
  recipients?: {
    to: number;
    cc: number;
    bcc: number;
  };
  attachmentCount?: number;
  error?: string;
  validationErrors?: EmailValidationError[];
}

// ============================================================================
// Validation Types
// ============================================================================

export type EmailValidationErrorCode =
  | 'INVALID_EMAIL'
  | 'TOO_MANY_RECIPIENTS'
  | 'ATTACHMENT_TOO_LARGE'
  | 'TOTAL_SIZE_EXCEEDED'
  | 'TOO_MANY_ATTACHMENTS'
  | 'BLOCKED_FILE_TYPE'
  | 'INVALID_FILE_TYPE'
  | 'MISSING_REQUIRED_RECIPIENT'
  | 'DUPLICATE_RECIPIENT'
  | 'EMPTY_BODY';

export interface EmailValidationError {
  code: EmailValidationErrorCode;
  field: string;
  message: string;
  value?: string;
}

export interface EmailValidationResult {
  isValid: boolean;
  errors: EmailValidationError[];
  warnings?: string[];
}

// ============================================================================
// Email Template Types
// ============================================================================

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  ccDefaults?: string[]; // Default CC recipients
  bccDefaults?: string[]; // Default BCC recipients
  category?: string;
  variables?: string[]; // Placeholder variables like {{customerName}}
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Validate email address format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Get attachment type from MIME type or extension
 */
export function getAttachmentType(mimeType: string, filename?: string): AttachmentType {
  // Check MIME type first
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType === 'application/pdf' || mimeType.includes('document')) return 'document';
  if (mimeType.includes('spreadsheet') || mimeType.includes('excel') || mimeType === 'text/csv')
    return 'spreadsheet';
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return 'presentation';
  if (mimeType.includes('zip') || mimeType.includes('archive') || mimeType.includes('compressed'))
    return 'archive';
  if (mimeType.startsWith('text/')) return 'text';

  // Fall back to extension
  if (filename) {
    const ext = filename.toLowerCase().split('.').pop();
    if (ext) {
      if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return 'image';
      if (['pdf', 'doc', 'docx', 'odt', 'rtf'].includes(ext)) return 'document';
      if (['xls', 'xlsx', 'csv', 'ods'].includes(ext)) return 'spreadsheet';
      if (['ppt', 'pptx', 'odp'].includes(ext)) return 'presentation';
      if (['zip', '7z', 'rar', 'tar', 'gz'].includes(ext)) return 'archive';
      if (['txt', 'md', 'json', 'xml'].includes(ext)) return 'text';
    }
  }

  return 'other';
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Check if file extension is allowed
 */
export function isAllowedExtension(filename: string): boolean {
  const ext = '.' + filename.toLowerCase().split('.').pop();
  if ((EMAIL_CONFIG.BLOCKED_EXTENSIONS as readonly string[]).includes(ext)) return false;
  return (EMAIL_CONFIG.ALLOWED_EXTENSIONS as readonly string[]).includes(ext);
}

/**
 * Validate recipients array
 */
export function validateRecipients(
  recipients: EmailRecipient[],
  type: 'to' | 'cc' | 'bcc'
): EmailValidationError[] {
  const errors: EmailValidationError[] = [];
  const maxCount = EMAIL_CONFIG.MAX_RECIPIENTS[type];

  if (recipients.length > maxCount) {
    errors.push({
      code: 'TOO_MANY_RECIPIENTS',
      field: type,
      message: `Maximum ${maxCount} ${type.toUpperCase()} recipients allowed`,
    });
  }

  const seen = new Set<string>();
  recipients.forEach((r, i) => {
    if (!isValidEmail(r.email)) {
      errors.push({
        code: 'INVALID_EMAIL',
        field: `${type}[${i}]`,
        message: `Invalid email address`,
        value: r.email,
      });
    }
    if (seen.has(r.email.toLowerCase())) {
      errors.push({
        code: 'DUPLICATE_RECIPIENT',
        field: `${type}[${i}]`,
        message: `Duplicate recipient`,
        value: r.email,
      });
    }
    seen.add(r.email.toLowerCase());
  });

  return errors;
}

/**
 * Validate attachments
 */
export function validateAttachments(attachments: EmailAttachment[]): EmailValidationError[] {
  const errors: EmailValidationError[] = [];

  if (attachments.length > EMAIL_CONFIG.MAX_ATTACHMENTS) {
    errors.push({
      code: 'TOO_MANY_ATTACHMENTS',
      field: 'attachments',
      message: `Maximum ${EMAIL_CONFIG.MAX_ATTACHMENTS} attachments allowed`,
    });
  }

  let totalSize = 0;
  attachments.forEach((att, i) => {
    if (att.size > EMAIL_CONFIG.MAX_ATTACHMENT_SIZE) {
      errors.push({
        code: 'ATTACHMENT_TOO_LARGE',
        field: `attachments[${i}]`,
        message: `Attachment exceeds ${formatFileSize(EMAIL_CONFIG.MAX_ATTACHMENT_SIZE)} limit`,
        value: att.filename,
      });
    }
    totalSize += att.size;

    if (!isAllowedExtension(att.filename)) {
      errors.push({
        code: 'BLOCKED_FILE_TYPE',
        field: `attachments[${i}]`,
        message: `File type not allowed`,
        value: att.filename,
      });
    }
  });

  if (totalSize > EMAIL_CONFIG.MAX_TOTAL_SIZE) {
    errors.push({
      code: 'TOTAL_SIZE_EXCEEDED',
      field: 'attachments',
      message: `Total attachment size exceeds ${formatFileSize(EMAIL_CONFIG.MAX_TOTAL_SIZE)} limit`,
    });
  }

  return errors;
}

/**
 * Generate unique attachment ID
 */
export function generateAttachmentId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `ATT-${timestamp}-${random}`.toUpperCase();
}
