import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import type { LessonDetail } from '../../entities';
import { getLessons } from '../../api/lessons/requests.ts';

export const UpcomingLessons = () => {
  const [upcomingLessons, setUpcomingLessons] = useState<LessonDetail[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getLessons().then(setUpcomingLessons);
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-slate-900">Ближайшие занятия</h2>
        <button
          onClick={() => navigate('/org/schedule')}
          className="text-indigo-600 text-sm hover:underline"
        >
          Все →
        </button>
      </div>
      {upcomingLessons.length === 0 ? (
        <p className="text-slate-400 text-sm">Нет запланированных занятий</p>
      ) : (
        <div className="space-y-3">
          {upcomingLessons.map(lesson => {
            return (
              <div key={lesson.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-indigo-700 text-xs font-bold leading-none">
                    {lesson.startDate.getDate()}
                  </span>
                  <span className="text-indigo-500 text-[9px]">
                    {lesson.startDate.toLocaleDateString('ru', {
                      month: 'short',
                    })}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-slate-900 truncate">
                    {lesson.group?.course.subject.name ||
                      lesson.courseTeacherStudent?.courseTeacher.course.subject.name ||
                      'Занятие'}
                  </div>
                  <div className="text-xs text-slate-500">
                    {lesson.startDate.toLocaleTimeString('ru', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-lg ${lesson.group ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}
                  >
                    {lesson.group ? 'Группа' : 'Инд.'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
