import { BookOpen, Calendar, DollarSign, School, TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router';

const actions = [
  {
    label: 'Добавить курс',
    icon: <BookOpen size={18} />,
    path: '/courses',
    color: 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100',
  },
  {
    label: 'Участники',
    icon: <Users size={18} />,
    path: '/members',
    color: 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100',
  },
  {
    label: 'Расписание',
    icon: <Calendar size={18} />,
    path: '/schedule',
    color: 'text-violet-600 bg-violet-50 hover:bg-violet-100',
  },
  {
    label: 'Оплаты',
    icon: <DollarSign size={18} />,
    path: '/payments',
    color: 'text-rose-600 bg-rose-50 hover:bg-rose-100',
  },
  {
    label: 'Группы',
    icon: <TrendingUp size={18} />,
    path: '/groups',
    color: 'text-amber-600 bg-amber-50 hover:bg-amber-100',
  },
  {
    label: 'Адреса',
    icon: <School size={18} />,
    path: '/addresses',
    color: 'text-sky-600 bg-sky-50 hover:bg-sky-100',
  },
];

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h2 className="font-semibold text-slate-900 mb-4">Быстрые действия</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map(item => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-2 p-3 rounded-xl text-sm font-medium transition-colors ${item.color}`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
