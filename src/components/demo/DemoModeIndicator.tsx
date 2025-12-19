// Demo Mode Indicator - Shows that app is in demo mode with simulated data
// Provides visual feedback during presentations

'use client';

import { useState, useEffect } from 'react';
import { Activity, Wifi, WifiOff, Pause, Play } from 'lucide-react';
import { realtimeService } from '@/lib/mock-realtime';

export function DemoModeIndicator() {
  const [isVisible, setIsVisible] = useState(true);
  const [serviceStatus, setServiceStatus] = useState(realtimeService.getStatus());
  const [isPaused, setIsPaused] = useState(false);

  // Update service status every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setServiceStatus(realtimeService.getStatus());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Toggle visibility with keyboard shortcut (Ctrl+D)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const togglePause = () => {
    if (isPaused) {
      realtimeService.start();
      setIsPaused(false);
    } else {
      realtimeService.stop();
      setIsPaused(true);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-gradient-to-r from-orange-500/90 to-red-500/90 backdrop-blur-sm rounded-lg shadow-lg px-4 py-2 flex items-center gap-3 text-white text-sm border border-white/20">
        {/* Live indicator */}
        <div className="flex items-center gap-2">
          {serviceStatus.isStarted && !isPaused ? (
            <>
              <Activity className="w-4 h-4 animate-pulse" />
              <Wifi className="w-4 h-4" />
              <span className="font-semibold">DEMO MODE</span>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4" />
              <span className="font-semibold">PAUSED</span>
            </>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs opacity-90 border-l border-white/30 pl-3">
          <div>
            <span className="opacity-75">Events:</span>{' '}
            <span className="font-mono">{serviceStatus.eventsEmitted}</span>
          </div>
          <div>
            <span className="opacity-75">Subscribers:</span>{' '}
            <span className="font-mono">{serviceStatus.subscriptions}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 border-l border-white/30 pl-3">
          <button
            onClick={togglePause}
            className="hover:bg-white/20 rounded p-1 transition-colors"
            title={isPaused ? 'Resume real-time updates' : 'Pause real-time updates'}
          >
            {isPaused ? (
              <Play className="w-4 h-4" />
            ) : (
              <Pause className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="hover:bg-white/20 rounded px-2 py-1 transition-colors text-xs"
            title="Hide indicator (Ctrl+D to toggle)"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Keyboard shortcut hint */}
      <div className="text-xs text-center mt-1 text-gray-400">
        Press <kbd className="px-1 bg-gray-800 rounded">Ctrl+D</kbd> to toggle
      </div>
    </div>
  );
}

/**
 * Compact version for presentations
 */
export function DemoModeBadge() {
  const [serviceStatus, setServiceStatus] = useState(realtimeService.getStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      setServiceStatus(realtimeService.getStatus());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-red-500/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2 text-white text-xs font-semibold shadow-lg">
        {serviceStatus.isStarted && (
          <Activity className="w-3 h-3 animate-pulse" />
        )}
        <span>DEMO</span>
      </div>
    </div>
  );
}

/**
 * Event log for debugging during development
 */
export function DemoEventLog() {
  const [events, setEvents] = useState<Array<{ type: string; time: string; data: unknown }>>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = realtimeService.subscribe(
      [
        'ticket.created',
        'ticket.updated',
        'ticket.status.changed',
        'contract.budget.alert',
        'deliverable.submitted',
        'sprint.velocity.updated',
        'code.quality.changed',
        'vendor.performance.alert',
        'task.completed',
        'metric.updated',
      ],
      (event) => {
        setEvents((prev) => [
          {
            type: event.type,
            time: new Date().toLocaleTimeString(),
            data: event.data,
          },
          ...prev.slice(0, 19), // Keep last 20 events
        ]);
      }
    );

    return unsubscribe;
  }, []);

  // Toggle with Ctrl+L
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-gray-800/90 backdrop-blur-sm rounded px-3 py-2 text-white text-xs hover:bg-gray-700/90 transition-colors"
          title="Show event log (Ctrl+L)"
        >
          Event Log
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-96 max-h-96 overflow-hidden">
      <div className="bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-white text-sm font-semibold">Real-Time Events</span>
            <span className="text-gray-400 text-xs">({events.length})</span>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Event list */}
        <div className="overflow-y-auto max-h-80 p-2 space-y-1">
          {events.length === 0 ? (
            <div className="text-gray-500 text-xs text-center py-8">
              No events yet...
            </div>
          ) : (
            events.map((event, index) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded px-2 py-1.5 text-xs space-y-1 hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-blue-400 font-mono">{event.type}</span>
                  <span className="text-gray-500">{event.time}</span>
                </div>
                <div className="text-gray-400 font-mono text-[10px] overflow-hidden text-ellipsis">
                  {JSON.stringify(event.data).slice(0, 100)}...
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-3 py-2 border-t border-gray-700 flex items-center justify-between">
          <span className="text-gray-500 text-[10px]">
            Press <kbd className="px-1 bg-gray-800 rounded">Ctrl+L</kbd> to toggle
          </span>
          <button
            onClick={() => setEvents([])}
            className="text-red-400 hover:text-red-300 text-xs transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
