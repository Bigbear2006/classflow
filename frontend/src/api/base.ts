import axios, { type AxiosError } from 'axios';

export const axiosInstance = axios.create({
  baseURL: `${window.location.protocol}//${window.location.hostname}:8000/api/v1/`,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  rsp => rsp,
  (error: AxiosError) => {
    if (!window.location.pathname.includes('/login') && error.response?.status === 401) {
      window.location.pathname = '/login';
    }
    return Promise.reject(error);
  },
);
