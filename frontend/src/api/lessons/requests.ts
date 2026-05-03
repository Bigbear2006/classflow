import type { LessonDetail } from '../../entities';
import { axiosInstance } from '../base.ts';
import type { GetLessonsParams, LessonData, LessonDetailResponse } from './types.ts';
import { mapLessonDetail } from './mappers.ts';

export const createLesson = (data: LessonData) => {
  return axiosInstance.post('lessons/', data);
};

export const updateLesson = (id: number, data: LessonData) => {
  return axiosInstance.put(`lessons/${id}/`, data);
};

export const getLessons = async (params?: GetLessonsParams): Promise<LessonDetail[]> => {
  return axiosInstance
    .get<LessonDetailResponse[]>('lessons/', { params })
    .then(rsp => rsp.data.map(mapLessonDetail));
};

export const deleteLesson = (id: number) => {
  return axiosInstance.delete(`lessons/${id}/`);
};
