import { FormField } from './FormField.tsx';
import { Phone } from 'lucide-react';
import type { ControlProps } from './ControlProps.ts';
import type { FieldPath, FieldValues } from 'react-hook-form';

export const PhoneField = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>({
  control,
}: ControlProps<TFieldValues, TContext, TTransformedValues>) => {
  return (
    <FormField
      name={'phone' as FieldPath<TFieldValues>}
      control={control}
      label="Телефон"
      placeholder="+79991112233"
      icon={Phone}
      required
    />
  );
};
