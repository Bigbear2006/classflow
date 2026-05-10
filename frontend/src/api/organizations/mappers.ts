import type {
  MyOrganization,
  Organization,
  OrganizationMember,
  OrganizationMemberDetail,
  OrganizationMemberWithAttendance,
  OrganizationStats,
} from '../../entities';
import type {
  MyOrganizationResponse,
  OrganizationStatsResponse,
  OrganizationMemberDetailResponse,
  OrganizationMemberResponse,
  OrganizationMemberWithAttendanceResponse,
  OrganizationResponse,
} from './types.ts';

export const mapOrg = (data: OrganizationResponse): Organization => {
  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    createdById: data.created_by_id,
    createdAt: new Date(data.created_at),
  };
};

export const mapMyOrg = (data: MyOrganizationResponse): MyOrganization => {
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

export const mapOrgMember = (data: OrganizationMemberResponse): OrganizationMember => {
  return {
    id: data.id,
    organizationId: data.organization_id,
    userId: data.user_id,
    role: data.role,
    createdAt: new Date(data.created_at),
  };
};

export const mapOrgMemberDetail = (
  data: OrganizationMemberDetailResponse,
): OrganizationMemberDetail => {
  return {
    id: data.id,
    organizationId: data.organization_id,
    user: data.user,
    role: data.role,
    createdAt: new Date(data.created_at),
  };
};

export const mapOrgMemberWithAttendance = (
  data: OrganizationMemberWithAttendanceResponse,
): OrganizationMemberWithAttendance => {
  return {
    ...mapOrgMemberDetail(data),
    attendanceStatus: data.attendance_status,
  };
};

export const mapOrganizationStats = (data: OrganizationStatsResponse): OrganizationStats => {
  return {
    courses: data.courses,
    teachers: data.teachers,
    students: data.students,
    groups: data.groups,
    todayLessons: data.today_lessons,
    totalIncome: data.total_income,
  };
};
