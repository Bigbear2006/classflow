import { useQuery } from '@tanstack/react-query';
import {
  getCurrentOrganization,
  getCurrentOrganizationMember,
  getOrganizationTeachers,
} from '../../api/organizations/requests.ts';
import type { UserRole } from '../../types.ts';

export const useCurrentOrganization = () => {
  return useQuery({
    queryKey: ['organization'],
    queryFn: getCurrentOrganization,
  });
};

export const useCurrentOrganizationMember = () => {
  return useQuery({
    initialData: {
      id: 0,
      organizationId: 0,
      userId: 0,
      role: 'STUDENT' as UserRole,
      createdAt: new Date(),
    },
    queryKey: ['member'],
    queryFn: getCurrentOrganizationMember,
  });
};

export const useCurrentOrganizationTeachers = () => {
  return useQuery({
    initialData: [],
    queryKey: ['organization', 'teachers'],
    queryFn: getOrganizationTeachers,
  });
};
