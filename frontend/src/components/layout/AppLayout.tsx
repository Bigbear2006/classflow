import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import type { ReactNode } from 'react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  DollarSign,
  Bell,
  User as UserIcon,
  LogOut,
  Menu,
  ChevronDown,
  MapPin,
  GraduationCap,
  School,
  Crown,
  Shield,
  UserCheck,
  TrendingUp,
  ArrowLeftRight,
  BookText,
} from 'lucide-react';
import type { Organization, OrganizationMember, User } from '../../types.ts';
import { getUser, logoutUser } from '../../api/user.ts';
import {
  getCurrentOrganization,
  getOrganizationMember,
} from '../../api/organization.ts';

interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
  end?: boolean;
}

function getNavItems(role: string | null): NavItem[] {
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
      // {
      //   label: 'Преподаватели',
      //   path: '/teachers',
      //   icon: <UserCheck size={18} />,
      // },
    ];

  if (role === 'TEACHER' || role === 'STUDENT') {
    return [
      {
        label: 'Главная',
        path: '/',
        icon: <LayoutDashboard size={18} />,
        end: true,
      },
    ];
  }

  if (role === 'TEACHER')
    return [
      {
        label: 'Дашборд',
        path: '/teacher',
        icon: <LayoutDashboard size={18} />,
        end: true,
      },
      {
        label: 'Расписание',
        path: '/teacher/schedule',
        icon: <Calendar size={18} />,
      },
      {
        label: 'Мои курсы',
        path: '/teacher/courses',
        icon: <BookOpen size={18} />,
      },
      {
        label: 'Перенос занятий',
        path: '/teacher/transfers',
        icon: <ArrowLeftRight size={18} />,
      },
    ];

  if (role === 'STUDENT')
    return [
      {
        label: 'Дашборд',
        path: '/student',
        icon: <LayoutDashboard size={18} />,
        end: true,
      },
      {
        label: 'Каталог курсов',
        path: '/student/catalog',
        icon: <BookOpen size={18} />,
      },
      {
        label: 'Расписание',
        path: '/student/schedule',
        icon: <Calendar size={18} />,
      },
      {
        label: 'Прогресс',
        path: '/student/progress',
        icon: <TrendingUp size={18} />,
      },
      {
        label: 'Оплаты',
        path: '/student/payments',
        icon: <DollarSign size={18} />,
      },
      {
        label: 'Преподаватели',
        path: '/student/teachers',
        icon: <UserCheck size={18} />,
      },
    ];

  return [
    // {
    //   label: 'Главная',
    //   path: '/',
    //   icon: <LayoutDashboard size={18} />,
    //   end: true,
    // },
  ];
}

const roleConfig: Record<
  string,
  { label: string; color: string; icon: ReactNode }
> = {
  OWNER: {
    label: 'Владелец',
    color: 'bg-violet-500',
    icon: <Crown size={12} />,
  },
  ADMIN: {
    label: 'Администратор',
    color: 'bg-blue-500',
    icon: <Shield size={12} />,
  },
  TEACHER: {
    label: 'Преподаватель',
    color: 'bg-emerald-500',
    icon: <UserCheck size={12} />,
  },
  STUDENT: {
    label: 'Ученик',
    color: 'bg-amber-500',
    icon: <GraduationCap size={12} />,
  },
};

export function AppLayout() {
  const [user, setUser] = useState<User>({
    id: 0,
    fullname: '',
    email: '',
    phone: '',
    password: '',
    createdAt: '',
  });
  const [member, setMember] = useState<OrganizationMember>({
    id: 0,
    organizationId: 0,
    userId: 0,
    role: 'STUDENT',
    createdAt: new Date(),
  });
  const [org, setOrg] = useState<Organization>({
    id: 0,
    name: '',
    slug: '',
    createdById: 0,
    createdAt: new Date(),
  });

  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = getNavItems(member.id !== 0 ? member.role : null);
  const roleCfg = member.role ? roleConfig[member.role] : null;

  const upcomingCount = 10;

  const handleLogout = () => {
    logoutUser().then(() => navigate('/login'));
  };

  useEffect(() => {
    getUser().then(setUser);
    getOrganizationMember().then(setMember);
    getCurrentOrganization().then(setOrg);
  }, []);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-5 py-5 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center flex-shrink-0">
            <School size={20} className="text-white" />
          </div>
          <div className="min-w-0">
            <div className="text-white text-sm font-semibold leading-tight truncate">
              {org.name || 'ClassFlow'}
            </div>
            <div className="text-slate-400 text-xs">
              {org.slug ? `/${org.slug}` : 'Платформа обучения'}
            </div>
          </div>
        </div>
      </div>

      {member.role && roleCfg && (
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
            <div
              className={`w-5 h-5 rounded flex items-center justify-center text-white ${roleCfg.color}`}
            >
              {roleCfg.icon}
            </div>
            <span className="text-white text-xs font-medium">
              {roleCfg.label}
            </span>
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

      <div className="px-3 py-3 border-t border-slate-700/50 space-y-0.5">
        {member.role && (
          <NavLink
            to="/"
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
        )}
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
            <div className="text-white text-xs font-medium truncate">
              {user.fullname}
            </div>
            <div className="text-slate-400 text-xs truncate">{user.email}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <aside className="hidden lg:flex flex-col w-60 bg-slate-900 flex-shrink-0">
        <SidebarContent />
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-slate-900 z-50">
            <SidebarContent />
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
              <img
                src={user.avatar}
                alt=""
                className="w-7 h-7 rounded-full object-cover"
              />
            ) : (
              <div
                className={`w-7 h-7 rounded-full ${
                  roleCfg?.color || 'bg-slate-400'
                } flex items-center justify-center text-white text-xs font-semibold`}
              >
                {user.fullname.charAt(0) || '?'}
              </div>
            )}
            <span className="text-sm text-slate-700 hidden sm:block">
              {user.fullname.split(' ')[1] || user.fullname}
            </span>
            <ChevronDown
              size={14}
              className="text-slate-400 hidden sm:block"
            />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
