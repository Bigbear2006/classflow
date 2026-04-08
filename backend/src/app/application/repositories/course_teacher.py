from typing import Protocol

from app.domain.entities import CourseTeacher, User


class CourseTeacherRepository(Protocol):
    async def create(self, course_teacher: CourseTeacher) -> CourseTeacher:
        pass

    async def get(self, course_id: int, teacher_id: int) -> CourseTeacher:
        pass

    async def get_all(self) -> list[CourseTeacher]:
        pass

    async def get_students(
        self,
        course_id: int,
        teacher_id: int,
    ) -> list[User]:
        pass

    async def delete(self, course_id: int, teacher_id: int) -> None:
        pass
