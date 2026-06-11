import { School } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { navLinkOptions } from '../../labels/landing.tsx';

interface DesktopNavProps {
  scrolled: boolean;
  scrollTo: (id: string) => void;
}

export const DesktopNav = ({ scrolled, scrollTo }: DesktopNavProps) => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-transparent'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
              <School size={17} className="text-white" />
            </div>
            <span
              className={`font-bold text-lg transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}
            >
              ClassFlow
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navLinkOptions.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/login"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white/90 hover:text-white hover:bg-white/10'}`}
            >
              Войти
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm"
            >
              Зарегистрироваться
            </Link>
          </div>

          <Link
            to="/login"
            className={`md:hidden px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm`}
          >
            Войти
          </Link>
        </div>
      </div>
    </header>
  );
};
