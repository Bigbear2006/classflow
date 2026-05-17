import type { FormAction, Subject } from '../../../entities';
import { X } from 'lucide-react';
import { useSubjectForm } from '../../../hooks/forms/subject.ts';
import { useSubjectMutation } from '../../../hooks/mutations/subject.ts';
import { FormField } from '../../common/FormField.tsx';

interface SubjectFormProps {
  action: FormAction;
  subject?: Subject;
  closeModal: () => void;
}

export const SubjectForm = ({ action, subject, closeModal }: SubjectFormProps) => {
  const { control, handleSubmit } = useSubjectForm({ initialValues: subject });

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
          <FormField name="name" control={control} label="Название" required />
          <FormField name="description" control={control} label="Описание" required isTextArea />
          <FormField name="image" control={control} label="Обложка" required type="file" />
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
