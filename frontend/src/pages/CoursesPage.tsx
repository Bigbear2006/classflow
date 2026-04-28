import { useState } from 'react';
import type { Course, ModalAction } from '../types.ts';
import { Plus, BookOpen } from 'lucide-react';
import { CourseDetailCard } from '../components/admin/courses/CourseDetailCard.tsx';
import { CourseForm } from '../components/admin/courses/CourseForm.tsx';
import { CourseCard } from '../components/admin/courses/CourseCard.tsx';
import { useAppContext } from '../context.tsx';
import { useCourses } from '../hooks/queries/course.ts';

export default function CoursesPage() {
  const { isAdminOrOwner } = useAppContext();
  const { data: courses } = useCourses();

  const [selectedCourse, setSelectedCourse] = useState<Course>();
  const [action, setAction] = useState<ModalAction | null>(null);

  const openEdit = (course: Course) => {
    setSelectedCourse(course);
    setAction('EDIT');
  };

  const openDetail = (course: Course) => {
    setSelectedCourse(course);
    setAction('VIEW');
  };

  const closeModal = () => {
    setSelectedCourse(undefined);
    setAction(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 text-2xl font-semibold">Курсы</h1>
          <p className="text-slate-500 text-sm mt-0.5">{courses.length} курсов в организации</p>
        </div>
        {isAdminOrOwner && (
          <button
            onClick={() => setAction('CREATE')}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors"
          >
            <Plus size={16} /> Добавить курс
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {courses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            openDetail={openDetail}
            openEdit={openEdit}
          />
        ))}
        {courses.length === 0 && (
          <div className="col-span-full text-center py-16 text-slate-400">
            <BookOpen size={40} className="mx-auto mb-3 opacity-40" />
            <p>Курсов ещё нет</p>
          </div>
        )}
      </div>

      {isAdminOrOwner && (action === 'CREATE' || action === 'EDIT') && (
        <CourseForm action={action} course={selectedCourse} closeModal={closeModal} />
      )}
      {action === 'VIEW' && selectedCourse && (
        <CourseDetailCard course={selectedCourse} closeModal={closeModal} />
      )}
    </div>
  );
}
