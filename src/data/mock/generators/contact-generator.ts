// Contact Generator

import { faker } from '@faker-js/faker';
import type { Contact, Company } from '@/types/mock';
import { DEPARTMENTS, JOB_TITLES } from '@/types/mock';
import { AVATAR_GRADIENTS } from '@/types/ticket';
import { generateId, CONSTRAINTS } from '../seed';

const avatarKeys = Object.keys(AVATAR_GRADIENTS);

export function generateContacts(companies: Company[]): Contact[] {
  const contacts: Contact[] = [];
  let contactIndex = 0;

  for (const company of companies) {
    // Determine number of contacts based on tier
    const contactRange = CONSTRAINTS.contactsPerCompany[company.tier];
    const numContacts = faker.number.int(contactRange);

    for (let i = 0; i < numContacts; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const department = faker.helpers.arrayElement(DEPARTMENTS as unknown as string[]);
      const jobTitles = JOB_TITLES[department] || ['Employee'];
      const role = faker.helpers.arrayElement(jobTitles);

      contacts.push({
        id: generateId('CONT', ++contactIndex, 5),
        companyId: company.id,
        name: `${firstName} ${lastName}`,
        firstName,
        lastName,
        email: faker.internet.email({
          firstName,
          lastName,
          provider: company.domain,
        }).toLowerCase(),
        phone: faker.phone.number(),
        role,
        department,
        isPrimary: i === 0, // First contact is primary
        avatar: AVATAR_GRADIENTS[avatarKeys[contactIndex % avatarKeys.length]],
        lastContactedAt: faker.date.recent({ days: 60 }).toISOString(),
        createdAt: faker.date.past({ years: 2 }).toISOString(),
      });
    }
  }

  return contacts;
}
