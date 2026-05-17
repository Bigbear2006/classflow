import { CalendarDays, Check, ShieldCheck, X } from 'lucide-react';
import { useAttendanceStats } from '../../../hooks/queries/attendance.ts';

export const AttendanceStatsBlock = () => {
  const { data: attendanceStats } = useAttendanceStats();
  const stats = [
    {
      label: 'Занятий всего',
      value: attendanceStats.total,
      icon: <CalendarDays size={18} />,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      label: 'Присутствовал',
      value: attendanceStats.present,
      icon: <Check size={18} />,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'По уважительной причине',
      value: attendanceStats.excused,
      icon: <ShieldCheck size={18} />,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      label: 'Пропустил',
      value: attendanceStats.absent,
      icon: <X size={18} />,
      color: 'bg-red-50 text-red-600',
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
