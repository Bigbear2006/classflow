import { useQuery } from '@tanstack/react-query';
import { getLessons } from '../../api/lessons/requests.ts';
import type { GetLessonsParams } from '../../api/lessons/types.ts';

export const useLessons = (params?: GetLessonsParams) => {
  return useQuery({
    initialData: [],
    queryKey: ['lessons', params],
    queryFn: () => getLessons(params),
  });
};
