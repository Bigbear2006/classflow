import { useCustomMutation } from '../useCustomMutation.ts';
import { updateOrganizationMember } from '../../api/organizations/requests.ts';
import type { UpdateOrganizationMemberData } from '../../api/organizations/types.ts';

interface UseUpdateOrganizationMemberMutationOptions {
  userId: number;
  closeModal: () => void;
}

export const useUpdateOrganizationMemberMutation = ({
  userId,
  closeModal,
}: UseUpdateOrganizationMemberMutationOptions) => {
  return useCustomMutation({
    mutationFn: (data: UpdateOrganizationMemberData) => updateOrganizationMember(userId, data),
    toastErrorMessage: 'Не удалось отредактировать участника',
    onSuccess: (_d, _v, _r, { client }) => {
      Promise.all([
        client.invalidateQueries({ queryKey: ['members'] }),
        client.invalidateQueries({ queryKey: ['roleCounts'] }),
      ]).then(closeModal);
    },
  });
};
