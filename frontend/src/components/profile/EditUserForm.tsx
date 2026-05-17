import { Save } from 'lucide-react';
import type { User } from '../../entities';
import { useEditUserForm } from '../../hooks/forms/editUser.ts';
import { useEditUserMutation } from '../../hooks/mutations/user.ts';
import { FullnameField } from '../common/FullnameField.tsx';
import { PhoneField } from '../common/PhoneField.tsx';

interface EditUserFormProps {
  user: User;
}

export const EditUserForm = ({ user }: EditUserFormProps) => {
  const { control, handleSubmit } = useEditUserForm({ initialValues: user });
  const editUserMutation = useEditUserMutation();

  return (
    <form onSubmit={handleSubmit(data => editUserMutation.mutate(data))} className="space-y-4">
      <FullnameField control={control} />
      <PhoneField control={control} />
      <button
        type="submit"
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        <Save size={16} />
        Сохранить
      </button>
    </form>
  );
};
