import { StarRating } from './StarRating.tsx';
import { ChevronRight } from 'lucide-react';
import type { FeedbackTab, TeacherWithFeedback } from '../../entities';
import type { Dispatch, SetStateAction } from 'react';

interface TeacherFeedbackCardProps {
  teacher: TeacherWithFeedback;
  selectedTeacher?: TeacherWithFeedback;
  setSelectedTeacher: Dispatch<SetStateAction<TeacherWithFeedback | undefined>>;
  setTab: Dispatch<SetStateAction<FeedbackTab>>;
}

export const TeacherFeedbackCard = ({
  teacher,
  selectedTeacher,
  setSelectedTeacher,
  setTab,
}: TeacherFeedbackCardProps) => {
  return (
    <button
      onClick={() => {
        setSelectedTeacher(teacher);
        setTab('ABOUT');
      }}
      className={`w-full text-left px-5 py-4 hover:bg-slate-50 transition-colors ${
        selectedTeacher?.id === teacher.id ? 'bg-indigo-50 border-r-2 border-indigo-500' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        {teacher.user.avatar ? (
          <img
            src={teacher.user.avatar}
            alt=""
            className="w-11 h-11 rounded-xl object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg flex-shrink-0">
            {teacher.user.fullname.charAt(0)}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-slate-900 text-sm truncate">
            {teacher.user.fullname}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={teacher.rating} size={11} />
            <span className="text-xs text-slate-400">
              {teacher.rating ? teacher.rating.toFixed(1) : ''} · {teacher.feedbackCount} отзывов
            </span>
          </div>
        </div>
        <ChevronRight size={14} className="text-slate-400 flex-shrink-0" />
      </div>
    </button>
  );
};
