import { X } from 'lucide-react';

interface ModalHeaderProps {
  title: string;
  closeModal: () => void;
}

export const ModalHeader = ({ title, closeModal }: ModalHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-slate-100">
      <h2 className="font-semibold text-slate-900">{title}</h2>
      <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-slate-100">
        <X size={18} />
      </button>
    </div>
  );
};
