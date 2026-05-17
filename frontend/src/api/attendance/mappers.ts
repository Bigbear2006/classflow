import type { CourseAttendanceStatsResponse } from './types.ts';
import type { CourseAttendanceStats } from '../../entities';
import { mapCourse } from '../courses/mappers.ts';
import { mapGroup } from '../groups/mappers.ts';
import { mapOrgMemberDetail } from '../organizations/mappers.ts';

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
