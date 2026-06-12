from datetime import UTC, datetime
from typing import cast

from sqlalchemy import Date, func, or_, select, update
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import contains_eager

from classflow.application.repositories.organization_member import (
    OrganizationMemberRepository,
)
from classflow.domain.entities import (
    OrganizationMember,
    StudentStats,
    TeacherStats,
)
from classflow.domain.enums import CourseTeacherStatus, StudentStatus, UserRole
from classflow.domain.exceptions import AlreadyExistsError
from classflow.infrastructure.db.repositories.base import create, get_one
from classflow.infrastructure.db.tables import (
    course_teacher_students_table,
    course_teachers_table,
    courses_table,
    groups_table,
    lessons_table,
    organization_members_table,
    payments_table,
    student_groups_table,
    users_table,
)


class OrganizationMemberRepositoryImpl(OrganizationMemberRepository):
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create(self, member: OrganizationMember) -> OrganizationMember:
        try:
            return await create(self.session, member)
        except IntegrityError as e:
            raise AlreadyExistsError(
                'User already joined this organization',
                organization_id=member.organization_id,
                user_id=member.user_id,
            ) from e

    async def update(
        self,
        org_id: int,
        user_id: int,
        *,
        role: UserRole,
    ) -> OrganizationMember:
        stmt = (
            update(OrganizationMember)
            .where(
                organization_members_table.c.organization_id == org_id,
                organization_members_table.c.user_id == user_id,
            )
            .values(role=role)
            .returning(OrganizationMember)
        )
        rows = await self.session.execute(stmt)
        return get_one(rows)

    async def get(
        self,
        org_id: int,
        user_id: int,
    ) -> OrganizationMember:
        stmt = select(OrganizationMember).where(
            organization_members_table.c.organization_id == org_id,
            organization_members_table.c.user_id == user_id,
        )
        rows = await self.session.execute(stmt)
        return get_one(rows)

    async def get_organization_members(
        self,
        org_id: int,
        *,
        query: str | None = None,
        roles: list[UserRole] | None = None,
    ) -> list[OrganizationMember]:
        stmt = (
            select(OrganizationMember)
            .join(
                users_table,
                organization_members_table.c.user_id == users_table.c.id,
            )
            .where(
                organization_members_table.c.organization_id == org_id,
            )
            .options(contains_eager(OrganizationMember.user))  # type: ignore[arg-type]
            .limit(10)
        )

        if query:
            stmt = stmt.where(
                or_(
                    users_table.c.fullname.op('%')(query),
                    users_table.c.email.op('%')(query),
                ),
            ).order_by(
                func.greatest(
                    func.similarity(users_table.c.fullname, query),
                    func.similarity(users_table.c.email, query),
                ).desc(),
            )

        if roles:
            stmt = stmt.where(organization_members_table.c.role.in_(roles))

        rows = await self.session.scalars(stmt)
        return cast(list[OrganizationMember], rows.all())

    async def get_student_stats(self, student_id: int) -> StudentStats:
        courses_subquery = (
            select(func.count('*'))
            .select_from(courses_table)
            .outerjoin(course_teachers_table)
            .outerjoin(course_teacher_students_table)
            .outerjoin(groups_table)
            .outerjoin(student_groups_table)
            .where(
                (student_groups_table.c.student_id == student_id)
                | (course_teacher_students_table.c.student_id == student_id),
            )
            .distinct()
        )

        completed_lessons_subquery = (
            select(func.count('*'))
            .select_from(lessons_table)
            .outerjoin(course_teacher_students_table)
            .outerjoin(groups_table)
            .outerjoin(student_groups_table)
            .where(
                (student_groups_table.c.student_id == student_id)
                | (course_teacher_students_table.c.student_id == student_id),
            )
            .distinct()
        )

        today_lessons_subquery = (
            select(func.count('*'))
            .select_from(lessons_table)
            .outerjoin(course_teacher_students_table)
            .outerjoin(groups_table)
            .outerjoin(student_groups_table)
            .where(
                lessons_table.c.start_date.cast(Date)
                == datetime.now(UTC).date(),
                (student_groups_table.c.student_id == student_id)
                | (course_teacher_students_table.c.student_id == student_id),
            )
            .distinct()
        )

        total_paid_subquery = (
            select(func.coalesce(func.sum(payments_table.c.amount), 0))
            .select_from(payments_table)
            .outerjoin(course_teacher_students_table)
            .outerjoin(student_groups_table)
            .where(
                (student_groups_table.c.student_id == student_id)
                | (course_teacher_students_table.c.student_id == student_id),
            )
            .distinct()
        )

        courses = await self.session.scalar(courses_subquery)
        completed_lessons = await self.session.scalar(
            completed_lessons_subquery,
        )
        today_lessons = await self.session.scalar(today_lessons_subquery)
        total_paid = await self.session.scalar(total_paid_subquery)
        return StudentStats(
            courses=courses or 0,
            completed_lessons=completed_lessons or 0,
            today_lessons=today_lessons or 0,
            total_paid=total_paid or 0,
        )

    async def get_teacher_stats(self, teacher_id: int) -> TeacherStats:
        courses_subquery = (
            select(func.count('*'))
            .select_from(courses_table)
            .outerjoin(course_teachers_table)
            .where(
                course_teachers_table.c.teacher_id == teacher_id,
                course_teachers_table.c.status != CourseTeacherStatus.DELETED,
            )
            .distinct()
        )

        individual_students_subquery = (
            select(func.count('*'))
            .select_from(course_teacher_students_table)
            .join(course_teachers_table)
            .where(
                course_teacher_students_table.c.status == StudentStatus.ACTIVE,
                course_teachers_table.c.teacher_id == teacher_id,
                course_teachers_table.c.status != CourseTeacherStatus.DELETED,
            )
            .distinct()
        )

        group_students_subquery = (
            select(func.count('*'))
            .select_from(student_groups_table)
            .join(groups_table)
            .join(courses_table)
            .join(course_teachers_table)
            .where(
                student_groups_table.c.status == StudentStatus.ACTIVE,
                course_teachers_table.c.teacher_id == teacher_id,
                course_teachers_table.c.status != CourseTeacherStatus.DELETED,
            )
            .distinct()
        )

        completed_lessons_subquery = (
            select(func.count('*'))
            .select_from(lessons_table)
            .where(lessons_table.c.conducted_by_id == teacher_id)
        )

        today_lessons_subquery = (
            select(func.count('*'))
            .select_from(lessons_table)
            .where(
                lessons_table.c.conducted_by_id == teacher_id,
                lessons_table.c.start_date.cast(Date)
                == datetime.now(UTC).date(),
            )
        )

        courses = await self.session.scalar(courses_subquery) or 0
        individual_students = (
            await self.session.scalar(
                individual_students_subquery,
            )
            or 0
        )
        group_students = (
            await self.session.scalar(group_students_subquery) or 0
        )
        completed_lessons = (
            await self.session.scalar(
                completed_lessons_subquery,
            )
            or 0
        )
        today_lessons = await self.session.scalar(today_lessons_subquery) or 0

        return TeacherStats(
            courses=courses,
            students=individual_students + group_students,
            completed_lessons=completed_lessons,
            today_lessons=today_lessons,
        )
