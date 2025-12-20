// Agent & Team Generator

import { faker } from '@faker-js/faker';
import type { Agent, Team, AgentRole, AgentStatus } from '@/types/mock';
import { AGENT_SKILLS, TEAM_FOCUS_AREAS } from '@/types/mock';
import { AVATAR_GRADIENTS } from '@/types/ticket';
import { generateId, CONSTRAINTS } from '../seed';

const avatarKeys = Object.keys(AVATAR_GRADIENTS);

export function generateTeams(count: number): Team[] {
  const teams: Team[] = [];

  for (let i = 0; i < count; i++) {
    const focusArea = TEAM_FOCUS_AREAS[i % TEAM_FOCUS_AREAS.length];
    teams.push({
      id: generateId('TEAM', i + 1, 2),
      name: `${focusArea} Team`,
      managerId: '', // Will be assigned after agents are generated
      focusArea,
      memberCount: 0, // Will be calculated
      description: `Handles ${focusArea.toLowerCase()} related tickets and requests`,
    });
  }

  return teams;
}

export function generateAgents(count: number, teams: Team[]): Agent[] {
  const agents: Agent[] = [];
  const roles: AgentRole[] = ['support', 'senior-support', 'team-lead', 'csm', 'manager'];

  // Generate managers first (one per team)
  for (let i = 0; i < teams.length; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const agent: Agent = {
      id: generateId('AGNT', i + 1, 3),
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      role: 'manager',
      teamId: teams[i].id,
      managerId: null,
      status: 'online',
      capacity: faker.number.int(CONSTRAINTS.agentCapacity.manager),
      currentWorkload: 0,
      skills: faker.helpers.arrayElements(AGENT_SKILLS as unknown as string[], { min: 3, max: 5 }),
      avatar: AVATAR_GRADIENTS[avatarKeys[i % avatarKeys.length]],
      initials: `${firstName[0]}${lastName[0]}`,
      performanceScore: faker.number.int({ min: 80, max: 100 }),
      avgResolutionTime: faker.number.float({ min: 2, max: 8, fractionDigits: 1 }),
      ticketsResolvedThisWeek: faker.number.int({ min: 10, max: 30 }),
      ticketsResolvedThisMonth: faker.number.int({ min: 40, max: 120 }),
      csat: faker.number.float({ min: 4.0, max: 5.0, fractionDigits: 1 }),
      createdAt: faker.date.past({ years: 2 }).toISOString(),
    };
    agents.push(agent);
    teams[i].managerId = agent.id;
  }

  // Generate remaining agents
  for (let i = teams.length; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const teamIndex = i % teams.length;
    const team = teams[teamIndex];

    // Determine role based on distribution
    let role: AgentRole;
    const roleRandom = Math.random();
    if (roleRandom < 0.5) {
      role = 'support';
    } else if (roleRandom < 0.75) {
      role = 'senior-support';
    } else if (roleRandom < 0.90) {
      role = 'team-lead';
    } else {
      role = 'csm';
    }

    const capacityRange = CONSTRAINTS.agentCapacity[role];
    const statuses: AgentStatus[] = ['online', 'online', 'online', 'away', 'offline'];

    const agent: Agent = {
      id: generateId('AGNT', i + 1, 3),
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      role,
      teamId: team.id,
      managerId: team.managerId,
      status: faker.helpers.arrayElement(statuses),
      capacity: faker.number.int(capacityRange),
      currentWorkload: 0, // Will be calculated based on assigned tickets
      skills: faker.helpers.arrayElements(AGENT_SKILLS as unknown as string[], { min: 2, max: 4 }),
      avatar: AVATAR_GRADIENTS[avatarKeys[i % avatarKeys.length]],
      initials: `${firstName[0]}${lastName[0]}`,
      performanceScore: faker.number.int(CONSTRAINTS.performanceScore),
      avgResolutionTime: faker.number.float({ min: 2, max: 24, fractionDigits: 1 }),
      ticketsResolvedThisWeek: faker.number.int({ min: 5, max: 40 }),
      ticketsResolvedThisMonth: faker.number.int({ min: 20, max: 150 }),
      csat: faker.number.float(CONSTRAINTS.csat),
      createdAt: faker.date.past({ years: 2 }).toISOString(),
    };

    agents.push(agent);
    team.memberCount++;
  }

  // Update team member counts
  teams.forEach(team => {
    team.memberCount = agents.filter(a => a.teamId === team.id).length;
  });

  return agents;
}
