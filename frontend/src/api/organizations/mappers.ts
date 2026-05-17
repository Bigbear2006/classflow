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
  StudentStatsResponse,
  TeacherStatsResponse,
} from './types.ts';
import type { StudentStats, TeacherStats } from '../../entities/organization.ts';

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

export const mapStudentStats = (data: StudentStatsResponse): StudentStats => {
  return {
    courses: data.courses,
    completedLessons: data.completed_lessons,
    todayLessons: data.today_lessons,
    totalPaid: data.total_paid,
  };
};

export const mapTeacherStats = (data: TeacherStatsResponse): TeacherStats => {
  return {
    courses: data.courses,
    students: data.students,
    completedLessons: data.completed_lessons,
    todayLessons: data.today_lessons,
  };
};
