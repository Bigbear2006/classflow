from datetime import date, datetime

from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.application.repositories.lesson import LessonRepository
from app.domain.entities import Group, Lesson, UserGroup


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
            Lesson.start_date >= start_date,
            Lesson.end_date <= end_date,
        )
        rows = await self.session.scalars(stmt)
        return rows.all()

    async def get_student_lessons(self, user_id: int) -> list[Lesson]:
        stmt = (
            select(Lesson)
            .join(Lesson.group_id == UserGroup.group_id)
            .where(
                or_(
                    Lesson.student_id == user_id,
                    UserGroup.user_id == user_id,
                ),
            )
        )
        rows = await self.session.scalars(stmt)
        return rows.unique().all()

    async def get_teacher_lessons(self, user_id: int) -> list[Lesson]:
        stmt = (
            select(Lesson)
            .join(Lesson.group_id == Group.id)
            .where(Lesson.teacher_id == user_id)
        )
        rows = await self.session.scalars(stmt)
        return rows.unique().all()
