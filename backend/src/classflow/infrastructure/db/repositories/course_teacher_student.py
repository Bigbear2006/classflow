from typing import cast

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from classflow.application.repositories.course_teacher_student import (
    CourseTeacherStudentRepository,
)
from classflow.domain.entities import (
    Course,
    CourseTeacher,
    CourseTeacherStudent,
    OrganizationMember,
)
from classflow.infrastructure.db.repositories.base import create
from classflow.infrastructure.db.tables import course_teacher_students_table


class CourseTeacherStudentRepositoryImpl(CourseTeacherStudentRepository):
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create(
        self,
        course_teacher_student: CourseTeacherStudent,
    ) -> CourseTeacherStudent:
        return await create(self.session, course_teacher_student)

    async def get_all(self) -> list[CourseTeacherStudent]:
        stmt = select(CourseTeacherStudent).order_by(
            course_teacher_students_table.c.created_at.desc(),
        )
        rows = await self.session.execute(stmt)
        return cast(list[CourseTeacherStudent], rows.all())

    async def get_with_payments(self) -> list[CourseTeacherStudent]:
        stmt = (
            select(CourseTeacherStudent)
            .options(
                joinedload(CourseTeacherStudent.course_teacher).options(
                    joinedload(CourseTeacher.course).joinedload(
                        Course.subject,
                    ),
                    joinedload(CourseTeacher.teacher).joinedload(
                        OrganizationMember.user,
                    ),
                ),
                joinedload(CourseTeacherStudent.student).joinedload(
                    OrganizationMember.user,
                ),
                joinedload(CourseTeacherStudent.lessons),
                joinedload(CourseTeacherStudent.payments),
            )
            .order_by(course_teacher_students_table.c.created_at.desc())
        )
        rows = await self.session.scalars(stmt)
        return cast(list[CourseTeacherStudent], rows.unique().all())
