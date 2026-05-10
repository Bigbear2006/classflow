import { useQuery } from '@tanstack/react-query';
import {
  getCourseGroups,
  getCourses,
  getCourseTeachers,
  getCourseTeacherStudentsWithPayments,
  getIndividualCourses,
} from '../../api/courses/requests.ts';

export const useCourses = () => {
  return useQuery({
    initialData: [],
    queryKey: ['courses'],
    queryFn: getCourses,
  });
};

export const useIndividualCourses = () => {
  return useQuery({
    initialData: [],
    queryKey: ['courses', 'individual'],
    queryFn: getIndividualCourses,
  });
};

export interface UseCourseProps {
  courseId: number;
}

export const useCourseGroups = ({ courseId }: UseCourseProps) => {
  return useQuery({
    initialData: [],
    queryKey: ['courses', courseId, 'groups'],
    queryFn: () => getCourseGroups(courseId),
  });
};

export const useCourseTeachers = ({ courseId }: UseCourseProps) => {
  return useQuery({
    initialData: [],
    queryKey: ['courses', courseId, 'teachers'],
    queryFn: () => getCourseTeachers(courseId),
    enabled: !!courseId,
  });
};

export const useCourseTeacherStudentsWithPayments = () => {
  return useQuery({
    initialData: [],
    queryKey: ['courses', 'teachers', 'students', 'payments'],
    queryFn: getCourseTeacherStudentsWithPayments,
  });
};
