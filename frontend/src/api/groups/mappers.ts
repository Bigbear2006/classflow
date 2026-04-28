import type { DetailGroupResponse, GroupResponse } from './types.ts';
import type { Group, GroupDetail } from '../../types.ts';
import { mapCourse } from '../courses/mappers.ts';

export const mapGroup = (data: GroupResponse): Group => {
  return {
    id: data.id,
    name: data.name,
    maxUsersCount: data.max_users_count,
    createdAt: new Date(data.created_at),
    courseId: data.course_id,
    defaultCabinetId: data.default_cabinet_id,
  };
};

export const mapGroupDetail = (data: DetailGroupResponse): GroupDetail => {
  return {
    id: data.id,
    name: data.name,
    maxUsersCount: data.max_users_count,
    createdAt: new Date(data.created_at),
    course: mapCourse(data.course),
    defaultCabinet: data.default_cabinet,
  };
};
