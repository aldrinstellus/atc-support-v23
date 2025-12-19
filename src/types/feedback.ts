// Feedback Widget Type Definitions

export type AnnotationTool = 'arrow' | 'rectangle' | 'highlight' | 'text' | 'freehand';

export type FeedbackCategory = 'bug' | 'feature' | 'improvement' | 'question' | 'other';

export type FeedbackPriority = 'critical' | 'high' | 'medium' | 'low';

export type IntegrationTarget = 'email' | 'supabase' | 'github' | 'slack' | 'sheets';

export type FeedbackMode = 'idle' | 'capturing' | 'annotating' | 'selecting' | 'form';

export interface Point {
  x: number;
  y: number;
}

export interface Annotation {
  id: string;
  tool: AnnotationTool;
  points: Point[];
  color: string;
  strokeWidth: number;
  text?: string;
  startPoint?: Point;
  endPoint?: Point;
}

export interface ElementTag {
  id: string;
  selector: string;
  xpath: string;
  tagName: string;
  className: string;
  textContent: string;
  boundingRect: {
    top: number;
    left: number;
    width: number;
    height: number;
    right: number;
    bottom: number;
    x: number;
    y: number;
  };
  screenshot?: string;
  note?: string;
}

export interface FeedbackEntry {
  id: string;
  timestamp: Date;

  // Screenshot & Annotations
  screenshot: string;
  annotations: Annotation[];

  // Element Tags
  taggedElements: ElementTag[];

  // User Input
  title: string;
  description: string;
  category: FeedbackCategory;
  priority: FeedbackPriority;

  // Context
  url: string;
  viewport: { width: number; height: number };
  userAgent: string;
  persona?: string;
  mode?: string;

  // Integration
  targetIntegrations: IntegrationTarget[];

  // Metadata
  submittedBy?: string;
  status: 'draft' | 'pending' | 'submitted' | 'failed';
}

export interface FeedbackContextType {
  // State
  isOpen: boolean;
  mode: FeedbackMode;
  currentFeedback: Partial<FeedbackEntry> | null;
  screenshot: string | null;
  annotations: Annotation[];
  taggedElements: ElementTag[];
  isCapturing: boolean;
  isSubmitting: boolean;

  // Actions
  openWidget: () => void;
  closeWidget: () => void;
  startCapture: () => Promise<void>;
  setScreenshot: (screenshot: string | null) => void;
  setMode: (mode: FeedbackMode) => void;
  addAnnotation: (annotation: Annotation) => void;
  removeAnnotation: (id: string) => void;
  undoAnnotation: () => void;
  clearAnnotations: () => void;
  addElementTag: (tag: ElementTag) => void;
  removeElementTag: (id: string) => void;
  updateFeedbackDetails: (details: Partial<FeedbackEntry>) => void;
  submitFeedback: (targets: IntegrationTarget[]) => Promise<void>;
  resetFeedback: () => void;

  // UI State
  selectedTool: AnnotationTool;
  setSelectedTool: (tool: AnnotationTool) => void;
  toolColor: string;
  setToolColor: (color: string) => void;
}

// API Response Types
export interface FeedbackSubmitResponse {
  success: boolean;
  feedbackId?: string;
  results?: Record<IntegrationTarget, { success: boolean; error?: string; data?: unknown }>;
  error?: string;
}

// Integration-specific response types
export interface GitHubIssueResponse {
  success: boolean;
  issueUrl?: string;
  issueNumber?: number;
  error?: string;
}

export interface SlackNotificationResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface SupabaseInsertResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}

export interface EmailSendResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface GoogleSheetsResponse {
  success: boolean;
  rowNumber?: number;
  spreadsheetUrl?: string;
  error?: string;
}
