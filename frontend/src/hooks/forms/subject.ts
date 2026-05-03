import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import type { Subject } from '../../entities';

const SubjectSchema = z.object({
  name: z.string().min(1, 'Обязательное поле'),
  description: z.string().min(1, 'Обязательное поле'),
  image: z.string().min(1, 'Обязательное поле'),
});

export type SubjectFields = z.infer<typeof SubjectSchema>;

interface UseSubjectFormProps {
  initialValues?: Subject;
}

export const useSubjectForm = (props?: UseSubjectFormProps) => {
  const { setValue, ...rest } = useForm<SubjectFields>({ resolver: zodResolver(SubjectSchema) });

  useEffect(() => {
    const subject = props?.initialValues;
    if (subject) {
      setValue('name', subject.name);
      setValue('description', subject.description);
      setValue('image', subject.image);
    }
  }, [props?.initialValues]);

  return { setValue, ...rest };
};
