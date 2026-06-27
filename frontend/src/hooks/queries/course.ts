import {useQuery, useSuspenseQuery} from '@tanstack/react-query';
import {
  getCourseGroups,
  getCourses,
  getCourseTeachers,
  getCourseTeacherStudentsWithPayments,
  getIndividualCourses,
} from '../../api/courses/requests.ts';
import type { GetAllCoursesParams, GetCourseTeachersParams } from '../../api/courses/types.ts';

export const useCourses = (params?: GetAllCoursesParams) => {
  return useSuspenseQuery({
    queryKey: ['courses', params],
    queryFn: () => getCourses(params),
  });
};

export const useIndividualCourses = () => {
  return useQuery({
    placeholderData: [],
    queryKey: ['courses', 'individual'],
    queryFn: getIndividualCourses,
  });
};

export interface UseCourseProps {
  courseId: number;
}

export const useCourseGroups = ({ courseId }: UseCourseProps) => {
  return useQuery({
    placeholderData: [],
    queryKey: ['courses', courseId, 'groups'],
    queryFn: () => getCourseGroups(courseId),
  });
};

interface UseCourseTeachersProps extends UseCourseProps {
  params?: GetCourseTeachersParams;
}

export const useCourseTeachers = ({ courseId, params }: UseCourseTeachersProps) => {
  return useQuery({
    placeholderData: [],
    queryKey: ['courses', courseId, 'teachers', params],
    queryFn: () => getCourseTeachers(courseId, params),
    enabled: !!courseId,
  });
};

export const useCourseTeacherStudentsWithPayments = () => {
  return useQuery({
    placeholderData: [],
    queryKey: ['courses', 'teachers', 'students', 'payments'],
    queryFn: getCourseTeacherStudentsWithPayments,
  });
};
