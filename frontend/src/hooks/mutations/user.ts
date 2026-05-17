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
import type { NavigateFunction, SetURLSearchParams } from 'react-router';
import { useCustomMutation } from '../useCustomMutation.ts';
import { queryClient } from '../../loaders.ts';
import type { UseFormSetError } from 'react-hook-form';
import type { RegisterUserFields } from '../forms/register.ts';

interface UserMutationProps {
  navigate: NavigateFunction;
}

interface RegisterUserMutationProps {
  setSearchParams: SetURLSearchParams;
  setError: UseFormSetError<RegisterUserFields>;
}

export const useRegisterUserMutation = ({
  setSearchParams,
  setError,
}: RegisterUserMutationProps) => {
  return useCustomMutation({
    mutationFn: registerUser,
    onSuccess: data => setSearchParams(prev => ({ ...prev, verificationToken: data.token })),
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
      } else if (err.response?.status === 409) {
        toast.error('Пользователь с таким email уже существует');
        navigate('/register');
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
    onSuccess: () => queryClient.resetQueries().then(() => navigate('/orgs')),
    onError: () => setError('root', { message: 'Неверная почта или пароль' }),
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

export const useEditUserMutation = () => {
  return useCustomMutation({
    mutationFn: updateUser,
    toastErrorMessage: 'Не удалось сохранить изменения',
    onSuccess: data => {
      queryClient.setQueryData(['user'], data);
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
