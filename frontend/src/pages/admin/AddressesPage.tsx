import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { getAddresses } from '../../api/address.ts';
import type { AddressDetail } from '../../types.ts';
import { AddressForm } from '../../components/admin/addresses/AddressForm.tsx';
import { AddressCard } from '../../components/admin/addresses/AddressCard.tsx';

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<AddressDetail[]>([]);

  const refreshAddresses = () => {
    getAddresses().then(setAddresses);
  };

  useEffect(() => {
    refreshAddresses();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-slate-900 text-2xl font-semibold">
          Адреса и кабинеты
        </h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Управление учебными площадками и аудиториями
        </p>
      </div>
      <AddressForm refreshAddresses={refreshAddresses} />
      <div className="space-y-4">
        {addresses.map(address => (
          <AddressCard address={address} refreshAddresses={refreshAddresses} />
        ))}
        {addresses.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <MapPin size={40} className="mx-auto mb-3 opacity-40" />
            <p>Адресов ещё нет. Добавьте первый!</p>
          </div>
        )}
      </div>
    </div>
  );
}
