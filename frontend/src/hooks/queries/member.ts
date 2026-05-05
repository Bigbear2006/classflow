import { useSuspenseQuery } from '@tanstack/react-query';
import { getOrganizationMembers } from '../../api/organizations/requests.ts';
import type { GetOrganizationMembersParams } from '../../api/organizations/types.ts';
import { queryClient } from '../../loaders.ts';

export const organizationMembersOptions = (params: GetOrganizationMembersParams) => ({
  queryKey: ['members', params],
  queryFn: () => getOrganizationMembers(params),
});

export const useOrganizationMembers = (params: GetOrganizationMembersParams) => {
  const options = organizationMembersOptions(params);
  return useSuspenseQuery({
    ...options,
    initialData: () => queryClient.getQueryData(options.queryKey),
  });
};
