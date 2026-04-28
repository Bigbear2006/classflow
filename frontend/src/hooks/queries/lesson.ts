import { useQuery } from '@tanstack/react-query';
import { getLessons } from '../../api/lessons/requests.ts';

export const useLessons = () => {
  return useQuery({
    initialData: [],
    queryKey: ['lessons'],
    queryFn: getLessons,
  });
};
