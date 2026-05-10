import type {
  Cabinet,
  CourseDetail,
  Lesson,
  OrganizationMemberDetail,
  Payment,
  StudentStatus,
} from './index.ts';

interface BaseGroup {
  id: number;
  name: string;
  maxUsersCount: number;
  createdAt: Date;
}

export interface Group extends BaseGroup {
  courseId: number;
  defaultCabinetId?: number;
}

export interface GroupDetail extends BaseGroup {
  course: CourseDetail;
  defaultCabinet?: Cabinet;
}

export interface GroupWithPayments extends GroupDetail {
  totalPaid: number;
  students: StudentGroupWithPayments[];
  lessons: Lesson[];
}

interface BaseStudentGroup {
  id: number;
  status: StudentStatus;
  createdAt: Date;
}

export interface StudentGroup extends BaseStudentGroup {
  studentId: number;
  groupId: number;
}

export interface StudentGroupDetail extends BaseStudentGroup {
  student: OrganizationMemberDetail;
  groupId: number;
}

export interface StudentGroupWithPayments extends BaseStudentGroup {
  student: OrganizationMemberDetail;
  totalPaid: number;
  payments: Payment[];
}

export interface GroupWithStudents extends GroupDetail {
  students: StudentGroupDetail[];
}
