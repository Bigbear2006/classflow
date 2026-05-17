import type { AttendanceStatus } from '../../entities';
import type { CourseResponse } from '../courses/types.ts';
import type { GroupResponse } from '../groups/types.ts';
import type { OrganizationMemberDetailResponse } from '../organizations/types.ts';

export interface CreateAttendanceData {
  lesson_id: number;
  student_id: number;
  status: AttendanceStatus;
}

export interface CourseAttendanceStatsResponse {
  course: CourseResponse;
  group: GroupResponse | null;
  teacher: OrganizationMemberDetailResponse | null;
  conducted_lessons: number;
  present_lessons: number;
  rate: number;
}
