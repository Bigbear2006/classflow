import { BarChart3, BookOpen, Building2, Calendar, DollarSign, Users, Zap } from 'lucide-react';
import { FadeIn } from './FadeIn.tsx';

const FEATURES = [
  {
    icon: <Building2 size={22} />,
    color: 'bg-indigo-100 text-indigo-600',
    title: 'Управление организацией',
    desc: 'Создайте учебный центр, добавьте адреса, кабинеты и настройте всё за несколько минут.',
  },
  {
    icon: <BookOpen size={22} />,
    color: 'bg-violet-100 text-violet-600',
    title: 'Курсы и группы',
    desc: 'Создавайте курсы с гибкими настройками: формат, оплата, длительность. Набирайте группы или проводите индивидуальные занятия.',
  },
  {
    icon: <Calendar size={22} />,
    color: 'bg-emerald-100 text-emerald-600',
    title: 'Расписание',
    desc: 'Удобный недельный календарь с управлением занятиями. Отмечайте посещаемость прямо в расписании.',
  },
  {
    icon: <DollarSign size={22} />,
    color: 'bg-amber-100 text-amber-600',
    title: 'Учёт оплат',
    desc: 'Контролируйте оплату: поэтапная оплата курса для групп, оплата отдельных занятий для индивидуальных учеников.',
  },
  {
    icon: <Users size={22} />,
    color: 'bg-rose-100 text-rose-600',
    title: 'Участники и роли',
    desc: 'Гибкая система ролей: Владелец, Администратор, Преподаватель, Ученик.',
  },
  {
    icon: <BarChart3 size={22} />,
    color: 'bg-cyan-100 text-cyan-600',
    title: 'Аналитика и прогресс',
    desc: 'Следите за успеваемостью учеников, посещаемостью и финансовыми показателями в едином дашборде.',
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
              <Zap size={13} /> Возможности платформы
            </div>
            <h2
              className="text-slate-900 font-bold mb-4"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
            >
              Всё необходимое для учебного центра
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto" style={{ fontSize: '1.0625rem' }}>
              От создания курсов до финансовой аналитики — ClassFlow закрывает все задачи
              управления дополнительным образованием.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon, color, title, desc }, i) => (
            <FadeIn key={i} delay={i * 70}>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-indigo-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group h-full">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 ${color} group-hover:scale-110 transition-transform`}
                >
                  {icon}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2" style={{ fontSize: '1rem' }}>
                  {title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
