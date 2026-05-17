import { Check } from 'lucide-react';
import { type OutputPaymentFields, usePaymentForm } from '../../hooks/forms/payment.ts';
import type { PaymentMeta } from '../../entities';
import { useCreatePaymentMutation } from '../../hooks/mutations/payment.ts';
import { Modal } from '../common/Modal.tsx';
import { ModalHeader } from '../common/ModalHeader.tsx';
import { FormField } from '../common/FormField.tsx';

interface PaymentFormProps {
  paymentMeta: PaymentMeta;
  closeModal: () => void;
}

export const PaymentForm = ({ paymentMeta, closeModal }: PaymentFormProps) => {
  const { control, handleSubmit } = usePaymentForm({ amount: paymentMeta.amount });

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
    <Modal close={closeModal}>
      <ModalHeader title="Добавить платёж" closeModal={closeModal} />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
        <FormField
          name="amount"
          control={control}
          label="Сумма (₽)"
          placeholder="1000"
          required
          type="number"
          disabled={!!paymentMeta.amount}
        />
        <FormField
          name="date"
          control={control}
          label="Дата оплаты"
          required
          type="datetime-local"
        />
        <FormField
          name="comment"
          control={control}
          label="Комментарий"
          placeholder="Необязательно"
        ></FormField>
        <div className="flex gap-3">
          <button
            type="submit"
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
      </form>
    </Modal>
  );
};
