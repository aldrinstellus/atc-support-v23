'use client';

interface SkeletonLoaderProps {
  lines?: number;
  className?: string;
}

/**
 * SkeletonLoader Component
 *
 * Pulsing gradient skeleton for premium loading states.
 * Provides visual feedback during data loading with smooth animations.
 *
 * @param lines - Number of skeleton lines to render (default: 3)
 * @param className - Additional CSS classes
 */
export function SkeletonLoader({ lines = 3, className }: SkeletonLoaderProps) {
  return (
    <div className={`space-y-3 ${className || ''}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="h-4 bg-gradient-to-r from-muted via-muted-foreground/20 to-muted rounded w-full animate-pulse" />
        </div>
      ))}
    </div>
  );
}
