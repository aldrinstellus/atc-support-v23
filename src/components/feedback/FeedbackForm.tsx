'use client';

import { useState } from 'react';
import { Bug, Lightbulb, Sparkles, HelpCircle, MoreHorizontal } from 'lucide-react';
import { useFeedback } from '@/contexts/FeedbackContext';
import type { FeedbackCategory, FeedbackPriority } from '@/types/feedback';

const categories: { value: FeedbackCategory; label: string; icon: React.ReactNode }[] = [
  { value: 'bug', label: 'Bug', icon: <Bug className="h-4 w-4" /> },
  { value: 'feature', label: 'Feature', icon: <Lightbulb className="h-4 w-4" /> },
  { value: 'improvement', label: 'Improvement', icon: <Sparkles className="h-4 w-4" /> },
  { value: 'question', label: 'Question', icon: <HelpCircle className="h-4 w-4" /> },
  { value: 'other', label: 'Other', icon: <MoreHorizontal className="h-4 w-4" /> },
];

const priorities: { value: FeedbackPriority; label: string; color: string }[] = [
  { value: 'critical', label: 'Critical', color: 'bg-red-500' },
  { value: 'high', label: 'High', color: 'bg-orange-500' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
  { value: 'low', label: 'Low', color: 'bg-green-500' },
];

interface FeedbackFormProps {
  onBack?: () => void;
}

export function FeedbackForm({ onBack }: FeedbackFormProps) {
  const { currentFeedback, updateFeedbackDetails } = useFeedback();

  const [title, setTitle] = useState(currentFeedback?.title || '');
  const [description, setDescription] = useState(currentFeedback?.description || '');
  const [category, setCategory] = useState<FeedbackCategory>(currentFeedback?.category || 'bug');
  const [priority, setPriority] = useState<FeedbackPriority>(currentFeedback?.priority || 'medium');

  const handleChange = () => {
    updateFeedbackDetails({
      title,
      description,
      category,
      priority,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Title */}
      <div>
        <label htmlFor="feedback-title" className="mb-1.5 block text-sm font-medium text-foreground">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="feedback-title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            updateFeedbackDetails({ title: e.target.value });
          }}
          onBlur={handleChange}
          placeholder="Brief summary of the feedback"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="feedback-description" className="mb-1.5 block text-sm font-medium text-foreground">
          Description
        </label>
        <textarea
          id="feedback-description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            updateFeedbackDetails({ description: e.target.value });
          }}
          onBlur={handleChange}
          placeholder="Provide more details about the issue or suggestion..."
          rows={4}
          className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Category */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Category</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => {
                setCategory(cat.value);
                updateFeedbackDetails({ category: cat.value });
              }}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                category === cat.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Priority */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Priority</label>
        <div className="flex flex-wrap gap-2">
          {priorities.map((pri) => (
            <button
              key={pri.value}
              type="button"
              onClick={() => {
                setPriority(pri.value);
                updateFeedbackDetails({ priority: pri.value });
              }}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                priority === pri.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${pri.color}`} />
              {pri.label}
            </button>
          ))}
        </div>
      </div>

      {/* Back button if provided */}
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mt-2 text-sm text-muted-foreground hover:text-foreground"
        >
          &larr; Back to annotations
        </button>
      )}
    </div>
  );
}
