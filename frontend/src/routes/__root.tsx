import { HeadContent, Scripts, Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { type QueryClient } from '@tanstack/react-query';
import { AppContextProvider } from '../context.tsx';
import { Toaster } from 'sonner';
import appCss from '../styles/index.css?url';
import type { AxiosInstance } from 'axios';
// import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
// import {TanStackRouterDevtools} from '@tanstack/react-router-devtools'

export interface RootRouteContext {
  axiosInstance: AxiosInstance;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { title: 'ClassFlow' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
  notFoundComponent: () => <h1>404 Not Found</h1>,
});

function RootComponent() {
  return (
    <RootDocument>
      <AppContextProvider>
        <Toaster position="top-center" richColors={true} />
        <Outlet />
      </AppContextProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
