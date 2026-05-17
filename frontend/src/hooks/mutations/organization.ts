import { useCustomMutation } from '../useCustomMutation.ts';
import {
  createOrganization,
  joinOrganization,
  updateCurrentOrganization,
} from '../../api/organizations/requests.ts';
import type { FormAction } from '../../entities';

interface OrganizationMutationProps {
  action: FormAction;
  onSuccess: () => void;
}

export const useOrganizationMutation = ({ action, onSuccess }: OrganizationMutationProps) => {
  return useCustomMutation({
    mutationFn: action === 'CREATE' ? createOrganization : updateCurrentOrganization,
    invalidateQueryKeyOnSuccess: ['organizations', 'my'],
    toastErrorMessage:
      action === 'CREATE' ? 'Не удалось создать организацию' : 'Не удалось обновить организацию',
    onSuccess,
  });
};

export const useJoinOrganizationMutation = () => {
  return useCustomMutation({
    mutationFn: joinOrganization,
    invalidateQueryKeyOnSuccess: ['organizations', 'my'],
  });
};
