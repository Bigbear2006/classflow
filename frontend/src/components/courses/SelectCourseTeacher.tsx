import { X } from 'lucide-react';
import { useAddCurrentStudentToCourseMutation } from '../../hooks/mutations/course.ts';
import { useCourseTeachers } from '../../hooks/queries/course.ts';
import {
  type OutputSelectCourseTeacherFields,
  useSelectCourseTeacherForm,
} from '../../hooks/forms/courseTeacher.ts';

interface SelectCourseTeacherProps {
  courseId: number;
  closeModal: () => void;
}

export const SelectCourseTeacher = ({ courseId, closeModal }: SelectCourseTeacherProps) => {
  const { register, handleSubmit } = useSelectCourseTeacherForm();
  const { data: teachers } = useCourseTeachers({ courseId });

  const mutation = useAddCurrentStudentToCourseMutation({ closeModal });
  const onSubmit = (data: OutputSelectCourseTeacherFields) =>
    mutation.mutate({
      courseId: courseId,
      teacherId: data.teacherId,
    });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Выберите учителя</h2>
          <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Учитель</label>
            <select
              {...register('teacherId')}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.user.fullname}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors"
            >
              Записаться на курс
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition-colors"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
