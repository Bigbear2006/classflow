from dataclasses import dataclass, field

from classflow.domain.enums import AttendanceStatus


@dataclass
class Attendance:
    id: int = field(init=False)
    lesson_id: int
    user_id: int
    status: AttendanceStatus
    comment: str = ''
