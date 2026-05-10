import { Calendar, Check, TrendingUp, X } from 'lucide-react';
import { getRateStyles } from '../../../labels/attendance.ts';

export const ProgressStatsBlock = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/*TODO: add*/}
      {[
        {
          label: 'Занятий всего',
          value: 0,
          icon: <Calendar size={18} />,
          color: 'bg-indigo-50 text-indigo-600',
        },
        {
          label: 'Посещаемость',
          value: `${0}%`,
          icon: <TrendingUp size={18} />,
          color: getRateStyles(0),
        },
        {
          label: 'Присутствовал',
          value: 0,
          icon: <Check size={18} />,
          color: 'bg-emerald-50 text-emerald-600',
        },
        {
          label: 'Пропустил',
          value: 0,
          icon: <X size={18} />,
          color: 'bg-red-50 text-red-600',
        },
      ].map(s => (
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
