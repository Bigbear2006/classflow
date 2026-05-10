import { useCustomMutation } from '../useCustomMutation.ts';
import {
  addCurrentStudentToGroup,
  createGroup,
  deleteGroup,
  updateGroup,
  updateStudentGroup,
} from '../../api/groups/requests.ts';
import type { ModalAction } from '../../entities';
import type { GroupData } from '../../api/groups/types.ts';

interface UseGroupMutationOptions {
  action: ModalAction;
  groupId?: number;
  closeModal: () => void;
}

export const useGroupMutation = ({ action, groupId, closeModal }: UseGroupMutationOptions) => {
  const updateGroupFn = (data: GroupData) => updateGroup(groupId!, data);
  return useCustomMutation({
    mutationFn: action === 'CREATE' ? createGroup : updateGroupFn,
    invalidateQueryKeyOnSuccess: ['groups'],
    onSuccess: closeModal,
    toastErrorMessage:
      action === 'CREATE' ? 'Не удалось создать группу' : 'Не удалось обновить группу',
  });
};

export const useDeleteGroupMutation = () => {
  return useCustomMutation({
    mutationFn: deleteGroup,
    invalidateQueryKeyOnSuccess: ['groups'],
    toastErrorMessage: 'Не удалось удалить группу',
  });
};

export const useAddCurrentStudentToGroupMutation = () => {
  return useCustomMutation({
    mutationFn: addCurrentStudentToGroup,
    toastErrorMessage: 'Не удалось записаться на курс',
  });
};

export const useUpdateStudentGroupMutation = () => {
  return useCustomMutation({
    mutationFn: updateStudentGroup,
    invalidateQueryKeyOnSuccess: ['groups', 'students'],
    toastErrorMessage: 'Не удалось сохранить',
  });
};
