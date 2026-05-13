import { BookOpen, User } from 'lucide-react';
import { courseTeacherStatusConfig } from '../../labels/course.tsx';
import type { CourseTeacherStatus, IndividualCourseTeacher } from '../../entities';
import { CourseTeacherStudentCard } from './CourseTeacherStudentCard.tsx';
import { useAppContext } from '../../context.tsx';
import { useUpdateCourseTeacherMutation } from '../../hooks/mutations/course.ts';

interface CourseTeacherCardProps {
  courseTeacher: IndividualCourseTeacher;
}

export const CourseTeacherCard = ({ courseTeacher }: CourseTeacherCardProps) => {
  const { isTeacher } = useAppContext();
  const updateCourseTeacherMutation = useUpdateCourseTeacherMutation();

  return (
    <div className="flex flex-col gap-3 p-5 border-t border-slate-100">
      <h3 className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1.5">
        <BookOpen size={14} /> {courseTeacher.teacher.user.fullname}
      </h3>
      <div className="flex gap-1">
        {courseTeacherStatusConfig
          .filter(cfg => !isTeacher || cfg.status !== 'DELETED')
          .map(({ status, label, color }) => (
            <button
              key={status}
              type="button"
              onClick={() =>
                updateCourseTeacherMutation.mutate({
                  course_id: courseTeacher.courseId,
                  teacher_id: courseTeacher.teacher.id,
                  status: status as CourseTeacherStatus,
                })
              }
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                courseTeacher.status === status
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
        {...courseTeacher.students.map(courseTeacherStudent => (
          <CourseTeacherStudentCard
            courseTeacher={courseTeacher}
            courseTeacherStudent={courseTeacherStudent}
          />
        ))}
      </div>
    </div>
  );
};
