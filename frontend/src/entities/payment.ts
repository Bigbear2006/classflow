export interface Payment {
  id: number;
  amount: number;
  createdById: number;
  studentGroupId: number | null;
  courseTeacherStudentId: number | null;
  lessonId: number | null;
  date: Date;
  comment: string;
}

export interface PaymentMeta {
  lessonId?: number;
  studentGroupId?: number;
  courseTeacherStudentId?: number;
  amount?: number;
}
