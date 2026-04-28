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


class AttendanceStatus(StrEnum):
    PRESENT = 'PRESENT'
    ABSENT = 'ABSENT'
    EXCUSED = 'EXCUSED'


class LessonTransferStatus(StrEnum):
    PENDING = 'PENDING'
    ACCEPTED = 'ACCEPTED'
    REJECTED = 'REJECTED'
