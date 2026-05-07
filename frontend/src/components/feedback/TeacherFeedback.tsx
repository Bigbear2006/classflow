import { MessageSquare, Send } from 'lucide-react';
import { StarRating } from './StarRating.tsx';
import type { FeedbackDetail, TeacherWithFeedback } from '../../entities';
import { useFeedbackForm } from '../../hooks/forms/feedback.ts';
import { useState } from 'react';

interface TeacherFeedbackProps {
  selectedTeacher: TeacherWithFeedback;
}

export const TeacherFeedback = ({ selectedTeacher }: TeacherFeedbackProps) => {
  const { register, getValues, handleSubmit } = useFeedbackForm();
  const [submitted, setSubmitted] = useState(false);
  const feedbacks: FeedbackDetail[] = [];

  return (
    <>
      {selectedTeacher.userCanAddFeedback && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <MessageSquare size={16} className="text-indigo-500" /> Оставить отзыв
          </h3>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-slate-600 mb-2">Оценка</div>
              <StarRating
                {...register('rating')}
                rating={getValues('rating')}
                size={24}
                // interactive
                // onRate={rating => setValue('rating', rating)}
              />
            </div>
            <div>
              <div className="text-sm text-slate-600 mb-2">Ваш отзыв</div>
              <textarea
                {...register('text')}
                // placeholder="Поделитесь впечатлениями о преподавателе..."
                // rows={3}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>
            {submitted ? (
              <div className="text-emerald-600 text-sm font-medium flex items-center gap-2">
                ✓ Спасибо за ваш отзыв!
              </div>
            ) : (
              <button
                onClick={handleSubmit(data => {
                  setSubmitted(true);
                  console.log(data);
                })}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={14} /> Отправить
              </button>
            )}
          </div>
        </div>
      )}

      {feedbacks.length > 0 ? (
        <div className="space-y-3">
          {feedbacks.map(fb => (
            <div key={fb.id} className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {fb.author.user.fullname.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 text-sm">
                      {fb.author.user.fullname}
                    </div>
                    <div className="text-slate-400 text-xs">{fb.createdAt}</div>
                  </div>
                </div>
                <StarRating rating={fb.rating} size={13} />
              </div>
              <p className="text-slate-600 text-sm mt-3 leading-relaxed">{fb.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 py-12 text-center">
          <MessageSquare size={32} className="mx-auto mb-2 text-slate-300" />
          <p className="text-slate-500 text-sm">Пока нет отзывов</p>
          {selectedTeacher.userCanAddFeedback && (
            <p className="text-slate-400 text-xs mt-1">Будьте первым, кто оставит отзыв!</p>
          )}
        </div>
      )}
    </>
  );
};
