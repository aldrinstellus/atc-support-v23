// ============================================================================
// V23 ITSS - Learning Loop System Types
// PRD 1.4.3: Flag significant edits (>30%) and create training data
// ============================================================================

// Error type classification
export type LearningErrorType =
  | 'TONE_MISMATCH'       // AI tone was wrong for context
  | 'TECHNICAL_ERROR'     // Incorrect technical information
  | 'MISSING_CONTEXT'     // AI missed relevant context
  | 'POLICY_VIOLATION'    // Response violated company policy
  | 'PERSONALIZATION'     // Needed more personalization
  | 'CLARITY'             // Response was unclear
  | 'COMPLETENESS'        // Response was incomplete
  | 'ACCURACY'            // Factual errors
  | 'FORMAT'              // Formatting issues
  | 'OTHER'               // Other improvements

// Learning candidate status
export type LearningStatus =
  | 'PENDING'             // Awaiting review
  | 'IN_REVIEW'           // Currently being reviewed
  | 'APPROVED'            // Approved for training
  | 'REJECTED'            // Not suitable for training
  | 'TRAINING_CREATED'    // Training data created

// KB Update types
export type KBUpdateType =
  | 'NEW_ARTICLE'         // Create new article
  | 'UPDATE_EXISTING'     // Update existing article
  | 'ADD_EXAMPLE'         // Add example to article
  | 'CORRECTION'          // Fix error in article
  | 'DEPRECATE'           // Mark content as outdated

// KB Update status
export type KBUpdateStatus =
  | 'PENDING'
  | 'IN_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'APPLIED'

// ============================================================================
// Core Interfaces
// ============================================================================

export interface LearningCandidate {
  id: string
  candidateId: string
  draftId: string
  draftVersionId?: string | null

  // Flag criteria
  changePercent: number
  editDistance: number
  editType: string

  // Original vs Final
  originalContent: string
  finalContent: string

  // Classification
  category?: string | null
  errorType?: LearningErrorType | null
  correctionPattern?: string | null

  // Review workflow
  status: LearningStatus
  reviewedById?: string | null
  reviewedByName?: string | null
  reviewedAt?: Date | null
  reviewNotes?: string | null

  // Training data
  isTrainingData: boolean
  trainingDataId?: string | null

  // Metadata
  agentId?: string | null
  agentName?: string | null
  ticketCategory?: string | null
  confidenceScore?: number | null

  createdAt: Date
  updatedAt: Date
}

export interface TrainingData {
  id: string
  trainingId: string

  // Training pair
  inputContent: string
  expectedOutput: string

  // Classification
  category?: string | null
  errorTypes: LearningErrorType[]

  // Metadata
  ticketId?: string | null
  originalDraftId?: string | null
  agentId?: string | null

  // Quality metrics
  confidenceDelta?: number | null
  qualityScore?: number | null
  validatedBy?: string | null
  validatedAt?: Date | null

  // Usage tracking
  usedInTraining: boolean
  trainingBatchId?: string | null

  createdAt: Date
  updatedAt: Date
}

export interface KBUpdateRequest {
  id: string
  requestId: string

  // Source
  learningCandidateId?: string | null
  trainingDataId?: string | null

  // Update details
  articleId?: string | null
  proposedContent: string
  updateType: KBUpdateType
  reason?: string | null

  // Workflow
  status: KBUpdateStatus
  requestedBy?: string | null
  requestedAt: Date
  approvedBy?: string | null
  approvedAt?: Date | null

  createdAt: Date
  updatedAt: Date
}

// ============================================================================
// API Request/Response Types
// ============================================================================

// List learning candidates
export interface ListLearningCandidatesParams {
  status?: LearningStatus | LearningStatus[]
  errorType?: LearningErrorType
  category?: string
  minChangePercent?: number
  maxChangePercent?: number
  agentId?: string
  fromDate?: string
  toDate?: string
  page?: number
  limit?: number
  sortBy?: 'createdAt' | 'changePercent' | 'status'
  sortOrder?: 'asc' | 'desc'
}

export interface ListLearningCandidatesResponse {
  success: boolean
  candidates: LearningCandidate[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
  stats: {
    totalPending: number
    totalApproved: number
    avgChangePercent: number
  }
}

// Review learning candidate
export interface ReviewLearningCandidateRequest {
  status: LearningStatus
  errorType?: LearningErrorType
  correctionPattern?: string
  reviewNotes?: string
  reviewedById: string
  reviewedByName?: string
}

// Create training data
export interface CreateTrainingDataRequest {
  learningCandidateId: string
  inputContent?: string        // Optional override
  expectedOutput?: string      // Optional override
  category?: string
  errorTypes?: LearningErrorType[]
  qualityScore?: number
  validatedBy?: string
}

export interface CreateTrainingDataResponse {
  success: boolean
  trainingData?: TrainingData
  error?: string
}

// KB Update request
export interface CreateKBUpdateRequest {
  learningCandidateId?: string
  trainingDataId?: string
  articleId?: string
  proposedContent: string
  updateType: KBUpdateType
  reason?: string
  requestedBy: string
}

// ============================================================================
// Dashboard Stats
// ============================================================================

export interface LearningLoopStats {
  // Candidates
  totalCandidates: number
  pendingReview: number
  approved: number
  rejected: number
  trainingCreated: number

  // Training data
  totalTrainingData: number
  usedInTraining: number
  avgQualityScore: number

  // KB updates
  totalKBUpdates: number
  pendingKBUpdates: number
  appliedKBUpdates: number

  // Metrics
  avgChangePercent: number
  mostCommonErrorTypes: { type: LearningErrorType; count: number }[]
  candidatesByCategory: { category: string; count: number }[]
}

// ============================================================================
// Constants
// ============================================================================

// Threshold for flagging drafts (PRD 1.4.3)
export const SIGNIFICANT_EDIT_THRESHOLD = 30 // 30%

// Error type labels for UI
export const ERROR_TYPE_LABELS: Record<LearningErrorType, string> = {
  TONE_MISMATCH: 'Tone Mismatch',
  TECHNICAL_ERROR: 'Technical Error',
  MISSING_CONTEXT: 'Missing Context',
  POLICY_VIOLATION: 'Policy Violation',
  PERSONALIZATION: 'Needs Personalization',
  CLARITY: 'Clarity Issue',
  COMPLETENESS: 'Incomplete Response',
  ACCURACY: 'Accuracy Issue',
  FORMAT: 'Formatting Issue',
  OTHER: 'Other',
}

// Status labels for UI
export const LEARNING_STATUS_LABELS: Record<LearningStatus, string> = {
  PENDING: 'Pending Review',
  IN_REVIEW: 'In Review',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  TRAINING_CREATED: 'Training Created',
}

// ============================================================================
// Utility Functions
// ============================================================================

// Generate learning candidate ID
export const generateLearningCandidateId = (): string => {
  const now = new Date()
  const year = now.getFullYear()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `LC-${year}-${random}`
}

// Generate training data ID
export const generateTrainingDataId = (): string => {
  const now = new Date()
  const year = now.getFullYear()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `TD-${year}-${random}`
}

// Generate KB update request ID
export const generateKBUpdateRequestId = (): string => {
  const now = new Date()
  const year = now.getFullYear()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `KBU-${year}-${random}`
}

// Calculate Levenshtein edit distance (proper algorithm)
export function calculateEditDistance(str1: string, str2: string): number {
  const m = str1.length
  const n = str2.length

  // Create matrix
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0))

  // Initialize first column and row
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j

  // Fill the matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j - 1] + 1, // substitution
          dp[i - 1][j] + 1,     // deletion
          dp[i][j - 1] + 1      // insertion
        )
      }
    }
  }

  return dp[m][n]
}

// Calculate change percentage
export function calculateChangePercent(original: string, final: string): number {
  if (original.length === 0 && final.length === 0) return 0
  if (original.length === 0) return 100

  const editDist = calculateEditDistance(original, final)
  const maxLen = Math.max(original.length, final.length)
  return (editDist / maxLen) * 100
}

// Check if edit is significant (>30%)
export function isSignificantEdit(changePercent: number): boolean {
  return changePercent >= SIGNIFICANT_EDIT_THRESHOLD
}
