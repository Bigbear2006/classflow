import { MoreVertical, Trash2 } from 'lucide-react';
import type {
  OrganizationMemberDetail,
  User,
  UserRole,
} from '../../../types.ts';
import {
  deleteOrganizationMember,
  updateOrganizationMember,
} from '../../../api/organization.ts';
import { roleConfig } from '../../../labels.tsx';
import { useState } from 'react';

interface MemberCardProps {
  currentUser: User;
  member: OrganizationMemberDetail;
}

export const MemberCard = ({ currentUser, member }: MemberCardProps) => {
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(
    null,
  );

  return (
    <tr key={member.id} className="hover:bg-slate-50 transition-colors">
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-sm font-semibold flex-shrink-0">
            {member.user.avatar ? (
              <img
                src={member.user.avatar}
                alt=""
                className="w-9 h-9 rounded-full object-cover"
              />
            ) : (
              member.user.fullname.charAt(0)
            )}
          </div>
          <div>
            <div className="text-sm font-medium text-slate-900">
              {member.user.fullname}
            </div>
            <div className="text-xs text-slate-400 sm:hidden">
              {member.user.email}
            </div>
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
      {member.role == 'OWNER' && (
        <td className="px-3 py-3.5 relative">
          {member.user.id !== currentUser.id && (
            <>
              <button
                onClick={() =>
                  setSelectedMemberId(
                    selectedMemberId === member.id ? null : member.id,
                  )
                }
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <MoreVertical size={16} />
              </button>
              {selectedMemberId === member.id && (
                <div className="absolute right-2 top-10 z-10 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 overflow-visible">
                  <div className="px-3 py-1.5 text-xs text-slate-400 font-semibold uppercase">
                    Изменить роль
                  </div>
                  {(['STUDENT', 'TEACHER', 'ADMIN'] as UserRole[])
                    .filter(r => r !== member.role)
                    .map(r => (
                      <button
                        key={r}
                        onClick={() =>
                          updateOrganizationMember(member.id, { role: r })
                        }
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 ${roleConfig[r].color.split(' ')[1]}`}
                      >
                        {roleConfig[r].icon} Сделать{' '}
                        {roleConfig[r].label.toLowerCase()}
                      </button>
                    ))}
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      onClick={() => deleteOrganizationMember(member.id)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={14} /> Удалить
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </td>
      )}
    </tr>
  );
};
