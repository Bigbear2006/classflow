import { axiosInstance } from './base.ts';
import type { User } from '../types.ts';

export interface RegisterUserData {
  fullname: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

interface LoginUserResponse {
  access_token: string;
}

export interface UpdateUserData {
  fullname: string;
  phone: string;
}

interface ChangeUserPasswordData {
  old_password: string;
  new_password: string;
}

export const registerUser = (data: RegisterUserData) => {
  return axiosInstance.post('users/', data);
};

export const loginUser = (data: LoginUserData) => {
  return axiosInstance.post<LoginUserResponse>('users/login/', data);
};

export const getUser = async () => {
  return axiosInstance.get<User>('users/me/').then(rsp => rsp.data);
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
