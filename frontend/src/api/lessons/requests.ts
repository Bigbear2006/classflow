import type { LessonDetail } from '../../types.ts';
import { axiosInstance } from '../base.ts';
import type { LessonData, LessonDetailResponse } from './types.ts';
import { mapLessonDetail } from './mappers.ts';

export const createLesson = (data: LessonData) => {
  return axiosInstance.post('lessons/', data);
};

export const updateLesson = (id: number, data: LessonData) => {
  return axiosInstance.put(`lessons/${id}/`, data);
};

export const getLessons = async (): Promise<LessonDetail[]> => {
  return axiosInstance
    .get<LessonDetailResponse[]>('lessons/')
    .then(rsp => rsp.data.map(mapLessonDetail));
};

export const deleteLesson = (id: number) => {
  return axiosInstance.delete(`lessons/${id}/`);
};
