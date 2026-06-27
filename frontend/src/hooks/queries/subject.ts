import { useQuery } from '@tanstack/react-query';
import { getSubjects } from '../../api/subjects/requests.ts';

export const useSubjects = () => {
  return useQuery({
    placeholderData: [],
    queryKey: ['subjects'],
    queryFn: getSubjects,
  });
};
