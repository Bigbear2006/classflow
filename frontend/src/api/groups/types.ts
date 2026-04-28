import type { Cabinet, User } from '../../types.ts';
import type { CourseResponse } from '../courses/types.ts';

export interface GroupData {
  name: string;
  course_id: number;
  max_users_count: number;
  default_cabinet_id?: number;
}

interface BaseGroupResponse {
  id: number;
  name: string;
  max_users_count: number;
  created_at: string;
}

export interface GroupResponse extends BaseGroupResponse {
  course_id: number;
  default_cabinet_id?: number;
}

export interface DetailGroupResponse extends BaseGroupResponse {
  course: CourseResponse;
  default_cabinet?: Cabinet;
  students: User[];
}
