'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X } from 'lucide-react';
import { InteractiveChatWithFloatingInput } from './InteractiveChatWithFloatingInput';

export function ChatWithIconToggle() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Chat Icon Button - Shows when chat is closed */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-primary text-primary-foreground rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center group"
            aria-label="Open chat"
          >
            <MessageSquare className="w-7 h-7 group-hover:scale-110 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Interface - Shows when chat is open */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsChatOpen(false)}
              className="fixed top-6 right-6 z-50 w-12 h-12 bg-card/90 backdrop-blur-xl border border-border/50 text-foreground rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Full Chat Interface */}
            <div className="h-full w-full">
              <InteractiveChatWithFloatingInput />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
