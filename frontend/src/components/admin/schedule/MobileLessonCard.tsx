import { DAY_NAMES_SHORT, getLessonStatusCfg } from '../../../labels/lesson.tsx';
import type { LessonDetail } from '../../../entities';
import { Edit2, Trash2 } from 'lucide-react';

interface MobileLessonCardProps {
  lesson: LessonDetail;
  openEdit: (lesson: LessonDetail) => void;
  onDeleteLesson: (id: number) => void;
}

export const MobileLessonCard = ({ lesson, openEdit, onDeleteLesson }: MobileLessonCardProps) => {
  const cfg = getLessonStatusCfg(lesson);
  return (
    <div key={lesson.id} className="px-4 py-3.5 flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex flex-col items-center justify-center flex-shrink-0">
        <span className="text-indigo-700 text-xs font-bold leading-none">
          {lesson.startDate.getDate()}
        </span>
        <span className="text-indigo-400 text-[9px]">
          {DAY_NAMES_SHORT[lesson.startDate.getDay() === 0 ? 6 : lesson.startDate.getDay() - 1]}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm text-slate-900 truncate">Урок #{lesson.id}</div>
        {/*TODO: add subtitle*/}
        {/*{sub && <div className="text-xs text-slate-400">{sub}</div>}*/}
        <div className="text-xs text-slate-500 mt-0.5">
          {lesson.startDate.toLocaleTimeString('ru', {
            hour: '2-digit',
            minute: '2-digit',
          })}{' '}
          —{' '}
          {lesson.endDate.toLocaleTimeString('ru', {
            hour: '2-digit',
            minute: '2-digit',
          })}
          {` · каб. ${lesson.cabinet?.number}`}
        </div>
        <span
          className={`inline-block mt-1.5 px-2 py-0.5 rounded-lg text-xs font-medium ${cfg.color}`}
        >
          {cfg.label}
        </span>
      </div>
      <div className="flex gap-1 flex-shrink-0">
        <button
          onClick={() => openEdit(lesson)}
          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
        >
          <Edit2 size={14} />
        </button>
        <button
          onClick={() => onDeleteLesson(lesson.id)}
          className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};
