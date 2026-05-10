import { axiosInstance } from '../base.ts';
import type { Address, AddressDetail } from '../../entities';
import type { CreateAddressData } from './types.ts';

export const getAddresses = () => {
  return axiosInstance.get<AddressDetail[]>('addresses/').then(rsp => rsp.data);
};

export const createAddress = (data: CreateAddressData) => {
  return axiosInstance.post<Address>('addresses/', data).then(rsp => rsp.data);
};

export const deleteAddress = (id: number) => {
  return axiosInstance.delete(`addresses/${id}/`);
};
