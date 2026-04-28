import { useQuery } from '@tanstack/react-query';
import { getSubjects } from '../../api/subjects/requests.ts';

export const useSubjects = () => {
  return useQuery({
    initialData: [],
    queryKey: ['subjects'],
    queryFn: getSubjects,
  });
};
