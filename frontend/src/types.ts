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
  organizationId: number;
  subject: Subject;
  type: CourseType;
  price: number;
  paymentType: CoursePaymentType;
  lessonType: LessonType;
  lessonDuration: number;
  lessonsCount?: number;
  duration?: number;
  selectedTeacher?: User;
  teachersCount: number;
  studentsCount: number;
}

export interface CourseDetail extends Course {
  groups: Group[];
  teachers: User[];
}

export interface CourseTeacher {
  id: number;
  course: Course;
  teacher: User;
  isActive: boolean;
}

export interface CourseTeacherStudent {
  id: number;
  courseTeacher: CourseTeacher;
  student: User;
  createdAt: Date;
  // status: 'active' | 'pending' | 'cancelled';
}

export interface CourseTeacherStudentWithLessons extends CourseTeacherStudent {
  lessons: Lesson[];
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

export interface Group {
  id: number;
  courseId: number;
  course: Course;
  name: string;
  defaultCabinet?: Cabinet;
  maxUsersCount: number;
  createdAt: Date;
  studentsCount?: number;
  students: User[];
}

export interface GroupWithPayments extends Group {
  totalPaid: number;
  students: UserWithPayment[];
  lessons: Lesson[];
}

export interface UserGroup {
  id: string;
  userId: string;
  groupId: string;
  createdAt: string;
}

export interface Lesson {
  id: number;
  group: Group | null;
  studentTeacherCourse: CourseTeacherStudent | null;
  cabinetId: number;
  cabinet: Cabinet;
  conductedById: number;
  conductedBy: User;
  startDate: Date;
  endDate: Date;
  // status: LessonStatus;
  createdAt: Date;
  paymentId?: number;
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
