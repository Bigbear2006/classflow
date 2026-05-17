import { useAddCurrentStudentToGroupMutation } from '../../hooks/mutations/group.ts';
import type { CourseDetail } from '../../entities';
import { Modal } from '../common/Modal.tsx';
import { ModalHeader } from '../common/ModalHeader.tsx';

interface ConfirmAddToCourseProps {
  course: CourseDetail;
  closeModal: () => void;
}

export const ConfirmAddToCourse = ({ course, closeModal }: ConfirmAddToCourseProps) => {
  const mutation = useAddCurrentStudentToGroupMutation({ closeModal });

  return (
    <Modal close={closeModal}>
      <ModalHeader title="Подтверждение записи" closeModal={closeModal} />
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
    </Modal>
  );
};
