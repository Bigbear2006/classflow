import { useQuery } from '@tanstack/react-query';
import {
  getGroups,
  getGroupStudents,
  getGroupsWithPayments,
  getGroupsWithStudents,
} from '../../api/groups/requests.ts';

export const useGroups = () => {
  return useQuery({
    initialData: [],
    queryKey: ['groups'],
    queryFn: getGroups,
  });
};

export const useGroupsWithPayments = () => {
  return useQuery({
    initialData: [],
    queryKey: ['groups', 'payments'],
    queryFn: () => getGroupsWithPayments(),
  });
};

export const useGroupsWithStudents = () => {
  return useQuery({
    initialData: [],
    queryKey: ['groups', 'students'],
    queryFn: getGroupsWithStudents,
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
