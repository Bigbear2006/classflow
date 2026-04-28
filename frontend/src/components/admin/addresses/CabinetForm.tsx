import { Plus, X } from 'lucide-react';
import { useCabinetMutation } from '../../../hooks/mutations/cabinet.ts';
import { useCabinetForm } from '../../../hooks/forms/cabinet.ts';

interface CabinetFormProps {
  addressId: number;
}

export const CabinetForm = ({ addressId }: CabinetFormProps) => {
  const { register, handleSubmit } = useCabinetForm();
  const mutation = useCabinetMutation();

  return (
    <div className="flex items-center gap-2">
      <input
        {...register('number')}
        placeholder="Номер"
        autoFocus
        className="w-24 px-2.5 py-1.5 border border-indigo-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={handleSubmit(data => mutation.mutate({ ...data, address_id: addressId }))}
        className="p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        <Plus size={12} />
      </button>
      <button className="p-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200">
        <X size={12} />
      </button>
    </div>
  );
};
