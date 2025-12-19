/**
 * Learning Loop Library
 * PRD 1.4.3: Edit tracking and pattern detection for AI improvement
 *
 * Analyzes edits to AI-generated drafts to identify patterns,
 * calculate metrics, and provide insights for improvement.
 */

import type {
  EditRecord,
  PatternCategory,
  EditSeverity,
  PatternSummary,
  LearningInsight,
  LearningAnalytics,
  RecordEditRequest,
} from '@/types/learning';
import { getEditSeverity } from '@/types/learning';

// ============================================================================
// Text Comparison Utilities
// ============================================================================

/**
 * Calculate Levenshtein distance between two strings
 */
export function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;

  // Create matrix
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  // Initialize first row and column
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  // Fill matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j - 1] + 1, dp[i - 1][j] + 1, dp[i][j - 1] + 1);
      }
    }
  }

  return dp[m][n];
}

/**
 * Calculate percentage of content changed
 */
export function calculateChangePercent(original: string, edited: string): number {
  const distance = levenshteinDistance(original, edited);
  const maxLength = Math.max(original.length, edited.length);
  if (maxLength === 0) return 0;
  return (distance / maxLength) * 100;
}

/**
 * Get word-level diff between two strings
 */
export function getWordDiff(
  original: string,
  edited: string
): { added: string[]; removed: string[]; unchanged: string[] } {
  const originalWords = original.toLowerCase().split(/\s+/).filter(Boolean);
  const editedWords = edited.toLowerCase().split(/\s+/).filter(Boolean);

  const originalSet = new Set(originalWords);
  const editedSet = new Set(editedWords);

  const added = editedWords.filter((w) => !originalSet.has(w));
  const removed = originalWords.filter((w) => !editedSet.has(w));
  const unchanged = originalWords.filter((w) => editedSet.has(w));

  return { added, removed, unchanged };
}

// ============================================================================
// Pattern Detection
// ============================================================================

/**
 * Detect edit patterns based on content analysis
 */
export function detectPatterns(original: string, edited: string): PatternCategory[] {
  const patterns: PatternCategory[] = [];
  const { added, removed } = getWordDiff(original, edited);

  // Tone adjustment indicators
  const toneWords = {
    formal: ['sincerely', 'regards', 'respectfully', 'hereby', 'pursuant'],
    casual: ['hey', 'hi', 'thanks', 'sure', 'great', 'awesome'],
    empathetic: ['understand', 'apologize', 'sorry', 'appreciate', 'concern'],
  };

  const hasToneChange =
    Object.values(toneWords).some(
      (words) => words.some((w) => added.includes(w)) || words.some((w) => removed.includes(w))
    );

  if (hasToneChange) {
    patterns.push('TONE_ADJUSTMENT');
  }

  // Structure change (paragraph/sentence reorganization)
  const originalParagraphs = original.split(/\n\n+/).length;
  const editedParagraphs = edited.split(/\n\n+/).length;
  const originalSentences = original.split(/[.!?]+/).filter(Boolean).length;
  const editedSentences = edited.split(/[.!?]+/).filter(Boolean).length;

  if (Math.abs(originalParagraphs - editedParagraphs) > 1 || Math.abs(originalSentences - editedSentences) > 3) {
    patterns.push('STRUCTURE_CHANGE');
  }

  // Detail addition (significant content increase)
  if (edited.length > original.length * 1.2 && added.length > 10) {
    patterns.push('DETAIL_ADDITION');
  }

  // Simplification (significant content reduction)
  if (edited.length < original.length * 0.8 && removed.length > 10) {
    patterns.push('SIMPLIFICATION');
  }

  // Personalization indicators
  const personalizationWords = ['name', 'account', 'your', 'you', 'specific', 'case'];
  const hasPersonalization = personalizationWords.some((w) => added.includes(w));
  if (hasPersonalization) {
    patterns.push('PERSONALIZATION');
  }

  // Policy alignment indicators
  const policyWords = ['policy', 'terms', 'agreement', 'compliance', 'regulation', 'requirement'];
  const hasPolicyChange = policyWords.some((w) => added.includes(w) || removed.includes(w));
  if (hasPolicyChange) {
    patterns.push('POLICY_ALIGNMENT');
  }

  // Grammar fix (small changes, likely corrections)
  const changePercent = calculateChangePercent(original, edited);
  if (changePercent < 5 && changePercent > 0) {
    patterns.push('GRAMMAR_FIX');
  }

  // Formatting changes (list/bullet points added)
  const hasBullets = edited.includes('- ') || edited.includes('• ') || edited.match(/^\d+\./m);
  const hadBullets = original.includes('- ') || original.includes('• ') || original.match(/^\d+\./m);
  if (hasBullets !== hadBullets) {
    patterns.push('FORMATTING');
  }

  // If no specific patterns detected but there are changes
  if (patterns.length === 0 && changePercent > 0) {
    patterns.push('OTHER');
  }

  return patterns;
}

// ============================================================================
// Edit Record Creation
// ============================================================================

/**
 * Create an edit record from a draft edit request
 */
export function createEditRecord(
  request: RecordEditRequest,
  confidenceScore: number = 0
): EditRecord {
  const editDistance = levenshteinDistance(request.originalContent, request.editedContent);
  const changePercent = calculateChangePercent(request.originalContent, request.editedContent);
  const patterns = detectPatterns(request.originalContent, request.editedContent);
  const severity = getEditSeverity(changePercent);

  return {
    id: crypto.randomUUID(),
    draftId: request.draftId,
    draftVersionId: request.draftVersionId,
    originalContent: request.originalContent,
    editedContent: request.editedContent,
    editDistance,
    changePercent,
    patternCategories: patterns,
    severity,
    confidenceScore,
    agentId: request.agentId,
    agentName: request.agentName,
    editDurationSeconds: request.editDurationSeconds || 0,
    createdAt: new Date(),
    ticketCategory: request.ticketCategory,
    ticketPriority: request.ticketPriority,
    customerSentiment: request.customerSentiment,
  };
}

// ============================================================================
// Analytics Generation
// ============================================================================

/**
 * Generate pattern summary from edit records
 */
export function generatePatternSummary(editRecords: EditRecord[]): PatternSummary[] {
  const patternCounts: Record<PatternCategory, { count: number; confidenceSum: number; examples: EditRecord[] }> =
    {} as Record<PatternCategory, { count: number; confidenceSum: number; examples: EditRecord[] }>;

  // Count patterns
  for (const record of editRecords) {
    for (const pattern of record.patternCategories) {
      if (!patternCounts[pattern]) {
        patternCounts[pattern] = { count: 0, confidenceSum: 0, examples: [] };
      }
      patternCounts[pattern].count++;
      patternCounts[pattern].confidenceSum += record.confidenceScore;
      if (patternCounts[pattern].examples.length < 3) {
        patternCounts[pattern].examples.push(record);
      }
    }
  }

  const totalEdits = editRecords.length;
  const summaries: PatternSummary[] = [];

  for (const [category, data] of Object.entries(patternCounts)) {
    summaries.push({
      category: category as PatternCategory,
      count: data.count,
      percentage: totalEdits > 0 ? (data.count / totalEdits) * 100 : 0,
      avgConfidenceWhenOccurs: data.count > 0 ? data.confidenceSum / data.count : 0,
      examples: data.examples.map((record) => ({
        id: record.id,
        originalSnippet: record.originalContent.slice(0, 100) + (record.originalContent.length > 100 ? '...' : ''),
        editedSnippet: record.editedContent.slice(0, 100) + (record.editedContent.length > 100 ? '...' : ''),
        context: record.ticketCategory || 'General',
        agentName: record.agentName,
        createdAt: record.createdAt,
      })),
    });
  }

  // Sort by count descending
  return summaries.sort((a, b) => b.count - a.count);
}

/**
 * Generate learning insights from edit records
 */
export function generateInsights(editRecords: EditRecord[]): LearningInsight[] {
  const insights: LearningInsight[] = [];
  const patterns = generatePatternSummary(editRecords);

  // High-frequency pattern insights
  for (const pattern of patterns) {
    if (pattern.percentage > 30 && pattern.count >= 5) {
      insights.push({
        id: crypto.randomUUID(),
        type: 'pattern_detected',
        title: `Frequent ${pattern.category.replace(/_/g, ' ')} Edits`,
        description: `${pattern.percentage.toFixed(0)}% of drafts require ${pattern.category.replace(/_/g, ' ').toLowerCase()} modifications. This suggests the AI model may need calibration in this area.`,
        impact: pattern.percentage > 50 ? 'high' : 'medium',
        category: pattern.category,
        suggestedAction: `Review AI prompt templates for ${pattern.category.replace(/_/g, ' ').toLowerCase()} guidelines`,
        dataPoints: pattern.count,
        confidence: 0.8,
        createdAt: new Date(),
      });
    }
  }

  // Low confidence correlation insight
  const lowConfidenceEdits = editRecords.filter((r) => r.confidenceScore < 70);
  const highEditLowConfidence = lowConfidenceEdits.filter((r) => r.changePercent > 30);
  if (highEditLowConfidence.length >= 3) {
    insights.push({
      id: crypto.randomUUID(),
      type: 'improvement_opportunity',
      title: 'Low Confidence Predictions Accurate',
      description: `Drafts with confidence scores below 70% required ${((highEditLowConfidence.length / lowConfidenceEdits.length) * 100).toFixed(0)}% major edits, validating the confidence scoring system.`,
      impact: 'low',
      category: 'OTHER',
      suggestedAction: 'Consider auto-flagging drafts with confidence below 70% for priority review',
      dataPoints: highEditLowConfidence.length,
      confidence: 0.7,
      createdAt: new Date(),
    });
  }

  // Complete rewrite detection
  const completeRewrites = editRecords.filter((r) => r.severity === 'complete_rewrite');
  if (completeRewrites.length >= 2) {
    insights.push({
      id: crypto.randomUUID(),
      type: 'anomaly',
      title: 'Complete Rewrites Detected',
      description: `${completeRewrites.length} drafts required complete rewrites. Investigate ticket types and contexts to identify root causes.`,
      impact: 'high',
      category: 'OTHER',
      suggestedAction: 'Review complete rewrite cases for common ticket types or contexts',
      dataPoints: completeRewrites.length,
      confidence: 0.9,
      createdAt: new Date(),
    });
  }

  // Success pattern detection
  const minorEdits = editRecords.filter((r) => r.severity === 'minor' && r.confidenceScore >= 85);
  if (minorEdits.length > editRecords.length * 0.3) {
    insights.push({
      id: crypto.randomUUID(),
      type: 'success_pattern',
      title: 'High Accuracy for High Confidence Drafts',
      description: `${((minorEdits.length / editRecords.length) * 100).toFixed(0)}% of high-confidence drafts required only minor edits, indicating strong AI performance for certain ticket types.`,
      impact: 'low',
      category: 'OTHER',
      suggestedAction: 'Identify characteristics of successful drafts to replicate across other categories',
      dataPoints: minorEdits.length,
      confidence: 0.85,
      createdAt: new Date(),
    });
  }

  return insights;
}

/**
 * Generate comprehensive learning analytics
 */
export function generateAnalytics(editRecords: EditRecord[], fromDate?: Date, toDate?: Date): LearningAnalytics {
  // Filter by date range if provided
  let filteredRecords = editRecords;
  if (fromDate) {
    filteredRecords = filteredRecords.filter((r) => new Date(r.createdAt) >= fromDate);
  }
  if (toDate) {
    filteredRecords = filteredRecords.filter((r) => new Date(r.createdAt) <= toDate);
  }

  const totalRecords = filteredRecords.length;

  // Calculate averages
  const avgEditPercent =
    totalRecords > 0 ? filteredRecords.reduce((sum, r) => sum + r.changePercent, 0) / totalRecords : 0;

  const avgEditDuration =
    totalRecords > 0 ? filteredRecords.reduce((sum, r) => sum + r.editDurationSeconds, 0) / totalRecords : 0;

  const avgConfidence =
    totalRecords > 0 ? filteredRecords.reduce((sum, r) => sum + r.confidenceScore, 0) / totalRecords : 0;

  // Calculate confidence correlation (simplified)
  const confidenceEditCorrelation = calculateCorrelation(
    filteredRecords.map((r) => r.confidenceScore),
    filteredRecords.map((r) => r.changePercent)
  );

  // Severity distribution
  const severityDistribution = {
    minor: filteredRecords.filter((r) => r.severity === 'minor').length,
    moderate: filteredRecords.filter((r) => r.severity === 'moderate').length,
    major: filteredRecords.filter((r) => r.severity === 'major').length,
    complete_rewrite: filteredRecords.filter((r) => r.severity === 'complete_rewrite').length,
  };

  return {
    totalDraftsReviewed: totalRecords,
    totalEditsRecorded: totalRecords,
    avgEditPercent,
    avgEditDurationSeconds: avgEditDuration,
    avgConfidenceScore: avgConfidence,
    confidenceCorrelation: confidenceEditCorrelation,
    severityDistribution,
    topPatterns: generatePatternSummary(filteredRecords).slice(0, 5),
    fromDate: fromDate || new Date(0),
    toDate: toDate || new Date(),
  };
}

/**
 * Calculate Pearson correlation coefficient
 */
function calculateCorrelation(x: number[], y: number[]): number {
  const n = x.length;
  if (n !== y.length || n === 0) return 0;

  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((total, xi, i) => total + xi * y[i], 0);
  const sumX2 = x.reduce((total, xi) => total + xi * xi, 0);
  const sumY2 = y.reduce((total, yi) => total + yi * yi, 0);

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

  if (denominator === 0) return 0;
  return numerator / denominator;
}

// ============================================================================
// In-Memory Storage (for demo purposes)
// In production, this would be backed by a database
// ============================================================================

let editRecordsStore: EditRecord[] = [];

/**
 * Store an edit record
 */
export function storeEditRecord(record: EditRecord): void {
  editRecordsStore.push(record);
}

/**
 * Get all edit records
 */
export function getEditRecords(): EditRecord[] {
  return [...editRecordsStore];
}

/**
 * Get edit records by draft ID
 */
export function getEditRecordsByDraftId(draftId: string): EditRecord[] {
  return editRecordsStore.filter((r) => r.draftId === draftId);
}

/**
 * Get edit records by agent ID
 */
export function getEditRecordsByAgentId(agentId: string): EditRecord[] {
  return editRecordsStore.filter((r) => r.agentId === agentId);
}

/**
 * Clear all edit records (for testing)
 */
export function clearEditRecords(): void {
  editRecordsStore = [];
}
