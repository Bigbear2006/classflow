from typing import cast

from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from classflow.application.repositories.course_teacher import (
    CourseTeacherRepository,
)
from classflow.domain.entities import CourseTeacher, User
from classflow.infrastructure.db.models import (
    course_teacher_students_table,
    course_teachers_table,
    users_table,
)
from classflow.infrastructure.db.repositories.base import create


class CourseTeacherRepositoryImpl(CourseTeacherRepository):
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create(self, course_teacher: CourseTeacher) -> CourseTeacher:
        return await create(self.session, course_teacher)

    async def get(self, course_id: int, teacher_id: int) -> CourseTeacher:
        stmt = select(CourseTeacher).where(
            course_teachers_table.c.course_id == course_id,
            course_teachers_table.c.teacher_id == teacher_id,
        )
        rows = await self.session.execute(stmt)
        return rows.scalar_one()

    async def get_all(self) -> list[CourseTeacher]:
        stmt = select(CourseTeacher).where(
            course_teachers_table.c.is_active.is_(True),
        )
        rows = await self.session.scalars(stmt)
        return cast(list[CourseTeacher], rows.all())

    async def get_students(
        self,
        course_id: int,
        teacher_id: int,
    ) -> list[User]:
        stmt = (
            select(User)
            .join(
                course_teacher_students_table,
                users_table.c.id == course_teacher_students_table.c.student_id,
            )
            .join(
                course_teachers_table,
                course_teacher_students_table.c.course_teacher_id
                == course_teachers_table.c.id,
            )
            .where(
                course_teachers_table.c.course_id == course_id,
                course_teachers_table.c.teacher_id == teacher_id,
            )
        )
        rows = await self.session.scalars(stmt)
        return cast(list[User], rows.all())

    async def delete(self, course_id: int, teacher_id: int) -> None:
        stmt = (
            update(CourseTeacher)
            .where(
                course_teachers_table.c.course_id == course_id,
                course_teachers_table.c.teacher_id == teacher_id,
            )
            .values(is_active=False)
        )
        await self.session.execute(stmt)
