import { axiosInstance } from './base.ts';
import type {
  MyOrganization,
  Organization,
  OrganizationMemberDetail,
  OrganizationStats,
  RoleCount,
  User,
  UserRole,
} from '../types.ts';
import type { OrganizationMember } from '../types.ts';

export interface CreateOrganizationData {
  name: string;
  slug: string;
}

interface InviteOrganizationMemberData {
  email: string;
  role: string;
}

interface UpdateOrganizationMemberData {
  role: UserRole;
}

interface OrgResponse {
  id: number;
  name: string;
  slug: string;
  created_by_id: number;
  created_at: string;
}

interface MyOrgResponse extends OrgResponse {
  role: UserRole;
}

interface OrgMemberResponse {
  id: number;
  organization_id: number;
  user_id: number;
  role: UserRole;
  created_at: string;
}

interface OrgMemberDetailResponse {
  id: number;
  organization_id: number;
  user: User;
  role: UserRole;
  created_at: string;
}

const mapOrg = (data: OrgResponse): Organization => {
  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    createdById: data.created_by_id,
    createdAt: new Date(data.created_at),
  };
};

const mapMyOrg = (data: MyOrgResponse): MyOrganization => {
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

const mapOrgMember = (data: OrgMemberResponse): OrganizationMember => {
  return {
    id: data.id,
    organizationId: data.organization_id,
    userId: data.user_id,
    role: data.role,
    createdAt: new Date(data.created_at),
  };
};

const mapOrgMemberDetail = (
  data: OrgMemberDetailResponse,
): OrganizationMemberDetail => {
  return {
    id: data.id,
    organizationId: data.organization_id,
    user: data.user,
    role: data.role,
    createdAt: new Date(data.created_at),
  };
};

export const createOrganization = (data: CreateOrganizationData) => {
  return axiosInstance.post('organizations/', data);
};

export const joinOrganization = () => {
  return axiosInstance.post('organizations/current/members/');
};

export const getOrganizations = async () => {
  return axiosInstance
    .get<OrgResponse[]>('organizations/')
    .then(rsp => rsp.data.map(mapOrg));
};

export const getCurrentOrganization = async () => {
  return axiosInstance
    .get<OrgResponse>('organizations/current/')
    .then(rsp => mapOrg(rsp.data));
};

export const getMyOrganizations = async () => {
  return axiosInstance
    .get<MyOrgResponse[]>('organizations/my/')
    .then(rsp => rsp.data.map(mapMyOrg));
};

export const getOrganizationMember = async () => {
  return axiosInstance
    .get<OrgMemberResponse>('organizations/current/members/me/')
    .then(rsp => mapOrgMember(rsp.data));
};

export const getOrganizationMembers = async () => {
  return axiosInstance
    .get<OrgMemberDetailResponse[]>('organizations/current/members/')
    .then(rsp => rsp.data.map(mapOrgMemberDetail));
};

export const getRoleCounts = (): Promise<RoleCount[]> => {
  return Promise.resolve([
    { role: 'OWNER', count: 1 },
    { role: 'ADMIN', count: 2 },
    { role: 'TEACHER', count: 4 },
    { role: 'STUDENT', count: 10 },
  ]);
};

export const getOrganizationStats = (): Promise<OrganizationStats> => {
  return Promise.resolve({
    courses: 3,
    teachers: 4,
    students: 10,
    groups: 2,
    todayLessons: 3,
    totalIncome: 1000,
  });
};

export const inviteOrganizationMember = (
  data: InviteOrganizationMemberData,
) => {
  return Promise.resolve(() => console.log(data));
};

export const updateOrganizationMember = (
  user_id: number,
  data: UpdateOrganizationMemberData,
) => {
  return Promise.resolve(() => console.log(user_id, data));
};

export const deleteOrganizationMember = (user_id: number) => {
  return Promise.resolve(() => console.log(user_id));
};
