import { useCustomMutation } from '../useCustomMutation.ts';
import { createOrganization } from '../../api/organizations/requests.ts';

export const useOrganizationMutation = () => {
  return useCustomMutation({
    mutationFn: createOrganization,
    invalidateQueryKeyOnSuccess: ['organizations'],
    toastErrorMessage: 'Не удалось создать организацию',
  });
};
