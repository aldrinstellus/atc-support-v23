'use client';

import { useEffect, useCallback } from 'react';
import { useFeedback } from '@/contexts/FeedbackContext';
import { FeedbackTriggerButton } from './FeedbackTriggerButton';
import { FeedbackPanel } from './FeedbackPanel';

export function FeedbackWidget() {
  const { isOpen, openWidget, closeWidget } = useFeedback();

  // Keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // F10 to toggle widget
      if (e.key === 'F10') {
        e.preventDefault();
        if (isOpen) {
          closeWidget();
        } else {
          openWidget();
        }
      }

      // Escape to close widget
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        closeWidget();
      }
    },
    [isOpen, openWidget, closeWidget]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div data-feedback-widget>
      {/* Trigger button - hidden when panel is open */}
      {!isOpen && <FeedbackTriggerButton />}

      {/* Main panel */}
      <FeedbackPanel />
    </div>
  );
}
