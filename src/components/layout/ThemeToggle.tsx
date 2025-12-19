'use client';

import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  // Show placeholder during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className={`relative flex items-center justify-center w-8 h-8 rounded-lg bg-muted/50 ${className}`}>
        <Moon className="w-4 h-4 text-muted-foreground" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center justify-center w-8 h-8 rounded-lg bg-muted/50 hover:bg-muted transition-colors ${className}`}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'dark' ? (
            <Moon className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Sun className="w-4 h-4 text-muted-foreground" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
