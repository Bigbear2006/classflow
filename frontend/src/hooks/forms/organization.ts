import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { MyOrganization } from '../../entities';

const RESERVED_SUBDOMAINS = ['www', 'app', 'api', 'auth', 'admin', 'mail', 'service', '_dmarc'];

const OrganizationSchema = z
  .object({
    name: z.string().min(1, 'Обязательное поле'),
    slug: z.preprocess(
      value => (typeof value === 'string' ? value.trim().toLowerCase() : value),
      z
        .string()
        .min(3, 'Минимум 3 символа')
        .max(50, 'Максимум 50 символов')
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { error: 'Только латинские буквы, цифры и дефис' }),
    ),
  })
  .superRefine((data, ctx) => {
    if (RESERVED_SUBDOMAINS.includes(data.slug)) {
      ctx.addIssue({
        code: 'custom',
        path: ['slug'],
        message: `Адрес "${data.slug}" запрещен`,
      });
    }
  });

type InputOrganizationFields = z.input<typeof OrganizationSchema>;
export type OutputOrganizationFields = z.infer<typeof OrganizationSchema>;

interface UseOrganizationFormProps {
  initialValues?: MyOrganization;
}

export const useOrganizationForm = (props?: UseOrganizationFormProps) => {
  return useForm<InputOrganizationFields, any, OutputOrganizationFields>({
    resolver: zodResolver(OrganizationSchema),
    defaultValues: props?.initialValues,
  });
};
