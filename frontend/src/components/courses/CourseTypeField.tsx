import { FormField } from '../common/FormField.tsx';
import type { FieldPath, FieldValues } from 'react-hook-form';
import type { ControlProps } from '../common/ControlProps.ts';

export const CourseTypeField = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>({
  control,
}: ControlProps<TFieldValues, TContext, TTransformedValues>) => {
  return (
    <FormField
      name={'type' as FieldPath<TFieldValues>}
      control={control}
      label="Тип"
      required
      selectOptions={[
        { value: 'GROUP', label: 'Групповой' },
        { value: 'INDIVIDUAL', label: 'Индивидуальный' },
      ]}
    />
  );
};
