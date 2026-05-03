import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { GroupDetail } from '../../entities';
import { useEffect } from 'react';
import { z } from 'zod';
import { optionalInt, requiredInt } from './base.ts';

const GroupSchema = z.object({
  courseId: requiredInt(),
  name: z.string().min(1, 'Обязательное поле'),
  defaultCabinetId: optionalInt(),
  maxUsersCount: requiredInt(),
});

type InputGroupFields = z.input<typeof GroupSchema>;
export type OutputGroupFields = z.infer<typeof GroupSchema>;

interface UseGroupFormProps {
  initialValues?: GroupDetail;
}

export const useGroupForm = (props?: UseGroupFormProps) => {
  const { setValue, ...rest } = useForm<InputGroupFields, any, OutputGroupFields>({
    resolver: zodResolver(GroupSchema),
  });

  useEffect(() => {
    const group = props?.initialValues;
    if (group) {
      setValue('name', group.name);
      setValue('courseId', group.course.id.toString());
      setValue('defaultCabinetId', group.defaultCabinet?.id.toString() || '');
      setValue('maxUsersCount', group.maxUsersCount.toString());
    }
  }, [props?.initialValues]);

  return { setValue, ...rest };
};
