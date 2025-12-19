'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useNarratorVisibility } from '@/hooks/demo/useNarratorVisibility';

interface NarratorToggleProps {
  /**
   * Position of the toggle button
   * @default 'bottom-right'
   */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

  /**
   * Custom className for positioning/styling
   */
  className?: string;

  /**
   * Callback when visibility changes
   */
  onVisibilityChange?: (isVisible: boolean) => void;
}

export function NarratorToggle({
  position = 'bottom-right',
  className = '',
  onVisibilityChange
}: NarratorToggleProps) {
  const { isVisible, toggleVisibility } = useNarratorVisibility({
    defaultVisible: false, // Hidden by default per client requirement
    autoHideOnDemo: true,
  });

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-20', // Right-20 to avoid CC toggle at right-4
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-20 right-4', // Bottom-20 to avoid input area
  }[position];

  const handleToggle = () => {
    toggleVisibility();
    const newValue = !isVisible;
    onVisibilityChange?.(newValue);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={isVisible ? 'Hide narrator avatar' : 'Show narrator avatar'}
      aria-pressed={isVisible}
      data-testid="narrator-toggle"
      className={`fixed ${positionClasses} z-50 flex items-center gap-2 px-4 py-2.5 bg-card/90 backdrop-blur-xl border ${
        isVisible ? 'border-primary' : 'border-border/50'
      } rounded-full hover:bg-card transition-all hover:scale-105 active:scale-95 shadow-xl ${className}`}
      title={isVisible ? 'Narrator: Visible' : 'Narrator: Hidden'}
    >
      {isVisible ? (
        <Eye className="w-5 h-5 text-primary" aria-hidden="true" />
      ) : (
        <EyeOff className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
      )}
      <span className="text-sm font-medium text-foreground">
        {isVisible ? 'Hide Narrator' : 'Show Narrator'}
      </span>
      {isVisible && (
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
      )}
    </button>
  );
}

/**
 * Compact inline toggle for use in toolbars/headers
 */
export function NarratorToggleCompact({ onVisibilityChange }: { onVisibilityChange?: (isVisible: boolean) => void }) {
  const { isVisible, toggleVisibility } = useNarratorVisibility({
    defaultVisible: false,
    autoHideOnDemo: true,
  });

  const handleToggle = () => {
    toggleVisibility();
    const newValue = !isVisible;
    onVisibilityChange?.(newValue);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={isVisible ? 'Hide narrator' : 'Show narrator'}
      aria-pressed={isVisible}
      data-testid="narrator-toggle-compact"
      className="flex items-center gap-2 px-3 py-1.5 bg-card/90 backdrop-blur-xl border border-border/50 rounded-full hover:bg-card transition-all hover:scale-105 active:scale-95"
      title={isVisible ? 'Narrator: Visible' : 'Narrator: Hidden'}
    >
      {isVisible ? (
        <Eye className={`w-4 h-4 text-primary`} />
      ) : (
        <EyeOff className={`w-4 h-4 text-muted-foreground`} />
      )}
      <span className="text-xs font-medium">Narrator</span>
    </button>
  );
}
