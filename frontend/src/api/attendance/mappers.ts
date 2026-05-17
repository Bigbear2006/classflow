import type { AttendanceDetailResponse, CourseAttendanceStatsResponse } from './types.ts';
import type { AttendanceDetail, CourseAttendanceStats } from '../../entities';
import { mapCourse } from '../courses/mappers.ts';
import { mapGroup } from '../groups/mappers.ts';
import { mapOrgMemberDetail } from '../organizations/mappers.ts';
import { mapLessonDetail } from '../lessons/mappers.ts';

export const mapAttendanceDetail = (data: AttendanceDetailResponse): AttendanceDetail => {
  return {
    id: data.id,
    status: data.status,
    lesson: mapLessonDetail(data.lesson),
    student: mapOrgMemberDetail(data.student),
  };
};

export const mapCourseAttendanceStats = (
  data: CourseAttendanceStatsResponse,
): CourseAttendanceStats => {
  return {
    course: mapCourse(data.course),
    group: data.group ? mapGroup(data.group) : data.group,
    teacher: data.teacher ? mapOrgMemberDetail(data.teacher) : data.teacher,
    conductedLessons: data.conducted_lessons,
    presentLessons: data.present_lessons,
    rate: data.rate,
  };
};
