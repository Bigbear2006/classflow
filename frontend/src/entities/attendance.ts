import type { LessonDetail } from './lesson.ts';
import type { OrganizationMemberDetail } from './organization.ts';
import type { Group } from './group.ts';
import type { Course } from './course.ts';

export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'EXCUSED';

interface BaseAttendance {
  id: string;
  status: AttendanceStatus;
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
  present: number;
  absent: number;
  excused: number;
  total: number;
}

export interface WeekAttendanceStats {
  week: Date;
  present: number;
}

export interface CourseAttendanceStats {
  course: Course;
  group: Group | null;
  teacher: OrganizationMemberDetail | null;
  conductedLessons: number;
  presentLessons: number;
  rate: number;
}
