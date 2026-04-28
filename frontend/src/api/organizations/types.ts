import type { User, UserRole } from '../../types.ts';

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
