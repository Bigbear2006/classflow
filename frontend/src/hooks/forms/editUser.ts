import { useForm } from 'react-hook-form';
import type { User } from '../../entities';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js';

const EditUserSchema = z
  .object({
    fullname: z.string().min(3, 'ФИО: минимум 3 символа').max(100, 'ФИО: не больше 100 символов'),
    phone: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!isValidPhoneNumber(data.phone)) {
      ctx.addIssue({
        code: 'custom',
        message: data.phone.startsWith('+')
          ? 'Неверный номер телефона'
          : 'Номер телефона должен начинаться с +',
        path: ['phone'],
      });
    }
  });

type EditUserFields = z.infer<typeof EditUserSchema>;

interface UseEditUserFormProps {
  initialValues?: User;
}

export const useEditUserForm = ({ initialValues }: UseEditUserFormProps) => {
  return useForm<EditUserFields>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: initialValues,
  });
};
