import type { OrganizationMemberDetail } from './organization.ts';
import type { CourseDetail } from './course.ts';

interface BaseFeedback {
  id: string;
  rating: number;
  text: string;
  createdAt: string;
}

export interface Feedback extends BaseFeedback {
  authorId: number;
  teacherId?: number;
  courseId?: number;
}

export interface FeedbackDetail extends Feedback {
  author: OrganizationMemberDetail;
  teacher: OrganizationMemberDetail;
  course: CourseDetail;
}
