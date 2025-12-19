// Loading skeleton for widgets
// Displays while widget data is being fetched

export function WidgetSkeleton() {
  return (
    <div className="space-y-4 my-4 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-5 w-48 bg-muted rounded"></div>
          <div className="h-4 w-32 bg-muted/70 rounded"></div>
        </div>
        <div className="h-10 w-10 bg-muted rounded-full"></div>
      </div>

      {/* Content skeleton */}
      <div className="glass-card rounded-lg border border-border bg-card/70 p-4 space-y-3">
        <div className="h-4 w-full bg-muted rounded"></div>
        <div className="h-4 w-5/6 bg-muted rounded"></div>
        <div className="h-4 w-4/6 bg-muted rounded"></div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-20 bg-muted rounded"></div>
              <div className="h-6 w-16 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional content skeleton */}
      <div className="glass-card rounded-lg border border-border bg-card/70 p-4 space-y-3">
        <div className="h-4 w-40 bg-muted rounded mb-3"></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 py-2">
            <div className="h-10 w-10 bg-muted rounded-full flex-shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-3 w-32 bg-muted rounded"></div>
              <div className="h-3 w-48 bg-muted rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
