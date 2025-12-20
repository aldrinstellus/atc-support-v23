'use client';

import { useState, useEffect } from 'react';
import { Target, Clock, CheckCircle, PlayCircle, Circle, Loader2 } from 'lucide-react';

interface JiraSprint {
  id: string;
  name: string;
  projectKey: string;
  state: 'active' | 'closed' | 'future';
  startDate: string;
  endDate: string;
  goal: string;
  issues: {
    total: number;
    done: number;
    inProgress: number;
    todo: number;
  };
  velocity: number;
}

interface JiraSprintBoardProps {
  projectKey: string;
}

const STATE_CONFIG = {
  active: { icon: PlayCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Active' },
  closed: { icon: CheckCircle, color: 'text-gray-500', bg: 'bg-gray-100', label: 'Completed' },
  future: { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Planned' },
};

export default function JiraSprintBoard({ projectKey }: JiraSprintBoardProps) {
  const [sprints, setSprints] = useState<JiraSprint[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'active' | 'closed' | 'future'>('active');

  useEffect(() => {
    if (!projectKey) return;

    setLoading(true);
    fetch(`/api/jira/sprints?projectKey=${projectKey}`)
      .then(res => res.json())
      .then(data => {
        setSprints(data.sprints || []);
        setLoading(false);
      })
      .catch(() => {
        setSprints([]);
        setLoading(false);
      });
  }, [projectKey]);

  const filteredSprints = sprints.filter(s => s.state === activeTab);

  const calculateProgress = (sprint: JiraSprint) => {
    if (sprint.issues.total === 0) return 0;
    return Math.round((sprint.issues.done / sprint.issues.total) * 100);
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading sprints...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Sprints - {projectKey}</h2>
          </div>
          <div className="flex gap-2">
            {(['active', 'closed', 'future'] as const).map(state => {
              const config = STATE_CONFIG[state];
              const count = sprints.filter(s => s.state === state).length;
              return (
                <button
                  key={state}
                  onClick={() => setActiveTab(state)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === state
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {config.label} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {filteredSprints.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No {activeTab} sprints found
          </div>
        ) : (
          filteredSprints.map(sprint => {
            const config = STATE_CONFIG[sprint.state];
            const progress = calculateProgress(sprint);
            const daysRemaining = getDaysRemaining(sprint.endDate);
            const Icon = config.icon;

            return (
              <div key={sprint.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${config.color}`} />
                      <h3 className="font-medium text-gray-900">{sprint.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${config.bg} ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{sprint.goal}</p>
                  </div>
                  {sprint.state === 'active' && (
                    <span className={`text-sm font-medium ${daysRemaining <= 3 ? 'text-red-600' : 'text-gray-600'}`}>
                      {daysRemaining > 0 ? `${daysRemaining} days left` : 'Ending today'}
                    </span>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>{progress}% complete</span>
                    <span>{sprint.issues.done}/{sprint.issues.total} issues</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Issue Breakdown */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-2 bg-gray-50 rounded">
                    <p className="text-lg font-bold text-gray-500">{sprint.issues.todo}</p>
                    <p className="text-xs text-gray-500">To Do</p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded">
                    <p className="text-lg font-bold text-blue-600">{sprint.issues.inProgress}</p>
                    <p className="text-xs text-gray-500">In Progress</p>
                  </div>
                  <div className="p-2 bg-green-50 rounded">
                    <p className="text-lg font-bold text-green-600">{sprint.issues.done}</p>
                    <p className="text-xs text-gray-500">Done</p>
                  </div>
                </div>

                {/* Dates */}
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()}
                  </span>
                  {sprint.velocity > 0 && (
                    <span className="font-medium">Velocity: {sprint.velocity} pts</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
