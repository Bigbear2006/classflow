import { Clock, Edit2, MapPin, Trash2, UserCheck } from 'lucide-react';
import type { LessonDetail } from '../../../entities';
import { getLessonStatusCfg } from '../../../labels/lesson.tsx';
import { displayTime } from '../../../labels/date.ts';

interface DesktopLessonCardProps {
  lesson: LessonDetail;
  openEdit: (lesson: LessonDetail) => void;
  onDeleteLesson: (id: number) => void;
}

export const DesktopLessonCard = ({
  lesson,
  openEdit,
  onDeleteLesson,
}: DesktopLessonCardProps) => {
  let cfg = getLessonStatusCfg(lesson);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <div className="font-semibold text-slate-900 text-sm leading-snug">
            Урок #{lesson.id}
          </div>
          {/*TODO: add subtitle here*/}
          <div className="text-xs text-slate-400 mt-0.5">{lesson.createdAt.getDate()}</div>
        </div>
        <span className={`flex-shrink-0 px-2 py-1 rounded-lg text-xs font-medium ${cfg.color}`}>
          {cfg.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <Clock size={12} className="text-slate-400 flex-shrink-0" />
          <span>
            {displayTime(lesson.startDate)} — {displayTime(lesson.endDate)}
          </span>
        </div>
        {lesson.cabinet && (
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <MapPin size={12} className="text-slate-400 flex-shrink-0" />
            <span className="truncate">{lesson.cabinet.number}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5 text-xs text-slate-600 col-span-2">
          <UserCheck size={12} className="text-slate-400 flex-shrink-0" />
          <span className="truncate">{lesson.conductedBy.user.fullname}</span>
        </div>
        {/*TODO: add topic*/}
        {/*{lesson.topic && (*/}
        {/*  <div className="text-xs text-slate-500 col-span-2 bg-slate-50 rounded-lg px-2 py-1">*/}
        {/*    {lesson.topic}*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>

      <div className="flex gap-2 pt-2 border-t border-slate-100">
        <button
          onClick={() => openEdit(lesson)}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-medium transition-colors"
        >
          <Edit2 size={13} /> Редактировать
        </button>
        <button
          onClick={() => onDeleteLesson(lesson.id)}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 text-xs font-medium transition-colors"
        >
          <Trash2 size={13} /> Удалить
        </button>
      </div>
    </div>
  );
};
