from datetime import date, datetime
from typing import cast

from sqlalchemy import Date, Select, delete, or_, select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import contains_eager, joinedload

from classflow.application.repositories.lesson import LessonRepository
from classflow.domain.entities import (
    Attendance,
    Cabinet,
    Course,
    CourseTeacher,
    CourseTeacherStudent,
    Group,
    Lesson,
    OrganizationMember,
)
from classflow.infrastructure.db.repositories.base import create
from classflow.infrastructure.db.tables import (
    attendance_table,
    course_teacher_students_table,
    groups_table,
    lessons_table,
    organization_members_table,
    student_groups_table,
    users_table,
)


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
        stmt = set_lessons_joins(select(Lesson))
        stmt = add_date_filters(stmt, start_date=start_date, end_date=end_date)
        rows = await self.session.scalars(stmt)
        return cast(list[Lesson], rows.all())

    async def get_student_lessons(
        self,
        student_id: int,
        *,
        start_date: date | None = None,
        end_date: date | None = None,
    ) -> list[Lesson]:
        stmt = (
            set_lessons_joins(select(Lesson))
            .outerjoin(
                student_groups_table,
                lessons_table.c.group_id == student_groups_table.c.group_id,
            )
            .outerjoin(
                course_teacher_students_table,
                lessons_table.c.course_teacher_student_id
                == course_teacher_students_table.c.id,
            )
            .where(
                or_(
                    course_teacher_students_table.c.student_id == student_id,
                    student_groups_table.c.student_id == student_id,
                ),
            )
        )
        stmt = add_date_filters(stmt, start_date=start_date, end_date=end_date)
        rows = await self.session.scalars(stmt)
        return cast(list[Lesson], rows.unique().all())

    async def get_teacher_lessons(
        self,
        teacher_id: int,
        *,
        start_date: date | None = None,
        end_date: date | None = None,
    ) -> list[Lesson]:
        stmt = set_lessons_joins(select(Lesson)).where(
            lessons_table.c.conducted_by_id == teacher_id,
        )
        stmt = add_date_filters(stmt, start_date=start_date, end_date=end_date)
        rows = await self.session.scalars(stmt)
        return cast(list[Lesson], rows.unique().all())

    async def get_students_with_attendance(
        self,
        lesson_id: int,
    ) -> list[OrganizationMember]:
        stmt = (
            select(OrganizationMember, Attendance.status)
            .options(contains_eager(OrganizationMember.user))
            .join(
                users_table,
                organization_members_table.c.user_id == users_table.c.id,
            )
            .outerjoin(
                attendance_table,
                (
                    organization_members_table.c.id
                    == attendance_table.c.student_id
                )
                & (attendance_table.c.lesson_id == lesson_id),
            )
            .outerjoin(
                course_teacher_students_table,
                organization_members_table.c.id
                == course_teacher_students_table.c.student_id,
            )
            .outerjoin(
                student_groups_table,
                organization_members_table.c.id
                == student_groups_table.c.student_id,
            )
            .outerjoin(
                groups_table,
                student_groups_table.c.group_id == groups_table.c.id,
            )
            .join(
                lessons_table,
                (lessons_table.c.group_id == groups_table.c.id)
                | (
                    lessons_table.c.course_teacher_student_id
                    == course_teacher_students_table.c.id
                ),
            )
            .where(lessons_table.c.id == lesson_id)
            .distinct()
        )
        rows = await self.session.execute(stmt)
        result = []
        for student, attendance_status in rows:
            student.attendance_status = attendance_status
            result.append(student)
        return result

    async def delete(self, id: int) -> None:
        stmt = delete(Lesson).where(lessons_table.c.id == id)
        await self.session.execute(stmt)


def set_lessons_joins(stmt: Select[tuple[Lesson]]) -> Select[tuple[Lesson]]:
    return (
        stmt.options(joinedload(Lesson.cabinet).joinedload(Cabinet.address))  # type: ignore[arg-type]
        .options(
            joinedload(Lesson.conducted_by).joinedload(
                OrganizationMember.user,
            ),
        )  # type: ignore[arg-type]
        .options(
            joinedload(Lesson.group).options(  # type: ignore[arg-type]
                joinedload(Group.course).joinedload(Course.subject),
                joinedload(Group.default_cabinet),
            ),
        )
        .options(
            joinedload(Lesson.course_teacher_student).options(  # type: ignore[arg-type]
                joinedload(CourseTeacherStudent.student).joinedload(
                    OrganizationMember.user,
                ),  # type: ignore[arg-type]
                joinedload(CourseTeacherStudent.course_teacher).options(  # type: ignore[arg-type]
                    joinedload(CourseTeacher.course).joinedload(
                        Course.subject,
                    ),  # type: ignore[arg-type]
                    joinedload(CourseTeacher.teacher).joinedload(
                        OrganizationMember.user,
                    ),  # type: ignore[arg-type]
                ),
            ),
        )
    )


def add_date_filters[T](
    stmt: Select[T],
    *,
    start_date: date | None = None,
    end_date: date | None = None,
) -> Select[T]:
    if start_date:
        stmt = stmt.where(
            lessons_table.c.start_date.cast(Date) >= start_date,
        )
    if end_date:
        stmt = stmt.where(lessons_table.c.end_date.cast(Date) <= end_date)
    return stmt
