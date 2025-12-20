'use client';

import { useState, useEffect } from 'react';
import { FileText, Star, Clock, BarChart3, Users, AlertTriangle, Smile, Loader2 } from 'lucide-react';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: 'performance' | 'sla' | 'customer' | 'agent' | 'custom';
  metrics: string[];
  chartType: string;
  isDefault: boolean;
  createdAt: string;
}

interface ReportTemplatesProps {
  onSelect: (template: ReportTemplate) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  performance: <BarChart3 className="w-5 h-5" />,
  sla: <AlertTriangle className="w-5 h-5" />,
  customer: <Smile className="w-5 h-5" />,
  agent: <Users className="w-5 h-5" />,
  custom: <FileText className="w-5 h-5" />,
};

const CATEGORY_COLORS: Record<string, string> = {
  performance: 'bg-blue-100 text-blue-600',
  sla: 'bg-red-100 text-red-600',
  customer: 'bg-green-100 text-green-600',
  agent: 'bg-purple-100 text-purple-600',
  custom: 'bg-gray-100 text-gray-600',
};

export default function ReportTemplates({ onSelect }: ReportTemplatesProps) {
  const [templates, setTemplates] = useState<ReportTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch('/api/reports/templates')
      .then(res => res.json())
      .then(data => {
        setTemplates(data.templates || []);
        setLoading(false);
      })
      .catch(() => {
        setTemplates([]);
        setLoading(false);
      });
  }, []);

  const toggleFavorite = (templateId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const newFavs = new Set(prev);
      if (newFavs.has(templateId)) {
        newFavs.delete(templateId);
      } else {
        newFavs.add(templateId);
      }
      return newFavs;
    });
  };

  const categories = ['all', 'performance', 'sla', 'customer', 'agent', 'custom'];

  const filteredTemplates = templates.filter(t =>
    activeCategory === 'all' || t.category === activeCategory
  );

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    // Favorites first
    if (favorites.has(a.id) && !favorites.has(b.id)) return -1;
    if (!favorites.has(a.id) && favorites.has(b.id)) return 1;
    // Then defaults
    if (a.isDefault && !b.isDefault) return -1;
    if (!a.isDefault && b.isDefault) return 1;
    return 0;
  });

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
        <span className="ml-2 text-gray-600">Loading templates...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Report Templates</h2>
        <p className="text-sm text-gray-500 mt-1">Choose a template or create a custom report</p>
      </div>

      {/* Category Filter */}
      <div className="px-6 py-4 border-b border-gray-200 flex gap-2 overflow-x-auto">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedTemplates.length === 0 ? (
          <div className="col-span-2 text-center py-8 text-gray-500">
            No templates found in this category
          </div>
        ) : (
          sortedTemplates.map(template => (
            <div
              key={template.id}
              onClick={() => onSelect(template)}
              className="p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-sm cursor-pointer transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${CATEGORY_COLORS[template.category]}`}>
                    {CATEGORY_ICONS[template.category]}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{template.description}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => toggleFavorite(template.id, e)}
                  className={`p-1 rounded ${favorites.has(template.id) ? 'text-yellow-500' : 'text-gray-300 hover:text-gray-400'}`}
                >
                  <Star className="w-5 h-5" fill={favorites.has(template.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
              <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <BarChart3 className="w-3 h-3" />
                  {template.metrics.length} metrics
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {template.chartType}
                </span>
                {template.isDefault && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">Default</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
