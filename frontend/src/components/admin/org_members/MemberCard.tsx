import { MoreVertical, X } from 'lucide-react';
import type {
  OrganizationMember,
  OrganizationMemberDetail,
  User,
  UserRole,
} from '../../../types.ts';
import { updateOrganizationMember } from '../../../api/organizations/requests.ts';
import { roleConfig } from '../../../labels.tsx';
import { useState } from 'react';

interface MemberCardProps {
  currentUser: User;
  currentMember: OrganizationMember;
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
      {currentMember.role == 'OWNER' && (
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
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                    <div className="flex flex-col gap-2 items-center justify-between p-4 border-b border-slate-100">
                      <button
                        onClick={() => setSelectedMemberId(null)}
                        className="p-1.5 rounded-lg hover:bg-slate-100"
                      >
                        <X size={18} />
                      </button>
                      <div className="px-3 py-1.5 text-xs text-slate-400 font-semibold uppercase">
                        Редактирование участника
                      </div>
                      <select className="px-3 py-2.5 border border-indigo-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        {(['STUDENT', 'TEACHER', 'ADMIN'] as UserRole[])
                          .filter(r => r !== member.role)
                          .map(r => (
                            <option
                              key={r}
                              onClick={() =>
                                updateOrganizationMember(member.id, {
                                  role: r,
                                })
                              }
                              className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 ${roleConfig[r].color.split(' ')[1]}`}
                            >
                              {roleConfig[r].label}
                            </option>
                          ))}
                      </select>
                      <div className="border-t border-slate-100 mt-1 pt-1">
                        <button className="flex-1 p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors">
                          Изменить роль
                        </button>
                        {/*<button*/}
                        {/*  onClick={() => deleteOrganizationMember(member.id)}*/}
                        {/*  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"*/}
                        {/*>*/}
                        {/*  <Trash2 size={14} /> Удалить*/}
                        {/*</button>*/}
                      </div>
                    </div>
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
