import axios, { type AxiosError, type AxiosRequestConfig } from 'axios';
import { BASE_URL } from '../config.ts';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const navigateToLogin = () => {
  if (!window.location.pathname.includes('/login')) {
    window.location.pathname = '/login';
  }
};

interface FailedRequest {
  config: AxiosRequestConfig;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}

let isRefreshing = false;
let failedRequests: FailedRequest[] = [];

axiosInstance.interceptors.response.use(null, (err: AxiosError) => {
  const config = err.config;

  if (err.response?.status !== 401) {
    return Promise.reject(err);
  }

  if (isRefreshing) {
    return new Promise((resolve, reject) =>
      failedRequests.push({ config: err.config!, resolve, reject }),
    );
  }
  isRefreshing = true;

  if ((config as any)._retry) {
    return Promise.reject(err);
  }
  (config as any)._retry = true;

  return axiosInstance
    .post(`users/refresh-token/`)
    .then(() => {
      failedRequests.forEach(elem =>
        axiosInstance(elem.config).then(elem.resolve).catch(elem.reject),
      );
      failedRequests = [];
      return axiosInstance(err.config!);
    })
    .catch(err => {
      failedRequests.forEach(req => req.reject(err));
      failedRequests = [];
      navigateToLogin();
      return Promise.reject(err);
    })
    .finally(() => (isRefreshing = false));
});
