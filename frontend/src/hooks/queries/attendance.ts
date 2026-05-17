import { useQuery } from '@tanstack/react-query';
import { getCoursesAttendanceStats } from '../../api/attendance/requests.ts';

export const useCoursesAttendanceStats = () => {
  return useQuery({
    initialData: [],
    queryKey: ['attendance', 'stats', 'courses'],
    queryFn: getCoursesAttendanceStats,
  });
};
