import { useQuery } from '@tanstack/react-query';
import {
  getAttendanceStats,
  getCoursesAttendanceStats,
  getMyAttendance,
} from '../../api/attendance/requests.ts';

export const useMyAttendance = () => {
  return useQuery({
    initialData: [],
    queryKey: ['attendance', 'my'],
    queryFn: getMyAttendance,
  });
};

export const useAttendanceStats = () => {
  return useQuery({
    initialData: {
      present: 0,
      absent: 0,
      excused: 0,
      total: 0,
    },
    queryKey: ['attendance', 'stats'],
    queryFn: getAttendanceStats,
  });
};

export const useCoursesAttendanceStats = () => {
  return useQuery({
    initialData: [],
    queryKey: ['attendance', 'stats', 'courses'],
    queryFn: getCoursesAttendanceStats,
  });
};
