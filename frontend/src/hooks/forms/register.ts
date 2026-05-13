import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js';

const RegisterUserSchema = z
  .object({
    fullname: z.string().min(3, 'ФИО: минимум 3 символа').max(100, 'ФИО: не больше 100 символов'),
    email: z.email('Неверная почта'),
    phone: z.string(),
    password: z.string().min(8, 'Длина пароля минимум 8 символов'),
    confirmPassword: z.string(),
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

    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
      });
    }
  });

export type RegisterUserFields = z.infer<typeof RegisterUserSchema>;

export const useRegistrationForm = () => {
  return useForm<RegisterUserFields>({
    resolver: zodResolver(RegisterUserSchema),
  });
};
