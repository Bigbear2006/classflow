import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { QueryClient } from '@tanstack/react-query';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
import { createAxiosInstance, setupInterceptor } from './api/base.ts';

export function getRouter() {
  const axiosInstance = setupInterceptor(createAxiosInstance());

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, refetchOnMount: false },
      mutations: { retry: false },
    },
  });

  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    context: { axiosInstance, queryClient },
  });
  setupRouterSsrQueryIntegration({ router, queryClient });
  return router;
}
