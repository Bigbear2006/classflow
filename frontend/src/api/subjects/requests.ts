import { axiosInstance } from '../base.ts';
import type { Subject } from '../../entities';
import type { SubjectData } from './types.ts';
import { objectToFormData } from '../utils.ts';

export const getSubjects = () => {
  return axiosInstance.get<Subject[]>('subjects/').then(rsp => rsp.data);
};

export const createSubject = (data: SubjectData) => {
  return axiosInstance.post<Subject>('subjects/', objectToFormData(data)).then(rsp => rsp.data);
};

export const updateSubject = (id: number, data: SubjectData) => {
  return axiosInstance
    .patch<Subject>(`subjects/${id}/`, objectToFormData(data))
    .then(rsp => rsp.data);
};

export const deleteSubject = (id: number) => {
  return axiosInstance.delete(`subjects/${id}/`);
};
