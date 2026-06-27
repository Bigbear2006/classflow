import { keepPreviousData, queryOptions, useQuery, useSuspenseQuery } from '@tanstack/react-query';
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

export const useOrganizations = (params: GetOrganizationsParams) => {
  return useQuery({
    placeholderData: (previousData) => keepPreviousData(previousData || []),
    queryKey: ['organizations', params],
    queryFn: () => getOrganizations(params),
  });
};

export const useMyOrganizations = () => {
  return useQuery({
    placeholderData: [],
    queryKey: ['organizations', 'my'],
    queryFn: getMyOrganizations,
  });
};

export const useCurrentOrganizationOptions = queryOptions({
  queryKey: ['organization'],
  queryFn: getCurrentOrganization,
  staleTime: 10 * 1000,
});

export const useCurrentOrganization = () => {
  return useSuspenseQuery(useCurrentOrganizationOptions);
};

export const useCurrentOrganizationMemberOptions = queryOptions({
  queryKey: ['member'],
  queryFn: getCurrentOrganizationMember,
  staleTime: 10 * 1000,
});

export const useCurrentOrganizationMember = () => {
  return useSuspenseQuery(useCurrentOrganizationMemberOptions);
};

export const useCurrentOrganizationTeachers = () => {
  return useQuery({
    placeholderData: [],
    queryKey: ['organization', 'teachers'],
    queryFn: getOrganizationTeachers,
  });
};

export const roleCountsOptions = queryOptions({
  queryKey: ['roleCounts'],
  queryFn: getRoleCounts,
});

export const useRoleCounts = () => {
  return useSuspenseQuery(roleCountsOptions);
};

export const useOrganizationStats = () => {
  return useQuery({
    placeholderData: {
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
    placeholderData: {
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
    placeholderData: {
      courses: 0,
      students: 0,
      todayLessons: 0,
      completedLessons: 0,
    },
    queryKey: ['teacher', 'stats'],
    queryFn: getTeacherStats,
  });
};
