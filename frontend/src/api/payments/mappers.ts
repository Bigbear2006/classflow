import type { PaymentResponse } from './types.ts';
import type { Payment } from '../../entities';

export const mapPayment = (data: PaymentResponse): Payment => {
  return {
    id: data.id,
    amount: data.amount,
    createdById: data.created_by_id,
    studentGroupId: data.student_group_id,
    courseTeacherStudentId: data.course_teacher_student_id,
    lessonId: data.lesson_id,
    date: new Date(data.date),
    comment: data.comment,
  };
};
