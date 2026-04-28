import type { User } from '../../types.ts';
import type { CabinetDetailResponse } from '../cabinets/types.ts';
import type { DetailGroupResponse } from '../groups/types.ts';
import type { CourseTeacherStudentDetailResponse } from '../courses/types.ts';

export interface LessonData {
  conducted_by_id: number;
  start_date: string;
  end_date: string;
  cabinet_id?: number;
  url?: string;
  group_id?: number;
  course_teacher_student_id?: number;
}

interface BaseLessonResponse {
  id: number;
  start_date: string;
  end_date: string;
  url?: string;
  created_at: string;
}

export interface LessonResponse extends BaseLessonResponse {
  conducted_by_id: number;
  cabinet_id?: number;
  group_id?: number;
  course_teacher_student_id?: number;
}

export interface LessonDetailResponse extends BaseLessonResponse {
  conducted_by: User;
  cabinet?: CabinetDetailResponse;
  group?: DetailGroupResponse;
  course_teacher_student?: CourseTeacherStudentDetailResponse;
}
