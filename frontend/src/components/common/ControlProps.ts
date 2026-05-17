import type { Control, FieldValues } from 'react-hook-form';

export interface ControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> {
  control: Control<TFieldValues, TContext, TTransformedValues>;
}
