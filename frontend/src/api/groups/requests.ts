import type { GroupDetail, User } from '../../entities';
import { axiosInstance } from '../base.ts';
import type { DetailGroupResponse, GroupData } from './types.ts';
import { mapGroupDetail } from './mappers.ts';

export const getGroups = async (): Promise<GroupDetail[]> => {
  return axiosInstance
    .get<DetailGroupResponse[]>('groups/')
    .then(rsp => rsp.data.map(mapGroupDetail));
};

export const getGroupStudents = async (id: number): Promise<User[]> => {
  return axiosInstance.get<User[]>(`groups/${id}/students/`).then(rsp => rsp.data);
};

export const createGroup = async (data: GroupData) => {
  return axiosInstance.post('groups/', data);
};

export const updateGroup = async (id: number, data: GroupData) => {
  return axiosInstance.put(`groups/${id}/`, data);
};

export const deleteGroup = (id: number) => {
  return axiosInstance.delete(`courses/${id}/`);
};
