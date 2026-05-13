import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const LoginUserSchema = z.object({
  email: z.email('Неверный email'),
  password: z.string().min(1, 'Пароль обязателен'),
});

export type LoginUserFields = z.infer<typeof LoginUserSchema>;

export const useLoginForm = () => {
  return useForm<LoginUserFields>({ resolver: zodResolver(LoginUserSchema) });
};
