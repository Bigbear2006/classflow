import type {
  GroupDetailResponse,
  GroupResponse,
  GroupWithPaymentsResponse,
  GroupWithStudentsResponse,
  StudentGroupDetailResponse,
  StudentGroupWithPaymentsResponse,
} from './types.ts';
import type {
  Group,
  GroupDetail,
  GroupWithPayments,
  GroupWithStudents,
  StudentGroupDetail,
  StudentGroupWithPayments,
} from '../../entities';
import { mapCourseDetail } from '../courses/mappers.ts';
import { mapLesson } from '../lessons/mappers.ts';
import { mapOrgMemberDetail } from '../organizations/mappers.ts';
import { mapPayment } from '../payments/mappers.ts';

export const mapGroup = (data: GroupResponse): Group => {
  return {
    id: data.id,
    name: data.name,
    maxUsersCount: data.max_users_count,
    createdAt: new Date(data.created_at),
    courseId: data.course_id,
    defaultCabinetId: data.default_cabinet_id,
  };
};

export const mapGroupDetail = (data: GroupDetailResponse): GroupDetail => {
  return {
    id: data.id,
    name: data.name,
    maxUsersCount: data.max_users_count,
    createdAt: new Date(data.created_at),
    course: mapCourseDetail(data.course),
    defaultCabinet: data.default_cabinet,
  };
};

export const mapStudentGroupDetail = (data: StudentGroupDetailResponse): StudentGroupDetail => {
  return {
    id: data.id,
    status: data.status,
    createdAt: new Date(data.created_at),
    groupId: data.group_id,
    student: mapOrgMemberDetail(data.student),
  };
};

export const mapStudentGroupWithPayments = (
  data: StudentGroupWithPaymentsResponse,
): StudentGroupWithPayments => {
  return {
    id: data.id,
    status: data.status,
    createdAt: new Date(data.created_at),
    totalPaid: data.total_paid,
    student: mapOrgMemberDetail(data.student),
    payments: data.payments.map(mapPayment),
  };
};

export const mapGroupWithPayments = (data: GroupWithPaymentsResponse): GroupWithPayments => {
  return {
    ...mapGroupDetail(data),
    totalPaid: data.total_paid,
    students: data.students.map(mapStudentGroupWithPayments),
    lessons: data.lessons.map(mapLesson),
  };
};

export const mapGroupWithStudents = (data: GroupWithStudentsResponse): GroupWithStudents => {
  return {
    ...mapGroupDetail(data),
    students: data.students.map(mapStudentGroupDetail),
  };
};
