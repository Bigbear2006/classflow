import type { AttendanceStatus, RoleCount, User, UserRole } from '../../entities';

export interface GetOrganizationsParams {
  query?: string | null;
}

export interface GetOrganizationMembersParams {
  query?: string;
  roles?: UserRole[];
}

export interface CreateOrganizationData {
  name: string;
  slug: string;
}

export interface InviteOrganizationMemberData {
  email: string;
  role: string;
}

export interface UpdateOrganizationMemberData {
  role: UserRole;
}

export interface OrganizationResponse {
  id: number;
  name: string;
  slug: string;
  created_by_id: number;
  created_at: string;
}

export interface MyOrganizationResponse extends OrganizationResponse {
  role: UserRole;
}

export interface OrganizationMemberResponse {
  id: number;
  organization_id: number;
  user_id: number;
  role: UserRole;
  created_at: string;
}

export interface OrganizationMemberDetailResponse {
  id: number;
  organization_id: number;
  user: User;
  role: UserRole;
  created_at: string;
}

export interface OrganizationMemberWithAttendanceResponse extends OrganizationMemberDetailResponse {
  attendance_status: AttendanceStatus | null;
}

export interface RoleCountResponse extends RoleCount {}

export interface OrganizationStatsResponse {
  courses: number;
  teachers: number;
  students: number;
  groups: number;
  today_lessons: number;
  total_income: number;
}
