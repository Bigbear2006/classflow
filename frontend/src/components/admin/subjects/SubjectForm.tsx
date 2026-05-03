import type { FormAction, Subject } from '../../../entities';
import { X } from 'lucide-react';
import { useSubjectForm } from '../../../hooks/forms/subject.ts';
import { useSubjectMutation } from '../../../hooks/mutations/subject.ts';

interface SubjectFormProps {
  action: FormAction;
  subject?: Subject;
  closeModal: () => void;
}

export const SubjectForm = ({ action, subject, closeModal }: SubjectFormProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useSubjectForm();

  const mutation = useSubjectMutation({
    action: action,
    subjectId: subject?.id,
    closeModal: closeModal,
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
          <h2 className="font-semibold text-slate-900">
            {action === 'CREATE' ? 'Новый предмет' : 'Редактировать предмет'}
          </h2>
          <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit(data => mutation.mutate(data))} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Название</label>
            <input
              {...register('name')}
              className={`w-full px-3 py-2.5 border ${errors.name ? 'border-red-200' : 'border-slate-200'} rounded-xl text-sm focus:outline-none focus:ring-2 ${errors.name ? 'focus:ring-red-500' : 'focus:ring-indigo-500'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Описание</label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Обложка (URL)
            </label>
            <input
              {...register('image')}
              type="url"
              placeholder="https://..."
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors"
            >
              {action === 'CREATE' ? 'Создать' : 'Сохранить'}
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
