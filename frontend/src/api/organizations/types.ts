import type { RoleCount, User, UserRole } from '../../entities';

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

export interface OrgResponse {
  id: number;
  name: string;
  slug: string;
  created_by_id: number;
  created_at: string;
}

export interface MyOrgResponse extends OrgResponse {
  role: UserRole;
}

export interface OrgMemberResponse {
  id: number;
  organization_id: number;
  user_id: number;
  role: UserRole;
  created_at: string;
}

export interface OrgMemberDetailResponse {
  id: number;
  organization_id: number;
  user: User;
  role: UserRole;
  created_at: string;
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
