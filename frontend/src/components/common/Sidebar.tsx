import {
  BookOpen,
  BookText,
  Calendar,
  DollarSign,
  GraduationCap,
  LayoutDashboard,
  LogInIcon,
  MapPin,
  School,
  TrendingUp,
  User as UserIcon,
  UserCheck,
  Users,
} from 'lucide-react';
import { NavLink } from 'react-router';
import { useAppContext } from '../../context.tsx';
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
        label: 'Индивидуальные ученики',
        path: '/individuals',
        icon: <UserIcon size={18} />,
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
        label: 'Группы',
        path: '/groups',
        icon: <GraduationCap size={18} />,
      },
      {
        label: 'Индивидуальные ученики',
        path: '/individuals',
        icon: <UserIcon size={18} />,
      },
      {
        label: 'Расписание',
        path: '/schedule',
        icon: <Calendar size={18} />,
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
        label: 'Отзывы',
        path: '/feedback',
        icon: <UserCheck size={18} />,
      },
    ];

  return [];
}

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
        </div>
      )}
    </div>
  );
};
