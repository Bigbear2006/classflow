import { DAY_NAMES_SHORT } from '../../../labels/lesson.tsx';
import { LessonMiniCard } from './LessonMiniCard.tsx';
import type { LessonDetail } from '../../../entities';
import { dateIsToday } from '../../../labels/date.ts';

interface DesktopScheduleDayProps {
  index: number;
  date: Date;
  lessons: LessonDetail[];
  openEdit: (lesson: LessonDetail) => void;
}

export const DesktopScheduleDay = ({
  index,
  date,
  lessons,
  openEdit,
}: DesktopScheduleDayProps) => {
  const isToday = dateIsToday(date);
  return (
    <div key={index} className="min-h-[120px]">
      <div
        className={`text-center py-2 rounded-xl mb-2 ${isToday ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700'}`}
      >
        <div className="text-xs font-medium">{DAY_NAMES_SHORT[index]}</div>
        <div className="text-sm font-bold">{date.getDate()}</div>
      </div>
      <div className="space-y-1.5">
        {lessons.map(lesson => (
          <LessonMiniCard key={lesson.id} lesson={lesson} openEdit={openEdit} />
        ))}
      </div>
    </div>
  );
};
