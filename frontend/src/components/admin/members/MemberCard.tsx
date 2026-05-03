import { MoreVertical } from 'lucide-react';
import type { OrganizationMember, OrganizationMemberDetail, User } from '../../../entities';
import { roleConfig } from '../../../labels/role.tsx';
import { useState } from 'react';
import { UpdateOrgMemberForm } from './UpdateOrgMemberForm.tsx';

interface MemberCardProps {
  currentUser: User;
  currentMember?: OrganizationMember;
  member: OrganizationMemberDetail;
}

export const MemberCard = ({ currentUser, currentMember, member }: MemberCardProps) => {
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-sm font-semibold flex-shrink-0">
            {member.user.avatar ? (
              <img src={member.user.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
            ) : (
              member.user.fullname.charAt(0)
            )}
          </div>
          <div>
            <div className="text-sm font-medium text-slate-900">{member.user.fullname}</div>
            <div className="text-xs text-slate-400 sm:hidden">{member.user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-5 py-3.5 text-sm text-slate-600 hidden sm:table-cell">
        {member.user.email}
      </td>
      <td className="px-5 py-3.5">
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${roleConfig[member.role].color}`}
        >
          {roleConfig[member.role].icon}
          {roleConfig[member.role].label}
        </span>
      </td>
      <td className="px-5 py-3.5 text-sm text-slate-500 hidden md:table-cell">
        {member.createdAt.toLocaleDateString('ru')}
      </td>
      {currentMember?.role == 'OWNER' && (
        <td className="px-3 py-3.5 relative">
          {member.user.id !== currentUser.id && (
            <>
              <button
                onClick={() =>
                  setSelectedMemberId(selectedMemberId === member.id ? null : member.id)
                }
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <MoreVertical size={16} />
              </button>
              {selectedMemberId === member.id && (
                <UpdateOrgMemberForm
                  member={member}
                  closeModal={() => setSelectedMemberId(null)}
                />
              )}
            </>
          )}
        </td>
      )}
    </tr>
  );
};
