import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

interface HeroProps {
  scrollTo: (id: string) => void;
}

export const CallToAction = ({ scrollTo }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 overflow-hidden pt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/30 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 lg:py-32 w-full">
        <div className="grid lg:grid-cols-1 gap-12 lg:gap-16 items-center justify-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/20 border border-indigo-400/30 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-indigo-300 text-xs font-medium">
                Платформа дополнительного образования
              </span>
            </div>

            <h1
              className="text-white font-bold leading-tight mb-6"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                lineHeight: '1.15',
              }}
            >
              Управляйте учебным центром{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                без лишних усилий
              </span>
            </h1>

            <p
              className="text-slate-400 mb-8 leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}
            >
              ClassFlow — всё для управления дополнительным образованием: курсы, расписание,
              посещаемость и оплаты в одном месте.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-medium transition-all shadow-lg shadow-indigo-900/40 hover:shadow-indigo-900/60 hover:-translate-y-0.5"
              >
                Зарегистрироваться <ArrowRight size={16} />
              </Link>
              <button
                onClick={() => scrollTo('how')}
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-white/80 hover:text-white rounded-2xl font-medium transition-all hover:bg-white/5"
              >
                Как это работает <ChevronRight size={16} />
              </button>
            </div>

            <div className="flex flex-wrap gap-6">
              {[
                {
                  icon: <CheckCircle2 size={14} className="text-emerald-400" />,
                  text: 'Бесплатно навсегда',
                },
                {
                  icon: <CheckCircle2 size={14} className="text-emerald-400" />,
                  text: 'Без ограничений',
                },
                {
                  icon: <CheckCircle2 size={14} className="text-emerald-400" />,
                  text: 'Мобильный интерфейс',
                },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-1.5">
                  {icon}
                  <span className="text-slate-400 text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 80L1440 80L1440 40C1200 80 960 0 720 20C480 40 240 80 0 40L0 80Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};
