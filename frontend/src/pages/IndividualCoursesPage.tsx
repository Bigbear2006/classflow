import { BookOpen, User } from 'lucide-react';
import { useIndividualCourses } from '../hooks/queries/course.ts';
import { courseTeacherStatusConfig } from '../labels/course.tsx';

export const IndividualCoursesPage = () => {
  const { data: courses } = useIndividualCourses();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-slate-900 text-2xl font-semibold">Индивидуальные курсы</h1>
      </div>
      {courses.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <BookOpen size={40} className="mx-auto mb-3 opacity-40" />
          <p>Вам ещё не назначено ни одного индивидуального курса</p>
        </div>
      )}
      <div className="space-y-6">
        {courses.map(course => (
          <div
            key={course.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
          >
            <div className="flex items-center gap-4 p-5 border-b border-slate-100">
              <img
                src={course.subject.image}
                alt=""
                className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <h2 className="font-semibold text-slate-900">{course.subject.name}</h2>
                <p className="text-xs text-slate-500">
                  {course.price.toLocaleString('ru')} ₽ / занятие ·{' '}
                  {course.lessonDuration.as('minutes')} мин
                </p>
              </div>
            </div>
            {course.teachers.map(teacher => (
              <div className="flex flex-col gap-3 p-5 border-t border-slate-100">
                <h3 className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1.5">
                  <BookOpen size={14} /> {teacher.teacher.user.fullname}
                </h3>
                <div className="flex gap-1">
                  {courseTeacherStatusConfig.map(({ status, label, color }) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => {}}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                        teacher.status === status
                          ? color
                          : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1.5">
                  <User size={14} /> ученики
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {...teacher.students.map(student => (
                    <div
                      key={student.id}
                      className="flex flex-col gap-3 border border-slate-200 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-medium">
                          {student.student.user.fullname.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-sm text-slate-900">
                            {student.student.user.fullname}
                          </div>
                          <div className="text-xs text-slate-400">
                            {student.student.user.email}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {courseTeacherStatusConfig.map(({ status, label, color }) => (
                          <button
                            key={status}
                            type="button"
                            onClick={() => {}}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                              teacher.status === status
                                ? color
                                : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
