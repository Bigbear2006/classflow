from datetime import timedelta
from typing import cast

from sqlalchemy import or_, select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from app.application.repositories.course import CourseRepository
from app.domain.entities import Course, User
from app.domain.enums import CoursePaymentType, LessonType
from app.infrastructure.db.models import (
    course_teacher_students_table,
    course_teachers_table,
    courses_table,
    groups_table,
    user_groups_table,
    users_table,
)
from app.infrastructure.db.repositories.base import create, exclude_none


class CourseRepositoryImpl(CourseRepository):
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create(self, course: Course) -> Course:
        return await create(self.session, course)

    async def update(
        self,
        id: int,
        *,
        name: str,
        image: str,
        lesson_price: int,
        lesson_type: LessonType,
        lesson_payment_type: CoursePaymentType,
        user_can_select_teacher: bool,
        description: str = '',
        lessons_count: int | None = None,
        duration: timedelta | None = None,
    ) -> Course:
        data = exclude_none(
            name=name,
            image=image,
            lesson_price=lesson_price,
            lesson_type=lesson_type,
            lesson_payment_type=lesson_payment_type,
            user_can_select_teacher=user_can_select_teacher,
            description=description,
            lessons_count=lessons_count,
            duration=duration,
        )
        stmt = update(Course).where(courses_table.c.id == id).values(data)
        rows = await self.session.execute(stmt)
        return rows.scalar_one()

    async def get_all(self) -> list[Course]:
        stmt = select(Course).options(joinedload(Course.subject))
        rows = await self.session.scalars(stmt)
        return cast(list[Course], rows.all())

    async def get_teachers(self, course_id: int) -> list[User]:
        stmt = (
            select(User)
            .join(
                course_teachers_table,
                users_table.c.id == course_teachers_table.c.teacher_id,
            )
            .where(course_teachers_table.c.course_id == course_id)
            .distinct()
        )
        rows = await self.session.scalars(stmt)
        return cast(list[User], rows.all())

    async def get_student_courses(self, user_id: int) -> list[Course]:
        stmt = (
            select(Course, User)
            .join(
                course_teachers_table,
                courses_table.c.id == course_teachers_table.c.course_id,
            )
            .join(
                course_teacher_students_table,
                course_teachers_table.c.id
                == course_teacher_students_table.c.course_teacher_id,
            )
            .join(
                users_table,
                course_teachers_table.c.teacher_id == users_table.c.id,
            )
            .join(groups_table, courses_table.c.id == groups_table.c.course_id)
            .join(
                user_groups_table,
                groups_table.c.id == user_groups_table.c.group_id,
            )
            .where(
                or_(
                    course_teacher_students_table.c.student_id == user_id,
                    user_groups_table.c.user_id == user_id,
                ),
            )
            .distinct()
        )
        rows = await self.session.scalars(stmt)
        result = []
        for course, user in rows.all():
            course.selected_teacher = user
            result.append(course)
        return result

    async def get_teacher_courses(self, user_id: int) -> list[Course]:
        stmt = (
            select(Course)
            .join(
                course_teachers_table,
                courses_table.c.course_id == course_teachers_table.c.course_id,
            )
            .where(course_teachers_table.c.teacher_id == user_id)
            .distinct()
        )
        rows = await self.session.scalars(stmt)
        return cast(list[Course], rows.all())
