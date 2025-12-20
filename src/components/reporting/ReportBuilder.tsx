'use client';

import { useState, useEffect } from 'react';
import { BarChart3, Calendar, Filter, Plus, X, Loader2, Play } from 'lucide-react';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  metrics: string[];
  chartType: string;
}

interface ReportBuilderProps {
  onGenerate: (config: ReportConfig) => void;
  isGenerating?: boolean;
}

interface ReportConfig {
  templateId?: string;
  metrics: string[];
  dateRange: { start: string; end: string };
  filters: Record<string, string[]>;
  groupBy: string;
}

const AVAILABLE_METRICS = [
  { id: 'ticketsResolved', label: 'Tickets Resolved', category: 'performance' },
  { id: 'avgResponseTime', label: 'Avg Response Time', category: 'performance' },
  { id: 'customerSatisfaction', label: 'Customer Satisfaction', category: 'customer' },
  { id: 'slaCompliance', label: 'SLA Compliance', category: 'sla' },
  { id: 'slaBreaches', label: 'SLA Breaches', category: 'sla' },
  { id: 'ticketVolume', label: 'Ticket Volume', category: 'performance' },
  { id: 'firstContactResolution', label: 'First Contact Resolution', category: 'agent' },
  { id: 'csatScore', label: 'CSAT Score', category: 'customer' },
  { id: 'npsScore', label: 'NPS Score', category: 'customer' },
  { id: 'avgHandleTime', label: 'Avg Handle Time', category: 'agent' },
];

const GROUP_BY_OPTIONS = [
  { id: 'day', label: 'Day' },
  { id: 'week', label: 'Week' },
  { id: 'month', label: 'Month' },
  { id: 'agent', label: 'Agent' },
  { id: 'category', label: 'Category' },
  { id: 'priority', label: 'Priority' },
];

export default function ReportBuilder({ onGenerate, isGenerating }: ReportBuilderProps) {
  const [templates, setTemplates] = useState<ReportTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [groupBy, setGroupBy] = useState('day');
  const [showMetricsPicker, setShowMetricsPicker] = useState(false);

  useEffect(() => {
    // Set default date range to last 30 days
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    setDateRange({
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0],
    });

    // Fetch templates
    fetch('/api/reports/templates')
      .then(res => res.json())
      .then(data => setTemplates(data.templates || []))
      .catch(() => setTemplates([]));
  }, []);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedMetrics(template.metrics);
    }
  };

  const toggleMetric = (metricId: string) => {
    setSelectedMetrics(prev =>
      prev.includes(metricId)
        ? prev.filter(m => m !== metricId)
        : [...prev, metricId]
    );
    setSelectedTemplate(''); // Clear template when manually selecting metrics
  };

  const handleGenerate = () => {
    if (selectedMetrics.length === 0) return;
    onGenerate({
      templateId: selectedTemplate || undefined,
      metrics: selectedMetrics,
      dateRange,
      filters: {},
      groupBy,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Report Builder</h2>
            <p className="text-sm text-gray-500">Create custom reports from your data</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Templates */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Start from Template</label>
          <select
            value={selectedTemplate}
            onChange={(e) => handleTemplateSelect(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Custom Report</option>
            {templates.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Date Range
          </label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Metrics Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Filter className="w-4 h-4 inline mr-1" />
            Metrics ({selectedMetrics.length} selected)
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedMetrics.map(metricId => {
              const metric = AVAILABLE_METRICS.find(m => m.id === metricId);
              return (
                <span key={metricId} className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                  {metric?.label || metricId}
                  <button onClick={() => toggleMetric(metricId)} className="hover:text-orange-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })}
            <button
              onClick={() => setShowMetricsPicker(!showMetricsPicker)}
              className="inline-flex items-center gap-1 px-3 py-1 border border-dashed border-gray-300 text-gray-600 rounded-full text-sm hover:border-orange-500 hover:text-orange-600"
            >
              <Plus className="w-3 h-3" />
              Add Metric
            </button>
          </div>
          {showMetricsPicker && (
            <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200 grid grid-cols-2 gap-2">
              {AVAILABLE_METRICS.map(metric => (
                <label key={metric.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedMetrics.includes(metric.id)}
                    onChange={() => toggleMetric(metric.id)}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">{metric.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Group By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Group By</label>
          <div className="flex flex-wrap gap-2">
            {GROUP_BY_OPTIONS.map(option => (
              <button
                key={option.id}
                onClick={() => setGroupBy(option.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  groupBy === option.id
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={selectedMetrics.length === 0 || isGenerating}
          className="w-full py-3 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Report...
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Generate Report
            </>
          )}
        </button>
      </div>
    </div>
  );
}
