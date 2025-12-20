'use client';

import { useState, useEffect } from 'react';
import { FolderKanban, Users, Calendar, ExternalLink, Loader2 } from 'lucide-react';

interface JiraProject {
  id: string;
  key: string;
  name: string;
  description: string;
  lead: { name: string; email: string };
  issueCount: number;
  sprintCount: number;
  lastUpdated: string;
}

interface JiraProjectListProps {
  onSelectProject: (projectKey: string) => void;
  selectedProjectKey?: string;
}

export default function JiraProjectList({ onSelectProject, selectedProjectKey }: JiraProjectListProps) {
  const [projects, setProjects] = useState<JiraProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/jira/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(() => {
        setProjects([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading projects...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <FolderKanban className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Jira Projects</h2>
            <p className="text-sm text-gray-500">Select a project to view sprints and issues</p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {projects.map(project => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project.key)}
            className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
              selectedProjectKey === project.key ? 'bg-blue-50 border-l-4 border-blue-500' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono font-medium">
                    {project.key}
                  </span>
                  <h3 className="font-medium text-gray-900">{project.name}</h3>
                </div>
                <p className="text-sm text-gray-500 mt-1 line-clamp-1">{project.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {project.lead.name}
                  </span>
                  <span>{project.issueCount} issues</span>
                  <span>{project.sprintCount} sprints</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
