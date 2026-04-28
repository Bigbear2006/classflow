import { MapPin, Plus, Trash2 } from 'lucide-react';
import { CabinetForm } from './CabinetForm.tsx';
import type { AddressDetail } from '../../../types.ts';
import { useState } from 'react';
import { CabinetCard } from './CabinetCard.tsx';
import { useDeleteAddressMutation } from '../../../hooks/mutations/address.ts';

interface AddressCardProps {
  address: AddressDetail;
}

export const AddressCard = ({ address }: AddressCardProps) => {
  const mutation = useDeleteAddressMutation();
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

  return (
    <div key={address.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
            <MapPin size={18} className="text-indigo-600" />
          </div>
          <div>
            <div className="font-medium text-slate-900">{address.address}</div>
            <div className="text-xs text-slate-400">{address.cabinets.length} кабинет(ов)</div>
          </div>
        </div>
        {address.cabinets.length === 0 && (
          <button
            onClick={() => mutation.mutate(address.id)}
            className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {address.cabinets.map(cabinet => (
            <CabinetCard cabinet={cabinet} />
          ))}

          {selectedAddress === address.id ? (
            <CabinetForm addressId={address.id} />
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
