import { useQuery } from '@tanstack/react-query';
import { getLessons, getLessonStudents } from '../../api/lessons/requests.ts';
import type { GetLessonsParams } from '../../api/lessons/types.ts';

export const useLessons = (params?: GetLessonsParams) => {
  return useQuery({
    placeholderData: [],
    queryKey: ['lessons', params],
    queryFn: () => getLessons(params),
  });
};

interface UseLessonProps {
  lessonId?: number;
}

export const useLessonStudents = ({ lessonId }: UseLessonProps) => {
  return useQuery({
    placeholderData: [],
    queryKey: ['lessons', lessonId, 'students'],
    queryFn: () => getLessonStudents(lessonId!),
    enabled: !!lessonId,
  });
};
