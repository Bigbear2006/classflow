import { useAddCurrentStudentToCourseMutation } from '../../hooks/mutations/course.ts';
import { useCourseTeachers } from '../../hooks/queries/course.ts';
import {
  type OutputSelectCourseTeacherFields,
  useSelectCourseTeacherForm,
} from '../../hooks/forms/courseTeacher.ts';
import { FormField } from '../common/FormField.tsx';
import { FormButtons } from '../common/FormButtons.tsx';
import { Modal } from '../common/Modal.tsx';
import { ModalHeader } from '../common/ModalHeader.tsx';

interface SelectCourseTeacherProps {
  courseId: number;
  closeModal: () => void;
}

export const SelectCourseTeacher = ({ courseId, closeModal }: SelectCourseTeacherProps) => {
  const { control, handleSubmit } = useSelectCourseTeacherForm();
  const { data: teachers } = useCourseTeachers({ courseId, params: { exclude_paused: true } });

  const mutation = useAddCurrentStudentToCourseMutation({ closeModal });
  const onSubmit = (data: OutputSelectCourseTeacherFields) =>
    mutation.mutate({
      courseId: courseId,
      teacherId: data.teacherId,
    });

  return (
    <Modal close={closeModal}>
      <ModalHeader title="Выберите учителя" closeModal={closeModal} />
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
        <FormField
          name="teacherId"
          control={control}
          label="Учитель"
          required
          selectOptions={teachers.map(teacher => ({
            value: teacher.id,
            label: teacher.user.fullname,
          }))}
        />
        <FormButtons
          submitButtonText="Записаться на курс"
          submitButtonDisabled={mutation.isPending}
          onCancelButtonClick={closeModal}
        />
      </form>
    </Modal>
  );
};
