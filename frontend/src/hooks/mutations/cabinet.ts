import { useCustomMutation } from '../useCustomMutation.ts';
import { createCabinet, deleteCabinet } from '../../api/cabinets/requests.ts';

export const useCabinetMutation = () => {
  return useCustomMutation({
    mutationFn: createCabinet,
    invalidateQueryKeyOnSuccess: ['addresses'],
    toastErrorMessage: ({ statusCode }) =>
      statusCode === 409 ? 'Такой кабинет уже существует' : 'Не удалось создать кабинет',
  });
};

export const useDeleteCabinetMutation = () => {
  return useCustomMutation({
    mutationFn: deleteCabinet,
    invalidateQueryKeyOnSuccess: ['addresses'],
    toastErrorMessage: 'Не удалось удалить кабинет',
  });
};
