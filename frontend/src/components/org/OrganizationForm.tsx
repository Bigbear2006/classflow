import { AlertCircle, Hash, X } from 'lucide-react';
import { type OrganizationFields, useOrganizationForm } from '../../hooks/forms/organization.ts';
import { useOrganizationMutation } from '../../hooks/mutations/organization.ts';
import { navigateToOrganization } from '../../utils.ts';

interface OrganizationFormProps {
  closeForm: () => void;
}

export const OrganizationForm = ({ closeForm }: OrganizationFormProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useOrganizationForm();
  const mutation = useOrganizationMutation();

  const onSubmit = (data: OrganizationFields) =>
    mutation.mutateAsync(data).then(() => navigateToOrganization(data.slug));

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-5 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-slate-800">Новая организация</h3>
        <button
          onClick={closeForm}
          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {Object.values(errors).map(error => (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl mb-4 text-red-700 text-sm">
          <AlertCircle size={15} className="flex-shrink-0" />
          {error.message}
        </div>
      ))}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Название организации
          </label>
          <input
            {...register('name')}
            placeholder='Учебный центр "Горизонт"'
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Адрес (slug){' '}
            <span className="text-slate-400 font-normal">— только латиница, цифры и дефис</span>
          </label>
          <div className="relative">
            <Hash size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              {...register('slug')}
              placeholder="my-org"
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white rounded-xl text-sm font-medium transition-colors"
          >
            'Создать'
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
