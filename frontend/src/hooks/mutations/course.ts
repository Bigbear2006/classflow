import type { ModalAction } from '../../types.ts';
import { useCustomMutation } from '../useCustomMutation.ts';
import { createCourse, updateCourse } from '../../api/courses/requests.ts';
import type { CourseData } from '../../api/courses/types.ts';

interface UseCourseMutationOptions {
  action: ModalAction;
  courseId?: number;
  closeModal: () => void;
}

export const useCourseMutation = ({ action, courseId, closeModal }: UseCourseMutationOptions) => {
  const updateCourseFn = (data: CourseData) => updateCourse(courseId!, data);
  return useCustomMutation({
    mutationFn: action === 'CREATE' ? createCourse : updateCourseFn,
    invalidateQueryKeyOnSuccess: ['courses'],
    onSuccess: closeModal,
    toastErrorMessage:
      action === 'CREATE' ? 'Не удалось создать курс' : 'Не удалось обновить курс',
  });
};
