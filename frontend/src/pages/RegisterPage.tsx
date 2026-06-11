import { RegisterForm } from '../components/common/RegisterForm.tsx';
import { ClassFlowBlock } from '../components/common/ClassFlowBlock.tsx';
import { useSearch } from '@tanstack/react-router';
import { VerifyEmailForm } from '../components/common/VerifyEmailForm.tsx';

export const RegisterPage = () => {
  const { verificationToken } = useSearch({ from: '/register' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 flex flex-col">
      <ClassFlowBlock />
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md p-2 sm:p-1">
          <div className="text-center mb-8">
            <h1 className="text-white text-3xl font-bold mb-2">
              {verificationToken ? 'Верификация' : 'Создать аккаунт'}
            </h1>
            <p className="text-slate-400">
              {verificationToken
                ? 'Код придет на указанную почту в течение нескольких минут'
                : 'Зарегистрируйтесь, чтобы начать'}
            </p>
          </div>
          {verificationToken ? (
            <VerifyEmailForm verificationToken={verificationToken} />
          ) : (
            <RegisterForm />
          )}
        </div>
      </div>
    </div>
  );
};
