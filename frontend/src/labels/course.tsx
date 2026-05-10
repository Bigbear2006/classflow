import type { CoursePaymentType } from '../entities';

export const paymentTypeLabels: Record<CoursePaymentType, string> = {
  FULL_COURSE: 'За весь курс',
  EVERY_LESSON: 'За каждое занятие',
};

export const displayCoursePaymentType = (paymentType: CoursePaymentType): string => {
  return paymentType == 'EVERY_LESSON' ? 'за занятие' : 'за курс';
};

export const courseTeacherStatusConfig = [
  {
    status: 'ACTIVE',
    label: 'Активен',
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  },
  {
    status: 'PAUSED',
    label: 'Приостановлен',
    color: 'bg-amber-100 text-amber-700 border-amber-200',
  },
  {
    status: 'DELETED',
    label: 'Удален',
    color: 'bg-red-100 text-red-700 border-red-200',
  },
];
