'use client';

import { DashboardWidget } from '@/config/dashboard-widgets';
import { WidgetRenderer } from '@/components/widgets/WidgetRenderer';
import { WidgetType, WidgetData } from '@/types/widget';
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

interface DashboardGridProps {
  widgets: DashboardWidget[];
  onWidgetClick?: (widget: DashboardWidget) => void;
}

// Map widget types to their demo data (partial - not all widgets used in dashboard)
const widgetDataMap: Partial<Record<WidgetType, WidgetData>> = {
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
  'meeting-confirmation': meetingSchedulerDemo, // Reuse same data
  'similar-tickets-analysis': similarTicketsAnalysisDemo,
  'knowledge-base-search': knowledgeBaseSearchDemo,
  'knowledge-article': knowledgeArticleDemo,
  'analytics-dashboard': executiveSummaryDemo, // Fallback
  'escalation-path': ticketListDemo, // Fallback
};

export function DashboardGrid({ widgets, onWidgetClick }: DashboardGridProps) {
  return (
    <div className="w-full h-full overflow-y-auto bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Overview of your key metrics and insights
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {widgets.map((widget) => {
            const widgetData = (widgetDataMap[widget.type] || {}) as WidgetData;

            return (
              <div
                key={widget.id}
                className="group relative"
                onClick={() => onWidgetClick?.(widget)}
              >
                <div className="h-full transition-all duration-200 hover:scale-[1.02]">
                  <WidgetRenderer
                    type={widget.type}
                    data={widgetData}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
