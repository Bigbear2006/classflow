import { RegisterForm } from '../components/common/RegisterForm.tsx';
import { ClassFlowBlock } from '../components/common/ClassFlowBlock.tsx';
import { useNavigate, useSearchParams } from 'react-router';
import { Button, InputOTP } from '@heroui/react';
import { useState } from 'react';
import { useVerifyUserMutation } from '../hooks/mutations/user.ts';

export const RegisterPage = () => {
  const [code, setCode] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams(window.location.search);
  const verificationToken = searchParams.get('verificationToken');
  const mutation = useVerifyUserMutation({ navigate });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 flex flex-col">
      <ClassFlowBlock />
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md p-8">
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
            <div className="flex flex-col gap-3 items-center rounded-2xl shadow-2xl p-8">
              <InputOTP
                maxLength={6}
                value={code}
                onComplete={() => setIsCompleted(true)}
                onChange={newValue => {
                  setCode(newValue);
                  setIsCompleted(false);
                }}
              >
                <InputOTP.Group>
                  <InputOTP.Slot index={0} />
                  <InputOTP.Slot index={1} />
                  <InputOTP.Slot index={2} />
                </InputOTP.Group>
                <InputOTP.Separator />
                <InputOTP.Group>
                  <InputOTP.Slot index={3} />
                  <InputOTP.Slot index={4} />
                  <InputOTP.Slot index={5} />
                </InputOTP.Group>
              </InputOTP>
              <Button
                isDisabled={!isCompleted}
                className="w-[282px]"
                type="submit"
                variant="primary"
                onClick={() => mutation.mutate({ code: code, token: verificationToken })}
              >
                Верифицировать аккаунт
              </Button>
              <div className="flex items-center">
                <p className="text-sm text-muted underline">Отправить код еще раз</p>
              </div>
            </div>
          ) : (
            <RegisterForm />
          )}
        </div>
      </div>
    </div>
  );
};
