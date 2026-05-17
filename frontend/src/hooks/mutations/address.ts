import { useCustomMutation } from '../useCustomMutation.ts';
import { createAddress, deleteAddress, updateAddress } from '../../api/addresses/requests.ts';
import type { AddressData } from '../../api/addresses/types.ts';

interface UseAddressMutationProps {
  addressId: number;
  onSuccess?: () => void;
}

export const useAddressMutation = (props?: UseAddressMutationProps) => {
  const updateAddressFn = (data: AddressData) => updateAddress(props?.addressId!, data);
  return useCustomMutation({
    mutationFn: props?.addressId ? updateAddressFn : createAddress,
    invalidateQueryKeyOnSuccess: ['addresses'],
    toastErrorMessage: 'Не удалось создать адрес',
    onSuccess: props?.onSuccess,
  });
};

export const useDeleteAddressMutation = () => {
  return useCustomMutation({
    mutationFn: deleteAddress,
    invalidateQueryKeyOnSuccess: ['addresses'],
    toastErrorMessage: 'Не удалось удалить адрес',
  });
};
