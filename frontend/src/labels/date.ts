export const displayDate = (date: Date): string => {
  return date.toLocaleDateString('ru', {
    day: 'numeric',
    month: 'long',
  });
};

export const displayShortDate = (date: Date): string => {
  return date.toLocaleDateString('ru', {
    day: 'numeric',
    month: 'short',
  });
};

export const displayDateWithYear = (date: Date): string => {
  return date.toLocaleDateString('ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const displayTime = (date: Date): string => {
  return date.toLocaleTimeString('ru', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getDateString = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const dateIsToday = (date: Date): boolean => {
  return date.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
};

export const getWeekDay = (date: Date): number => {
  // returns 0 for Monday, 1 for Tuesday, ..., and 6 for Sunday
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
};

export const getTodayWeekDay = () => getWeekDay(new Date());

export const getWeekStartDay = () => {
  const date = new Date();
  date.setDate(date.getDate() - getWeekDay(date));
  date.setHours(0, 0, 0, 0);
  return date;
};

export const getWeekDays = (weekStart: Date) => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    date.getDay();
    return date;
  });
};
