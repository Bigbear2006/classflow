import { useEffect, useState } from 'react';
import { DollarSign } from 'lucide-react';
import type { CourseType, FormAction, OrganizationStats, Payment, PaymentMeta } from '../entities';
import { getOrganizationStats } from '../api/organizations/requests.ts';
import { PaymentForm } from '../components/payments/PaymentForm.tsx';
import { GroupPayments } from '../components/payments/GroupPayments.tsx';
import { IndividualPayments } from '../components/payments/IndividualPayments.tsx';
import { useGroupsWithPayments } from '../hooks/queries/group.ts';
import { useCourseTeacherStudentsWithPayments } from '../hooks/queries/course.ts';

export const PaymentsPage = () => {
  const [orgStats, setOrgStats] = useState<OrganizationStats>({
    courses: 0,
    teachers: 0,
    students: 0,
    groups: 0,
    todayLessons: 0,
    totalIncome: 0,
  });
  const [payments, setPayments] = useState<Payment[]>([]);
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

  useEffect(() => {
    getOrganizationStats().then(setOrgStats);
    setPayments([]);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-slate-900 text-2xl font-semibold">Оплаты</h1>
        <p className="text-slate-500 text-sm mt-0.5">Отслеживание платежей учеников</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="text-slate-500 text-sm mb-1">Всего поступлений</div>
          <div className="text-2xl font-bold text-slate-900">
            {orgStats.totalIncome.toLocaleString('ru')} ₽
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="text-slate-500 text-sm mb-1">Платежей</div>
          <div className="text-2xl font-bold text-slate-900">{payments.length}</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="text-slate-500 text-sm mb-1">Сегодня</div>
          <div className="text-2xl font-bold text-slate-900">
            {/*TODO: add today payments amount*/}
            {payments.length}
          </div>
        </div>
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
