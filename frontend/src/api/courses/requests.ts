import type {
  CourseDetail,
  CourseTeacherStudentWithPayments,
  Group,
  IndividualCourse,
  OrganizationMemberDetail,
} from '../../entities';
import { axiosInstance } from '../base.ts';
import type { GroupResponse } from '../groups/types.ts';
import { mapGroup } from '../groups/mappers.ts';
import type {
  CourseDetailResponse,
  CourseData,
  CourseTeacherParams,
  AddCurrentStudentToCourseData,
  IndividualCourseResponse,
  CourseTeacherStudentWithPaymentsResponse,
  UpdateCourseTeacherData,
  UpdateCourseTeacherStudentData,
  GetAllCoursesParams,
  GetCourseTeachersParams,
} from './types.ts';
import {
  mapCourseDetail,
  mapCourseTeacherStudentWithPayments,
  mapIndividualCourse,
} from './mappers.ts';
import type { OrganizationMemberDetailResponse } from '../organizations/types.ts';
import { mapOrgMemberDetail } from '../organizations/mappers.ts';
import {useAxios} from "../../hooks/useAxios.ts";

export const getCourses = (params?: GetAllCoursesParams): Promise<CourseDetail[]> => {
  return useAxios()
    .get<CourseDetailResponse[]>('courses/', { params })
    .then(rsp => rsp.data.map(mapCourseDetail));
};

export const getIndividualCourses = (): Promise<IndividualCourse[]> => {
  return axiosInstance
    .get<IndividualCourseResponse[]>('courses/individual/')
    .then(rsp => rsp.data.map(mapIndividualCourse));
};

export const getCourseGroups = (id: number): Promise<Group[]> => {
  return axiosInstance
    .get<GroupResponse[]>(`courses/${id}/groups/`)
    .then(rsp => rsp.data.map(mapGroup));
};

export const getCourseTeachers = (
  id: number,
  params?: GetCourseTeachersParams,
): Promise<OrganizationMemberDetail[]> => {
  return axiosInstance
    .get<OrganizationMemberDetailResponse[]>(`courses/${id}/teachers/`, { params })
    .then(rsp => rsp.data.map(mapOrgMemberDetail));
};

export const addCurrentStudentToCourse = (data: AddCurrentStudentToCourseData) => {
  return axiosInstance.post(`courses/${data.courseId}/teachers/${data.teacherId}/students/me/`);
};

export const updateCourseTeacherStudent = (data: UpdateCourseTeacherStudentData) => {
  return axiosInstance.patch(
    `courses/${data.course_id}/teachers/${data.teacher_id}/students/${data.student_id}/`,
    { status: data.status },
  );
};

export const getCourseTeacherStudentsWithPayments = (): Promise<
  CourseTeacherStudentWithPayments[]
> => {
  return axiosInstance
    .get<CourseTeacherStudentWithPaymentsResponse[]>('courses/teachers/students/payments/')
    .then(rsp => rsp.data.map(mapCourseTeacherStudentWithPayments));
};

export const createCourse = (data: CourseData) => {
  return axiosInstance.post('courses/', data);
};

export const addTeacherToCourse = (params: CourseTeacherParams) => {
  return axiosInstance.post(`courses/${params.course_id}/teachers/${params.teacher_id}/`);
};

export const updateCourseTeacher = (data: UpdateCourseTeacherData) => {
  return axiosInstance.patch(`courses/${data.course_id}/teachers/${data.teacher_id}/`, {
    status: data.status,
  });
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
