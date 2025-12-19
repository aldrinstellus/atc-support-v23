/**
 * Learning Loop System Types
 * PRD 1.4.3: Learning Loop - Edit tracking for AI improvement
 *
 * Tracks agent edits to AI drafts, identifies patterns, and provides
 * analytics for continuous improvement of AI-generated responses.
 */

// ============================================================================
// Edit Pattern Types
// ============================================================================

export type PatternCategory =
  | 'TONE_ADJUSTMENT' // Changed tone/voice
  | 'FACTUAL_CORRECTION' // Fixed incorrect information
  | 'STRUCTURE_CHANGE' // Reorganized content
  | 'DETAIL_ADDITION' // Added missing details
  | 'SIMPLIFICATION' // Made content simpler
  | 'PERSONALIZATION' // Added customer-specific context
  | 'POLICY_ALIGNMENT' // Aligned with company policy
  | 'GRAMMAR_FIX' // Grammar/spelling corrections
  | 'FORMATTING' // Formatting changes
  | 'OTHER';

export type EditSeverity = 'minor' | 'moderate' | 'major' | 'complete_rewrite';

// ============================================================================
// Edit Record Interface
// ============================================================================

export interface EditRecord {
  id: string;
  draftId: string;
  draftVersionId: string;

  // Edit Details
  originalContent: string;
  editedContent: string;
  editDistance: number; // Levenshtein distance
  changePercent: number; // Percentage of content changed

  // Classification
  patternCategories: PatternCategory[];
  severity: EditSeverity;
  confidenceScore: number; // AI confidence before edit

  // Agent Info
  agentId: string;
  agentName: string;

  // Timing
  editDurationSeconds: number;
  createdAt: Date;

  // Context
  ticketCategory?: string;
  ticketPriority?: string;
  customerSentiment?: string;
}

// ============================================================================
// Pattern Analysis Interface
// ============================================================================

export interface PatternSummary {
  category: PatternCategory;
  count: number;
  percentage: number;
  avgConfidenceWhenOccurs: number;
  examples: EditExample[];
}

export interface EditExample {
  id: string;
  originalSnippet: string;
  editedSnippet: string;
  context: string;
  agentName: string;
  createdAt: Date;
}

export interface LearningInsight {
  id: string;
  type: 'improvement_opportunity' | 'pattern_detected' | 'anomaly' | 'success_pattern';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  category: PatternCategory;
  suggestedAction?: string;
  dataPoints: number;
  confidence: number;
  createdAt: Date;
}

// ============================================================================
// Analytics Interfaces
// ============================================================================

export interface LearningAnalytics {
  // Overall Stats
  totalDraftsReviewed: number;
  totalEditsRecorded: number;
  avgEditPercent: number;
  avgEditDurationSeconds: number;

  // Confidence Analysis
  avgConfidenceScore: number;
  confidenceCorrelation: number; // Correlation between confidence and edit amount

  // Edit Severity Distribution
  severityDistribution: {
    minor: number;
    moderate: number;
    major: number;
    complete_rewrite: number;
  };

  // Top Patterns
  topPatterns: PatternSummary[];

  // Time Period
  fromDate: Date;
  toDate: Date;
}

export interface AgentEditProfile {
  agentId: string;
  agentName: string;
  totalEdits: number;
  avgEditPercent: number;
  avgEditDuration: number;
  commonPatterns: PatternCategory[];
  strengthAreas: string[];
  efficiencyScore: number; // 0-100
}

export interface CategoryEditStats {
  category: string;
  totalDrafts: number;
  editedDrafts: number;
  avgEditPercent: number;
  avgConfidenceScore: number;
  commonPatterns: PatternCategory[];
}

// ============================================================================
// API Request/Response Types
// ============================================================================

export interface RecordEditRequest {
  draftId: string;
  draftVersionId: string;
  originalContent: string;
  editedContent: string;
  agentId: string;
  agentName: string;
  editDurationSeconds?: number;
  ticketCategory?: string;
  ticketPriority?: string;
  customerSentiment?: string;
}

export interface RecordEditResponse {
  success: boolean;
  editRecord?: EditRecord;
  patterns?: PatternCategory[];
  error?: string;
}

export interface GetAnalyticsRequest {
  fromDate?: string;
  toDate?: string;
  agentId?: string;
  category?: string;
  limit?: number;
}

export interface GetAnalyticsResponse {
  success: boolean;
  analytics?: LearningAnalytics;
  insights?: LearningInsight[];
  error?: string;
}

export interface GetInsightsRequest {
  type?: LearningInsight['type'];
  minImpact?: 'low' | 'medium' | 'high';
  limit?: number;
}

export interface GetInsightsResponse {
  success: boolean;
  insights: LearningInsight[];
  totalCount: number;
  error?: string;
}

// ============================================================================
// UI Component Props
// ============================================================================

export interface EditPatternDisplayProps {
  patterns: PatternCategory[];
  severity: EditSeverity;
  className?: string;
}

export interface LearningInsightCardProps {
  insight: LearningInsight;
  onDismiss?: (id: string) => void;
  onAction?: (id: string) => void;
}

export interface EditAnalyticsDashboardProps {
  analytics: LearningAnalytics;
  agentProfiles?: AgentEditProfile[];
  categoryStats?: CategoryEditStats[];
  timeRange: 'day' | 'week' | 'month' | 'quarter';
  onTimeRangeChange?: (range: 'day' | 'week' | 'month' | 'quarter') => void;
}

// ============================================================================
// Pattern Detection Helpers
// ============================================================================

export const PATTERN_LABELS: Record<PatternCategory, string> = {
  TONE_ADJUSTMENT: 'Tone Adjustment',
  FACTUAL_CORRECTION: 'Factual Correction',
  STRUCTURE_CHANGE: 'Structure Change',
  DETAIL_ADDITION: 'Detail Addition',
  SIMPLIFICATION: 'Simplification',
  PERSONALIZATION: 'Personalization',
  POLICY_ALIGNMENT: 'Policy Alignment',
  GRAMMAR_FIX: 'Grammar Fix',
  FORMATTING: 'Formatting',
  OTHER: 'Other',
};

export const PATTERN_COLORS: Record<PatternCategory, string> = {
  TONE_ADJUSTMENT: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  FACTUAL_CORRECTION: 'bg-red-500/20 text-red-400 border-red-500/30',
  STRUCTURE_CHANGE: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  DETAIL_ADDITION: 'bg-green-500/20 text-green-400 border-green-500/30',
  SIMPLIFICATION: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  PERSONALIZATION: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  POLICY_ALIGNMENT: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  GRAMMAR_FIX: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  FORMATTING: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  OTHER: 'bg-muted text-muted-foreground border-border',
};

export const SEVERITY_LABELS: Record<EditSeverity, string> = {
  minor: 'Minor Edit',
  moderate: 'Moderate Edit',
  major: 'Major Edit',
  complete_rewrite: 'Complete Rewrite',
};

export const SEVERITY_COLORS: Record<EditSeverity, string> = {
  minor: 'text-success',
  moderate: 'text-chart-3',
  major: 'text-chart-4',
  complete_rewrite: 'text-destructive',
};

export function getEditSeverity(changePercent: number): EditSeverity {
  if (changePercent < 10) return 'minor';
  if (changePercent < 30) return 'moderate';
  if (changePercent < 60) return 'major';
  return 'complete_rewrite';
}
