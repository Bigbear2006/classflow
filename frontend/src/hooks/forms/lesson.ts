import { z } from 'zod';
import { useForm } from 'react-hook-form';
import type { LessonDetail } from '../../entities';
import { zodResolver } from '@hookform/resolvers/zod';
import { optionalInt, requiredInt } from './base.ts';

const LessonSchema = z
  .object({
    type: z.string(),
    groupId: optionalInt(),
    courseId: optionalInt(),
    courseTeacherStudentId: optionalInt(),
    conductedById: requiredInt(),
    url: z.preprocess(val => (val === '' ? undefined : val), z.url().optional()),
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
          groupId: lesson.group?.id.toString() || '',
          courseId: lesson.courseTeacherStudent?.courseTeacher.course.id.toString() || '',
          courseTeacherStudentId: lesson.courseTeacherStudent?.id.toString(),
          conductedById: lesson.conductedBy.id.toString(),
          url: lesson.url,
          cabinetId: lesson.cabinet?.id.toString() || '',
          startDate: lesson.startDate.toISOString().slice(0, 16),
          endDate: lesson.endDate.toISOString().slice(0, 16),
        }
      : { type: 'GROUP' },
  });
};
