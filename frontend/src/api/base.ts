import axios, { type AxiosError, type AxiosRequestConfig } from 'axios';
import { BASE_URL } from '../config.ts';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  paramsSerializer: {
    indexes: null,
  },
});

interface FailedRequest {
  config: AxiosRequestConfig;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}

let isRefreshing = false;
let failedRequests: FailedRequest[] = [];

axiosInstance.interceptors.response.use(null, (err: AxiosError) => {
  const config = err.config;

  if (
    err.response?.status !== 401 ||
    err.config?.url?.endsWith('login/') ||
    err.config?.url?.endsWith('refresh-token/')
  ) {
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
      return Promise.reject(err);
    })
    .finally(() => (isRefreshing = false));
});
