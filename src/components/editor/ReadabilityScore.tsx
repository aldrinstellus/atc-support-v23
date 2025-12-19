'use client';

import { useMemo, useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Users,
  AlertTriangle,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { analyzeReadability, type ReadabilityResult } from '@/lib/readability';

interface ReadabilityScoreProps {
  content: string;
  className?: string;
  showDetails?: boolean;
}

export function ReadabilityScore({
  content,
  className = '',
  showDetails = false,
}: ReadabilityScoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const analysis = useMemo(() => {
    // Strip HTML tags for analysis
    const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    if (!plainText || plainText.length < 10) {
      return null;
    }
    return analyzeReadability(plainText);
  }, [content]);

  if (!analysis) {
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 60 && score <= 80) return 'text-success';
    if (score >= 50 && score <= 90) return 'text-chart-3';
    if (score >= 30) return 'text-chart-4';
    return 'text-destructive';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 60 && score <= 80) return 'bg-success/20';
    if (score >= 50 && score <= 90) return 'bg-chart-3/20';
    if (score >= 30) return 'bg-chart-4/20';
    return 'bg-destructive/20';
  };

  const getGradeIcon = (grade: number) => {
    if (grade <= 8) return <CheckCircle2 className="h-3 w-3 text-success" />;
    if (grade <= 12) return <Info className="h-3 w-3 text-chart-4" />;
    return <AlertTriangle className="h-3 w-3 text-destructive" />;
  };

  return (
    <div className={`rounded-lg border border-border bg-card/70 ${className}`}>
      {/* Compact View */}
      <div
        className={`flex items-center justify-between p-3 ${showDetails ? 'cursor-pointer hover:bg-muted/30' : ''}`}
        onClick={() => showDetails && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <BookOpen className="h-4 w-4 text-muted-foreground" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Readability:</span>
            <span className={`text-sm font-semibold ${getScoreColor(analysis.fleschReadingEase)}`}>
              {analysis.fleschReadingEase.toFixed(0)}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${getScoreBgColor(analysis.fleschReadingEase)} ${getScoreColor(analysis.fleschReadingEase)}`}
            >
              {analysis.readabilityLabel}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Grade Level */}
          <div className="flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Grade {analysis.averageGradeLevel.toFixed(0)}</span>
            {getGradeIcon(analysis.averageGradeLevel)}
          </div>

          {/* Audience */}
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{analysis.audienceLevel}</span>
          </div>

          {showDetails && (
            isExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )
          )}
        </div>
      </div>

      {/* Expanded Details */}
      {showDetails && isExpanded && (
        <div className="border-t border-border p-4 space-y-4">
          {/* Score Breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <ScoreCard
              label="Flesch Reading Ease"
              value={analysis.fleschReadingEase}
              description="0-100 scale, higher = easier"
              isPercentage
            />
            <ScoreCard
              label="Flesch-Kincaid"
              value={analysis.fleschKincaidGrade}
              description="US grade level"
              suffix="grade"
            />
            <ScoreCard
              label="ARI"
              value={analysis.automatedReadabilityIndex}
              description="Automated Readability Index"
              suffix="grade"
            />
            <ScoreCard
              label="SMOG"
              value={analysis.smogIndex}
              description="Years of education needed"
              suffix="years"
            />
            <ScoreCard
              label="Coleman-Liau"
              value={analysis.colemanLiauIndex}
              description="Character-based grade level"
              suffix="grade"
            />
          </div>

          {/* Text Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard label="Sentences" value={analysis.stats.sentences} />
            <StatCard label="Words" value={analysis.stats.words} />
            <StatCard label="Avg Words/Sentence" value={analysis.stats.avgWordsPerSentence.toFixed(1)} />
            <StatCard label="Complex Words" value={`${analysis.stats.complexWordPercent.toFixed(0)}%`} />
          </div>

          {/* Suggestions */}
          {analysis.suggestions.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-xs font-medium text-muted-foreground">Suggestions</h5>
              <ul className="space-y-1">
                {analysis.suggestions.map((suggestion, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-foreground">
                    <span className="text-primary mt-0.5">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Target Guidelines */}
          <div className="p-3 rounded bg-muted/30 border border-border/50">
            <h5 className="text-xs font-medium text-muted-foreground mb-2">Support Response Guidelines</h5>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success" />
                <span className="text-muted-foreground">Ideal: Flesch 60-80 (Standard)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-chart-3" />
                <span className="text-muted-foreground">Good: Flesch 50-90</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-chart-4" />
                <span className="text-muted-foreground">Review: Flesch 30-50 (Complex)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-destructive" />
                <span className="text-muted-foreground">Issue: Flesch &lt;30 (Too complex)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Components
function ScoreCard({
  label,
  value,
  description,
  isPercentage,
  suffix,
}: {
  label: string;
  value: number;
  description: string;
  isPercentage?: boolean;
  suffix?: string;
}) {
  return (
    <div className="p-2 rounded bg-muted/30 border border-border/50">
      <div className="text-lg font-semibold text-foreground">
        {value.toFixed(1)}
        {isPercentage && <span className="text-xs text-muted-foreground ml-0.5">/100</span>}
        {suffix && <span className="text-xs text-muted-foreground ml-1">{suffix}</span>}
      </div>
      <div className="text-xs font-medium text-foreground">{label}</div>
      <div className="text-[10px] text-muted-foreground">{description}</div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="p-2 rounded bg-muted/30 border border-border/50">
      <div className="text-sm font-semibold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
