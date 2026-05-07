import { redirect } from 'react-router';
import { QueryClient } from '@tanstack/react-query';
import {
  roleCountsOptions,
  useCurrentOrganizationMemberOptions,
  useCurrentOrganizationOptions,
} from './hooks/queries/organization.ts';
import { organizationMembersOptions } from './hooks/queries/member.ts';
import { useCurrentUserOptions } from './hooks/queries/user.ts';

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnMount: true }, mutations: { retry: false } },
});

export const loadBaseContext = async () => {
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
  return async () => {
    await loadBaseContext();

    if (config?.requireUser && !queryClient.getQueryData(useCurrentUserOptions.queryKey)) {
      return redirect('/login');
    }
    if (
      config?.requireOrganization &&
      !queryClient.getQueryData(useCurrentOrganizationOptions.queryKey)
    ) {
      return redirect('/');
    }
    if (
      config?.requireMember &&
      !queryClient.getQueryData(useCurrentOrganizationMemberOptions.queryKey)
    ) {
      return redirect('/orgs');
    }
  };
};

export const organizationMembersLoader = async (): Promise<void> => {
  await queryClient.ensureQueryData(organizationMembersOptions({ query: '' }));
  await queryClient.ensureQueryData(roleCountsOptions);
};
