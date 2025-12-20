import { NextRequest, NextResponse } from 'next/server';

export interface JiraSprint {
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

const MOCK_SPRINTS: JiraSprint[] = [
  {
    id: 'sprint-001',
    name: 'Sprint 24',
    projectKey: 'SUP',
    state: 'active',
    startDate: '2024-01-08T00:00:00Z',
    endDate: '2024-01-22T00:00:00Z',
    goal: 'Complete bulk actions feature and improve SLA monitoring',
    issues: { total: 18, done: 8, inProgress: 6, todo: 4 },
    velocity: 42,
  },
  {
    id: 'sprint-002',
    name: 'Sprint 23',
    projectKey: 'SUP',
    state: 'closed',
    startDate: '2023-12-25T00:00:00Z',
    endDate: '2024-01-08T00:00:00Z',
    goal: 'Manager dashboard and reporting features',
    issues: { total: 15, done: 15, inProgress: 0, todo: 0 },
    velocity: 38,
  },
  {
    id: 'sprint-003',
    name: 'AI Sprint 8',
    projectKey: 'AI',
    state: 'active',
    startDate: '2024-01-08T00:00:00Z',
    endDate: '2024-01-22T00:00:00Z',
    goal: 'Implement learning loop UI and response quality scoring',
    issues: { total: 12, done: 5, inProgress: 4, todo: 3 },
    velocity: 28,
  },
  {
    id: 'sprint-004',
    name: 'Sprint 25',
    projectKey: 'SUP',
    state: 'future',
    startDate: '2024-01-22T00:00:00Z',
    endDate: '2024-02-05T00:00:00Z',
    goal: 'Customer portal improvements and mobile responsiveness',
    issues: { total: 14, done: 0, inProgress: 0, todo: 14 },
    velocity: 0,
  },
  {
    id: 'sprint-005',
    name: 'INT Sprint 5',
    projectKey: 'INT',
    state: 'active',
    startDate: '2024-01-10T00:00:00Z',
    endDate: '2024-01-24T00:00:00Z',
    goal: 'Jira bidirectional sync and Slack notifications',
    issues: { total: 10, done: 3, inProgress: 5, todo: 2 },
    velocity: 22,
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const projectKey = searchParams.get('projectKey');
  const state = searchParams.get('state');

  let sprints = MOCK_SPRINTS;

  if (projectKey) {
    sprints = sprints.filter(s => s.projectKey === projectKey);
  }

  if (state) {
    sprints = sprints.filter(s => s.state === state);
  }

  return NextResponse.json({
    sprints,
    total: sprints.length,
  });
}
