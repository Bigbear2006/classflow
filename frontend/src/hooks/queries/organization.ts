import { useQuery } from '@tanstack/react-query';
import {
  getCurrentOrganization,
  getCurrentOrganizationMember,
  getOrganizations,
  getOrganizationTeachers,
  getRoleCounts,
} from '../../api/organizations/requests.ts';
import type { GetOrganizationsParams } from '../../api/organizations/types.ts';

export const useOrganizations = (params: GetOrganizationsParams) => {
  return useQuery({
    initialData: [],
    queryKey: ['organizations', params],
    queryFn: () => getOrganizations(params),
  });
};

export const useCurrentOrganization = () => {
  return useQuery({
    queryKey: ['organization'],
    queryFn: getCurrentOrganization,
  });
};

export const useCurrentOrganizationMember = () => {
  return useQuery({
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

export const useRoleCounts = () => {
  return useQuery({
    initialData: [],
    queryKey: ['roleCounts'],
    queryFn: getRoleCounts,
  });
};
