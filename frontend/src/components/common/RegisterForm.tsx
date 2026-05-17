import { Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react';
import { Link, useSearchParams } from 'react-router';
import { useState } from 'react';
import { useRegistrationForm } from '../../hooks/forms/register.ts';
import { useRegisterUserMutation } from '../../hooks/mutations/user.ts';
import { FormField } from './FormField.tsx';

export const RegisterForm = () => {
  const { control, setError, handleSubmit } = useRegistrationForm();
  const [_, setSearchParams] = useSearchParams(window.location.search);
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToPolitics, setAgreedToPolitics] = useState(false);
  const mutation = useRegisterUserMutation({ setSearchParams, setError });

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <form onSubmit={handleSubmit(data => mutation.mutate(data))} className="space-y-4">
        <FormField
          name="fullname"
          control={control}
          label="ФИО"
          placeholder="Иванов Иван Иванович"
          icon={User}
          required
        />
        <FormField
          name="email"
          control={control}
          label="Почта"
          placeholder="example@mail.ru"
          icon={Mail}
          required
        />
        <FormField
          name="phone"
          control={control}
          label="Телефон"
          placeholder="+79991112233"
          icon={Phone}
          required
        />
        <FormField
          name="password"
          control={control}
          label="Пароль"
          placeholder="Минимум 8 символов"
          icon={Lock}
          button={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
          type={showPassword ? 'text' : 'password'}
          required
        />
        <FormField
          name="confirmPassword"
          control={control}
          label="Подтвердить пароль"
          placeholder="Повторите пароль"
          icon={Lock}
          type={showPassword ? 'text' : 'password'}
          required
        />
        <div className="flex items-center gap-3 text-left text-sm text-slate-500 mt-2">
          <input
            type="checkbox"
            className="w-7 h-7"
            checked={agreedToPolitics}
            onChange={e => setAgreedToPolitics(e.target.checked)}
          />
          <p>
            Согласен с{' '}
            <Link to="/politics" className="text-indigo-600 hover:underline font-medium">
              пользовательским соглашением и политикой конфиденциальности
            </Link>
          </p>
        </div>
        <button
          type="submit"
          disabled={mutation.isPending || !agreedToPolitics}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition-colors mt-2"
        >
          {mutation.isPending ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>
      <p className="text-center text-sm text-slate-500 mt-5">
        Уже есть аккаунт?{' '}
        <Link to="/login" className="text-indigo-600 hover:underline font-medium">
          Войти
        </Link>
      </p>
    </div>
  );
};
