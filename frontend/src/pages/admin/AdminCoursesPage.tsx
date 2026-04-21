import { useEffect, useState } from 'react';
import type {
  Course,
  LessonType,
  CoursePaymentType,
  ModalAction,
} from '../../types.ts';
import { Plus, BookOpen, Edit2, Trash2 } from 'lucide-react';
import { coursePaymentTypeDisplay } from '../../utils.ts';
import { deleteCourse, getCourses } from '../../api/course.ts';
import { CourseDetailCard } from '../../components/admin/courses/CourseDetailCard.tsx';
import { CourseForm } from '../../components/admin/courses/CourseForm.tsx';

const lessonTypeLabels: Record<LessonType, string> = {
  ONLINE: 'Онлайн',
  OFFLINE: 'Офлайн',
  MIXED: 'Смешанный',
};
const paymentTypeLabels: Record<CoursePaymentType, string> = {
  FULL_COURSE: 'За весь курс',
  EVERY_LESSON: 'За каждое занятие',
};

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(
    null,
  );
  const [action, setAction] = useState<ModalAction | null>(null);

  const openEdit = (c: Course) => {
    setSelectedCourseId(c.id);
    setAction('EDIT');
  };

  const openDetail = (id: number) => {
    setSelectedCourseId(id);
    setAction('VIEW');
  };

  const closeModal = () => {
    setAction(null);
    setSelectedCourseId(null);
  };

  useEffect(() => {
    getCourses().then(setCourses);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 text-2xl font-semibold">Курсы</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {courses.length} курсов в организации
          </p>
        </div>
        <button
          onClick={() => setAction('CREATE')}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors"
        >
          <Plus size={16} /> Добавить курс
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {courses.map(course => {
          return (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {course.subject.image && (
                <div
                  className="h-36 overflow-hidden cursor-pointer"
                  onClick={() => openDetail(course.id)}
                >
                  <img
                    src={course.subject.image}
                    alt={course.subject.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3
                    className="font-semibold text-slate-900 cursor-pointer hover:text-indigo-600 transition-colors"
                    onClick={() => openDetail(course.id)}
                  >
                    {course.subject.name}
                  </h3>
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => openEdit(course)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => deleteCourse(course.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-slate-500 text-xs line-clamp-2 mb-3">
                  {course.subject.description}
                </p>
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
                    <div className="text-slate-900 font-semibold text-sm">
                      {course.teachersCount}
                    </div>
                    <div className="text-slate-400 text-xs">препод.</div>
                  </div>
                  <div>
                    <div className="text-slate-900 font-semibold text-sm">
                      {course.studentsCount}
                    </div>
                    <div className="text-slate-400 text-xs">учеников</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {courses.length === 0 && (
          <div className="col-span-full text-center py-16 text-slate-400">
            <BookOpen size={40} className="mx-auto mb-3 opacity-40" />
            <p>Курсов ещё нет. Создайте первый!</p>
          </div>
        )}
      </div>

      {(action === 'CREATE' || action === 'EDIT') && (
        <CourseForm action={action} closeModal={closeModal} />
      )}
      {action === 'VIEW' && selectedCourseId && (
        <CourseDetailCard
          courseId={selectedCourseId}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}
