from datetime import timedelta
from typing import Protocol

from classflow.domain.entities import Course, Group, OrganizationMember
from classflow.domain.enums import CoursePaymentType, CourseType, LessonType


class CourseRepository(Protocol):
    async def create(self, course: Course) -> Course:
        pass

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
        pass

    async def get_all(self) -> list[Course]:
        pass

    async def get_groups(self, course_id: int) -> list[Group]:
        pass

    async def get_teachers(self, course_id: int) -> list[OrganizationMember]:
        pass

    async def get_student_courses(self, user_id: int) -> list[Course]:
        pass

    async def get_teacher_courses(self, user_id: int) -> list[Course]:
        pass
