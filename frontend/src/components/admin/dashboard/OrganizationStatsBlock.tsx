import { BookOpen, Calendar, DollarSign, UserCheck, UserPlus, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { OrganizationStats } from '../../../entities';
import { getOrganizationStats } from '../../../api/organizations/requests.ts';
import { useNavigate } from 'react-router';

export const OrganizationStatsBlock = () => {
  const [orgStats, setOrgStats] = useState<OrganizationStats>({
    courses: 0,
    teachers: 0,
    students: 0,
    groups: 0,
    todayLessons: 0,
    totalIncome: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    getOrganizationStats().then(setOrgStats);
  }, []);

  const stats = [
    {
      label: 'Курсов',
      value: orgStats.courses,
      icon: <BookOpen size={20} />,
      color: 'bg-indigo-50 text-indigo-600',
      path: '/org/courses',
    },
    {
      label: 'Преподавателей',
      value: orgStats.teachers,
      icon: <UserCheck size={20} />,
      color: 'bg-emerald-50 text-emerald-600',
      path: '/org/members',
    },
    {
      label: 'Учеников',
      value: orgStats.students,
      icon: <Users size={20} />,
      color: 'bg-blue-50 text-blue-600',
      path: '/org/members',
    },
    {
      label: 'Групп',
      value: orgStats.groups,
      icon: <UserPlus size={20} />,
      color: 'bg-amber-50 text-amber-600',
      path: '/org/groups',
    },
    {
      label: 'Занятий сегодня',
      value: orgStats.todayLessons,
      icon: <Calendar size={20} />,
      color: 'bg-violet-50 text-violet-600',
      path: '/org/schedule',
    },
    {
      label: 'Поступления (₽)',
      value: orgStats.totalIncome.toLocaleString('ru'),
      icon: <DollarSign size={20} />,
      color: 'bg-rose-50 text-rose-600',
      path: '/org/payments',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map(s => (
        <button
          key={s.label}
          onClick={() => navigate(s.path)}
          className="bg-white rounded-2xl border border-slate-200 p-4 text-left hover:shadow-md transition-shadow"
        >
          <div className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
            {s.icon}
          </div>
          <div className="text-slate-900 text-xl font-bold">{s.value}</div>
          <div className="text-slate-500 text-xs mt-0.5">{s.label}</div>
        </button>
      ))}
    </div>
  );
};
