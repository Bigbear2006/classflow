import { Description, FieldError, Input, Label, TextArea, TextField } from '@heroui/react';
import { type LucideIcon } from 'lucide-react';
import { type Control, Controller, type FieldPath, type FieldValues } from 'react-hook-form';
import type { ReactNode } from 'react';

type CustomTextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> = {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues, TContext, TTransformedValues>;
  label: string;
  placeholder?: string;
  description?: string;
  icon?: LucideIcon;
  button?: ReactNode;
  required?: boolean;
  type?: React.HTMLInputTypeAttribute;
  isTextArea?: boolean;
};

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>({
  name,
  control,
  label,
  placeholder,
  description,
  icon: Icon,
  button,
  required,
  type = 'text',
  isTextArea = false,
}: CustomTextFieldProps<TFieldValues, TContext, TTransformedValues>) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <TextField isRequired={required} isInvalid={fieldState.invalid}>
          <Label>{label}</Label>
          <div className="relative">
            {Icon && (
              <Icon
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            )}

            {isTextArea ? (
              <TextArea
                {...field}
                placeholder={placeholder}
                rows={5}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            ) : (
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                className={`w-full ${Icon ? 'pl-9' : 'pl-4'} pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500`}
              />
            )}

            {button}
          </div>
          {description && <Description>{description}</Description>}
          {fieldState.error?.message && <FieldError>{fieldState.error?.message}</FieldError>}
        </TextField>
      )}
      control={control}
    />
  );
};
