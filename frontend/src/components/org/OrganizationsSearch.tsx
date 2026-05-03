import { useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useDebouncedValue } from '../../hooks/useDebouncedValue.ts';
import { useOrganizations } from '../../hooks/queries/organization.ts';
import { Building2, LogIn, Search } from 'lucide-react';
import { navigateToOrganization } from '../../utils.ts';
import { joinOrganization } from '../../api/organizations/requests.ts';

export const OrganizationsSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams(window.location.search);
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const debouncedSearch = useDebouncedValue(search, 500);
  const { data: foundOrgs } = useOrganizations({ query: debouncedSearch });

  useEffect(() => {
    setSearchParams(
      prevParams => {
        const params = new URLSearchParams(prevParams);
        if (debouncedSearch) {
          params.set('q', debouncedSearch);
        } else {
          params.delete('q');
        }
        return params;
      },
      { replace: true },
    );
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
            className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white w-56"
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
                        <div className="text-xs text-slate-400 mt-0.5">/{org.slug}</div>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        joinOrganization().then(() => navigateToOrganization(org.slug))
                      }
                      className="flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white rounded-xl text-sm font-medium transition-colors"
                    >
                      <LogIn size={14} />
                      Вступить
                    </button>
                  </div>

                  {/*<div className="flex gap-4 text-xs text-slate-500 mt-3">*/}
                  {/*  <span className="flex items-center gap-1.5">*/}
                  {/*    <BookOpen size={12} /> {org.courses.length}{' '}*/}
                  {/*    {org.courses.length === 1 ? 'курс' : 'курсов'}*/}
                  {/*  </span>*/}
                  {/*  <span className="flex items-center gap-1.5">*/}
                  {/*    <Users size={12} /> {org.membersCount}{' '}*/}
                  {/*    {org.membersCount === 1*/}
                  {/*      ? 'участник'*/}
                  {/*      : 'участников'}*/}
                  {/*  </span>*/}
                  {/*  {org.groupsCount > 0 && (*/}
                  {/*    <span className="flex items-center gap-1.5">*/}
                  {/*      <GraduationCap size={12} /> {org.groupsCount}{' '}*/}
                  {/*      {org.groupsCount === 1 ? 'группа' : 'групп'}*/}
                  {/*    </span>*/}
                  {/*  )}*/}
                  {/*</div>*/}

                  {/*{org.courses.length > 0 && (*/}
                  {/*  <button className="flex items-center gap-1.5 mt-3 text-xs text-slate-500 hover:text-indigo-600 transition-colors font-medium">*/}
                  {/*    {isExpanded ? (*/}
                  {/*      <ChevronUp size={13} />*/}
                  {/*    ) : (*/}
                  {/*      <ChevronDown size={13} />*/}
                  {/*    )}*/}
                  {/*    {isExpanded*/}
                  {/*      ? 'Скрыть курсы'*/}
                  {/*      : `Показать курсы (${org.courses.length})`}*/}
                  {/*  </button>*/}
                  {/*)}*/}
                </div>

                {/*{isExpanded && org.courses.length > 0 && (*/}
                {/*  <div className="border-t border-slate-100 bg-slate-50/60 p-5">*/}
                {/*    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">*/}
                {/*      {org.courses.map(course => {*/}
                {/*        return (*/}
                {/*          <div*/}
                {/*            key={course.id}*/}
                {/*            className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col"*/}
                {/*          >*/}
                {/*            <div className="font-medium text-slate-800 text-sm mb-1 leading-snug">*/}
                {/*              {course.subject.name}*/}
                {/*            </div>*/}
                {/*            {course.subject.description && (*/}
                {/*              <p className="text-xs text-slate-500 line-clamp-2 mb-3">*/}
                {/*                {course.subject.description}*/}
                {/*              </p>*/}
                {/*            )}*/}
                {/*            <div className="mt-auto space-y-1.5">*/}
                {/*              <div className="flex items-center justify-between">*/}
                {/*                <span className="text-sm font-semibold text-emerald-600">*/}
                {/*                  {course.price.toLocaleString('ru-RU')}{' '}*/}
                {/*                  ₽*/}
                {/*                </span>*/}
                {/*                <span className="text-xs text-slate-400">*/}
                {/*                  {course.paymentType === 'FULL_COURSE'*/}
                {/*                    ? 'за курс'*/}
                {/*                    : 'за занятие'}*/}
                {/*                </span>*/}
                {/*              </div>*/}
                {/*              <div className="flex flex-wrap gap-1.5">*/}
                {/*                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-xs">*/}
                {/*                  <Clock size={10} />*/}
                {/*                  {course.duration} мин*/}
                {/*                </span>*/}
                {/*                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-xs">*/}
                {/*                  {lessonTypeLabel[course.lessonType] ||*/}
                {/*                    course.lessonType}*/}
                {/*                </span>*/}
                {/*              </div>*/}
                {/*            </div>*/}
                {/*          </div>*/}
                {/*        );*/}
                {/*      })}*/}
                {/*    </div>*/}

                {/*    <p className="text-xs text-slate-400 mt-4 text-center">*/}
                {/*      Вступите в организацию, чтобы записаться на курс*/}
                {/*    </p>*/}
                {/*  </div>*/}
                {/*)}*/}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
