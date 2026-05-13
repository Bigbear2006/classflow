import { School } from 'lucide-react';
import { NavLink } from 'react-router';
import { useAppContext } from '../../context.tsx';
import type { Dispatch, SetStateAction } from 'react';
import { roleConfig } from '../../labels/role.tsx';
import { getNavItems } from '../../labels/sidebar.tsx';

interface SidebarProps {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar = ({ setSidebarOpen }: SidebarProps) => {
  const { user, member, organization } = useAppContext();

  const navItems = getNavItems(member?.role, user);
  const roleCfg = member?.role ? roleConfig[member.role] : null;

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-5 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center flex-shrink-0">
            <School size={20} className="text-white" />
          </div>
          <div className="min-w-0">
            <div className="text-white text-sm font-semibold leading-tight truncate">
              {organization?.name || 'ClassFlow'}
            </div>
            <div className="text-slate-400 text-xs">
              {organization?.slug ? `${organization.slug}` : 'Платформа обучения'}
            </div>
          </div>
        </div>
      </div>

      {member?.role && roleCfg && (
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
            <div
              className={`w-5 h-5 rounded flex items-center justify-center text-white ${roleCfg.color}`}
            >
              {roleCfg.icon}
            </div>
            <span className="text-white text-xs font-medium">{roleCfg.label}</span>
          </div>
        </div>
      )}

      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                isActive
                  ? 'bg-indigo-500/20 text-indigo-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
