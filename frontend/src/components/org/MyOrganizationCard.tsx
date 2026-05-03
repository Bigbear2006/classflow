import { ArrowRight, BookOpen, Building2, Users } from 'lucide-react';
import { navigateToOrganization } from '../../utils.ts';
import type { MyOrganization } from '../../entities';
import { roleConfig } from '../../labels/role.tsx';
import { joinOrganization } from '../../api/organizations/requests.ts';

interface MyOrganizationCardProps {
  org: MyOrganization;
}

export const MyOrganizationCard = ({ org }: MyOrganizationCardProps) => {
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
            <div className="text-xs text-slate-400 mt-0.5">/{org.slug}</div>
          </div>
        </div>
        {roleOptions && (
          <span
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${roleOptions.color}`}
          >
            {roleOptions.icon} {roleOptions.label}
          </span>
        )}
      </div>

      <div className="flex gap-4 text-xs text-slate-500 mb-4">
        <span className="flex items-center gap-1.5">
          <BookOpen size={12} /> {org.coursesCount} {org.coursesCount === 1 ? 'курс' : 'курсов'}
        </span>
        <span className="flex items-center gap-1.5">
          <Users size={12} /> {org.membersCount}{' '}
          {org.membersCount === 1 ? 'участник' : 'участников'}
        </span>
      </div>

      <button
        onClick={() => {
          joinOrganization().then(() => navigateToOrganization(org.slug));
        }}
        className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors"
      >
        Перейти <ArrowRight size={14} />
      </button>
    </div>
  );
};
