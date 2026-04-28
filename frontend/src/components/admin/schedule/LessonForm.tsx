import type { CourseTeacherStudent, FormAction, LessonDetail } from '../../../types.ts';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { type OutputLessonFields, useLessonForm } from '../../../hooks/forms/lesson.ts';
import { useGroups } from '../../../hooks/queries/group.ts';
import { useCabinets } from '../../../hooks/queries/cabinet.ts';
import { useCurrentOrganizationTeachers } from '../../../hooks/queries/organization.ts';
import { useLessonMutation } from '../../../hooks/mutations/lesson.ts';

interface LessonFormProps {
  action: FormAction;
  lesson?: LessonDetail;
  closeModal: () => void;
}

export const LessonForm = ({ action, lesson, closeModal }: LessonFormProps) => {
  const { register, getValues, handleSubmit } = useLessonForm({ initialValues: lesson });
  const { data: groups } = useGroups();
  const [courseTeacherStudents, setCourseTeacherStudents] = useState<CourseTeacherStudent[]>([]);
  const { data: teachers } = useCurrentOrganizationTeachers();
  const { data: cabinets } = useCabinets();

  const mutation = useLessonMutation({ action, lessonId: lesson?.id, closeModal });
  const onSubmit = (data: OutputLessonFields) => {
    console.log(data);
    mutation.mutate({
      conducted_by_id: data.conductedById,
      start_date: data.startDate.toISOString(),
      end_date: data.endDate.toISOString(),
      cabinet_id: data.cabinetId,
      url: data.url || undefined,
      group_id: data.groupId,
      course_teacher_student_id: data.courseTeacherStudentId,
    });
  };

  useEffect(() => {
    setCourseTeacherStudents([]);
  }, []);

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
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Группа</label>
            <select
              {...register('groupId')}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">— Нет (индивидуальное) —</option>
              {groups.map(group => (
                <option key={group.id} value={group.id}>
                  {group.course.subject.name} — {group.name}
                </option>
              ))}
            </select>
          </div>
          {!getValues('groupId') && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Индивидуальная запись
              </label>
              <select
                {...register('courseTeacherStudentId')}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Выберите</option>
                {courseTeacherStudents.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.courseTeacher.course.subject.name} — {student.student.fullname}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Преподаватель
            </label>
            <select
              {...register('conductedById')}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Выберите</option>
              {teachers.map(teacher => (
                <option key={teacher.user.id} value={teacher.user.id}>
                  {teacher.user.fullname}
                </option>
              ))}
            </select>
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
