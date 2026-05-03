import { DAY_NAMES_SHORT } from '../../../labels/lesson.tsx';
import type { Dispatch, SetStateAction } from 'react';
import { dateIsToday } from '../../../labels/date.ts';

interface MobileScheduleDayProps {
  index: number;
  date: Date;
  selectedDayIdx: number;
  setSelectedDayIdx: Dispatch<SetStateAction<number>>;
}

export const MobileScheduleDay = ({
  index,
  date,
  selectedDayIdx,
  setSelectedDayIdx,
}: MobileScheduleDayProps) => {
  const dayLessons = [1];
  const isToday = dateIsToday(date);
  return (
    <button
      onClick={() => setSelectedDayIdx(index)}
      className={`flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2.5 rounded-2xl transition-all border ${
        index === selectedDayIdx
          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
          : isToday
            ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
            : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
      }`}
    >
      <span className="text-[10px] font-semibold uppercase tracking-wide opacity-80">
        {DAY_NAMES_SHORT[index]}
      </span>
      <span className="text-lg font-bold leading-none">{date.getDate()}</span>
      {dayLessons.length > 0 ? (
        <span
          className={`w-1.5 h-1.5 rounded-full mt-0.5 ${index === selectedDayIdx ? 'bg-white/70' : 'bg-indigo-400'}`}
        />
      ) : (
        <span className="w-1.5 h-1.5 mt-0.5" />
      )}
    </button>
  );
};
