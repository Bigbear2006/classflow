import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../api/users/requests.ts';
import { queryClient } from '../../loaders.ts';

export const useCurrentUserOptions = {
  queryKey: ['user'],
  queryFn: getCurrentUser,
};

export const useCurrentUser = () => {
  return useQuery({
    ...useCurrentUserOptions,
    initialData: () => queryClient.getQueryData(useCurrentUserOptions.queryKey),
    staleTime: 10 * 1000,
  });
};
