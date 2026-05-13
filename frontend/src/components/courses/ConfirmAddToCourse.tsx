import { X } from 'lucide-react';
import { useAddCurrentStudentToGroupMutation } from '../../hooks/mutations/group.ts';
import type { CourseDetail } from '../../entities';

interface ConfirmAddToCourseProps {
  course: CourseDetail;
  closeModal: () => void;
}

export const ConfirmAddToCourse = ({ course, closeModal }: ConfirmAddToCourseProps) => {
  const mutation = useAddCurrentStudentToGroupMutation({ closeModal });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Подтверждение записи</h2>
          <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>
        <p>Вы хотите записаться на курс {course.subject.name}?</p>
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            onClick={() => mutation.mutate(course.activeGroupId!)}
            className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors"
          >
            Записаться
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition-colors"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};
