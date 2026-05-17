import { axiosInstance } from '../base.ts';
import type { Address, AddressDetail } from '../../entities';
import type { AddressData } from './types.ts';

export const getAddresses = () => {
  return axiosInstance.get<AddressDetail[]>('addresses/').then(rsp => rsp.data);
};

export const createAddress = (data: AddressData) => {
  return axiosInstance.post<Address>('addresses/', data).then(rsp => rsp.data);
};

export const updateAddress = (id: number, data: AddressData) => {
  return axiosInstance.patch<Address>(`addresses/${id}/`, data).then(rsp => rsp.data);
};

export const deleteAddress = (id: number) => {
  return axiosInstance.delete(`addresses/${id}/`);
};
