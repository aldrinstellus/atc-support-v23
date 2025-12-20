// GET /api/mock/contacts - List contacts

import { NextRequest, NextResponse } from 'next/server';
import { getMockDatabase } from '@/data/mock/database';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const db = getMockDatabase();

  let contacts = [...db.contacts];

  // Filter by company
  const companyId = searchParams.get('companyId');
  if (companyId) {
    contacts = contacts.filter(c => c.companyId === companyId);
  }

  // Filter by department
  const department = searchParams.get('department');
  if (department) {
    contacts = contacts.filter(c => c.department === department);
  }

  // Filter by primary contact
  const isPrimary = searchParams.get('isPrimary');
  if (isPrimary !== null) {
    contacts = contacts.filter(c => c.isPrimary === (isPrimary === 'true'));
  }

  // Search
  const search = searchParams.get('search');
  if (search) {
    const searchLower = search.toLowerCase();
    contacts = contacts.filter(c =>
      c.name.toLowerCase().includes(searchLower) ||
      c.email.toLowerCase().includes(searchLower) ||
      c.role.toLowerCase().includes(searchLower)
    );
  }

  // Pagination
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
  const pageSize = searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize')!) : 50;
  const total = contacts.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const paginatedContacts = contacts.slice(start, start + pageSize);

  return NextResponse.json({
    success: true,
    data: paginatedContacts,
    pagination: {
      page,
      pageSize,
      total,
      totalPages,
    },
  });
}
