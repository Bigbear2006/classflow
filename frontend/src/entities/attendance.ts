export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'EXCUSED';

export interface Attendance {
  id: string;
  lessonId: string;
  studentId: string;
  status: AttendanceStatus;
  comment: string;
}
