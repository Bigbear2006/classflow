import { FadeIn } from './FadeIn.tsx';
import { BookOpen, Globe, Shield, Zap } from 'lucide-react';

const STATS = [
  { value: '100%', label: 'Бесплатно навсегда', icon: <Zap size={16} /> },
  { value: '4', label: 'Роли пользователей', icon: <Shield size={16} /> },
  { value: '∞', label: 'Курсов и групп', icon: <BookOpen size={16} /> },
  {
    value: '24/7',
    label: 'С любого устройства',
    icon: <Globe size={16} />,
  },
];

export const Stats = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(({ value, label, icon }, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors group">
                <div className="flex justify-center mb-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {icon}
                  </div>
                </div>
                <div
                  className="font-bold text-slate-900 mb-1"
                  style={{ fontSize: '1.75rem', lineHeight: 1 }}
                >
                  {value}
                </div>
                <div className="text-slate-500 text-sm">{label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
