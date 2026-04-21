import { Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react';
import { ErrorsBlock } from './ErrorsBlock.tsx';
import { z } from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUser } from '../../api/user.ts';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';

const RegisterUserSchema = z
  .object({
    fullname: z.string().refine(val => val.split(' ').length >= 2, {
      message: 'ФИО должно состоять минимум из двух слов',
    }),
    email: z.email('Неверная почта'),
    phone: z.string(),
    password: z.string().min(8, 'Длина пароля минимум 8 символов'),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!isValidPhoneNumber(data.phone)) {
      ctx.addIssue({
        code: 'custom',
        message: data.phone.startsWith('+')
          ? 'Неверный номер телефона'
          : 'Номер телефона должен начинаться с +',
        path: ['phone'],
      });
    }

    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
      });
    }
  });

type RegisterUserFields = z.infer<typeof RegisterUserSchema>;

export const RegisterForm = () => {
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<RegisterUserFields>({
    resolver: zodResolver(RegisterUserSchema),
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: RegisterUserFields) => {
    setLoading(true);
    registerUser(data)
      .finally(() => setLoading(false))
      .then(() => navigate('/login'))
      .catch(() => setError('email', { message: 'Почта уже используется' }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <ErrorsBlock errors={Object.values(errors)} />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            ФИО
          </label>
          <div className="relative">
            <User
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              {...register('fullname')}
              placeholder="Иванов Иван Иванович"
              className="w-full pl-9 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Почта
          </label>
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              {...register('email')}
              type="email"
              placeholder="example@mail.ru"
              className="w-full pl-9 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Телефон
          </label>
          <div className="relative">
            <Phone
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              {...register('phone')}
              placeholder="+79990001122"
              className="w-full pl-9 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Пароль
          </label>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Минимум 8 символов"
              className="w-full pl-9 pr-10 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Подтвердить пароль
          </label>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              {...register('confirmPassword')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Повторите пароль"
              className="w-full pl-9 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition-colors mt-2"
        >
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-5">
        Уже есть аккаунт?{' '}
        <Link
          to="/login"
          className="text-indigo-600 hover:underline font-medium"
        >
          Войти
        </Link>
      </p>
    </div>
  );
};
