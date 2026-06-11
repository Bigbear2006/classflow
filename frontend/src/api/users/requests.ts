import { axiosInstance, handleError } from '../base.ts';
import type { User, VerificationToken } from '../../entities';
import type {
  ChangeUserPasswordData,
  LoginUserData,
  LoginUserResponse,
  RegisterUserData,
  UpdateUserData,
  VerifyUserData,
} from './types.ts';
import { useAxios } from '../../hooks/useAxios.ts';

export const getCurrentUser = () => {
  return useAxios()
    .get<User>('users/me/')
    .then(rsp => rsp.data)
    .catch(handleError);
};

export const registerUser = (data: RegisterUserData) => {
  return axiosInstance.post<VerificationToken>('users/', data).then(rsp => rsp.data);
};

export const verifyUser = (data: VerifyUserData) => {
  return axiosInstance.post<VerificationToken>('users/verify-email/', data);
};

export const resendCode = (data: VerificationToken) => {
  return axiosInstance.post('users/resend-code/', data);
};

export const loginUser = (data: LoginUserData) => {
  return axiosInstance.post<LoginUserResponse>('users/login/', data);
};

export const updateUser = (data: UpdateUserData) => {
  return axiosInstance.put<User>('users/me/', data).then(rsp => rsp.data);
};

export const changeUserPassword = (data: ChangeUserPasswordData) => {
  return axiosInstance.post('users/change-password/', data);
};

export const logoutUser = () => {
  return axiosInstance.post('users/logout/');
};
