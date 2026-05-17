import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Address } from '../../entities';

const CreateAddressSchema = z.object({
  address: z.string(),
});

type CreateAddressFields = z.infer<typeof CreateAddressSchema>;

interface UseAddressFormProps {
  initialValues: Address;
}

export const useAddressForm = (props?: UseAddressFormProps) => {
  return useForm<CreateAddressFields>({
    resolver: zodResolver(CreateAddressSchema),
    defaultValues: props?.initialValues,
  });
};
