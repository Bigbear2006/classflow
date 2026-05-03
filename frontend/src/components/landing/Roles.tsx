import { FadeIn } from './FadeIn.tsx';
import { CheckCircle2, Crown, GraduationCap, UserCheck, Users } from 'lucide-react';

const ROLES = [
  {
    icon: <Crown size={24} />,
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50 border-violet-200',
    accent: 'text-violet-700',
    role: 'Владелец',
    desc: 'Создаёт организацию, управляет всем: курсами, сотрудниками, расписанием и финансами.',
    perks: [
      'Полный доступ ко всем данным',
      'Настройка курсов и групп',
      'Управление ролями участников',
      'Финансовая аналитика',
    ],
  },
  {
    icon: <UserCheck size={24} />,
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50 border-emerald-200',
    accent: 'text-emerald-700',
    role: 'Преподаватель',
    desc: 'Ведёт занятия, отмечает посещаемость студентов и следит за своим расписанием.',
    perks: [
      'Личное расписание занятий',
      'Отметка посещаемости',
      'Перенос занятий',
      'Просмотр своих курсов',
    ],
  },
  {
    icon: <GraduationCap size={24} />,
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50 border-blue-200',
    accent: 'text-blue-700',
    role: 'Ученик',
    desc: 'Просматривает курсы, записывается на занятия и отслеживает свой прогресс и оплаты.',
    perks: [
      'Каталог курсов организации',
      'Запись в группы',
      'Индивидуальные занятия',
      'Личный прогресс и статистика',
    ],
  },
];

export const Roles = () => {
  return (
    <section id="roles" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-100 text-violet-700 rounded-full text-sm font-medium mb-4">
              <Users size={13} /> Роли участников
            </div>
            <h2
              className="text-slate-900 font-bold mb-4"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
            >
              Для каждого — свои инструменты
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto" style={{ fontSize: '1.0625rem' }}>
              Четыре роли с разными правами доступа. Каждый участник видит только то, что ему
              нужно.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {ROLES.map(({ icon, color, bg, accent, role, desc, perks }, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className={`rounded-3xl border p-6 ${bg} flex flex-col h-full`}>
                <div
                  className={`inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br ${color} items-center justify-center text-white mb-4 shadow-sm`}
                >
                  {icon}
                </div>
                <h3 className={`font-bold mb-2 ${accent}`} style={{ fontSize: '1.125rem' }}>
                  {role}
                </h3>
                <p className="text-slate-600 text-sm mb-5 leading-relaxed">{desc}</p>
                <ul className="space-y-2 mt-auto">
                  {perks.map((p, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 size={14} className={`${accent} flex-shrink-0 mt-0.5`} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
