import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../api/users/requests.ts';
import { useState } from 'react';
import { ErrorsBlock } from './ErrorsBlock.tsx';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';

const LoginUserSchema = z.object({
  email: z.email('Неверный email'),
  password: z.string().min(1, 'Пароль обязателен'),
});

type LoginUserFields = z.infer<typeof LoginUserSchema>;

export const LoginForm = () => {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginUserFields>({ resolver: zodResolver(LoginUserSchema) });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const onSubmit = (data: LoginUserFields) => {
    setLoading(true);
    loginUser(data)
      .finally(() => setLoading(false))
      .then(() => {
        queryClient.invalidateQueries().then(() => navigate('/orgs'));
      })
      .catch(() => setError('root', { message: 'Неверная почта или пароль' }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <ErrorsBlock errors={Object.values(errors)} />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Почта</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              {...register('email')}
              type="email"
              placeholder="example@mail.ru"
              className="w-full pl-9 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Пароль</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Пароль"
              className="w-full pl-9 pr-10 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition-colors"
        >
          {loading ? 'Входим...' : 'Войти'}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-5">
        Нет аккаунта?{' '}
        <Link to="/register" className="text-indigo-600 hover:underline font-medium">
          Зарегистрироваться
        </Link>
      </p>
    </div>
  );
};
