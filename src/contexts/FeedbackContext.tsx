'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import html2canvas from 'html2canvas';
import type {
  FeedbackEntry,
  Annotation,
  ElementTag,
  AnnotationTool,
  IntegrationTarget,
  FeedbackContextType,
  FeedbackMode,
} from '@/types/feedback';

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export function FeedbackProvider({ children }: { children: ReactNode }) {
  // Core state
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<FeedbackMode>('idle');
  const [currentFeedback, setCurrentFeedback] = useState<Partial<FeedbackEntry> | null>(null);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [taggedElements, setTaggedElements] = useState<ElementTag[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tool state
  const [selectedTool, setSelectedTool] = useState<AnnotationTool>('arrow');
  const [toolColor, setToolColor] = useState('#cdfe00'); // Sana neon lime

  const openWidget = useCallback(() => {
    setIsOpen(true);
    setMode('idle');
  }, []);

  const closeWidget = useCallback(() => {
    setIsOpen(false);
    setMode('idle');
  }, []);

  const startCapture = useCallback(async () => {
    setIsCapturing(true);
    setMode('capturing');

    try {
      // Hide feedback widget before capture
      const feedbackWidget = document.querySelector('[data-feedback-widget]');
      if (feedbackWidget) {
        (feedbackWidget as HTMLElement).style.display = 'none';
      }

      // Small delay to ensure widget is hidden
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Capture screenshot with more robust options
      const canvas = await html2canvas(document.body, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#1a1a1a', // Match app background
        scale: Math.min(window.devicePixelRatio || 1, 2), // Cap at 2x for performance
        logging: false,
        foreignObjectRendering: false, // Disable for better compatibility
        removeContainer: true,
        ignoreElements: (element) => {
          // Ignore feedback widget and problematic elements
          if (element.hasAttribute('data-feedback-widget')) return true;
          if (element.tagName === 'IFRAME') return true;
          if (element.tagName === 'VIDEO') return true;
          if (element.tagName === 'CANVAS') return true;
          return false;
        },
      });

      const dataUrl = canvas.toDataURL('image/png', 0.9);
      setScreenshot(dataUrl);
      setMode('annotating');

      // Show feedback widget again
      if (feedbackWidget) {
        (feedbackWidget as HTMLElement).style.display = '';
      }
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
      // Create a placeholder screenshot on failure
      const placeholderCanvas = document.createElement('canvas');
      placeholderCanvas.width = window.innerWidth;
      placeholderCanvas.height = window.innerHeight;
      const ctx = placeholderCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, placeholderCanvas.width, placeholderCanvas.height);
        ctx.fillStyle = '#666';
        ctx.font = '24px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Screenshot capture failed', placeholderCanvas.width / 2, placeholderCanvas.height / 2 - 20);
        ctx.fillText('Please describe the issue in detail', placeholderCanvas.width / 2, placeholderCanvas.height / 2 + 20);
        const placeholderDataUrl = placeholderCanvas.toDataURL('image/png');
        setScreenshot(placeholderDataUrl);
        setMode('annotating');
      } else {
        setMode('idle');
      }

      // Show feedback widget again
      const feedbackWidget = document.querySelector('[data-feedback-widget]');
      if (feedbackWidget) {
        (feedbackWidget as HTMLElement).style.display = '';
      }
    } finally {
      setIsCapturing(false);
    }
  }, []);

  const addAnnotation = useCallback((annotation: Annotation) => {
    setAnnotations((prev) => [...prev, annotation]);
  }, []);

  const removeAnnotation = useCallback((id: string) => {
    setAnnotations((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const undoAnnotation = useCallback(() => {
    setAnnotations((prev) => prev.slice(0, -1));
  }, []);

  const clearAnnotations = useCallback(() => {
    setAnnotations([]);
  }, []);

  const addElementTag = useCallback((tag: ElementTag) => {
    setTaggedElements((prev) => [...prev, tag]);
  }, []);

  const removeElementTag = useCallback((id: string) => {
    setTaggedElements((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateFeedbackDetails = useCallback((details: Partial<FeedbackEntry>) => {
    setCurrentFeedback((prev) => ({ ...prev, ...details }));
  }, []);

  const resetFeedback = useCallback(() => {
    setScreenshot(null);
    setAnnotations([]);
    setTaggedElements([]);
    setCurrentFeedback(null);
    setMode('idle');
  }, []);

  const submitFeedback = useCallback(
    async (targets: IntegrationTarget[]) => {
      if (!screenshot) {
        throw new Error('No screenshot captured');
      }

      setIsSubmitting(true);

      try {
        const entry: FeedbackEntry = {
          id: crypto.randomUUID(),
          timestamp: new Date(),
          screenshot,
          annotations,
          taggedElements,
          title: currentFeedback?.title || 'Untitled Feedback',
          description: currentFeedback?.description || '',
          category: currentFeedback?.category || 'bug',
          priority: currentFeedback?.priority || 'medium',
          url: window.location.href,
          viewport: { width: window.innerWidth, height: window.innerHeight },
          userAgent: navigator.userAgent,
          persona: currentFeedback?.persona,
          mode: currentFeedback?.mode,
          targetIntegrations: targets,
          status: 'pending',
        };

        const response = await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entry),
        });

        if (!response.ok) {
          throw new Error('Failed to submit feedback');
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error || 'Submission failed');
        }

        // Reset state after successful submission
        resetFeedback();
        closeWidget();

        return result;
      } finally {
        setIsSubmitting(false);
      }
    },
    [screenshot, annotations, taggedElements, currentFeedback, closeWidget, resetFeedback]
  );

  return (
    <FeedbackContext.Provider
      value={{
        // State
        isOpen,
        mode,
        currentFeedback,
        screenshot,
        annotations,
        taggedElements,
        isCapturing,
        isSubmitting,

        // Actions
        openWidget,
        closeWidget,
        startCapture,
        setScreenshot,
        setMode,
        addAnnotation,
        removeAnnotation,
        undoAnnotation,
        clearAnnotations,
        addElementTag,
        removeElementTag,
        updateFeedbackDetails,
        submitFeedback,
        resetFeedback,

        // UI State
        selectedTool,
        setSelectedTool,
        toolColor,
        setToolColor,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within FeedbackProvider');
  }
  return context;
}
