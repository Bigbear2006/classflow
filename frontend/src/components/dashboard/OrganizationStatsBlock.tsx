import { BookOpen, Calendar, DollarSign, UserCheck, UserPlus, Users } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useOrganizationStats } from '../../hooks/queries/organization.ts';

export const OrganizationStatsBlock = () => {
  const { data: orgStats } = useOrganizationStats();
  const navigate = useNavigate();

  const stats = [
    {
      label: 'Курсов',
      value: orgStats.courses,
      icon: <BookOpen size={20} />,
      color: 'bg-indigo-50 text-indigo-600',
      path: '/courses',
    },
    {
      label: 'Преподавателей',
      value: orgStats.teachers,
      icon: <UserCheck size={20} />,
      color: 'bg-emerald-50 text-emerald-600',
      path: '/members',
    },
    {
      label: 'Учеников',
      value: orgStats.students,
      icon: <Users size={20} />,
      color: 'bg-blue-50 text-blue-600',
      path: '/members',
    },
    {
      label: 'Групп',
      value: orgStats.groups,
      icon: <UserPlus size={20} />,
      color: 'bg-amber-50 text-amber-600',
      path: '/groups',
    },
    {
      label: 'Занятий сегодня',
      value: orgStats.todayLessons,
      icon: <Calendar size={20} />,
      color: 'bg-violet-50 text-violet-600',
      path: '/schedule',
    },
    {
      label: 'Поступления (₽)',
      value: orgStats.totalIncome.toLocaleString('ru'),
      icon: <DollarSign size={20} />,
      color: 'bg-rose-50 text-rose-600',
      path: '/payments',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map(s => (
        <button
          key={s.label}
          onClick={() => navigate({ to: s.path })}
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
