import { Building2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';
import { EditUserForm } from '../components/profile/EditUserForm.tsx';
import { ChangeUserPassword } from '../components/profile/ChangeUserPassword.tsx';
import { roleColors, roleLabels } from '../labels/role.tsx';
import { useAppContext } from '../context.tsx';
import { useLogoutUserMutation } from '../hooks/mutations/user.ts';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, member, organization } = useAppContext();
  const logoutMutation = useLogoutUserMutation({ navigate });

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-slate-900 text-2xl font-semibold">Профиль</h1>
        <p className="text-slate-500 text-sm mt-0.5">Управление аккаунтом</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div
            className={`w-16 h-16 rounded-2xl ${member?.role ? roleColors[member!.role] : 'bg-amber-500'} flex items-center justify-center text-white text-2xl font-bold flex-shrink-0`}
          >
            {user?.fullname.charAt(0) || '?'}
          </div>
          <div>
            <h2 className="text-slate-900 font-semibold text-xl">{user?.fullname}</h2>
            <div className="flex items-center gap-2 mt-1">
              {member?.role && (
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${roleColors[member!.role]}`}
                >
                  {roleLabels[member.role]}
                </span>
              )}
              {organization && (
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Building2 size={12} /> {organization.name}
                </span>
              )}
            </div>
          </div>
        </div>
        {user && <EditUserForm user={user} />}
      </div>
      <ChangeUserPassword />
      <div className="flex gap-3">
        <button
          onClick={() => logoutMutation.mutate()}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
        >
          <LogOut size={16} /> Выйти
        </button>
      </div>
    </div>
  );
};
