import type { Duration } from 'luxon';
import type { GroupDetail, LessonDetail, Subject, User } from './index.ts';

export type LessonType = 'ONLINE' | 'OFFLINE' | 'MIXED';
export type CourseType = 'GROUP' | 'INDIVIDUAL';
export type CoursePaymentType = 'FULL_COURSE' | 'EVERY_LESSON';

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
  teachersCount: number;
  studentsCount: number;
}

export interface CourseDetail extends Course {
  groups: GroupDetail[];
  teachers: User[];
}

export interface CourseTeacherDetail {
  id: number;
  course: Course;
  teacher: User;
  isActive: boolean;
  createdAt: Date;
}

export interface CourseTeacherStudent {
  id: number;
  courseTeacher: CourseTeacherDetail;
  student: User;
  createdAt: Date;
  // status: 'active' | 'pending' | 'cancelled';
}

export interface CourseTeacherStudentWithLessons extends CourseTeacherStudent {
  lessons: LessonDetail[];
}
