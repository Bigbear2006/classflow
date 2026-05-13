import { getStudentStatusConfig } from '../../labels/lesson.tsx';
import type {
  IndividualCourseTeacher,
  IndividualCourseTeacherStudent,
  StudentStatus,
} from '../../entities';
import { useUpdateCourseTeacherStudentMutation } from '../../hooks/mutations/course.ts';

interface CourseTeacherStudentCardProps {
  courseTeacher: IndividualCourseTeacher;
  courseTeacherStudent: IndividualCourseTeacherStudent;
}

export const CourseTeacherStudentCard = ({
  courseTeacher,
  courseTeacherStudent,
}: CourseTeacherStudentCardProps) => {
  const { id, student, status: studentStatus } = courseTeacherStudent;
  const updateCourseTeacherStudentMutation = useUpdateCourseTeacherStudentMutation();

  return (
    <div key={id} className="flex flex-col gap-3 border border-slate-200 rounded-xl p-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-medium">
          {student.user.fullname.charAt(0)}
        </div>
        <div>
          <div className="font-medium text-sm text-slate-900">{student.user.fullname}</div>
          <div className="text-xs text-slate-400">{student.user.email}</div>
        </div>
      </div>
      <div className="flex gap-1 flex-wrap">
        {getStudentStatusConfig(studentStatus).map(({ status, label, color }) => (
          <button
            key={status}
            type="button"
            onClick={() =>
              updateCourseTeacherStudentMutation.mutate({
                course_id: courseTeacher.courseId,
                teacher_id: courseTeacher.teacher.id,
                student_id: student.id,
                status: status as StudentStatus,
              })
            }
            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
              studentStatus === status
                ? color
                : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
