import type { OrganizationMemberDetail, UserRole } from '../../../entities';
import { roleConfig } from '../../../labels/role.tsx';
import { useUpdateOrganizationMemberForm } from '../../../hooks/forms/members.ts';
import { useUpdateOrganizationMemberMutation } from '../../../hooks/mutations/member.ts';
import { FormField } from '../../common/FormField.tsx';
import { FormButtons } from '../../common/FormButtons.tsx';
import { Modal } from '../../common/Modal.tsx';
import { ModalHeader } from '../../common/ModalHeader.tsx';

interface UpdateOrgMemberFormProps {
  member: OrganizationMemberDetail;
  closeModal: () => void;
}

export const UpdateOrgMemberForm = ({ member, closeModal }: UpdateOrgMemberFormProps) => {
  const { control, handleSubmit } = useUpdateOrganizationMemberForm({ initialValues: member });
  const mutation = useUpdateOrganizationMemberMutation({ userId: member.user.id, closeModal });

  return (
    <Modal close={closeModal}>
      <ModalHeader title="Редактировать участника" closeModal={closeModal} />
      <form onSubmit={handleSubmit(data => mutation.mutate(data))} className="p-6 space-y-4">
        <FormField
          name="role"
          control={control}
          label="Роль"
          required
          selectOptions={(['STUDENT', 'TEACHER', 'ADMIN'] as UserRole[]).map(elem => ({
            value: elem,
            label: roleConfig[elem].label,
          }))}
        />
        <FormButtons
          submitButtonText="Сохранить"
          submitButtonDisabled={mutation.isPending}
          onCancelButtonClick={closeModal}
        />
      </form>
    </Modal>
  );
};
