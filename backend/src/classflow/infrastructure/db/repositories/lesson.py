from datetime import date, datetime
from typing import cast

from sqlalchemy import Date, Select, delete, or_, select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from classflow.application.repositories.lesson import LessonRepository
from classflow.domain.entities import (
    Cabinet,
    Course,
    CourseTeacher,
    CourseTeacherStudent,
    Group,
    Lesson,
)
from classflow.infrastructure.db.models import (
    course_teacher_students_table,
    lessons_table,
    user_groups_table,
)
from classflow.infrastructure.db.repositories.base import create


class LessonRepositoryImpl(LessonRepository):
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create(self, lesson: Lesson) -> Lesson:
        return await create(self.session, lesson)

    async def update(
        self,
        id: int,
        *,
        conducted_by_id: int,
        start_date: datetime,
        end_date: datetime,
        cabinet_id: int | None = None,
        url: str | None = None,
        group_id: int | None = None,
        course_teacher_student_id: int | None = None,
    ) -> Lesson:
        data = {
            'conducted_by_id': conducted_by_id,
            'start_date': start_date,
            'end_date': end_date,
            'cabinet_id': cabinet_id,
            'url': url,
            'group_id': group_id,
            'course_teacher_student_id': course_teacher_student_id,
        }
        stmt = (
            update(Lesson)
            .where(lessons_table.c.id == id)
            .values(data)
            .returning(Lesson)
        )
        rows = await self.session.execute(stmt)
        return rows.scalar_one()

    async def get_all(
        self,
        *,
        start_date: date | None = None,
        end_date: date | None = None,
    ) -> list[Lesson]:
        stmt = _set_lessons_joins(select(Lesson))

        if start_date:
            stmt = stmt.where(
                lessons_table.c.start_date.cast(Date) >= start_date,
            )
        if end_date:
            stmt = stmt.where(lessons_table.c.end_date.cast(Date) <= end_date)

        rows = await self.session.scalars(stmt)
        return cast(list[Lesson], rows.all())

    async def get_student_lessons(self, user_id: int) -> list[Lesson]:
        stmt = (
            _set_lessons_joins(select(Lesson))
            .join(
                user_groups_table,
                lessons_table.c.group_id == user_groups_table.c.group_id,
                isouter=True,
            )
            .join(
                course_teacher_students_table,
                lessons_table.c.course_teacher_student_id
                == course_teacher_students_table.c.id,
                isouter=True,
            )
            .where(
                or_(
                    course_teacher_students_table.c.student_id == user_id,
                    user_groups_table.c.user_id == user_id,
                ),
            )
        )
        rows = await self.session.scalars(stmt)
        return cast(list[Lesson], rows.unique().all())

    async def get_teacher_lessons(self, user_id: int) -> list[Lesson]:
        stmt = _set_lessons_joins(select(Lesson)).where(
            lessons_table.c.conducted_by_id == user_id,
        )
        rows = await self.session.scalars(stmt)
        return cast(list[Lesson], rows.unique().all())

    async def delete(self, id: int) -> None:
        stmt = delete(Lesson).where(lessons_table.c.id == id)
        await self.session.execute(stmt)


def _set_lessons_joins(stmt: Select[tuple[Lesson]]) -> Select[tuple[Lesson]]:
    return (
        stmt.options(joinedload(Lesson.cabinet).joinedload(Cabinet.address))  # type: ignore[arg-type]
        .options(joinedload(Lesson.conducted_by))  # type: ignore[arg-type]
        .options(
            joinedload(Lesson.group)  # type: ignore[arg-type]
            .joinedload(Group.course)  # type: ignore[arg-type]
            .joinedload(Course.subject),  # type: ignore[arg-type]
        )
        .options(
            joinedload(Lesson.course_teacher_student).options(  # type: ignore[arg-type]
                joinedload(CourseTeacherStudent.student),  # type: ignore[arg-type]
                joinedload(CourseTeacherStudent.course_teacher).options(  # type: ignore[arg-type]
                    joinedload(CourseTeacher.course),  # type: ignore[arg-type]
                    joinedload(CourseTeacher.teacher),  # type: ignore[arg-type]
                ),
            ),
        )
    )
