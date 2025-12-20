'use client';

import { useState, useEffect } from 'react';
import { Database, TrendingUp, CheckCircle, XCircle, Clock, BarChart3, RefreshCw, Loader2 } from 'lucide-react';

interface TrainingStats {
  totalSamples: number;
  approvedSamples: number;
  rejectedSamples: number;
  pendingSamples: number;
  avgEditPercentage: number;
  topCategories: Array<{ name: string; count: number }>;
  weeklyTrend: Array<{ week: string; approved: number; rejected: number }>;
  lastUpdated: string;
}

const MOCK_STATS: TrainingStats = {
  totalSamples: 1847,
  approvedSamples: 1523,
  rejectedSamples: 187,
  pendingSamples: 137,
  avgEditPercentage: 42,
  topCategories: [
    { name: 'Password Reset', count: 312 },
    { name: 'Billing Issues', count: 287 },
    { name: 'Technical Support', count: 256 },
    { name: 'Account Access', count: 198 },
    { name: 'Feature Requests', count: 145 },
  ],
  weeklyTrend: [
    { week: 'Week 1', approved: 89, rejected: 12 },
    { week: 'Week 2', approved: 102, rejected: 15 },
    { week: 'Week 3', approved: 95, rejected: 8 },
    { week: 'Week 4', approved: 118, rejected: 11 },
  ],
  lastUpdated: new Date().toISOString(),
};

export default function TrainingDataStats() {
  const [stats, setStats] = useState<TrainingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadStats = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    setStats(MOCK_STATS);

    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
        <span className="ml-2 text-gray-600">Loading training statistics...</span>
      </div>
    );
  }

  if (!stats) return null;

  const approvalRate = ((stats.approvedSamples / (stats.approvedSamples + stats.rejectedSamples)) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Database className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Training Data Statistics</h2>
              <p className="text-sm text-gray-500">
                Last updated: {new Date(stats.lastUpdated).toLocaleString()}
              </p>
            </div>
          </div>
          <button
            onClick={() => loadStats(true)}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Database className="w-4 h-4" />
            <span className="text-sm">Total Samples</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalSamples.toLocaleString()}</p>
          <p className="text-sm text-green-600 mt-1">
            <TrendingUp className="w-3 h-3 inline mr-1" />
            +12% this month
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm">Approved</span>
          </div>
          <p className="text-3xl font-bold text-green-600">{stats.approvedSamples.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">{approvalRate}% approval rate</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <XCircle className="w-4 h-4 text-red-500" />
            <span className="text-sm">Rejected</span>
          </div>
          <p className="text-3xl font-bold text-red-600">{stats.rejectedSamples.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">Quality filtered</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Clock className="w-4 h-4 text-yellow-500" />
            <span className="text-sm">Pending Review</span>
          </div>
          <p className="text-3xl font-bold text-yellow-600">{stats.pendingSamples.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">Awaiting review</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Top Categories */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Top Categories
          </h3>
          <div className="space-y-3">
            {stats.topCategories.map((cat, index) => (
              <div key={cat.name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-700">{cat.name}</span>
                  <span className="font-medium">{cat.count}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                    style={{ width: `${(cat.count / stats.topCategories[0].count) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Weekly Review Trend
          </h3>
          <div className="h-48 flex items-end justify-around gap-4">
            {stats.weeklyTrend.map((week) => {
              const total = week.approved + week.rejected;
              const approvedHeight = (week.approved / 130) * 100;
              const rejectedHeight = (week.rejected / 130) * 100;
              return (
                <div key={week.week} className="flex flex-col items-center flex-1">
                  <div className="w-full flex flex-col items-center gap-1 h-40">
                    <div
                      className="w-8 bg-green-500 rounded-t"
                      style={{ height: `${approvedHeight}%` }}
                      title={`Approved: ${week.approved}`}
                    />
                    <div
                      className="w-8 bg-red-400 rounded-b"
                      style={{ height: `${rejectedHeight}%` }}
                      title={`Rejected: ${week.rejected}`}
                    />
                  </div>
                  <span className="text-xs text-gray-500 mt-2">{week.week}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded" />
              <span className="text-xs text-gray-600">Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded" />
              <span className="text-xs text-gray-600">Rejected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quality Score */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Average Edit Quality</h3>
        <div className="flex items-center gap-6">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="12" fill="none" />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#f97316"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${(stats.avgEditPercentage / 100) * 352} 352`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">{stats.avgEditPercentage}%</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-gray-600">
              On average, agents edit <strong>{stats.avgEditPercentage}%</strong> of AI-generated responses before sending.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Lower edit percentages indicate higher AI response quality. Target: &lt;35%
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                stats.avgEditPercentage <= 35 ? 'bg-green-100 text-green-700' :
                stats.avgEditPercentage <= 50 ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {stats.avgEditPercentage <= 35 ? 'Excellent' :
                 stats.avgEditPercentage <= 50 ? 'Good' : 'Needs Improvement'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
