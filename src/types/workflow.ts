export type WorkflowStatus = 'completed' | 'running' | 'failed' | 'pending' | 'scheduled';
export type TriggerType = 'manual' | 'scheduled' | 'event' | 'conditional';
export type StepStatus = 'success' | 'error' | 'info' | 'pending' | 'running';

export interface WorkflowStep {
  number: number;
  title: string;
  status: StepStatus;
  items: WorkflowStepItem[];
  duration?: string;
}

export interface WorkflowStepItem {
  text: string;
  email?: string;
  company?: string;
  manager?: string;
  status?: StepStatus;
  metadata?: Record<string, string | number | boolean>;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  workflowName: string;
  status: WorkflowStatus;
  triggerType: TriggerType;
  startTime: Date;
  endTime?: Date;
  duration?: string;
  steps: WorkflowStep[];
  summary?: string;
  integrations: string[];
  triggeredBy?: string;
}

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  category: 'lead-management' | 'support' | 'crm' | 'communication' | 'scheduling' | 'monitoring';
  triggerType: TriggerType;
  schedule?: string;
  enabled: boolean;
  lastRun?: Date;
  nextRun?: Date;
  totalRuns: number;
  successRate: number;
  integrations: string[];
  estimatedDuration: string;
}
