import { useState } from 'react';
import { Calendar, Plus, ChevronRight, ChevronLeft } from 'lucide-react';
import type { FormAction, LessonDetail } from '../../entities';
import { LessonForm } from '../../components/admin/schedule/LessonForm.tsx';
import { DAY_NAMES_FULL } from '../../labels/lesson.tsx';
import { useLessons } from '../../hooks/queries/lesson.ts';
import { toast } from 'sonner';
import { useDeleteLessonMutation } from '../../hooks/mutations/lesson.ts';
import {
  displayDate,
  displayDateWithYear,
  displayShortDate,
  getTodayWeekDay,
  getWeekStartDay,
  getWeekDays,
  getDateString,
  dateIsToday,
} from '../../labels/date.ts';
import { MobileScheduleDay } from '../../components/admin/schedule/MobileScheduleDay.tsx';
import { DesktopLessonCard } from '../../components/admin/schedule/DesktopLessonCard.tsx';
import { DesktopScheduleDay } from '../../components/admin/schedule/DesktopScheduleDay.tsx';
import { MobileLessonCard } from '../../components/admin/schedule/MobileLessonCard.tsx';
import { LessonsTable } from '../../components/admin/schedule/LessonsTable.tsx';
import { groupDayLessons } from '../../api/lessons/mappers.ts';

export default function AdminSchedulePage() {
  const [currentWeekStart, setCurrentWeekStart] = useState(getWeekStartDay());
  const [selectedDayIdx, setSelectedDayIdx] = useState(getTodayWeekDay());
  const [selectedLesson, setSelectedLesson] = useState<LessonDetail>();
  const [action, setAction] = useState<FormAction>();

  const weekDays = getWeekDays(currentWeekStart);
  const selectedDay = weekDays[selectedDayIdx];
  const todayInWeek = weekDays.some(d => dateIsToday(d));

  const { data: lessons } = useLessons({
    start_date: getDateString(currentWeekStart),
    end_date: getDateString(weekDays[weekDays.length - 1]),
  });
  const dayLessons = groupDayLessons(lessons);

  const prevWeek = () => {
    setCurrentWeekStart(prev => {
      const next = new Date(prev);
      next.setDate(next.getDate() - 7);
      return next;
    });
    setSelectedDayIdx(0);
  };

  const nextWeek = () => {
    setCurrentWeekStart(prev => {
      const next = new Date(prev);
      next.setDate(next.getDate() + 7);
      return next;
    });
    setSelectedDayIdx(0);
  };

  const goToday = () => {
    setCurrentWeekStart(getWeekStartDay());
    setSelectedDayIdx(getTodayWeekDay());
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
              {displayDate(weekDays[0])} — {displayDateWithYear(weekDays[6])}
            </span>
            <span className="sm:hidden">
              {displayShortDate(weekDays[0])} — {displayShortDate(weekDays[6])}
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

      <div className="md:hidden space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {dayLessons.map(({ date }, index) => (
            <MobileScheduleDay
              key={index}
              index={index}
              date={date}
              selectedDayIdx={selectedDayIdx}
              setSelectedDayIdx={setSelectedDayIdx}
            />
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-slate-800 text-sm">
              {DAY_NAMES_FULL[selectedDayIdx]}, {displayDate(selectedDay)}
            </h2>
            {dayLessons[selectedDayIdx]?.lessons.length > 0 && (
              <span className="text-xs text-slate-400">
                {dayLessons[selectedDayIdx]?.lessons.length} зан.
              </span>
            )}
          </div>

          <div className="space-y-2.5">
            {dayLessons[selectedDayIdx]?.lessons.map(lesson => (
              <DesktopLessonCard
                key={lesson.id}
                lesson={lesson}
                openEdit={openEdit}
                onDeleteLesson={onDeleteLesson}
              />
            ))}
          </div>
          {dayLessons[selectedDayIdx]?.lessons.length === 0 && (
            <div className="bg-white border border-dashed border-slate-200 rounded-2xl py-10 text-center">
              <Calendar size={28} className="mx-auto mb-2 text-slate-300" />
              <p className="text-sm text-slate-400">Занятий нет</p>
            </div>
          )}
        </div>
      </div>

      <div className="hidden md:grid grid-cols-7 gap-2">
        {dayLessons.map(({ date, lessons }, index) => (
          <DesktopScheduleDay
            key={index}
            index={index}
            date={date}
            lessons={lessons}
            openEdit={openEdit}
          />
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200">
        <div className="px-4 sm:px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Занятия на неделе</h2>
        </div>

        <div className="md:hidden divide-y divide-slate-50">
          {lessons.map(lesson => (
            <MobileLessonCard
              key={lesson.id}
              lesson={lesson}
              openEdit={openEdit}
              onDeleteLesson={onDeleteLesson}
            />
          ))}
          {lessons.length === 0 && (
            <div className="py-10 text-center text-slate-400 text-sm">
              Занятий на этой неделе нет
            </div>
          )}
        </div>

        <div className="hidden md:block overflow-x-auto">
          <LessonsTable lessons={lessons} openEdit={openEdit} onDeleteLesson={onDeleteLesson} />
        </div>
      </div>

      {action && <LessonForm action={action} lesson={selectedLesson} closeModal={closeModal} />}
    </div>
  );
}
