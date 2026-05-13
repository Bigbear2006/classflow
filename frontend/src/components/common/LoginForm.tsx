import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { ErrorsBlock } from './ErrorsBlock.tsx';
import { useLoginForm } from '../../hooks/forms/login.ts';
import { CustomTextField } from './CustomTextField.tsx';
import { useLoginUserMutation } from '../../hooks/mutations/user.ts';

export const LoginForm = () => {
  const {
    control,
    setError,
    formState: { errors },
    handleSubmit,
  } = useLoginForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const mutation = useLoginUserMutation({ navigate, setError });

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <ErrorsBlock errors={Object.values(errors)} />
      <form onSubmit={handleSubmit(data => mutation.mutate(data))} className="space-y-5">
        <CustomTextField
          name="email"
          control={control}
          label="Почта"
          placeholder="example@mail.ru"
          icon={Mail}
          required
        />
        <CustomTextField
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
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition-colors"
        >
          {mutation.isPending ? 'Входим...' : 'Войти'}
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
