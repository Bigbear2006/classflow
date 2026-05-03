import { axiosInstance } from '../base.ts';
import type { OrganizationStats, RoleCount } from '../../entities';
import type {
  CreateOrganizationData,
  GetOrganizationMembersParams,
  GetOrganizationsParams,
  InviteOrganizationMemberData,
  MyOrgResponse,
  OrganizationStatsResponse,
  OrgMemberDetailResponse,
  OrgMemberResponse,
  OrgResponse,
  RoleCountResponse,
  UpdateOrganizationMemberData,
} from './types.ts';
import {
  mapMyOrg,
  mapOrg,
  mapOrganizationStats,
  mapOrgMember,
  mapOrgMemberDetail,
} from './mappers.ts';

export const getOrganizations = async (params: GetOrganizationsParams) => {
  return axiosInstance
    .get<OrgResponse[]>('organizations/', { params: params })
    .then(rsp => rsp.data.map(mapOrg));
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
    .get<OrgMemberDetailResponse[]>('organizations/current/members/', { params })
    .then(rsp => rsp.data.map(mapOrgMemberDetail));
};

export const getOrganizationTeachers = async () => {
  return getOrganizationMembers({ roles: ['TEACHER'] });
};

export const getRoleCounts = (): Promise<RoleCount[]> => {
  return axiosInstance
    .get<RoleCountResponse[]>('organizations/current/roles/')
    .then(rsp => rsp.data);
};

export const getOrganizationStats = (): Promise<OrganizationStats> => {
  return axiosInstance
    .get<OrganizationStatsResponse>('organizations/current/stats/')
    .then(rsp => mapOrganizationStats(rsp.data));
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
  return axiosInstance.patch(`organizations/current/members/${user_id}/`, data);
};
