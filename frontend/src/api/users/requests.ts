import { axiosInstance } from '../base.ts';
import type { User, VerificationData } from '../../entities';
import type {
  ChangeUserPasswordData,
  LoginUserData,
  LoginUserResponse,
  RegisterUserData,
  UpdateUserData,
} from './types.ts';

export const getCurrentUser = () => {
  return axiosInstance.get<User>('users/me/').then(rsp => rsp.data);
};

export const registerUser = (data: RegisterUserData) => {
  return axiosInstance.post<VerificationData>('users/', data).then(rsp => rsp.data);
};

export const verifyUser = (data: VerificationData) => {
  return axiosInstance.post<VerificationData>('users/verify-email/', data);
};
export const loginUser = (data: LoginUserData) => {
  return axiosInstance.post<LoginUserResponse>('users/login/', data);
};

export const updateUser = (data: UpdateUserData) => {
  return axiosInstance.patch('users/me/', data);
};

export const changeUserPassword = (data: ChangeUserPasswordData) => {
  return axiosInstance.post('users/change-password/', data);
};

export const logoutUser = () => {
  return axiosInstance.post('users/logout/');
};
