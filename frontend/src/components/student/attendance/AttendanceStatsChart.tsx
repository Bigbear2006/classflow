import type { AttendanceStats } from '../../../entities';
import { getRateColor } from '../../../labels/attendance.ts';

export const AttendanceStatsChart = () => {
  let stats: AttendanceStats = {
    total: 0,
    present: 0,
    absent: 0,
    excused: 0,
  };
  const rate = stats.total !== 0 ? (stats.present / stats.total) * 100 : 0;
  const rateColor = getRateColor(rate);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h2 className="font-semibold text-slate-900 mb-5">Сводка посещаемости</h2>
      <div className="flex items-center gap-6">
        <div className="relative w-32 h-32 flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f1f5f9" strokeWidth="3.5" />
            {stats.total > 0 && (
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="none"
                stroke="#4F46E5"
                strokeWidth="3.5"
                strokeDasharray={`${rate} ${100 - rate}`}
                strokeLinecap="round"
              />
            )}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-2xl font-bold ${rateColor}`}>{rate}%</div>
            <div className="text-xs text-slate-400">Посещ.</div>
          </div>
        </div>
        <div className="space-y-3 flex-1">
          {[
            {
              label: 'Присутствовал',
              count: stats.present,
              color: 'bg-indigo-500',
            },
            { label: 'Пропустил', count: stats.absent, color: 'bg-red-500' },
            {
              label: 'Уваж. причина',
              count: stats.excused,
              color: 'bg-amber-500',
            },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2 text-sm">
              <div className={`w-3 h-3 rounded-sm ${item.color} flex-shrink-0`} />
              <span className="text-slate-600 flex-1">{item.label}</span>
              <span className="font-semibold text-slate-900">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
