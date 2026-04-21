import { useEffect, useState } from 'react';
import {
  DollarSign,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  Users,
} from 'lucide-react';
import type {
  CourseTeacherStudentWithLessons,
  CourseType,
  FormAction,
  GroupWithPayments,
  OrganizationStats,
  Payment,
} from '../../types.ts';
import { getOrganizationStats } from '../../api/organization.ts';
import { PaymentForm } from '../../components/admin/payments/PaymentForm.tsx';
import { deletePayment } from '../../api/payment.ts';

export default function AdminPaymentsPage() {
  const [orgStats, setOrgStats] = useState<OrganizationStats>({
    courses: 0,
    teachers: 0,
    students: 0,
    groups: 0,
    todayLessons: 0,
    totalIncome: 0,
  });
  const [payments, setPayments] = useState<Payment[]>([]);
  const [groups, setGroups] = useState<GroupWithPayments[]>([]);
  const [courseTeacherStudents, setCourseTeacherStudents] = useState<
    CourseTeacherStudentWithLessons[]
  >([]);
  const [type, setType] = useState<CourseType>('GROUP');
  const [action, setAction] = useState<FormAction | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<number[]>([]);

  const openGroupPay = (...args: any) => {
    args;
  };
  const openIndPay = (...args: any) => {
    args;
  };

  const closeModal = () => {
    setAction(null);
  };

  useEffect(() => {
    getOrganizationStats().then(setOrgStats);
    setPayments([]);
    setGroups([]);
    setCourseTeacherStudents([]);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-slate-900 text-2xl font-semibold">Оплаты</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Отслеживание платежей учеников
        </p>
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
          <div className="text-2xl font-bold text-slate-900">
            {payments.length}
          </div>
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
          {groups.map(group => {
            return (
              <div
                key={group.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedGroups(groups => [...groups, group.id])
                  }
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
                      <Users size={18} className="text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">
                        {group.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {group.name} · {group.students.length} учеников
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-semibold text-slate-900">
                        {group.totalPaid.toLocaleString('ru')} ₽
                      </div>
                      {group.course.price && (
                        <div className="text-xs text-slate-400">
                          из {group.course.price.toLocaleString('ru')} ₽
                        </div>
                      )}
                    </div>
                    {group.id in expandedGroups ? (
                      <ChevronUp size={16} className="text-slate-400" />
                    ) : (
                      <ChevronDown size={16} className="text-slate-400" />
                    )}
                  </div>
                </button>

                {group.id in expandedGroups && (
                  <div className="border-t border-slate-100">
                    {group.course.paymentType === 'FULL_COURSE' ? (
                      // Full course: track partial payments per student
                      <div className="divide-y divide-slate-50">
                        {group.students.map(student => {
                          const pct = Math.min(
                            Math.round(
                              (student.totalPaid / group.course.price) * 100,
                            ),
                            100,
                          );
                          return (
                            <div key={student.id} className="px-5 py-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-medium text-slate-600">
                                    {student.fullname.charAt(0)}
                                  </div>
                                  <span className="font-medium text-sm text-slate-900">
                                    {student.fullname}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="text-right">
                                    <span
                                      className={`text-sm font-semibold ${student.totalPaid >= group.course.price ? 'text-emerald-600' : 'text-slate-900'}`}
                                    >
                                      {student.totalPaid.toLocaleString('ru')}{' '}
                                      /{' '}
                                      {group.course.price.toLocaleString('ru')}{' '}
                                      ₽
                                    </span>
                                    {student.totalPaid >=
                                      group.course.price && (
                                      <span className="ml-1 text-xs text-emerald-600">
                                        ✓
                                      </span>
                                    )}
                                  </div>
                                  <button
                                    onClick={() =>
                                      openGroupPay(group.id, student.id)
                                    }
                                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium transition-colors"
                                  >
                                    + Оплата
                                  </button>
                                </div>
                              </div>
                              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-indigo-500 rounded-full transition-all"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              {student.payments.length > 0 && (
                                <div className="mt-2 space-y-1">
                                  {student.payments.map(payment => (
                                    <div
                                      key={payment.id}
                                      className="flex items-center justify-between text-xs text-slate-500"
                                    >
                                      <span>
                                        {new Date(
                                          payment.date,
                                        ).toLocaleDateString('ru')}{' '}
                                        — {payment.comment || 'Оплата'}
                                      </span>
                                      <div className="flex items-center gap-2">
                                        <span className="text-emerald-600 font-medium">
                                          {payment.amount.toLocaleString('ru')}{' '}
                                          ₽
                                        </span>
                                        <button
                                          onClick={() => {
                                            if (confirm('Удалить платёж?'))
                                              deletePayment(payment.id);
                                          }}
                                          className="text-slate-300 hover:text-red-400"
                                        >
                                          <X size={12} />
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      // Every lesson: show lessons, mark each as paid
                      <div className="p-5">
                        <div className="space-y-3">
                          {group.students.map(student => {
                            return (
                              <div key={student.id}>
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-600">
                                    {student.fullname.charAt(0)}
                                  </div>
                                  <span className="text-sm font-medium text-slate-900">
                                    {student.fullname}
                                  </span>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 ml-9">
                                  {group.lessons.map(lesson => {
                                    const paid =
                                      lesson.paymentId !== undefined;
                                    return (
                                      <button
                                        key={lesson.id}
                                        onClick={() =>
                                          !paid &&
                                          openIndPay(lesson.id, student.id)
                                        }
                                        className={`flex items-center gap-2 p-2 rounded-xl border text-xs transition-colors ${
                                          paid
                                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                            : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-700'
                                        }`}
                                      >
                                        {paid ? (
                                          <Check size={12} />
                                        ) : (
                                          <DollarSign size={12} />
                                        )}
                                        {lesson.startDate.toLocaleDateString(
                                          'ru',
                                          {
                                            day: 'numeric',
                                            month: 'short',
                                          },
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {type === 'INDIVIDUAL' && (
        <div className="space-y-4">
          {courseTeacherStudents.map(student => {
            return (
              <div
                key={student.id}
                className="bg-white rounded-2xl border border-slate-200 p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-semibold text-slate-900">
                      {student.courseTeacher.course.subject.name || 'Курс'} —{' '}
                      {student.student.fullname}
                    </div>
                    <div className="text-xs text-slate-500">
                      Преподаватель: {student.courseTeacher.teacher?.fullname}
                    </div>
                  </div>
                  <div className="text-sm text-slate-500">
                    {student.lessons.length} занятий
                  </div>
                </div>
                {student.lessons.length === 0 ? (
                  <p className="text-sm text-slate-400">Занятий ещё нет</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {student.lessons.map(lesson => {
                      const paid = lesson.paymentId !== undefined;
                      return (
                        <button
                          key={lesson.id}
                          onClick={() =>
                            !paid && openIndPay(lesson.id, student.student.id)
                          }
                          className={`flex items-center gap-2 p-3 rounded-xl border text-xs transition-colors ${
                            paid
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                              : lesson.endDate > new Date()
                                ? 'bg-blue-50 border-blue-200 text-blue-700 cursor-not-allowed'
                                : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-700 cursor-pointer'
                          }`}
                        >
                          {paid ? (
                            <Check size={12} />
                          ) : (
                            <DollarSign size={12} className="flex-shrink-0" />
                          )}
                          <span>
                            {lesson.startDate.toLocaleDateString('ru', {
                              day: 'numeric',
                              month: 'short',
                            })}
                            {paid && (
                              <span className="ml-1 text-emerald-600">
                                {student.courseTeacher.course.price.toLocaleString(
                                  'ru',
                                )}{' '}
                                ₽
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
          })}
          {courseTeacherStudents.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <DollarSign size={40} className="mx-auto mb-3 opacity-40" />
              <p>Индивидуальных занятий нет</p>
            </div>
          )}
        </div>
      )}

      {action == 'CREATE' && <PaymentForm closeModal={closeModal} />}
    </div>
  );
}
