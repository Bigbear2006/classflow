import { Check, Minus, X } from 'lucide-react';
import type { AttendanceDetail } from '../../../entities';
import {displayShortMonth, displayTime} from '../../../labels/date.ts';
import { displayAttendanceStatus, getAttendanceStatusStyles } from '../../../labels/attendance.ts';

interface AttendanceCardProps {
  attendance: AttendanceDetail;
}

export const AttendanceCard = ({ attendance }: AttendanceCardProps) => {
  let course;
  if (attendance.lesson.group) {
    course = attendance.lesson.group.course
  } else if (attendance.lesson.courseTeacherStudent) {
    course = attendance.lesson.courseTeacherStudent.courseTeacher.course
  }

  return (
    <div key={attendance.id} className="flex items-center gap-4 px-5 py-3.5">
      <div className="w-10 h-10 rounded-xl bg-slate-100 flex flex-col items-center justify-center flex-shrink-0">
        <span className="text-slate-700 text-xs font-bold leading-none">
          {attendance.lesson.startDate.getDate()}
        </span>
        <span className="text-slate-400 text-[9px]">
          {displayShortMonth(attendance.lesson.startDate)}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-slate-900">{course?.subject.name || ''}: {attendance.lesson.topic}</div>
        <div className="text-xs text-slate-400">{displayTime(attendance.lesson.startDate)}</div>
      </div>
      <span
        className={`text-xs px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 ${getAttendanceStatusStyles(attendance.status)}`}
      >
        {attendance.status === 'PRESENT' ? (
          <Check size={12} />
        ) : attendance.status === 'ABSENT' ? (
          <X size={12} />
        ) : (
          <Minus size={12} />
        )}
        {displayAttendanceStatus(attendance.status)}
      </span>
    </div>
  );
};
