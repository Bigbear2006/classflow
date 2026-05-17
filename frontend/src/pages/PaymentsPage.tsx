import { useState } from 'react';
import { DollarSign } from 'lucide-react';
import type { CourseType, FormAction, PaymentMeta } from '../entities';
import { PaymentForm } from '../components/payments/PaymentForm.tsx';
import { GroupPayments } from '../components/payments/GroupPayments.tsx';
import { IndividualPayments } from '../components/payments/IndividualPayments.tsx';
import { useGroupsWithPayments } from '../hooks/queries/group.ts';
import { useCourseTeacherStudentsWithPayments } from '../hooks/queries/course.ts';

export const PaymentsPage = () => {
  const { data: groups } = useGroupsWithPayments();
  const { data: courseTeacherStudents } = useCourseTeacherStudentsWithPayments();
  const [type, setType] = useState<CourseType>('GROUP');
  const [action, setAction] = useState<FormAction>();

  const [paymentMeta, setPaymentMeta] = useState<PaymentMeta>({});

  const openGroupPay = (studentGroupId: number) => {
    setPaymentMeta({ studentGroupId });
    setAction('CREATE');
  };

  const openIndividualPay = (paymentMeta: PaymentMeta) => {
    setPaymentMeta(paymentMeta);
    setAction('CREATE');
  };

  const closeModal = () => {
    setAction(undefined);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-slate-900 text-2xl font-semibold">Оплаты</h1>
        <p className="text-slate-500 text-sm mt-0.5">Учет оплат</p>
      </div>

      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit">
        <button
          onClick={() => setType('GROUP')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${type === 'GROUP' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Групповые
        </button>
        <button
          onClick={() => setType('INDIVIDUAL')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${type === 'INDIVIDUAL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Индивидуальные
        </button>
      </div>
      {type === 'GROUP' && (
        <div className="space-y-4">
          {groups.map(group => (
            <GroupPayments
              key={group.id}
              group={group}
              openGroupPay={openGroupPay}
              openIndividualPay={openIndividualPay}
            />
          ))}
        </div>
      )}
      {type === 'INDIVIDUAL' && (
        <div className="space-y-4">
          {courseTeacherStudents.map(student => (
            <IndividualPayments
              key={student.id}
              student={student}
              openIndividualPay={openIndividualPay}
            />
          ))}
          {courseTeacherStudents.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <DollarSign size={40} className="mx-auto mb-3 opacity-40" />
              <p>Индивидуальных занятий нет</p>
            </div>
          )}
        </div>
      )}
      {action == 'CREATE' && <PaymentForm paymentMeta={paymentMeta} closeModal={closeModal} />}
    </div>
  );
};
