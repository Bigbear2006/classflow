import type { DayLessons, LessonDetail } from '../../entities';
import type { LessonDetailResponse } from './types.ts';
import { mapGroupDetail } from '../groups/mappers.ts';
import { mapCourseTeacherStudentDetail } from '../courses/mappers.ts';
import { mapOrgMemberDetail } from '../organizations/mappers.ts';

export const mapLessonDetail = (data: LessonDetailResponse): LessonDetail => {
  return {
    id: data.id,
    startDate: new Date(data.start_date),
    endDate: new Date(data.end_date),
    url: data.url,
    createdAt: new Date(data.created_at),
    conductedBy: mapOrgMemberDetail(data.conducted_by),
    cabinet: data.cabinet,
    group: data.group ? mapGroupDetail(data.group) : data.group,
    courseTeacherStudent: data.course_teacher_student
      ? mapCourseTeacherStudentDetail(data.course_teacher_student)
      : data.course_teacher_student,
  };
};

export const groupDayLessons = (lessons: LessonDetail[]): DayLessons[] => {
  const map = new Map<string, LessonDetail[]>();
  for (const lesson of lessons) {
    let key = lesson.startDate.toISOString().slice(0, 10);
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key)!.push(lesson);
  }
  return Array.from(map.entries()).map(([date, lessons]) => ({
    date: new Date(date),
    lessons: lessons,
  }));
};
