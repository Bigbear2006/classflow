import { createCsrfMiddleware, createMiddleware, createStart } from '@tanstack/react-start';
import { createAxiosInstance, setupInterceptor } from './api/base.ts';
import { requestContext } from './hooks/useAxios.ts';
import { getServerBaseURL } from './lib/axios.ts';

const csrfMiddleware = createCsrfMiddleware({
  filter: ctx => ctx.handlerType === 'serverFn',
});

export const contextMiddleware = createMiddleware({ type: 'request' }).server(
  async ({ request, context, next }) => {
    const inst =
      (context as any).axiosInstance ||
      setupInterceptor(
        createAxiosInstance({
          baseURL: getServerBaseURL(request),
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
