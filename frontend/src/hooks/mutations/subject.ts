import { createSubject, deleteSubject, updateSubject } from '../../api/subjects/requests.ts';
import type { SubjectData } from '../../api/subjects/types.ts';
import { useCustomMutation } from '../useCustomMutation.ts';
import type { ModalAction } from '../../types.ts';

interface UseSubjectMutationOptions {
  action: ModalAction;
  subjectId?: number;
  closeModal: () => void;
}

export const useSubjectMutation = ({
  action,
  subjectId,
  closeModal,
}: UseSubjectMutationOptions) => {
  const updateSubjectFn = (data: SubjectData) => updateSubject(subjectId!, data);
  return useCustomMutation({
    mutationFn: action == 'CREATE' ? createSubject : updateSubjectFn,
    invalidateQueryKeyOnSuccess: ['subjects'],
    onSuccess: closeModal,
    toastErrorMessage:
      action == 'CREATE' ? 'Не удалось создать предмет' : 'Не удалось обновить предмет',
  });
};

export const useDeleteSubjectMutation = () => {
  return useCustomMutation({
    mutationFn: deleteSubject,
    invalidateQueryKeyOnSuccess: ['subjects'],
    toastErrorMessage: 'Не удалось удалить предмет',
  });
};
