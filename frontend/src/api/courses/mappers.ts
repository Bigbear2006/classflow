import type {
  Course,
  CourseDetail,
  CourseTeacherDetail,
  CourseTeacherStudentDetail,
  CourseTeacherStudentWithPayments,
  IndividualCourse,
  IndividualCourseTeacher,
  IndividualCourseTeacherStudent,
} from '../../entities';
import { Duration } from 'luxon';
import type {
  CourseDetailResponse,
  CourseResponse,
  CourseTeacherDetailResponse,
  CourseTeacherStudentDetailResponse,
  CourseTeacherStudentWithPaymentsResponse,
  IndividualCourseResponse,
  IndividualCourseTeacherResponse,
  IndividualCourseTeacherStudentResponse,
} from './types.ts';
import { mapOrgMemberDetail } from '../organizations/mappers.ts';
import { mapLesson } from '../lessons/mappers.ts';
import { mapPayment } from '../payments/mappers.ts';

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
  };
};

export const mapCourseDetail = (data: CourseDetailResponse): CourseDetail => {
  return {
    ...mapCourse(data),
    teachersCount: data.teachers_count,
    studentsCount: data.students_count,
    activeGroupId: data.active_group_id,
    studentStatus: data.student_status,
  };
};

export const mapCourseTeacherDetail = (data: CourseTeacherDetailResponse): CourseTeacherDetail => {
  return {
    id: data.id,
    course: mapCourseDetail(data.course),
    teacher: mapOrgMemberDetail(data.teacher),
    status: data.status,
    createdAt: new Date(data.created_at),
  };
};

export const mapCourseTeacherStudentDetail = (
  data: CourseTeacherStudentDetailResponse,
): CourseTeacherStudentDetail => {
  return {
    id: data.id,
    courseTeacher: mapCourseTeacherDetail(data.course_teacher),
    student: mapOrgMemberDetail(data.student),
    status: data.status,
    createdAt: new Date(data.created_at),
  };
};

export const mapCourseTeacherStudentWithPayments = (
  data: CourseTeacherStudentWithPaymentsResponse,
): CourseTeacherStudentWithPayments => {
  return {
    ...mapCourseTeacherStudentDetail(data),
    lessons: data.lessons.map(mapLesson),
    payments: data.payments.map(mapPayment),
  };
};

const mapIndividualCourseTeacherStudent = (
  data: IndividualCourseTeacherStudentResponse,
): IndividualCourseTeacherStudent => {
  return {
    id: data.id,
    courseTeacherId: data.courseTeacherId,
    student: mapOrgMemberDetail(data.student),
    status: data.status,
    createdAt: new Date(data.created_at),
  };
};

const mapIndividualCourseTeacher = (
  data: IndividualCourseTeacherResponse,
): IndividualCourseTeacher => {
  return {
    id: data.id,
    courseId: data.course_id,
    teacher: mapOrgMemberDetail(data.teacher),
    students: data.students.map(mapIndividualCourseTeacherStudent),
    status: data.status,
    createdAt: new Date(data.created_at),
  };
};

export const mapIndividualCourse = (data: IndividualCourseResponse): IndividualCourse => {
  return {
    ...mapCourse(data),
    teachers: data.teachers.map(mapIndividualCourseTeacher),
  };
};
