import type {
  CourseAttendanceStatsResponse,
  BulkCreateAttendanceData,
  AttendanceDetailResponse,
} from './types.ts';
import { axiosInstance } from '../base.ts';
import type { AttendanceStats, CourseAttendanceStats } from '../../entities';
import { mapAttendanceDetail, mapCourseAttendanceStats } from './mappers.ts';

export const bulkCreateAttendance = (data: BulkCreateAttendanceData) => {
  return axiosInstance.post('/attendance/', data);
};

export const getMyAttendance = () => {
  return axiosInstance
    .get<AttendanceDetailResponse[]>('/attendance/my/')
    .then(rsp => rsp.data.map(mapAttendanceDetail));
};

export const getAttendanceStats = () => {
  return axiosInstance.get<AttendanceStats>('/attendance/stats/').then(rsp => rsp.data);
};

export const getCoursesAttendanceStats = (): Promise<CourseAttendanceStats[]> => {
  return axiosInstance
    .get<CourseAttendanceStatsResponse[]>('/attendance/stats/courses/')
    .then(rsp => rsp.data.map(mapCourseAttendanceStats));
};
