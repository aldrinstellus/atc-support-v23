'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, ChevronLeft, ChevronRight, Send, Loader2, MousePointer2 } from 'lucide-react';
import { useFeedback } from '@/contexts/FeedbackContext';
import { FeedbackForm } from './FeedbackForm';
import { AnnotationToolbar } from './AnnotationToolbar';
import { AnnotationCanvas } from './AnnotationCanvas';
import { ElementHighlight } from './ElementHighlight';

type PanelStep = 'capture' | 'annotate' | 'form';

export function FeedbackPanel() {
  const {
    isOpen,
    mode,
    screenshot,
    annotations,
    // taggedElements,
    isCapturing,
    isSubmitting,
    closeWidget,
    startCapture,
    setMode,
    undoAnnotation,
    clearAnnotations,
    submitFeedback,
    currentFeedback,
  } = useFeedback();

  const [step, setStep] = useState<PanelStep>('capture');
  // const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);

  const handleCapture = async () => {
    await startCapture();
    setStep('annotate');
  };

  const handleNext = () => {
    if (step === 'annotate') {
      setStep('form');
      setMode('form');
    }
  };

  const handleBack = () => {
    if (step === 'form') {
      setStep('annotate');
      setMode('annotating');
    } else if (step === 'annotate') {
      setStep('capture');
      setMode('idle');
    }
  };

  const handleSubmit = async () => {
    // Always submit to Google Sheets only
    await submitFeedback(['sheets']);
    setStep('capture');
  };

  const canSubmit = !!currentFeedback?.title;

  if (!isOpen) return null;

  return (
    <>
      {/* Element highlight overlay for element selection mode */}
      {mode === 'selecting' && (
        <ElementHighlight element={null} />
      )}

      {/* Annotation overlay when in annotating mode */}
      <AnimatePresence>
        {mode === 'annotating' && screenshot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-black/80"
          >
            {/* Screenshot background */}
            <div
              className="absolute inset-0 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${screenshot})` }}
            />

            {/* Annotation canvas overlay */}
            <AnnotationCanvas
              width={window.innerWidth}
              height={window.innerHeight}
            />

            {/* Annotation toolbar */}
            <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[10001]">
              <AnnotationToolbar
                onUndo={undoAnnotation}
                onClear={clearAnnotations}
                canUndo={annotations.length > 0}
              />
            </div>

            {/* Navigation buttons */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10001] flex items-center gap-4">
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-2 rounded-lg bg-card/95 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-xl border border-border hover:bg-muted transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Retake
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Continue
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={closeWidget}
              className="fixed top-4 right-4 z-[10001] flex h-10 w-10 items-center justify-center rounded-full bg-card/95 text-foreground backdrop-blur-xl border border-border hover:bg-muted transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main panel (capture or form step) */}
      <AnimatePresence>
        {(step === 'capture' || step === 'form') && mode !== 'annotating' && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 z-[9999] h-full w-full max-w-md bg-card/95 backdrop-blur-xl border-l border-border shadow-2xl"
            data-feedback-widget
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h2 className="text-lg font-semibold text-foreground">
                {step === 'capture' ? 'Send Feedback' : 'Describe Issue'}
              </h2>
              <button
                type="button"
                onClick={closeWidget}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col h-[calc(100%-57px)]">
              <div className="flex-1 overflow-y-auto p-4">
                {step === 'capture' && (
                  <div className="space-y-6">
                    {/* Screenshot preview or capture button */}
                    {screenshot ? (
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-foreground">
                          Screenshot
                        </label>
                        <div className="relative aspect-video rounded-lg border border-border overflow-hidden bg-muted">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={screenshot}
                            alt="Screenshot preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-2 right-2 flex gap-2">
                            <button
                              type="button"
                              onClick={() => setStep('annotate')}
                              className="flex items-center gap-1.5 rounded-md bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                            >
                              <MousePointer2 className="h-3 w-3" />
                              Annotate
                            </button>
                            <button
                              type="button"
                              onClick={handleCapture}
                              className="flex items-center gap-1.5 rounded-md bg-muted/80 backdrop-blur px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                            >
                              <Camera className="h-3 w-3" />
                              Retake
                            </button>
                          </div>
                        </div>
                        {annotations.length > 0 && (
                          <p className="text-xs text-muted-foreground">
                            {annotations.length} annotation{annotations.length !== 1 ? 's' : ''} added
                          </p>
                        )}
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleCapture}
                        disabled={isCapturing}
                        className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border p-8 text-muted-foreground hover:border-primary hover:text-foreground transition-colors disabled:opacity-50"
                      >
                        {isCapturing ? (
                          <Loader2 className="h-8 w-8 animate-spin" />
                        ) : (
                          <Camera className="h-8 w-8" />
                        )}
                        <span className="text-sm font-medium">
                          {isCapturing ? 'Capturing...' : 'Capture Screenshot'}
                        </span>
                      </button>
                    )}

                    {/* Form fields in capture step */}
                    <FeedbackForm />
                  </div>
                )}

                {step === 'form' && (
                  <div className="space-y-6">
                    {/* Screenshot thumbnail */}
                    {screenshot && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Screenshot
                        </label>
                        <div className="relative h-32 rounded-lg border border-border overflow-hidden bg-muted">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={screenshot}
                            alt="Screenshot preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={handleBack}
                            className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-md bg-muted/80 backdrop-blur px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                          >
                            <ChevronLeft className="h-3 w-3" />
                            Edit
                          </button>
                        </div>
                      </div>
                    )}

                    <FeedbackForm onBack={handleBack} />
                  </div>
                )}
              </div>

              {/* Footer with submit button */}
              <div className="border-t border-border p-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canSubmit || isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Feedback
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
