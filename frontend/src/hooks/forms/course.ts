import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import type { Course } from '../../entities';
import { optionalInt, requiredInt } from './base.ts';

const CourseSchema = z.object({
  subjectId: requiredInt(),
  type: z.string(),
  price: requiredInt(),
  paymentType: z.string(),
  lessonType: z.string(),
  lessonDuration: requiredInt(),
  lessonsCount: optionalInt(),
  duration: optionalInt(),
});

type InputCourseFields = z.input<typeof CourseSchema>;
export type OutputCourseFields = z.output<typeof CourseSchema>;

interface UseCourseFormProps {
  initialValues?: Course;
}

export const useCourseForm = (props?: UseCourseFormProps) => {
  const { setValue, ...rest } = useForm<InputCourseFields, any, OutputCourseFields>({
    resolver: zodResolver(CourseSchema),
  });

  useEffect(() => {
    const course = props?.initialValues;
    if (course) {
      setValue('subjectId', course.subject.id.toString());
      setValue('type', course.type);
      setValue('price', course.price.toString());
      setValue('paymentType', course.paymentType);
      setValue('lessonType', course.lessonType);
      setValue('lessonDuration', course.lessonDuration.as('minutes').toString());
      setValue('lessonsCount', course.lessonsCount?.toString() || '');
      setValue('duration', course.duration?.as('months').toString() || '');
    }
  }, [props?.initialValues]);

  return { setValue, ...rest };
};
