import { FormField } from './FormField.tsx';
import { User } from 'lucide-react';
import type { FieldPath, FieldValues } from 'react-hook-form';
import type { ControlProps } from './ControlProps.ts';

export const FullnameField = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>({
  control,
}: ControlProps<TFieldValues, TContext, TTransformedValues>) => {
  return (
    <FormField
      name={'fullname' as FieldPath<TFieldValues>}
      control={control}
      label="ФИО"
      placeholder="Иванов Иван Иванович"
      icon={User}
      required
    />
  );
};
