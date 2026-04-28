import type { LessonDetail } from '../../types.ts';
import type { LessonDetailResponse } from './types.ts';
import { mapGroupDetail } from '../groups/mappers.ts';
import { mapCourseTeacherStudentDetail } from '../courses/mappers.ts';

export const mapLessonDetail = (data: LessonDetailResponse): LessonDetail => {
  return {
    id: data.id,
    startDate: new Date(data.start_date),
    endDate: new Date(data.end_date),
    url: data.url,
    createdAt: new Date(data.created_at),
    conductedBy: data.conducted_by,
    cabinet: data.cabinet,
    group: data.group ? mapGroupDetail(data.group) : data.group,
    courseTeacherStudent: data.course_teacher_student
      ? mapCourseTeacherStudentDetail(data.course_teacher_student)
      : data.course_teacher_student,
  };
};
