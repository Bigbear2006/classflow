from datetime import timedelta
from typing import Protocol

from app.domain.entities import Course, User
from app.domain.enums import CoursePaymentType, CourseType, LessonType


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

    async def get_teachers(self, course_id: int) -> list[User]:
        pass

    async def get_student_courses(self, user_id: int) -> list[Course]:
        pass

    async def get_teacher_courses(self, user_id: int) -> list[Course]:
        pass
