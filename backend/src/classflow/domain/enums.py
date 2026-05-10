from enum import StrEnum


class UserRole(StrEnum):
    STUDENT = 'STUDENT'
    TEACHER = 'TEACHER'
    ADMIN = 'ADMIN'
    OWNER = 'OWNER'


class LessonType(StrEnum):
    ONLINE = 'ONLINE'
    OFFLINE = 'OFFLINE'
    MIXED = 'MIXED'


class CourseType(StrEnum):
    GROUP = 'GROUP'
    INDIVIDUAL = 'INDIVIDUAL'


class CoursePaymentType(StrEnum):
    FULL_COURSE = 'FULL_COURSE'
    EVERY_LESSON = 'EVERY_LESSON'


class CourseTeacherStatus(StrEnum):
    ACTIVE = 'ACTIVE'
    PAUSED = 'PAUSED'
    DELETED = 'DELETED'


class StudentStatus(StrEnum):
    PENDING = 'PENDING'
    ACTIVE = 'ACTIVE'
    REJECTED = 'REJECTED'
    DELETED = 'DELETED'


class AttendanceStatus(StrEnum):
    PRESENT = 'PRESENT'
    ABSENT = 'ABSENT'
    EXCUSED = 'EXCUSED'
