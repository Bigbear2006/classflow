from datetime import date, datetime
from typing import cast

from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.application.repositories.lesson import LessonRepository
from app.domain.entities import Group, Lesson
from app.infrastructure.db.models import lessons_table, user_groups_table


class LessonRepositoryImpl(LessonRepository):
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create(
        self,
        cabinet_id: int,
        conducted_by_id: int,
        start_date: datetime,
        end_date: datetime,
        group_id: int | None = None,
        student_teacher_course_id: int | None = None,
    ) -> Lesson:
        pass
        lesson = Lesson(
            cabinet_id=cabinet_id,
            conducted_by_id=conducted_by_id,
            start_date=start_date,
            end_date=end_date,
            group_id=group_id,
            student_teacher_course_id=student_teacher_course_id,
        )
        self.session.add(lesson)
        await self.session.flush()
        return lesson

    async def get_by_date_range(
        self,
        start_date: date,
        end_date: date,
    ) -> list[Lesson]:
        stmt = select(Lesson).where(
            lessons_table.c.start_date >= start_date,
            lessons_table.c.end_date <= end_date,
        )
        rows = await self.session.scalars(stmt)
        return cast(list[Lesson], rows.all())

    async def get_student_lessons(self, user_id: int) -> list[Lesson]:
        stmt = (
            select(Lesson)
            .join(
                user_groups_table,
                lessons_table.c.group_id == user_groups_table.c.group_id,
            )
            .where(
                or_(
                    lessons_table.c.student_id == user_id,
                    user_groups_table.c.user_id == user_id,
                ),
            )
        )
        rows = await self.session.scalars(stmt)
        return cast(list[Lesson], rows.unique().all())

    async def get_teacher_lessons(self, user_id: int) -> list[Lesson]:
        stmt = (
            select(Lesson)
            .join(lessons_table.c.group_id == Group.id)
            .where(lessons_table.c.teacher_id == user_id)
        )
        rows = await self.session.scalars(stmt)
        return cast(list[Lesson], rows.unique().all())
