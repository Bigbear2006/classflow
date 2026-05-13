import type { GroupWithPayments, StudentGroupWithPayments } from '../../entities';
import { X } from 'lucide-react';
import { useDeletePaymentMutation } from '../../hooks/mutations/payment.ts';
import { useAppContext } from '../../context.tsx';

interface FullCoursePaymentsProps {
  group: GroupWithPayments;
  studentGroup: StudentGroupWithPayments;
  openGroupPay: (studentGroupId: number) => void;
}

export const FullCoursePayments = ({
  group,
  studentGroup,
  openGroupPay,
}: FullCoursePaymentsProps) => {
  const { isTeacherOrMore } = useAppContext();
  const pct = Math.min(Math.round((studentGroup.totalPaid / group.course.price) * 100), 100);
  const deletePaymentMutation = useDeletePaymentMutation();

  return (
    <div key={studentGroup.id} className="px-5 py-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-medium text-slate-600">
            {studentGroup.student.user.fullname.charAt(0)}
          </div>
          <span className="font-medium text-sm text-slate-900">
            {studentGroup.student.user.fullname}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span
              className={`text-sm font-semibold ${studentGroup.totalPaid >= group.course.price ? 'text-emerald-600' : 'text-slate-900'}`}
            >
              {studentGroup.totalPaid.toLocaleString('ru')} /{' '}
              {group.course.price.toLocaleString('ru')} ₽
            </span>
            {studentGroup.totalPaid >= group.course.price && (
              <span className="ml-1 text-xs text-emerald-600">✓</span>
            )}
          </div>
          {isTeacherOrMore && (
            <button
              onClick={() => openGroupPay(studentGroup.id)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium transition-colors"
            >
              + Оплата
            </button>
          )}
        </div>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      {studentGroup.payments.length > 0 && (
        <div className="mt-2 space-y-1">
          {studentGroup.payments.map(payment => (
            <div
              key={payment.id}
              className="flex items-center justify-between text-xs text-slate-500"
            >
              <span>
                {payment.date.toLocaleDateString('ru')}{' '}
                {payment.comment ? ' — ' + payment.comment : ''}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 font-medium">
                  {payment.amount.toLocaleString('ru')} ₽
                </span>
                {isTeacherOrMore && (
                  <button
                    onClick={() => deletePaymentMutation.mutate(payment.id)}
                    className="text-slate-300 hover:text-red-400"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
