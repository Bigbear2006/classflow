import { ChevronRight, LogIn, School, UserPlus, X } from 'lucide-react';
import { Link } from 'react-router';
import { navLinkOptions } from '../../labels/landing.tsx';

interface MobileNavProps {
  menuVisible: boolean;
  closeMenu: () => void;
  scrollTo: (id: string) => void;
}

export const MobileNav = ({ menuVisible, closeMenu, scrollTo }: MobileNavProps) => {
  return (
    <div className="md:hidden fixed inset-0 z-[60] flex">
      {/* Backdrop */}
      <div
        onClick={closeMenu}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: menuVisible ? 1 : 0 }}
      />

      {/* Drawer panel — slides in from right */}
      <div
        className="relative ml-auto w-[85vw] max-w-sm h-full bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-out"
        style={{
          transform: menuVisible ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-indigo-600 to-violet-600 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <School size={17} className="text-white" />
            </div>
            <span className="text-white font-bold text-base">ClassFlow</span>
          </div>
          <button
            onClick={closeMenu}
            aria-label="Закрыть меню"
            className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav links */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-2 mb-3">
            Навигация
          </p>
          {navLinkOptions.map(({ id, label, icon, color, bg }, i) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="w-full flex items-center gap-3.5 px-3 py-3 rounded-2xl hover:bg-slate-50 active:bg-slate-100 transition-colors group text-left"
              style={{
                transitionDelay: menuVisible ? `${i * 50 + 60}ms` : '0ms',
                opacity: menuVisible ? 1 : 0,
                transform: menuVisible ? 'translateX(0)' : 'translateX(16px)',
                transition: `opacity 0.3s ease ${i * 50 + 60}ms, transform 0.3s ease ${i * 50 + 60}ms, background-color 0.15s ease`,
              }}
            >
              <div
                className={`w-9 h-9 rounded-xl ${bg} ${color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
              >
                {icon}
              </div>
              <span className="font-medium text-slate-800 text-sm">{label}</span>
              <ChevronRight
                size={15}
                className="ml-auto text-slate-300 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all"
              />
            </button>
          ))}

          {/* Divider */}
          <div className="pt-4 pb-1">
            <div className="border-t border-slate-100" />
          </div>
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-2 pt-1 mb-3">
            Аккаунт
          </p>

          {/* Auth links */}
          <Link
            to="/login"
            onClick={closeMenu}
            className="flex items-center gap-3.5 px-3 py-3 rounded-2xl hover:bg-slate-50 active:bg-slate-100 transition-colors group"
            style={{
              transitionDelay: menuVisible ? '280ms' : '0ms',
              opacity: menuVisible ? 1 : 0,
              transform: menuVisible ? 'translateX(0)' : 'translateX(16px)',
              transition:
                'opacity 0.3s ease 280ms, transform 0.3s ease 280ms, background-color 0.15s ease',
            }}
          >
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <LogIn size={18} />
            </div>
            <span className="font-medium text-slate-800 text-sm">Войти в аккаунт</span>
            <ChevronRight
              size={15}
              className="ml-auto text-slate-300 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all"
            />
          </Link>
        </div>

        {/* CTA button at bottom */}
        <div
          className="px-4 pb-8 pt-4 border-t border-slate-100 flex-shrink-0 space-y-2.5"
          style={{
            opacity: menuVisible ? 1 : 0,
            transform: menuVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.35s ease 320ms, transform 0.35s ease 320ms',
          }}
        >
          <Link
            to="/register"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-2xl font-semibold text-sm shadow-lg shadow-indigo-900/20 transition-all active:scale-[0.98]"
          >
            <UserPlus size={16} />
            Начать бесплатно
          </Link>
          <p className="text-center text-[11px] text-slate-400">
            Без кредитной карты · Бесплатно навсегда
          </p>
        </div>
      </div>
    </div>
  );
};
