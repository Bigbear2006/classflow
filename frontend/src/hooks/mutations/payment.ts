import { useCustomMutation } from '../useCustomMutation.ts';
import { createPayment, deletePayment } from '../../api/payments/requests.ts';

interface CreatePaymentMutationProps {
  closeModal: () => void;
}

export const useCreatePaymentMutation = ({ closeModal }: CreatePaymentMutationProps) => {
  return useCustomMutation({
    mutationFn: createPayment,
    invalidateQueryKeyOnSuccess: ['groups', 'payments'],
    toastErrorMessage: 'Не удалось создать оплату',
    onSuccess: closeModal,
  });
};

export const useDeletePaymentMutation = () => {
  return useCustomMutation({
    mutationFn: deletePayment,
    invalidateQueryKeyOnSuccess: ['groups', 'payments'],
    toastErrorMessage: 'Не удалось удалить оплату',
  });
};
