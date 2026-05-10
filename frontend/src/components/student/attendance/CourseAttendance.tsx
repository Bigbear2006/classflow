import { getRateColor } from '../../../labels/attendance.ts';
import type { CourseAttendanceStats } from '../../../entities';

interface CourseAttendanceProps {
  stats: CourseAttendanceStats;
}

export const CourseAttendance = ({ stats }: CourseAttendanceProps) => {
  const rateColor = getRateColor(stats.rate);
  return (
    <div
      key={stats.group?.id || stats.teacher?.id}
      className="bg-white rounded-2xl border border-slate-200 p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="font-medium text-slate-900">{stats.course.subject.name}</div>
          <div className="text-xs text-slate-400">
            {stats.group?.name || stats.teacher?.user.fullname} · {stats.conductedLessons} занятий
            проведено
          </div>
        </div>
        <span className={`text-lg font-bold ${rateColor}`}>{stats.rate}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${rateColor}`}
          style={{ width: `${stats.rate}%` }}
        />
      </div>
      <div className="text-xs text-slate-400 mt-1.5">
        {stats.presentLessons} из {stats.conductedLessons} занятий
      </div>
    </div>
  );
};
