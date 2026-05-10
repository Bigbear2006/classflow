import { axiosInstance } from '../base.ts';
import type { Subject } from '../../entities';
import type { SubjectData } from './types.ts';

export const getSubjects = () => {
  return axiosInstance.get<Subject[]>('subjects/').then(rsp => rsp.data);
};

export const createSubject = (data: SubjectData) => {
  return axiosInstance.post<Subject>('subjects/', data).then(rsp => rsp.data);
};

export const updateSubject = (id: number, data: SubjectData) => {
  return axiosInstance.patch<Subject>(`subjects/${id}/`, data).then(rsp => rsp.data);
};

export const deleteSubject = (id: number) => {
  return axiosInstance.delete(`subjects/${id}/`);
};
