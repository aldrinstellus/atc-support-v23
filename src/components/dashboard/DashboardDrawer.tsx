'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, Pin, PinOff, LayoutDashboard } from 'lucide-react';
import { DashboardGrid } from './DashboardGrid';
import { DashboardWidget } from '@/config/dashboard-widgets';

interface DashboardDrawerProps {
  isOpen: boolean;
  isPinned: boolean;
  widgets: DashboardWidget[];
  onClose: () => void;
  onTogglePin: () => void;
  onWidgetClick?: (widget: DashboardWidget) => void;
}

export function DashboardDrawer({
  isOpen,
  isPinned,
  widgets,
  onClose,
  onTogglePin,
  onWidgetClick,
}: DashboardDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          {!isPinned && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={onClose}
            />
          )}

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full md:w-[600px] lg:w-[700px] bg-card border-l border-border shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <LayoutDashboard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
                  <p className="text-xs text-muted-foreground">
                    {widgets.length} widgets
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Pin/Unpin Button */}
                <button
                  onClick={onTogglePin}
                  className={`p-2 rounded-lg transition-colors ${
                    isPinned
                      ? 'bg-primary/20 text-primary'
                      : 'hover:bg-muted text-muted-foreground'
                  }`}
                  title={isPinned ? 'Unpin drawer' : 'Pin drawer open'}
                >
                  {isPinned ? (
                    <PinOff className="w-4 h-4" />
                  ) : (
                    <Pin className="w-4 h-4" />
                  )}
                </button>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                  title="Close drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <div className="grid grid-cols-1 gap-4">
                  {widgets.map((widget) => (
                    <div
                      key={widget.id}
                      onClick={() => onWidgetClick?.(widget)}
                      className="cursor-pointer transition-all duration-200 hover:scale-[1.01]"
                    >
                      <DashboardGrid widgets={[widget]} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-card/50 backdrop-blur-xl">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Press <kbd className="px-2 py-1 bg-muted rounded">Esc</kbd> to close</span>
                <span><kbd className="px-2 py-1 bg-muted rounded">⌘⇧D</kbd> to toggle</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
