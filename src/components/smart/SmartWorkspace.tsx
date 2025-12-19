'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, PanelRightOpen, PanelRightClose, Pin, PinOff, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveChat, type InteractiveChatRef } from '../chat/InteractiveChat';
import { usePersona } from '@/hooks/use-persona';
import { useSidebar } from '@/contexts/SidebarContext';
import { getDashboardWidgets, DashboardWidget } from '@/config/dashboard-widgets';
import {
  executiveSummaryDemo,
  customerRiskProfileDemo,
  ticketDetailDemo,
  slaPerformanceChartDemo,
  agentPerformanceComparisonDemo,
  callPrepNotesDemo,
  responseComposerDemo,
  teamWorkloadDashboardDemo,
  customerRiskListDemo,
  ticketListDemo,
  agentDashboardDemo,
  meetingSchedulerDemo,
  similarTicketsAnalysisDemo,
  agentPerformanceStatsDemo,
  knowledgeBaseSearchDemo,
  knowledgeArticleDemo,
  messageComposerDemo,
} from '@/data/demo-widget-data';
import type { WidgetType, WidgetData } from '@/types/widget';

 
const _widgetDataMap: Partial<Record<WidgetType, WidgetData>> = {
  'executive-summary': executiveSummaryDemo,
  'customer-risk-profile': customerRiskProfileDemo,
  'customer-risk-list': customerRiskListDemo,
  'ticket-detail': ticketDetailDemo,
  'ticket-list': ticketListDemo,
  'sla-performance-chart': slaPerformanceChartDemo,
  'agent-performance-comparison': agentPerformanceComparisonDemo,
  'agent-performance-stats': agentPerformanceStatsDemo,
  'agent-dashboard': agentDashboardDemo,
  'team-workload-dashboard': teamWorkloadDashboardDemo,
  'call-prep-notes': callPrepNotesDemo,
  'response-composer': responseComposerDemo,
  'message-composer': messageComposerDemo,
  'meeting-scheduler': meetingSchedulerDemo,
  'meeting-confirmation': meetingSchedulerDemo,
  'similar-tickets-analysis': similarTicketsAnalysisDemo,
  'knowledge-base-search': knowledgeBaseSearchDemo,
  'knowledge-article': knowledgeArticleDemo,
  'analytics-dashboard': executiveSummaryDemo,
  'escalation-path': ticketListDemo,
};

export function SmartWorkspace() {
  const { currentPersona } = usePersona();
   
  const { sidebarOpen: _sidebarOpen } = useSidebar();
  const [dashboardOpen, setDashboardOpen] = useState(true);
  const [pinnedWidgets, setPinnedWidgets] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<InteractiveChatRef>(null);
  const widgets = getDashboardWidgets(currentPersona.id);

  // Keyboard shortcut: Cmd+D to toggle dashboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault();
        setDashboardOpen((prev) => !prev);
      }
      // Cmd+P to pin/unpin first widget (demo)
      else if ((e.metaKey || e.ctrlKey) && e.key === 'p' && widgets.length > 0) {
        e.preventDefault();
        const firstWidgetId = widgets[0].id;
        setPinnedWidgets((prev) =>
          prev.includes(firstWidgetId)
            ? prev.filter((id) => id !== firstWidgetId)
            : [...prev, firstWidgetId]
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [widgets]);

  const togglePinWidget = (widgetId: string) => {
    setPinnedWidgets((prev) =>
      prev.includes(widgetId) ? prev.filter((id) => id !== widgetId) : [...prev, widgetId]
    );
  };

  const handleWidgetClick = (widget: DashboardWidget) => {
    chatRef.current?.submitQuery(widget.query);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    chatRef.current?.submitQuery(inputValue);
    setInputValue('');
  };

  return (
    <div className="relative h-full flex">
      {/* Chat Area - Center */}
      <div className="flex-1 flex flex-col">
        {/* Dashboard Toggle Button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setDashboardOpen(!dashboardOpen)}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg transition-all
              ${
                dashboardOpen
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card/90 backdrop-blur-xl border border-border/50 hover:bg-card'
              }
            `}
          >
            {dashboardOpen ? (
              <PanelRightClose className="w-4 h-4" />
            ) : (
              <PanelRightOpen className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">Dashboard</span>
          </button>
          <div className="text-xs text-muted-foreground text-center mt-2">
            <kbd className="px-2 py-1 bg-muted rounded text-xs">⌘D</kbd>
          </div>
        </div>

        {/* Chat content */}
        <style jsx global>{`
          .smart-workspace-chat .border-t.border-border.bg-card {
            display: none;
          }
        `}</style>

        <div className="smart-workspace-chat h-full flex-1">
          <InteractiveChat ref={chatRef} persona={currentPersona} />
        </div>

        {/* Input bar */}
        <div className="border-t border-border bg-card/50 backdrop-blur-xl p-4">
          <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything..."
              className="w-full pl-4 pr-12 py-3 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Smart Dashboard Sidebar - Right */}
      <AnimatePresence>
        {dashboardOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="w-[380px] border-l border-border bg-card flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-border bg-muted/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <LayoutDashboard className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Smart Dashboard</h3>
                    <p className="text-xs text-muted-foreground">
                      {pinnedWidgets.length} pinned
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setDashboardOpen(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                  title="Close dashboard"
                >
                  <PanelRightClose className="w-4 h-4" />
                </button>
              </div>

              {/* Context hint */}
              <div className="px-3 py-2 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-xs text-primary">
                  💡 Widgets adapt based on your conversation
                </p>
              </div>
            </div>

            {/* Widget List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {widgets.map((widget) => {
                const isPinned = pinnedWidgets.includes(widget.id);

                return (
                  <div
                    key={widget.id}
                    className={`
                      relative group rounded-lg border transition-all
                      ${isPinned ? 'border-primary/50 bg-primary/5' : 'border-border hover:border-primary/30'}
                    `}
                  >
                    {/* Pin button */}
                    <button
                      onClick={() => togglePinWidget(widget.id)}
                      className={`
                        absolute top-2 right-2 z-10 p-1.5 rounded-md transition-all
                        ${
                          isPinned
                            ? 'bg-primary/20 text-primary'
                            : 'opacity-0 group-hover:opacity-100 bg-muted hover:bg-muted/80'
                        }
                      `}
                      title={isPinned ? 'Unpin widget' : 'Pin widget'}
                    >
                      {isPinned ? (
                        <PinOff className="w-3.5 h-3.5" />
                      ) : (
                        <Pin className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {/* Widget content preview */}
                    <button
                      onClick={() => handleWidgetClick(widget)}
                      className="w-full p-3 text-left"
                    >
                      <div className="mb-2">
                        <h4 className="text-sm font-semibold text-foreground">
                          {widget.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {widget.description}
                        </p>
                      </div>

                      {/* Mini widget preview */}
                      <div className="mt-2 p-2 bg-background/50 rounded border border-border/50">
                        <div className="text-xs text-muted-foreground">
                          Click to view in chat →
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-border bg-muted/30">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span><kbd className="px-1.5 py-0.5 bg-muted rounded">⌘D</kbd> Toggle</span>
                <span><kbd className="px-1.5 py-0.5 bg-muted rounded">⌘P</kbd> Pin</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
