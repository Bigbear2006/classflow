import { useEffect, useState } from 'react';
import {
  Calendar,
  Plus,
  Edit2,
  Trash2,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  UserCheck,
} from 'lucide-react';
import type { FormAction, LessonDetail } from '../../types.ts';
import { LessonForm } from '../../components/admin/schedule/LessonForm.tsx';
import { DAY_NAMES_FULL, DAY_NAMES_SHORT, statusConfig } from '../../labels.tsx';
import { useLessons } from '../../hooks/queries/lesson.ts';
import { toast } from 'sonner';
import { useDeleteLessonMutation } from '../../hooks/mutations/lesson.ts';

export default function AdminSchedulePage() {
  const getWeekStart = () => {
    const d = new Date();
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const [currentWeekStart, setCurrentWeekStart] = useState(getWeekStart);
  const [selectedDayIdx, setSelectedDayIdx] = useState(() => {
    // const day = new Date().getDay();
    // return day === 0 ? 6 : day - 1;
    return 0;
  });

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(currentWeekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const prevWeek = () => {
    const d = new Date(currentWeekStart);
    d.setDate(d.getDate() - 7);
    setCurrentWeekStart(d);
    setSelectedDayIdx(0);
  };
  const nextWeek = () => {
    const d = new Date(currentWeekStart);
    d.setDate(d.getDate() + 7);
    setCurrentWeekStart(d);
    setSelectedDayIdx(0);
  };

  const goToday = () => {
    setCurrentWeekStart(getWeekStart());
    const day = new Date().getDay();
    setSelectedDayIdx(day === 0 ? 6 : day - 1);
  };

  const today = new Date().toISOString().split('T')[0];
  const selectedDay = weekDays[selectedDayIdx];
  const todayInWeek = weekDays.some(d => d.toISOString().split('T')[0] === today);

  interface DayLessons {
    date: Date;
    lessons: LessonDetail[];
  }

  const { data: lessons } = useLessons();
  const [action, setAction] = useState<FormAction>();
  const [selectedLesson, setSelectedLesson] = useState<LessonDetail>();
  const [dayLessons, setDayLessons] = useState<DayLessons[]>([{ date: new Date(), lessons: [] }]);

  const groupDayLessons = (): DayLessons[] => {
    const map = new Map<string, LessonDetail[]>();
    for (const lesson of lessons) {
      let key = lesson.startDate.toISOString().slice(0, 10);
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)!.push(lesson);
    }
    return Array.from(map.entries()).map(([date, lessons]) => ({
      date: new Date(date),
      lessons: lessons,
    }));
  };

  const getLessonStatusCfg = (lesson: LessonDetail) => {
    let cfg = statusConfig.SCHEDULED;
    if (lesson.endDate < new Date()) {
      cfg = statusConfig.COMPLETED;
    }
    return cfg;
  };

  const openCreate = () => {
    setAction('CREATE');
  };

  const openEdit = (lesson: LessonDetail) => {
    setSelectedLesson(lesson);
    setAction('EDIT');
  };

  const closeModal = () => {
    setSelectedLesson(undefined);
    setAction(undefined);
  };

  const deleteLessonMutation = useDeleteLessonMutation();
  const onDeleteLesson = (lessonId: number) =>
    toast('Удалить урок?', {
      action: { label: 'Удалить', onClick: () => deleteLessonMutation.mutate(lessonId) },
      cancel: { label: 'Отмена', onClick: () => {} },
    });

  useEffect(() => {
    setDayLessons(groupDayLessons());
  }, [lessons]);

  return (
    <div className="p-4 sm:p-6 space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-slate-900 text-xl sm:text-2xl font-semibold">Расписание</h1>
          <p className="text-slate-500 text-sm mt-0.5 hidden sm:block">Управление занятиями</p>
        </div>
        <button
          onClick={() => setAction('CREATE')}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm flex-shrink-0"
        >
          <Plus size={16} />
          <span className="hidden sm:inline" onClick={openCreate}>
            Добавить занятие
          </span>
          <span className="sm:hidden" onClick={openCreate}>
            Добавить
          </span>
        </button>
      </div>

      {/* Weeks */}
      <div className="flex items-center gap-2 bg-white rounded-2xl border border-slate-200 px-3 py-2.5">
        <button
          onClick={prevWeek}
          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 flex-shrink-0"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex-1 text-center">
          <span className="font-medium text-slate-900 text-sm">
            <span className="hidden sm:inline">
              {weekDays[0].toLocaleDateString('ru', {
                day: 'numeric',
                month: 'long',
              })}{' '}
              —{' '}
              {weekDays[6].toLocaleDateString('ru', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span className="sm:hidden">
              {weekDays[0].toLocaleDateString('ru', {
                day: 'numeric',
                month: 'short',
              })}{' '}
              —{' '}
              {weekDays[6].toLocaleDateString('ru', {
                day: 'numeric',
                month: 'short',
              })}
            </span>
          </span>
        </div>
        {!todayInWeek && (
          <button
            onClick={goToday}
            className="text-xs px-2 py-1 rounded-lg bg-indigo-50 text-indigo-600 font-medium hover:bg-indigo-100 transition-colors flex-shrink-0"
          >
            Сегодня
          </button>
        )}
        <button
          onClick={nextWeek}
          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 flex-shrink-0"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-4">
        {/* Days */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {dayLessons.map(({ date }, index) => {
            const isToday = date.setHours(0, 0, 0) === new Date().setHours(0, 0, 0);
            return (
              <button
                key={index}
                onClick={() => setSelectedDayIdx(index)}
                className={`flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2.5 rounded-2xl transition-all border ${
                  index === selectedDayIdx
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                    : isToday
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
                }`}
              >
                <span className="text-[10px] font-semibold uppercase tracking-wide opacity-80">
                  {DAY_NAMES_SHORT[index]}
                </span>
                <span className="text-lg font-bold leading-none">{date.getDate()}</span>
                {dayLessons.length > 0 ? (
                  <span
                    className={`w-1.5 h-1.5 rounded-full mt-0.5 ${index === selectedDayIdx ? 'bg-white/70' : 'bg-indigo-400'}`}
                  />
                ) : (
                  <span className="w-1.5 h-1.5 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-slate-800 text-sm">
              {DAY_NAMES_FULL[selectedDayIdx]},{' '}
              {selectedDay.toLocaleDateString('ru', {
                day: 'numeric',
                month: 'long',
              })}
            </h2>
            {dayLessons[selectedDayIdx]?.lessons.length > 0 && (
              <span className="text-xs text-slate-400">
                {dayLessons[selectedDayIdx]?.lessons.length} зан.
              </span>
            )}
          </div>

          {dayLessons[selectedDayIdx]?.lessons.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-200 rounded-2xl py-10 text-center">
              <Calendar size={28} className="mx-auto mb-2 text-slate-300" />
              <p className="text-sm text-slate-400">Занятий нет</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {dayLessons[selectedDayIdx]?.lessons.map(lesson => {
                let cfg = getLessonStatusCfg(lesson);
                return (
                  <div
                    key={lesson.id}
                    className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 text-sm leading-snug">
                          Урок #{lesson.id}
                        </div>
                        {/*TODO: add subtitle here*/}
                        {lesson.createdAt && (
                          <div className="text-xs text-slate-400 mt-0.5">
                            {lesson.createdAt.getDate()}
                          </div>
                        )}
                      </div>
                      <span
                        className={`flex-shrink-0 px-2 py-1 rounded-lg text-xs font-medium ${cfg.color}`}
                      >
                        {cfg.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <Clock size={12} className="text-slate-400 flex-shrink-0" />
                        <span>
                          {lesson.startDate.toLocaleTimeString('ru', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}{' '}
                          —{' '}
                          {lesson.endDate.toLocaleTimeString('ru', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      {lesson.cabinet && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <MapPin size={12} className="text-slate-400 flex-shrink-0" />
                          <span className="truncate">{lesson.cabinet.number}</span>
                        </div>
                      )}
                      {lesson.conductedBy && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 col-span-2">
                          <UserCheck size={12} className="text-slate-400 flex-shrink-0" />
                          <span className="truncate">{lesson.conductedBy.fullname}</span>
                        </div>
                      )}
                      {/*{lesson.topic && (*/}
                      {/*  <div className="text-xs text-slate-500 col-span-2 bg-slate-50 rounded-lg px-2 py-1">*/}
                      {/*    {lesson.topic}*/}
                      {/*  </div>*/}
                      {/*)}*/}
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => openEdit(lesson)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-medium transition-colors"
                      >
                        <Edit2 size={13} /> Редактировать
                      </button>
                      <button
                        onClick={() => onDeleteLesson(lesson.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 text-xs font-medium transition-colors"
                      >
                        <Trash2 size={13} /> Удалить
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:grid grid-cols-7 gap-2">
        {dayLessons.map(({ date, lessons }, index) => {
          const isToday = date.setHours(0, 0, 0) === new Date().setHours(0, 0, 0);
          return (
            <div key={index} className="min-h-[120px]">
              <div
                className={`text-center py-2 rounded-xl mb-2 ${isToday ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700'}`}
              >
                <div className="text-xs font-medium">{DAY_NAMES_SHORT[index]}</div>
                <div className="text-sm font-bold">{date.getDate()}</div>
              </div>
              <div className="space-y-1.5">
                {lessons.map(lesson => {
                  let cfg = getLessonStatusCfg(lesson);
                  return (
                    <div
                      key={lesson.id}
                      onClick={() => openEdit(lesson)}
                      className="p-1.5 bg-white border border-slate-200 rounded-xl cursor-pointer hover:shadow-sm transition-shadow text-xs"
                    >
                      <div className="font-medium text-slate-800 truncate">Урок #{lesson.id}</div>
                      <div className="text-slate-400">
                        {lesson.startDate.toLocaleTimeString('ru', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-medium ${cfg.color}`}
                      >
                        {cfg.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Weeks */}
      <div className="bg-white rounded-2xl border border-slate-200">
        <div className="px-4 sm:px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Занятия на неделе</h2>
        </div>

        {/* Mobile card list */}
        <div className="md:hidden divide-y divide-slate-50">
          {lessons.map(lesson => {
            const cfg = getLessonStatusCfg(lesson);
            return (
              <div key={lesson.id} className="px-4 py-3.5 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-indigo-700 text-xs font-bold leading-none">
                    {lesson.startDate.getDate()}
                  </span>
                  <span className="text-indigo-400 text-[9px]">
                    {
                      DAY_NAMES_SHORT[
                        lesson.startDate.getDay() === 0 ? 6 : lesson.startDate.getDay() - 1
                      ]
                    }
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-slate-900 truncate">
                    Урок #{lesson.id}
                  </div>
                  {/*TODO: add subtitle*/}
                  {/*{sub && <div className="text-xs text-slate-400">{sub}</div>}*/}
                  <div className="text-xs text-slate-500 mt-0.5">
                    {lesson.startDate.toLocaleTimeString('ru', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    —{' '}
                    {lesson.endDate.toLocaleTimeString('ru', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                    {` · каб. ${lesson.cabinet?.number}`}
                  </div>
                  <span
                    className={`inline-block mt-1.5 px-2 py-0.5 rounded-lg text-xs font-medium ${cfg.color}`}
                  >
                    {cfg.label}
                  </span>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => openEdit(lesson)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => onDeleteLesson(lesson.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
          {lessons.length === 0 && (
            <div className="py-10 text-center text-slate-400 text-sm">
              Занятий на этой неделе нет
            </div>
          )}
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                  Курс / Группа
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                  Дата и время
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                  Кабинет
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 hidden lg:table-cell">
                  Тема
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                  Статус
                </th>
                <th className="px-5 py-3 w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {lessons.map(lesson => {
                const cfg = getLessonStatusCfg(lesson);
                return (
                  <tr key={lesson.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <div className="font-medium text-sm text-slate-900">Урок #{lesson.id}</div>
                      <div className="text-xs text-slate-400">
                        {lesson.conductedBy.fullname.split(' ')[0] || ''}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-700">
                      <div>
                        {lesson.startDate.toLocaleDateString('ru', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </div>
                      <div className="text-xs text-slate-400">
                        {lesson.startDate.toLocaleTimeString('ru', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}{' '}
                        —{' '}
                        {lesson.endDate.toLocaleTimeString('ru', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-600">{lesson.cabinet?.number}</td>
                    {/*<td className="px-5 py-3 text-sm text-slate-600 hidden lg:table-cell">*/}
                    {/*  {lesson.topic || '—'}*/}
                    {/*</td>*/}
                    <td className="px-5 py-3">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${cfg.color}`}>
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => openEdit(lesson)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => onDeleteLesson(lesson.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {lessons.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-slate-400 text-sm">
                    Занятий на этой неделе нет
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {action && <LessonForm action={action} lesson={selectedLesson} closeModal={closeModal} />}
    </div>
  );
}
