import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  isAxiosError,
} from 'axios';
import { BASE_URL } from '../config.ts';
import { createServerFn } from '@tanstack/react-start';
import { getRequest, getResponseHeaders, setResponseHeaders } from '@tanstack/react-start/server';

export const axiosInstance = setupInterceptor(createAxiosInstance());

export function handleError(err: any) {
  if (isAxiosError(err)) {
    return null;
  }
  throw err;
}

interface FailedRequest {
  config: AxiosRequestConfig;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}

export function createAxiosInstance(props?: { baseURL?: string; cookie?: string }) {
  return axios.create({
    baseURL: props?.baseURL || BASE_URL,
    withCredentials: true,
    paramsSerializer: {
      indexes: null,
    },
    headers: props?.cookie ? { cookie: props.cookie } : undefined,
  });
}

export const refreshTokenFn = createServerFn({ method: 'POST' }).handler(async () => {
  const request = getRequest();
  const url = new URL(request.url);

  const refreshURL = `${url.protocol}//${url.host.replace(':5173', ':8000')}/api/v1/users/refresh-token/`;
  const headers = { cookie: request.headers.get('cookie') };

  axios
    .post(refreshURL, {}, { headers })
    .then(rsp => {
      const headers = getResponseHeaders()
      rsp.headers['set-cookie']?.forEach(cookie => headers.set('set-cookie', cookie));
      setResponseHeaders(headers)
    })
    .catch(handleError);
});

export function setupInterceptor(instance: AxiosInstance) {
  let isRefreshing = false;
  let failedRequests: FailedRequest[] = [];

  instance.interceptors.response.use(null, async (err: AxiosError) => {
    const config = err.config;

    if (
      err.response?.status !== 401 ||
      err.config?.url?.endsWith('login/') ||
      err.config?.url?.endsWith('refresh-token/')
    ) {
      return Promise.reject(err);
    }

    if ((config as any)._retry) {
      return Promise.reject(err);
    }
    (config as any)._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) =>
        failedRequests.push({ config: err.config!, resolve, reject }),
      );
    }
    isRefreshing = true;

    return refreshTokenFn()
      .then(() => {
        failedRequests.forEach(elem =>
          instance(elem.config).then(elem.resolve).catch(elem.reject),
        );
        failedRequests = [];
        return instance(err.config!);
      })
      .catch(err => {
        failedRequests.forEach(req => req.reject(err));
        failedRequests = [];
        return Promise.reject(err);
      })
      .finally(() => (isRefreshing = false));
  });

  return instance;
}
