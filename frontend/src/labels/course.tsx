import type { CoursePaymentType } from '../entities';

export const paymentTypeLabels: Record<CoursePaymentType, string> = {
  FULL_COURSE: 'За весь курс',
  EVERY_LESSON: 'За каждое занятие',
};

export const coursePaymentTypeDisplay = (paymentType: CoursePaymentType): string => {
  return paymentType == 'EVERY_LESSON' ? 'за занятие' : 'за курс';
};
