import { NextRequest, NextResponse } from 'next/server';

export interface JiraIssue {
  id: string;
  key: string;
  summary: string;
  description: string;
  type: 'bug' | 'story' | 'task' | 'epic';
  status: 'todo' | 'in_progress' | 'in_review' | 'done';
  priority: 'lowest' | 'low' | 'medium' | 'high' | 'highest';
  assignee: { name: string; avatar: string } | null;
  reporter: { name: string; avatar: string };
  sprintId: string;
  projectKey: string;
  storyPoints: number;
  linkedTicketId: string | null;
  createdAt: string;
  updatedAt: string;
}

const MOCK_ISSUES: JiraIssue[] = [
  {
    id: 'issue-001',
    key: 'SUP-234',
    summary: 'Implement bulk ticket reassignment',
    description: 'Allow managers to reassign multiple tickets at once',
    type: 'story',
    status: 'done',
    priority: 'high',
    assignee: { name: 'Sarah Chen', avatar: 'SC' },
    reporter: { name: 'Alex Thompson', avatar: 'AT' },
    sprintId: 'sprint-001',
    projectKey: 'SUP',
    storyPoints: 5,
    linkedTicketId: 'TICK-1234',
    createdAt: '2024-01-08T10:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z',
  },
  {
    id: 'issue-002',
    key: 'SUP-235',
    summary: 'Add SLA breach notifications',
    description: 'Send notifications when tickets are about to breach SLA',
    type: 'story',
    status: 'in_progress',
    priority: 'high',
    assignee: { name: 'Mike Johnson', avatar: 'MJ' },
    reporter: { name: 'Alex Thompson', avatar: 'AT' },
    sprintId: 'sprint-001',
    projectKey: 'SUP',
    storyPoints: 3,
    linkedTicketId: null,
    createdAt: '2024-01-09T11:00:00Z',
    updatedAt: '2024-01-14T16:45:00Z',
  },
  {
    id: 'issue-003',
    key: 'SUP-236',
    summary: 'Fix ticket search performance',
    description: 'Search is slow when filtering by multiple criteria',
    type: 'bug',
    status: 'in_review',
    priority: 'medium',
    assignee: { name: 'Emily Davis', avatar: 'ED' },
    reporter: { name: 'Customer Support', avatar: 'CS' },
    sprintId: 'sprint-001',
    projectKey: 'SUP',
    storyPoints: 2,
    linkedTicketId: 'TICK-1198',
    createdAt: '2024-01-10T09:30:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'issue-004',
    key: 'AI-89',
    summary: 'Implement response quality scoring',
    description: 'Add ML-based quality scoring for AI responses',
    type: 'story',
    status: 'in_progress',
    priority: 'high',
    assignee: { name: 'David Kim', avatar: 'DK' },
    reporter: { name: 'Sarah Chen', avatar: 'SC' },
    sprintId: 'sprint-003',
    projectKey: 'AI',
    storyPoints: 8,
    linkedTicketId: null,
    createdAt: '2024-01-08T14:00:00Z',
    updatedAt: '2024-01-14T11:20:00Z',
  },
  {
    id: 'issue-005',
    key: 'SUP-237',
    summary: 'Add export to CSV for reports',
    description: 'Allow users to export report data to CSV format',
    type: 'task',
    status: 'todo',
    priority: 'low',
    assignee: null,
    reporter: { name: 'Alex Thompson', avatar: 'AT' },
    sprintId: 'sprint-001',
    projectKey: 'SUP',
    storyPoints: 2,
    linkedTicketId: null,
    createdAt: '2024-01-12T15:00:00Z',
    updatedAt: '2024-01-12T15:00:00Z',
  },
  {
    id: 'issue-006',
    key: 'INT-156',
    summary: 'Jira webhook integration',
    description: 'Set up webhooks for bidirectional Jira sync',
    type: 'story',
    status: 'in_progress',
    priority: 'high',
    assignee: { name: 'Mike Johnson', avatar: 'MJ' },
    reporter: { name: 'Mike Johnson', avatar: 'MJ' },
    sprintId: 'sprint-005',
    projectKey: 'INT',
    storyPoints: 5,
    linkedTicketId: null,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const projectKey = searchParams.get('projectKey');
  const sprintId = searchParams.get('sprintId');
  const status = searchParams.get('status');
  const type = searchParams.get('type');

  let issues = MOCK_ISSUES;

  if (projectKey) {
    issues = issues.filter(i => i.projectKey === projectKey);
  }

  if (sprintId) {
    issues = issues.filter(i => i.sprintId === sprintId);
  }

  if (status) {
    issues = issues.filter(i => i.status === status);
  }

  if (type) {
    issues = issues.filter(i => i.type === type);
  }

  return NextResponse.json({
    issues,
    total: issues.length,
  });
}
