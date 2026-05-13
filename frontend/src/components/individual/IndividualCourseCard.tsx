import { CourseTeacherCard } from './CourseTeacherCard.tsx';
import type { IndividualCourse } from '../../entities';

interface IndividualCourseCardProps {
  course: IndividualCourse;
}

export const IndividualCourseCard = ({ course }: IndividualCourseCardProps) => {
  return (
    <div key={course.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="flex items-center gap-4 p-5 border-b border-slate-100">
        <img
          src={course.subject.image}
          alt=""
          className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
        />
        <div className="flex-1">
          <h2 className="font-semibold text-slate-900">{course.subject.name}</h2>
          <p className="text-xs text-slate-500">
            {course.price.toLocaleString('ru')} ₽ / занятие · {course.lessonDuration.as('minutes')}{' '}
            мин
          </p>
        </div>
      </div>
      {course.teachers.map(courseTeacher => (
        <CourseTeacherCard courseTeacher={courseTeacher} />
      ))}
    </div>
  );
};
