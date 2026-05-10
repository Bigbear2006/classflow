import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Subject } from '../../entities';

const SubjectSchema = z.object({
  name: z.string().min(1, 'Обязательное поле'),
  description: z.string().min(1, 'Обязательное поле'),
  image: z.preprocess(
    val => (val instanceof FileList ? val[0] : val),
    z.instanceof(File).optional(),
  ),
});

type InputSubjectFields = z.input<typeof SubjectSchema>;
export type OutputSubjectFields = z.output<typeof SubjectSchema>;

interface UseSubjectFormProps {
  initialValues?: Subject;
}

export const useSubjectForm = (props?: UseSubjectFormProps) => {
  return useForm<InputSubjectFields, any, OutputSubjectFields>({
    resolver: zodResolver(SubjectSchema),
    defaultValues: {
      name: props?.initialValues?.name,
      description: props?.initialValues?.description,
    },
  });
};
