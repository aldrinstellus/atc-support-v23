'use client';

import { useState, useEffect, useRef } from 'react';
import { GripVertical } from 'lucide-react';

interface ResizableDividerProps {
  onResize: (leftWidth: number) => void;
  initialLeftWidth?: number;
  minLeftWidth?: number;
  maxLeftWidth?: number;
}

export function ResizableDivider({
  onResize,
  initialLeftWidth = 60,
  minLeftWidth = 30,
  maxLeftWidth = 70,
}: ResizableDividerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [leftWidth, setLeftWidth] = useState(initialLeftWidth);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const windowWidth = window.innerWidth;
      const newLeftWidth = (e.clientX / windowWidth) * 100;

      // Clamp to min/max
      const clampedWidth = Math.max(minLeftWidth, Math.min(maxLeftWidth, newLeftWidth));

      setLeftWidth(clampedWidth);
      onResize(clampedWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, onResize, minLeftWidth, maxLeftWidth]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  return (
    <div
      ref={dividerRef}
      onMouseDown={handleMouseDown}
      className={`
        relative w-1 bg-border hover:bg-primary/50 cursor-col-resize
        transition-colors duration-200 group
        ${isDragging ? 'bg-primary' : ''}
      `}
      style={{ touchAction: 'none' }}
    >
      {/* Invisible wider hit area */}
      <div className="absolute inset-y-0 -left-2 -right-2 cursor-col-resize" />

      {/* Grip handle (visible on hover) */}
      <div
        className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          flex items-center justify-center
          w-8 h-16 rounded-lg
          bg-card border border-border shadow-lg
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
          ${isDragging ? 'opacity-100' : ''}
        `}
      >
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Width percentage indicator */}
      {isDragging && (
        <div
          className="
            absolute top-4 left-1/2 -translate-x-1/2
            px-3 py-1.5 rounded-full
            bg-primary text-primary-foreground
            text-xs font-medium shadow-lg
            whitespace-nowrap
          "
        >
          {Math.round(leftWidth)}% / {Math.round(100 - leftWidth)}%
        </div>
      )}
    </div>
  );
}
