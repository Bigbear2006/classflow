export type { Address, AddressDetail, Cabinet, CabinetDetail } from './address.ts';
export type {
  Attendance,
  AttendanceStatus,
  AttendanceStats,
  WeekAttendanceStats,
  AttendanceDetail,
  CourseAttendanceStats,
} from './attendance.ts';
export type {
  LessonType,
  CourseType,
  CoursePaymentType,
  CourseDetail,
  CourseTeacherDetail,
  CourseTeacherStudentDetail,
  CourseTeacherStudentWithPayments,
  IndividualCourseTeacherStudent,
  IndividualCourse,
  IndividualCourseTeacher,
  Course,
  CourseTeacherStatus,
  StudentStatus,
} from './course.ts';
export type { Feedback, FeedbackDetail } from './feedback.ts';
export type {
  Group,
  GroupDetail,
  GroupWithPayments,
  StudentGroup,
  StudentGroupWithPayments,
  StudentGroupDetail,
  GroupWithStudents,
} from './group.ts';
export type { LessonStatus, Lesson, LessonDetail, DayLessons } from './lesson.ts';
export type {
  UserRole,
  Organization,
  OrganizationDetail,
  MyOrganization,
  OrganizationMember,
  OrganizationMemberDetail,
  OrganizationMemberWithAttendance,
  TeacherWithFeedback,
  RoleCount,
  OrganizationStats,
} from './organization.ts';
export type { Payment, PaymentMeta } from './payment.ts';
export type { Subject } from './subject.ts';
export type { User } from './user.ts';

export type FormAction = 'CREATE' | 'EDIT';
export type ModalAction = FormAction | 'VIEW';
export type FeedbackTab = 'ABOUT' | 'FEEDBACK';
