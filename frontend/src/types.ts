import type { Duration } from 'luxon';

export type UserRole = 'OWNER' | 'ADMIN' | 'TEACHER' | 'STUDENT';
export type LessonType = 'ONLINE' | 'OFFLINE' | 'MIXED';
export type CourseType = 'GROUP' | 'INDIVIDUAL';
export type CoursePaymentType = 'FULL_COURSE' | 'EVERY_LESSON';
export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'EXCUSED';
export type LessonStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';

export type FormAction = 'CREATE' | 'EDIT';
export type ModalAction = FormAction | 'VIEW';

export interface RoleCount {
  role: UserRole;
  count: number;
}

export interface OrganizationStats {
  courses: number;
  teachers: number;
  students: number;
  groups: number;
  todayLessons: number;
  totalIncome: number;
}

export interface User {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
  avatar?: string;
}

export interface UserWithPayment extends User {
  totalPaid: number;
  payments: Payment[];
}

export interface Organization {
  id: number;
  name: string;
  slug: string;
  createdById: number;
  createdAt: Date;
}

export interface OrganizationDetail extends Organization {
  courses: Course[];
  membersCount: number;
  groupsCount: number;
}

export interface MyOrganization extends Organization {
  role: UserRole;
  coursesCount: number;
  membersCount: number;
}

export interface OrganizationMember {
  id: number;
  organizationId: number;
  userId: number;
  role: UserRole;
  createdAt: Date;
}

export interface OrganizationMemberDetail {
  id: number;
  organizationId: number;
  user: User;
  role: UserRole;
  createdAt: Date;
}

export interface Subject {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface Course {
  id: number;
  subject: Subject;
  type: CourseType;
  price: number;
  paymentType: CoursePaymentType;
  lessonType: LessonType;
  lessonDuration: Duration;
  lessonsCount?: number;
  duration?: Duration;
  selectedTeacher?: User;
  teachersCount: number;
  studentsCount: number;
}

export interface CourseDetail extends Course {
  groups: GroupDetail[];
  teachers: User[];
}

export interface CourseTeacherDetail {
  id: number;
  course: Course;
  teacher: User;
  isActive: boolean;
  createdAt: Date;
}

export interface CourseTeacherStudent {
  id: number;
  courseTeacher: CourseTeacherDetail;
  student: User;
  createdAt: Date;
  // status: 'active' | 'pending' | 'cancelled';
}

export interface CourseTeacherStudentWithLessons extends CourseTeacherStudent {
  lessons: LessonDetail[];
}

export interface Address {
  id: number;
  address: string;
}

export interface AddressDetail extends Address {
  cabinets: Cabinet[];
}

export interface Cabinet {
  id: number;
  number: string;
}

export interface CabinetDetail extends Cabinet {
  address: Address;
}

interface BaseGroup {
  id: number;
  name: string;
  maxUsersCount: number;
  createdAt: Date;
}

export interface Group extends BaseGroup {
  courseId: number;
  defaultCabinetId?: number;
}

export interface GroupDetail extends BaseGroup {
  course: Course;
  defaultCabinet?: Cabinet;
}

export interface GroupWithPayments extends GroupDetail {
  totalPaid: number;
  students: UserWithPayment[];
  lessons: LessonDetail[];
}

export interface UserGroup {
  id: string;
  userId: string;
  groupId: string;
  createdAt: string;
}

interface BaseLesson {
  id: number;
  startDate: Date;
  endDate: Date;
  url?: string;
  createdAt: Date;
  // status: LessonStatus;
  // TODO: add
  paymentId?: number;
}

export interface Lesson extends BaseLesson {
  conductedById: number;
  cabinetId?: number;
  grouId?: number;
  courseTeacherStudentId?: number;
}

export interface LessonDetail extends BaseLesson {
  conductedBy: User;
  cabinet?: Cabinet;
  group?: GroupDetail;
  courseTeacherStudent?: CourseTeacherStudent;
}

export interface Attendance {
  id: string;
  lessonId: string;
  userId: string;
  status: AttendanceStatus;
  comment: string;
}

export interface Payment {
  id: number;
  amount: number;
  createdById: string;
  userGroupId: number | null;
  lessonId: number | null;
  date: string;
  comment: string;
}

export interface Feedback {
  id: string;
  authorId: string;
  authorName: string;
  teacherId: string | null;
  courseId: string | null;
  rating: number;
  text: string;
  createdAt: string;
}
