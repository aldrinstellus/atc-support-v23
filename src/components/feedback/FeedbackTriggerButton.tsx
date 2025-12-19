'use client';

import { Bug } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFeedback } from '@/contexts/FeedbackContext';

export function FeedbackTriggerButton() {
  const { openWidget, isOpen } = useFeedback();

  if (isOpen) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0, rotate: -180 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      exit={{ scale: 0, opacity: 0, rotate: 180 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      onClick={openWidget}
      className="fixed bottom-28 right-6 z-50 group"
      title="Report Bug or Send Feedback"
      aria-label="Open feedback widget"
    >
      {/* Animated ring effect */}
      <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 opacity-75 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-300 animate-pulse" />

      {/* Main button */}
      <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 transition-shadow group-hover:shadow-xl group-hover:shadow-orange-500/40">
        <Bug className="h-5 w-5" />
      </span>

      {/* Tooltip label */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-card/95 backdrop-blur-sm border border-border text-xs font-medium text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
        Report Issue
      </span>
    </motion.button>
  );
}
