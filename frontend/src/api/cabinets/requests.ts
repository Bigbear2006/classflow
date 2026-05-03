import { axiosInstance } from '../base.ts';
import type { CabinetDetail } from '../../entities';
import type { CabinetDetailResponse, CreateCabinetData } from './types.ts';

export const createCabinet = (data: CreateCabinetData) => {
  return axiosInstance.post('cabinets/', data);
};

export const getCabinets = async (): Promise<CabinetDetail[]> => {
  return axiosInstance.get<CabinetDetailResponse[]>('cabinets/').then(rsp => rsp.data);
};

export const deleteCabinet = (id: number) => {
  return axiosInstance.delete(`cabinets/${id}/`);
};
