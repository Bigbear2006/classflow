from typing import Protocol

from classflow.domain.entities import CourseTeacher, User
from classflow.domain.enums import CourseTeacherStatus


class CourseTeacherRepository(Protocol):
    async def create(self, course_teacher: CourseTeacher) -> CourseTeacher:
        pass

    async def update(
        self,
        course_id: int,
        teacher_id: int,
        *,
        status: CourseTeacherStatus,
    ) -> CourseTeacher:
        pass

    async def get(self, course_id: int, teacher_id: int) -> CourseTeacher:
        pass

    async def get_by_student(
        self,
        course_teacher_student_id: int,
    ) -> CourseTeacher:
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

    async def delete_inactive(self, course_id: int) -> None:
        pass

    async def exists(self, course_id: int, teacher_id: int) -> bool:
        pass
