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

const dashboard = {
  label: 'Дашборд',
  path: '/',
  icon: <LayoutDashboard size={18} />,
  end: true,
};

const groups = {
  label: 'Группы',
  path: '/groups',
  icon: <GraduationCap size={18} />,
};

const individualStudents = {
  label: 'Индивидуальные',
  path: '/individuals',
  icon: <UserIcon size={18} />,
};

const schedule = {
  label: 'Расписание',
  path: '/schedule',
  icon: <Calendar size={18} />,
};

const payments = {
  label: 'Оплаты',
  path: '/payments',
  icon: <DollarSign size={18} />,
};

export const getNavItems = (role?: string, user?: User | null): NavItem[] => {
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
      dashboard,
      { label: 'Участники', path: '/members', icon: <Users size={18} /> },
      {
        label: 'Предметы',
        path: '/subjects',
        icon: <BookText size={18} />,
      },
      { label: 'Курсы', path: '/courses', icon: <BookOpen size={18} /> },
      { label: 'Адреса', path: '/addresses', icon: <MapPin size={18} /> },
      groups,
      individualStudents,
      schedule,
      payments,
      myOrgs,
    ];

  if (role === 'TEACHER') return [dashboard, groups, individualStudents, schedule, myOrgs];

  if (role === 'STUDENT')
    return [
      dashboard,
      {
        label: 'Каталог курсов',
        path: '/courses',
        icon: <BookOpen size={18} />,
      },
      schedule,
      {
        label: 'Посещаемость',
        path: '/attendance',
        icon: <TrendingUp size={18} />,
      },
      payments,
      myOrgs,
    ];

  return [myOrgs];
};
