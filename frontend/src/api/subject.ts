import { axiosInstance } from './base.ts';
import type { Subject } from '../types.ts';

interface CreateSubjectData {
  name: string;
  image: string;
  description: string;
}

export const getSubjects = () => {
  return axiosInstance.get<Subject[]>('subjects/').then(rsp => rsp.data);
};

export const createSubject = async (data: CreateSubjectData) => {
  return axiosInstance.post<Subject>('subjects/', data).then(rsp => rsp.data);
};

export const deleteSubject = async (id: number) => {
  return axiosInstance.delete(`subjects/${id}/`);
};
