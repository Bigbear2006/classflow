import { z } from 'zod';
import { useForm } from 'react-hook-form';
import type { LessonDetail } from '../../entities';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { optionalInt, requiredInt } from './base.ts';

const LessonSchema = z.object({
  groupId: optionalInt(),
  courseTeacherStudentId: optionalInt(),
  conductedById: requiredInt(),
  url: z.preprocess(val => (val === '' ? undefined : val), z.url().optional()),
  cabinetId: optionalInt(),
  startDate: z.coerce.date<string>(),
  endDate: z.coerce.date<string>(),
});

type InputLessonFields = z.input<typeof LessonSchema>;
export type OutputLessonFields = z.output<typeof LessonSchema>;

interface UseLessonFormProps {
  initialValues?: LessonDetail;
}

export const useLessonForm = (props?: UseLessonFormProps) => {
  const { setValue, ...rest } = useForm<InputLessonFields, any, OutputLessonFields>({
    resolver: zodResolver(LessonSchema),
  });

  useEffect(() => {
    const lesson = props?.initialValues;
    if (lesson) {
      setValue('groupId', lesson.group?.id.toString() || '');
      setValue('courseTeacherStudentId', lesson.courseTeacherStudent?.id.toString() || '');
      setValue('conductedById', lesson.conductedBy.id.toString());
      setValue('url', lesson.url || null);
      setValue('cabinetId', lesson.cabinet?.id.toString() || '');
      setValue('startDate', lesson.startDate.toISOString().slice(0, 16));
      setValue('endDate', lesson.endDate.toISOString().slice(0, 16));
    }
  }, [props?.initialValues]);

  return { setValue, ...rest };
};
