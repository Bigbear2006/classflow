import { keepPreviousData, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import {
  getCurrentOrganization,
  getCurrentOrganizationMember,
  getMyOrganizations,
  getOrganizations,
  getOrganizationStats,
  getOrganizationTeachers,
  getRoleCounts,
  getStudentStats,
  getTeacherStats,
} from '../../api/organizations/requests.ts';
import type { GetOrganizationsParams } from '../../api/organizations/types.ts';
import { queryClient } from '../../loaders.ts';

export const useOrganizations = (params: GetOrganizationsParams) => {
  return useQuery({
    initialData: [],
    queryKey: ['organizations', params],
    queryFn: () => getOrganizations(params),
    placeholderData: keepPreviousData,
  });
};

export const useMyOrganizations = () => {
  return useQuery({
    initialData: [],
    queryKey: ['organizations', 'my'],
    queryFn: getMyOrganizations,
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

export const useOrganizationStats = () => {
  return useQuery({
    initialData: {
      courses: 0,
      teachers: 0,
      students: 0,
      groups: 0,
      todayLessons: 0,
      totalIncome: 0,
    },
    queryKey: ['organization', 'stats'],
    queryFn: getOrganizationStats,
  });
};
export const useStudentStats = () => {
  return useQuery({
    initialData: {
      courses: 0,
      completedLessons: 0,
      todayLessons: 0,
      totalPaid: 0,
    },
    queryKey: ['student', 'stats'],
    queryFn: getStudentStats,
  });
};

export const useTeacherStats = () => {
  return useQuery({
    initialData: {
      courses: 0,
      students: 0,
      todayLessons: 0,
      completedLessons: 0,
    },
    queryKey: ['teacher', 'stats'],
    queryFn: getTeacherStats,
  });
};
