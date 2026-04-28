import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const CreateAddressSchema = z.object({
  address: z.string(),
});

type CreateAddressFields = z.infer<typeof CreateAddressSchema>;

export const useAddressForm = () => {
  return useForm<CreateAddressFields>({ resolver: zodResolver(CreateAddressSchema) });
};
