import type { ModalAction } from '../../entities';
import { useCustomMutation } from '../useCustomMutation.ts';
import {
  addCurrentStudentToCourse,
  addTeacherToCourse,
  createCourse,
  deleteCourse,
  deleteTeacherFromCourse,
  updateCourse,
  updateCourseTeacher,
  updateCourseTeacherStudent,
} from '../../api/courses/requests.ts';
import type { CourseData } from '../../api/courses/types.ts';
import type { UseCourseProps } from '../queries/course.ts';

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

export const useAddTeacherToCourseMutation = ({ courseId }: UseCourseProps) => {
  return useCustomMutation({
    mutationFn: (teacherId: number) =>
      addTeacherToCourse({ course_id: courseId, teacher_id: teacherId }),
    invalidateQueryKeyOnSuccess: ['courses', courseId, 'teachers'],
    toastErrorMessage: 'Не удалось добавить учителя',
  });
};

export const useUpdateCourseTeacherMutation = () => {
  return useCustomMutation({
    mutationFn: updateCourseTeacher,
    invalidateQueryKeyOnSuccess: ['courses', 'individual'],
    toastErrorMessage: 'Не удалось сохранить',
  });
};

export const useDeleteTeacherFromCourseMutation = ({ courseId }: UseCourseProps) => {
  return useCustomMutation({
    mutationFn: (teacherId: number) =>
      deleteTeacherFromCourse({ course_id: courseId, teacher_id: teacherId }),
    invalidateQueryKeyOnSuccess: ['courses', courseId, 'teachers'],
    toastErrorMessage: 'Не удалось удалить учителя с курса',
  });
};

interface AddCurrentStudentToCourseMutationProps {
  closeModal: () => void;
}

export const useAddCurrentStudentToCourseMutation = ({
  closeModal,
}: AddCurrentStudentToCourseMutationProps) => {
  return useCustomMutation({
    mutationFn: addCurrentStudentToCourse,
    invalidateQueryKeyOnSuccess: ['courses'],
    toastErrorMessage: 'Не удалось записаться на курс',
    onSuccess: closeModal,
  });
};

export const useUpdateCourseTeacherStudentMutation = () => {
  return useCustomMutation({
    mutationFn: updateCourseTeacherStudent,
    invalidateQueryKeyOnSuccess: ['courses', 'individual'],
    toastErrorMessage: 'Не удалось сохранить',
  });
};

export const useDeleteCourseMutation = () => {
  return useCustomMutation({
    mutationFn: deleteCourse,
    invalidateQueryKeyOnSuccess: ['courses'],
    toastErrorMessage: ({ errorCode }) =>
      errorCode === 'CANNOT_DELETE_ENTITY'
        ? 'У курса еще есть учителя и/или ученики'
        : 'Не удалось удалить курс',
  });
};
