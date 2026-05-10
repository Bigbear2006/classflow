import type { AttendanceStatus } from '../../entities';

export interface CreateAttendanceData {
  lesson_id: number;
  student_id: number;
  status: AttendanceStatus;
}
