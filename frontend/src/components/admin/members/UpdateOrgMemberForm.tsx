import { X } from 'lucide-react';
import type { OrganizationMemberDetail, UserRole } from '../../../entities';
import { roleConfig } from '../../../labels/role.tsx';
import { useUpdateOrganizationMemberForm } from '../../../hooks/forms/members.ts';
import { useUpdateOrganizationMemberMutation } from '../../../hooks/mutations/member.ts';

interface UpdateOrgMemberFormProps {
  member: OrganizationMemberDetail;
  closeModal: () => void;
}

export const UpdateOrgMemberForm = ({ member, closeModal }: UpdateOrgMemberFormProps) => {
  const { register, handleSubmit } = useUpdateOrganizationMemberForm({ initialValues: member });
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
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Роль</label>
            <select
              {...register('role')}
              className="px-3 py-2.5 w-full border border-indigo-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {(['STUDENT', 'TEACHER', 'ADMIN'] as UserRole[]).map(r => (
                <option
                  key={r}
                  value={r}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50"
                >
                  {roleConfig[r].label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors"
            >
              Сохранить
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
