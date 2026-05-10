import type { Cabinet, StudentStatus } from '../../entities';
import type { CourseDetailResponse } from '../courses/types.ts';
import type { OrganizationMemberDetailResponse } from '../organizations/types.ts';
import type { LessonResponse } from '../lessons/types.ts';
import type { PaymentResponse } from '../payments/types.ts';

export interface GroupData {
  name: string;
  course_id: number;
  max_users_count: number;
  default_cabinet_id?: number;
}

export interface UpdateStudentGroupData {
  student_id: number;
  group_id: number;
  status: StudentStatus;
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

export interface GroupDetailResponse extends BaseGroupResponse {
  course: CourseDetailResponse;
  default_cabinet?: Cabinet;
}

interface BaseStudentGroupResponse {
  id: number;
  status: StudentStatus;
  created_at: Date;
}

export interface StudentGroupDetailResponse extends BaseStudentGroupResponse {
  student: OrganizationMemberDetailResponse;
  group_id: number;
}

export interface StudentGroupWithPaymentsResponse extends BaseStudentGroupResponse {
  total_paid: number;
  student: OrganizationMemberDetailResponse;
  payments: PaymentResponse[];
}

export interface GroupWithPaymentsResponse extends GroupDetailResponse {
  total_paid: number;
  students: StudentGroupWithPaymentsResponse[];
  lessons: LessonResponse[];
}

export interface GroupWithStudentsResponse extends GroupDetailResponse {
  students: StudentGroupDetailResponse[];
}
