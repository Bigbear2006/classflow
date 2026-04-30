from dataclasses import dataclass, field

from classflow.domain.enums import AttendanceStatus


@dataclass
class Attendance:
    id: int = field(init=False)
    organization_id: int = field(init=False)
    lesson_id: int
    student_id: int
    status: AttendanceStatus
    comment: str = ''
