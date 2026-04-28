import type {
  MyOrganization,
  Organization,
  OrganizationMember,
  OrganizationMemberDetail,
} from '../../types.ts';
import type {
  MyOrgResponse,
  OrgMemberDetailResponse,
  OrgMemberResponse,
  OrgResponse,
} from './types.ts';

export const mapOrg = (data: OrgResponse): Organization => {
  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    createdById: data.created_by_id,
    createdAt: new Date(data.created_at),
  };
};

export const mapMyOrg = (data: MyOrgResponse): MyOrganization => {
  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    createdById: data.created_by_id,
    createdAt: new Date(data.created_at),
    role: data.role,
    // TODO: add counts
    coursesCount: 0,
    membersCount: 0,
  };
};

export const mapOrgMember = (data: OrgMemberResponse): OrganizationMember => {
  return {
    id: data.id,
    organizationId: data.organization_id,
    userId: data.user_id,
    role: data.role,
    createdAt: new Date(data.created_at),
  };
};

export const mapOrgMemberDetail = (data: OrgMemberDetailResponse): OrganizationMemberDetail => {
  return {
    id: data.id,
    organizationId: data.organization_id,
    user: data.user,
    role: data.role,
    createdAt: new Date(data.created_at),
  };
};
