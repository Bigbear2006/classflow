import type { CreatePaymentData } from './types.ts';
import { axiosInstance } from '../base.ts';

export const createPayment = (data: CreatePaymentData) => {
  return axiosInstance.post('payments/', data);
};

export const deletePayment = (id: number) => {
  return axiosInstance.delete(`payments/${id}/`);
};
