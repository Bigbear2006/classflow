from typing import Protocol

from classflow.domain.entities import Attendance


class AttendanceRepository(Protocol):
    async def bulk_create(
        self,
        attendance_list: list[Attendance],
    ) -> list[Attendance]:
        pass
