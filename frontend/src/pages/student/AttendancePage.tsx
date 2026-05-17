import { TrendingUp } from 'lucide-react';
import { AttendanceStatsBlock } from '../../components/student/attendance/AttendanceStatsBlock.tsx';
import { AttendanceStatsChart } from '../../components/student/attendance/AttendanceStatsChart.tsx';
import { LessonsByWeeks } from '../../components/student/attendance/LessonsByWeeks.tsx';
import { CourseAttendance } from '../../components/student/attendance/CourseAttendance.tsx';
import { AttendanceCard } from '../../components/student/attendance/AttendanceCard.tsx';
import { useCoursesAttendanceStats, useMyAttendance } from '../../hooks/queries/attendance.ts';

export const AttendancePage = () => {
  const { data: attendanceList } = useMyAttendance();
  const { data: coursesAttendance } = useCoursesAttendanceStats();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-slate-900 text-2xl font-semibold">Прогресс и посещаемость</h1>
        <p className="text-slate-500 text-sm mt-0.5">Статистика за всё время обучения</p>
      </div>
      <AttendanceStatsBlock />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceStatsChart />
        <LessonsByWeeks />
      </div>

      <div>
        <h2 className="font-semibold text-slate-900 mb-4">Посещаемость по курсам</h2>
        <div className="space-y-4">
          {coursesAttendance.map(stats => (
            <CourseAttendance stats={stats} />
          ))}
          {coursesAttendance.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <TrendingUp size={32} className="mx-auto mb-2 opacity-40" />
              <p>Вы ещё не записаны ни на один курс</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">История посещений</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {attendanceList.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">Нет завершённых занятий</div>
          ) : (
            attendanceList.map(attendance => <AttendanceCard attendance={attendance} />)
          )}
        </div>
      </div>
    </div>
  );
};
