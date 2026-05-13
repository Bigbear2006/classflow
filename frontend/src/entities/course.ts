import type { Duration } from 'luxon';
import type { Lesson, OrganizationMemberDetail, Payment, Subject, User } from './index.ts';

export type LessonType = 'ONLINE' | 'OFFLINE' | 'MIXED';
export type CourseType = 'GROUP' | 'INDIVIDUAL';
export type CoursePaymentType = 'FULL_COURSE' | 'EVERY_LESSON';
export type CourseTeacherStatus = 'ACTIVE' | 'PAUSED' | 'DELETED';
export type StudentStatus = 'PENDING' | 'ACTIVE' | 'REJECTED' | 'DELETED';

export interface Course {
  id: number;
  subject: Subject;
  type: CourseType;
  price: number;
  paymentType: CoursePaymentType;
  lessonType: LessonType;
  lessonDuration: Duration;
  lessonsCount?: number;
  duration?: Duration;
  selectedTeacher?: User;
}

export interface CourseDetail extends Course {
  teachersCount: number;
  studentsCount: number;
  activeGroupId: number | null;
  studentStatus: string;
}

interface BaseCourseTeacher {
  id: number;
  status: CourseTeacherStatus;
  createdAt: Date;
}

export interface CourseTeacherDetail extends BaseCourseTeacher {
  course: Course;
  teacher: OrganizationMemberDetail;
}

interface BaseCourseTeacherStudent {
  id: number;
  status: StudentStatus;
  createdAt: Date;
}

export interface CourseTeacherStudentDetail extends BaseCourseTeacherStudent {
  courseTeacher: CourseTeacherDetail;
  student: OrganizationMemberDetail;
}

export interface CourseTeacherStudentWithPayments extends CourseTeacherStudentDetail {
  lessons: Lesson[];
  payments: Payment[];
}

export interface IndividualCourseTeacherStudent extends BaseCourseTeacherStudent {
  courseTeacherId: number;
  student: OrganizationMemberDetail;
}

export interface IndividualCourseTeacher extends BaseCourseTeacher {
  courseId: number;
  teacher: OrganizationMemberDetail;
  students: IndividualCourseTeacherStudent[];
}

export interface IndividualCourse extends Course {
  teachers: IndividualCourseTeacher[];
}
