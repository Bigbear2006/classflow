import {
  Users,
  BookOpen,
  Calendar,
  DollarSign,
  TrendingUp,
  School,
  UserCheck,
  UserPlus,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import {
  getCurrentOrganization,
  getOrganizationStats,
} from '../../api/organization.ts';
import type { Lesson, Organization, OrganizationStats } from '../../types.ts';
import { getUpcomingLessons } from '../../api/lesson.ts';
import DashboardPage from '../DashboardPage.tsx';

export default function AdminDashboardPage() {
  const [currentOrg, setCurrentOrg] = useState<Organization | null>();
  const [orgStats, setOrgStats] = useState<OrganizationStats>({
    courses: 0,
    teachers: 0,
    students: 0,
    groups: 0,
    todayLessons: 0,
    totalIncome: 0,
  });
  const [upcomingLessons, setUpcomingLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentOrganization()
      .then(setCurrentOrg)
      .catch(() => setCurrentOrg(null))
      .finally(() => setIsLoading(false));
    getOrganizationStats().then(setOrgStats);
    getUpcomingLessons().then(setUpcomingLessons);
  }, []);

  const stats = [
    {
      label: 'Курсов',
      value: orgStats.courses,
      icon: <BookOpen size={20} />,
      color: 'bg-indigo-50 text-indigo-600',
      path: '/org/courses',
    },
    {
      label: 'Преподавателей',
      value: orgStats.teachers,
      icon: <UserCheck size={20} />,
      color: 'bg-emerald-50 text-emerald-600',
      path: '/org/members',
    },
    {
      label: 'Учеников',
      value: orgStats.students,
      icon: <Users size={20} />,
      color: 'bg-blue-50 text-blue-600',
      path: '/org/members',
    },
    {
      label: 'Групп',
      value: orgStats.groups,
      icon: <UserPlus size={20} />,
      color: 'bg-amber-50 text-amber-600',
      path: '/org/groups',
    },
    {
      label: 'Занятий сегодня',
      value: orgStats.todayLessons,
      icon: <Calendar size={20} />,
      color: 'bg-violet-50 text-violet-600',
      path: '/org/schedule',
    },
    {
      label: 'Поступления (₽)',
      value: orgStats.totalIncome.toLocaleString('ru'),
      icon: <DollarSign size={20} />,
      color: 'bg-rose-50 text-rose-600',
      path: '/org/payments',
    },
  ];

  if (currentOrg === null) {
    return <DashboardPage />;
  }

  return (
    <>
      {isLoading && (
        <div className="bg-indigo-100 inset-0 h-full absolute z-100 p-4 box-border"></div>
      )}
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
            <School size={20} className="text-indigo-600" />
          </div>
          <div>
            <h1 className="text-slate-900 text-2xl font-semibold">
              {currentOrg?.name || ''}
            </h1>
            <p className="text-slate-500 text-sm">
              slug: {currentOrg?.slug || ''}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map(s => (
            <button
              key={s.label}
              onClick={() => navigate(s.path)}
              className="bg-white rounded-2xl border border-slate-200 p-4 text-left hover:shadow-md transition-shadow"
            >
              <div
                className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center mb-3`}
              >
                {s.icon}
              </div>
              <div className="text-slate-900 text-xl font-bold">{s.value}</div>
              <div className="text-slate-500 text-xs mt-0.5">{s.label}</div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-900">
                Ближайшие занятия
              </h2>
              <button
                onClick={() => navigate('/org/schedule')}
                className="text-indigo-600 text-sm hover:underline"
              >
                Все →
              </button>
            </div>
            {upcomingLessons.length === 0 ? (
              <p className="text-slate-400 text-sm">
                Нет запланированных занятий
              </p>
            ) : (
              <div className="space-y-3">
                {upcomingLessons.map(lesson => {
                  return (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                    >
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 flex flex-col items-center justify-center flex-shrink-0">
                        <span className="text-indigo-700 text-xs font-bold leading-none">
                          {lesson.startDate.getDate()}
                        </span>
                        <span className="text-indigo-500 text-[9px]">
                          {lesson.startDate.toLocaleDateString('ru', {
                            month: 'short',
                          })}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-slate-900 truncate">
                          {'Инд. занятие'}
                        </div>
                        <div className="text-xs text-slate-500">
                          {lesson.group?.name || 'Индивидуально'} ·{' '}
                          {lesson.startDate.toLocaleTimeString('ru', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900 mb-4">
              Быстрые действия
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: 'Добавить курс',
                  icon: <BookOpen size={18} />,
                  path: '/org/courses',
                  color: 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100',
                },
                {
                  label: 'Участники',
                  icon: <Users size={18} />,
                  path: '/org/members',
                  color: 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100',
                },
                {
                  label: 'Расписание',
                  icon: <Calendar size={18} />,
                  path: '/org/schedule',
                  color: 'text-violet-600 bg-violet-50 hover:bg-violet-100',
                },
                {
                  label: 'Оплаты',
                  icon: <DollarSign size={18} />,
                  path: '/org/payments',
                  color: 'text-rose-600 bg-rose-50 hover:bg-rose-100',
                },
                {
                  label: 'Группы',
                  icon: <TrendingUp size={18} />,
                  path: '/org/groups',
                  color: 'text-amber-600 bg-amber-50 hover:bg-amber-100',
                },
                {
                  label: 'Адреса',
                  icon: <School size={18} />,
                  path: '/org/addresses',
                  color: 'text-sky-600 bg-sky-50 hover:bg-sky-100',
                },
              ].map(item => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 p-3 rounded-xl text-sm font-medium transition-colors ${item.color}`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
