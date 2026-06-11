import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../api/users/requests.ts';

export const useCurrentUserOptions = queryOptions({
  queryKey: ['user'],
  queryFn: getCurrentUser,
  staleTime: 10 * 1000,
});

export const useCurrentUser = () => {
  return useSuspenseQuery(useCurrentUserOptions);
};
