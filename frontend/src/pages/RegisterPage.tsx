import { RegisterForm } from '../components/common/RegisterForm.tsx';
import { ClassFlowBlock } from '../components/common/ClassFlowBlock.tsx';

export const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 flex flex-col">
      <ClassFlowBlock />
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
};
