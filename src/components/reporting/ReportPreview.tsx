'use client';

import { TrendingUp, TrendingDown, Minus, Download, Share2, Bookmark } from 'lucide-react';

interface MetricData {
  label: string;
  value: number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
}

interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string;
  }>;
}

interface ReportData {
  id: string;
  generatedAt: string;
  dateRange: { start: string; end: string };
  summary: {
    totalTickets: number;
    resolvedTickets: number;
    resolutionRate: string;
    avgResolutionTime: string;
  };
  metrics: MetricData[];
  chartData: ChartData;
  groupBy: string;
}

interface ReportPreviewProps {
  report: ReportData;
  onExport: (format: 'csv' | 'pdf' | 'xlsx') => void;
  onSave?: () => void;
  onShare?: () => void;
}

function TrendIcon({ trend }: { trend?: 'up' | 'down' | 'stable' }) {
  if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />;
  if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />;
  return <Minus className="w-4 h-4 text-gray-400" />;
}

export default function ReportPreview({ report, onExport, onSave, onShare }: ReportPreviewProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Report Preview</h2>
            <p className="text-sm text-gray-500">
              {formatDate(report.dateRange.start)} - {formatDate(report.dateRange.end)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {onSave && (
              <button onClick={onSave} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md" title="Save Template">
                <Bookmark className="w-5 h-5" />
              </button>
            )}
            {onShare && (
              <button onClick={onShare} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md" title="Share Report">
                <Share2 className="w-5 h-5" />
              </button>
            )}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
                <Download className="w-4 h-4" />
                Export
              </button>
              <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 hidden group-hover:block z-10">
                <button onClick={() => onExport('csv')} className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">CSV</button>
                <button onClick={() => onExport('pdf')} className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">PDF</button>
                <button onClick={() => onExport('xlsx')} className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">Excel</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Summary</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Total Tickets</p>
            <p className="text-2xl font-bold text-gray-900">{report.summary.totalTickets.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Resolved</p>
            <p className="text-2xl font-bold text-green-600">{report.summary.resolvedTickets.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Resolution Rate</p>
            <p className="text-2xl font-bold text-blue-600">{report.summary.resolutionRate}%</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Avg Resolution Time</p>
            <p className="text-2xl font-bold text-orange-600">{report.summary.avgResolutionTime}</p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {report.metrics.map((metric, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500">{metric.label}</p>
                <TrendIcon trend={metric.trend} />
              </div>
              <p className="text-xl font-bold text-gray-900">{metric.value.toLocaleString()}</p>
              {metric.change !== undefined && (
                <p className={`text-sm ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change >= 0 ? '+' : ''}{metric.change.toFixed(1)}%
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Simple Bar Chart Visualization */}
      <div className="p-6">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Trends by {report.groupBy}
        </h3>
        <div className="h-64 flex items-end justify-around gap-2 px-4">
          {report.chartData.labels.map((label, index) => {
            const maxValue = Math.max(...report.chartData.datasets.flatMap(d => d.data));
            return (
              <div key={label} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex gap-1 items-end justify-center h-48">
                  {report.chartData.datasets.map((dataset, datasetIndex) => {
                    const value = dataset.data[index];
                    const height = (value / maxValue) * 100;
                    return (
                      <div
                        key={datasetIndex}
                        className="w-6 rounded-t transition-all hover:opacity-80"
                        style={{
                          height: `${height}%`,
                          backgroundColor: dataset.backgroundColor || '#f97316',
                        }}
                        title={`${dataset.label}: ${value}`}
                      />
                    );
                  })}
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">{label}</span>
              </div>
            );
          })}
        </div>
        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4">
          {report.chartData.datasets.map((dataset, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: dataset.backgroundColor || '#f97316' }}
              />
              <span className="text-sm text-gray-600">{dataset.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500">
          Generated on {formatDate(report.generatedAt)} | Report ID: {report.id}
        </p>
      </div>
    </div>
  );
}
