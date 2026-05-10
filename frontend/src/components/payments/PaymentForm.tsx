import { Check, X } from 'lucide-react';
import { type OutputPaymentFields, usePaymentForm } from '../../hooks/forms/payment.ts';
import type { PaymentMeta } from '../../entities';
import { useCreatePaymentMutation } from '../../hooks/mutations/payment.ts';

interface PaymentFormProps {
  paymentMeta: PaymentMeta;
  closeModal: () => void;
}

export const PaymentForm = ({ paymentMeta, closeModal }: PaymentFormProps) => {
  const { register, handleSubmit } = usePaymentForm({ amount: paymentMeta.amount });

  const mutation = useCreatePaymentMutation({ closeModal });
  const onSubmit = (data: OutputPaymentFields) =>
    mutation.mutate({
      amount: data.amount,
      date: data.date.toISOString(),
      comment: data.comment,
      student_group_id: paymentMeta.studentGroupId,
      course_teacher_student_id: paymentMeta.courseTeacherStudentId,
      lesson_id: paymentMeta.lessonId,
    });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={closeModal}
    >
      <div className="bg-white rounded-2xl w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-900">Добавить платёж</h2>
          <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Сумма (₽)</label>
            <input
              {...register('amount')}
              disabled={!!paymentMeta.amount}
              type="number"
              min="1"
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="0"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Дата оплаты</label>
            <input
              {...register('date')}
              type="datetime-local"
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Комментарий</label>
            <input
              {...register('comment')}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Необязательно"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSubmit(onSubmit)}
              className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-sm font-medium"
            >
              <Check size={14} className="inline mr-1" /> Подтвердить
            </button>
            <button
              onClick={closeModal}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
