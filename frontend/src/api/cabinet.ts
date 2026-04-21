import { axiosInstance } from './base.ts';
import type { Cabinet } from '../types.ts';

export interface CreateCabinetData {
  address_id: number;
  number: string;
}

export const createCabinet = (data: CreateCabinetData) => {
  return axiosInstance.post('cabinets/', data);
};

export const getCabinets = (): Promise<Cabinet[]> => {
  return Promise.resolve([
    { id: 1, number: '101' },
    { id: 2, number: '102' },
  ]);
};

export const deleteCabinet = (id: number) => {
  return axiosInstance.delete(`cabinets/${id}/`);
};
