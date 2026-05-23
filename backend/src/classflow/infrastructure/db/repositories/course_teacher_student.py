from typing import cast

from sqlalchemy import select, update
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
from classflow.domain.enums import (
    CourseTeacherStatus,
    CourseType,
    StudentStatus,
)
from classflow.infrastructure.db.repositories.base import create, get_one
from classflow.infrastructure.db.tables import (
    course_teacher_students_table,
    course_teachers_table,
    courses_table,
)


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

    async def get(self, id: int) -> CourseTeacherStudent:
        stmt = select(CourseTeacherStudent).where(
            course_teacher_students_table.c.id == id,
        )
        rows = await self.session.execute(stmt)
        return get_one(rows)

    async def update(
        self,
        course_teacher_id: int,
        student_id: int,
        *,
        status: StudentStatus,
    ) -> CourseTeacherStudent:
        stmt = (
            update(CourseTeacherStudent)
            .where(
                course_teacher_students_table.c.course_teacher_id
                == course_teacher_id,
                course_teacher_students_table.c.student_id == student_id,
            )
            .values(status=status)
            .returning(CourseTeacherStudent)
        )
        rows = await self.session.execute(stmt)
        return get_one(rows)

    async def get_with_payments(
        self,
        *,
        teacher_id: int | None = None,
        student_id: int | None = None,
    ) -> list[CourseTeacherStudent]:
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
            .join(course_teachers_table)
            .join(courses_table)
            .where(courses_table.c.id == CourseType.INDIVIDUAL)
            .order_by(course_teacher_students_table.c.created_at.desc())
            .distinct()
        )

        if teacher_id:
            stmt = stmt.join(
                course_teachers_table,
                course_teacher_students_table.c.course_teacher_id
                == course_teachers_table.c.id,
            ).where(
                course_teachers_table.c.teacher_id == teacher_id,
                course_teachers_table.c.status != CourseTeacherStatus.DELETED,
            )

        if student_id:
            stmt = stmt.where(
                course_teacher_students_table.c.student_id == student_id,
                course_teacher_students_table.c.status == StudentStatus.ACTIVE,
            )

        rows = await self.session.scalars(stmt)
        return cast(list[CourseTeacherStudent], rows.unique().all())
