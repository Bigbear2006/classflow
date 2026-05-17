from dataclasses import dataclass, field

from classflow.domain.entities.course import Course
from classflow.domain.entities.group import Group
from classflow.domain.entities.organization import OrganizationMember
from classflow.domain.enums import AttendanceStatus


@dataclass
class Attendance:
    id: int = field(init=False)
    organization_id: int = field(init=False)
    lesson_id: int
    student_id: int
    status: AttendanceStatus


@dataclass
class CourseAttendanceStats:
    course: Course
    group: Group | None
    teacher: OrganizationMember | None
    conducted_lessons: int
    present_lessons: int
    rate: int
