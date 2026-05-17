import type { AttendanceStatus } from '../../entities';
import type { CourseResponse } from '../courses/types.ts';
import type { GroupResponse } from '../groups/types.ts';
import type { OrganizationMemberDetailResponse } from '../organizations/types.ts';
import type { LessonDetailResponse } from '../lessons/types.ts';

export interface CreateAttendanceData {
  student_id: number;
  status: AttendanceStatus;
}

export interface BulkCreateAttendanceData {
  lesson_id: number;
  attendance_list: CreateAttendanceData[];
}

export interface CourseAttendanceStatsResponse {
  course: CourseResponse;
  group: GroupResponse | null;
  teacher: OrganizationMemberDetailResponse | null;
  conducted_lessons: number;
  present_lessons: number;
  rate: number;
}

interface BaseAttendanceResponse {
  id: string;
  status: AttendanceStatus;
}

export interface AttendanceResponse extends BaseAttendanceResponse {
  lessonId: string;
  studentId: string;
}

export interface AttendanceDetailResponse extends BaseAttendanceResponse {
  lesson: LessonDetailResponse;
  student: OrganizationMemberDetailResponse;
}
