import { Edit2, Trash2 } from 'lucide-react';
import { deleteCourse } from '../../../api/courses/requests.ts';
import { coursePaymentTypeDisplay, paymentTypeLabels } from '../../../labels/course.tsx';
import type { Course } from '../../../entities';
import { useAppContext } from '../../../context.tsx';
import { lessonTypeLabels } from '../../../labels/lesson.tsx';

interface CourseCardProps {
  course: Course;
  openDetail: (course: Course) => void;
  openEdit: (course: Course) => void;
}

export const CourseCard = ({ course, openDetail, openEdit }: CourseCardProps) => {
  const { isAdminOrOwner } = useAppContext();

  return (
    <div
      key={course.id}
      onClick={() => openDetail(course)}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="h-36 overflow-hidden cursor-pointer">
        <img
          src={course.subject.image}
          alt={course.subject.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            className="font-semibold text-slate-900 cursor-pointer hover:text-indigo-600 transition-colors"
            onClick={() => openDetail(course)}
          >
            {course.subject.name}
          </h3>
          {isAdminOrOwner && (
            <div className="flex gap-1 flex-shrink-0">
              <button
                onClick={e => {
                  e.stopPropagation();
                  openEdit(course);
                }}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={e => {
                  e.stopPropagation();
                  deleteCourse(course.id);
                }}
                className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>
        <p className="text-slate-500 text-xs line-clamp-2 mb-3">{course.subject.description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-lg text-xs">
            {lessonTypeLabels[course.lessonType]}
          </span>
          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs">
            {paymentTypeLabels[course.paymentType]}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center border-t border-slate-100 pt-3">
          <div>
            <div className="text-slate-900 font-semibold text-sm">
              {course.price.toLocaleString('ru')} ₽
            </div>
            <div className="text-slate-400 text-xs">
              {coursePaymentTypeDisplay(course.paymentType)}
            </div>
          </div>
          <div>
            <div className="text-slate-900 font-semibold text-sm">{course.teachersCount}</div>
            <div className="text-slate-400 text-xs">препод.</div>
          </div>
          <div>
            <div className="text-slate-900 font-semibold text-sm">{course.studentsCount}</div>
            <div className="text-slate-400 text-xs">учеников</div>
          </div>
        </div>
      </div>
    </div>
  );
};
