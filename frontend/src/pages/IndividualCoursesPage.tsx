import { BookOpen } from 'lucide-react';
import { useIndividualCourses } from '../hooks/queries/course.ts';
import { IndividualCourseCard } from '../components/individual/IndividualCourseCard.tsx';

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
          <IndividualCourseCard course={course} />
        ))}
      </div>
    </div>
  );
};
