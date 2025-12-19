# Widget Auto-Refresh Integration Guide

**How to add real-time updates to any widget in V17 Mode Switcher**

---

## 🎯 Quick Start

### Option 1: Simple Auto-Refresh (Recommended)

```typescript
import { useAutoRefresh } from '@/hooks/useAutoRefresh';
import { enhancedTicketList } from '@/data/enhanced-demo-data';

export function TicketListWidget() {
  const { data, isLoading, lastRefresh, refresh } = useAutoRefresh(
    () => enhancedTicketList, // Your data fetcher
    {
      interval: 15000,      // Refresh every 15 seconds
      refreshOnMount: true  // Load data immediately
    }
  );

  if (isLoading && !data) {
    return <WidgetSkeleton />;
  }

  return (
    <div>
      <TicketTable tickets={data?.tickets || []} />
      {lastRefresh && (
        <span className="text-xs text-gray-500">
          Updated {lastRefresh.toLocaleTimeString()}
        </span>
      )}
    </div>
  );
}
```

### Option 2: Listen to Real-Time Events

```typescript
import { useEffect, useState } from 'react';
import { realtimeService } from '@/lib/mock-realtime';
import { enhancedTicketList } from '@/data/enhanced-demo-data';

export function TicketListWidget() {
  const [tickets, setTickets] = useState(enhancedTicketList.tickets);

  useEffect(() => {
    const unsubscribe = realtimeService.subscribe(
      ['ticket.created', 'ticket.updated'],
      (event) => {
        console.log('New ticket event:', event);
        // Update UI immediately (optimistic update)
        // Then refresh from data source if needed
      }
    );

    return unsubscribe;
  }, []);

  return <TicketTable tickets={tickets} />;
}
```

### Option 3: Optimistic Updates

```typescript
import { useOptimisticAutoRefresh } from '@/hooks/useAutoRefresh';
import { enhancedTasks } from '@/data/enhanced-demo-data';

export function TaskKanbanWidget() {
  const { data, optimisticUpdate, refresh } = useOptimisticAutoRefresh(
    () => enhancedTasks,
    { interval: 10000 }
  );

  const moveTask = (taskId: string, newStatus: string) => {
    // Update UI immediately (no loading spinner!)
    optimisticUpdate(tasks =>
      tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t)
    );
    // Background refresh will sync with "server"
  };

  return <KanbanBoard tasks={data || []} onMove={moveTask} />;
}
```

---

## 📊 All Available Hooks

### 1. `useAutoRefresh` - Standard Auto-Refresh

**Best for**: Most widgets that need periodic updates

```typescript
const { data, isLoading, error, lastRefresh, refresh } = useAutoRefresh(
  dataFetcher,
  {
    interval: 10000,      // Refresh every 10 seconds
    minDelay: 200,        // Min simulated API delay
    maxDelay: 500,        // Max simulated API delay
    refreshOnMount: true, // Load immediately
    enabled: true,        // Can disable temporarily
  }
);
```

### 2. `useDataPolling` - Incremental Updates

**Best for**: Widgets that append new data instead of replacing all

```typescript
useDataPolling(
  async () => {
    const newItems = await fetchNewItems(lastId);
    setItems(prev => [...newItems, ...prev]);
  },
  { interval: 20000 }
);
```

### 3. `useDebouncedAutoRefresh` - Prevents Rapid Updates

**Best for**: High-frequency updates that might overwhelm UI

```typescript
const { data } = useDebouncedAutoRefresh(
  dataFetcher,
  {
    interval: 5000,
    debounce: 2000, // Wait 2s after last trigger
  }
);
```

### 4. `useOptimisticAutoRefresh` - Instant UI Updates

**Best for**: Interactive widgets where user actions should feel instant

```typescript
const { data, optimisticUpdate } = useOptimisticAutoRefresh(
  dataFetcher,
  { interval: 10000 }
);

// Update UI immediately, sync in background
optimisticUpdate(currentData => transformData(currentData));
```

---

## 🎨 Loading States

### Show Skeleton Only on Initial Load

```typescript
const { data, isLoading } = useAutoRefresh(dataFetcher, {
  refreshOnMount: true
});

if (isLoading && !data) {
  return <WidgetSkeleton />;
}

// On subsequent refreshes, show stale data (no flicker!)
return <DataView data={data} />;
```

### Show Refresh Indicator

```typescript
const { data, isLoading, lastRefresh } = useAutoRefresh(dataFetcher);

return (
  <div>
    {isLoading && (
      <div className="absolute top-2 right-2">
        <RefreshSpinner />
      </div>
    )}
    <DataView data={data} />
    <LastUpdated time={lastRefresh} />
  </div>
);
```

---

## 🔔 Real-Time Event Types

Subscribe to these event types for specific updates:

```typescript
export type RealtimeEventType =
  | 'ticket.created'
  | 'ticket.updated'
  | 'ticket.status.changed'
  | 'contract.budget.alert'
  | 'deliverable.submitted'
  | 'sprint.velocity.updated'
  | 'code.quality.changed'
  | 'vendor.performance.alert'
  | 'task.completed'
  | 'metric.updated';
```

### Example: Multi-Event Subscription

```typescript
useEffect(() => {
  const unsubscribe = realtimeService.subscribe(
    [
      'ticket.created',
      'ticket.updated',
      'ticket.status.changed'
    ],
    (event) => {
      switch (event.type) {
        case 'ticket.created':
          addNewTicket(event.data);
          break;
        case 'ticket.updated':
          updateExistingTicket(event.data);
          break;
        case 'ticket.status.changed':
          updateTicketStatus(event.data);
          break;
      }
    }
  );

  return unsubscribe;
}, []);
```

---

## ⚙️ Configuration Recommendations

### By Widget Type

| Widget Type | Refresh Interval | Strategy |
|-------------|-----------------|----------|
| **Metrics Dashboard** | 8-10 seconds | `useAutoRefresh` |
| **Ticket List** | 15-20 seconds | `useAutoRefresh` + events |
| **Sprint Burndown** | 25-30 seconds | `useDebouncedAutoRefresh` |
| **Code Quality** | 35-40 seconds | `useAutoRefresh` |
| **Contract Status** | 45-60 seconds | `useAutoRefresh` |
| **Task Kanban** | 10-15 seconds | `useOptimisticAutoRefresh` |
| **Live Chat** | 5-8 seconds | `useDataPolling` |

### By Demo Type

**Quick Demo (5-7 min)**:
- Faster intervals (8-12 seconds)
- More visible updates
- Use event log to show activity

**Training Session (30 min)**:
- Moderate intervals (15-20 seconds)
- Hide event log
- Focus on data quality

**Stakeholder Presentation (10-15 min)**:
- Slower intervals (20-30 seconds)
- Subtle refresh indicators
- Emphasize insights over activity

---

## 🎬 Adding to Existing Widgets

### Step 1: Import Hook

```typescript
import { useAutoRefresh } from '@/hooks/useAutoRefresh';
```

### Step 2: Replace Static Data

**Before:**
```typescript
const data = enhancedTicketList;
```

**After:**
```typescript
const { data } = useAutoRefresh(
  () => enhancedTicketList,
  { interval: 15000, refreshOnMount: true }
);
```

### Step 3: Add Loading State

```typescript
const { data, isLoading } = useAutoRefresh(...);

if (isLoading && !data) {
  return <WidgetSkeleton />;
}
```

### Step 4: Add Last Updated Timestamp

```typescript
const { data, lastRefresh } = useAutoRefresh(...);

return (
  <div>
    <DataView data={data} />
    {lastRefresh && (
      <div className="text-xs text-gray-500 mt-2">
        Last updated: {lastRefresh.toLocaleTimeString()}
      </div>
    )}
  </div>
);
```

---

## 🧪 Testing Auto-Refresh

### In Development

1. Open browser DevTools console
2. Watch for refresh logs: `Auto-refresh: Updated data at 10:30:45 AM`
3. Use event log component: Press `Ctrl+L` to toggle
4. Check demo mode indicator: Shows events count

### In Presentation

1. Add `<DemoModeIndicator />` to root layout
2. Watch "Events" counter increase
3. Verify widgets update visually
4. Use pause button if needed during explanation

---

## 🚨 Common Pitfalls

### ❌ Don't Do This

```typescript
// BAD: Creating new function on every render
const { data } = useAutoRefresh(() => getData(), options);

// BAD: Not handling loading state
if (!data) return null; // Flickers on refresh!

// BAD: Interval too fast
{ interval: 1000 } // Updates every second (overwhelming!)
```

### ✅ Do This Instead

```typescript
// GOOD: Stable data fetcher
const dataFetcher = useCallback(() => getData(), []);
const { data } = useAutoRefresh(dataFetcher, options);

// GOOD: Proper loading state
if (isLoading && !data) return <Skeleton />;
return <DataView data={data} />; // Shows stale data during refresh

// GOOD: Reasonable interval
{ interval: 10000 } // Updates every 10 seconds
```

---

## 📦 Widget Integration Checklist

For each widget, ensure:

- [ ] Auto-refresh hook imported and configured
- [ ] Loading skeleton shown on initial load only
- [ ] Data updates smoothly without flicker
- [ ] Last updated timestamp displayed
- [ ] Appropriate refresh interval chosen (10-30s)
- [ ] Error handling in place
- [ ] Simulated API delay enabled (200-500ms)
- [ ] Real-time events subscribed (optional)
- [ ] Manual refresh button (optional)

---

## 🎯 Next Steps

1. **Phase 1**: Add auto-refresh to 5 highest-priority widgets
2. **Phase 2**: Add real-time event listeners to interactive widgets
3. **Phase 3**: Enable demo mode indicator in root layout
4. **Phase 4**: Test all widgets during 10-minute mock demo
5. **Phase 5**: Fine-tune refresh intervals based on feedback

---

**Files to Reference**:
- Hook implementation: `/src/hooks/useAutoRefresh.ts`
- Real-time service: `/src/lib/mock-realtime.ts`
- Demo indicator: `/src/components/demo/DemoModeIndicator.tsx`
- Enhanced data: `/src/data/enhanced-demo-data.ts`
