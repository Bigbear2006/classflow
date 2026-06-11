import { redirect } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import {
  useCurrentOrganizationMemberOptions,
  useCurrentOrganizationOptions,
} from './hooks/queries/organization.ts';
import { useCurrentUserOptions } from './hooks/queries/user.ts';
import type { RootRouteContext } from './routes/__root.tsx';

export const loadBaseContext = async (queryClient: QueryClient) => {
  await queryClient.ensureQueryData(useCurrentUserOptions).catch(() => undefined);
  await queryClient.ensureQueryData(useCurrentOrganizationOptions).catch(() => undefined);
  await queryClient.ensureQueryData(useCurrentOrganizationMemberOptions).catch(() => undefined);
};

type LoaderConfig = {
  requireUser?: boolean;
  requireOrganization?: boolean;
  requireMember?: boolean;
};

export const createLoader = (config?: LoaderConfig) => {
  return async ({ context: { queryClient } }: { context: RootRouteContext }) => {
    await loadBaseContext(queryClient);

    if (config?.requireUser && !queryClient.getQueryData(useCurrentUserOptions.queryKey)) {
      return redirect({ to: '/login' });
    }
    if (
      config?.requireOrganization &&
      !queryClient.getQueryData(useCurrentOrganizationOptions.queryKey)
    ) {
      return redirect({ to: '/' });
    }
    if (
      config?.requireMember &&
      !queryClient.getQueryData(useCurrentOrganizationMemberOptions.queryKey)
    ) {
      return redirect({ to: '/orgs' });
    }
  };
};

// export const organizationMembersLoader = async (): Promise<void> => {
//   await globalQueryClient.ensureQueryData(organizationMembersOptions({ query: '' }));
//   await globalQueryClient.ensureQueryData(roleCountsOptions);
// };
