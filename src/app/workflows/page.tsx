'use client';

import { useState } from 'react';
import {
  Workflow,
  Play,
  Pause,
  Settings,
  Clock,
  TrendingUp,
  Zap,
  AlertCircle,
  Activity,
  ArrowLeft,
} from 'lucide-react';
import { workflowDefinitions } from '@/lib/workflow-data';
import { WorkflowDefinition } from '@/types/workflow';
import Link from 'next/link';

export default function WorkflowsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Workflows' },
    { id: 'lead-management', label: 'Lead Management' },
    { id: 'support', label: 'Support' },
    { id: 'crm', label: 'CRM' },
    { id: 'communication', label: 'Communication' },
    { id: 'scheduling', label: 'Scheduling' },
    { id: 'monitoring', label: 'Monitoring' },
  ];

  const filteredWorkflows =
    selectedCategory === 'all'
      ? workflowDefinitions
      : workflowDefinitions.filter((w) => w.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-8 py-6">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Workflow Library</h1>
              <p className="mt-1 text-muted-foreground">
                Manage and configure your AI-powered automation workflows
              </p>
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground hover:opacity-90">
              <Play className="h-4 w-4" />
              Create New Workflow
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-8">
          <div className="flex gap-2 py-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Workflow Grid */}
      <div className="container mx-auto px-8 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWorkflows.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>

        {filteredWorkflows.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <Workflow className="h-16 w-16 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold text-foreground">No workflows found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try selecting a different category
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function WorkflowCard({ workflow }: { workflow: WorkflowDefinition }) {
  const categoryColors = {
    'lead-management': 'bg-chart-1/10 text-chart-1',
    support: 'bg-success/10 text-success',
    crm: 'bg-chart-3/10 text-chart-3',
    communication: 'bg-chart-5/10 text-chart-5',
    scheduling: 'bg-warning/10 text-warning',
    monitoring: 'bg-primary/10 text-primary',
  };

  const triggerIcons = {
    manual: Play,
    scheduled: Clock,
    event: Zap,
    conditional: AlertCircle,
  };

  const TriggerIcon = triggerIcons[workflow.triggerType];

  return (
    <div className="group card-hover flex flex-col rounded-lg border border-border bg-card p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-lg ${categoryColors[workflow.category]}`}
        >
          <Workflow className="h-6 w-6" />
        </div>
        <div className="flex items-center gap-2">
          {workflow.enabled ? (
            <div className="flex h-2 w-2 rounded-full bg-success" />
          ) : (
            <div className="flex h-2 w-2 rounded-full bg-muted-foreground" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 flex-1">
        <h3 className="text-lg font-semibold text-foreground">{workflow.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{workflow.description}</p>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Activity className="h-3 w-3" />
              Total Runs
            </div>
            <p className="mt-1 font-semibold text-foreground">{workflow.totalRuns}</p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              Success Rate
            </div>
            <p className="mt-1 font-semibold text-success">{workflow.successRate}%</p>
          </div>
        </div>

        {/* Trigger Info */}
        <div className="mt-4 flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1 rounded-full bg-muted px-2 py-1">
            <TriggerIcon className="h-3 w-3" />
            <span className="capitalize">{workflow.triggerType}</span>
          </div>
          {workflow.schedule && (
            <div className="rounded-full bg-muted px-2 py-1">{workflow.schedule}</div>
          )}
        </div>

        {/* Integrations */}
        <div className="mt-4 flex flex-wrap gap-1">
          {workflow.integrations.slice(0, 3).map((integration) => (
            <span
              key={integration}
              className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
            >
              {integration}
            </span>
          ))}
          {workflow.integrations.length > 3 && (
            <span className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
              +{workflow.integrations.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center gap-2">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
          <Play className="h-4 w-4" />
          Run Now
        </button>
        <button className="flex items-center justify-center rounded-lg border border-border p-2 hover:bg-muted">
          <Settings className="h-4 w-4 text-muted-foreground" />
        </button>
        <button className="flex items-center justify-center rounded-lg border border-border p-2 hover:bg-muted">
          {workflow.enabled ? (
            <Pause className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Play className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Last Run */}
      {workflow.lastRun && (
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          Last run: {formatRelativeTime(workflow.lastRun)}
        </div>
      )}
    </div>
  );
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}
