export interface Feedback {
  id: string;
  authorId: string;
  teacherId: string | null;
  courseId: string | null;
  rating: number;
  text: string;
  createdAt: string;
}
