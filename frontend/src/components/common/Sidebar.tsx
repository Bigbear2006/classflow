import {
  ArrowLeftRight,
  Bell,
  BookOpen,
  BookText,
  Calendar,
  DollarSign,
  GraduationCap,
  LayoutDashboard,
  LogInIcon,
  LogOut,
  MapPin,
  School,
  TrendingUp,
  User as UserIcon,
  UserCheck,
  Users,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router';
import { useAppContext } from '../../context.tsx';
import { logoutUser } from '../../api/users/requests.ts';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { roleConfig } from '../../labels/role.tsx';
import type { User } from '../../entities';

interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
  end?: boolean;
}

function getNavItems(role?: string, user?: User): NavItem[] {
  if (!user) {
    return [
      {
        label: 'Войти',
        path: '/login',
        icon: <LogInIcon size={18} />,
      },
      {
        label: 'Зарегистрироваться',
        path: '/register',
        icon: <UserIcon size={18} />,
      },
    ];
  }

  if (role === 'OWNER' || role === 'ADMIN')
    return [
      {
        label: 'Дашборд',
        path: '/',
        icon: <LayoutDashboard size={18} />,
        end: true,
      },
      { label: 'Участники', path: '/members', icon: <Users size={18} /> },
      {
        label: 'Предметы',
        path: '/subjects',
        icon: <BookText size={18} />,
      },
      { label: 'Курсы', path: '/courses', icon: <BookOpen size={18} /> },
      { label: 'Адреса', path: '/addresses', icon: <MapPin size={18} /> },
      {
        label: 'Группы',
        path: '/groups',
        icon: <GraduationCap size={18} />,
      },
      {
        label: 'Расписание',
        path: '/schedule',
        icon: <Calendar size={18} />,
      },
      {
        label: 'Оплаты',
        path: '/payments',
        icon: <DollarSign size={18} />,
      },
    ];

  if (role === 'TEACHER')
    return [
      {
        label: 'Дашборд',
        path: '/',
        icon: <LayoutDashboard size={18} />,
        end: true,
      },
      {
        label: 'Расписание',
        path: '/schedule',
        icon: <Calendar size={18} />,
      },
      {
        label: 'Мои курсы',
        path: '/courses/my',
        icon: <BookOpen size={18} />,
      },
      {
        label: 'Перенос занятий',
        path: '/lesson-transfers',
        icon: <ArrowLeftRight size={18} />,
      },
    ];

  if (role === 'STUDENT')
    return [
      {
        label: 'Дашборд',
        path: '/',
        icon: <LayoutDashboard size={18} />,
        end: true,
      },
      {
        label: 'Каталог курсов',
        path: '/courses',
        icon: <BookOpen size={18} />,
      },
      {
        label: 'Расписание',
        path: '/schedule',
        icon: <Calendar size={18} />,
      },
      {
        label: 'Прогресс',
        path: '/progress',
        icon: <TrendingUp size={18} />,
      },
      {
        label: 'Оплаты',
        path: '/payments',
        icon: <DollarSign size={18} />,
      },
      {
        label: 'Преподаватели',
        path: '/teachers',
        icon: <UserCheck size={18} />,
      },
    ];

  return [];
}

interface SidebarProps {
  upcomingCount: number;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar = ({ upcomingCount, setSidebarOpen }: SidebarProps) => {
  const { user, member, organization } = useAppContext();
  const navigate = useNavigate();

  const navItems = getNavItems(member?.role, user);
  const roleCfg = member?.role ? roleConfig[member.role] : null;

  const handleLogout = () => {
    logoutUser().then(() => navigate('/login'));
  };

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
              {organization?.slug ? `/${organization.slug}` : 'Платформа обучения'}
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

      {user && (
        <div className="px-3 py-3 border-t border-slate-700/50 space-y-0.5">
          <NavLink
            to="/orgs"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                isActive
                  ? 'bg-indigo-500/20 text-indigo-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
              }`
            }
          >
            <LayoutDashboard size={18} />
            <span>Мои организации</span>
          </NavLink>
          <NavLink
            to="/notifications"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                isActive
                  ? 'bg-indigo-500/20 text-indigo-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
              }`
            }
          >
            <div className="relative">
              <Bell size={18} />
              {upcomingCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-indigo-500 text-white text-[9px] flex items-center justify-center font-bold">
                  {upcomingCount > 9 ? '9+' : upcomingCount}
                </span>
              )}
            </div>
            <span>Уведомления</span>
          </NavLink>
          <NavLink
            to="/profile"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                isActive
                  ? 'bg-indigo-500/20 text-indigo-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
              }`
            }
          >
            <UserIcon size={18} />
            <span>Профиль</span>
          </NavLink>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-150"
          >
            <LogOut size={18} />
            <span>Выйти</span>
          </button>
        </div>
      )}

      {user && (
        <div className="px-4 py-3 border-t border-slate-700/50">
          <div className="flex items-center gap-3">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt=""
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div
                className={`w-8 h-8 rounded-full ${
                  roleCfg?.color || 'bg-slate-600'
                } flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}
              >
                {user.fullname.charAt(0) || '?'}
              </div>
            )}
            <div className="min-w-0">
              <div className="text-white text-xs font-medium truncate">{user.fullname}</div>
              <div className="text-slate-400 text-xs truncate">{user.email}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
