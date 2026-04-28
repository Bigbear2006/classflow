import { useQuery } from '@tanstack/react-query';
import { getGroups, getGroupStudents } from '../../api/groups/requests.ts';

export const useGroups = () => {
  return useQuery({
    initialData: [],
    queryKey: ['groups'],
    queryFn: getGroups,
  });
};

interface UseGroupProps {
  groupId: number;
}

export const useGroupStudents = ({ groupId }: UseGroupProps) => {
  return useQuery({
    initialData: [],
    queryKey: ['groups', groupId, 'students'],
    queryFn: () => getGroupStudents(groupId),
  });
};
