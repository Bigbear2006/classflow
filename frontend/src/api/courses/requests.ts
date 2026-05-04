import type { Course, Group, OrganizationMemberDetail } from '../../entities';
import { axiosInstance } from '../base.ts';
import type { GroupResponse } from '../groups/types.ts';
import { mapGroup } from '../groups/mappers.ts';
import type { CourseResponse, CourseData, CourseTeacherParams } from './types.ts';
import { mapCourse } from './mappers.ts';
import type { OrgMemberDetailResponse } from '../organizations/types.ts';
import { mapOrgMemberDetail } from '../organizations/mappers.ts';

export const getCourses = async (): Promise<Course[]> => {
  return axiosInstance.get<CourseResponse[]>('courses/').then(rsp => rsp.data.map(mapCourse));
};

export const getCourseGroups = async (id: number): Promise<Group[]> => {
  return axiosInstance
    .get<GroupResponse[]>(`courses/${id}/groups/`)
    .then(rsp => rsp.data.map(mapGroup));
};

export const getCourseTeachers = async (id: number): Promise<OrganizationMemberDetail[]> => {
  return axiosInstance
    .get<OrgMemberDetailResponse[]>(`courses/${id}/teachers/`)
    .then(rsp => rsp.data.map(mapOrgMemberDetail));
};

export const createCourse = (data: CourseData) => {
  return axiosInstance.post('courses/', data);
};

export const addTeacherToCourse = (params: CourseTeacherParams) => {
  return axiosInstance.post(`courses/${params.course_id}/teachers/${params.teacher_id}/`);
};

export const deleteTeacherFromCourse = (params: CourseTeacherParams) => {
  return axiosInstance.delete(`courses/${params.course_id}/teachers/${params.teacher_id}/`);
};

export const updateCourse = (id: number, data: CourseData) => {
  return axiosInstance.put(`courses/${id}/`, data);
};

export const deleteCourse = (id: number) => {
  return axiosInstance.delete(`courses/${id}/`);
};
