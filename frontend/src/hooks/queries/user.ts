import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../api/users/requests.ts';

export const useCurrentUser = () => {
  return useQuery({
    initialData: {
      id: 0,
      fullname: '',
      email: '',
      phone: '',
      password: '',
      createdAt: '',
    },
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });
};
