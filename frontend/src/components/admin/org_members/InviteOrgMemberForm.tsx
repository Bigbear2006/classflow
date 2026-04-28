import { AlertCircle, Mail, UserPlus } from 'lucide-react';
import { inviteOrganizationMember } from '../../../api/organizations/requests.ts';
import { useForm } from 'react-hook-form';
import type { UserRole } from '../../../types.ts';

interface InviteOrgMemberFields {
  email: string;
  role: UserRole;
}

export const InviteOrgMemberForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<InviteOrgMemberFields>();

  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5">
      <h3 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
        <UserPlus size={16} /> Добавить участника
      </h3>
      <p className="text-xs text-indigo-700 mb-3">
        Пользователь должен быть зарегистрирован в системе.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
          <input
            {...register('email')}
            type="email"
            placeholder="email@example.com"
            className="w-full pl-8 pr-3 py-2.5 border border-indigo-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select
          {...register('role')}
          className="px-3 py-2.5 border border-indigo-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="STUDENT">Ученик</option>
          <option value="TEACHER">Преподаватель</option>
          <option value="ADMIN">Администратор</option>
        </select>
        <button
          onClick={handleSubmit(inviteOrganizationMember)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors whitespace-nowrap"
        >
          Добавить
        </button>
      </div>
      {Object.values(errors).map(error => (
        <p className="text-red-600 text-xs mt-2 flex items-center gap-1">
          <AlertCircle size={12} />
          {error.message}
        </p>
      ))}
      {true && <p className="text-emerald-600 text-xs mt-2">✓ {'ENIDNEINDIE'}</p>}
    </div>
  );
};
