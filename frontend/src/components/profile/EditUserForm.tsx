import { useForm } from 'react-hook-form';
import { updateUser, type UpdateUserData } from '../../api/user.ts';
import { Phone, Save, User as UserIcon } from 'lucide-react';
import { useEffect } from 'react';
import type { User } from '../../types.ts';
import { toast } from 'sonner';

interface EditUserFormProps {
  user: User;
}

export const EditUserForm = ({ user }: EditUserFormProps) => {
  const { register, setValue, handleSubmit } = useForm<UpdateUserData>();

  useEffect(() => {
    setValue('fullname', user.fullname);
    setValue('phone', user.phone);
  }, [user]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-slate-600 mb-1.5 font-medium">
          <UserIcon size={14} className="inline mr-1" />
          ФИО
        </label>
        <input
          {...register('fullname')}
          className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm text-slate-600 mb-1.5 font-medium">
          <Phone size={14} className="inline mr-1" />
          Телефон
        </label>
        <input
          {...register('phone')}
          className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <button
        onClick={handleSubmit(data => {
          updateUser(data)
            .then(() => toast.success('Данные сохранены'))
            .catch(() => toast.error('Не удалось сохранить изменения'));
        })}
        className={
          'flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all bg-indigo-600 hover:bg-indigo-700 text-white'
        }
      >
        <Save size={16} />
        Сохранить
      </button>
      {/*<div>*/}
      {/*  <label className="block text-sm text-slate-600 mb-1.5 font-medium">*/}
      {/*    <Mail size={14} className="inline mr-1" />*/}
      {/*    Email*/}
      {/*  </label>*/}
      {/*  <input*/}
      {/*    defaultValue={user.email}*/}
      {/*    type="email"*/}
      {/*    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
};
