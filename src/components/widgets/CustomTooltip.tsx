'use client';

import { motion, AnimatePresence } from 'motion/react';

interface TooltipPayload {
  value: number | string;
  name: string;
  color?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
  formatter?: (value: number | string, name: string) => string;
}

/**
 * CustomTooltip Component
 *
 * Premium animated tooltip for Recharts with smooth transitions and backdrop blur.
 * Provides a polished, professional appearance for chart data visualization.
 *
 * @param active - Whether tooltip is currently active (hovering over chart)
 * @param payload - Data payload from Recharts
 * @param label - Label for the tooltip (usually x-axis value)
 * @param formatter - Optional custom formatter for values
 */
export function CustomTooltip({ active, payload, label, formatter }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-xl p-3"
      >
        {label && (
          <p className="text-xs font-medium text-muted-foreground mb-2">{label}</p>
        )}
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-foreground font-medium">
              {formatter ? formatter(entry.value, entry.name) : `${entry.name}: ${entry.value}`}
            </span>
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
