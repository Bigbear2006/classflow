import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Building2,
  Plus,
  Users,
  BookOpen,
  LogIn,
  ArrowRight,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Hash,
  AlertCircle,
  School,
  Search,
  Clock,
  X,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  createOrganization,
  type CreateOrganizationData,
  getMyOrganizations,
  joinOrganization,
} from '../api/organization.ts';
import type { MyOrganization, OrganizationDetail } from '../types.ts';
import { MAX_OWNED_ORGS_COUNT } from '../config.ts';
import { navigateToOrganization } from '../utils.ts';
import { lessonTypeLabel, roleConfig } from '../labels.tsx';
import { useAppContext } from '../context.tsx';

export default function DashboardPage() {
  const navigate = useNavigate();

  const { user } = useAppContext();
  const [foundOrgs, setFoundOrgs] = useState<OrganizationDetail[]>([]);
  const [myOrgs, setMyOrgs] = useState<MyOrganization[]>([]);
  const [ownedOrgsCount, setOwnedOrgsCount] = useState<number>(0);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateOrganizationData>();
  const [showCreate, setShowCreate] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [search, setSearch] = useState('');

  const handleEnterOrg = (slug: string, role: string) => {
    console.log(slug, role);
    navigateToOrganization(slug);
  };

  const handleCreate = (data: CreateOrganizationData) => {
    setCreateLoading(true);
    createOrganization(data).then(() => {
      setCreateLoading(false);
      navigateToOrganization(data.slug);
    });
  };

  const handleJoin = async (slug: string) => {
    navigateToOrganization(slug);
    joinOrganization();
    navigate('/student');
  };

  useEffect(() => {
    setFoundOrgs([]);
    getMyOrganizations().then(orgs => {
      setMyOrgs(orgs);
      setOwnedOrgsCount(orgs.filter(org => org.role == 'OWNER').length);
    });
  }, []);

  return (
    <div className="min-h-full bg-slate-50">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-white text-2xl font-bold mb-1">
            Добро пожаловать
            {`, ${user.fullname.split(' ')[0]}`}!
          </h1>
          <p className="text-indigo-200 text-sm">
            Управляйте своими организациями или вступайте в новые учебные
            центры
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Мои организации
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                {ownedOrgsCount >= MAX_OWNED_ORGS_COUNT
                  ? 'Вы уже являетесь владельцем организации'
                  : 'Создайте свою организацию'}
              </p>
            </div>
            {!(ownedOrgsCount >= MAX_OWNED_ORGS_COUNT) && !showCreate && (
              <button
                onClick={() => setShowCreate(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm"
              >
                <Plus size={15} />
                Создать организацию
              </button>
            )}
          </div>

          {showCreate && !(ownedOrgsCount >= MAX_OWNED_ORGS_COUNT) && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-5 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-slate-800">
                  Новая организация
                </h3>
                <button
                  onClick={() => setShowCreate(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {Object.values(errors).map(error => (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl mb-4 text-red-700 text-sm">
                  <AlertCircle size={15} className="flex-shrink-0" />
                  {error.message}
                </div>
              ))}

              <form
                onSubmit={handleSubmit(handleCreate)}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Название организации
                  </label>
                  <input
                    {...register('name', { required: 'Обязательное поле' })}
                    placeholder='Учебный центр "Горизонт"'
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Адрес (slug){' '}
                    <span className="text-slate-400 font-normal">
                      — только латиница, цифры и дефис
                    </span>
                  </label>
                  <div className="relative">
                    <Hash
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      {...register('slug', { required: 'Обязательное поле' })}
                      placeholder="my-org"
                      className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={createLoading}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white rounded-xl text-sm font-medium transition-colors"
                  >
                    {createLoading ? 'Создаём...' : 'Создать'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreate(false)}
                    className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-sm font-medium transition-colors"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          )}

          {myOrgs.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                <School size={26} className="text-slate-400" />
              </div>
              <p className="text-slate-600 font-medium mb-1">
                Вы ещё не состоите ни в одной организации
              </p>
              <p className="text-slate-400 text-sm">
                Создайте свою или вступите в одну из организаций ниже
              </p>
              {!showCreate && (
                <button
                  onClick={() => setShowCreate(true)}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors"
                >
                  <Plus size={14} /> Создать организацию
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {myOrgs.map(org => {
                const rc = roleConfig[org.role];
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
                          <div className="font-semibold text-slate-800 text-sm">
                            {org.name}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5">
                            /{org.slug}
                          </div>
                        </div>
                      </div>
                      {rc && (
                        <span
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${rc.color}`}
                        >
                          {rc.icon} {rc.label}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-4 text-xs text-slate-500 mb-4">
                      <span className="flex items-center gap-1.5">
                        <BookOpen size={12} /> {org.coursesCount}{' '}
                        {org.coursesCount === 1 ? 'курс' : 'курсов'}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users size={12} /> {org.membersCount}{' '}
                        {org.membersCount === 1 ? 'участник' : 'участников'}
                      </span>
                    </div>

                    <button
                      onClick={() => handleEnterOrg(org.slug, org.role)}
                      className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors"
                    >
                      Перейти <ArrowRight size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {(foundOrgs.length > 0 || search) && (
          <section>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Другие организации
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Вступите в организацию, чтобы записаться на курсы
                </p>
              </div>
              <div className="relative">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
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
                <p className="text-slate-400 text-sm">
                  Организации не найдены
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {foundOrgs.map(org => {
                  const isExpanded = true;
                  return (
                    <div
                      key={org.id}
                      className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
                    >
                      <div className="p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                              <Building2
                                size={21}
                                className="text-emerald-600"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold text-slate-800 text-sm truncate">
                                {org.name}
                              </div>
                              <div className="text-xs text-slate-400 mt-0.5">
                                /{org.slug}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleJoin(org.slug)}
                            className="flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white rounded-xl text-sm font-medium transition-colors"
                          >
                            <LogIn size={14} />
                            Вступить
                          </button>
                        </div>

                        <div className="flex gap-4 text-xs text-slate-500 mt-3">
                          <span className="flex items-center gap-1.5">
                            <BookOpen size={12} /> {org.courses.length}{' '}
                            {org.courses.length === 1 ? 'курс' : 'курсов'}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users size={12} /> {org.membersCount}{' '}
                            {org.membersCount === 1
                              ? 'участник'
                              : 'участников'}
                          </span>
                          {org.groupsCount > 0 && (
                            <span className="flex items-center gap-1.5">
                              <GraduationCap size={12} /> {org.groupsCount}{' '}
                              {org.groupsCount === 1 ? 'группа' : 'групп'}
                            </span>
                          )}
                        </div>

                        {org.courses.length > 0 && (
                          <button className="flex items-center gap-1.5 mt-3 text-xs text-slate-500 hover:text-indigo-600 transition-colors font-medium">
                            {isExpanded ? (
                              <ChevronUp size={13} />
                            ) : (
                              <ChevronDown size={13} />
                            )}
                            {isExpanded
                              ? 'Скрыть курсы'
                              : `Показать курсы (${org.courses.length})`}
                          </button>
                        )}
                      </div>

                      {isExpanded && org.courses.length > 0 && (
                        <div className="border-t border-slate-100 bg-slate-50/60 p-5">
                          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {org.courses.map(course => {
                              return (
                                <div
                                  key={course.id}
                                  className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col"
                                >
                                  <div className="font-medium text-slate-800 text-sm mb-1 leading-snug">
                                    {course.subject.name}
                                  </div>
                                  {course.subject.description && (
                                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                                      {course.subject.description}
                                    </p>
                                  )}
                                  <div className="mt-auto space-y-1.5">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm font-semibold text-emerald-600">
                                        {course.price.toLocaleString('ru-RU')}{' '}
                                        ₽
                                      </span>
                                      <span className="text-xs text-slate-400">
                                        {course.paymentType === 'FULL_COURSE'
                                          ? 'за курс'
                                          : 'за занятие'}
                                      </span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-xs">
                                        <Clock size={10} />
                                        {course.duration} мин
                                      </span>
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-xs">
                                        {lessonTypeLabel[course.lessonType] ||
                                          course.lessonType}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <p className="text-xs text-slate-400 mt-4 text-center">
                            Вступите в организацию, чтобы записаться на курс
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
