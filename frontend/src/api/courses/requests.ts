import type { Course, Group, User } from '../../types.ts';
import { axiosInstance } from '../base.ts';
import type { GroupResponse } from '../groups/types.ts';
import { mapGroup } from '../groups/mappers.ts';
import type { CourseResponse, CourseData } from './types.ts';
import { mapCourse } from './mappers.ts';

export const getCourses = async (): Promise<Course[]> => {
  return axiosInstance.get<CourseResponse[]>('courses/').then(rsp => rsp.data.map(mapCourse));
};

export const getCourseGroups = async (id: number): Promise<Group[]> => {
  return axiosInstance
    .get<GroupResponse[]>(`courses/${id}/groups/`)
    .then(rsp => rsp.data.map(mapGroup));
};

export const getCourseTeachers = async (id: number): Promise<User[]> => {
  return axiosInstance.get<User[]>(`courses/${id}/teachers/`).then(rsp => rsp.data);
};

export const createCourse = (data: CourseData) => {
  return axiosInstance.post('courses/', data);
};

export const updateCourse = (id: number, data: CourseData) => {
  return axiosInstance.put(`courses/${id}/`, data);
};

export const deleteCourse = (id: number) => {
  return axiosInstance.delete(`courses/${id}/`);
};
