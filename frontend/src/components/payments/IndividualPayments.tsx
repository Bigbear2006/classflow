import { Check, DollarSign } from 'lucide-react';
import type { CourseTeacherStudentWithPayments, PaymentMeta } from '../../entities';
import { displayShortDate } from '../../labels/date.ts';

interface IndividualPaymentsProps {
  student: CourseTeacherStudentWithPayments;
  openIndividualPay: (paymentMeta: PaymentMeta) => void;
}

export const IndividualPayments = ({ student, openIndividualPay }: IndividualPaymentsProps) => {
  return (
    <div key={student.id} className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="font-semibold text-slate-900">
            {student.courseTeacher.course.subject.name} — {student.student.user.fullname}
          </div>
          <div className="text-xs text-slate-500">
            Преподаватель: {student.courseTeacher.teacher.user.fullname}
          </div>
        </div>
        <div className="text-sm text-slate-500">{student.lessons.length} занятий</div>
      </div>
      {student.lessons.length === 0 ? (
        <p className="text-sm text-slate-400">Занятий ещё нет</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {student.lessons.map(lesson => {
            const paid = !!student.payments.find(payment => payment.lessonId == lesson.id);
            return (
              <button
                key={lesson.id}
                onClick={() =>
                  !paid &&
                  openIndividualPay({
                    lessonId: lesson.id,
                    courseTeacherStudentId: student.id,
                    amount: student.courseTeacher.course.price,
                  })
                }
                className={`flex items-center gap-2 p-3 rounded-xl border text-xs transition-colors ${
                  paid
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : lesson.endDate > new Date()
                      ? 'bg-blue-50 border-blue-200 text-blue-700 cursor-not-allowed'
                      : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-700 cursor-pointer'
                }`}
              >
                {paid ? <Check size={12} /> : <DollarSign size={12} className="flex-shrink-0" />}
                <span>
                  {displayShortDate(lesson.startDate)}
                  {paid && (
                    <span className="ml-1 text-emerald-600">
                      {student.courseTeacher.course.price.toLocaleString('ru')} ₽
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
