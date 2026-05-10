import type { AttendanceStatus } from '../entities';

export const attendanceStatusConfig = [
  {
    status: 'PRESENT',
    label: 'Присутствовал',
    shortLabel: 'Присут.',
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  },
  {
    status: 'ABSENT',
    label: 'Отсутствовал',
    shortLabel: 'Отсут.',
    color: 'bg-red-100 text-red-700 border-red-200',
  },
  {
    status: 'EXCUSED',
    label: 'Уважительная',
    shortLabel: 'Уваж.',
    color: 'bg-amber-100 text-amber-700 border-amber-200',
  },
];

export const getRateColor = (rate: number) => {
  return rate >= 90 ? 'text-emerald-600' : rate >= 75 ? 'text-amber-600' : 'text-red-600';
};

export const getRateStyles = (rate: number) => {
  return rate >= 90
    ? 'bg-emerald-50 text-emerald-600'
    : rate >= 75
      ? 'bg-amber-50 text-amber-600'
      : 'bg-red-50 text-red-600';
};

export const getAttendanceStatusStyles = (status: AttendanceStatus): string => {
  return status === 'PRESENT'
    ? 'bg-emerald-50 text-emerald-700'
    : status === 'ABSENT'
      ? 'bg-red-50 text-red-700'
      : 'bg-amber-50 text-amber-700';
};

export const displayAttendanceStatus = (status: AttendanceStatus): string => {
  return status === 'PRESENT'
    ? 'Присутствовал'
    : status === 'ABSENT'
      ? 'Отсутствовал'
      : 'Уваж. причина';
};
