import type {
  Cabinet,
  CourseTeacherStudent,
  GroupDetail,
  OrganizationMemberDetail,
} from './index.ts';

export type LessonStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';

interface BaseLesson {
  id: number;
  startDate: Date;
  endDate: Date;
  url?: string;
  createdAt: Date;
  // status: LessonStatus;
  // TODO: add
  paymentId?: number;
}

export interface Lesson extends BaseLesson {
  conductedById: number;
  cabinetId?: number;
  grouId?: number;
  courseTeacherStudentId?: number;
}

export interface LessonDetail extends BaseLesson {
  conductedBy: OrganizationMemberDetail;
  cabinet?: Cabinet;
  group?: GroupDetail;
  courseTeacherStudent?: CourseTeacherStudent;
}

export interface DayLessons {
  date: Date;
  lessons: LessonDetail[];
}
