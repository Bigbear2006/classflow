import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../api/users/requests.ts';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });
};
