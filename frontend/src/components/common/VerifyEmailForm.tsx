import { useState } from 'react';
import { useResendCodeMutation, useVerifyUserMutation } from '../../hooks/mutations/user.ts';
import { Button, InputOTP } from '@heroui/react';
import { useNavigate } from 'react-router';

interface VerifyEmailFormProps {
  verificationToken: string;
}

export const VerifyEmailForm = ({ verificationToken }: VerifyEmailFormProps) => {
  const [code, setCode] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const navigate = useNavigate();
  const verifyUserMutation = useVerifyUserMutation({ navigate });
  const resendCodeMutation = useResendCodeMutation();

  return (
    <div className="flex bg-white flex-col gap-3 items-center rounded-2xl shadow-2xl p-8">
      <InputOTP
        maxLength={6}
        value={code}
        onComplete={() => setIsCompleted(true)}
        onChange={newValue => {
          setCode(newValue);
          setIsCompleted(false);
        }}
      >
        <InputOTP.Group className="flex flex-wrap">
          <InputOTP.Slot className="border-1 border-indigo-500" index={0} />
          <InputOTP.Slot className="border-1 border-indigo-500" index={1} />
          <InputOTP.Slot className="border-1 border-indigo-500" index={2} />
        </InputOTP.Group>
        <InputOTP.Group className="flex flex-wrap">
          <InputOTP.Slot className="border-1 border-indigo-500" index={3} />
          <InputOTP.Slot className="border-1 border-indigo-500" index={4} />
          <InputOTP.Slot className="border-1 border-indigo-500" index={5} />
        </InputOTP.Group>
      </InputOTP>
      <Button
        isDisabled={!isCompleted}
        className="w-full max-w-[282px]"
        type="submit"
        onClick={() => verifyUserMutation.mutate({ code: code, token: verificationToken })}
      >
        Верифицировать аккаунт
      </Button>
      <div className="flex items-center">
        <p
          onClick={() => resendCodeMutation.mutate({ token: verificationToken })}
          className="text-indigo-600 hover:underline font-medium"
        >
          Отправить код еще раз
        </p>
      </div>
    </div>
  );
};
