import { useCurrentOrganization, useCurrentOrganizationMember } from './queries/organization.ts';
import { useCurrentUser } from './queries/user.ts';
import { isAxiosError } from 'axios';

export const useCurrentInfo = () => {
  const { data: user, isLoading: userIsLoading } = useCurrentUser();
  const { data: member, isLoading: memberIsLoading } = useCurrentOrganizationMember();
  const {
    data: organization,
    isLoading: orgIsLoading,
    error: orgError,
  } = useCurrentOrganization();

  return {
    user,
    member,
    organization,
    isLoading: userIsLoading || memberIsLoading || orgIsLoading,
    organizationNotResolved: isAxiosError(orgError)
      ? orgError.response?.data.code === 'ORGANIZATION_NOT_RESOLVED'
      : false,
  };
};
