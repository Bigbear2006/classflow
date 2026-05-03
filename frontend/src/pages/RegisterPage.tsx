import { Link } from 'react-router';
import { School } from 'lucide-react';
import { RegisterForm } from '../components/common/RegisterForm.tsx';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 flex flex-col">
      <div className="px-8 py-6 flex items-center gap-3 flex-shrink-0">
        <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center">
          <School size={22} className="text-white" />
        </div>
        <div>
          <div className="text-white font-semibold text-lg leading-tight">ClassFlow</div>
          <div className="text-slate-400 text-xs">Платформа дополнительного образования</div>
        </div>
        <Link to="/" className="ml-auto text-slate-400 hover:text-white text-sm transition-colors">
          ← На главную
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-white text-3xl font-bold mb-2">Создать аккаунт</h1>
            <p className="text-slate-400">Зарегистрируйтесь, чтобы начать</p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
