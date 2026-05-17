from typing import Protocol

from classflow.domain.entities import Attendance, CourseAttendanceStats


class AttendanceRepository(Protocol):
    async def bulk_create(
        self,
        attendance_list: list[Attendance],
    ) -> list[Attendance]:
        pass

    async def get_courses_stats(
        self,
        student_id: int,
    ) -> list[CourseAttendanceStats]:
        pass
