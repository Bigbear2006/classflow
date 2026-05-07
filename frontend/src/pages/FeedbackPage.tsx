import { useState } from 'react';
import { Search, Users, X } from 'lucide-react';
import type { FeedbackTab, TeacherWithFeedback } from '../entities';
import { TeacherFeedbackCard } from '../components/feedback/TeacherFeedbackCard.tsx';
import { TeacherFeedbackDetailCard } from '../components/feedback/TeacherFeedbackDetailCard.tsx';
import { AboutTeacher } from '../components/feedback/AboutTeacher.tsx';
import { TeacherFeedback } from '../components/feedback/TeacherFeedback.tsx';

export const FeedbackPage = () => {
  const [search, setSearch] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherWithFeedback>();
  const [tab, setTab] = useState<FeedbackTab>('ABOUT');
  const teachers: TeacherWithFeedback[] = [];

  return (
    <div className="flex h-full overflow-hidden">
      <div
        className={`flex flex-col ${
          selectedTeacher ? 'hidden lg:flex' : 'flex'
        } w-full lg:w-80 border-r border-slate-200 bg-white flex-shrink-0`}
      >
        <div className="px-5 pt-6 pb-4 border-b border-slate-100">
          <h1 className="text-slate-900 text-xl font-semibold">Преподаватели</h1>
          <p className="text-slate-500 text-sm mt-0.5">Наша команда педагогов</p>
          <div className="relative mt-4">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск по имени..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {teachers.map(teacher => (
            <TeacherFeedbackCard
              teacher={teacher}
              selectedTeacher={selectedTeacher}
              setSelectedTeacher={setSelectedTeacher}
              setTab={setTab}
            />
          ))}
          {teachers.length === 0 && (
            <div className="py-16 text-center text-slate-400">
              <Users size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">Ничего не найдено</p>
            </div>
          )}
        </div>
      </div>
      {selectedTeacher ? (
        <div className="flex-1 overflow-y-auto bg-slate-50">
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3">
            <button
              onClick={() => setSelectedTeacher(undefined)}
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
            >
              <X size={16} /> Назад к списку
            </button>
          </div>
          <TeacherFeedbackDetailCard selectedTeacher={selectedTeacher} tab={tab} setTab={setTab} />
          <div className="p-6 space-y-5">
            {tab === 'ABOUT' ? (
              <AboutTeacher selectedTeacher={selectedTeacher} />
            ) : (
              <TeacherFeedback selectedTeacher={selectedTeacher} />
            )}
          </div>
        </div>
      ) : (
        <div className="hidden lg:flex flex-1 items-center justify-center bg-slate-50">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-200 flex items-center justify-center mx-auto mb-4">
              <Users size={28} className="text-slate-400" />
            </div>
            <p className="text-slate-500">Выберите преподавателя из списка</p>
            <p className="text-slate-400 text-sm mt-1">чтобы увидеть подробную информацию</p>
          </div>
        </div>
      )}
    </div>
  );
};
