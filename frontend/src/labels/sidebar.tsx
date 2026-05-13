import type { ReactNode } from 'react';
import type { User } from '../entities';
import {
  BookOpen,
  BookText,
  Building2,
  Calendar,
  DollarSign,
  GraduationCap,
  LayoutDashboard,
  LogInIcon,
  MapPin,
  TrendingUp,
  User as UserIcon,
  UserCheck,
  Users,
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
  end?: boolean;
}

const myOrgs = {
  label: 'Мои организации',
  path: '/orgs',
  icon: <Building2 size={19} />,
};
const individualStudents = {
  label: 'Индивидуальные',
  path: '/individuals',
  icon: <UserIcon size={18} />,
};

export const getNavItems = (role?: string, user?: User): NavItem[] => {
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
      individualStudents,
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
      myOrgs,
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
      individualStudents,
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

  return [myOrgs];
};
