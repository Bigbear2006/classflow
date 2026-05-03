import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { OrganizationMemberDetail } from '../../entities';
import { useEffect } from 'react';

const UpdateOrganizationMemberSchema = z.object({
  role: z.enum(['STUDENT', 'TEACHER', 'ADMIN']),
});
export type UpdateOrganizationMemberFields = z.infer<typeof UpdateOrganizationMemberSchema>;

interface UseUpdateOrganizationMemberFormProps {
  initialValues: OrganizationMemberDetail;
}

export const useUpdateOrganizationMemberForm = (props: UseUpdateOrganizationMemberFormProps) => {
  const { setValue, ...rest } = useForm<UpdateOrganizationMemberFields>({
    resolver: zodResolver(UpdateOrganizationMemberSchema),
  });

  useEffect(() => {
    if (props.initialValues.role === 'OWNER') {
      throw new Error('Cannot edit owner');
    }
    setValue('role', props.initialValues.role);
  }, [props.initialValues]);

  return { setValue, ...rest };
};
