import { BookOpen, Calendar, Clock, DollarSign } from 'lucide-react';
import { useStudentStats } from '../../../hooks/queries/organization.ts';

export const StudentStatsBlock = () => {
  const { data: studentStats } = useStudentStats();
  const stats = [
    {
      label: 'Моих курсов',
      value: studentStats.courses,
      icon: <BookOpen size={18} />,
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      label: 'Проведено занятий',
      value: studentStats.completedLessons,
      icon: <Clock size={18} />,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      label: 'Занятий сегодня',
      value: studentStats.todayLessons,
      icon: <Calendar size={18} />,
      color: 'text-violet-600 bg-violet-50',
    },
    {
      label: 'Оплачено ₽',
      value: studentStats.totalPaid,
      icon: <DollarSign size={18} />,
      color: 'text-amber-600 bg-amber-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map(s => (
        <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
            {s.icon}
          </div>
          <div className="text-2xl font-bold text-slate-900">{s.value}</div>
          <div className="text-slate-500 text-xs mt-0.5">{s.label}</div>
        </div>
      ))}
    </div>
  );
};
