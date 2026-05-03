import { Building2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';
import { EditUserForm } from '../components/profile/EditUserForm.tsx';
import { ChangeUserPassword } from '../components/profile/ChangeUserPassword.tsx';
import { logoutUser } from '../api/users/requests.ts';
import { roleColors, roleLabels } from '../labels/role.tsx';
import { useAppContext } from '../context.tsx';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, member, organization } = useAppContext();
  // const [notifs, setNotifs] = useState({ email: true, push: true });

  const handleLogout = () => {
    logoutUser().then(() => navigate('/login'));
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-slate-900 text-2xl font-semibold">Профиль</h1>
        <p className="text-slate-500 text-sm mt-0.5">Управление аккаунтом</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div
            className={`w-16 h-16 rounded-2xl ${roleColors[member!.role]} flex items-center justify-center text-white text-2xl font-bold flex-shrink-0`}
          >
            {user!.fullname.charAt(0) || '?'}
          </div>
          <div>
            <h2 className="text-slate-900 font-semibold text-xl">{user!.fullname}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${roleColors[member!.role]}`}
              >
                {roleLabels[member!.role]}
              </span>
              {organization && (
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Building2 size={12} /> {organization.name}
                </span>
              )}
            </div>
          </div>
        </div>
        <EditUserForm user={user!} />
      </div>
      <ChangeUserPassword />

      {/*<div className="bg-white rounded-2xl border border-slate-200 p-6">*/}
      {/*  <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">*/}
      {/*    <Bell size={18} />*/}
      {/*    Уведомления*/}
      {/*  </h3>*/}
      {/*  <div className="space-y-3">*/}
      {/*    {[*/}
      {/*      { key: 'email' as const, label: 'Email-уведомления' },*/}
      {/*      { key: 'push' as const, label: 'Push-уведомления' },*/}
      {/*    ].map(item => (*/}
      {/*      <div key={item.key} className="flex items-center justify-between">*/}
      {/*        <span className="text-sm text-slate-900">{item.label}</span>*/}
      {/*        <button*/}
      {/*          onClick={() =>*/}
      {/*            setNotifs(prev => ({*/}
      {/*              ...prev,*/}
      {/*              [item.key]: !prev[item.key],*/}
      {/*            }))*/}
      {/*          }*/}
      {/*          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifs[item.key] ? 'bg-indigo-600' : 'bg-slate-200'}`}*/}
      {/*        >*/}
      {/*          <span*/}
      {/*            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifs[item.key] ? 'translate-x-6' : 'translate-x-1'}`}*/}
      {/*          />*/}
      {/*        </button>*/}
      {/*      </div>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className="flex gap-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
        >
          <LogOut size={16} /> Выйти
        </button>
      </div>
    </div>
  );
}
