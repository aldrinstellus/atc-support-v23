'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';

interface ThinkingBlockProps {
  isVisible: boolean;
}

export function ThinkingBlock({ isVisible }: ThinkingBlockProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border/50"
        >
          <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
          <span className="text-sm text-muted-foreground">
            Thinking...
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
