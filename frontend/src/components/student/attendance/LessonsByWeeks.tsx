import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { WeekAttendanceStats } from '../../../entities';
import { displayShortDate } from '../../../labels/date.ts';

export const LessonsByWeeks = () => {
  const weekAttendance: WeekAttendanceStats[] = [{ week: new Date(), present: 0 }];
  const weeklyMap: Record<string, number> = {};
  weekAttendance.forEach(elem => (weeklyMap[displayShortDate(elem.week)] = elem.present));
  const weeklyData = Object.entries(weeklyMap)
    .slice(-6)
    .map(([week, present]) => ({ week, present }));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h2 className="font-semibold text-slate-900 mb-5">Занятий по неделям</h2>
      {weeklyData.length > 0 ? (
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={weeklyData}>
            <XAxis
              dataKey="week"
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: '1px solid #e2e8f0',
                fontSize: 12,
              }}
            />
            <Bar dataKey="present" name="Занятий" fill="#4F46E5" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-40 text-slate-400 text-sm">
          Нет данных о проведённых занятиях
        </div>
      )}
    </div>
  );
};
