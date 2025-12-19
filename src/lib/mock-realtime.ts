// Mock real-time service for simulating live data updates during demos
// This creates the illusion of a live production system without actual WebSocket connections

import { faker } from '@faker-js/faker';

// Use consistent seed for reproducible demos
faker.seed(42);

// Event types that can be emitted
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

// Event payload structure
export interface RealtimeEvent {
  type: RealtimeEventType;
  timestamp: Date;
  data: unknown;
}

// Callback function type
type EventCallback = (event: RealtimeEvent) => void;

// Subscription management
interface Subscription {
  id: string;
  eventTypes: RealtimeEventType[];
  callback: EventCallback;
}

/**
 * Mock Real-Time Service
 *
 * Simulates live data updates without actual WebSocket connections.
 * Perfect for demos where you want to show real-time updates without backend infrastructure.
 *
 * Usage:
 * ```typescript
 * const unsubscribe = realtimeService.subscribe(
 *   ['ticket.created', 'ticket.updated'],
 *   (event) => {
 *     console.log('New event:', event);
 *     updateWidget(event.data);
 *   }
 * );
 *
 * // Later: unsubscribe()
 * ```
 */
class MockRealtimeService {
  private subscriptions: Map<string, Subscription> = new Map();
  private eventIntervals: Map<string, NodeJS.Timeout> = new Map();
  private isStarted = false;
  private eventCounter = 0;

  /**
   * Start emitting random events at regular intervals
   */
  start() {
    if (this.isStarted) return;
    this.isStarted = true;

    // Emit different event types at different frequencies
    this.scheduleEvent('ticket.created', 15000); // Every 15 seconds
    this.scheduleEvent('ticket.updated', 10000); // Every 10 seconds
    this.scheduleEvent('ticket.status.changed', 20000); // Every 20 seconds
    this.scheduleEvent('contract.budget.alert', 45000); // Every 45 seconds
    this.scheduleEvent('deliverable.submitted', 30000); // Every 30 seconds
    this.scheduleEvent('sprint.velocity.updated', 25000); // Every 25 seconds
    this.scheduleEvent('code.quality.changed', 35000); // Every 35 seconds
    this.scheduleEvent('vendor.performance.alert', 60000); // Every 60 seconds
    this.scheduleEvent('task.completed', 12000); // Every 12 seconds
    this.scheduleEvent('metric.updated', 8000); // Every 8 seconds
  }

  /**
   * Stop all event emissions
   */
  stop() {
    this.eventIntervals.forEach((interval) => clearInterval(interval));
    this.eventIntervals.clear();
    this.isStarted = false;
  }

  /**
   * Subscribe to specific event types
   *
   * @param eventTypes - Array of event types to listen for
   * @param callback - Function to call when event occurs
   * @returns Unsubscribe function
   */
  subscribe(
    eventTypes: RealtimeEventType[],
    callback: EventCallback
  ): () => void {
    const subscriptionId = `sub-${Date.now()}-${Math.random()}`;

    const subscription: Subscription = {
      id: subscriptionId,
      eventTypes,
      callback,
    };

    this.subscriptions.set(subscriptionId, subscription);

    // Return unsubscribe function
    return () => {
      this.subscriptions.delete(subscriptionId);
    };
  }

  /**
   * Schedule periodic event emission
   */
  private scheduleEvent(eventType: RealtimeEventType, intervalMs: number) {
    const interval = setInterval(() => {
      this.emitEvent(eventType);
    }, intervalMs);

    this.eventIntervals.set(eventType, interval);
  }

  /**
   * Emit an event to all subscribers
   */
  private emitEvent(eventType: RealtimeEventType) {
    const event: RealtimeEvent = {
      type: eventType,
      timestamp: new Date(),
      data: this.generateEventData(eventType),
    };

    // Notify all subscribers interested in this event type
    this.subscriptions.forEach((subscription) => {
      if (subscription.eventTypes.includes(eventType)) {
        try {
          subscription.callback(event);
        } catch (error) {
          console.error('Error in realtime event callback:', error);
        }
      }
    });

    this.eventCounter++;
  }

  /**
   * Generate realistic event data based on event type
   */
  private generateEventData(eventType: RealtimeEventType): unknown {
    switch (eventType) {
      case 'ticket.created':
        return {
          id: `TICK-${faker.number.int({ min: 1000, max: 9999 })}`,
          subject: faker.helpers.arrayElement([
            'Cannot access dashboard',
            'Password reset needed',
            'Performance issue on homepage',
            'Feature request: Dark mode',
            'Bug: Form validation error',
          ]),
          priority: faker.helpers.arrayElement(['low', 'medium', 'high', 'critical']),
          customer: faker.company.name(),
        };

      case 'ticket.updated':
        return {
          id: `TICK-${faker.number.int({ min: 1000, max: 9999 })}`,
          field: faker.helpers.arrayElement(['status', 'priority', 'assignee', 'notes']),
          oldValue: 'open',
          newValue: faker.helpers.arrayElement(['in-progress', 'pending', 'resolved']),
        };

      case 'ticket.status.changed':
        return {
          id: `TICK-${faker.number.int({ min: 1000, max: 9999 })}`,
          oldStatus: 'in-progress',
          newStatus: faker.helpers.arrayElement(['resolved', 'closed', 'pending']),
          resolvedBy: faker.person.fullName(),
        };

      case 'contract.budget.alert':
        return {
          contractId: `CONT-${faker.number.int({ min: 100, max: 999 })}`,
          contractName: `${faker.company.name()} - ${faker.commerce.productName()}`,
          budgetUsed: faker.number.int({ min: 85, max: 98 }),
          threshold: 85,
          message: 'Contract approaching budget limit',
        };

      case 'deliverable.submitted':
        return {
          deliverableId: `DEL-${faker.number.int({ min: 100, max: 999 })}`,
          title: faker.commerce.productName(),
          submittedBy: faker.person.fullName(),
          qualityScore: faker.number.int({ min: 70, max: 100 }),
        };

      case 'sprint.velocity.updated':
        return {
          sprintName: `Sprint ${faker.number.int({ min: 1, max: 20 })}`,
          velocity: faker.number.int({ min: 40, max: 90 }),
          change: faker.number.int({ min: -10, max: 10 }),
          trend: faker.helpers.arrayElement(['improving', 'stable', 'declining']),
        };

      case 'code.quality.changed':
        return {
          metric: faker.helpers.arrayElement(['test-coverage', 'code-smells', 'bugs', 'vulnerabilities']),
          oldValue: faker.number.int({ min: 70, max: 90 }),
          newValue: faker.number.int({ min: 75, max: 95 }),
          repository: faker.helpers.arrayElement(['backend-api', 'frontend-app', 'mobile-app']),
        };

      case 'vendor.performance.alert':
        return {
          vendorId: `VEND-${faker.number.int({ min: 10, max: 99 })}`,
          vendorName: faker.company.name(),
          performanceScore: faker.number.int({ min: 60, max: 75 }),
          threshold: 80,
          reason: faker.helpers.arrayElement([
            'Multiple missed deadlines',
            'Quality issues detected',
            'SLA compliance below target',
          ]),
        };

      case 'task.completed':
        return {
          taskId: `TASK-${faker.number.int({ min: 100, max: 999 })}`,
          title: faker.helpers.arrayElement([
            'Implement OAuth integration',
            'Fix login page bug',
            'Update documentation',
            'Refactor API endpoints',
          ]),
          completedBy: faker.person.fullName(),
          storyPoints: faker.number.int({ min: 1, max: 8 }),
        };

      case 'metric.updated':
        return {
          metricName: faker.helpers.arrayElement([
            'activeUsers',
            'responseTime',
            'errorRate',
            'throughput',
          ]),
          value: faker.number.int({ min: 50, max: 100 }),
          unit: faker.helpers.arrayElement(['users', 'ms', '%', 'req/s']),
          trend: faker.helpers.arrayElement(['up', 'down', 'stable']),
        };

      default:
        return { message: 'Unknown event type' };
    }
  }

  /**
   * Get service status
   */
  getStatus() {
    return {
      isStarted: this.isStarted,
      subscriptions: this.subscriptions.size,
      eventsEmitted: this.eventCounter,
    };
  }
}

// Singleton instance
export const realtimeService = new MockRealtimeService();

// Auto-start in browser environment (not during SSR)
if (typeof window !== 'undefined') {
  // Start after a short delay to avoid SSR issues
  setTimeout(() => {
    realtimeService.start();
  }, 1000);
}

/**
 * React hook for subscribing to real-time events
 *
 * Usage:
 * ```typescript
 * function MyWidget() {
 *   useRealtimeEvents(['ticket.created'], (event) => {
 *     console.log('New ticket:', event.data);
 *   });
 * }
 * ```
 */
export function useRealtimeEvents(
  eventTypes: RealtimeEventType[],
  callback: EventCallback
) {
  if (typeof window === 'undefined') return;

  // Subscribe on mount, unsubscribe on unmount
  const unsubscribe = realtimeService.subscribe(eventTypes, callback);

  return () => {
    unsubscribe();
  };
}

/**
 * Simulate API delay for realistic demos
 *
 * Usage:
 * ```typescript
 * const data = await withApiDelay(fetchData(), 300);
 * ```
 */
export async function withApiDelay<T>(
  promise: Promise<T>,
  minMs: number = 200,
  maxMs: number = 500
): Promise<T> {
  const delay = faker.number.int({ min: minMs, max: maxMs });

  const [result] = await Promise.all([
    promise,
    new Promise((resolve) => setTimeout(resolve, delay)),
  ]);

  return result;
}

/**
 * Simulate API delay for synchronous data
 *
 * Usage:
 * ```typescript
 * const data = await simulateApiDelay(() => getData());
 * ```
 */
export async function simulateApiDelay<T>(
  dataFn: () => T,
  minMs: number = 200,
  maxMs: number = 500
): Promise<T> {
  const delay = faker.number.int({ min: minMs, max: maxMs });

  await new Promise((resolve) => setTimeout(resolve, delay));

  return dataFn();
}
