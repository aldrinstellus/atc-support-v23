'use client';

import { useEffect, useState } from 'react';

interface ElementHighlightProps {
  element: HTMLElement | null;
  color?: string;
  showLabel?: boolean;
}

export function ElementHighlight({
  element,
  color = '#cdfe00',
  showLabel = true,
}: ElementHighlightProps) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!element) {
      setRect(null);
      return;
    }

    const updateRect = () => {
      setRect(element.getBoundingClientRect());
    };

    updateRect();
    window.addEventListener('scroll', updateRect, true);
    window.addEventListener('resize', updateRect);

    return () => {
      window.removeEventListener('scroll', updateRect, true);
      window.removeEventListener('resize', updateRect);
    };
  }, [element]);

  if (!rect) return null;

  return (
    <>
      {/* Highlight overlay */}
      <div
        className="fixed pointer-events-none z-[9999] transition-all duration-150"
        style={{
          top: rect.top - 2,
          left: rect.left - 2,
          width: rect.width + 4,
          height: rect.height + 4,
          border: `2px solid ${color}`,
          backgroundColor: `${color}20`,
          borderRadius: '4px',
        }}
      />

      {/* Label */}
      {showLabel && element && (
        <div
          className="fixed pointer-events-none z-[10000] px-2 py-1 text-xs font-mono rounded shadow-lg"
          style={{
            top: Math.max(rect.top - 28, 4),
            left: rect.left,
            backgroundColor: color,
            color: '#131314',
          }}
        >
          {element.tagName.toLowerCase()}
          {element.id ? `#${element.id}` : ''}
          {element.className && typeof element.className === 'string'
            ? `.${element.className.split(' ')[0]}`
            : ''}
        </div>
      )}
    </>
  );
}
