import { useCurrentOrganization, useCurrentOrganizationMember } from './queries/organization.ts';
import { useCurrentUser } from './queries/user.ts';

export const useCurrentInfo = () => {
  const { data: user } = useCurrentUser();
  const { data: member } = useCurrentOrganizationMember();
  const { data: organization } = useCurrentOrganization();

  return {
    user,
    member,
    organization,
  };
};
