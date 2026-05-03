import { DoorOpen, X } from 'lucide-react';
import type { Cabinet } from '../../../entities';
import { useDeleteCabinetMutation } from '../../../hooks/mutations/cabinet.ts';

interface CabinetCardProps {
  cabinet: Cabinet;
}

export const CabinetCard = ({ cabinet }: CabinetCardProps) => {
  const mutation = useDeleteCabinetMutation();

  return (
    <div
      key={cabinet.id}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-sm group"
    >
      <DoorOpen size={14} className="text-slate-400" />
      <span className="text-slate-700 font-medium">{cabinet.number}</span>
      <button
        onClick={() => mutation.mutate(cabinet.id)}
        className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 ml-1"
      >
        <X size={12} />
      </button>
    </div>
  );
};
