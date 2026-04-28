import { axiosInstance } from '../base.ts';
import type { Subject } from '../../types.ts';
import type { SubjectData } from './types.ts';

export const getSubjects = async () => {
  return axiosInstance.get<Subject[]>('subjects/').then(rsp => rsp.data);
};

export const createSubject = async (data: SubjectData) => {
  return axiosInstance.post<Subject>('subjects/', data).then(rsp => rsp.data);
};

export const updateSubject = async (id: number, data: SubjectData) => {
  return axiosInstance.patch<Subject>(`subjects/${id}/`, data).then(rsp => rsp.data);
};

export const deleteSubject = async (id: number) => {
  return axiosInstance.delete(`subjects/${id}/`);
};
