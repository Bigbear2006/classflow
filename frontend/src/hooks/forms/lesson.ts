import { z } from 'zod';
import { useForm } from 'react-hook-form';
import type { LessonDetail } from '../../entities';
import { zodResolver } from '@hookform/resolvers/zod';
import { optionalInt, requiredInt } from './base.ts';
import { DateTime } from 'luxon';

const LessonSchema = z
  .object({
    type: z.string(),
    topic: z.string().min(1, 'Обязательное поле'),
    groupId: optionalInt(),
    courseId: optionalInt(),
    courseTeacherStudentId: optionalInt(),
    conductedById: requiredInt(),
    url: z.preprocess(
      val => (val === '' ? undefined : val),
      z.url({ error: 'Некорректный URL' }).optional(),
    ),
    cabinetId: optionalInt(),
    startDate: z.coerce.date<string>(),
    endDate: z.coerce.date<string>(),
  })
  .superRefine((data, ctx) => {
    if (data['type'] == 'GROUP' && !data['groupId']) {
      ctx.addIssue({
        code: 'custom',
        message: 'Обязательно поле',
        path: ['groupId'],
      });
    }
    if (data['type'] == 'INDIVIDUAL' && !data['courseTeacherStudentId']) {
      ctx.addIssue({
        code: 'custom',
        message: 'Обязательно поле',
        path: ['courseTeacherStudentId'],
      });
    }
    if (!data['url'] && !data['cabinetId']) {
      ctx.addIssue({
        code: 'custom',
        message: 'Нужно указать ссылку или кабинет',
        path: ['url', 'cabinetId'],
      });
    }
    if (data['startDate'] >= data['endDate']) {
      ctx.addIssue({
        code: 'custom',
        message: 'Дата начала урока должна быть раньше даты конца',
        path: ['startDate'],
      });
    }
  });

type InputLessonFields = z.input<typeof LessonSchema>;
export type OutputLessonFields = z.output<typeof LessonSchema>;

interface UseLessonFormProps {
  initialValues?: LessonDetail;
}

export const useLessonForm = (props?: UseLessonFormProps) => {
  const lesson = props?.initialValues;
  return useForm<InputLessonFields, any, OutputLessonFields>({
    resolver: zodResolver(LessonSchema),
    defaultValues: lesson
      ? {
          type: lesson.group ? 'GROUP' : 'INDIVIDUAL',
          topic: lesson.topic,
          groupId: lesson.group?.id.toString() || '',
          courseId: lesson.courseTeacherStudent?.courseTeacher.course.id.toString() || '',
          courseTeacherStudentId: lesson.courseTeacherStudent?.id.toString(),
          conductedById: lesson.conductedBy.id.toString(),
          url: lesson.url || '',
          cabinetId: lesson.cabinet?.id.toString() || '',
          startDate: DateTime.fromJSDate(lesson.startDate).toISO()!.slice(0, 16),
          endDate: DateTime.fromJSDate(lesson.endDate).toISO()!.slice(0, 16),
        }
      : { type: 'GROUP', topic: '', groupId: '', conductedById: '', cabinetId: '' },
  });
};
