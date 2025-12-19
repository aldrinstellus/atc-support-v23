'use client';

import { ArrowRight, Square, Highlighter, Pencil, Type, Undo2, Trash2 } from 'lucide-react';
import { useFeedback } from '@/contexts/FeedbackContext';
import type { AnnotationTool } from '@/types/feedback';

interface Tool {
  id: AnnotationTool;
  label: string;
  icon: React.ReactNode;
  shortcut: string;
}

const tools: Tool[] = [
  { id: 'arrow', label: 'Arrow', icon: <ArrowRight className="h-4 w-4" />, shortcut: 'A' },
  { id: 'rectangle', label: 'Rectangle', icon: <Square className="h-4 w-4" />, shortcut: 'R' },
  { id: 'highlight', label: 'Highlight', icon: <Highlighter className="h-4 w-4" />, shortcut: 'H' },
  { id: 'freehand', label: 'Freehand', icon: <Pencil className="h-4 w-4" />, shortcut: 'F' },
  { id: 'text', label: 'Text', icon: <Type className="h-4 w-4" />, shortcut: 'T' },
];

const colors = [
  '#cdfe00', // Neon lime (primary)
  '#ff3b30', // Red
  '#ff9500', // Orange
  '#007aff', // Blue
  '#ffffff', // White
];

interface AnnotationToolbarProps {
  onUndo?: () => void;
  onClear?: () => void;
  canUndo?: boolean;
}

export function AnnotationToolbar({ onUndo, onClear, canUndo = false }: AnnotationToolbarProps) {
  const { selectedTool, setSelectedTool, toolColor, setToolColor } = useFeedback();

  return (
    <div className="flex items-center gap-4 rounded-xl bg-card/95 px-4 py-2 shadow-xl backdrop-blur-xl border border-border">
      {/* Tools */}
      <div className="flex items-center gap-1">
        {tools.map((tool) => (
          <button
            key={tool.id}
            type="button"
            onClick={() => setSelectedTool(tool.id)}
            title={`${tool.label} (${tool.shortcut})`}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
              selectedTool === tool.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            {tool.icon}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="h-6 w-px bg-border" />

      {/* Colors */}
      <div className="flex items-center gap-1">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => setToolColor(color)}
            title={color}
            className={`h-6 w-6 rounded-full border-2 transition-transform ${
              toolColor === color ? 'scale-110 border-foreground' : 'border-transparent hover:scale-105'
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="h-6 w-px bg-border" />

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
          className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
            canUndo
              ? 'text-muted-foreground hover:bg-muted hover:text-foreground'
              : 'text-muted-foreground/30 cursor-not-allowed'
          }`}
        >
          <Undo2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onClear}
          title="Clear all"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
