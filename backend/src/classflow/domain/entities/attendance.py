from dataclasses import dataclass, field

from classflow.domain.entities.course import Course
from classflow.domain.entities.group import Group
from classflow.domain.entities.lesson import Lesson
from classflow.domain.entities.organization import (
    Organization,
    OrganizationMember,
)
from classflow.domain.enums import AttendanceStatus


@dataclass
class Attendance:
    id: int = field(init=False)
    organization_id: int = field(init=False)
    lesson_id: int
    lesson: Lesson | None = field(init=False, default=None)
    student_id: int
    student: Organization | None = field(init=False, default=None)
    status: AttendanceStatus


@dataclass
class AttendanceStats:
    present: int
    absent: int
    excused: int
    total: int


@dataclass
class CourseAttendanceStats:
    course: Course
    group: Group | None
    teacher: OrganizationMember | None
    conducted_lessons: int
    present_lessons: int
    rate: int
