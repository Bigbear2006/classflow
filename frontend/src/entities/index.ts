export type { Address, AddressDetail, Cabinet, CabinetDetail } from './address.ts';
export type { Attendance, AttendanceStatus } from './attendance.ts';
export type {
  LessonType,
  CourseType,
  CoursePaymentType,
  Course,
  CourseDetail,
  CourseTeacherDetail,
  CourseTeacherStudent,
  CourseTeacherStudentWithLessons,
} from './course.ts';
export type { Feedback } from './feedback.ts';
export type { Group, GroupDetail, GroupWithPayments, UserGroup } from './group.ts';
export type { LessonStatus, Lesson, LessonDetail, DayLessons } from './lesson.ts';
export type {
  UserRole,
  Organization,
  OrganizationDetail,
  MyOrganization,
  OrganizationMember,
  OrganizationMemberDetail,
  RoleCount,
  OrganizationStats,
} from './organization.ts';
export type { Payment } from './payment.ts';
export type { Subject } from './subject.ts';
export type { User, UserWithPayment } from './user.ts';

export type FormAction = 'CREATE' | 'EDIT';
export type ModalAction = FormAction | 'VIEW';
