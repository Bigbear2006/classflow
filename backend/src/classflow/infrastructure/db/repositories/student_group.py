from sqlalchemy import func, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from classflow.application.repositories.student_group import (
    StudentGroupRepository,
)
from classflow.domain.entities import StudentGroup
from classflow.domain.enums import StudentStatus
from classflow.infrastructure.db.repositories.base import create
from classflow.infrastructure.db.tables import student_groups_table


class StudentGroupRepositoryImpl(StudentGroupRepository):
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create(self, student_group: StudentGroup) -> StudentGroup:
        return await create(self.session, student_group)

    async def get_students_count(self, group_id: int) -> int:
        stmt = select(func.count()).select_from(
            select(student_groups_table.c.id)
            .where(
                student_groups_table.c.group_id == group_id,
                student_groups_table.c.status == StudentStatus.ACTIVE,
            )
            .with_for_update()
            .subquery(),
        )
        return await self.session.scalar(stmt) or 0

    async def has_students(
        self,
        group_id: int,
        students_ids: list[int],
    ) -> bool:
        stmt = (
            select(func.count())
            .select_from(student_groups_table)
            .where(
                student_groups_table.c.group_id == group_id,
                student_groups_table.c.student_id.in_(students_ids),
                student_groups_table.c.status == StudentStatus.ACTIVE,
            )
        )
        return await self.session.scalar(stmt) == len(students_ids)

    async def update(
        self,
        student_id: int,
        group_id: int,
        *,
        status: StudentStatus,
    ) -> None:
        stmt = (
            update(StudentGroup)
            .where(
                student_groups_table.c.group_id == group_id,
                student_groups_table.c.student_id == student_id,
            )
            .values(status=status)
        )
        await self.session.execute(stmt)

    async def delete(self, student_id: int, group_id: int) -> None:
        stmt = (
            update(StudentGroup)
            .where(
                student_groups_table.c.student_id == student_id,
                student_groups_table.c.group_id == group_id,
            )
            .values(is_active=False)
        )
        await self.session.execute(stmt)
