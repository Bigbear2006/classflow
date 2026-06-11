import {createCsrfMiddleware, createMiddleware, createStart} from '@tanstack/react-start';
import { createAxiosInstance, setupInterceptor } from './api/base.ts';
import { requestContext } from './hooks/useAxios.ts';

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === 'serverFn',
})

export const contextMiddleware = createMiddleware({ type: 'request' }).server(
  async ({ request, context, next }) => {
    const url = new URL(request.url);
    const inst =
      (context as any).axiosInstance ||
      setupInterceptor(
        createAxiosInstance({
          baseURL: `${url.protocol}//${url.host.replace(':5173', ':8000')}/api/v1/`,
          cookie: request.headers.get('cookie') || undefined,
        }),
      );

    return await requestContext!.run({ axiosInstance: inst }, async () => {
      return next({ context: { axiosInstance: inst } });
    });
  },
);


export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware, contextMiddleware],
}));
