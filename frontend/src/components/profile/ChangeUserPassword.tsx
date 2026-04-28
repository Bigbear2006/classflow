import { Lock, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { changeUserPassword } from '../../api/users/requests.ts';
import { toast } from 'sonner';

interface ChangeUserPasswordFields {
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}

export const ChangeUserPassword = () => {
  const { register, handleSubmit } = useForm<ChangeUserPasswordFields>();
  const passwordFields = [
    { value: 'oldPassword', label: 'Текущий пароль' },
    { value: 'newPassword', label: 'Новый пароль' },
    { value: 'repeatNewPassword', label: 'Подтвердить пароль' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <Lock size={18} />
        Смена пароля
      </h3>
      <div className="space-y-3">
        {passwordFields.map(field => (
          <div key={field.value}>
            <label className="block text-sm text-slate-600 mb-1.5">{field.label}</label>
            <input
              {...register(field.value as keyof ChangeUserPasswordFields)}
              placeholder="••••••••"
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}
        <button
          onClick={handleSubmit(data => {
            changeUserPassword({
              old_password: data.oldPassword,
              new_password: data.newPassword,
            }).then(() => toast.success('Пароль изменен'));
          })}
          className={
            'flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all bg-indigo-600 hover:bg-indigo-700 text-white'
          }
        >
          <Save size={16} />
          Сменить пароль
        </button>
      </div>
    </div>
  );
};
