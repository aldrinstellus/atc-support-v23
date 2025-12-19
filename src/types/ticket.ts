/**
 * Ticket Processing Type Definitions
 * For AI-powered ticket classification and processing
 */

// Ticket Classification Categories (from n8n workflow)
export type TicketCategory =
  | 'DATA_GENERATION'          // Reports, analytics, data exports
  | 'BACKEND_INVESTIGATION'    // System bugs, technical debugging
  | 'MANUAL_ADMIN'             // User/account management
  | 'CONTENT_MANAGEMENT'       // Course creation, SCORM uploads
  | 'CONFIGURATION'            // System settings, integrations
  | 'SIMPLE_RESPONSE'          // How-to questions, info requests
  | 'ESCALATION_NEEDED';       // Complex issues requiring human judgment

export type TicketComplexity = 'low' | 'medium' | 'high';

// Ticket Classification Result
export interface TicketClassification {
  primary_category: TicketCategory;
  secondary_categories: TicketCategory[];
  confidence: number; // 0.0 to 1.0
  reasoning: string;
  required_info: string[];
  estimated_complexity: TicketComplexity;
  auto_resolvable: boolean;
}

// Ticket Processing Status
export type TicketProcessingStatus =
  | 'received'           // Webhook received
  | 'extracting'         // Extracting ticket info
  | 'classifying'        // AI classification
  | 'routing'            // Routing based on category
  | 'searching'          // Knowledge base search
  | 'generating'         // AI response generation
  | 'replying'           // Sending reply to customer
  | 'escalating'         // Creating Jira ticket
  | 'completed'          // Processing complete
  | 'failed';            // Processing failed

// Processing Timeline Entry
export interface ProcessingStep {
  step: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  timestamp: string;
  duration?: number; // milliseconds
  error?: string;
}

// Knowledge Base Search Result
export interface KBSearchResult {
  query: string;
  method: 'chat' | 'retrieval'; // Dify chat API vs retrieval API
  matches: number;
  topResults?: Array<{
    content: string;
    score: number;
    metadata?: Record<string, unknown>;
  }>;
  answer?: string; // For chat API
  confidence?: number;
}

// AI Response Generation
export interface AIResponse {
  text: string;
  confidence: number;
  sources?: string[]; // KB article IDs or URLs
  needsEscalation: boolean;
  escalationSignals: string[];
}

// Jira Ticket Creation Decision
export interface JiraDecision {
  should_create: boolean;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  reason?: string; // Why escalation is needed
}

// Jira Ticket Created
export interface JiraTicketCreated {
  key: string;
  id: string;
  url: string;
  summary: string;
  created: string;
}

// Complete Ticket Processing Result
export interface TicketProcessingResult {
  ticketId: string;
  ticketNumber: string;
  status: TicketProcessingStatus;
  classification: TicketClassification;
  kbSearch?: KBSearchResult;
  aiResponse?: AIResponse;
  zohoReply?: {
    id: string;
    sent: boolean;
    timestamp: string;
  };
  jiraTicket?: JiraTicketCreated;
  timeline: ProcessingStep[];
  startTime: string;
  endTime?: string;
  totalDuration?: number;
  error?: {
    step: string;
    message: string;
    stack?: string;
  };
}

// Processing Options
export interface TicketProcessingOptions {
  skipKBSearch?: boolean;
  skipAutoReply?: boolean;
  forceJiraCreation?: boolean;
  dryRun?: boolean; // Don't actually send replies or create Jira tickets
}

// Category Configuration
export interface CategoryConfig {
  category: TicketCategory;
  label: string;
  description: string;
  examples: string[];
  autoResolvable: boolean;
  defaultComplexity: TicketComplexity;
  requiresJira: boolean;
}

// Full category configurations
export const TICKET_CATEGORIES: Record<TicketCategory, CategoryConfig> = {
  DATA_GENERATION: {
    category: 'DATA_GENERATION',
    label: 'Data Generation',
    description: 'Requires generating reports, extracting data, running analytics',
    examples: [
      'User activity reports',
      'Completion data',
      'Login/logout reports',
      'Progress analytics',
      'Cooper reports',
      'Learning data exports',
    ],
    autoResolvable: false,
    defaultComplexity: 'medium',
    requiresJira: true,
  },
  BACKEND_INVESTIGATION: {
    category: 'BACKEND_INVESTIGATION',
    label: 'Backend Investigation',
    description: 'Requires technical debugging, system investigation, engineering escalation',
    examples: [
      'Course completion failures',
      'Assessment errors',
      'Platform access issues',
      'System bugs',
      'Integration problems',
      'Data discrepancies',
    ],
    autoResolvable: false,
    defaultComplexity: 'high',
    requiresJira: true,
  },
  MANUAL_ADMIN: {
    category: 'MANUAL_ADMIN',
    label: 'Manual Admin',
    description: 'Requires hands-on user/account management actions',
    examples: [
      'User creation/deletion',
      'Account consolidation',
      'Bulk enrollments',
      'Password resets',
      'Profile updates',
      'Permission changes',
    ],
    autoResolvable: true,
    defaultComplexity: 'low',
    requiresJira: false,
  },
  CONTENT_MANAGEMENT: {
    category: 'CONTENT_MANAGEMENT',
    label: 'Content Management',
    description: 'Requires course/content creation, modification, or publishing',
    examples: [
      'Course publishing',
      'Content migration',
      'Learning path setup',
      'SCORM uploads',
      'Certificate creation',
    ],
    autoResolvable: false,
    defaultComplexity: 'medium',
    requiresJira: false,
  },
  CONFIGURATION: {
    category: 'CONFIGURATION',
    label: 'Configuration',
    description: 'Requires system settings changes, integrations setup',
    examples: [
      'SSO configuration',
      'Notification settings',
      'Branding changes',
      'API integrations',
      'Timezone settings',
    ],
    autoResolvable: false,
    defaultComplexity: 'medium',
    requiresJira: false,
  },
  SIMPLE_RESPONSE: {
    category: 'SIMPLE_RESPONSE',
    label: 'Simple Response',
    description: 'Only requires communication/information sharing',
    examples: [
      'How-to questions',
      'Status updates',
      'Meeting scheduling',
      'General inquiries',
      'Feature explanations',
    ],
    autoResolvable: true,
    defaultComplexity: 'low',
    requiresJira: false,
  },
  ESCALATION_NEEDED: {
    category: 'ESCALATION_NEEDED',
    label: 'Escalation Needed',
    description: 'Complex issues requiring human judgment or multiple resolution types',
    examples: [
      'Urgent business requests',
      'Legal/compliance issues',
      'Complex technical problems requiring multiple teams',
    ],
    autoResolvable: false,
    defaultComplexity: 'high',
    requiresJira: true,
  },
};
