import { useEffect, useState } from 'react';
import type { Course } from '../../entities';
import { useNavigate } from 'react-router';
import { BookOpen } from 'lucide-react';
import { getCourses } from '../../api/courses/requests.ts';

export const MyCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCourses().then(setCourses);
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-slate-900">Мои курсы</h2>
        <button
          onClick={() => navigate('/courses')}
          className="text-indigo-600 text-sm hover:underline"
        >
          Все →
        </button>
      </div>
      {courses.length === 0 ? (
        <div className="text-center py-8">
          <BookOpen size={32} className="mx-auto mb-2 text-slate-300" />
          <p className="text-slate-400 text-sm">У вас ещё нет ни одного курса</p>
          <button
            onClick={() => navigate('/courses')}
            className="mt-3 px-4 py-2 bg-indigo-600 text-white text-sm rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Посмотреть все курсы
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {courses.map(course => (
            <div key={course.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              {course.subject.image ? (
                <img
                  src={course.subject.image}
                  alt=""
                  className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={16} className="text-blue-600" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-900">{course.subject.name}</div>
                <div className="text-xs text-slate-400">
                  {course.selectedTeacher?.fullname ? course.selectedTeacher?.fullname : 'Группа'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
