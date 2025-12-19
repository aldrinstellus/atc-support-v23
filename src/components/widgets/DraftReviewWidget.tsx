'use client';

import { useState } from 'react';
import {
  Send,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  AlertCircle,
  Edit3,
  Copy,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  User,
  Bot,
  Loader2,
  Mail,
} from 'lucide-react';
import type { DraftReviewData } from '@/types/widget';
import { getConfidenceColor, getConfidenceLevel } from '@/types/draft';
import type { DraftTone, DraftVersion } from '@/types/draft';
import { RichTextEditor, VersionHistoryPanel, ReadabilityScore, AttachmentPicker } from '@/components/editor';
import type { EmailAttachment } from '@/types/email';

interface DraftReviewWidgetProps {
  data: DraftReviewData;
  onAction?: (action: string, payload?: Record<string, unknown>) => void;
}

export function DraftReviewWidget({ data, onAction }: DraftReviewWidgetProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(data.draftContent);
  const [selectedTone, setSelectedTone] = useState<DraftTone>(data.tone || 'friendly');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);
  // PRD 1.3.4: Send confirmation dialog & duplicate prevention
  const [showSendConfirmation, setShowSendConfirmation] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  // PRD 1.5.1: Attachment management
  const [attachments, setAttachments] = useState<EmailAttachment[]>([]);

  const statusColors: Record<string, string> = {
    GENERATING: 'border-chart-3/30 bg-lime-500/20 text-chart-3',
    PENDING_REVIEW: 'border-chart-4/30 bg-amber-500/20 text-chart-4',
    IN_REVIEW: 'border-primary/30 bg-primary/20 text-primary',
    APPROVED: 'border-success/30 bg-emerald-500/20 text-success',
    REJECTED: 'border-destructive/30 bg-red-500/20 text-destructive',
    SENT: 'border-success/30 bg-emerald-500/20 text-success',
    FAILED: 'border-destructive/30 bg-red-500/20 text-destructive',
    ESCALATED: 'border-chart-4/30 bg-amber-500/20 text-chart-4',
  };

  const priorityColors: Record<string, string> = {
    critical: 'border-destructive/30 bg-red-500/20 text-destructive',
    high: 'border-chart-4/30 bg-amber-500/20 text-chart-4',
    medium: 'border-chart-3/30 bg-lime-500/20 text-chart-3',
    low: 'border-success/30 bg-emerald-500/20 text-success',
  };

  const toneOptions: { value: DraftTone; label: string; description: string }[] = [
    { value: 'formal', label: 'Formal', description: 'Professional, business-like' },
    { value: 'friendly', label: 'Friendly', description: 'Warm, approachable' },
    { value: 'technical', label: 'Technical', description: 'Detailed, precise' },
  ];

  const handleApprove = () => {
    onAction?.('approve', {
      draftId: data.draftId,
      finalContent: isEditing ? editedContent : data.draftContent,
    });
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) return;
    onAction?.('reject', {
      draftId: data.draftId,
      rejectionReason,
    });
    setShowRejectForm(false);
    setRejectionReason('');
  };

  const handleRegenerate = () => {
    onAction?.('regenerate', {
      draftId: data.draftId,
      tone: selectedTone,
    });
  };

  // PRD 1.3.4: Send with confirmation dialog and duplicate prevention
  const handleSend = async () => {
    // Show confirmation dialog first
    if (!showSendConfirmation) {
      setShowSendConfirmation(true);
      setSendError(null);
      return;
    }

    // Prevent duplicate sends
    if (isSending) return;

    setIsSending(true);
    setSendError(null);

    try {
      await onAction?.('send', {
        draftId: data.draftId,
      });
      setShowSendConfirmation(false);
    } catch (error) {
      setSendError(error instanceof Error ? error.message : 'Failed to send email');
    } finally {
      setIsSending(false);
    }
  };

  const cancelSend = () => {
    setShowSendConfirmation(false);
    setSendError(null);
  };

  const handleCopyToClipboard = async () => {
    await navigator.clipboard.writeText(isEditing ? editedContent : data.draftContent);
    onAction?.('copied', { draftId: data.draftId });
  };

  const confidenceColor = getConfidenceColor(data.confidenceScore);
  const confidenceLevel = getConfidenceLevel(data.confidenceScore);

  return (
    <div className="space-y-6 my-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Draft Review
          </h3>
          <p className="text-sm text-muted-foreground">
            Review and approve AI-generated response for {data.ticketId}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2 py-1 rounded-full uppercase font-medium border ${statusColors[data.status]}`}
          >
            {data.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Split View Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Panel: Original Ticket */}
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-3">
            <User className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-sm font-semibold text-foreground">Original Ticket</h4>
          </div>

          <div className="space-y-3">
            {/* Ticket Info */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono text-primary font-semibold">
                {data.ticketId}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-full uppercase font-medium border ${priorityColors[data.priority.toLowerCase()]}`}
              >
                {data.priority}
              </span>
              {data.category && (
                <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  {data.category.replace('_', ' ')}
                </span>
              )}
            </div>

            {/* Subject */}
            <div>
              <div className="text-xs text-muted-foreground mb-1">Subject</div>
              <div className="text-sm font-medium text-foreground">{data.ticketSubject}</div>
            </div>

            {/* Customer */}
            <div className="flex items-center gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Customer: </span>
                <span className="text-foreground">{data.customerName}</span>
              </div>
              {data.customerEmail && (
                <div className="text-xs text-muted-foreground">{data.customerEmail}</div>
              )}
            </div>

            {/* Original Content */}
            <div className="pt-3 border-t border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-xs text-muted-foreground">Customer Message</div>
                <Clock className="h-3 w-3 text-muted-foreground" />
                <div className="text-xs text-muted-foreground">
                  {new Date(data.generatedAt).toLocaleString()}
                </div>
              </div>
              <div className="bg-muted/50 rounded p-3 max-h-64 overflow-y-auto">
                <p className="text-sm text-foreground whitespace-pre-wrap">
                  {data.originalContent}
                </p>
              </div>
            </div>

            {/* Sentiment/Complexity */}
            {(data.sentiment || data.complexity) && (
              <div className="flex items-center gap-3 pt-2">
                {data.sentiment && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">Sentiment:</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      data.sentiment === 'satisfied' ? 'bg-success/20 text-success' :
                      data.sentiment === 'frustrated' ? 'bg-destructive/20 text-destructive' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {data.sentiment}
                    </span>
                  </div>
                )}
                {data.complexity && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">Complexity:</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      data.complexity === 'complex' ? 'bg-destructive/20 text-destructive' :
                      data.complexity === 'moderate' ? 'bg-chart-4/20 text-chart-4' :
                      'bg-success/20 text-success'
                    }`}>
                      {data.complexity}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: AI Draft */}
        <div className="glass-card rounded-lg border border-primary/30 bg-primary/10 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-semibold text-foreground">AI-Generated Response</h4>
              <Sparkles className="h-3 w-3 text-primary animate-pulse" />
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                isEditing
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Edit3 className="h-3 w-3" />
              {isEditing ? 'Editing' : 'Edit'}
            </button>
          </div>

          {/* Confidence Score */}
          <div className="flex items-center gap-3 mb-3 p-2 rounded bg-card/50">
            <div className="flex items-center gap-2">
              <div className="text-xs text-muted-foreground">Confidence:</div>
              <div className={`text-sm font-semibold ${confidenceColor}`}>
                {data.confidenceScore.toFixed(1)}%
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${confidenceColor} bg-current/10`}>
                {confidenceLevel}
              </span>
            </div>
            {data.modelVersion && (
              <div className="text-xs text-muted-foreground ml-auto">
                Model: {data.modelVersion}
              </div>
            )}
          </div>

          {/* Tone Selector */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-muted-foreground">Tone:</span>
            {toneOptions.map((tone) => (
              <button
                key={tone.value}
                onClick={() => setSelectedTone(tone.value)}
                className={`text-xs px-2 py-1 rounded-full font-medium transition-colors ${
                  selectedTone === tone.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
                title={tone.description}
              >
                {tone.label}
              </button>
            ))}
          </div>

          {/* Draft Content */}
          <div className="mb-4">
            {isEditing ? (
              <RichTextEditor
                content={editedContent}
                onChange={setEditedContent}
                placeholder="Edit the response..."
                minHeight="200px"
                maxHeight="400px"
                showSpellCheck={true}
              />
            ) : (
              <div className="bg-card/70 rounded-lg p-4 border border-border/50 max-h-64 overflow-y-auto">
                <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                  {data.draftContent}
                </p>
              </div>
            )}
          </div>

          {/* Readability Score - PRD 1.3.6 */}
          <ReadabilityScore
            content={isEditing ? editedContent : data.draftContent}
            showDetails={true}
            className="mb-4"
          />

          {/* KB Articles Used */}
          {data.kbArticlesUsed && data.kbArticlesUsed.length > 0 && (
            <div className="mb-4 pb-3 border-b border-border/50">
              <div className="text-xs text-muted-foreground mb-2">Knowledge Base References:</div>
              <div className="flex flex-wrap gap-1">
                {data.kbArticlesUsed.map((articleId) => (
                  <span
                    key={articleId}
                    className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono"
                  >
                    {articleId}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyToClipboard}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
              title="Copy to clipboard"
            >
              <Copy className="h-3 w-3" />
              Copy
            </button>
            <button
              onClick={handleRegenerate}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
              title="Regenerate with selected tone"
            >
              <RefreshCw className="h-3 w-3" />
              Regenerate
            </button>
          </div>
        </div>
      </div>

      {/* Version History - PRD 1.3.5: Enhanced with Rollback & Diff Viewer */}
      {data.versions && data.versions.length > 0 && (
        <VersionHistoryPanel
          versions={data.versions as DraftVersion[]}
          currentVersion={data.versions.length}
          onRollback={(version) => {
            setEditedContent(version.content);
            setIsEditing(true);
            onAction?.('rollback', { draftId: data.draftId, version: version.version });
          }}
          onPreview={(version) => {
            onAction?.('previewVersion', { draftId: data.draftId, version: version.version, content: version.content });
          }}
        />
      )}

      {/* PRD 1.5.1: Attachment Picker */}
      {(data.status === 'APPROVED' || data.status === 'PENDING_REVIEW' || data.status === 'IN_REVIEW') && (
        <AttachmentPicker
          draftId={data.draftId}
          attachments={attachments}
          onAttachmentsChange={setAttachments}
          disabled={isSending}
        />
      )}

      {/* PRD 1.3.4: Send Confirmation Dialog */}
      {showSendConfirmation && (
        <div className="glass-card rounded-lg border border-primary/30 bg-primary/10 p-4 backdrop-blur-md">
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            Confirm Send Email
          </h4>
          <div className="space-y-3 mb-4">
            <p className="text-sm text-muted-foreground">
              You are about to send this email to:
            </p>
            <div className="bg-card/70 rounded p-3 border border-border/50">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{data.customerName}</span>
                {data.customerEmail && (
                  <span className="text-xs text-muted-foreground">({data.customerEmail})</span>
                )}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Subject: {data.ticketSubject}
              </div>
            </div>
            {sendError && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                {sendError}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSend}
              disabled={isSending}
              className="flex items-center gap-2 px-4 py-2 rounded font-medium text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Confirm &amp; Send
                </>
              )}
            </button>
            <button
              onClick={cancelSend}
              disabled={isSending}
              className="px-4 py-2 rounded font-medium text-sm bg-muted text-muted-foreground hover:bg-muted/80 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Rejection Form */}
      {showRejectForm && (
        <div className="glass-card rounded-lg border border-destructive/30 bg-destructive/10 p-4 backdrop-blur-md">
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-destructive" />
            Rejection Reason
          </h4>
          <textarea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="w-full min-h-[100px] p-3 rounded bg-card border border-border text-sm text-foreground resize-y focus:outline-none focus:ring-2 focus:ring-destructive mb-3"
            placeholder="Please provide a reason for rejecting this draft..."
          />
          <div className="flex items-center gap-2">
            <button
              onClick={handleReject}
              disabled={!rejectionReason.trim()}
              className="flex items-center gap-2 px-4 py-2 rounded font-medium text-sm bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <XCircle className="h-4 w-4" />
              Confirm Rejection
            </button>
            <button
              onClick={() => {
                setShowRejectForm(false);
                setRejectionReason('');
              }}
              className="px-4 py-2 rounded font-medium text-sm bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAction?.('thumbsUp', { draftId: data.draftId })}
            className="p-2 rounded hover:bg-success/20 transition-colors"
            title="Helpful"
          >
            <ThumbsUp className="h-4 w-4 text-muted-foreground hover:text-success" />
          </button>
          <button
            onClick={() => onAction?.('thumbsDown', { draftId: data.draftId })}
            className="p-2 rounded hover:bg-destructive/20 transition-colors"
            title="Not helpful"
          >
            <ThumbsDown className="h-4 w-4 text-muted-foreground hover:text-destructive" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          {data.status !== 'APPROVED' && data.status !== 'SENT' && (
            <>
              <button
                onClick={() => setShowRejectForm(true)}
                className="flex items-center gap-2 px-4 py-2 rounded font-medium text-sm bg-muted text-muted-foreground hover:bg-destructive/20 hover:text-destructive transition-colors"
              >
                <XCircle className="h-4 w-4" />
                Reject
              </button>
              <button
                onClick={handleApprove}
                className="flex items-center gap-2 px-4 py-2 rounded font-medium text-sm bg-success text-success-foreground hover:bg-success/90 transition-colors"
              >
                <CheckCircle2 className="h-4 w-4" />
                Approve
              </button>
            </>
          )}

          {data.status === 'APPROVED' && (
            <button
              onClick={handleSend}
              disabled={isSending}
              className="flex items-center gap-2 px-4 py-2 rounded font-medium text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send to Customer
                </>
              )}
            </button>
          )}

          {data.status === 'SENT' && (
            <div className="flex items-center gap-2 text-success">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm font-medium">Sent Successfully</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
