'use client';

// import { useState } from 'react';
import { Mail, Database, Github, MessageSquare, Check, Sheet } from 'lucide-react';
import type { IntegrationTarget } from '@/types/feedback';

interface Integration {
  id: IntegrationTarget;
  label: string;
  icon: React.ReactNode;
  description: string;
  envKey: string;
}

const integrations: Integration[] = [
  {
    id: 'email',
    label: 'Email',
    icon: <Mail className="h-4 w-4" />,
    description: 'Send to team email',
    envKey: 'FEEDBACK_EMAIL_TO',
  },
  {
    id: 'supabase',
    label: 'Database',
    icon: <Database className="h-4 w-4" />,
    description: 'Store in Supabase',
    envKey: 'SUPABASE_URL',
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: <Github className="h-4 w-4" />,
    description: 'Create GitHub issue',
    envKey: 'GITHUB_TOKEN',
  },
  {
    id: 'slack',
    label: 'Slack',
    icon: <MessageSquare className="h-4 w-4" />,
    description: 'Post to Slack channel',
    envKey: 'SLACK_WEBHOOK_URL',
  },
  {
    id: 'sheets',
    label: 'Sheets',
    icon: <Sheet className="h-4 w-4" />,
    description: 'Track in Google Sheets',
    envKey: 'GOOGLE_SHEETS_ID',
  },
];

interface IntegrationSelectorProps {
  selectedTargets: IntegrationTarget[];
  onChange: (targets: IntegrationTarget[]) => void;
  configuredIntegrations?: IntegrationTarget[];
}

export function IntegrationSelector({
  selectedTargets,
  onChange,
  configuredIntegrations = ['email', 'supabase', 'github', 'slack', 'sheets'], // Default all enabled for demo
}: IntegrationSelectorProps) {
  const toggleIntegration = (id: IntegrationTarget) => {
    if (selectedTargets.includes(id)) {
      onChange(selectedTargets.filter((t) => t !== id));
    } else {
      onChange([...selectedTargets, id]);
    }
  };

  const availableIntegrations = integrations.filter((i) =>
    configuredIntegrations.includes(i.id)
  );

  return (
    <div className="space-y-2">
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        Send to
      </label>
      <div className="grid grid-cols-2 gap-2">
        {availableIntegrations.map((integration) => {
          const isSelected = selectedTargets.includes(integration.id);
          return (
            <button
              key={integration.id}
              type="button"
              onClick={() => toggleIntegration(integration.id)}
              className={`relative flex items-center gap-2 rounded-lg border p-3 text-left transition-all ${
                isSelected
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-background hover:border-muted-foreground'
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}
              >
                {integration.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground">{integration.label}</div>
                <div className="text-xs text-muted-foreground truncate">{integration.description}</div>
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <Check className="h-4 w-4 text-primary" />
                </div>
              )}
            </button>
          );
        })}
      </div>
      {selectedTargets.length === 0 && (
        <p className="text-xs text-amber-500">Select at least one destination</p>
      )}
    </div>
  );
}
