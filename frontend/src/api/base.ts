import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  isAxiosError,
} from 'axios';
import { BASE_URL } from '../config.ts';
import { createServerFn } from '@tanstack/react-start';
import { getRequest, setResponseHeader } from '@tanstack/react-start/server';
import { addCookieToConfig, getServerBaseURL } from '../lib/axios.ts';

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
  const refreshURL = `${getServerBaseURL(request)}users/refresh-token/`;
  const headers = { cookie: request.headers.get('cookie') };

  return axios
    .post(refreshURL, {}, { headers })
    .then(rsp => {
      const setCookie = rsp.headers['set-cookie'];
      if (!setCookie || setCookie.length === 0) {
        return;
      }
      setResponseHeader('Set-Cookie', setCookie[0]);
      return setCookie[0];
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
      .then(access => {
        if (!access) {
          throw new AxiosError('Failed to refresh token');
        }
        failedRequests.forEach(elem =>
          instance(addCookieToConfig(config!, access)).then(elem.resolve).catch(elem.reject),
        );
        failedRequests = [];
        return instance(addCookieToConfig(config!, access));
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
