import { LessonRow } from './LessonRow.tsx';
import type { LessonDetail } from '../../../entities';

interface LessonTableProps {
  lessons: LessonDetail[];
  openEdit: (lesson: LessonDetail) => void;
  onDeleteLesson: (id: number) => void;
}

export const LessonsTable = ({ lessons, openEdit, onDeleteLesson }: LessonTableProps) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-slate-100">
          <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
            Курс / Группа
          </th>
          <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
            Дата и время
          </th>
          <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">Кабинет</th>
          <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 hidden lg:table-cell">
            Тема
          </th>
          <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">Статус</th>
          <th className="px-5 py-3 w-16"></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {lessons.map(lesson => (
          <LessonRow
            key={lesson.id}
            lesson={lesson}
            openEdit={openEdit}
            onDeleteLesson={onDeleteLesson}
          />
        ))}
        {lessons.length === 0 && (
          <tr>
            <td colSpan={6} className="px-5 py-10 text-center text-slate-400 text-sm">
              Занятий на этой неделе нет
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
