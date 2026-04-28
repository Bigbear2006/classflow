import type { CoursePaymentType, CourseType, LessonType, Subject, User } from '../../types.ts';

export interface CourseData {
  subject_id: number;
  type: CourseType;
  price: number;
  payment_type: CoursePaymentType;
  lesson_type: LessonType;
  lesson_duration: number;
  lessons_count?: number;
  duration?: number;
}

export interface CourseResponse {
  id: number;
  subject: Subject;
  type: CourseType;
  price: number;
  payment_type: CoursePaymentType;
  lesson_type: LessonType;
  lesson_duration: string;
  lessons_count?: number;
  duration?: string;
  selected_teacher?: User;
  teachers_count: number;
  students_count: number;
}

interface BaseCourseTeacherResponse {
  id: number;
  is_active: boolean;
  created_at: string;
}

export interface CourseTeacherResponse extends BaseCourseTeacherResponse {
  course_id: number;
  teacher_id: number;
}

export interface CourseTeacherDetailResponse extends BaseCourseTeacherResponse {
  course: CourseResponse;
  teacher: User;
}

interface BaseCourseTeacherStudentResponse {
  id: number;
  created_at: Date;
}

export interface CourseTeacherStudentResponse extends BaseCourseTeacherStudentResponse {
  course_teacher_id: number;
  student_id: number;
}

export interface CourseTeacherStudentDetailResponse extends BaseCourseTeacherStudentResponse {
  course_teacher: CourseTeacherDetailResponse;
  student: User;
}
