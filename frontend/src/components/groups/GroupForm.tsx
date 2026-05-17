import type { GroupDetail, ModalAction } from '../../entities';
import { type OutputGroupFields, useGroupForm } from '../../hooks/forms/group.ts';
import { useCourses } from '../../hooks/queries/course.ts';
import { useCabinets } from '../../hooks/queries/cabinet.ts';
import { useGroupMutation } from '../../hooks/mutations/group.ts';
import { FormField } from '../common/FormField.tsx';
import { FormButtons } from '../common/FormButtons.tsx';
import { ModalHeader } from '../common/ModalHeader.tsx';
import { Modal } from '../common/Modal.tsx';

interface GroupFormProps {
  action: ModalAction;
  group?: GroupDetail;
  closeModal: () => void;
}

export const GroupForm = ({ action, group, closeModal }: GroupFormProps) => {
  const { control, handleSubmit } = useGroupForm({ initialValues: group });

  const { data: courses } = useCourses({ type: 'INDIVIDUAL' });
  const { data: cabinets } = useCabinets();
  const mutation = useGroupMutation({
    action: action,
    groupId: group?.id,
    closeModal: closeModal,
  });

  const onSubmit = (data: OutputGroupFields) =>
    mutation.mutate({
      name: data.name,
      course_id: data.courseId,
      max_users_count: data.maxUsersCount,
      default_cabinet_id: data.defaultCabinetId !== 0 ? data.defaultCabinetId : undefined,
    });

  return (
    <Modal close={closeModal}>
      <ModalHeader
        title={action === 'CREATE' ? 'Новая группа' : 'Редактировать группу'}
        closeModal={closeModal}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
        <FormField
          name="courseId"
          control={control}
          label="Курс"
          required
          selectOptions={courses.map(course => ({
            value: course.id,
            label: course.subject.name,
          }))}
        />
        <FormField
          name="name"
          control={control}
          label="Название группы"
          placeholder="Группа 1"
          required
        />
        <FormField
          name="defaultCabinetId"
          control={control}
          label="Кабинет по умолчанию"
          selectOptions={cabinets.map(cabinet => ({
            value: cabinet.id,
            label: `${cabinet.number} (${cabinet.address.address})`,
          }))}
          allowEmptySelect
        />
        <FormField
          name="maxUsersCount"
          control={control}
          label="Максимум учеников"
          placeholder="20"
          required
          type="number"
        />
        <FormButtons
          submitButtonText={action === 'CREATE' ? 'Создать' : 'Сохранить'}
          submitButtonDisabled={mutation.isPending}
          onCancelButtonClick={closeModal}
        />
      </form>
    </Modal>
  );
};
