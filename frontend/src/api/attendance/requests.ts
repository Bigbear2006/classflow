import type { CreateAttendanceData } from './types.ts';
import { axiosInstance } from '../base.ts';

export const bulkCreateAttendance = (data: CreateAttendanceData[]) => {
  return axiosInstance.post('/attendance/', data);
};
