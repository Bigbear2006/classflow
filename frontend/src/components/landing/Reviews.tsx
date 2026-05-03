import { FadeIn } from './FadeIn.tsx';
import { Star } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Марина Ковалёва',
    role: 'Директор языковой школы',
    avatar: 'М',
    color: 'bg-violet-500',
    text: 'ClassFlow полностью заменил нам Excel-таблицы. Теперь всё расписание, оплаты и посещаемость в одном месте. Экономим несколько часов в неделю.',
    stars: 5,
  },
  {
    name: 'Алексей Петров',
    role: 'Преподаватель математики',
    avatar: 'А',
    color: 'bg-indigo-500',
    text: 'Удобно отмечать посещаемость прямо со смартфона во время занятия. Расписание всегда под рукой, уведомления приходят вовремя.',
    stars: 5,
  },
  {
    name: 'Дарья Смирнова',
    role: 'Ученица курсов дизайна',
    avatar: 'Д',
    color: 'bg-rose-500',
    text: 'Наконец-то вижу своё расписание и прогресс в одном приложении. Больше не нужно писать преподавателю, чтобы узнать, когда следующее занятие.',
    stars: 5,
  },
];

export const Reviews = () => {
  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
              <Star size={13} className="fill-amber-600" /> Отзывы пользователей
            </div>
            <h2
              className="text-slate-900 font-bold mb-4"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
            >
              Нам доверяют учебные центры
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto" style={{ fontSize: '1.0625rem' }}>
              Владельцы, преподаватели и ученики уже оценили удобство платформы.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-3 gap-6">
          {REVIEWS.map(({ name, role, avatar, color, text, stars }, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: stars }).map((_, j) => (
                    <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed flex-1 mb-5">"{text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  <div
                    className={`w-9 h-9 rounded-full ${color} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}
                  >
                    {avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{name}</div>
                    <div className="text-slate-500 text-xs">{role}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
