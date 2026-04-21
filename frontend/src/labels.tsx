import type { UserRole } from './types.ts';
import { Crown, GraduationCap, Shield, UserCheck } from 'lucide-react';
import type { JSX } from 'react';

export const roleConfig: Record<
  UserRole,
  { label: string; color: string; icon: JSX.Element }
> = {
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

export const lessonTypeLabel: Record<string, string> = {
  ONLINE: 'Онлайн',
  OFFLINE: 'Офлайн',
  MIXED: 'Смешанный',
};
