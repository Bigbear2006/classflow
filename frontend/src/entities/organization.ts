import type { AttendanceStatus, CourseDetail, User } from './index.ts';

export type UserRole = 'OWNER' | 'ADMIN' | 'TEACHER' | 'STUDENT';

export interface Organization {
  id: number;
  name: string;
  slug: string;
  createdById: number;
  createdAt: Date;
}

export interface OrganizationDetail extends Organization {
  courses: CourseDetail[];
  membersCount: number;
  groupsCount: number;
}

export interface MyOrganization extends Organization {
  role: UserRole;
  coursesCount: number;
  membersCount: number;
}

export interface OrganizationMember {
  id: number;
  organizationId: number;
  userId: number;
  role: UserRole;
  createdAt: Date;
}

export interface OrganizationMemberDetail {
  id: number;
  organizationId: number;
  user: User;
  role: UserRole;
  createdAt: Date;
}

export interface OrganizationMemberWithAttendance extends OrganizationMemberDetail {
  attendanceStatus: AttendanceStatus | null;
}

export interface TeacherWithFeedback extends OrganizationMemberDetail {
  rating: number;
  feedbackCount: number;
  userCanAddFeedback: boolean;
  courses: CourseDetail[];
}

export interface RoleCount {
  role: UserRole;
  count: number;
}

export interface OrganizationStats {
  courses: number;
  teachers: number;
  students: number;
  groups: number;
  todayLessons: number;
  totalIncome: number;
}

export interface StudentStats {
  courses: number;
  completedLessons: number;
  todayLessons: number;
  totalPaid: number;
}

export interface TeacherStats {
  courses: number;
  students: number;
  todayLessons: number;
  completedLessons: number;
}
