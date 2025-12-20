// Company Types - Customer Portal Mock Data

export type CompanyTier = 'enterprise' | 'smb' | 'startup';
export type RiskLevel = 'healthy' | 'at-risk' | 'churning';

export interface CompanyLocation {
  city: string;
  state: string;
  country: string;
}

export interface Company {
  id: string;                      // COMP-0001
  name: string;
  tier: CompanyTier;
  industry: string;
  size: number;                    // employee count
  location: CompanyLocation;
  healthScore: number;             // 0-100
  riskLevel: RiskLevel;
  churnProbability: number;        // 0-1
  arr: number;                     // annual recurring revenue
  contractStartDate: string;       // ISO date
  contractRenewalDate: string;     // ISO date
  assignedCsmId: string;           // FK to Agent
  website: string;
  domain: string;
  logoSeed: string;                // for avatar generation
  createdAt: string;               // ISO date
  updatedAt: string;               // ISO date
}

export interface CompanyFilters {
  tier?: CompanyTier;
  risk?: RiskLevel;
  search?: string;
  industry?: string;
  minArr?: number;
  maxArr?: number;
}

export interface CompanyStats {
  total: number;
  byTier: Record<CompanyTier, number>;
  byRisk: Record<RiskLevel, number>;
  totalArr: number;
  avgHealthScore: number;
}

// Industry options for realistic data
export const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Education',
  'Professional Services',
  'Media & Entertainment',
  'Transportation',
  'Energy',
  'Real Estate',
  'Hospitality',
] as const;

export type Industry = typeof INDUSTRIES[number];
