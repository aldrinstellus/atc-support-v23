'use client';

import { Subtitles } from 'lucide-react';
import { useClosedCaptions } from '@/hooks/accessibility/useClosedCaptions';
import { AnimatePresence, motion } from 'framer-motion';

interface ClosedCaptionsProps {
  /**
   * Position of the captions relative to viewport
   * @default 'bottom'
   */
  position?: 'top' | 'bottom';

  /**
   * Custom className for positioning/styling
   */
  className?: string;
}

export function ClosedCaptions({ position = 'bottom', className = '' }: ClosedCaptionsProps) {
  const { isEnabled, currentCaption, toggleCaptions } = useClosedCaptions(true);

  const positionClasses = position === 'top'
    ? 'top-24'
    : 'bottom-32';

  return (
    <>
      {/* CC Toggle Button */}
      <button
        onClick={toggleCaptions}
        aria-label={isEnabled ? 'Disable closed captions' : 'Enable closed captions'}
        aria-pressed={isEnabled}
        data-testid="cc-toggle"
        className={`fixed ${position === 'top' ? 'top-4' : 'bottom-4'} right-4 z-50 p-3 bg-card/90 backdrop-blur-xl border ${
          isEnabled ? 'border-primary' : 'border-border/50'
        } rounded-full hover:bg-card transition-all hover:scale-105 active:scale-95 shadow-xl ${className}`}
        title={isEnabled ? 'Closed Captions: ON' : 'Closed Captions: OFF'}
      >
        <Subtitles
          className={`w-5 h-5 ${isEnabled ? 'text-primary' : 'text-muted-foreground'}`}
          aria-hidden="true"
        />
        {isEnabled && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
        )}
      </button>

      {/* Captions Display */}
      <AnimatePresence>
        {isEnabled && currentCaption && (
          <motion.div
            initial={{ opacity: 0, y: position === 'top' ? -20 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: position === 'top' ? -20 : 20 }}
            transition={{ duration: 0.3 }}
            className={`fixed ${positionClasses} left-1/2 -translate-x-1/2 z-40 max-w-4xl px-6 pointer-events-none`}
            role="status"
            aria-live="polite"
            aria-atomic="true"
            data-testid="cc-display"
          >
            <div className="bg-black/80 backdrop-blur-sm px-8 py-4 rounded-lg">
              <p className="text-white text-center text-lg leading-relaxed font-medium">
                {currentCaption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function ClosedCaptionsToggle() {
  const { isEnabled, toggleCaptions } = useClosedCaptions(true);

  return (
    <button
      onClick={toggleCaptions}
      aria-label={isEnabled ? 'Disable closed captions' : 'Enable closed captions'}
      aria-pressed={isEnabled}
      data-testid="cc-toggle-inline"
      className="flex items-center gap-2 px-4 py-2 bg-card/90 backdrop-blur-xl border border-border/50 rounded-full hover:bg-card transition-all hover:scale-105 active:scale-95"
    >
      <Subtitles className={`w-4 h-4 ${isEnabled ? 'text-primary' : 'text-muted-foreground'}`} />
      <span className="text-sm font-medium">CC</span>
      {isEnabled && (
        <span className="text-xs text-primary font-semibold">ON</span>
      )}
    </button>
  );
}
