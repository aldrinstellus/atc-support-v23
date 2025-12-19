'use client';

/**
 * DiffViewer Component
 * PRD 1.3.3: Compare original vs regenerated drafts
 *
 * Provides side-by-side and inline diff views for version comparison.
 */

import { useState, useMemo } from 'react';
import {
  GitCompare,
  Columns,
  AlignJustify,
  Plus,
  Minus,
  Equal,
} from 'lucide-react';

interface DiffViewerProps {
  original: string;
  modified: string;
  originalLabel?: string;
  modifiedLabel?: string;
  className?: string;
}

type DiffType = 'added' | 'removed' | 'unchanged';

interface DiffLine {
  type: DiffType;
  content: string;
  lineNumber: {
    original?: number;
    modified?: number;
  };
}

/**
 * Simple diff algorithm - compares lines
 */
function computeDiff(original: string, modified: string): DiffLine[] {
  const originalLines = original.split('\n');
  const modifiedLines = modified.split('\n');
  const result: DiffLine[] = [];

  // Use a simple LCS-based approach for line-level diff
  const lcs = computeLCS(originalLines, modifiedLines);

  let origIdx = 0;
  let modIdx = 0;
  let lcsIdx = 0;
  let origLineNum = 1;
  let modLineNum = 1;

  while (origIdx < originalLines.length || modIdx < modifiedLines.length) {
    if (lcsIdx < lcs.length && origIdx < originalLines.length && originalLines[origIdx] === lcs[lcsIdx]) {
      if (modIdx < modifiedLines.length && modifiedLines[modIdx] === lcs[lcsIdx]) {
        // Unchanged line
        result.push({
          type: 'unchanged',
          content: originalLines[origIdx],
          lineNumber: { original: origLineNum, modified: modLineNum },
        });
        origIdx++;
        modIdx++;
        lcsIdx++;
        origLineNum++;
        modLineNum++;
      } else {
        // Added line in modified
        result.push({
          type: 'added',
          content: modifiedLines[modIdx],
          lineNumber: { modified: modLineNum },
        });
        modIdx++;
        modLineNum++;
      }
    } else if (origIdx < originalLines.length) {
      if (modIdx < modifiedLines.length && (lcsIdx >= lcs.length || modifiedLines[modIdx] !== lcs[lcsIdx])) {
        // Check if it's a modification (similar position)
        result.push({
          type: 'removed',
          content: originalLines[origIdx],
          lineNumber: { original: origLineNum },
        });
        origIdx++;
        origLineNum++;
      } else {
        // Removed line
        result.push({
          type: 'removed',
          content: originalLines[origIdx],
          lineNumber: { original: origLineNum },
        });
        origIdx++;
        origLineNum++;
      }
    } else if (modIdx < modifiedLines.length) {
      // Added line
      result.push({
        type: 'added',
        content: modifiedLines[modIdx],
        lineNumber: { modified: modLineNum },
      });
      modIdx++;
      modLineNum++;
    }
  }

  return result;
}

/**
 * Compute Longest Common Subsequence for line arrays
 */
function computeLCS(a: string[], b: string[]): string[] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to find LCS
  const lcs: string[] = [];
  let i = m, j = n;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      lcs.unshift(a[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return lcs;
}

/**
 * Compute word-level diff for inline highlighting
 */
function computeWordDiff(original: string, modified: string): { original: string[]; modified: string[] } {
  const origWords = original.split(/(\s+)/);
  const modWords = modified.split(/(\s+)/);

  return { original: origWords, modified: modWords };
}

export function DiffViewer({
  original,
  modified,
  originalLabel = 'Original',
  modifiedLabel = 'Modified',
  className = '',
}: DiffViewerProps) {
  const [viewMode, setViewMode] = useState<'split' | 'inline'>('split');

  const diffLines = useMemo(() => computeDiff(original, modified), [original, modified]);

  const stats = useMemo(() => {
    const added = diffLines.filter(l => l.type === 'added').length;
    const removed = diffLines.filter(l => l.type === 'removed').length;
    const unchanged = diffLines.filter(l => l.type === 'unchanged').length;
    return { added, removed, unchanged };
  }, [diffLines]);

  const getDiffIcon = (type: DiffType) => {
    switch (type) {
      case 'added': return <Plus className="h-3 w-3 text-success" />;
      case 'removed': return <Minus className="h-3 w-3 text-destructive" />;
      default: return <Equal className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const getDiffBgColor = (type: DiffType) => {
    switch (type) {
      case 'added': return 'bg-success/10 border-l-2 border-success';
      case 'removed': return 'bg-destructive/10 border-l-2 border-destructive';
      default: return '';
    }
  };

  return (
    <div className={`rounded-lg border border-border bg-card/70 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <GitCompare className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Version Comparison</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Stats */}
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-success">
              <Plus className="h-3 w-3" />
              {stats.added} added
            </span>
            <span className="flex items-center gap-1 text-destructive">
              <Minus className="h-3 w-3" />
              {stats.removed} removed
            </span>
          </div>
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode('split')}
              className={`p-1.5 rounded ${viewMode === 'split' ? 'bg-card shadow-sm' : 'hover:bg-card/50'}`}
              title="Split view"
            >
              <Columns className="h-4 w-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => setViewMode('inline')}
              className={`p-1.5 rounded ${viewMode === 'inline' ? 'bg-card shadow-sm' : 'hover:bg-card/50'}`}
              title="Inline view"
            >
              <AlignJustify className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Diff Content */}
      {viewMode === 'split' ? (
        <SplitView
          diffLines={diffLines}
          originalLabel={originalLabel}
          modifiedLabel={modifiedLabel}
          getDiffBgColor={getDiffBgColor}
        />
      ) : (
        <InlineView
          diffLines={diffLines}
          getDiffIcon={getDiffIcon}
          getDiffBgColor={getDiffBgColor}
        />
      )}
    </div>
  );
}

// Split View Component
function SplitView({
  diffLines,
  originalLabel,
  modifiedLabel,
  getDiffBgColor,
}: {
  diffLines: DiffLine[];
  originalLabel: string;
  modifiedLabel: string;
  getDiffBgColor: (type: DiffType) => string;
}) {
  // Separate into original and modified columns
  const originalLines = diffLines.filter(l => l.type === 'removed' || l.type === 'unchanged');
  const modifiedLines = diffLines.filter(l => l.type === 'added' || l.type === 'unchanged');

  return (
    <div className="grid grid-cols-2 divide-x divide-border">
      {/* Original Side */}
      <div>
        <div className="px-3 py-2 bg-muted/30 border-b border-border/50">
          <span className="text-xs font-medium text-muted-foreground">{originalLabel}</span>
        </div>
        <div className="max-h-96 overflow-y-auto font-mono text-xs">
          {originalLines.map((line, idx) => (
            <div
              key={`orig-${idx}`}
              className={`flex items-start gap-2 px-3 py-1 ${line.type === 'removed' ? getDiffBgColor('removed') : ''}`}
            >
              <span className="w-8 text-right text-muted-foreground select-none">
                {line.lineNumber.original || ''}
              </span>
              <span className={`flex-1 whitespace-pre-wrap ${line.type === 'removed' ? 'text-destructive' : 'text-foreground'}`}>
                {line.content || '\u00A0'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Modified Side */}
      <div>
        <div className="px-3 py-2 bg-muted/30 border-b border-border/50">
          <span className="text-xs font-medium text-muted-foreground">{modifiedLabel}</span>
        </div>
        <div className="max-h-96 overflow-y-auto font-mono text-xs">
          {modifiedLines.map((line, idx) => (
            <div
              key={`mod-${idx}`}
              className={`flex items-start gap-2 px-3 py-1 ${line.type === 'added' ? getDiffBgColor('added') : ''}`}
            >
              <span className="w-8 text-right text-muted-foreground select-none">
                {line.lineNumber.modified || ''}
              </span>
              <span className={`flex-1 whitespace-pre-wrap ${line.type === 'added' ? 'text-success' : 'text-foreground'}`}>
                {line.content || '\u00A0'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Inline View Component
function InlineView({
  diffLines,
  getDiffIcon,
  getDiffBgColor,
}: {
  diffLines: DiffLine[];
  getDiffIcon: (type: DiffType) => React.ReactNode;
  getDiffBgColor: (type: DiffType) => string;
}) {
  return (
    <div className="max-h-96 overflow-y-auto font-mono text-xs">
      {diffLines.map((line, idx) => (
        <div
          key={idx}
          className={`flex items-start gap-2 px-3 py-1 ${getDiffBgColor(line.type)}`}
        >
          <span className="w-4 flex-shrink-0">{getDiffIcon(line.type)}</span>
          <span className="w-8 text-right text-muted-foreground select-none">
            {line.lineNumber.original || line.lineNumber.modified || ''}
          </span>
          <span className={`flex-1 whitespace-pre-wrap ${
            line.type === 'added' ? 'text-success' :
            line.type === 'removed' ? 'text-destructive' :
            'text-foreground'
          }`}>
            {line.content || '\u00A0'}
          </span>
        </div>
      ))}
    </div>
  );
}
