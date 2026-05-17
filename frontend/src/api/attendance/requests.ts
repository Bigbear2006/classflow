import type { CourseAttendanceStatsResponse, CreateAttendanceData } from './types.ts';
import { axiosInstance } from '../base.ts';
import type { CourseAttendanceStats } from '../../entities';
import { mapCourseAttendanceStats } from './mappers.ts';

export const bulkCreateAttendance = (data: CreateAttendanceData[]) => {
  return axiosInstance.post('/attendance/', data);
};

export const getCoursesAttendanceStats = (): Promise<CourseAttendanceStats[]> => {
  return axiosInstance
    .get<CourseAttendanceStatsResponse[]>('/attendance/stats/courses/')
    .then(rsp => rsp.data.map(mapCourseAttendanceStats));
};
