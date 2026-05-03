import { axiosInstance } from '../base.ts';
import type { Address, AddressDetail } from '../../entities';
import type { CreateAddressData } from './types.ts';

export const getAddresses = async () => {
  return axiosInstance.get<AddressDetail[]>('addresses/').then(rsp => rsp.data);
};

export const createAddress = async (data: CreateAddressData) => {
  return axiosInstance.post<Address>('addresses/', data).then(rsp => rsp.data);
};

export const deleteAddress = async (id: number) => {
  return axiosInstance.delete(`addresses/${id}/`);
};
