import { useQuery } from '@tanstack/react-query';
import {
  getAttendanceStats,
  getCoursesAttendanceStats,
  getMyAttendance,
} from '../../api/attendance/requests.ts';

export const useMyAttendance = () => {
  return useQuery({
    placeholderData: [],
    queryKey: ['attendance', 'my'],
    queryFn: getMyAttendance,
  });
};

export const useAttendanceStats = () => {
  return useQuery({
    placeholderData: {
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
    placeholderData: [],
    queryKey: ['attendance', 'stats', 'courses'],
    queryFn: getCoursesAttendanceStats,
  });
};
