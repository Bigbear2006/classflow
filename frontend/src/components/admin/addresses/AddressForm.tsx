import {
  createAddress,
  type CreateAddressData,
} from '../../../api/address.ts';
import { MapPin, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface AddressFormProps {
  refreshAddresses: () => void;
}

export const AddressForm = ({ refreshAddresses }: AddressFormProps) => {
  const { register, handleSubmit } = useForm<CreateAddressData>();

  return (
    <form
      onSubmit={handleSubmit(data =>
        createAddress(data).then(() => refreshAddresses()),
      )}
      className="flex gap-3"
    >
      <div className="relative flex-1">
        <MapPin
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          {...register('address')}
          placeholder="Добавить новый адрес..."
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        />
      </div>
      <button
        type="submit"
        className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors"
      >
        <Plus size={16} /> Добавить
      </button>
    </form>
  );
};
