from typing import cast

from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.ext.asyncio import AsyncSession

from classflow.application.repositories.attendance import AttendanceRepository
from classflow.domain.entities import Attendance
from classflow.infrastructure.db.tables import attendance_table


class AttendanceRepositoryImpl(AttendanceRepository):
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def bulk_create(
        self,
        attendance_list: list[Attendance],
    ) -> list[Attendance]:
        if not attendance_list:
            return []

        stmt = insert(Attendance).values(
            [
                {
                    'lesson_id': attendance.lesson_id,
                    'student_id': attendance.student_id,
                    'status': attendance.status,
                }
                for attendance in attendance_list
            ],
        )
        stmt = stmt.on_conflict_do_update(
            index_elements=[
                attendance_table.c.lesson_id,
                attendance_table.c.student_id,
            ],
            set_={'status': stmt.excluded.status},
        ).returning(Attendance)

        rows = await self.session.scalars(stmt)
        return cast(list[Attendance], rows.all())
