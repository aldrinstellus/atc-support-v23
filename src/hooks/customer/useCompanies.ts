'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Company, CompanyTier, RiskLevel } from '@/types/mock';
import { useCustomerPersona } from '@/contexts/CustomerPersonaContext';

export interface CompanyQueryOptions {
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}

export interface CompanyQueryResult {
  companies: Company[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export function useCompanies(options: CompanyQueryOptions = {}) {
  const { selectedTier, selectedRisk } = useCustomerPersona();
  const [data, setData] = useState<CompanyQueryResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Build query string
  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    // Add persona filters
    if (selectedTier !== 'all') params.set('tier', selectedTier);
    if (selectedRisk !== 'all') params.set('risk', selectedRisk);

    // Add query options
    if (options.search) params.set('search', options.search);
    if (options.page) params.set('page', String(options.page));
    if (options.pageSize) params.set('pageSize', String(options.pageSize));
    if (options.sortBy) params.set('sortBy', options.sortBy);
    if (options.sortDir) params.set('sortDir', options.sortDir);

    return params.toString();
  }, [selectedTier, selectedRisk, options]);

  const fetchCompanies = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/mock/companies?${queryString}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch companies: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.success) {
        setData({
          companies: result.data,
          total: result.pagination.total,
          page: result.pagination.page,
          pageSize: result.pagination.pageSize,
          totalPages: result.pagination.totalPages,
        });
      } else {
        throw new Error(result.error || 'Failed to fetch companies');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching companies:', err);
    } finally {
      setIsLoading(false);
    }
  }, [queryString]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return {
    companies: data?.companies ?? [],
    total: data?.total ?? 0,
    page: data?.page ?? 1,
    pageSize: data?.pageSize ?? 20,
    totalPages: data?.totalPages ?? 0,
    isLoading,
    error,
    refresh: fetchCompanies,
  };
}

// Get a single company with relations
export function useCompanyDetails(companyId: string | null) {
  const [data, setData] = useState<{
    company: Company;
    contacts: any[];
    tickets: any[];
    assignedCsm: any;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!companyId) {
      setData(null);
      return;
    }

    const fetchCompany = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/mock/companies/${companyId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch company: ${response.statusText}`);
        }

        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error(result.error || 'Company not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching company:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompany();
  }, [companyId]);

  return { data, isLoading, error };
}

export default useCompanies;
