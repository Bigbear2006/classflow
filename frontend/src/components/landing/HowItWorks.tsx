import { FadeIn } from './FadeIn.tsx';
import { BarChart3, BookOpen, Building2, Calendar, TrendingUp, Users } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: <Building2 size={20} />,
    color: 'bg-indigo-600',
    title: 'Создайте организацию',
    desc: 'Зарегистрируйтесь и создайте свой учебный центр. Укажите название, добавьте адреса и кабинеты.',
  },
  {
    num: '02',
    icon: <BookOpen size={20} />,
    color: 'bg-violet-600',
    title: 'Настройте курсы',
    desc: 'Создайте курсы, назначьте преподавателей, сформируйте группы и установите расписание.',
  },
  {
    num: '03',
    icon: <Users size={20} />,
    color: 'bg-emerald-600',
    title: 'Пригласите учеников',
    desc: 'Отправьте slug организации ученикам — они зарегистрируются и запишутся на нужные курсы.',
  },
  {
    num: '04',
    icon: <BarChart3 size={20} />,
    color: 'bg-amber-500',
    title: 'Управляйте и развивайтесь',
    desc: 'Отслеживайте посещаемость, оплаты и прогресс учеников в режиме реального времени.',
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="how"
      className="py-20 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden"
    >
      {/* bg decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 text-indigo-300 border border-white/10 rounded-full text-sm font-medium mb-4">
              <TrendingUp size={13} /> Как это работает
            </div>
            <h2
              className="text-white font-bold mb-4"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
            >
              Запуск за 4 шага
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto" style={{ fontSize: '1.0625rem' }}>
              Начните использовать платформу прямо сейчас — настройка занимает не больше 10 минут.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map(({ num, icon, color, title, desc }, i) => (
            <FadeIn key={i} delay={i * 90}>
              <div className="relative">
                {i < STEPS.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-white/20 to-transparent z-0"
                    style={{ width: 'calc(100% - 2rem)' }}
                  />
                )}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 hover:border-white/20 transition-all relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center text-white flex-shrink-0 shadow-sm`}
                    >
                      {icon}
                    </div>
                    <span className="font-bold text-slate-500 text-sm">{num}</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2" style={{ fontSize: '0.9375rem' }}>
                    {title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Screenshots row */}
        <div className="mt-16 grid sm:grid-cols-3 gap-4">
          {[
            {
              src: 'https://images.unsplash.com/photo-1588912914074-b93851ff14b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
              label: 'Расписание занятий',
              icon: <Calendar size={14} />,
            },
            {
              src: 'https://images.unsplash.com/photo-1612831455740-a2f6212eeeb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
              label: 'Каталог курсов',
              icon: <BookOpen size={14} />,
            },
            {
              src: 'https://images.unsplash.com/photo-1617131633412-39437b40a16b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
              label: 'Аналитика и оплаты',
              icon: <BarChart3 size={14} />,
            },
          ].map(({ src, label, icon }, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="relative rounded-2xl overflow-hidden group">
                <img
                  src={src}
                  alt={label}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-2 text-white">
                  <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                    {icon}
                  </div>
                  <span className="text-sm font-medium">{label}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
