import { getLessonStatusCfg } from '../../../labels/lesson.tsx';
import type { LessonDetail } from '../../../entities';
import { Edit2, Trash2 } from 'lucide-react';
import { displayShortDate, displayTime } from '../../../labels/date.ts';

interface LessonRowProps {
  lesson: LessonDetail;
  openEdit: (lesson: LessonDetail) => void;
  onDeleteLesson: (id: number) => void;
}

export const LessonRow = ({ lesson, openEdit, onDeleteLesson }: LessonRowProps) => {
  const cfg = getLessonStatusCfg(lesson);
  return (
    <tr key={lesson.id} className="hover:bg-slate-50">
      <td className="px-5 py-3">
        <div className="font-medium text-sm text-slate-900">Урок #{lesson.id}</div>
        <div className="text-xs text-slate-400">{lesson.conductedBy.user.fullname}</div>
      </td>
      <td className="px-5 py-3 text-sm text-slate-700">
        <div>{displayShortDate(lesson.startDate)}</div>
        <div className="text-xs text-slate-400">
          {displayTime(lesson.startDate)} — {displayTime(lesson.endDate)}
        </div>
      </td>
      <td className="px-5 py-3 text-sm text-slate-600">{lesson.cabinet?.number || lesson.url}</td>
      {/*<td className="px-5 py-3 text-sm text-slate-600 hidden lg:table-cell">*/}
      {/*  {lesson.topic || '—'}*/}
      {/*</td>*/}
      <td className="px-5 py-3">
        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${cfg.color}`}>
          {cfg.label}
        </span>
      </td>
      <td className="px-3 py-3">
        <div className="flex gap-1">
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
      </td>
    </tr>
  );
};
