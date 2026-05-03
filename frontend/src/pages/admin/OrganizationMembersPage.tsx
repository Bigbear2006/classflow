import { useEffect, useState } from 'react';
import type { UserRole } from '../../entities';
import { Users, Search } from 'lucide-react';
import { roleConfig } from '../../labels/role.tsx';
import { MemberCard } from '../../components/admin/members/MemberCard.tsx';
import { useAppContext } from '../../context.tsx';
import { useOrganizationMembers } from '../../hooks/queries/member.ts';
import { useRoleCounts } from '../../hooks/queries/organization.ts';
import { useSearchParams } from 'react-router';
import { useDebouncedValue } from '../../hooks/useDebouncedValue.ts';

export default function OrganizationMembersPage() {
  const [searchParams, setSearchParams] = useSearchParams(window.location.search);
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [roleFilter, setRoleFilter] = useState<UserRole>();

  const debouncedSearch = useDebouncedValue(search, 500);
  const debouncedRoleFilter = useDebouncedValue(roleFilter, 500);

  const { data: members } = useOrganizationMembers({
    query: debouncedSearch,
    roles: debouncedRoleFilter ? [debouncedRoleFilter as UserRole] : debouncedRoleFilter,
  });
  const { data: roleCounts } = useRoleCounts();
  const { user, member: currentMember } = useAppContext();

  useEffect(() => {
    setSearchParams(
      prevParams => {
        const params = new URLSearchParams(prevParams);
        if (debouncedSearch) {
          params.set('q', debouncedSearch);
        } else {
          params.delete('q');
        }
        if (debouncedRoleFilter) {
          params.set('role', debouncedRoleFilter);
        } else {
          params.delete('role');
        }
        return params;
      },
      { replace: true },
    );
  }, [debouncedSearch, debouncedRoleFilter]);

  return (
    <div className="p-6 space-y-6 overflow-visible">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 text-2xl font-semibold">Участники</h1>
          <p className="text-slate-500 text-sm mt-0.5">Управление пользователями и их ролями</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {roleCounts.map(({ role, count }) => (
          <div key={role} className="bg-white rounded-xl border border-slate-200 p-4">
            <div
              className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium ${roleConfig[role].color} mb-2`}
            >
              {roleConfig[role].icon} {roleConfig[role].label}
            </div>
            <div className="text-2xl font-bold text-slate-900">{count}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по имени или email..."
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {([undefined, 'OWNER', 'ADMIN', 'TEACHER', 'STUDENT'] as const).map(r => (
            <button
              key={r || ''}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                roleFilter === r
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {r ? roleConfig[r].label : 'Все'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full overflow-visible">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Участник
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">
                Email
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Роль
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">
                Добавлен
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {members.map(member => (
              <MemberCard
                key={member.user.id}
                currentUser={user!}
                currentMember={currentMember}
                member={member}
              />
            ))}
          </tbody>
        </table>
        {members.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <Users size={32} className="mx-auto mb-2 opacity-40" />
            Участники не найдены
          </div>
        )}
      </div>
    </div>
  );
}
