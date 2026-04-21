import { AlertCircle } from 'lucide-react';

interface ErrorCardProps {
  message: string;
}

export const ErrorCard = ({ message }: ErrorCardProps) => {
  return (
    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl mb-5 text-red-700 text-sm">
      <AlertCircle size={16} className="flex-shrink-0" />
      {message}
    </div>
  );
};
