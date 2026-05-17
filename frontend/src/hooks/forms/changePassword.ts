import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const ChangeUserPasswordSchema = z
  .object({
    oldPassword: z.string(),
    newPassword: z.string().min(8, 'Длина пароля минимум 8 символов'),
    confirmNewPassword: z.string().min(8, 'Длина пароля минимум 8 символов'),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmNewPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Пароли не совпадают',
        path: ['confirmNewPassword'],
      });
    }
  });

export type ChangeUserPasswordFields = z.infer<typeof ChangeUserPasswordSchema>;

export const useChangePasswordForm = () => {
  return useForm<ChangeUserPasswordFields>({ resolver: zodResolver(ChangeUserPasswordSchema) });
};
