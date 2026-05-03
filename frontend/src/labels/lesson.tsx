import type { LessonDetail, LessonStatus, LessonType } from '../entities';

export const lessonTypeLabels: Record<LessonType, string> = {
  ONLINE: 'Онлайн',
  OFFLINE: 'Офлайн',
  MIXED: 'Смешанный',
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

export const getLessonStatusCfg = (lesson: LessonDetail) => {
  let cfg = statusConfig.SCHEDULED;
  if (lesson.endDate < new Date()) {
    cfg = statusConfig.COMPLETED;
  }
  return cfg;
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
