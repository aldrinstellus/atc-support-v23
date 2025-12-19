/**
 * Email Content Cleaning Utilities
 * Removes HTML tags, email metadata, signatures, and formats content for AI processing
 */

/**
 * Clean HTML and email metadata from text content
 * Based on n8n workflow cleaning logic
 */
export function cleanEmailContent(text: string): string {
  if (!text) return '';

  let cleaned = text;

  // Extract only content up to first </div> closing tag (gets current message only)
  const firstDivMatch = cleaned.match(/<div[^>]*dir="ltr"[^>]*>(.*?)<\/div>/i);
  if (firstDivMatch) {
    cleaned = firstDivMatch[1] || '';
  }

  // Remove any remaining HTML tags
  cleaned = cleaned.replace(/<[^>]*>/g, ' ');

  // Decode HTML entities
  cleaned = cleaned
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x3d;/g, '=')
    .replace(/&#x2f;/g, '/')
    .replace(/&amp;/g, '&');

  // Remove "On [Date] at [Time] [Name] <email> wrote:" patterns
  cleaned = cleaned.replace(
    /On\s+[A-Za-z]{3},\s+[A-Za-z]{3}\s+\d{1,2},\s+\d{4}\s+at\s+\d{1,2}:\d{2}\s*(AM|PM)\s+[^:]*:/gi,
    ''
  );

  // Remove email addresses
  cleaned = cleaned.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '');

  // Remove "wrote:" text
  cleaned = cleaned.replace(/\s*wrote:\s*/gi, ' ');

  // Clean up extra whitespace and newlines
  cleaned = cleaned
    .replace(/\r\n/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned;
}

/**
 * Extract only the first div content (current message) from HTML
 */
export function extractFirstMessage(html: string): string {
  if (!html) return '';

  const match = html.match(/<div[^>]*dir="ltr"[^>]*>(.*?)<\/div>/i);
  return match?.[1] || html;
}

/**
 * Clean email address from brackets
 * Example: <john@example.com> → john@example.com
 */
export function cleanEmail(email: string): string {
  if (!email) return '';
  return email.replace(/[<>]/g, '').trim();
}

/**
 * Remove common email signature patterns
 */
export function removeSignatures(text: string): string {
  let cleaned = text;

  // Remove "Sent from my iPhone/Android" type signatures
  cleaned = cleaned.replace(/Sent from my (iPhone|iPad|Android|Mobile)/gi, '');

  // Remove common signature separators
  cleaned = cleaned.replace(/^--\s*$/gm, '');
  cleaned = cleaned.replace(/_{3,}/g, '');
  cleaned = cleaned.replace(/-{3,}/g, '');

  // Remove "Best regards", "Thanks", etc. with following content
  cleaned = cleaned.replace(
    /(Best regards|Regards|Thanks|Thank you|Sincerely|Cheers),?\s*[\s\S]*$/i,
    ''
  );

  return cleaned.trim();
}

/**
 * Escape special characters for JSON
 */
export function escapeForJSON(text: string): string {
  if (!text) return '';

  return text
    .replace(/\\/g, '\\\\')      // Escape backslashes first
    .replace(/"/g, '\\"')         // Escape double quotes
    .replace(/\n/g, '\\n')        // Escape newlines
    .replace(/\r/g, '\\r')        // Escape carriage returns
    .replace(/\t/g, '\\t');       // Escape tabs
}

/**
 * Unescape JSON special characters
 */
export function unescapeFromJSON(text: string): string {
  if (!text) return '';

  return text
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\');
}

/**
 * Remove markdown formatting for plain text
 */
export function removeMarkdown(text: string): string {
  if (!text) return '';

  let cleaned = text;

  // Remove bold/italic
  cleaned = cleaned.replace(/\*\*([^*]+)\*\*/g, '$1');  // **bold**
  cleaned = cleaned.replace(/\*([^*]+)\*/g, '$1');      // *italic*
  cleaned = cleaned.replace(/__([^_]+)__/g, '$1');      // __bold__
  cleaned = cleaned.replace(/_([^_]+)_/g, '$1');        // _italic_

  // Remove headers
  cleaned = cleaned.replace(/^#{1,6}\s+/gm, '');

  // Remove code blocks
  cleaned = cleaned.replace(/```[\s\S]*?```/g, '');
  cleaned = cleaned.replace(/`([^`]+)`/g, '$1');

  // Remove links but keep text
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // Remove images
  cleaned = cleaned.replace(/!\[([^\]]*)\]\([^)]+\)/g, '');

  return cleaned;
}

/**
 * Truncate text to specified length with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Extract plain text from various formats
 * Applies all cleaning operations in sequence
 */
export function extractPlainText(content: string, options: {
  removeSignatures?: boolean;
  removeMarkdown?: boolean;
  maxLength?: number;
} = {}): string {
  let cleaned = content;

  // Clean HTML and email metadata
  cleaned = cleanEmailContent(cleaned);

  // Optionally remove signatures
  if (options.removeSignatures !== false) {
    cleaned = removeSignatures(cleaned);
  }

  // Optionally remove markdown
  if (options.removeMarkdown) {
    cleaned = removeMarkdown(cleaned);
  }

  // Optionally truncate
  if (options.maxLength) {
    cleaned = truncate(cleaned, options.maxLength);
  }

  return cleaned;
}
