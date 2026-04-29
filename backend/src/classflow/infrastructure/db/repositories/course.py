from datetime import timedelta
from typing import cast

from sqlalchemy import func, or_, select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from classflow.application.repositories.course import CourseRepository
from classflow.domain.entities import Course, Group, User
from classflow.domain.enums import CoursePaymentType, CourseType, LessonType
from classflow.infrastructure.db.repositories.base import create
from classflow.infrastructure.db.repositories.group import set_group_joins
from classflow.infrastructure.db.tables import (
    course_teacher_students_table,
    course_teachers_table,
    courses_table,
    groups_table,
    user_groups_table,
    users_table,
)


class CourseRepositoryImpl(CourseRepository):
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create(self, course: Course) -> Course:
        return await create(self.session, course)

    async def update(
        self,
        id: int,
        *,
        subject_id: int,
        type: CourseType,
        price: int,
        payment_type: CoursePaymentType,
        lesson_type: LessonType,
        lesson_duration: int,
        lessons_count: int | None = None,
        duration: timedelta | None = None,
    ) -> Course:
        data = {
            'subject_id': subject_id,
            'type': type,
            'price': price,
            'payment_type': payment_type,
            'lesson_type': lesson_type,
            'lesson_duration': lesson_duration,
            'lessons_count': lessons_count,
            'duration': duration,
        }
        stmt = (
            update(Course)
            .where(courses_table.c.id == id)
            .values(data)
            .returning(Course)
        )
        rows = await self.session.execute(stmt)
        return rows.scalar_one()

    async def get_all(self) -> list[Course]:
        teachers_count_subquery = (
            select(func.count(course_teachers_table.c.id))
            .where(course_teachers_table.c.course_id == courses_table.c.id)
            .scalar_subquery()
        )

        group_students_count_subquery = (
            select(func.count(user_groups_table.c.id))
            .join(
                groups_table,
                user_groups_table.c.group_id == groups_table.c.id,
            )
            .where(groups_table.c.course_id == courses_table.c.id)
            .scalar_subquery()
        )

        individual_students_count_subquery = (
            select(func.count(course_teacher_students_table.c.id))
            .join(
                course_teachers_table,
                course_teacher_students_table.c.course_teacher_id
                == course_teachers_table.c.id,
            )
            .where(course_teachers_table.c.course_id == courses_table.c.id)
            .scalar_subquery()
        )

        stmt = select(
            Course,
            teachers_count_subquery,
            group_students_count_subquery,
            individual_students_count_subquery,
        ).options(joinedload(Course.subject))  # type: ignore[arg-type]

        rows = await self.session.execute(stmt)
        result = []
        for (
            course,
            teachers_count,
            group_students,
            individual_students,
        ) in rows:
            course.teachers_count = teachers_count
            course.students_count = group_students + individual_students
            result.append(course)
        return result

    async def get_groups(self, course_id: int) -> list[Group]:
        stmt = set_group_joins(select(Group)).where(
            groups_table.c.course_id == course_id,
        )
        rows = await self.session.scalars(stmt)
        return cast(list[Group], rows.all())

    async def get_teachers(self, course_id: int) -> list[User]:
        stmt = (
            select(User)
            .outerjoin(
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
            .options(joinedload(Course.subject))  # type: ignore[arg-type]
            .join(
                course_teachers_table,
                courses_table.c.id == course_teachers_table.c.course_id,
                isouter=True,
            )
            .join(
                course_teacher_students_table,
                course_teachers_table.c.id
                == course_teacher_students_table.c.course_teacher_id,
                isouter=True,
            )
            .join(
                users_table,
                course_teachers_table.c.teacher_id == users_table.c.id,
                isouter=True,
            )
            .join(
                groups_table,
                courses_table.c.id == groups_table.c.course_id,
                isouter=True,
            )
            .join(
                user_groups_table,
                groups_table.c.id == user_groups_table.c.group_id,
                isouter=True,
            )
            .where(
                or_(
                    course_teacher_students_table.c.student_id == user_id,
                    user_groups_table.c.user_id == user_id,
                ),
            )
            .distinct()
        )
        rows = await self.session.execute(stmt)
        result = []
        for course, user in rows.all():
            course.selected_teacher = user
            result.append(course)
        return result

    async def get_teacher_courses(self, user_id: int) -> list[Course]:
        stmt = (
            select(Course)
            .options(joinedload(Course.subject))  # type: ignore[arg-type]
            .join(
                course_teachers_table,
                courses_table.c.id == course_teachers_table.c.course_id,
            )
            .where(course_teachers_table.c.teacher_id == user_id)
            .distinct()
        )
        rows = await self.session.scalars(stmt)
        return cast(list[Course], rows.all())
