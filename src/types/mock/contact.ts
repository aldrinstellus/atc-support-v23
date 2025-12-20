// Contact Types - Customer Portal Mock Data

import type { AvatarGradient } from '../ticket';

export interface Contact {
  id: string;                      // CONT-00001
  companyId: string;               // FK to Company
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;                    // Job title
  department: string;
  isPrimary: boolean;
  avatar: AvatarGradient;
  lastContactedAt: string;         // ISO date
  createdAt: string;               // ISO date
}

export interface ContactFilters {
  companyId?: string;
  search?: string;
  isPrimary?: boolean;
  department?: string;
}

// Common departments for realistic data
export const DEPARTMENTS = [
  'Engineering',
  'IT',
  'Operations',
  'Finance',
  'HR',
  'Sales',
  'Marketing',
  'Customer Success',
  'Product',
  'Legal',
] as const;

// Common job titles by department
export const JOB_TITLES: Record<string, string[]> = {
  Engineering: ['Software Engineer', 'Senior Developer', 'Tech Lead', 'Engineering Manager', 'CTO'],
  IT: ['IT Administrator', 'System Administrator', 'IT Manager', 'Help Desk Specialist', 'CIO'],
  Operations: ['Operations Manager', 'COO', 'Business Analyst', 'Project Coordinator'],
  Finance: ['CFO', 'Financial Analyst', 'Controller', 'Accountant'],
  HR: ['HR Manager', 'Recruiter', 'People Operations', 'CHRO'],
  Sales: ['Sales Rep', 'Account Executive', 'Sales Manager', 'VP Sales'],
  Marketing: ['Marketing Manager', 'CMO', 'Content Manager', 'Growth Lead'],
  'Customer Success': ['Customer Success Manager', 'Support Lead', 'Implementation Specialist'],
  Product: ['Product Manager', 'Product Owner', 'UX Designer', 'CPO'],
  Legal: ['General Counsel', 'Legal Advisor', 'Compliance Officer'],
};

export type Department = typeof DEPARTMENTS[number];
