'use client';

import { useState } from 'react';
import type { ComponentType } from 'react';
import { LayoutDashboard, Maximize2, X } from 'lucide-react';
import { ExecutiveSummaryWidget } from './ExecutiveSummaryWidget';
import { SLAPerformanceChartWidget } from './SLAPerformanceChartWidget';

// Widget type mapping - maps widget type string to React component
const widgetComponents: Record<string, ComponentType<{ data: unknown }>> = {
  'executive-summary': ExecutiveSummaryWidget as ComponentType<{ data: unknown }>,
  'sla-performance': SLAPerformanceChartWidget as ComponentType<{ data: unknown }>,
  'sla-dashboard': SLAPerformanceChartWidget as ComponentType<{ data: unknown }>,
  'sla-performance-chart': SLAPerformanceChartWidget as ComponentType<{ data: unknown }>,
};

interface DashboardWidgetItem {
  type: string;
  data: unknown;
  span?: number;
}

interface DashboardData {
  title?: string;
  layout?: '2x2' | '3x2' | '4x1' | 'custom';
  widgets: DashboardWidgetItem[];
}

export function DashboardWidget({ data }: { data: DashboardData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!data || !data.widgets || data.widgets.length === 0) return null;

  const widgetCount = data.widgets.length;

  // Inline Preview
  const PreviewView = () => (
    <div className="bg-card border border-border rounded-lg p-6 my-4">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <LayoutDashboard className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">
            {data.title || 'Executive Overview Dashboard'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {widgetCount} widget{widgetCount !== 1 ? 's' : ''} • Real-time insights and
            metrics
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Maximize2 className="w-4 h-4" />
          View Dashboard
        </button>
      </div>

      {/* Mini preview of first 2 widgets */}
      <div className="grid grid-cols-2 gap-3">
        {data.widgets.slice(0, 2).map((widget, index) => {
          const WidgetComponent = widgetComponents[widget.type];
          if (!WidgetComponent) return null;

          return (
            <div
              key={index}
              className="opacity-70 pointer-events-none scale-90 origin-top-left"
            >
              <WidgetComponent data={widget.data} />
            </div>
          );
        })}
      </div>

      {widgetCount > 2 && (
        <div className="mt-3 text-center">
          <p className="text-xs text-muted-foreground">
            +{widgetCount - 2} more widget{widgetCount - 2 !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );

  // Full Dashboard Modal
  const ModalView = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={() => setIsModalOpen(false)}
      />

      {/* Modal Content */}
      <div className="relative bg-card border border-border rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                {data.title || 'Dashboard'}
              </h3>
              <p className="text-sm text-muted-foreground">
                Real-time insights and metrics
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.widgets.map((widget, index) => {
              const WidgetComponent = widgetComponents[widget.type];
              if (!WidgetComponent) {
                console.warn(`Widget type "${widget.type}" not found in dashboard`);
                return null;
              }

              const spanClass =
                widget.span === 2
                  ? 'md:col-span-2'
                  : widget.span === 3
                  ? 'lg:col-span-3'
                  : widget.span === 4
                  ? 'lg:col-span-4'
                  : '';

              return (
                <div key={index} className={spanClass}>
                  <WidgetComponent data={widget.data} />
                </div>
              );
            })}
          </div>

          {/* Footer hint */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Dashboard updates in real-time • Last updated: Just now
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <PreviewView />
      {isModalOpen && <ModalView />}
    </>
  );
}
