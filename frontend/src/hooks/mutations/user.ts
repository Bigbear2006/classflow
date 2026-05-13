import { logoutUser, verifyUser } from '../../api/users/requests.ts';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import type { NavigateFunction } from 'react-router';
import { useCustomMutation } from '../useCustomMutation.ts';
import { queryClient } from '../../loaders.ts';

interface UserMutationProps {
  navigate: NavigateFunction;
}

export const useVerifyUserMutation = ({ navigate }: UserMutationProps) => {
  return useCustomMutation({
    mutationFn: verifyUser,
    onSuccess: () => {
      navigate('/login');
      toast.success('Аккаунт верифицирован');
    },
    onError: err => {
      if (!isAxiosError(err)) {
        toast.error('Не удалось верифицировать аккаунт');
        return;
      }
      if (err.response?.status === 429) {
        toast.error('Слишком много попыток');
        navigate('/register');
      } else {
        toast.error('Неверный код');
      }
    },
  });
};

export const useLogoutUserMutation = ({ navigate }: UserMutationProps) => {
  return useCustomMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.resetQueries().then(() => navigate('/login', { replace: true }));
    },
  });
};
