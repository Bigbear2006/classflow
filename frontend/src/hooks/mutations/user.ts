import {
  changeUserPassword,
  loginUser,
  logoutUser,
  registerUser,
  resendCode,
  updateUser,
  verifyUser,
} from '../../api/users/requests.ts';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import { useCustomMutation } from '../useCustomMutation.ts';
import type { UseFormSetError } from 'react-hook-form';
import type { RegisterUserFields } from '../forms/register.ts';
import type { UseNavigateResult } from '@tanstack/react-router';

interface UserMutationProps {
  navigate: UseNavigateResult<string>;
}

interface RegisterUserMutationProps extends UserMutationProps {
  setError: UseFormSetError<RegisterUserFields>;
}

export const useRegisterUserMutation = ({ navigate, setError }: RegisterUserMutationProps) => {
  return useCustomMutation({
    mutationFn: registerUser,
    onSuccess: data =>
      navigate({
        to: '.',
        search: prev => ({ ...prev, verificationToken: data.token }),
        replace: true,
      }),
    onError: err => {
      if (isAxiosError(err) && err.response?.status === 409) {
        setError('email', { message: 'Почта уже используется' });
      } else {
        toast.error('Не удалось зарегистрироваться');
      }
    },
  });
};

export const useVerifyUserMutation = ({ navigate }: UserMutationProps) => {
  return useCustomMutation({
    mutationFn: verifyUser,
    onSuccess: () => {
      navigate({ to: '/login' }).then(() => toast.success('Аккаунт верифицирован'));
    },
    onError: async err => {
      if (!isAxiosError(err)) {
        toast.error('Не удалось верифицировать аккаунт');
        return;
      }
      if (err.response?.status === 429) {
        toast.error('Слишком много попыток');
        await navigate({ to: '/register' });
      } else if (err.response?.status === 409) {
        toast.error('Пользователь с таким email уже существует');
        await navigate({ to: '/register' });
      } else {
        toast.error('Неверный код');
      }
    },
  });
};

export const useResendCodeMutation = () => {
  return useCustomMutation({
    mutationFn: resendCode,
    toastErrorMessage: 'Не удалось отправить код. Попробуйте еще раз через минуту',
    onSuccess: () => toast.success('Код отправлен'),
  });
};

interface LoginUserMutationProps extends UserMutationProps {
  setError: UseFormSetError<RegisterUserFields>;
}

export const useLoginUserMutation = ({ navigate, setError }: LoginUserMutationProps) => {
  return useCustomMutation({
    mutationFn: loginUser,
    onSuccess: (_d, _v, _r, { client }) =>
      client.resetQueries().then(() => navigate({ to: '/orgs' })),
    onError: () => setError('root', { message: 'Неверная почта или пароль' }),
  });
};

export const useLogoutUserMutation = ({ navigate }: UserMutationProps) => {
  return useCustomMutation({
    mutationFn: logoutUser,
    onSuccess: (_d, _v, _r, { client }) => {
      client.resetQueries().then(() => navigate({ to: '/login', replace: true }));
    },
  });
};

export const useEditUserMutation = () => {
  return useCustomMutation({
    mutationFn: updateUser,
    toastErrorMessage: 'Не удалось сохранить изменения',
    onSuccess: (data, _v, _r, { client }) => {
      client.setQueryData(['user'], data);
      toast.success('Данные сохранены');
    },
  });
};

export const useChangePasswordMutation = () => {
  return useCustomMutation({
    mutationFn: changeUserPassword,
    onSuccess: () => toast.success('Пароль изменен'),
    toastErrorMessage: 'Не удалось изменить пароль',
  });
};
