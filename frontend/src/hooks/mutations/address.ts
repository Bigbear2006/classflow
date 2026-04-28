import { useCustomMutation } from '../useCustomMutation.ts';
import { createAddress, deleteAddress } from '../../api/addresses/requests.ts';

export const useAddressMutation = () => {
  return useCustomMutation({
    mutationFn: createAddress,
    invalidateQueryKeyOnSuccess: ['addresses'],
    toastErrorMessage: 'Не удалось создать адрес',
  });
};

export const useDeleteAddressMutation = () => {
  return useCustomMutation({
    mutationFn: deleteAddress,
    invalidateQueryKeyOnSuccess: ['addresses'],
    toastErrorMessage: 'Не удалось удалить адрес',
  });
};
