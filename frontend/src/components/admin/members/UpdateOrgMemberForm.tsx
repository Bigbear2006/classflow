import { X } from 'lucide-react';
import type { OrganizationMemberDetail, UserRole } from '../../../entities';
import { roleConfig } from '../../../labels/role.tsx';
import { useUpdateOrganizationMemberForm } from '../../../hooks/forms/members.ts';
import { useUpdateOrganizationMemberMutation } from '../../../hooks/mutations/member.ts';
import { FormField } from '../../common/FormField.tsx';
import { FormButtons } from '../../common/FormButtons.tsx';

interface UpdateOrgMemberFormProps {
  member: OrganizationMemberDetail;
  closeModal: () => void;
}

export const UpdateOrgMemberForm = ({ member, closeModal }: UpdateOrgMemberFormProps) => {
  const { control, handleSubmit } = useUpdateOrganizationMemberForm({ initialValues: member });
  const mutation = useUpdateOrganizationMemberMutation({ userId: member.user.id, closeModal });

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
          <h2 className="font-semibold text-slate-900">Редактировать участника</h2>
          <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>
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
          <FormButtons submitButtonText="Сохранить" onCancelButtonClick={closeModal} />
        </form>
      </div>
    </div>
  );
};
