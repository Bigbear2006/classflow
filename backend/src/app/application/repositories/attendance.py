from typing import Protocol

from app.domain.entities import Attendance
from app.domain.enums import AttendanceStatus


class AttendanceRepository(Protocol):
    async def create(
        self,
        lesson_id: int,
        user_id: int,
        status: AttendanceStatus,
        comment: str = '',
    ) -> Attendance:
        pass

    async def update(
        self,
        id: int,
        *,
        status: AttendanceStatus | None,
        comment: str | None = None,
    ) -> Attendance:
        pass

    async def get_lesson_attendances(self, lesson_id: int) -> list[Attendance]:
        pass
