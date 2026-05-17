import { ArrowRight, Building2, Edit2 } from 'lucide-react';
import { navigateToOrganization } from '../../utils.ts';
import type { MyOrganization } from '../../entities';
import { roleConfig } from '../../labels/role.tsx';
import { useAppContext } from '../../context.tsx';

interface MyOrganizationCardProps {
  org: MyOrganization;
  openEdit: (org: MyOrganization) => void;
}

export const MyOrganizationCard = ({ org, openEdit }: MyOrganizationCardProps) => {
  const { organization: currentOrganization } = useAppContext();
  const roleOptions = roleConfig[org.role];

  return (
    <div
      key={org.id}
      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
            <Building2 size={21} className="text-indigo-600" />
          </div>
          <div>
            <div className="font-semibold text-slate-800 text-sm">{org.name}</div>
            <div className="text-xs text-slate-400 mt-0.5">{org.slug}</div>
          </div>
          {org.id === currentOrganization?.id && org.role == 'OWNER' && (
            <button
              onClick={() => openEdit(org)}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
            >
              <Edit2 size={16} />
            </button>
          )}
        </div>
        {roleOptions && (
          <span
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-white ${roleOptions.color}`}
          >
            {roleOptions.icon} {roleOptions.label}
          </span>
        )}
      </div>

      {window.location.hostname.startsWith(`${org.slug}.`) ? (
        <button className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium transition-colors">
          Вы здесь
        </button>
      ) : (
        <button
          onClick={() => navigateToOrganization(org.slug)}
          className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors"
        >
          Перейти <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
};
