from datetime import timedelta
from typing import cast

from sqlalchemy import delete, func, literal, or_, select, update
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import contains_eager, joinedload

from classflow.application.repositories.course import CourseRepository
from classflow.domain.entities import (
    Course,
    CourseTeacher,
    CourseTeacherStudent,
    Group,
    OrganizationMember,
    User,
)
from classflow.domain.enums import (
    CoursePaymentType,
    CourseTeacherStatus,
    CourseType,
    LessonType,
)
from classflow.domain.exceptions import CannotDeleteEntityError
from classflow.infrastructure.db.repositories.base import create, get_one
from classflow.infrastructure.db.repositories.group import set_group_joins
from classflow.infrastructure.db.tables import (
    course_teacher_students_table,
    course_teachers_table,
    courses_table,
    groups_table,
    organization_members_table,
    student_groups_table,
    subjects_table,
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
        return get_one(rows)

    async def get_all(
        self,
        *,
        current_member_id: int | None = None,
        type: CourseType | None = None,
    ) -> list[Course]:
        teachers_count_subquery = (
            select(func.count(course_teachers_table.c.id))
            .where(
                course_teachers_table.c.course_id == courses_table.c.id,
                course_teachers_table.c.status == CourseTeacherStatus.ACTIVE,
            )
            .scalar_subquery()
        )

        group_students_count_subquery = (
            select(func.count(student_groups_table.c.id))
            .join(
                groups_table,
                student_groups_table.c.group_id == groups_table.c.id,
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

        active_group_subquery = (
            select(groups_table.c.id)
            .where(groups_table.c.course_id == courses_table.c.id)
            .order_by(groups_table.c.created_at.asc())
            .limit(1)
            .scalar_subquery()
        )

        if current_member_id:
            student_group_status_subquery = (
                select(student_groups_table.c.status)
                .select_from(groups_table)
                .outerjoin(
                    student_groups_table,
                    groups_table.c.id == student_groups_table.c.group_id,
                )
                .where(
                    groups_table.c.course_id == courses_table.c.id,
                    student_groups_table.c.student_id == current_member_id,
                )
                .scalar_subquery()
            )
        else:
            student_group_status_subquery = literal(None)  # type: ignore[assignment]

        if current_member_id:
            course_teacher_student_status_subquery = (
                select(course_teacher_students_table.c.status)
                .select_from(course_teachers_table)
                .outerjoin(
                    course_teacher_students_table,
                    course_teachers_table.c.id
                    == course_teacher_students_table.c.course_teacher_id,
                )
                .where(
                    course_teachers_table.c.course_id == courses_table.c.id,
                    course_teacher_students_table.c.student_id
                    == current_member_id,
                )
                .scalar_subquery()
            )
        else:
            course_teacher_student_status_subquery = literal(None)  # type: ignore[assignment]

        stmt = select(
            Course,
            teachers_count_subquery,
            group_students_count_subquery,
            individual_students_count_subquery,
            active_group_subquery,
            student_group_status_subquery,
            course_teacher_student_status_subquery,
        ).options(joinedload(Course.subject))  # type: ignore[arg-type]

        if type:
            stmt = stmt.where(courses_table.c.type == type)

        rows = await self.session.execute(stmt)
        result = []
        for (
            course,
            teachers_count,
            group_students,
            individual_students,
            active_group_id,
            student_group_status,
            course_teacher_student_status,
        ) in rows:
            course.teachers_count = teachers_count
            course.students_count = group_students + individual_students
            course.active_group_id = active_group_id
            course.student_status = (
                student_group_status or course_teacher_student_status
            )
            result.append(course)
        return result

    async def get_groups(self, course_id: int) -> list[Group]:
        stmt = set_group_joins(select(Group)).where(
            groups_table.c.course_id == course_id,
        )
        rows = await self.session.scalars(stmt)
        return cast(list[Group], rows.all())

    async def get_teachers(
        self,
        course_id: int,
        *,
        exclude_paused: bool = False,
    ) -> list[OrganizationMember]:
        stmt = (
            select(OrganizationMember)
            .join(
                course_teachers_table,
                organization_members_table.c.id
                == course_teachers_table.c.teacher_id,
            )
            .where(course_teachers_table.c.course_id == course_id)
            .options(joinedload(OrganizationMember.user))  # type: ignore[arg-type]
            .distinct()
        )

        if exclude_paused:
            stmt = stmt.where(
                course_teachers_table.c.status == CourseTeacherStatus.ACTIVE,
            )
        else:
            stmt = stmt.where(
                course_teachers_table.c.status != CourseTeacherStatus.DELETED,
            )

        rows = await self.session.scalars(stmt)
        return cast(list[OrganizationMember], rows.all())

    async def get_student_courses(self, student_id: int) -> list[Course]:
        stmt = (
            select(Course, User)
            .options(joinedload(Course.subject))  # type: ignore[arg-type]
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
                users_table,
                course_teachers_table.c.teacher_id == users_table.c.id,
            )
            .outerjoin(
                groups_table,
                courses_table.c.id == groups_table.c.course_id,
            )
            .outerjoin(
                student_groups_table,
                groups_table.c.id == student_groups_table.c.group_id,
            )
            .where(
                or_(
                    course_teacher_students_table.c.student_id == student_id,
                    student_groups_table.c.student_id == student_id,
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

    async def get_teacher_courses(self, teacher_id: int) -> list[Course]:
        stmt = (
            select(Course)
            .options(joinedload(Course.subject))  # type: ignore[arg-type]
            .join(
                course_teachers_table,
                courses_table.c.id == course_teachers_table.c.course_id,
            )
            .where(course_teachers_table.c.teacher_id == teacher_id)
            .distinct()
        )
        rows = await self.session.scalars(stmt)
        return cast(list[Course], rows.all())

    async def get_individual_courses(
        self,
        *,
        teacher_id: int | None = None,
    ) -> list[Course]:
        stmt = (
            select(Course)
            .options(
                contains_eager(Course.subject),  # type: ignore[arg-type]
                joinedload(Course.teachers).options(  # type: ignore[arg-type]
                    joinedload(CourseTeacher.teacher).joinedload(  # type: ignore[arg-type]
                        OrganizationMember.user,  # type: ignore[arg-type]
                    ),
                    joinedload(CourseTeacher.students)  # type: ignore[arg-type]
                    .joinedload(CourseTeacherStudent.student)  # type: ignore[arg-type]
                    .joinedload(OrganizationMember.user),  # type: ignore[arg-type]
                ),
            )
            .join(
                subjects_table,
                courses_table.c.subject_id == subjects_table.c.id,
            )
            .where(courses_table.c.type == CourseType.INDIVIDUAL)
            .order_by(subjects_table.c.name)
        )

        if teacher_id:
            stmt = stmt.join(
                course_teachers_table,
                courses_table.c.id == course_teachers_table.c.course_id,
            ).where(course_teachers_table.c.teacher_id == teacher_id)

        rows = await self.session.scalars(stmt)
        return cast(list[Course], rows.unique().all())

    async def delete(self, id: int) -> None:
        stmt = delete(Course).where(courses_table.c.id == id)
        try:
            await self.session.execute(stmt)
        except IntegrityError as e:
            raise CannotDeleteEntityError(
                'Address has related teachers or students',
            ) from e
