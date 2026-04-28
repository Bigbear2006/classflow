import { axiosInstance } from '../base.ts';
import type { OrganizationStats, RoleCount } from '../../types.ts';
import type {
  CreateOrganizationData,
  GetOrganizationMembersParams,
  InviteOrganizationMemberData,
  MyOrgResponse,
  OrgMemberDetailResponse,
  OrgMemberResponse,
  OrgResponse,
  UpdateOrganizationMemberData,
} from './types.ts';
import { mapMyOrg, mapOrg, mapOrgMember, mapOrgMemberDetail } from './mappers.ts';

export const getOrganizations = async () => {
  return axiosInstance.get<OrgResponse[]>('organizations/').then(rsp => rsp.data.map(mapOrg));
};

export const getCurrentOrganization = async () => {
  return axiosInstance.get<OrgResponse>('organizations/current/').then(rsp => mapOrg(rsp.data));
};

export const getMyOrganizations = async () => {
  return axiosInstance
    .get<MyOrgResponse[]>('organizations/my/')
    .then(rsp => rsp.data.map(mapMyOrg));
};

export const getCurrentOrganizationMember = async () => {
  return axiosInstance
    .get<OrgMemberResponse>('organizations/current/members/me/')
    .then(rsp => mapOrgMember(rsp.data));
};

export const getOrganizationMembers = async (params?: GetOrganizationMembersParams) => {
  return axiosInstance
    .get<OrgMemberDetailResponse[]>('organizations/current/members/', { params: params })
    .then(rsp => rsp.data.map(mapOrgMemberDetail));
};

export const getOrganizationTeachers = async () => {
  return getOrganizationMembers({ roles: ['TEACHER'] });
};

export const getRoleCounts = (): Promise<RoleCount[]> => {
  // TODO: add
  return Promise.resolve([
    { role: 'OWNER', count: 1 },
    { role: 'ADMIN', count: 2 },
    { role: 'TEACHER', count: 4 },
    { role: 'STUDENT', count: 10 },
  ]);
};

export const getOrganizationStats = (): Promise<OrganizationStats> => {
  // TODO: add
  return Promise.resolve({
    courses: 3,
    teachers: 4,
    students: 10,
    groups: 2,
    todayLessons: 3,
    totalIncome: 1000,
  });
};

export const createOrganization = (data: CreateOrganizationData) => {
  return axiosInstance.post('organizations/', data);
};

export const joinOrganization = () => {
  return axiosInstance.post('organizations/current/members/');
};

export const inviteOrganizationMember = (data: InviteOrganizationMemberData) => {
  return Promise.resolve(() => console.log(data));
};

export const updateOrganizationMember = (user_id: number, data: UpdateOrganizationMemberData) => {
  return Promise.resolve(() => console.log(user_id, data));
};

export const deleteOrganizationMember = (user_id: number) => {
  return Promise.resolve(() => console.log(user_id));
};
