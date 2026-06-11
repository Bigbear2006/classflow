import type { FormAction, LessonDetail } from '../../entities';
import { X } from 'lucide-react';
import { type OutputLessonFields, useLessonForm } from '../../hooks/forms/lesson.ts';
import { useGroups } from '../../hooks/queries/group.ts';
import { useCabinets } from '../../hooks/queries/cabinet.ts';
import { useLessonMutation } from '../../hooks/mutations/lesson.ts';
import { useCourseTeachers, useIndividualCourses } from '../../hooks/queries/course.ts';
import { FormField } from '../common/FormField.tsx';
import { FormButtons } from '../common/FormButtons.tsx';
import { LessonAttendance } from './LessonAttendance.tsx';
import { useEffect } from 'react';
import { DateTime } from 'luxon';
import { CourseTypeField } from '../courses/CourseTypeField.tsx';
import { useAppContext } from '../../context.tsx';

interface LessonFormProps {
  action: FormAction;
  lesson?: LessonDetail;
  closeModal: () => void;
}

export const LessonForm = ({ action, lesson, closeModal }: LessonFormProps) => {
  const { isTeacher } = useAppContext();
  const { control, watch, setValue, handleSubmit } = useLessonForm({ initialValues: lesson });
  const type = watch('type');
  const groupId = watch('groupId') as string;
  const courseId = watch('courseId');
  const conductedById = watch('conductedById');

  const { data: groups } = useGroups();
  const groupCourseId = groups.find(group => group.id === +groupId)?.course.id!;
  const { data: teachers } = useCourseTeachers({ courseId: groupCourseId });
  const { data: cabinets } = useCabinets();
  const { data: individualCourses } = useIndividualCourses();

  const lessonMutation = useLessonMutation({ action, lessonId: lesson?.id, closeModal });
  const onSubmit = (data: OutputLessonFields) => {
    lessonMutation.mutate({
      topic: data.topic,
      conducted_by_id: data.conductedById,
      start_date: DateTime.fromJSDate(data.startDate).toJSON()!,
      end_date: DateTime.fromJSDate(data.endDate).toJSON()!,
      cabinet_id: data.cabinetId,
      url: data.url || undefined,
      group_id: data.groupId,
      course_teacher_student_id: data.courseTeacherStudentId,
    });
  };

  useEffect(() => {
    if (type === 'GROUP') {
      setValue('courseId', '');
      setValue('conductedById', '');
      setValue('courseTeacherStudentId', '');
    } else if (type === 'INDIVIDUAL') {
      setValue('groupId', '');
      setValue('conductedById', '');
    }
  }, [type]);

  useEffect(() => {
    if (teachers) {
      setValue('conductedById', lesson?.conductedBy.id.toString() || '');
    }
  }, [teachers]);

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
          <CourseTypeField control={control} />
          <FormField name="topic" control={control} label="Тема урока" />
          {type === 'GROUP' && (
            <>
              <FormField
                name="groupId"
                control={control}
                label="Группа"
                required
                selectOptions={groups.map(group => ({
                  value: group.id,
                  label: `${group.course.subject.name} — ${group.name}`,
                }))}
              />
              <FormField
                name="conductedById"
                control={control}
                label="Преподаватель"
                required
                disabled={isTeacher}
                selectOptions={teachers.map(teacher => ({
                  value: teacher.id,
                  label: teacher.user.fullname,
                }))}
              />
            </>
          )}
          {type === 'INDIVIDUAL' && (
            <>
              <FormField
                name="courseId"
                control={control}
                label="Курс"
                required
                selectOptions={individualCourses.map(course => ({
                  value: course.id,
                  label: course.subject.name,
                }))}
              />
              <FormField
                name="conductedById"
                control={control}
                label="Преподаватель"
                required
                disabled={isTeacher}
                selectOptions={
                  individualCourses
                    .find(course => course.id.toString() === courseId)
                    ?.teachers.map(courseTeacher => ({
                      value: courseTeacher.teacher.id,
                      label: courseTeacher.teacher.user.fullname,
                    })) || []
                }
              />
              <FormField
                name="courseTeacherStudentId"
                control={control}
                label="Ученик"
                required
                selectOptions={
                  individualCourses
                    .find(course => course.id.toString() === courseId)
                    ?.teachers.find(
                      courseTeacher => courseTeacher.teacher.id.toString() === conductedById,
                    )
                    ?.students.map(courseTeacherStudent => ({
                      value: courseTeacherStudent.id,
                      label: courseTeacherStudent.student.user.fullname,
                    })) || []
                }
              />
            </>
          )}
          <FormField
            name="url"
            control={control}
            label="Ссылка на занятие"
            placeholder="https://"
            type="url"
          />
          <FormField
            name="cabinetId"
            control={control}
            label="Кабинет"
            selectOptions={cabinets.map(cabinet => ({
              value: cabinet.id,
              label: `${cabinet.number} (${cabinet.address.address})`,
            }))}
            allowEmptySelect
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              name="startDate"
              control={control}
              label="Начало"
              required
              type="datetime-local"
            />
            <FormField
              name="endDate"
              control={control}
              label="Конец"
              required
              type="datetime-local"
            />
          </div>
          {action === 'EDIT' &&
            lesson &&
            lesson.endDate <= DateTime.now().setZone('Europe/Moscow').toJSDate() && (
              <LessonAttendance lesson={lesson} />
            )}
          <FormButtons
            submitButtonText={action === 'CREATE' ? 'Создать' : 'Сохранить'}
            submitButtonDisabled={lessonMutation.isPending}
            onCancelButtonClick={closeModal}
          />
        </form>
      </div>
    </div>
  );
};
