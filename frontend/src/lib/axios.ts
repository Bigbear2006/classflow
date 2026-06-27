import type { AxiosRequestConfig } from 'axios';
import { environmentManager } from '@tanstack/react-query';

export function getClientBaseURL(): string {
  if (typeof window === 'undefined') {
    return '';
  }
  let port = window.location.port ? ':8000' : '';
  return `${window.location.protocol}//${window.location.hostname}${port}/api/v1/`;
}

export function getServerBaseURL(request: Request): string {
  const url = new URL(request.url);
  return `${url.protocol}//${url.host.replace(':5173', ':8000')}/api/v1/`;
}

export function addCookieToConfig(config: AxiosRequestConfig, cookie: string): AxiosRequestConfig {
  if (!environmentManager.isServer()) {
    return config;
  }
  return { ...config, headers: { ...config.headers, cookie } };
}
