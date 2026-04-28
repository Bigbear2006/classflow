import { School } from 'lucide-react';
import { useAppContext } from '../../context.tsx';

export const OrganizationHeader = () => {
  const { organization } = useAppContext();

  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
        <School size={20} className="text-indigo-600" />
      </div>
      <div>
        <h1 className="text-slate-900 text-2xl font-semibold">
          {organization?.name || 'ClassFlow'}
        </h1>
        <p className="text-slate-500 text-sm">slug: {organization?.slug || ''}</p>
      </div>
    </div>
  );
};
