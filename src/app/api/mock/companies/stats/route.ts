// GET /api/mock/companies/stats - Get company statistics

import { NextResponse } from 'next/server';
import { getMockDatabase } from '@/data/mock/database';
import type { CompanyTier, RiskLevel } from '@/types/mock';

export async function GET() {
  const db = getMockDatabase();

  const tiers: CompanyTier[] = ['enterprise', 'smb', 'startup'];
  const risks: RiskLevel[] = ['healthy', 'at-risk', 'churning'];

  // Count by tier
  const byTier: Record<CompanyTier, number> = {} as any;
  for (const tier of tiers) {
    byTier[tier] = db.companies.filter(c => c.tier === tier).length;
  }

  // Count by risk
  const byRisk: Record<RiskLevel, number> = {} as any;
  for (const risk of risks) {
    byRisk[risk] = db.companies.filter(c => c.riskLevel === risk).length;
  }

  // Cross-tabulation: tier x risk
  const tierRiskMatrix: Record<CompanyTier, Record<RiskLevel, number>> = {} as any;
  for (const tier of tiers) {
    tierRiskMatrix[tier] = {} as any;
    for (const risk of risks) {
      tierRiskMatrix[tier][risk] = db.companies.filter(
        c => c.tier === tier && c.riskLevel === risk
      ).length;
    }
  }

  // ARR by tier
  const arrByTier: Record<CompanyTier, { total: number; average: number }> = {} as any;
  for (const tier of tiers) {
    const tierCompanies = db.companies.filter(c => c.tier === tier);
    const totalArr = tierCompanies.reduce((sum, c) => sum + c.arr, 0);
    arrByTier[tier] = {
      total: totalArr,
      average: tierCompanies.length > 0 ? Math.round(totalArr / tierCompanies.length) : 0,
    };
  }

  // Health score averages
  const healthByTier: Record<CompanyTier, number> = {} as any;
  for (const tier of tiers) {
    const tierCompanies = db.companies.filter(c => c.tier === tier);
    healthByTier[tier] = tierCompanies.length > 0
      ? Math.round(tierCompanies.reduce((sum, c) => sum + c.healthScore, 0) / tierCompanies.length)
      : 0;
  }

  // Renewals upcoming (next 90 days)
  const now = new Date();
  const ninetyDaysFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
  const upcomingRenewals = db.companies.filter(c => {
    const renewal = new Date(c.contractRenewalDate);
    return renewal >= now && renewal <= ninetyDaysFromNow;
  });

  return NextResponse.json({
    success: true,
    data: {
      total: db.companies.length,
      byTier,
      byRisk,
      tierRiskMatrix,
      arrByTier,
      healthByTier,
      upcomingRenewals: {
        count: upcomingRenewals.length,
        totalArr: upcomingRenewals.reduce((sum, c) => sum + c.arr, 0),
        atRisk: upcomingRenewals.filter(c => c.riskLevel !== 'healthy').length,
      },
    },
  });
}
