import type { LessonDetail } from './lesson.ts';
import type { OrganizationMemberDetail } from './organization.ts';
import type { Group } from './group.ts';
import type { CourseDetail } from './course.ts';

export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'EXCUSED';

interface BaseAttendance {
  id: string;
  status: AttendanceStatus;

  comment: string;
}
export interface Attendance extends BaseAttendance {
  lessonId: string;
  studentId: string;
}

export interface AttendanceDetail extends BaseAttendance {
  lesson: LessonDetail;
  student: OrganizationMemberDetail;
}

export interface AttendanceStats {
  total: number;
  rate: number;
  present: number;
  absent: number;
  excused: number;
}

export interface WeekAttendanceStats {
  week: Date;
  present: number;
}

export interface CourseAttendanceStats {
  course: CourseDetail;
  group: Group | null;
  teacher: OrganizationMemberDetail | null;
  conductedLessons: number;
  presentLessons: number;
  rate: number;
}
