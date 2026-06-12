from typing import cast

from sqlalchemy import delete, exists, select, update
from sqlalchemy.exc import IntegrityError, NoResultFound
from sqlalchemy.ext.asyncio import AsyncSession

from classflow.application.common.types import expect
from classflow.application.repositories.course_teacher import (
    CourseTeacherRepository,
)
from classflow.domain.entities import CourseTeacher, User
from classflow.domain.enums import CourseTeacherStatus
from classflow.domain.exceptions import CannotDeleteEntityError, NotFoundError
from classflow.infrastructure.db.repositories.base import create, get_one
from classflow.infrastructure.db.tables import (
    course_teacher_students_table,
    course_teachers_table,
    users_table,
)


class CourseTeacherRepositoryImpl(CourseTeacherRepository):
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create(self, course_teacher: CourseTeacher) -> CourseTeacher:
        try:
            ct = await self.get(
                course_teacher.course_id,
                course_teacher.teacher_id,
            )
            return await self.update(
                ct.course_id,
                ct.teacher_id,
                status=CourseTeacherStatus.ACTIVE,
            )
        except (NoResultFound, NotFoundError):
            return await create(self.session, course_teacher)

    async def update(
        self,
        course_id: int,
        teacher_id: int,
        *,
        status: CourseTeacherStatus,
    ) -> CourseTeacher:
        stmt = (
            update(CourseTeacher)
            .where(
                course_teachers_table.c.course_id == course_id,
                course_teachers_table.c.teacher_id == teacher_id,
            )
            .values(status=status)
            .returning(CourseTeacher)
        )
        rows = await self.session.execute(stmt)
        return get_one(rows)

    async def get(self, course_id: int, teacher_id: int) -> CourseTeacher:
        stmt = select(CourseTeacher).where(
            course_teachers_table.c.course_id == course_id,
            course_teachers_table.c.teacher_id == teacher_id,
        )
        rows = await self.session.execute(stmt)
        return get_one(rows)

    async def get_by_student(
        self,
        course_teacher_student_id: int,
    ) -> CourseTeacher | None:
        stmt = (
            select(CourseTeacher)
            .join(course_teacher_students_table)
            .where(
                course_teacher_students_table.c.id
                == course_teacher_student_id,
            )
        )
        rows = await self.session.execute(stmt)
        return rows.scalar_one_or_none()

    async def get_all(self) -> list[CourseTeacher]:
        stmt = select(CourseTeacher).where(
            course_teachers_table.c.status == CourseTeacherStatus.ACTIVE,
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
        await self.update(
            course_id,
            teacher_id,
            status=CourseTeacherStatus.DELETED,
        )

    async def delete_inactive(self, course_id: int) -> None:
        stmt = delete(CourseTeacher).where(
            course_teachers_table.c.course_id == course_id,
            course_teachers_table.c.status == CourseTeacherStatus.DELETED,
        )
        try:
            await self.session.execute(stmt)
        except IntegrityError as e:
            raise CannotDeleteEntityError(
                'CourseTeacher has related students',
            ) from e

    async def exists(self, course_id: int, teacher_id: int) -> bool:
        stmt = select(
            exists().where(
                course_teachers_table.c.course_id == course_id,
                course_teachers_table.c.teacher_id == teacher_id,
                course_teachers_table.c.status != CourseTeacherStatus.DELETED,
            ),
        )
        return expect(await self.session.scalar(stmt))
