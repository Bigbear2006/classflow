from typing import Protocol

from app.domain.entities import Course, User


class CourseRepository(Protocol):
    async def create(self, course: Course) -> Course:
        pass

    async def get_all(self) -> list[Course]:
        pass

    async def get_teachers(self, course_id: int) -> list[User]:
        pass

    async def get_student_courses(self, user_id: int) -> list[Course]:
        pass

    async def get_teacher_courses(self, user_id: int) -> list[Course]:
        pass
