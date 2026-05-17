import { User, Users } from 'lucide-react';
import { attendanceStatusConfig } from '../../labels/attendance.ts';
import type {
  AttendanceStatus,
  LessonDetail,
  OrganizationMemberWithAttendance,
} from '../../entities';
import { useLessonStudents } from '../../hooks/queries/lesson.ts';
import { useBulkCreateAttendanceMutation } from '../../hooks/mutations/attendance.ts';
import { useEffect, useRef, useState } from 'react';
import { useDebouncedValue } from '../../hooks/useDebouncedValue.ts';

interface LessonAttendanceProps {
  lesson: LessonDetail;
}

const groupAttendanceList = (students: OrganizationMemberWithAttendance[]) => {
  const map: Record<number, AttendanceStatus> = {};
  for (const student of students) {
    if (student.attendanceStatus) {
      map[student.id] = student.attendanceStatus;
    }
  }
  return map;
};

export const LessonAttendance = ({ lesson }: LessonAttendanceProps) => {
  const { data: students } = useLessonStudents({ lessonId: lesson.id });
  const attendanceMutation = useBulkCreateAttendanceMutation({ lessonId: lesson?.id! });

  const [attendanceList, setAttendanceList] = useState<Record<number, AttendanceStatus>>({});
  const debouncedAttendanceList = useDebouncedValue(attendanceList, 2000);

  const attendanceListInitializedRef = useRef(false);
  const skipMutationRef = useRef(true);

  const saveAttendance = (
    _attendanceList: Record<number, AttendanceStatus>,
    _lessonId: number,
  ) => {
    attendanceMutation.mutate({
      attendance_list: Array.from(Object.entries(_attendanceList)).map(([studentId, status]) => ({
        student_id: +studentId,
        status,
      })),
      lesson_id: _lessonId,
    });
  };

  useEffect(() => {
    if (students.length === 0 || attendanceListInitializedRef.current) {
      return;
    }
    attendanceListInitializedRef.current = true;
    setAttendanceList(groupAttendanceList(students));
  }, [students]);

  useEffect(() => {
    if (!lesson || Object.keys(debouncedAttendanceList).length === 0) {
      return;
    }
    if (skipMutationRef.current) {
      skipMutationRef.current = false;
      return;
    }
    saveAttendance(debouncedAttendanceList, lesson.id);
  }, [debouncedAttendanceList]);
  return (
    <div>
      <h3 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
        {lesson?.group ? <Users size={16} /> : <User size={16} />}
        Посещаемость ({students.length})
      </h3>
      <div className="space-y-2">
        {students.map(student => (
          <div
            key={student.id}
            className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-medium text-slate-600">
                {student.user.fullname.charAt(0)}
              </div>
              <span className="text-sm text-slate-900">{student.user.fullname}</span>
            </div>
            <div className="flex gap-1">
              {attendanceStatusConfig.map(({ status, shortLabel, color }) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => {
                    setAttendanceList(prev => ({
                      ...prev,
                      [student.id]: status as AttendanceStatus,
                    }));
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                    attendanceList[student.id] === status
                      ? color
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {shortLabel}
                </button>
              ))}
            </div>
          </div>
        ))}
        {students.length === 0 && <p className="text-sm text-slate-400">Учеников нет</p>}
      </div>
    </div>
  );
};
