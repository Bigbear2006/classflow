import { MapPin, School } from 'lucide-react';
import { Link } from 'react-router';

const LINKS = [
  ['features', 'Возможности'],
  ['roles', 'Роли'],
  ['how', 'Как работает'],
  ['reviews', 'Отзывы'],
];

interface FooterProps {
  scrollTo: (id: string) => void;
}

export const Footer = ({ scrollTo }: FooterProps) => {
  return (
    <footer className="bg-slate-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center">
              <School size={17} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg">ClassFlow</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {LINKS.map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex gap-3">
            <Link
              to="/login"
              className="px-4 py-2 border border-white/20 text-slate-400 hover:text-white hover:border-white/40 rounded-xl text-sm transition-colors"
            >
              Войти
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-colors"
            >
              Регистрация
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm text-center sm:text-left">
            © 2026 ClassFlow. Платформа управления дополнительным образованием.
          </p>
          <div className="flex items-center gap-3 text-slate-600 text-xs">
            <MapPin size={12} />
            <span>Россия · Все устройства</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
