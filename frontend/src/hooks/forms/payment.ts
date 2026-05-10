import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { requiredInt } from './base.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { DateTime } from 'luxon';

const PaymentSchema = z.object({
  amount: requiredInt().refine(val => val > 0, 'Сумма должна быть больше 0'),
  date: z.coerce.date<string>(),
  comment: z.string(),
});

type InputPaymentFields = z.input<typeof PaymentSchema>;
export type OutputPaymentFields = z.output<typeof PaymentSchema>;

interface PaymentFormProps {
  amount?: number;
}

export const usePaymentForm = (props?: PaymentFormProps) => {
  const { setValue, ...rest } = useForm<InputPaymentFields, any, OutputPaymentFields>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: props?.amount ? { amount: props.amount.toString() } : undefined,
  });
  setValue('date', DateTime.now().setZone('Europe/Moscow').toISO()!.slice(0, 16));
  return { setValue, ...rest };
};
