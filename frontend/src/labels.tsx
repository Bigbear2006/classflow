import type { CoursePaymentType, LessonStatus, LessonType, UserRole } from './types.ts';
import { Crown, GraduationCap, Shield, UserCheck } from 'lucide-react';
import { type JSX } from 'react';

export const roleConfig: Record<UserRole, { label: string; color: string; icon: JSX.Element }> = {
  OWNER: {
    label: 'Владелец',
    color: 'bg-violet-100 text-violet-700',
    icon: <Crown size={12} />,
  },
  ADMIN: {
    label: 'Администратор',
    color: 'bg-blue-100 text-blue-700',
    icon: <Shield size={12} />,
  },
  TEACHER: {
    label: 'Преподаватель',
    color: 'bg-emerald-100 text-emerald-700',
    // icon: <BookOpen size={12} />,
    icon: <UserCheck size={12} />,
  },
  STUDENT: {
    label: 'Ученик',
    color: 'bg-amber-100 text-amber-700',
    icon: <GraduationCap size={12} />,
  },
};

export const roleLabels: Record<string, string> = {
  OWNER: 'Владелец',
  ADMIN: 'Администратор',
  TEACHER: 'Преподаватель',
  STUDENT: 'Ученик',
};

export const roleColors: Record<string, string> = {
  OWNER: 'bg-violet-600',
  ADMIN: 'bg-blue-600',
  TEACHER: 'bg-emerald-600',
  STUDENT: 'bg-amber-500',
};

export const lessonTypeLabels: Record<LessonType, string> = {
  ONLINE: 'Онлайн',
  OFFLINE: 'Офлайн',
  MIXED: 'Смешанный',
};

export const paymentTypeLabels: Record<CoursePaymentType, string> = {
  FULL_COURSE: 'За весь курс',
  EVERY_LESSON: 'За каждое занятие',
};

export const statusConfig: Record<LessonStatus, { label: string; color: string; dot: string }> = {
  SCHEDULED: {
    label: 'Запланировано',
    color: 'bg-blue-100 text-blue-700',
    dot: 'bg-blue-500',
  },
  COMPLETED: {
    label: 'Проведено',
    color: 'bg-emerald-100 text-emerald-700',
    dot: 'bg-emerald-500',
  },
  CANCELLED: {
    label: 'Отменено',
    color: 'bg-red-100 text-red-700',
    dot: 'bg-red-400',
  },
};

export const DAY_NAMES_SHORT = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
export const DAY_NAMES_FULL = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];
