import { MapPin } from 'lucide-react';
import { AddressForm } from '../../components/admin/addresses/AddressForm.tsx';
import { AddressCard } from '../../components/admin/addresses/AddressCard.tsx';
import { useAddresses } from '../../hooks/queries/address.ts';

export default function AddressesPage() {
  const { data: addresses } = useAddresses();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-slate-900 text-2xl font-semibold">Адреса и кабинеты</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Управление учебными площадками и аудиториями
        </p>
      </div>
      <AddressForm />
      <div className="space-y-4">
        {addresses.map(address => (
          <AddressCard address={address} />
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
