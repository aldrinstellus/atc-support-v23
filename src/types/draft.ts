// ============================================================================
// V20 ITSS - AI Draft System Types
// Human-in-the-Loop Response Generation
// ============================================================================

import { Priority } from '@prisma/client'

// Draft status workflow
export type DraftStatus =
  | 'GENERATING'      // AI is actively generating
  | 'PENDING_REVIEW'  // Awaiting agent review
  | 'IN_REVIEW'       // Agent is currently reviewing
  | 'APPROVED'        // Approved, pending send
  | 'REJECTED'        // Rejected by agent
  | 'SENT'            // Successfully sent to customer
  | 'FAILED'          // Send failed
  | 'ESCALATED'       // Escalated to supervisor

// Edit types for version tracking
export type EditType =
  | 'AI_GENERATED'    // Original AI generation
  | 'AGENT_EDIT'      // Manual edit by agent
  | 'REGENERATE'      // AI regenerated with new prompt
  | 'TONE_CHANGE'     // Regenerated with different tone
  | 'AUTO_SAVE'       // Auto-saved draft

// Sentiment classification
export type Sentiment = 'frustrated' | 'neutral' | 'satisfied'

// Complexity classification
export type Complexity = 'simple' | 'moderate' | 'complex'

// Tone options for generation/regeneration
export type DraftTone = 'formal' | 'friendly' | 'technical'

// Ticket category classification
export type TicketCategory =
  | 'password_reset'
  | 'access_request'
  | 'bug_report'
  | 'question'
  | 'feature_request'
  | 'complaint'
  | 'general_inquiry'
  | 'technical_issue'
  | 'billing'
  | 'other'

// ============================================================================
// Core Draft Interface
// ============================================================================

export interface Draft {
  id: string
  draftId: string                    // e.g., "DRAFT-2025-001"
  ticketId: string                   // Reference to external ticket
  ticketSubject: string
  customerName?: string | null
  customerEmail?: string | null
  originalContent: string            // Original customer message
  draftContent: string               // AI-generated draft
  finalContent?: string | null       // Approved/edited content
  status: DraftStatus

  // AI Classification
  confidenceScore: number            // 0-100
  category?: TicketCategory | null
  priority: Priority
  sentiment?: Sentiment | null
  complexity?: Complexity | null
  tone?: DraftTone | null

  // Workflow timestamps
  generatedAt: Date
  reviewedAt?: Date | null
  approvedAt?: Date | null
  sentAt?: Date | null
  rejectedAt?: Date | null

  // Agent assignment
  assignedAgentId?: string | null
  reviewedById?: string | null
  approvedById?: string | null
  rejectionReason?: string | null

  // Knowledge base
  kbArticlesUsed: string[]
  sourcesUsed?: Record<string, unknown> | null

  // AI Model info
  modelVersion?: string | null
  promptTokens?: number | null
  completionTokens?: number | null

  // Timestamps
  createdAt: Date
  updatedAt: Date

  // Relations (when included)
  versions?: DraftVersion[]
}

// ============================================================================
// Draft Version Interface
// ============================================================================

export interface DraftVersion {
  id: string
  draftId: string
  version: number
  content: string
  editedBy?: string | null
  editedByName?: string | null
  editType: EditType
  editSummary?: string | null
  editDistance?: number | null
  changePercent?: number | null
  confidenceScore?: number | null
  tone?: string | null
  createdAt: Date
}

// ============================================================================
// API Request/Response Types
// ============================================================================

// Generate draft request
export interface GenerateDraftRequest {
  ticketId: string
  ticketSubject: string
  customerName?: string
  customerEmail?: string
  originalContent: string
  tone?: DraftTone
  assignedAgentId?: string
  kbArticleIds?: string[]           // Optional KB articles to reference
}

// Generate draft response
export interface GenerateDraftResponse {
  success: boolean
  draft?: Draft
  error?: string
}

// List drafts request (query params)
export interface ListDraftsParams {
  status?: DraftStatus | DraftStatus[]
  assignedAgentId?: string
  category?: TicketCategory
  minConfidence?: number
  maxConfidence?: number
  fromDate?: string
  toDate?: string
  page?: number
  limit?: number
  sortBy?: 'createdAt' | 'confidenceScore' | 'status' | 'priority'
  sortOrder?: 'asc' | 'desc'
}

// List drafts response
export interface ListDraftsResponse {
  success: boolean
  drafts: Draft[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

// Update draft request
export interface UpdateDraftRequest {
  draftContent?: string
  status?: DraftStatus
  assignedAgentId?: string
  priority?: Priority
}

// Approve draft request
export interface ApproveDraftRequest {
  finalContent?: string             // Optional edited content
  approvedById: string
}

// Reject draft request
export interface RejectDraftRequest {
  rejectionReason: string
  reviewedById: string
}

// Regenerate draft request
export interface RegenerateDraftRequest {
  tone?: DraftTone
  additionalContext?: string
  focusAreas?: string[]
}

// Send draft request
export interface SendDraftRequest {
  ccRecipients?: string[]
  bccRecipients?: string[]
  attachments?: string[]            // File paths or IDs
}

// Version history response
export interface VersionHistoryResponse {
  success: boolean
  versions: DraftVersion[]
  currentVersion: number
}

// ============================================================================
// Analytics Types (for dashboard)
// ============================================================================

export interface DraftAnalytics {
  date: Date
  category?: string | null
  draftsGenerated: number
  draftsApproved: number
  draftsRejected: number
  draftsSent: number
  avgConfidenceScore: number
  avgEditDistance: number
  acceptanceRate: number
  avgReviewTime: number
  avgTimeToSend: number
}

export interface DraftStatsOverview {
  totalDrafts: number
  pendingReview: number
  inReview: number
  approved: number
  rejected: number
  sent: number
  avgConfidence: number
  acceptanceRate: number
  avgReviewTimeMinutes: number
}

// ============================================================================
// UI Component Props Types
// ============================================================================

export interface DraftCardProps {
  draft: Draft
  onSelect?: (draft: Draft) => void
  onApprove?: (draft: Draft) => void
  onReject?: (draft: Draft) => void
  isSelected?: boolean
}

export interface DraftReviewProps {
  draft: Draft
  onApprove: (content: string) => Promise<void>
  onReject: (reason: string) => Promise<void>
  onRegenerate: (options: RegenerateDraftRequest) => Promise<void>
  onEdit: (content: string) => void
  isLoading?: boolean
}

export interface ConfidenceScoreProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export interface DraftQueueProps {
  drafts: Draft[]
  onDraftSelect: (draft: Draft) => void
  selectedDraftId?: string
  isLoading?: boolean
}

// ============================================================================
// Confidence Score Thresholds
// ============================================================================

export const CONFIDENCE_THRESHOLDS = {
  HIGH: 85,      // Green - high confidence, likely auto-approvable
  MEDIUM: 70,    // Yellow - needs review but likely good
  LOW: 50,       // Orange - needs careful review
  CRITICAL: 30,  // Red - likely needs escalation
} as const

export const getConfidenceLevel = (score: number): 'high' | 'medium' | 'low' | 'critical' => {
  if (score >= CONFIDENCE_THRESHOLDS.HIGH) return 'high'
  if (score >= CONFIDENCE_THRESHOLDS.MEDIUM) return 'medium'
  if (score >= CONFIDENCE_THRESHOLDS.LOW) return 'low'
  return 'critical'
}

export const getConfidenceColor = (score: number): string => {
  const level = getConfidenceLevel(score)
  switch (level) {
    case 'high': return 'text-emerald-500'
    case 'medium': return 'text-amber-500'
    case 'low': return 'text-orange-500'
    case 'critical': return 'text-red-500'
  }
}

// ============================================================================
// Draft ID Generation
// ============================================================================

export const generateDraftId = (): string => {
  const now = new Date()
  const year = now.getFullYear()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `DRAFT-${year}-${random}`
}
