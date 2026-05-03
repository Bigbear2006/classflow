import { displayTime } from '../../../labels/date.ts';
import type { LessonDetail } from '../../../entities';
import { getLessonStatusCfg } from '../../../labels/lesson.tsx';

interface LessonMiniCardProps {
  lesson: LessonDetail;
  openEdit: (lesson: LessonDetail) => void;
}

export const LessonMiniCard = ({ lesson, openEdit }: LessonMiniCardProps) => {
  const cfg = getLessonStatusCfg(lesson);
  return (
    <div
      onClick={() => openEdit(lesson)}
      className="p-1.5 bg-white border border-slate-200 rounded-xl cursor-pointer hover:shadow-sm transition-shadow text-xs"
    >
      <div className="font-medium text-slate-800 truncate">Урок #{lesson.id}</div>
      <div className="text-slate-400">{displayTime(lesson.startDate)}</div>
      <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-medium ${cfg.color}`}>
        {cfg.label}
      </span>
    </div>
  );
};
