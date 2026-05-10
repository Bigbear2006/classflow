import { Check, DollarSign } from 'lucide-react';
import { displayShortDate } from '../../labels/date.ts';
import type { GroupWithPayments, PaymentMeta, StudentGroupWithPayments } from '../../entities';

interface EveryLessonPaymentsProps {
  group: GroupWithPayments;
  studentGroup: StudentGroupWithPayments;
  openIndividualPay: (paymentMeta: PaymentMeta) => void;
}

export const EveryLessonPayments = ({
  group,
  studentGroup,
  openIndividualPay,
}: EveryLessonPaymentsProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-600">
          {studentGroup.student.user.fullname.charAt(0)}
        </div>
        <span className="text-sm font-medium text-slate-900">
          {studentGroup.student.user.fullname}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2 ml-9">
        {group.lessons.map(lesson => {
          const paid = !!studentGroup.payments.find(payment => payment.lessonId == lesson.id);
          return (
            <button
              key={lesson.id}
              onClick={() =>
                !paid &&
                openIndividualPay({
                  lessonId: lesson.id,
                  studentGroupId: studentGroup.id,
                  amount: group.course.price,
                })
              }
              className={`flex items-center gap-2 p-2 rounded-xl border text-xs transition-colors ${
                paid
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-700'
              }`}
            >
              {paid ? <Check size={12} /> : <DollarSign size={12} />}
              {displayShortDate(lesson.startDate)}
            </button>
          );
        })}
      </div>
    </div>
  );
};
