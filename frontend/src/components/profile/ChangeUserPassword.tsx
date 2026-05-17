import { Lock, Save } from 'lucide-react';
import {
  type ChangeUserPasswordFields,
  useChangePasswordForm,
} from '../../hooks/forms/changePassword.ts';
import { useChangePasswordMutation } from '../../hooks/mutations/user.ts';
import { FormField } from '../common/FormField.tsx';

export const ChangeUserPassword = () => {
  const { control, handleSubmit } = useChangePasswordForm();
  const changePasswordMutation = useChangePasswordMutation();

  const passwordFields = [
    { value: 'oldPassword', label: 'Текущий пароль' },
    { value: 'newPassword', label: 'Новый пароль' },
    { value: 'repeatNewPassword', label: 'Подтвердить пароль' },
  ];

  const onSubmit = handleSubmit(data =>
    changePasswordMutation.mutate({
      old_password: data.oldPassword,
      new_password: data.newPassword,
    }),
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <Lock size={18} />
        Смена пароля
      </h3>
      <form onSubmit={onSubmit} className="space-y-3">
        {passwordFields.map(field => (
          <FormField
            name={field.value as keyof ChangeUserPasswordFields}
            control={control}
            label={field.label}
            required
            type="password"
          />
        ))}
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <Save size={16} />
          Сменить пароль
        </button>
      </form>
    </div>
  );
};
