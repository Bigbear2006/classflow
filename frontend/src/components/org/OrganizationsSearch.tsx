import { useEffect, useState } from 'react';
import { useDebouncedValue } from '../../hooks/useDebouncedValue.ts';
import { useOrganizations } from '../../hooks/queries/organization.ts';
import { Building2, LogIn, Search } from 'lucide-react';
import { useJoinOrganizationMutation } from '../../hooks/mutations/organization.ts';
import { getRouteApi } from '@tanstack/react-router';

const routeApi = getRouteApi('/_layout/orgs');

export const OrganizationsSearch = () => {
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const [search, setSearch] = useState(searchParams.q || '');
  const debouncedSearch = useDebouncedValue(search, 500);
  const { data: foundOrgs } = useOrganizations({ query: debouncedSearch });
  const joinOrganizationMutation = useJoinOrganizationMutation();

  useEffect(() => {
    navigate({
      to: '.',
      search: () => ({ q: debouncedSearch || undefined }),
      replace: true,
    }).then();
  }, [debouncedSearch]);

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Другие организации</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Вступите в организацию, чтобы записаться на курсы
          </p>
        </div>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск организаций..."
            className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white w-56"
          />
        </div>
      </div>

      {foundOrgs.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-8 text-center">
          <p className="text-slate-400 text-sm">Организации не найдены</p>
        </div>
      ) : (
        <div className="space-y-4">
          {foundOrgs.map(org => {
            // const isExpanded = true;
            return (
              <div
                key={org.id}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <Building2 size={21} className="text-emerald-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-800 text-sm truncate">
                          {org.name}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">{org.slug}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => joinOrganizationMutation.mutate({ orgId: org.id })}
                      className="flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white rounded-xl text-sm font-medium transition-colors"
                    >
                      <LogIn size={14} />
                      Вступить
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
