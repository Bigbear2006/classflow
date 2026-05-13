import { verifyUser } from '../../api/users/requests.ts';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import type { NavigateFunction } from 'react-router';
import { useCustomMutation } from '../useCustomMutation.ts';

interface VerifyUserMutationProps {
  navigate: NavigateFunction;
}

export const useVerifyUserMutation = ({ navigate }: VerifyUserMutationProps) => {
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
