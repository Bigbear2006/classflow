import { FadeIn } from './FadeIn.tsx';
import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router';

export const ReadyToStart = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 rounded-3xl p-10 sm:p-14 text-center overflow-hidden shadow-2xl shadow-indigo-900/20">
            {/* Decoration */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/5 rounded-full" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/5 rounded-full" />
            <div className="absolute top-6 left-6">
              <div className="w-2 h-2 rounded-full bg-white/30" />
            </div>
            <div className="absolute top-10 right-10">
              <div className="w-3 h-3 rounded-full bg-white/20" />
            </div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 border border-white/20 rounded-full text-white/80 text-sm font-medium mb-6">
                <Zap size={13} /> Бесплатно без ограничений
              </div>
              <h2
                className="text-white font-bold mb-4"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
              >
                Готовы начать?
              </h2>
              <p
                className="text-indigo-200 mb-8 max-w-lg mx-auto"
                style={{ fontSize: '1.0625rem' }}
              >
                Зарегистрируйтесь сейчас и создайте свой учебный центр за несколько минут. Никаких
                скрытых платежей.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-indigo-700 hover:bg-indigo-50 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Создать аккаунт <ArrowRight size={16} />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 text-white hover:bg-white/10 rounded-2xl font-medium transition-all"
                >
                  Уже есть аккаунт
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
