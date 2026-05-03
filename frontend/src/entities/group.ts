import type { Cabinet, Course, LessonDetail, UserWithPayment } from './index.ts';

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
  course: Course;
  defaultCabinet?: Cabinet;
}

export interface GroupWithPayments extends GroupDetail {
  totalPaid: number;
  students: UserWithPayment[];
  lessons: LessonDetail[];
}

export interface UserGroup {
  id: string;
  userId: string;
  groupId: string;
  createdAt: string;
}
