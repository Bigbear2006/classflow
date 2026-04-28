import { useCustomMutation } from '../useCustomMutation.ts';
import { createLesson, deleteLesson, updateLesson } from '../../api/lessons/requests.ts';
import type { FormAction } from '../../types.ts';
import type { LessonData } from '../../api/lessons/types.ts';

interface UseLessonMutationOptions {
  action: FormAction;
  lessonId?: number;
  closeModal: () => void;
}

export const useLessonMutation = ({ action, lessonId, closeModal }: UseLessonMutationOptions) => {
  const updateLessonFn = (data: LessonData) => updateLesson(lessonId!, data);
  return useCustomMutation({
    mutationFn: action === 'CREATE' ? createLesson : updateLessonFn,
    invalidateQueryKeyOnSuccess: ['lessons'],
    onSuccess: closeModal,
    toastErrorMessage:
      action === 'CREATE' ? 'Не удалось создать урок' : 'Не удалось обновить урок',
  });
};

export const useDeleteLessonMutation = () => {
  return useCustomMutation({
    mutationFn: deleteLesson,
    invalidateQueryKeyOnSuccess: ['lessons'],
    toastErrorMessage: 'Не удалось удалить урок',
  });
};
