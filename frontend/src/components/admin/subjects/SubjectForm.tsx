import type { FormAction, Subject } from '../../../entities';
import { useSubjectForm } from '../../../hooks/forms/subject.ts';
import { useSubjectMutation } from '../../../hooks/mutations/subject.ts';
import { FormField } from '../../common/FormField.tsx';
import { Modal } from '../../common/Modal.tsx';
import { ModalHeader } from '../../common/ModalHeader.tsx';
import { FormButtons } from '../../common/FormButtons.tsx';

interface SubjectFormProps {
  action: FormAction;
  subject?: Subject;
  closeModal: () => void;
}

export const SubjectForm = ({ action, subject, closeModal }: SubjectFormProps) => {
  const { register, control, handleSubmit } = useSubjectForm({ initialValues: subject });

  const mutation = useSubjectMutation({
    action: action,
    subjectId: subject?.id,
    closeModal: closeModal,
  });

  return (
    <Modal close={closeModal}>
      <ModalHeader
        title={action === 'CREATE' ? 'Новый предмет' : 'Редактировать предмет'}
        closeModal={closeModal}
      />
      <form onSubmit={handleSubmit(data => mutation.mutate(data))} className="p-6 space-y-4">
        <FormField name="name" control={control} label="Название" required />
        <FormField name="description" control={control} label="Описание" required isTextArea />
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Обложка</label>
          <input
            {...register('image')}
            type="file"
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <FormButtons
          submitButtonText={action === 'CREATE' ? 'Создать' : 'Сохранить'}
          submitButtonDisabled={mutation.isPending}
          onCancelButtonClick={closeModal}
        />
      </form>
    </Modal>
  );
};
