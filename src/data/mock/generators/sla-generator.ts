// SLA Configuration Generator

import type { SLAConfig, CompanyTier, TicketPriority } from '@/types/mock';
import { SLA_TARGETS } from '@/types/mock';

export function generateSLAConfigs(): SLAConfig[] {
  const configs: SLAConfig[] = [];
  const tiers: CompanyTier[] = ['enterprise', 'smb', 'startup'];
  const priorities: TicketPriority[] = ['critical', 'high', 'medium', 'low'];

  for (const tier of tiers) {
    for (const priority of priorities) {
      const targets = SLA_TARGETS[tier][priority];

      configs.push({
        id: `SLA-${tier.toUpperCase()}-${priority.toUpperCase()}`,
        tier,
        priority,
        firstResponseTarget: targets.firstResponse,
        resolutionTarget: targets.resolution,
        businessHoursOnly: tier !== 'enterprise' || priority !== 'critical',
        escalationMinutes: Math.round(targets.firstResponse * 0.8),
        notifyOnWarning: true,
        warningThresholdPercent: 80,
      });
    }
  }

  return configs;
}
