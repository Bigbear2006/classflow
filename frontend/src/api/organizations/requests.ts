import { axiosInstance } from '../base.ts';
import type { OrganizationStats, RoleCount } from '../../entities';
import type {
  CreateOrganizationData,
  GetOrganizationMembersParams,
  GetOrganizationsParams,
  InviteOrganizationMemberData,
  MyOrganizationResponse,
  OrganizationStatsResponse,
  OrganizationMemberDetailResponse,
  OrganizationMemberResponse,
  OrganizationResponse,
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

export const getOrganizations = (params: GetOrganizationsParams) => {
  return axiosInstance
    .get<OrganizationResponse[]>('organizations/', { params: params })
    .then(rsp => rsp.data.map(mapOrg));
};

export const getCurrentOrganization = () => {
  return axiosInstance
    .get<OrganizationResponse>('organizations/current/')
    .then(rsp => mapOrg(rsp.data));
};

export const updateCurrentOrganization = (data: CreateOrganizationData) => {
  return axiosInstance.patch<OrganizationResponse>('organizations/current/', data);
};

export const getMyOrganizations = () => {
  return axiosInstance
    .get<MyOrganizationResponse[]>('organizations/my/')
    .then(rsp => rsp.data.map(mapMyOrg));
};

export const getCurrentOrganizationMember = () => {
  return axiosInstance
    .get<OrganizationMemberResponse>('organizations/current/members/me/')
    .then(rsp => mapOrgMember(rsp.data));
};

export const getOrganizationMembers = (params?: GetOrganizationMembersParams) => {
  return axiosInstance
    .get<OrganizationMemberDetailResponse[]>('organizations/current/members/', { params })
    .then(rsp => rsp.data.map(mapOrgMemberDetail));
};

export const getOrganizationTeachers = () => {
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
