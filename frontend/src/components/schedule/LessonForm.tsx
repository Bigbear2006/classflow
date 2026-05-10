import type {
  AttendanceStatus,
  FormAction,
  LessonDetail,
  OrganizationMemberWithAttendance,
} from '../../entities';
import { User, Users, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { type OutputLessonFields, useLessonForm } from '../../hooks/forms/lesson.ts';
import { useGroups } from '../../hooks/queries/group.ts';
import { useCabinets } from '../../hooks/queries/cabinet.ts';
import { useLessonMutation } from '../../hooks/mutations/lesson.ts';
import { useLessonStudents } from '../../hooks/queries/lesson.ts';
import { attendanceStatusConfig } from '../../labels/attendance.ts';
import { useBulkCreateAttendanceMutation } from '../../hooks/mutations/attendance.ts';
import { useDebouncedValue } from '../../hooks/useDebouncedValue.ts';
import { useCourseTeachers, useIndividualCourses } from '../../hooks/queries/course.ts';

interface LessonFormProps {
  action: FormAction;
  lesson?: LessonDetail;
  closeModal: () => void;
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

export const LessonForm = ({ action, lesson, closeModal }: LessonFormProps) => {
  const { register, watch, handleSubmit } = useLessonForm({ initialValues: lesson });
  const type = watch('type');
  const groupId = watch('groupId');
  const courseId = watch('courseId');
  const conductedById = watch('conductedById');

  const { data: groups } = useGroups();
  const groupCourseId = groups.find(group => group.id === +groupId)?.course.id!;
  const { data: teachers } = useCourseTeachers({ courseId: groupCourseId });
  const { data: cabinets } = useCabinets();
  const { data: students } = useLessonStudents({ lessonId: lesson?.id! });
  const { data: individualCourses } = useIndividualCourses();
  const attendanceMutation = useBulkCreateAttendanceMutation({ lessonId: lesson?.id! });

  const [attendanceList, setAttendanceList] = useState<Record<number, AttendanceStatus>>({});
  const debouncedAttendanceList = useDebouncedValue(attendanceList, 2000);

  const attendanceListInitializedRef = useRef(false);
  const skipMutationRef = useRef(true);

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
    attendanceMutation.mutate(
      Array.from(Object.entries(debouncedAttendanceList)).map(([studentId, status]) => ({
        lesson_id: lesson.id,
        student_id: +studentId,
        status,
      })),
    );
  }, [debouncedAttendanceList]);

  const lessonMutation = useLessonMutation({ action, lessonId: lesson?.id, closeModal });
  const onSubmit = (data: OutputLessonFields) => {
    lessonMutation.mutate({
      conducted_by_id: data.conductedById,
      start_date: data.startDate.toISOString(),
      end_date: data.endDate.toISOString(),
      cabinet_id: data.cabinetId,
      url: data.url || undefined,
      group_id: data.groupId,
      course_teacher_student_id: data.courseTeacherStudentId,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md max-h-[92vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-100 sticky top-0 bg-white">
          <h2 className="font-semibold text-slate-900">
            {action === 'CREATE' ? 'Новое занятие' : 'Редактировать занятие'}
          </h2>
          <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Тип</label>
            <select
              {...register('type')}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Выбрать</option>
              <option value="INDIVIDUAL">Индивидуальный</option>
              <option value="GROUP">Групповой</option>
            </select>
          </div>
          {type === 'GROUP' && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Группа</label>
                <select
                  {...register('groupId')}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option key="" value="">
                    Выбрать
                  </option>
                  {groups.map(group => (
                    <option key={group.id} value={group.id}>
                      {group.course.subject.name} — {group.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Преподаватель
                </label>
                <select
                  {...register('conductedById')}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {teachers.map(teacher => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.user.fullname}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          {type === 'INDIVIDUAL' && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Курс</label>
                <select
                  {...register('courseId')}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option key="" value="">
                    Выбрать
                  </option>
                  {individualCourses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.subject.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Преподаватель
                </label>
                <select
                  {...register('conductedById')}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option key="" value="">
                    Выбрать
                  </option>
                  {individualCourses
                    .find(course => course.id.toString() === courseId)
                    ?.teachers.map(courseTeacher => (
                      <option key={courseTeacher.teacher.id} value={courseTeacher.teacher.id}>
                        {courseTeacher.teacher.user.fullname}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Ученик</label>
                <select
                  {...register('courseTeacherStudentId')}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {individualCourses
                    .find(course => course.id.toString() === courseId)
                    ?.teachers.find(
                      courseTeacher => courseTeacher.teacher.id.toString() === conductedById,
                    )
                    ?.students.map(courseTeacherStudent => (
                      <option key={courseTeacherStudent.id} value={courseTeacherStudent.id}>
                        {courseTeacherStudent.student.user.fullname}
                      </option>
                    ))}
                </select>
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Ссылка на занятие
            </label>
            <input
              {...register('url')}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Кабинет</label>
            <select
              {...register('cabinetId')}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Выберите</option>
              {cabinets.map(cabinet => (
                <option key={cabinet.id} value={cabinet.id}>
                  {cabinet.number}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Дата начала
              </label>
              <input
                {...register('startDate')}
                type="datetime-local"
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Дата окончания
              </label>
              <input
                {...register('endDate')}
                type="datetime-local"
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {/*<div>*/}
            {/*  <label className="block text-sm font-medium text-slate-700 mb-1.5">*/}
            {/*    Время*/}
            {/*  </label>*/}
            {/*  <input*/}
            {/*    type="time"*/}
            {/*    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"*/}
            {/*  />*/}
            {/*</div>*/}
          </div>
          {/*<div className="grid grid-cols-2 gap-4">*/}
          {/*  <div>*/}
          {/*    <label className="block text-sm font-medium text-slate-700 mb-1.5">*/}
          {/*      Длительность (мин)*/}
          {/*    </label>*/}
          {/*    <input*/}
          {/*      {...register('duration')}*/}
          {/*      type="number"*/}
          {/*      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*  <div>*/}
          {/*    <label className="block text-sm font-medium text-slate-700 mb-1.5">*/}
          {/*      Статус*/}
          {/*    </label>*/}
          {/*    <select*/}
          {/*      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"*/}
          {/*    >*/}
          {/*      <option value="SCHEDULED">Запланировано</option>*/}
          {/*      <option value="COMPLETED">Проведено</option>*/}
          {/*      <option value="CANCELLED">Отменено</option>*/}
          {/*    </select>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div>*/}
          {/*  <label className="block text-sm font-medium text-slate-700 mb-1.5">*/}
          {/*    Тема (необязательно)*/}
          {/*  </label>*/}
          {/*  <input*/}
          {/*    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"*/}
          {/*  />*/}
          {/*</div>*/}
          {students && attendanceList && (
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
          )}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium"
            >
              {action === 'CREATE' ? 'Создать' : 'Сохранить'}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
