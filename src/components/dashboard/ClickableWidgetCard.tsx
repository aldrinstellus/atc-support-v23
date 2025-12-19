'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePersona } from '@/hooks/use-persona';
import { DashboardWidget } from '@/config/dashboard-widgets';

interface ClickableWidgetCardProps {
  widget: DashboardWidget;
  children: React.ReactNode;
}

export function ClickableWidgetCard({ widget, children }: ClickableWidgetCardProps) {
  const router = useRouter();
  const { currentPersona } = usePersona();

  const handleClick = () => {
    // Navigate to chat with pre-filled query
    const chatUrl = `/demo/${currentPersona.id}?query=${encodeURIComponent(widget.query)}`;
    router.push(chatUrl);
  };

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
      className="group relative cursor-pointer rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/30 overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-gradient-to-br from-primary to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
              {widget.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {widget.description}
            </p>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <ArrowRight className="h-4 w-4 text-primary" />
            </div>
          </div>
        </div>

        {/* Widget Preview */}
        <div className="pointer-events-none">
          {children}
        </div>

        {/* Click hint */}
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Click to explore in chat</span>
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </motion.div>
  );
}
