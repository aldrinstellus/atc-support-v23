import { NextResponse } from 'next/server';

export interface JiraProject {
  id: string;
  key: string;
  name: string;
  description: string;
  lead: { name: string; email: string };
  issueCount: number;
  sprintCount: number;
  lastUpdated: string;
}

const MOCK_PROJECTS: JiraProject[] = [
  {
    id: 'proj-001',
    key: 'SUP',
    name: 'Support Platform',
    description: 'Main support ticketing platform development',
    lead: { name: 'Alex Thompson', email: 'alex.thompson@company.com' },
    issueCount: 234,
    sprintCount: 12,
    lastUpdated: '2024-01-15T10:30:00Z',
  },
  {
    id: 'proj-002',
    key: 'AI',
    name: 'AI Features',
    description: 'AI and ML feature development for support automation',
    lead: { name: 'Sarah Chen', email: 'sarah.chen@company.com' },
    issueCount: 89,
    sprintCount: 6,
    lastUpdated: '2024-01-14T15:45:00Z',
  },
  {
    id: 'proj-003',
    key: 'INT',
    name: 'Integrations',
    description: 'Third-party integrations and API development',
    lead: { name: 'Mike Johnson', email: 'mike.johnson@company.com' },
    issueCount: 156,
    sprintCount: 8,
    lastUpdated: '2024-01-13T09:20:00Z',
  },
  {
    id: 'proj-004',
    key: 'MOB',
    name: 'Mobile App',
    description: 'Mobile application for support agents',
    lead: { name: 'Emily Davis', email: 'emily.davis@company.com' },
    issueCount: 67,
    sprintCount: 4,
    lastUpdated: '2024-01-12T14:00:00Z',
  },
];

export async function GET() {
  return NextResponse.json({
    projects: MOCK_PROJECTS,
    total: MOCK_PROJECTS.length,
  });
}
