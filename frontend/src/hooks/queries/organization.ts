import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import {
  getCurrentOrganization,
  getCurrentOrganizationMember,
  getOrganizations,
  getOrganizationTeachers,
  getRoleCounts,
} from '../../api/organizations/requests.ts';
import type { GetOrganizationsParams } from '../../api/organizations/types.ts';
import { queryClient } from '../../loaders.ts';

export const useOrganizations = (params: GetOrganizationsParams) => {
  return useQuery({
    initialData: [],
    queryKey: ['organizations', params],
    queryFn: () => getOrganizations(params),
  });
};

export const useCurrentOrganizationOptions = {
  queryKey: ['organization'],
  queryFn: getCurrentOrganization,
};

export const useCurrentOrganization = () => {
  return useQuery({
    ...useCurrentOrganizationOptions,
    initialData: () => queryClient.getQueryData(useCurrentOrganizationOptions.queryKey),
    staleTime: 10 * 1000,
  });
};

export const useCurrentOrganizationMemberOptions = {
  queryKey: ['member'],
  queryFn: getCurrentOrganizationMember,
};

export const useCurrentOrganizationMember = () => {
  return useQuery({
    ...useCurrentOrganizationMemberOptions,
    initialData: () => queryClient.getQueryData(useCurrentOrganizationMemberOptions.queryKey),
    staleTime: 10 * 1000,
  });
};

export const useCurrentOrganizationTeachers = () => {
  return useQuery({
    initialData: [],
    queryKey: ['organization', 'teachers'],
    queryFn: getOrganizationTeachers,
  });
};

export const roleCountsOptions = {
  queryKey: ['roleCounts'],
  queryFn: getRoleCounts,
};

export const useRoleCounts = () => {
  return useSuspenseQuery({
    ...roleCountsOptions,
    initialData: () => queryClient.getQueryData(roleCountsOptions.queryKey),
  });
};
