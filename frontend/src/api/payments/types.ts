export interface CreatePaymentData {
  amount: number;
  date: string;
  student_group_id?: number;
  course_teacher_student_id?: number;
  lesson_id?: number;
  comment: string;
}

export interface PaymentResponse {
  id: number;
  amount: number;
  created_by_id: number;
  date: Date;
  student_group_id: number | null;
  course_teacher_student_id: number | null;
  lesson_id: number | null;
  comment: string;
}
