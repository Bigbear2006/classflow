import { BookOpen } from 'lucide-react';
import type { TeacherWithFeedback } from '../../entities';

interface AboutTeacherProps {
  selectedTeacher: TeacherWithFeedback;
}

export const AboutTeacher = ({ selectedTeacher }: AboutTeacherProps) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <BookOpen size={16} className="text-indigo-500" /> Преподаваемые курсы
      </h3>
      {selectedTeacher.courses.length > 0 ? (
        <div className="space-y-3">
          {selectedTeacher.courses.map(course => (
            <div key={course.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <img
                src={course.subject.image}
                alt=""
                className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-slate-900 text-sm">{course.subject.name}</div>
                <div className="text-slate-500 text-xs mt-0.5 line-clamp-1">
                  {course.subject.description}
                </div>
                <div className="flex gap-3 mt-1 text-xs text-slate-400">
                  <span>{course.lessonDuration?.as('minutes')} мин</span>
                  <span>{course.price.toLocaleString('ru')} ₽/занятие</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-400 text-sm">Нет назначенных курсов</p>
      )}
    </div>
  );
};
