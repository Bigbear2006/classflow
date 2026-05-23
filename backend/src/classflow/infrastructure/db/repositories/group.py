from typing import Any, cast

from sqlalchemy import Select, and_, delete, func, select, update
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import (
    joinedload,
)

from classflow.application.repositories.group import GroupRepository
from classflow.domain.entities import (
    Cabinet,
    Course,
    Group,
    OrganizationMember,
    Payment,
    StudentGroup,
    User,
)
from classflow.domain.enums import CourseTeacherStatus, StudentStatus
from classflow.domain.exceptions import CannotDeleteEntityError
from classflow.infrastructure.db.repositories.base import create, get_one
from classflow.infrastructure.db.tables import (
    course_teachers_table,
    courses_table,
    groups_table,
    payments_table,
    student_groups_table,
    users_table,
)


class GroupRepositoryImpl(GroupRepository):
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create(self, group: Group) -> Group:
        return await create(self.session, group)

    async def update(
        self,
        id: int,
        *,
        name: str,
        course_id: int,
        max_users_count: int,
        default_cabinet_id: int | None = None,
    ) -> Group:
        data = {
            'name': name,
            'course_id': course_id,
            'max_users_count': max_users_count,
            'default_cabinet_id': default_cabinet_id,
        }
        stmt = (
            update(Group)
            .where(groups_table.c.id == id)
            .values(data)
            .returning(Group)
        )
        rows = await self.session.execute(stmt)
        return get_one(rows)

    async def get_by_id(self, id: int) -> Group:
        stmt = set_group_joins(select(Group)).where(groups_table.c.id == id)
        rows = await self.session.execute(stmt)
        return get_one(rows)

    async def get_all(self, teacher_id: int | None = None) -> list[Group]:
        stmt = set_group_joins(select(Group))

        if teacher_id:
            stmt = (
                stmt.join(
                    courses_table,
                    groups_table.c.course_id == courses_table.c.id,
                )
                .join(
                    course_teachers_table,
                    courses_table.c.id == course_teachers_table.c.course_id,
                )
                .where(course_teachers_table.c.teacher_id == teacher_id)
            )

        rows = await self.session.scalars(stmt)
        return cast(list[Group], rows.all())

    async def get_users(self, group_id: int) -> list[User]:
        stmt = (
            select(User)
            .join(
                student_groups_table,
                and_(
                    student_groups_table.c.group_id == group_id,
                    student_groups_table.c.student_id == users_table.c.id,
                ),
            )
            .where(student_groups_table.c.status == StudentStatus.ACTIVE)
            .distinct()
        )
        rows = await self.session.scalars(stmt)
        return cast(list[User], rows.all())

    async def get_groups_with_payments(
        self,
        *,
        teacher_id: int | None = None,
        student_id: int | None = None,
    ) -> list[Group]:
        stmt = (
            set_group_joins(
                select(Group, func.coalesce(func.sum(Payment.amount), 0)),
            )
            .outerjoin(
                student_groups_table,
                groups_table.c.id == student_groups_table.c.group_id,
            )
            .outerjoin(
                payments_table,
                student_groups_table.c.id == payments_table.c.student_group_id,
            )
            .options(
                joinedload(Group.students).options(
                    joinedload(StudentGroup.student).joinedload(
                        OrganizationMember.user,
                    ),
                    joinedload(StudentGroup.payments),
                ),
                joinedload(Group.lessons),
            )
            .group_by(groups_table.c.id)
            .distinct()
        )

        if teacher_id:
            stmt = stmt.join(
                course_teachers_table,
                groups_table.c.course_id == course_teachers_table.c.course_id,
            ).where(
                course_teachers_table.c.teacher_id == teacher_id,
                course_teachers_table.c.status != CourseTeacherStatus.DELETED,
            )

        if student_id:
            stmt = stmt.where(
                student_groups_table.c.student_id == student_id,
                student_groups_table.c.status == StudentStatus.ACTIVE,
            )

        rows = await self.session.execute(stmt)
        result = []
        for group, total_paid in rows.unique().all():
            group.total_paid = total_paid
            for student in group.students:
                student.total_paid = sum([p.amount for p in student.payments])

            if student_id:
                group.students = [
                    student
                    for student in group.students
                    if student.student_id == student_id
                ]

            result.append(group)
        return result

    async def get_groups_with_students(
        self,
        *,
        teacher_id: int | None = None,
        course_id: int | None = None,
    ) -> list[Group]:
        stmt = (
            set_group_joins(select(Group))
            .options(
                joinedload(Group.students)
                .joinedload(StudentGroup.student)
                .joinedload(OrganizationMember.user),
            )
            .order_by(groups_table.c.created_at)
        )

        if teacher_id:
            stmt = join_course_teachers_to_groups(stmt).where(
                course_teachers_table.c.teacher_id == teacher_id,
                course_teachers_table.c.status != CourseTeacherStatus.DELETED,
            )

        if course_id:
            stmt = stmt.where(groups_table.c.course_id == course_id)

        rows = await self.session.scalars(stmt)
        return cast(list[Group], rows.unique().all())

    async def get_groups_with_teachers(
        self,
        teacher_id: int | None = None,
    ) -> list[Group]:
        stmt = (
            join_course_teachers_to_groups(select(Group))
            .options(
                joinedload(Group.course).joinedload(
                    Course.subject,
                    Course.teachers,
                ),  # type: ignore[arg-type]
                joinedload(Group.default_cabinet).joinedload(Cabinet.address),  # type: ignore[arg-type]
            )
            .where(
                course_teachers_table.c.status != CourseTeacherStatus.DELETED,
            )
        )

        if teacher_id:
            stmt = stmt.where(course_teachers_table.c.teacher_id == teacher_id)

        rows = await self.session.scalars(stmt)
        return cast(list[Group], rows.unique().all())

    async def delete(self, id: int) -> None:
        stmt = delete(Group).where(groups_table.c.id == id)
        try:
            await self.session.execute(stmt)
        except IntegrityError as e:
            raise CannotDeleteEntityError('Group has related students') from e


def set_group_joins[T: tuple[Any, ...]](stmt: Select[T]) -> Select[T]:
    return stmt.options(
        joinedload(Group.course).joinedload(Course.subject),  # type: ignore[arg-type]
        joinedload(Group.default_cabinet).joinedload(Cabinet.address),  # type: ignore[arg-type]
    )


def join_course_teachers_to_groups[T: tuple[Any, ...]](
    stmt: Select[T],
) -> Select[T]:
    return stmt.join(
        courses_table,
        groups_table.c.course_id == courses_table.c.id,
    ).join(
        course_teachers_table,
        courses_table.c.id == course_teachers_table.c.course_id,
    )
