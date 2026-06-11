import { axiosInstance } from '../api/base.ts';
import type { AxiosInstance } from 'axios';

export let requestContext:
  | import('async_hooks').AsyncLocalStorage<{
      axiosInstance: AxiosInstance;
    }>
  | null = null;

if (typeof window === 'undefined') {
  const { AsyncLocalStorage } = await import('node:async_hooks');
  requestContext = new AsyncLocalStorage();
}

export function useAxios(): AxiosInstance {
  const store = requestContext?.getStore();
  if (store) {
    return store.axiosInstance;
  }
  return axiosInstance;
}
