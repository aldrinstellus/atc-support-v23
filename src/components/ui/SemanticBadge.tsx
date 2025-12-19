'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        success: 'bg-green-600 text-white',
        warning: 'bg-orange-500 text-white',
        error: 'bg-red-600 text-white',
        info: 'bg-blue-500 text-white',
        neutral: 'bg-slate-500 text-white',
        primary: 'bg-purple-500 text-white',
      },
      size: {
        sm: 'text-[9px] px-1.5 py-0.5',
        md: 'text-xs px-2 py-0.5',
        lg: 'text-sm px-2.5 py-1',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
    },
  }
);

interface SemanticBadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  className?: string;
}

/**
 * SemanticBadge Component
 *
 * Semantic, theme-aware badge system using CVA for consistent styling.
 * Provides color-coded badges for different states and severities.
 *
 * @param children - Badge content
 * @param variant - Semantic variant (success, warning, error, info, neutral, primary)
 * @param size - Badge size (sm, md, lg)
 * @param className - Additional CSS classes
 */
export function SemanticBadge({ children, variant, size, className }: SemanticBadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)}>
      {children}
    </span>
  );
}
