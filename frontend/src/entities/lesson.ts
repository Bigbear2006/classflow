import type {
  Cabinet,
  CourseTeacherStudentDetail,
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
  groupId?: number;
  courseTeacherStudentId?: number;
}

export interface LessonDetail extends BaseLesson {
  conductedBy: OrganizationMemberDetail;
  cabinet?: Cabinet;
  group?: GroupDetail;
  courseTeacherStudent?: CourseTeacherStudentDetail;
}

export interface DayLessons {
  date: Date;
  lessons: LessonDetail[];
}
