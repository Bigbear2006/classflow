import { useQuery } from '@tanstack/react-query';
import { getCourseGroups, getCourses, getCourseTeachers } from '../../api/courses/requests.ts';

export const useCourses = () => {
  return useQuery({
    initialData: [],
    queryKey: ['courses'],
    queryFn: getCourses,
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
  });
};
