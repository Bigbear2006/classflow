import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const CreateCabinetSchema = z.object({
  number: z.string(),
});

type CreateCabinetFields = z.infer<typeof CreateCabinetSchema>;

export const useCabinetForm = () => {
  return useForm<CreateCabinetFields>({
    resolver: zodResolver(CreateCabinetSchema),
  });
};
