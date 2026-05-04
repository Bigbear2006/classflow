import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { Bell, Menu, ChevronDown } from 'lucide-react';
import { useAppContext } from '../../context.tsx';
import { Sidebar } from '../common/Sidebar.tsx';
import { roleConfig } from '../../labels/role.tsx';

export function AppLayout() {
  const { user, member } = useAppContext();

  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const roleCfg = member?.role ? roleConfig[member.role] : null;
  const upcomingCount = 10;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <aside className="hidden lg:flex flex-col w-60 bg-slate-900 flex-shrink-0">
        <Sidebar upcomingCount={upcomingCount} setSidebarOpen={setSidebarOpen} />
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-slate-900 z-50">
            <Sidebar upcomingCount={upcomingCount} setSidebarOpen={setSidebarOpen} />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-4 lg:px-6 py-3 flex items-center gap-4 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600"
          >
            <Menu size={20} />
          </button>
          <div className="flex-1" />

          {user && (
            <>
              <button
                onClick={() => navigate('/notifications')}
                className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                title="Уведомления"
              >
                <Bell size={19} />
                {upcomingCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-indigo-500 text-white text-[10px] flex items-center justify-center font-bold">
                    {upcomingCount > 9 ? '9+' : upcomingCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                ) : (
                  <div
                    className={`w-7 h-7 rounded-full ${
                      roleCfg?.color || 'bg-slate-400'
                    } flex items-center justify-center text-white text-xs font-semibold`}
                  >
                    {user.fullname.charAt(0)}
                  </div>
                )}
                <span className="text-sm text-slate-700 hidden sm:block">{user.fullname}</span>
                <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
              </button>
            </>
          )}
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
