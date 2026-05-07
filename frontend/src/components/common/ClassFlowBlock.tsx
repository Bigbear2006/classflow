import { Link } from 'react-router';
import { School } from 'lucide-react';

export const ClassFlowBlock = () => {
  return (
    <Link to="/">
      <div className="px-8 py-6 flex items-center gap-3 flex-shrink-0">
        <div className="h-10 min-w-10 rounded-xl bg-indigo-500 flex items-center justify-center">
          <School size={22} className="text-white" />
        </div>
        <div>
          <div className="text-white font-semibold text-lg leading-tight">ClassFlow</div>
          <div className="text-slate-400 text-xs">Платформа дополнительного образования</div>
        </div>
      </div>
    </Link>
  );
};
