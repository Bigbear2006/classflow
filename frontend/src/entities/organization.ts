import type { Course, User } from './index.ts';

export type UserRole = 'OWNER' | 'ADMIN' | 'TEACHER' | 'STUDENT';

export interface Organization {
  id: number;
  name: string;
  slug: string;
  createdById: number;
  createdAt: Date;
}

export interface OrganizationDetail extends Organization {
  courses: Course[];
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
