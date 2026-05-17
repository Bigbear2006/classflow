from typing import Protocol

from classflow.domain.entities import (
    Attendance,
    AttendanceStats,
    CourseAttendanceStats,
)


class AttendanceRepository(Protocol):
    async def bulk_create(
        self,
        attendance_list: list[Attendance],
    ) -> list[Attendance]:
        pass

    async def get_student_attendance(
        self,
        student_id: int,
    ) -> list[Attendance]:
        pass

    async def get_stats(self, student_id: int) -> AttendanceStats:
        pass

    async def get_courses_stats(
        self,
        student_id: int,
    ) -> list[CourseAttendanceStats]:
        pass
