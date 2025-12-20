// Company Generator

import { faker } from '@faker-js/faker';
import type { Company, CompanyTier, RiskLevel, Agent } from '@/types/mock';
import { INDUSTRIES } from '@/types/mock';
import { generateId, DISTRIBUTIONS, CONSTRAINTS, weightedRandom } from '../seed';

export function generateCompanies(count: number, agents: Agent[]): Company[] {
  const companies: Company[] = [];

  // Get CSM agents for assignment
  const csmAgents = agents.filter(a => a.role === 'csm' || a.role === 'manager');

  // Calculate tier counts based on distribution
  const tierCounts: Record<CompanyTier, number> = {
    enterprise: Math.round(count * DISTRIBUTIONS.companyTier.enterprise),
    smb: Math.round(count * DISTRIBUTIONS.companyTier.smb),
    startup: 0,
  };
  tierCounts.startup = count - tierCounts.enterprise - tierCounts.smb;

  let index = 0;

  // Generate companies for each tier
  for (const [tier, tierCount] of Object.entries(tierCounts) as [CompanyTier, number][]) {
    for (let i = 0; i < tierCount; i++) {
      // Determine risk level based on tier distribution
      const riskWeights = DISTRIBUTIONS.riskByTier[tier];
      const riskLevel = weightedRandom(riskWeights);

      // Get constraint ranges
      const arrRange = CONSTRAINTS.arrRanges[tier];
      const empRange = CONSTRAINTS.employeeRanges[tier];
      const healthRange = CONSTRAINTS.healthScoreRanges[riskLevel];
      const churnRange = CONSTRAINTS.churnProbabilityRanges[riskLevel];

      // Generate company data
      const companyName = faker.company.name();
      const domain = faker.helpers.slugify(companyName).toLowerCase() + '.com';

      companies.push({
        id: generateId('COMP', ++index, 4),
        name: companyName,
        tier,
        industry: faker.helpers.arrayElement(INDUSTRIES as unknown as string[]),
        size: faker.number.int(empRange),
        location: {
          city: faker.location.city(),
          state: faker.location.state({ abbreviated: true }),
          country: 'US',
        },
        healthScore: faker.number.int(healthRange),
        riskLevel,
        churnProbability: faker.number.float({ ...churnRange, fractionDigits: 2 }),
        arr: faker.number.int(arrRange),
        contractStartDate: faker.date.past({ years: 3 }).toISOString(),
        contractRenewalDate: faker.date.future({ years: 1 }).toISOString(),
        assignedCsmId: faker.helpers.arrayElement(csmAgents).id,
        website: `https://${domain}`,
        domain,
        logoSeed: faker.string.alphanumeric(8),
        createdAt: faker.date.past({ years: 3 }).toISOString(),
        updatedAt: faker.date.recent({ days: 30 }).toISOString(),
      });
    }
  }

  return companies;
}
