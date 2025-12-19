'use client';

/**
 * AttachmentPicker Component
 * PRD 1.5.1: File Attachment UI for Email Drafts
 *
 * Provides a UI for uploading, viewing, and managing email attachments.
 */

import { useState, useRef, useCallback } from 'react';
import {
  Paperclip,
  Upload,
  X,
  File,
  FileText,
  Image,
  FileSpreadsheet,
  FileArchive,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import type { EmailAttachment, AttachmentType } from '@/types/email';
import { formatFileSize, EMAIL_CONFIG, isAllowedExtension } from '@/types/email';

interface AttachmentPickerProps {
  draftId: string;
  attachments: EmailAttachment[];
  onAttachmentsChange?: (attachments: EmailAttachment[]) => void;
  disabled?: boolean;
  className?: string;
}

const attachmentIcons: Record<AttachmentType, React.ReactNode> = {
  document: <FileText className="h-4 w-4 text-blue-500" />,
  image: <Image className="h-4 w-4 text-green-500" />,
  spreadsheet: <FileSpreadsheet className="h-4 w-4 text-emerald-500" />,
  presentation: <FileText className="h-4 w-4 text-orange-500" />,
  archive: <FileArchive className="h-4 w-4 text-purple-500" />,
  text: <FileText className="h-4 w-4 text-gray-500" />,
  other: <File className="h-4 w-4 text-muted-foreground" />,
};

export function AttachmentPicker({
  draftId,
  attachments,
  onAttachmentsChange,
  disabled = false,
  className = '',
}: AttachmentPickerProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSize = attachments.reduce((sum, att) => sum + att.size, 0);
  const canAddMore = attachments.length < EMAIL_CONFIG.MAX_ATTACHMENTS &&
    totalSize < EMAIL_CONFIG.MAX_TOTAL_SIZE;

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploadError(null);
    setIsUploading(true);

    const newAttachments: EmailAttachment[] = [...attachments];

    for (const file of Array.from(files)) {
      // Validate file extension
      if (!isAllowedExtension(file.name)) {
        setUploadError(`File type not allowed: ${file.name}`);
        continue;
      }

      // Validate file size
      if (file.size > EMAIL_CONFIG.MAX_ATTACHMENT_SIZE) {
        setUploadError(`File too large: ${file.name} (max ${formatFileSize(EMAIL_CONFIG.MAX_ATTACHMENT_SIZE)})`);
        continue;
      }

      // Check attachment limits
      if (newAttachments.length >= EMAIL_CONFIG.MAX_ATTACHMENTS) {
        setUploadError(`Maximum ${EMAIL_CONFIG.MAX_ATTACHMENTS} attachments allowed`);
        break;
      }

      const newTotalSize = newAttachments.reduce((sum, att) => sum + att.size, 0) + file.size;
      if (newTotalSize > EMAIL_CONFIG.MAX_TOTAL_SIZE) {
        setUploadError(`Total size would exceed ${formatFileSize(EMAIL_CONFIG.MAX_TOTAL_SIZE)}`);
        break;
      }

      try {
        // Upload to API
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`/api/drafts/${draftId}/attachments`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (data.success && data.attachment) {
          newAttachments.push(data.attachment);
        } else {
          setUploadError(data.error || `Failed to upload ${file.name}`);
        }
      } catch {
        setUploadError(`Failed to upload ${file.name}`);
      }
    }

    setIsUploading(false);
    onAttachmentsChange?.(newAttachments);

    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [attachments, draftId, onAttachmentsChange]);

  const handleRemoveAttachment = useCallback(async (attachmentId: string) => {
    try {
      const response = await fetch(
        `/api/drafts/${draftId}/attachments?attachmentId=${attachmentId}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        const newAttachments = attachments.filter((a) => a.id !== attachmentId);
        onAttachmentsChange?.(newAttachments);
      }
    } catch {
      setUploadError('Failed to remove attachment');
    }
  }, [attachments, draftId, onAttachmentsChange]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && canAddMore) {
      setIsDragging(true);
    }
  }, [disabled, canAddMore]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled && canAddMore) {
      handleFileSelect(e.dataTransfer.files);
    }
  }, [disabled, canAddMore, handleFileSelect]);

  return (
    <div className={`rounded-lg border border-border bg-card/70 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <Paperclip className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Attachments</span>
          <span className="text-xs text-muted-foreground">
            ({attachments.length}/{EMAIL_CONFIG.MAX_ATTACHMENTS})
          </span>
        </div>
        <div className="text-xs text-muted-foreground">
          {formatFileSize(totalSize)} / {formatFileSize(EMAIL_CONFIG.MAX_TOTAL_SIZE)}
        </div>
      </div>

      {/* Drop Zone / Upload Area */}
      <div
        className={`p-4 ${isDragging ? 'bg-primary/10 border-2 border-dashed border-primary' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Attachment List */}
        {attachments.length > 0 && (
          <div className="space-y-2 mb-4">
            {attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center justify-between p-2 rounded bg-muted/30 border border-border/50"
              >
                <div className="flex items-center gap-2 min-w-0">
                  {attachmentIcons[attachment.type]}
                  <div className="min-w-0">
                    <div className="text-sm text-foreground truncate" title={attachment.originalName}>
                      {attachment.originalName}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatFileSize(attachment.size)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveAttachment(attachment.id)}
                  disabled={disabled}
                  className="p-1 rounded hover:bg-destructive/20 transition-colors disabled:opacity-50"
                  title="Remove attachment"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload Button */}
        {canAddMore && !disabled && (
          <div className="flex flex-col items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={EMAIL_CONFIG.ALLOWED_EXTENSIONS.join(',')}
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
              disabled={disabled || isUploading}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled || isUploading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Add Attachment
                </>
              )}
            </button>
            <span className="text-xs text-muted-foreground text-center">
              Drag &amp; drop files here or click to browse
            </span>
          </div>
        )}

        {/* Max attachments reached */}
        {!canAddMore && attachments.length >= EMAIL_CONFIG.MAX_ATTACHMENTS && (
          <div className="text-xs text-muted-foreground text-center">
            Maximum attachments reached
          </div>
        )}

        {/* Error Message */}
        {uploadError && (
          <div className="flex items-center gap-2 mt-3 p-2 rounded bg-destructive/10 border border-destructive/30">
            <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
            <span className="text-sm text-destructive">{uploadError}</span>
            <button
              onClick={() => setUploadError(null)}
              className="ml-auto p-1 rounded hover:bg-destructive/20"
            >
              <X className="h-3 w-3 text-destructive" />
            </button>
          </div>
        )}
      </div>

      {/* Allowed Types Footer */}
      <div className="px-3 py-2 border-t border-border/50 bg-muted/20">
        <div className="text-[10px] text-muted-foreground">
          Allowed: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, CSV, ZIP, Images (JPG, PNG, GIF)
        </div>
      </div>
    </div>
  );
}
