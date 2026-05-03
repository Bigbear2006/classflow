import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const OrganizationSchema = z.object({
  name: z.string().min(1, 'Обязательное поле'),
  slug: z
    .string()
    .min(3, 'Минимум 3 символа')
    .max(50, 'Максимум 50 символов')
    .regex(/^[a-z0-9]+(?:a-z0-9+)*/, { error: 'Только латинские буквы, цифры и дефис' }),
});
export type OrganizationFields = z.infer<typeof OrganizationSchema>;

export const useOrganizationForm = () => {
  return useForm<OrganizationFields>({ resolver: zodResolver(OrganizationSchema) });
};
