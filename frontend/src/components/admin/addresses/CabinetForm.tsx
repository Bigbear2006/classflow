import { Plus, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { createCabinet } from '../../../api/cabinet.ts';

interface CabinetFormProps {
  addressId: number;
  refreshAddresses: () => void;
}

interface CreateCabinetFields {
  number: string;
}

export const CabinetForm = ({
  addressId,
  refreshAddresses,
}: CabinetFormProps) => {
  const { register, handleSubmit } = useForm<CreateCabinetFields>();

  return (
    <div className="flex items-center gap-2">
      <input
        {...register('number')}
        placeholder="Номер"
        autoFocus
        className="w-24 px-2.5 py-1.5 border border-indigo-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={handleSubmit(data =>
          createCabinet({ ...data, address_id: addressId }).then(() =>
            refreshAddresses(),
          ),
        )}
        className="p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        <Plus size={12} />
      </button>
      <button
        // onClick={() => setAddingCabinet(null)}
        className="p-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200"
      >
        <X size={12} />
      </button>
    </div>
  );
};
