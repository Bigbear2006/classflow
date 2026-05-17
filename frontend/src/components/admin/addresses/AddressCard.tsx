import { Check, Edit2, MapPin, Plus, Trash2, X } from 'lucide-react';
import { CabinetForm } from './CabinetForm.tsx';
import type { AddressDetail } from '../../../entities';
import { useState } from 'react';
import { CabinetCard } from './CabinetCard.tsx';
import { useAddressMutation, useDeleteAddressMutation } from '../../../hooks/mutations/address.ts';
import { useAddressForm } from '../../../hooks/forms/address.ts';
import { useConfirm } from '../../../hooks/useConfirm.ts';

interface AddressCardProps {
  address: AddressDetail;
}

export const AddressCard = ({ address }: AddressCardProps) => {
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const { register, handleSubmit } = useAddressForm({ initialValues: address });
  const updateAddressMutation = useAddressMutation({
    addressId: address.id,
    onSuccess: () => setIsEdit(false),
  });

  const deleteAddressMutation = useDeleteAddressMutation();
  const handleDeleteAddress = useConfirm({
    message: `Удалить адрес ${address.address}?`,
    action: deleteAddressMutation.mutate,
    actionLabel: 'Удалить',
  });

  return (
    <div key={address.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-3 w-full">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
            <MapPin size={18} className="text-indigo-600" />
          </div>
          <div className="w-full">
            {isEdit ? (
              <div className="flex gap-2">
                <input
                  {...register('address')}
                  placeholder="Изменить адрес..."
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                />
                <button
                  onClick={handleSubmit(data => updateAddressMutation.mutate(data))}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => setIsEdit(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="font-medium text-slate-900">{address.address}</div>
                <div className="text-xs text-slate-400">{address.cabinets.length} кабинет(ов)</div>
              </>
            )}
          </div>
        </div>
        {!isEdit && (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEdit(true)}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
            >
              <Edit2 size={16} />
            </button>
            {address.cabinets.length === 0 && (
              <button
                onClick={() => handleDeleteAddress(address.id)}
                className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        )}
        {}
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {address.cabinets.map(cabinet => (
            <CabinetCard key={cabinet.id} cabinet={cabinet} />
          ))}
          {selectedAddress === address.id ? (
            <CabinetForm addressId={address.id} closeInput={() => setSelectedAddress(null)} />
          ) : (
            <button
              onClick={() => setSelectedAddress(address.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
            >
              <Plus size={14} /> Кабинет
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
