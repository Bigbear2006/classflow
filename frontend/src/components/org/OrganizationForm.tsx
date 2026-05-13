import { X } from 'lucide-react';
import {
  type OutputOrganizationFields,
  useOrganizationForm,
} from '../../hooks/forms/organization.ts';
import { useOrganizationMutation } from '../../hooks/mutations/organization.ts';
import { CustomTextField } from '../common/CustomTextField.tsx';
import type { FormAction, MyOrganization } from '../../entities';

interface OrganizationFormProps {
  org?: MyOrganization;
  action: FormAction;
  closeForm: () => void;
}

export const OrganizationForm = ({ org, action, closeForm }: OrganizationFormProps) => {
  const { control, handleSubmit } = useOrganizationForm({ initialValues: org });
  const mutation = useOrganizationMutation({ action, onSuccess: closeForm });

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-5 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-slate-800">
          {action === 'CREATE' ? 'Новая организация' : 'Редактировать организацию'}
        </h3>
        <button
          onClick={closeForm}
          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
      <form
        onSubmit={handleSubmit((data: OutputOrganizationFields) => mutation.mutate(data))}
        className="space-y-4"
      >
        <CustomTextField
          name="name"
          label="Название организации"
          control={control}
          placeholder="Моя организация"
          required
        />
        <CustomTextField
          name="slug"
          label="Адрес (поддомен)"
          control={control}
          description="Только латинские буквы, цифры и дефис"
          placeholder="my-org"
          required
        />
        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white rounded-xl text-sm font-medium transition-colors"
          >
            {action === 'CREATE' ? 'Создать' : 'Сохранить'}
          </button>
          <button
            type="button"
            onClick={closeForm}
            className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-sm font-medium transition-colors"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};
