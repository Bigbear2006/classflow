import { BookOpen } from 'lucide-react';
import { StarRating } from './StarRating.tsx';
import type { FeedbackTab, TeacherWithFeedback } from '../../entities';
import type { Dispatch, SetStateAction } from 'react';

interface TeacherFeedbackDetailCardProps {
  selectedTeacher: TeacherWithFeedback;
  tab: FeedbackTab;
  setTab: Dispatch<SetStateAction<FeedbackTab>>;
}

export const TeacherFeedbackDetailCard = ({
  selectedTeacher,
  tab: currentTab,
  setTab,
}: TeacherFeedbackDetailCardProps) => {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="px-6 pt-6 pb-5">
        <div className="flex items-start gap-5">
          {selectedTeacher.user.avatar ? (
            <img
              src={selectedTeacher.user.avatar}
              alt=""
              className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold flex-shrink-0">
              {selectedTeacher.user.fullname.charAt(0)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h2 className="text-slate-900 text-xl font-semibold">
              {selectedTeacher.user.fullname}
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedTeacher.courses.map(course => (
                <span
                  key={course.id}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700"
                >
                  <BookOpen size={10} /> {course.subject.name}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3 mt-3">
              <StarRating rating={selectedTeacher.rating} size={16} />
              <span className="text-slate-700 font-medium">
                {selectedTeacher.rating ? selectedTeacher.rating.toFixed(1) : '—'}
              </span>
              <span className="text-slate-500 text-sm">
                ({selectedTeacher.feedbackCount} отзывов)
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-5">
          <div className="bg-slate-50 rounded-xl p-3 text-center">
            <div className="text-slate-900 font-bold text-lg">
              {selectedTeacher.courses.length}
            </div>
            <div className="text-slate-500 text-xs">Курсов</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 text-center">
            <div className="text-slate-900 font-bold text-lg">{selectedTeacher.feedbackCount}</div>
            <div className="text-slate-500 text-xs">Отзывов</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 text-center">
            <div className="text-slate-900 font-bold text-lg">
              {selectedTeacher.rating ? selectedTeacher.rating.toFixed(1) : '—'}
            </div>
            <div className="text-slate-500 text-xs">Рейтинг</div>
          </div>
        </div>

        <div className="flex gap-1 mt-5 bg-slate-100 rounded-xl p-1">
          {(['ABOUT', 'FEEDBACK'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setTab(tab)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                currentTab === tab
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab === 'ABOUT' ? 'О преподавателе' : `Отзывы (${selectedTeacher.feedbackCount})`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
