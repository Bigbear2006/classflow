import { useEffect, useState } from 'react';
import type { Organization, OrganizationMember, User } from '../types.ts';
import { getUser } from '../api/user.ts';
import {
  getCurrentOrganization,
  getOrganizationMember,
} from '../api/organization.ts';

export const useCurrentInfo = () => {
  const [user, setUser] = useState<User>({
    id: 0,
    fullname: '',
    email: '',
    phone: '',
    password: '',
    createdAt: '',
  });

  const [member, setMember] = useState<OrganizationMember>({
    id: 0,
    organizationId: 0,
    userId: 0,
    role: 'STUDENT',
    createdAt: new Date(),
  });

  const [org, setOrg] = useState<Organization | null>(null);

  useEffect(() => {
    getUser().then(setUser);
    getOrganizationMember().then(setMember);
    getCurrentOrganization().then(setOrg);
  }, []);

  return { user, member, org };
};
