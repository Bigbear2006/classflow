import type { GroupDetail, GroupWithPayments, GroupWithStudents, User } from '../../entities';
import { axiosInstance } from '../base.ts';
import type {
  GroupDetailResponse,
  GroupData,
  GroupWithPaymentsResponse,
  GroupWithStudentsResponse,
  UpdateStudentGroupData,
} from './types.ts';
import { mapGroupDetail, mapGroupWithPayments, mapGroupWithStudents } from './mappers.ts';

export const getGroups = (): Promise<GroupDetail[]> => {
  return axiosInstance
    .get<GroupDetailResponse[]>('groups/')
    .then(rsp => rsp.data.map(mapGroupDetail));
};

export const getGroupsWithPayments = (): Promise<GroupWithPayments[]> => {
  return axiosInstance
    .get<GroupWithPaymentsResponse[]>('groups/payments/')
    .then(rsp => rsp.data.map(mapGroupWithPayments));
};

export const getGroupsWithStudents = (): Promise<GroupWithStudents[]> => {
  return axiosInstance
    .get<GroupWithStudentsResponse[]>('groups/students/')
    .then(rsp => rsp.data.map(mapGroupWithStudents));
};

export const getGroupStudents = (id: number): Promise<User[]> => {
  return axiosInstance.get<User[]>(`groups/${id}/students/`).then(rsp => rsp.data);
};

export const createGroup = (data: GroupData) => {
  return axiosInstance.post('groups/', data);
};

export const updateGroup = (id: number, data: GroupData) => {
  return axiosInstance.put(`groups/${id}/`, data);
};

export const deleteGroup = (id: number) => {
  return axiosInstance.delete(`groups/${id}/`);
};

export const addCurrentStudentToGroup = (groupId: number) => {
  return axiosInstance.post(`groups/${groupId}/students/me/`);
};

export const updateStudentGroup = (data: UpdateStudentGroupData) => {
  return axiosInstance.patch(`groups/${data.group_id}/students/${data.student_id}/`, {
    status: data.status,
  });
};
