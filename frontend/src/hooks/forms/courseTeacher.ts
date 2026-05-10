import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { requiredInt } from './base.ts';

const SelectCourseTeacherSchema = z.object({
  teacherId: requiredInt(),
});

export type InputSelectCourseTeacherFields = z.input<typeof SelectCourseTeacherSchema>;
export type OutputSelectCourseTeacherFields = z.output<typeof SelectCourseTeacherSchema>;

export const useSelectCourseTeacherForm = () => {
  return useForm<InputSelectCourseTeacherFields, any, OutputSelectCourseTeacherFields>({
    resolver: zodResolver(SelectCourseTeacherSchema),
  });
};
