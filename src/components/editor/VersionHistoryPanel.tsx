'use client';

import { useState } from 'react';
import {
  History,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Eye,
  GitCompare,
  Clock,
  User,
  Bot,
  Check,
  X,
} from 'lucide-react';
import type { DraftVersion } from '@/types/draft';

interface VersionHistoryPanelProps {
  versions: DraftVersion[];
  currentVersion: number;
  onRollback?: (version: DraftVersion) => void;
  onPreview?: (version: DraftVersion) => void;
  className?: string;
}

export function VersionHistoryPanel({
  versions,
  currentVersion,
  onRollback,
  onPreview,
  className = '',
}: VersionHistoryPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<DraftVersion | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareVersions, setCompareVersions] = useState<[DraftVersion | null, DraftVersion | null]>([null, null]);

  const sortedVersions = [...versions].sort((a, b) => b.version - a.version);

  const handleVersionSelect = (version: DraftVersion) => {
    if (compareMode) {
      if (!compareVersions[0]) {
        setCompareVersions([version, null]);
      } else if (!compareVersions[1]) {
        setCompareVersions([compareVersions[0], version]);
      } else {
        setCompareVersions([version, null]);
      }
    } else {
      setSelectedVersion(selectedVersion?.id === version.id ? null : version);
    }
  };

  const toggleCompareMode = () => {
    setCompareMode(!compareMode);
    setCompareVersions([null, null]);
    setSelectedVersion(null);
  };

  const getEditTypeColor = (editType?: string) => {
    switch (editType) {
      case 'AI_GENERATED':
        return 'bg-primary/20 text-primary border-primary/30';
      case 'AGENT_EDIT':
        return 'bg-chart-4/20 text-chart-4 border-chart-4/30';
      case 'REGENERATE':
        return 'bg-chart-3/20 text-chart-3 border-chart-3/30';
      case 'TONE_CHANGE':
        return 'bg-violet-500/20 text-violet-400 border-violet-500/30';
      case 'AUTO_SAVE':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getEditTypeLabel = (editType?: string) => {
    switch (editType) {
      case 'AI_GENERATED':
        return 'AI Generated';
      case 'AGENT_EDIT':
        return 'Agent Edit';
      case 'REGENERATE':
        return 'Regenerated';
      case 'TONE_CHANGE':
        return 'Tone Changed';
      case 'AUTO_SAVE':
        return 'Auto Saved';
      default:
        return 'Initial';
    }
  };

  return (
    <div className={`glass-card rounded-lg border border-border bg-card/70 backdrop-blur-md ${className}`}>
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-muted-foreground" />
          <h4 className="text-sm font-semibold text-foreground">
            Version History
          </h4>
          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
            {versions.length} versions
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isExpanded && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleCompareMode();
              }}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                compareMode
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <GitCompare className="h-3 w-3" />
              Compare
            </button>
          )}
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Version List */}
      {isExpanded && (
        <div className="border-t border-border">
          {/* Compare Mode Selection Info */}
          {compareMode && (
            <div className="px-4 py-2 bg-primary/10 border-b border-border text-xs text-primary">
              {!compareVersions[0]
                ? 'Select first version to compare'
                : !compareVersions[1]
                ? 'Select second version to compare'
                : 'Comparing versions'}
            </div>
          )}

          <div className="max-h-64 overflow-y-auto">
            {sortedVersions.map((version) => {
              const isSelected = selectedVersion?.id === version.id;
              const isCompareSelected =
                compareVersions[0]?.id === version.id || compareVersions[1]?.id === version.id;
              const isCurrent = version.version === currentVersion;

              return (
                <div
                  key={version.id}
                  onClick={() => handleVersionSelect(version)}
                  className={`flex items-center justify-between p-3 border-b border-border/50 cursor-pointer transition-colors ${
                    isSelected || isCompareSelected
                      ? 'bg-primary/10'
                      : 'hover:bg-muted/30'
                  } ${isCurrent ? 'border-l-2 border-l-primary' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    {/* Version Number */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono font-semibold text-primary">
                        v{version.version}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-success/20 text-success font-medium">
                          CURRENT
                        </span>
                      )}
                    </div>

                    {/* Edit Type Badge */}
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border ${getEditTypeColor(
                        version.editType
                      )}`}
                    >
                      {getEditTypeLabel(version.editType)}
                    </span>

                    {/* Editor Info */}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {version.editType === 'AI_GENERATED' || version.editType === 'REGENERATE' ? (
                        <Bot className="h-3 w-3" />
                      ) : (
                        <User className="h-3 w-3" />
                      )}
                      <span>{version.editedByName || 'System'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Change Percent */}
                    {version.changePercent != null && version.changePercent > 0 && (
                      <span
                        className={`text-xs font-medium ${
                          version.changePercent > 30
                            ? 'text-destructive'
                            : version.changePercent > 15
                            ? 'text-chart-4'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {version.changePercent.toFixed(0)}% changed
                      </span>
                    )}

                    {/* Timestamp */}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(version.createdAt).toLocaleString()}</span>
                    </div>

                    {/* Compare Selection Indicator */}
                    {compareMode && isCompareSelected && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Version Actions */}
          {selectedVersion && !compareMode && (
            <div className="p-4 border-t border-border bg-muted/30">
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-sm font-medium text-foreground">
                  Version {selectedVersion.version} Details
                </h5>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onPreview?.(selectedVersion)}
                    className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
                  >
                    <Eye className="h-3 w-3" />
                    Preview
                  </button>
                  {selectedVersion.version !== currentVersion && (
                    <button
                      onClick={() => onRollback?.(selectedVersion)}
                      className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-chart-4/20 text-chart-4 hover:bg-chart-4/30 transition-colors"
                    >
                      <RotateCcw className="h-3 w-3" />
                      Rollback
                    </button>
                  )}
                </div>
              </div>

              {/* Version Content Preview */}
              <div className="bg-card rounded-lg p-3 border border-border/50 max-h-32 overflow-y-auto">
                <p className="text-sm text-foreground whitespace-pre-wrap">
                  {selectedVersion.content.slice(0, 500)}
                  {selectedVersion.content.length > 500 && '...'}
                </p>
              </div>
            </div>
          )}

          {/* Compare View */}
          {compareMode && compareVersions[0] && compareVersions[1] && (
            <DiffViewer
              oldVersion={compareVersions[0]}
              newVersion={compareVersions[1]}
              onClose={() => setCompareVersions([null, null])}
            />
          )}
        </div>
      )}
    </div>
  );
}

// Diff Viewer Component
interface DiffViewerProps {
  oldVersion: DraftVersion;
  newVersion: DraftVersion;
  onClose: () => void;
}

function DiffViewer({ oldVersion, newVersion, onClose }: DiffViewerProps) {
  // Simple diff algorithm - in production, use a library like diff-match-patch
  const computeDiff = (oldText: string, newText: string) => {
    const oldLines = oldText.split('\n');
    const newLines = newText.split('\n');
    const maxLen = Math.max(oldLines.length, newLines.length);
    const diffs: Array<{ type: 'same' | 'added' | 'removed' | 'changed'; oldLine?: string; newLine?: string }> = [];

    for (let i = 0; i < maxLen; i++) {
      const oldLine = oldLines[i];
      const newLine = newLines[i];

      if (oldLine === newLine) {
        diffs.push({ type: 'same', oldLine, newLine });
      } else if (oldLine === undefined) {
        diffs.push({ type: 'added', newLine });
      } else if (newLine === undefined) {
        diffs.push({ type: 'removed', oldLine });
      } else {
        diffs.push({ type: 'changed', oldLine, newLine });
      }
    }

    return diffs;
  };

  const diffs = computeDiff(oldVersion.content, newVersion.content);

  return (
    <div className="p-4 border-t border-border bg-muted/30">
      <div className="flex items-center justify-between mb-3">
        <h5 className="text-sm font-medium text-foreground">
          Comparing v{oldVersion.version} → v{newVersion.version}
        </h5>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-muted transition-colors"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Side by side diff */}
      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        {/* Old Version Header */}
        <div className="bg-destructive/10 rounded-t px-2 py-1 text-destructive font-medium">
          v{oldVersion.version} (Old)
        </div>
        {/* New Version Header */}
        <div className="bg-success/10 rounded-t px-2 py-1 text-success font-medium">
          v{newVersion.version} (New)
        </div>

        {/* Diff Content */}
        <div className="bg-card rounded-b border border-border/50 p-2 max-h-48 overflow-y-auto">
          {diffs.map((diff, idx) => (
            <div
              key={idx}
              className={`py-0.5 ${
                diff.type === 'removed' || diff.type === 'changed'
                  ? 'bg-destructive/10 text-destructive'
                  : diff.type === 'same'
                  ? 'text-muted-foreground'
                  : 'opacity-30'
              }`}
            >
              {diff.type === 'added' ? (
                <span className="opacity-30">-</span>
              ) : (
                diff.oldLine || <span>&nbsp;</span>
              )}
            </div>
          ))}
        </div>
        <div className="bg-card rounded-b border border-border/50 p-2 max-h-48 overflow-y-auto">
          {diffs.map((diff, idx) => (
            <div
              key={idx}
              className={`py-0.5 ${
                diff.type === 'added' || diff.type === 'changed'
                  ? 'bg-success/10 text-success'
                  : diff.type === 'same'
                  ? 'text-muted-foreground'
                  : 'opacity-30'
              }`}
            >
              {diff.type === 'removed' ? (
                <span className="opacity-30">-</span>
              ) : (
                diff.newLine || <span>&nbsp;</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Diff Stats */}
      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
        <span className="text-success">
          +{diffs.filter((d) => d.type === 'added' || d.type === 'changed').length} additions
        </span>
        <span className="text-destructive">
          -{diffs.filter((d) => d.type === 'removed' || d.type === 'changed').length} deletions
        </span>
      </div>
    </div>
  );
}
