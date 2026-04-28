import type { Course, CourseTeacherDetail, CourseTeacherStudent } from '../../types.ts';
import { Duration } from 'luxon';
import type {
  CourseResponse,
  CourseTeacherDetailResponse,
  CourseTeacherStudentDetailResponse,
} from './types.ts';

export const mapCourse = (data: CourseResponse): Course => {
  return {
    id: data.id,
    subject: data.subject,
    type: data.type,
    price: data.price,
    paymentType: data.payment_type,
    lessonType: data.lesson_type,
    lessonDuration: Duration.fromISO(data.lesson_duration),
    lessonsCount: data.lessons_count,
    duration: data.duration ? Duration.fromISO(data.duration) : undefined,
    selectedTeacher: data.selected_teacher,
    teachersCount: data.teachers_count,
    studentsCount: data.students_count,
  };
};

export const mapCourseTeacherDetail = (data: CourseTeacherDetailResponse): CourseTeacherDetail => {
  return {
    id: data.id,
    course: mapCourse(data.course),
    teacher: data.teacher,
    isActive: data.is_active,
    createdAt: new Date(data.created_at),
  };
};

export const mapCourseTeacherStudentDetail = (
  data: CourseTeacherStudentDetailResponse,
): CourseTeacherStudent => {
  return {
    id: data.id,
    courseTeacher: mapCourseTeacherDetail(data.course_teacher),
    student: data.student,
    createdAt: new Date(data.created_at),
  };
};
