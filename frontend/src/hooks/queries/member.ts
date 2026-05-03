import { useQuery } from '@tanstack/react-query';
import { getOrganizationMembers } from '../../api/organizations/requests.ts';
import type { GetOrganizationMembersParams } from '../../api/organizations/types.ts';

export const useOrganizationMembers = (params: GetOrganizationMembersParams) => {
  return useQuery({
    initialData: [],
    queryKey: ['members', params],
    queryFn: () => getOrganizationMembers(params),
  });
};
