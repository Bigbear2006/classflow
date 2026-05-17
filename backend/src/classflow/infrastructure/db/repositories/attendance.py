from typing import cast

from sqlalchemy import func, select
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import contains_eager, joinedload

from classflow.application.repositories.attendance import AttendanceRepository
from classflow.domain.entities import (
    Attendance,
    AttendanceStats,
    Course,
    CourseAttendanceStats,
    Group,
    OrganizationMember,
)
from classflow.domain.enums import AttendanceStatus
from classflow.infrastructure.db.repositories.lesson import set_lessons_joins
from classflow.infrastructure.db.tables import (
    attendance_table,
    course_teacher_students_table,
    course_teachers_table,
    courses_table,
    groups_table,
    lessons_table,
    organization_members_table,
    student_groups_table,
    subjects_table,
    users_table,
)


class AttendanceRepositoryImpl(AttendanceRepository):
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def bulk_create(
        self,
        attendance_list: list[Attendance],
    ) -> list[Attendance]:
        if not attendance_list:
            return []

        stmt = insert(Attendance).values(
            [
                {
                    'lesson_id': attendance.lesson_id,
                    'student_id': attendance.student_id,
                    'status': attendance.status,
                }
                for attendance in attendance_list
            ],
        )
        stmt = stmt.on_conflict_do_update(
            index_elements=[
                attendance_table.c.lesson_id,
                attendance_table.c.student_id,
            ],
            set_={'status': stmt.excluded.status},
        ).returning(Attendance)

        rows = await self.session.scalars(stmt)
        return cast(list[Attendance], rows.all())

    async def get_student_attendance(
        self,
        student_id: int,
    ) -> list[Attendance]:
        stmt = (
            select(Attendance)
            .options(
                set_lessons_joins(joinedload(Attendance.lesson)),
                joinedload(Attendance.student).joinedload(
                    OrganizationMember.user,
                ),
            )
            .where(attendance_table.c.student_id == student_id)
        )
        rows = await self.session.scalars(stmt)
        return cast(list[Attendance], rows.all())

    async def get_courses_stats(
        self,
        student_id: int,
    ) -> list[CourseAttendanceStats]:
        conducted_lessons_subquery = (
            select(func.count('*'))
            .select_from(lessons_table)
            .where(
                # (
                #     (groups_table.c.course_id == courses_table.c.id)
                #     & (lessons_table.c.group_id == groups_table.c.id)
                # )
                # | (
                #     (course_teachers_table.c.course_id == courses_table.c.id)
                #     & (
                #         lessons_table.c.course_teacher_student_id
                #         == course_teacher_students_table.c.id
                #     )
                # ),
                (lessons_table.c.group_id == groups_table.c.id)
                | (
                    lessons_table.c.course_teacher_student_id
                    == course_teacher_students_table.c.id
                ),
            )
        ).scalar_subquery()

        present_lessons_subquery = (
            select(func.count('*'))
            .select_from(attendance_table)
            .join(
                lessons_table,
                attendance_table.c.lesson_id == lessons_table.c.id,
            )
            .where(
                (lessons_table.c.group_id == groups_table.c.id)
                | (
                    lessons_table.c.course_teacher_student_id
                    == course_teacher_students_table.c.id
                ),
                attendance_table.c.student_id == student_id,
                attendance_table.c.status == AttendanceStatus.PRESENT,
            )
            .scalar_subquery()
        )

        stmt = (
            select(
                Course,
                Group,
                OrganizationMember,
                conducted_lessons_subquery,
                present_lessons_subquery,
            )
            .select_from(courses_table)
            .outerjoin(
                groups_table,
                courses_table.c.id == groups_table.c.course_id,
            )
            .outerjoin(
                student_groups_table,
                groups_table.c.id == student_groups_table.c.group_id,
            )
            .outerjoin(
                course_teachers_table,
                courses_table.c.id == course_teachers_table.c.course_id,
            )
            .outerjoin(
                course_teacher_students_table,
                course_teachers_table.c.id
                == course_teacher_students_table.c.course_teacher_id,
            )
            .outerjoin(
                organization_members_table,
                course_teachers_table.c.teacher_id
                == organization_members_table.c.id,
            )
            .outerjoin(
                subjects_table,
                subjects_table.c.id == courses_table.c.subject_id,
            )
            .outerjoin(
                users_table,
                users_table.c.id == organization_members_table.c.user_id,
            )
            .options(
                contains_eager(Course.subject),
                contains_eager(OrganizationMember.user),
            )
            .where(
                (student_groups_table.c.student_id == student_id)
                | (course_teacher_students_table.c.student_id == student_id),
            )
            # .group_by(
            #     courses_table.c.id,
            #     groups_table.c.id,
            #     organization_members_table.c.id,
            #     subjects_table.c.id,
            #     users_table.c.id,
            # )
        )

        rows = await self.session.execute(stmt)
        result = []
        for course, group, teacher, conducted_lessons, present_lessons in rows:
            result.append(
                CourseAttendanceStats(
                    course=course,
                    group=group,
                    teacher=teacher,
                    conducted_lessons=conducted_lessons,
                    present_lessons=present_lessons,
                    rate=round(present_lessons / conducted_lessons, 2) * 100
                    if conducted_lessons
                    else 0,
                ),
            )
        return result

    async def get_stats(self, student_id: int) -> AttendanceStats:
        stmt = select(
            func.count().filter(
                attendance_table.c.status == AttendanceStatus.PRESENT,
            ),
            func.count().filter(
                attendance_table.c.status == AttendanceStatus.ABSENT,
            ),
            func.count().filter(
                attendance_table.c.status == AttendanceStatus.EXCUSED,
            ),
            func.count(),
        ).where(attendance_table.c.student_id == student_id)

        rows = await self.session.execute(stmt)
        row = rows.one()
        return AttendanceStats(
            present=row[0],
            absent=row[1],
            excused=row[2],
            total=row[3],
        )
